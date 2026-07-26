interface HomeScreenProps {
  onPlayHistory: () => void
}

// Menu principal pós-login (referência Pokelike: cards de modo). Só
// "História" existe de verdade hoje — os outros dois aparecem bloqueados,
// mesmo espírito do "more regions are on the way" da tela de regiões.
export function HomeScreen({ onPlayHistory }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <h2>Menu</h2>
      <div className="mode-grid">
        <button className="mode-card" onClick={onPlayHistory}>
          <h3>História</h3>
          <p>A campanha principal — regiões, ginásios e Elite Four.</p>
        </button>
        <div className="mode-card mode-card--locked">
          <h3>Torre de Batalha</h3>
          <p className="mode-card-locked">Em breve</p>
        </div>
        <div className="mode-card mode-card--locked">
          <h3>Desafios</h3>
          <p className="mode-card-locked">Em breve</p>
        </div>
      </div>
    </div>
  )
}
