import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const API = 'https://pokeapi.co/api/v2'
const CONCURRENCY = 8

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_SPRITES = path.resolve(__dirname, '../../frontend/public/sprites')

type StatName = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed'

interface PokemonApiResponse {
  name: string
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

export interface PokemonEntry {
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

export async function buildGen(genName: string, startId: number, count: number, legacyIds: number[] = []): Promise<void> {
  const outData = path.resolve(__dirname, `../../frontend/public/data/${genName}.json`)

  await mkdir(OUT_SPRITES, { recursive: true })
  await mkdir(path.dirname(outData), { recursive: true })

  const newDexIds = Array.from({ length: count }, (_, i) => startId + i)
  const ids = [...new Set([...newDexIds, ...legacyIds])].sort((a, b) => a - b)
  const results: PokemonEntry[] = []

  for (let i = 0; i < ids.length; i += CONCURRENCY) {
    const batch = ids.slice(i, i + CONCURRENCY)
    results.push(...(await Promise.all(batch.map(buildPokemon))))
    console.log(`[${genName}] fetched ${Math.min(i + CONCURRENCY, ids.length)}/${ids.length}`)
  }

  results.sort((a, b) => a.id - b.id)
  await writeFile(outData, JSON.stringify(results, null, 2))
  console.log(`[${genName}] wrote ${outData} (${results.length} entries)`)
}
