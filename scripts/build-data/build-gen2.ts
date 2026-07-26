import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const GEN2_START_ID = 152
const GEN2_COUNT = 100

// Johto's own species (152-251) aren't the whole story: the region's wild
// tables and gym/E4/champion teams (docs/ROTAS-JOHTO.md) reuse a lot of Gen1
// species (Rattata, Tentacool, Dragonite...), and the game fetches exactly
// one dataUrl per region as its whole species pool (App.tsx) — there's no
// merge with gen1.json at runtime. So every legacy id a Johto save can ever
// reference has to ship inside gen2.json too. This list is: every species
// named directly in a wild table or a trainer team in ROTAS-JOHTO.md, plus
// the level-up (never trade/stone — those never auto-evolve, see
// systems/team/leveling.ts's resolveEvolution) evolution successors of
// whichever of those are wild-catchable, so a caught Pokémon can evolve
// in-game without hitting a missing species entry.
const LEGACY_IDS = [
  6, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 27, 28, 29,
  30, 32, 33, 35, 37, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 52, 53, 54, 55,
  56, 57, 58, 60, 61, 62, 63, 64, 66, 67, 68, 69, 70, 72, 73, 74, 75, 77, 78,
  79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 92, 93, 94, 95, 96, 97, 103, 106,
  107, 108, 111, 112, 114, 118, 119, 123, 124, 128, 129, 130, 132, 142, 147,
  148, 149,
]

const API = 'https://pokeapi.co/api/v2'
const CONCURRENCY = 8

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DATA = path.resolve(__dirname, '../../frontend/public/data/gen2.json')
const OUT_SPRITES = path.resolve(__dirname, '../../frontend/public/sprites')

type StatName = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed'

interface PokemonApiResponse {
  stats: { base_stat: number; stat: { name: StatName } }[]
  types: { type: { name: string } }[]
  sprites: {
    front_default: string | null
    other: { 'official-artwork': { front_default: string | null } }
  }
}

interface SpeciesApiResponse {
  capture_rate: number
  evolution_chain: { url: string }
}

interface EvolutionNode {
  species: { name: string; url: string }
  evolves_to: EvolutionNode[]
  evolution_details: { trigger: { name: string }; min_level: number | null }[]
}

interface EvolutionChainApiResponse {
  chain: EvolutionNode
}

interface EvolutionStep {
  id: number
  species: string
  trigger: string
  minLevel: number | null
}

interface PokemonEntry {
  id: number
  name: string
  types: string[]
  stats: Record<StatName, number>
  captureRate: number
  sprite: { url: string; local: string }
  evolutionChain: EvolutionStep[]
}

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  return res.json() as Promise<T>
}

function idFromUrl(url: string): number {
  const segments = url.split('/').filter(Boolean)
  return Number(segments[segments.length - 1])
}

function flattenEvolutionChain(root: EvolutionNode): EvolutionStep[] {
  const steps: EvolutionStep[] = []
  const walk = (node: EvolutionNode, trigger: string, minLevel: number | null) => {
    steps.push({ id: idFromUrl(node.species.url), species: node.species.name, trigger, minLevel })
    for (const next of node.evolves_to) {
      const detail = next.evolution_details[0]
      walk(next, detail?.trigger.name ?? 'level-up', detail?.min_level ?? null)
    }
  }
  walk(root, 'initial', null)
  return steps
}

async function downloadSprite(url: string, dest: string): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`sprite GET ${url} -> ${res.status}`)
  await writeFile(dest, Buffer.from(await res.arrayBuffer()))
}

async function buildPokemon(id: number): Promise<PokemonEntry> {
  const [pokemon, species] = await Promise.all([
    getJSON<PokemonApiResponse>(`${API}/pokemon/${id}`),
    getJSON<SpeciesApiResponse>(`${API}/pokemon-species/${id}`),
  ])
  const evolutionChainData = await getJSON<EvolutionChainApiResponse>(species.evolution_chain.url)

  const stats = Object.fromEntries(
    pokemon.stats.map((s) => [s.stat.name, s.base_stat]),
  ) as Record<StatName, number>

  const spriteUrl = pokemon.sprites.other['official-artwork'].front_default ?? pokemon.sprites.front_default
  if (!spriteUrl) throw new Error(`no sprite for pokemon ${id}`)
  const localFile = `${id}.png`
  await downloadSprite(spriteUrl, path.join(OUT_SPRITES, localFile))

  return {
    id,
    name: pokemon.name,
    types: pokemon.types.map((t) => t.type.name),
    stats,
    captureRate: species.capture_rate,
    sprite: { url: spriteUrl, local: `/sprites/${localFile}` },
    evolutionChain: flattenEvolutionChain(evolutionChainData.chain),
  }
}

async function main(): Promise<void> {
  await mkdir(OUT_SPRITES, { recursive: true })
  await mkdir(path.dirname(OUT_DATA), { recursive: true })

  const newDexIds = Array.from({ length: GEN2_COUNT }, (_, i) => GEN2_START_ID + i)
  const ids = [...new Set([...newDexIds, ...LEGACY_IDS])].sort((a, b) => a - b)
  const results: PokemonEntry[] = []

  for (let i = 0; i < ids.length; i += CONCURRENCY) {
    const batch = ids.slice(i, i + CONCURRENCY)
    results.push(...(await Promise.all(batch.map(buildPokemon))))
    console.log(`fetched ${Math.min(i + CONCURRENCY, ids.length)}/${ids.length}`)
  }

  results.sort((a, b) => a.id - b.id)
  await writeFile(OUT_DATA, JSON.stringify(results, null, 2))
  console.log(`wrote ${OUT_DATA} (${results.length} entries)`)
}

main().catch((err: unknown) => {
  console.error(err)
  process.exitCode = 1
})
