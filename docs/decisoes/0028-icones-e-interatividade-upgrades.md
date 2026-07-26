# 0028 — Upgrades: ícones de verdade + interatividade (substitui 0027)

## Contexto

Feedback direto do dono do projeto depois de ver a decisão 0027 ao vivo:
ficou ruim. Dois erros:
1. Usar **foto de Pokémon** (`iconSpeciesId`, sprite da PokeAPI) como ícone
   de upgrade não comunica nada — "Machop" não lê como "Luva de Treino".
   O certo é um **ícone-objeto** (uma luvinha de box em pixel art), do
   jeito que o exemplo trazido (`docs/referencias/exemplo coockie
   clicker.jfif`) mostra pros prédios da loja.
2. Tudo numa lista só ficava "um monte de botão jogado" — os upgrades de
   **clique** (tipo a luva) precisam ficar separados, num quadradinho no
   canto (como a fileira compacta de ícones do Cookie Clicker), diferentes
   da lista de **CPS/geradores** (essa sim pode continuar como lista tipo
   Store).
3. Faltava interatividade — a sugestão concreta foi um Spearow ciscando o
   chão em GIF com um popup "+0.1" a cada ciscada pro "Ajudante
   Voluntário", um "+1" saindo de um Pokémon Center pro "Posto de Coleta",
   etc.

Não tenho ferramenta de geração de arte neste ambiente — pixel art
original está fora do meu alcance. O dono do projeto se ofereceu pra achar/
produzir os sprites e gifs, contanto que eu diga exatamente o que preciso.

## O que foi implementado agora (sem depender de arte nova)

- **`iconSpeciesId` removido.** Trocado por convenção de arquivo:
  `upgradeIconUrl(id)` em `content/gen1/upgrades.ts` sempre aponta pra
  `/icons/upgrades/{id}.png` (pasta nova, `frontend/public/icons/upgrades/`,
  hoje vazia com `.gitkeep`). O `<img>` some sozinho (`onError`) se o
  arquivo não existir — enquanto não chegam ícones de verdade, a linha
  mostra só texto (limpo), nunca uma imagem errada.
- **Upgrades de clique saíram da lista** e viraram `ClickUpgradesGrid.tsx`
  — grade 2 colunas de quadrados 38×38 no canto superior direito da área
  de clique (`.click-stage`, `position: relative` + grid `position:
  absolute`). Cada quadrado mostra ícone + custo pequeno embaixo + uma
  bolinha no canto (número de vezes possuído pros infinitos, ✓ verde pros
  tiers de compra única já comprados). Tooltip nativo (`title`) mostra
  nome/custo/efeito completo, já que não cabe texto no quadrado.
- **`UpgradesPanel` agora só mostra CPS/XP** — a lista "Store" continua
  com ícone 40×40 + nome/custo/efeito em linha (mesmo padrão de
  `.roster-entry`/`.pokedex-entry` que já existia no jogo).
- **Interatividade implementada de verdade, sem precisar de gif ainda**: um
  upgrade de CPS possuído solta um popup `+N` (mesma animação float-e-some
  do clique, `candy-pop-float`) sozinho a cada ~2.5s, ancorado no ícone da
  própria linha (`UpgradeRow` em `UpgradesPanel.tsx`). É cosmético — não
  mexe no cálculo real de CPS, só mostra que aquele gerador "está
  trabalhando". Quando o GIF do Spearow (ou qualquer outro) chegar, ele
  entra no lugar do PNG estático sem nenhuma mudança de código: `<img>` com
  `.gif` anima sozinho no navegador.

## O que preciso de você: lista exata de assets

Convenção de pasta: **`frontend/public/icons/upgrades/{id}.png`** (estático)
ou **`frontend/public/icons/upgrades/{id}.gif`** (se quiser animado —
funciona igual, é só trocar a extensão, o código não precisa saber).
Estilo: pixel art, fundo transparente, borda/contorno escuro como os
sprites que já existem em `public/sprites/`. Tamanho: 32×32 ou 64×64 (múltiplo
de 32 é o mais seguro — o CSS redimensiona pra 38px no quadrado de clique e
40px na linha de CPS, `image-rendering: pixelated`, então não precisa ser
o tamanho exato).

