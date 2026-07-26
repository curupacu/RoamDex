# 0031 — Fallback .png/.gif de verdade + checklist final de ícones

## Contexto

O dono do projeto perguntou o que falta pra deixar animações e sprites
funcionando de verdade. Ao revisar antes de responder, achei que a
promessa das decisões 0028/0029/0030 ("é só trocar a extensão pra
`.gif`, o código não precisa saber") **era falsa**: `upgradeIconUrl`
sempre montava `/icons/upgrades/{id}.png`, sem nunca tentar `.gif`. Um
GIF salvo com esse nome nunca teria sido carregado.

## O que mudou

- **`UpgradeIcon.tsx`** (novo componente): tenta `.png`, e só se der 404
  cai pra `.gif` via `onError` + estado local; esconde de vez se nenhum
  dos dois existir. Centraliza a lógica que antes estava duplicada (com
  o bug) em 3 componentes.
- `ClickUpgradesGrid.tsx`, `UpgradesPanel.tsx`, `UpgradeScene.tsx` agora
  usam `<UpgradeIcon>` em vez de `<img src={upgradeIconUrl(id)}>` direto.
- `upgradeIconUrl()` removida (sem mais nenhum uso depois da troca).
- **`docs/CHECKLIST-ICONES-UPGRADES.md`** (novo): consolida a lista dos
  30 arquivos das decisões 0027/0028 num único documento prático, com a
  convenção de nome, a confirmação de que **qualquer tamanho de imagem
  serve** (o CSS já força o tamanho de exibição em cada lugar — o dono
  do projeto levantou essa dúvida específica), e uma sugestão de por
  onde começar (os 4 primeiros CPS, que aparecem cedo numa partida nova).

## Verificação

`tsc -b`, `oxlint` e os 208 testes continuam passando (mudança é troca
de componente de apresentação, sem lógica de jogo afetada).
