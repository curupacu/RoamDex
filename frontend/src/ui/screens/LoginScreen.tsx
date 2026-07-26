import { useState, type FormEvent } from 'react'

interface LoginScreenProps {
  onGoogle: () => void
  onEmailSignUp: (email: string, password: string) => void
  onEmailSignIn: (email: string, password: string) => void
  onGuest: () => void
  error: string | null
  pending: boolean
}

// Login gate shown once, on the very first boot (referência PokéRogue) —
// Firebase persists whichever option the player picks, so returning players
// never see this again. Local-first still holds: "Continuar sem conta"
// signs in anonymously, same save-always-in-localStorage guarantee as before.
export function LoginScreen({ onGoogle, onEmailSignUp, onEmailSignIn, onGuest, error, pending }: LoginScreenProps) {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailSubmit(event: FormEvent) {
    event.preventDefault()
    if (mode === 'sign-up') onEmailSignUp(email, password)
    else onEmailSignIn(email, password)
  }

  return (
    <div className="login-screen">
      <h2>Entrar</h2>

      <div className="pokemon-detail login-panel">
        <button onClick={onGoogle} disabled={pending}>
          Entrar com Google
        </button>

        <form className="login-email-form" onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
          />
          <button type="submit" disabled={pending}>
            {mode === 'sign-up' ? 'Criar conta' : 'Entrar com email'}
          </button>
        </form>
        <button
          className="login-mode-toggle"
          onClick={() => setMode((current) => (current === 'sign-up' ? 'sign-in' : 'sign-up'))}
          disabled={pending}
        >
          {mode === 'sign-up' ? 'Já tenho conta' : 'Criar conta nova'}
        </button>

        {error && <p className="login-error">{error}</p>}

        <button className="login-guest" onClick={onGuest} disabled={pending}>
          Continuar sem conta
        </button>
      </div>
    </div>
  )
}
