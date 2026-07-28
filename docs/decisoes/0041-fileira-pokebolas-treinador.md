# 0041 — Fileira de pokébolas do treinador durante a luta

Item 1 da lista de "polish" do `docs/BACKLOG.md`: mostrar, durante uma luta
contra treinador (ginásio ou membro da Elite Four), quantos Pokémon do time
dele já caíram — como nos jogos oficiais. Só a fileira de bolas; o sprite do
treinador (mencionado como stretch goal no mesmo item) ficou de fora por
pedido explícito do dono do projeto ("faz rapidinho").

## O que foi feito

- `systems/battle/engine.ts`: nova `currentTrainerBalls(state)`, que reusa a
  mesma lógica de `trainerBoundaries` de `currentTrainerProgress` pra
  recortar só o time do treinador ATUAL (o ginásio inteiro se não houver
  boundaries, ou só a fatia do membro da Elite Four em andamento — nunca a
  sequência de 26 Pokémon inteira). Cada entrada vira `{ fainted, current }`
  a partir de `currentHp`/`enemyIndex`.
- `BattleScreen.tsx`: renderiza uma bolinha por entrada logo abaixo do nome
  do inimigo, só quando há mais de 1 (uma luta selvagem de 1 Pokémon nunca
  mostra a fileira).
- CSS (`.trainer-balls`/`.trainer-ball`): reaproveita o mesmo desenho da
  `.capture-pokeball` (sistema de captura) em tamanho pequeno; bola caída
  fica cinza/opaca, a atual ganha um halo amarelo (`--accent-yellow`, cor de
  destaque já usada no resto da UI).

## Verificação

`tsc --noEmit` limpo. Testado ao vivo (dev server local, save de teste):
reenfrentei o Falkner (2 Pokémon) com o ativo rebaixado pra nível 6 via
Admin (o save de teste tinha um Ho-oh de nível absurdo que vencia tudo num
golpe só, rápido demais pra ver a transição) — a fileira mostrou as 2 bolas
certas, e depois que o Pidgey caiu a bola dele ficou cinza enquanto a do
Pidgeotto (2/2) ganhou o halo de "atual". Sem teste de componente pra
`BattleScreen.tsx` (mesma lacuna já registrada em 0037).
