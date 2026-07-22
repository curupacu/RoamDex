import { useEffect, useState } from 'react'

interface Gen1Entry {
  id: number
  name: string
}

function App() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/data/gen1.json')
      .then((res) => res.json() as Promise<Gen1Entry[]>)
      .then((data) => setCount(data.length))
  }, [])

  return (
    <main>
      <h1>PokéIdle</h1>
      <p>gen1.json carregado: {count ?? '...'} Pokémon</p>
    </main>
  )
}

export default App
