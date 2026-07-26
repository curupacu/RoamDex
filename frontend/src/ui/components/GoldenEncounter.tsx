interface GoldenEncounterProps {
  speciesId: number
  left: number
  top: number
  onCatch: () => void
}

// Botão clicável do evento de bônus surpresa (decisão 0030) — reaproveita
// o sprite normal da espécie (public/sprites/{id}.png, já existe pra
// qualquer Pokémon) com um brilho dourado via CSS, sem precisar de asset
// novo dedicado. Some sozinho (App.tsx) se ninguém clicar a tempo.
export function GoldenEncounter({ speciesId, left, top, onCatch }: GoldenEncounterProps) {
  return (
    <button
      className="golden-encounter"
      style={{ left: `${left}%`, top: `${top}%` }}
      title="Um Pokémon raro! Clique rápido"
      onClick={onCatch}
    >
      <img src={`/sprites/${speciesId}.png`} alt="Pokémon raro" />
    </button>
  )
}