### Upgrades de clique (quadradinho no canto) — Kanto
| id (nome do arquivo) | Nome no jogo | O que o ícone deveria mostrar |
|---|---|---|
| `quick-fingers.png` | Dedos Ligeiros | Uma mão/dedo com "linhas de velocidade" |
| `battle-glove.png` | Luva de Treino | Luva de boxe simples |
| `critical-strike.png` | Golpe Crítico | Punho com estrela/impacto |
| `pokemon-fury.png` | Fúria Pokémon | Punho com aura vermelha/fogo |
| `champion-gloves.png` | Luvas do Campeão | Luva de boxe dourada |
| `badge-talisman.png` | Talismã de Insígnia | Um amuleto/insígnia pendurada |
| `legendary-fury.png` | Fúria do Mewtwo | Algo psíquico/roxo (ex.: colher dobrada, aura) |

### Upgrades de clique — Johto
| id | Nome no jogo | Ícone |
|---|---|---|
| `sprout-gloves.png` | Luvas de Broto | Luva verde com uma folinha |
| `apricorn-satchel.png` | Bolsa de Bagas Apricô | Saquinho/bolsa com uma baga azul |
| `pokegear-clicker.png` | Pokégear de Combate | O aparelho Pokégear (tela + botões) |
| `legendary-beast-fury.png` | Fúria das Feras Lendárias | Pegada de fera com aura |
| `kimono-gloves.png` | Luvas do Clã Kimono | Luva com padrão de leque/kimono |
| `lighthouse-talisman.png` | Talismã do Farol | Farolzinho ou lanterna |
| `ho-oh-fury.png` | Fúria do Ho-Oh | Pena dourada/arco-íris |

### Upgrades de CPS/XP (lista Store) — Kanto
| id | Nome no jogo | Ícone estático | Ideia de GIF (opcional, decisão sua) |
|---|---|---|---|
| `volunteer-helper.png`/`.gif` | Ajudante Voluntário | Um passarinho/Pokémon pequeno | Spearow ciscando o chão, como você sugeriu |
| `collection-post.png`/`.gif` | Posto de Coleta | Uma cesta/caixa de coleta | Saco de doces caindo num cesto |
| `candy-conveyor.png`/`.gif` | Esteira de Doces | Esteira rolante com doce em cima | Esteira andando, doce passando |
| `candy-factory.png`/`.gif` | Fábrica de Doces | Prédio de fábrica pequeno | Fumacinha saindo da chaminé |
| `village-co-op.png` | Cooperativa da Vila | Casinha/mercado | — |
| `outpost-network.png` | Rede de Postos | Bandeirinha/posto avançado | — |
| `legendary-factory.png` | Fábrica do Zapdos | Raio elétrico | — |
| `training-regimen.png` | Treinamento | Um halter/faixa de treino | — |

### Upgrades de CPS/XP — Johto
| id | Nome no jogo | Ícone |
|---|---|---|
| `bug-catching-helper.png` | Ajudante do Concurso de Insetos | Rede de captura de inseto |
| `goldenrod-post.png` | Posto de Coleta de Goldenrod | Loja/vitrine pequena |
| `gs-ball-conveyor.png` | Esteira da GS Ball | A GS Ball rolando |
| `radio-tower-factory.png` | Fábrica da Torre de Rádio | Antena/torre de rádio |
| `goldenrod-co-op.png` | Cooperativa de Goldenrod | Garrafa de leite (Miltank/Goldenrod) |
| `johto-outpost-network.png` | Rede de Postos de Johto | Bandeirinha/posto |
| `lugia-factory.png` | Fábrica do Lugia | Redemoinho/pena prateada |
| `day-care-training.png` | Treinamento da Creche | Um ovo ou biberão |

Se algum ícone não fizer sentido pra você ou tiver ideia melhor, muda à
vontade — a lista acima é só ponto de partida, o arquivo só precisa ter o
nome certo (a coluna `id`) pra funcionar sem eu tocar em código.

## O que ainda falta (fora do escopo desta rodada)

- Mesmo tratamento (ícone + interatividade) pro resto da UI — nav
  principal, cards de região, telas de ginásio — segue como texto puro até
  confirmar se essa direção agrada.
- Os `<audio>`/som não entraram, só visual.

## Verificação

`tsc -b`, `oxlint`, `vite build` e a suíte inteira (203 testes) passam.
Testado sem os ícones reais ainda (pasta vazia, `onError` escondendo a
`<img>`) — comportamento visual real com os PNGs/GIFs só dá pra confirmar
depois que os arquivos chegarem.
