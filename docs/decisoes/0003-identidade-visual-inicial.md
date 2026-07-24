# 0003 — Identidade visual inicial (adiantado do Sprint 26)

**Contexto:** o dono do projeto trouxe referências visuais de outros
fangames de Pokémon (PokéRogue, PokeLike e similares) — não pra copiar,
mas como direção de estilo: fundo gradiente roxo escuro, painéis com
borda grossa e sombra dura, fonte pixelada, badges coloridas por tipo,
barra de HP verde. Pediu pra aplicar isso agora, adiantando parte do que
seria só o Sprint 26 ("Polimento de UI/UX").

**Decisão:** montar um sistema visual autoral na mesma linguagem
(gênero "Pokémon fangame pixelado"), não uma cópia de nenhuma referência
específica:
- Fonte **Press Start 2P** (OFL, licença livre) auto-hospedada em
  `public/fonts/` — sem dependência de CDN em runtime, consistente com o
  princípio local-first do projeto.
- Paleta em `index.css` via CSS custom properties (`--bg-sky-*`,
  `--panel-*`, `--accent-yellow`, `--hp-green`).
- `content/types.ts` ganhou `TYPE_COLORS`: a paleta de cor por tipo é
  convenção amplamente usada na comunidade de fangames Pokémon, não
  branding oficial da Nintendo/Game Freak/Pokémon Company.
- `ui/components/TypeBadge.tsx`: badge reutilizável, usado na escolha de
  inicial, Pokédex, tela de time e na lista de bônus de tipo.
- "Painel pixelado" (fundo escuro, borda grossa, sombra dura sem blur)
  vira o padrão visual compartilhado de cards/banners/botões.

**Impacto:** isso é puramente visual (CSS + um componente pequeno) —
não mudou nenhuma lógica de jogo, save ou regra de sprint. Sprint 26
ainda existe pra polimento fino (animações, tutorial, responsivo
mobile), mas a base de identidade visual já está definida.
