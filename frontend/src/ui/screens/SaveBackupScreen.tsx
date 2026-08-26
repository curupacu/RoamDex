import { useState } from 'react'

interface SaveBackupScreenProps {
  exportedSave: string
  // Throws on invalid input (App.tsx's importSave) — this screen turns that
  // into a status message instead of a crash.
  onImport: (encoded: string) => void
}

// Sprint 27 (docs/ROADMAP-E-SPRINTS.md Fase 5): "Backup em Base64, botão
// copiar/colar" — local-first escape hatch for moving a save across
// browsers/devices without the cloud sync path (Firebase is sync, never a
// dependency, per CLAUDE.md rule 3).
export function SaveBackupScreen({ exportedSave, onImport }: SaveBackupScreenProps) {
  const [importText, setImportText] = useState('')
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(exportedSave).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2_000)
    })
  }

  function handleImport() {
    if (!window.confirm('Importar substitui o save atual deste navegador. Continuar?')) return
    try {
      onImport(importText)
      setStatus({ ok: true, message: 'Save importado com sucesso!' })
      setImportText('')
    } catch {
      setStatus({ ok: false, message: 'Código inválido — confira se copiou o texto certinho, sem cortar nada.' })
    }
  }

  return (
    <div className="save-backup-screen">
      <h2>Backup do Save</h2>

      <section>
        <h3>Exportar</h3>
        <p>Copie este código e guarde em um lugar seguro (bloco de notas, nuvem, onde preferir).</p>
        <textarea readOnly rows={6} value={exportedSave} onFocus={(e) => e.currentTarget.select()} />
        <button onClick={handleCopy}>{copied ? 'Copiado!' : 'Copiar código'}</button>
      </section>

      <section>
        <h3>Importar</h3>
        <p>Cole abaixo um código de backup gerado em outro navegador/dispositivo.</p>
        <textarea
          rows={6}
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Cole o código aqui"
        />
        <button onClick={handleImport} disabled={!importText.trim()}>
          Importar
        </button>
        {status && <p className={status.ok ? 'save-backup-success' : 'save-backup-error'}>{status.message}</p>}
      </section>
    </div>
  )
}
