# Checklist de ícones de upgrade

Lista definitiva dos 30 arquivos que faltam pra tudo (quadradinho de
clique, loja "Upgrades", cena que enche embaixo) deixar de mostrar só
texto. Sem esses arquivos o jogo funciona normal — só não tem ícone.

## Onde colocar

`frontend/public/icons/upgrades/{id}.png` — o `id` é a primeira coluna de
cada tabela abaixo, exatamente como está escrito (minúsculo, com hífen).

## Não se preocupe com o tamanho exato

**Qualquer imagem quadrada serve.** O CSS já força o tamanho de exibição
em cada lugar que o ícone aparece (38px no quadradinho de clique, 40px na
loja, 20px na cena) — a imagem original é redimensionada automaticamente.
Se algo ficar esticado ou cortado estranho depois que você colocar os
arquivos reais, é comigo ajustar o CSS, não com você acertar o pixel
certo. Só evite imagens muito retangulares (tipo 800×200) — quadrada ou
próxima disso é o ideal.

## PNG estático ou GIF animado — os dois funcionam

Pode salvar como `{id}.png` (estático) **ou** `{id}.gif` (animado, ex.:
um Spearow ciscando) — mesmo nome, só troca a extensão. O código tenta
`.png` primeiro e cai pro `.gif` sozinho se não achar; não precisa me
avisar qual você usou.

## Estilo

Pixel art, fundo transparente, contorno escuro — mesmo estilo dos
sprites que já existem em `frontend/public/sprites/`, pra combinar
visualmente. Um **ícone-objeto** (a coisa que o upgrade representa), não
uma foto de Pokémon — luva de boxe pra "Luva de Treino", fábrica
pequena pra "Fábrica de Doces", etc. Se algum ícone sugerido abaixo não
fizer sentido pra você ou tiver ideia melhor, muda à vontade — só o
nome do arquivo (coluna `id`) precisa bater.

## Onde cada categoria aparece

- **Clique** (tabelas 1 e 3): quadradinho compacto ao lado do Pokémon
  clicável. Só o ícone + custo pequeno embaixo — tooltip (passar o mouse)
  mostra nome/efeito completo.
- **CPS/XP** (tabelas 2 e 4): linha na loja "Upgrades" (ícone + nome +
  custo + efeito) **e** também aparece multiplicado na "cena" que enche
  embaixo do jogo conforme você compra mais cópias — o mesmo arquivo faz
  os dois lugares.

---

## 1. Upgrades de clique — Kanto

| id (nome do arquivo) | Nome no jogo | Ícone sugerido |
|---|---|---|
| `quick-fingers` | Dedos Ligeiros | Mão/dedo com linhas de velocidade |
| `battle-glove` | Luva de Treino | Luva de boxe simples |
| `critical-strike` | Golpe Crítico | Punho com estrela/impacto |
| `pokemon-fury` | Fúria Pokémon | Punho com aura vermelha/fogo |
| `champion-gloves` | Luvas do Campeão | Luva de boxe dourada |
| `badge-talisman` | Talismã de Insígnia | Amuleto/insígnia pendurada |
| `legendary-fury` | Fúria do Mewtwo | Algo psíquico/roxo (colher dobrada, aura) |

## 2. Upgrades de CPS/XP — Kanto

| id | Nome no jogo | Ícone sugerido |
|---|---|---|
| `volunteer-helper` | Ajudante Voluntário | Passarinho/Pokémon pequeno (bom candidato a GIF ciscando) |
| `collection-post` | Posto de Coleta | Cesta/caixa de coleta |
| `candy-conveyor` | Esteira de Doces | Esteira rolante com doce em cima |
| `candy-factory` | Fábrica de Doces | Prédio de fábrica pequeno |
| `village-co-op` | Cooperativa da Vila | Casinha/mercado |
| `outpost-network` | Rede de Postos | Bandeirinha/posto avançado |
| `legendary-factory` | Fábrica do Zapdos | Raio elétrico |
| `training-regimen` | Treinamento | Halter/faixa de treino |

## 3. Upgrades de clique — Johto

| id | Nome no jogo | Ícone sugerido |
|---|---|---|
| `sprout-gloves` | Luvas de Broto | Luva verde com uma folinha |
| `apricorn-satchel` | Bolsa de Bagas Apricô | Saquinho/bolsa com baga azul |
| `pokegear-clicker` | Pokégear de Combate | Aparelho Pokégear (tela + botões) |
| `legendary-beast-fury` | Fúria das Feras Lendárias | Pegada de fera com aura |
| `kimono-gloves` | Luvas do Clã Kimono | Luva com padrão de leque/kimono |
| `lighthouse-talisman` | Talismã do Farol | Farolzinho ou lanterna |
| `ho-oh-fury` | Fúria do Ho-Oh | Pena dourada/arco-íris |

## 4. Upgrades de CPS/XP — Johto

| id | Nome no jogo | Ícone sugerido |
|---|---|---|
| `bug-catching-helper` | Ajudante do Concurso de Insetos | Rede de captura de inseto |
| `goldenrod-post` | Posto de Coleta de Goldenrod | Loja/vitrine pequena |
| `gs-ball-conveyor` | Esteira da GS Ball | A GS Ball rolando |
| `radio-tower-factory` | Fábrica da Torre de Rádio | Antena/torre de rádio |
| `goldenrod-co-op` | Cooperativa de Goldenrod | Garrafa de leite |
| `johto-outpost-network` | Rede de Postos de Johto | Bandeirinha/posto |
| `lugia-factory` | Fábrica do Lugia | Redemoinho/pena prateada |
| `day-care-training` | Treinamento da Creche | Ovo ou biberão |

---

## O que NÃO precisa de arte nova (já funciona)

- **Golden Encounter** (Pokémon raro que aparece de vez em quando):
  reaproveita os sprites que já existem em `public/sprites/`, com um
  brilho dourado feito por CSS. Nada a fazer aqui.
- **"???"** dos upgrades bloqueados: é só um "?" de texto, não usa ícone.
- **Fundos por localização**: já existem, sistema separado (decisão 0024).

Se quiser priorizar por onde vai render mais visualmente rápido: os 2
primeiros de cada tabela de CPS (`volunteer-helper`/`bug-catching-helper`
e `collection-post`/`goldenrod-post`) são os que aparecem primeiro no
jogo (desbloqueiam com 0 e ~100 doces) — feitos esses 4, já dá pra ver a
loja e a cena funcionando de verdade bem cedo numa partida nova.
