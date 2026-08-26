# Rotas de Unova — dados reais para o novo sistema de batalha

> Documento de pesquisa/design. Segue o mesmo modelo de `docs/ROTAS-KANTO.md`,
> `docs/ROTAS-JOHTO.md`, `docs/ROTAS-HOENN.md`, `docs/ROTAS-SINNOH.md` e
> `docs/ROTAS-KALOS.md`. Os iniciais de Unova (Snivy #495, Tepig #498,
> Oshawott #501) entram no nível 5, mesmo padrão das regiões anteriores.

## Metodologia

- Fonte única: **Bulbapedia**, dados de encontro selvagem da versão
  **Pokémon Black** (Geração V) — quando Black e White divergem numa mesma
  rota (troca clássica: Throh/Sawk, Gothita/Solosis, Gothorita/Duosion,
  Rufflet/Vullaby, Basculin vermelho/azul), só ficou o lado de **Black**,
  anotado onde acontece.
- Mesmas simplificações já usadas nas regiões anteriores: pesca, Surf e
  cavernas com várias áreas colapsadas numa linha só por espécie.
- **Achado que muda a estrutura do 1º ginásio**: Striaton City tem **3
  líderes** (Cilan/Chili/Cress), mas o jogo NÃO deixa escolher — cada um
  só bate com quem escolheu o inicial que ele é forte contra (achado via
  Bulbapedia, confirmado nas 3 páginas individuais):
  - Escolheu **Snivy** (Grama) → enfrenta **Chili** (Fogo)
  - Escolheu **Tepig** (Fogo) → enfrenta **Cress** (Água)
  - Escolheu **Oshawott** (Água) → enfrenta **Cilan** (Grama)

  Isso resolve sozinho a "micro-decisão" que o esqueleto
  (`docs/PESQUISA-GEN3-9-ESQUELETO.md`) tinha deixado em aberto ("qual dos
  3 vira o conteúdo oficial") — não precisa escolher um só: dá pra
  modelar como **ginásio dependente do inicial**, exatamente o mesmo
  padrão que `CHAMPION_TEAM_BY_STARTER` já usa pro Campeão. Recomendo
  implementar assim (`GYMS_BY_STARTER` ou equivalente) em vez de fixar um
  dos três.
- **Mecânica nova da Gen 5 fora de escopo**: sazonalidade (Deerling/
  Sawsbuck e alguns encontros mudam por estação do jogo — Route 6/7/Twist
  Mountain têm isso). Só a tabela de **Primavera** entrou no documento,
  mesmo espírito de não inventar mecânica nova (flores coloridas de Kalos,
  swarm de Johto etc. tiveram o mesmo tratamento).
- **Driftveil Drawbridge** não tem grama — o encontro lá é só sombra de
  Ducklett voando por cima (mecânica própria da ponte). Mantido como
  entrada própria mesmo assim, já que é um local real no caminho.
- **Qualidade dos dados**: todas as tabelas vieram de WebFetch ao vivo
  nesta sessão. Times de líder de ginásio, Elite Four e Campeão são de
  alta confiança (páginas simples, dado estruturado). As tabelas de
  encontro selvagem têm confiança um pouco menor que Kalos — Unova tem
  mais rotas com sazonalidade/versão dividida, e a extração por IA
  arredondou porcentagem em pelo menos 2 locais (Desert Resort, Route 6)
  onde a soma passa de 100%; tratar como peso relativo aproximado, não
  fração exata, mesmo cuidado já registrado pra Sinnoh.

---

## Trecho 1 — Nuvema Town → Striaton (Ginásio 1: Cilan/Chili/Cress, dependente do inicial)

Locais: Nuvema Town, Route 1, Accumula Town, Route 2, Striaton City.

### Nuvema Town
Cidade inicial, sem encontro selvagem (só a casa do jogador e o
laboratório da Professora Juniper).

### Route 1
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Patrat | 50% | 2–4 | A pé (grama) |
| Lillipup | 50% | 2–4 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_1

### Accumula Town
Sem encontro selvagem.

### Route 2
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Patrat | 40% | 4–7 | A pé (grama) |
| Lillipup | 40% | 4–7 | A pé (grama) |
| Purrloin | 20% | 4–5 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_2

### Cilan (Ginásio 1 — Grass) — só enfrentado por quem escolheu Oshawott
| Pokémon | Nível | Tipo |
|---|---|---|
| Lillipup | 12 | Normal |
| Pansage | 14 | Grass |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Cilan

### Chili (Ginásio 1 — Fire) — só enfrentado por quem escolheu Snivy
| Pokémon | Nível | Tipo |
|---|---|---|
| Lillipup | 12 | Normal |
| Pansear | 14 | Fire |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Chili

### Cress (Ginásio 1 — Water) — só enfrentado por quem escolheu Tepig
| Pokémon | Nível | Tipo |
|---|---|---|
| Lillipup | 12 | Normal |
| Panpour | 14 | Water |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Cress

---

## Trecho 2 — Striaton → Nacrene (Ginásio 2: Lenora, Normal)

Locais: Route 3, Nacrene City.

### Route 3
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Pidove | 40% | 8–11 | A pé (grama) |
| Blitzle | 20% | 8–11 | A pé (grama) |
| Patrat | 20% | 8 | A pé (grama) |
| Lillipup | 10% | 9 | A pé (grama) |
| Purrloin | 10% | 9 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_3
Nota: Wellspring Cave (side, entre Striaton e Route 3) não entrou —
opcional, sem Pokémon selvagem exclusivo relevante pro caminho principal.

### Lenora (Ginásio 2 — Normal)
| Pokémon | Nível | Tipo |
|---|---|---|
| Herdier | 18 | Normal |
| Watchog | 20 | Normal |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lenora

---

## Trecho 3 — Nacrene → Castelia (Ginásio 3: Burgh, Bug)

Locais: Pinwheel Forest, Skyarrow Bridge, Castelia City.

### Pinwheel Forest
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Tympole | 40% | 12–15 | A pé (grama) |
| Pidove | 30% | 12–13 | A pé (grama) |
| Timburr | 20% | 13–14 | A pé (grama) |
| Throh | 10% | 12, 15 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Pinwheel_Forest
Nota: área interna da floresta tem tabela própria com Tranquill/Swadloon
em nível mais alto (23–25) — não incluída, mesmo espírito de "só a tabela
principal" já aplicado a outras cavernas/florestas multi-área.

### Skyarrow Bridge
Sem encontro selvagem (ponte suspensa, só NPCs e itens).

Fonte: https://bulbapedia.bulbagarden.net/wiki/Skyarrow_Bridge

### Castelia City
Sem encontro selvagem na cidade principal (Castelia Park, com sua própria
tabela, só existe em Black 2/White 2 — fora de escopo aqui).

### Burgh (Ginásio 3 — Bug)
| Pokémon | Nível | Tipo |
|---|---|---|
| Whirlipede | 21 | Bug/Poison |
| Dwebble | 21 | Bug/Rock |
| Leavanny | 23 | Bug/Grass |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Burgh

---

## Trecho 4 — Castelia → Nimbasa (Ginásio 4: Elesa, Electric)

Locais: Route 4, Desert Resort, Nimbasa City.

### Route 4
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Sandile | 40% | 15–18 | A pé (areia funda) |
| Darumaka | 40% | 15–18 | A pé (areia funda) |
| Scraggy | 20% | 16–17 | A pé (areia funda) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_4
Nota: rota de deserto (não grama) — conecta Castelia (leste) a Nimbasa
(norte), com Desert Resort a oeste.

### Desert Resort
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Sandile | 40% | 19–22 | A pé (areia funda) |
| Darumaka | 30% | 19–20 | A pé (areia funda) |
| Maractus | 10% | 20 | A pé (areia funda) |
| Scraggy | 10% | 20 | A pé (areia funda) |
| Dwebble | 10% | 20–22 | A pé (areia funda) |
| Sigilyph | 10% | 20 | A pé (areia funda) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Desert_Resort
Nota: dá acesso ao Relic Castle (pendência — masmorra própria, não
pesquisada em detalhe).

### Nimbasa City
Sem encontro selvagem.

### Elesa (Ginásio 4 — Electric)
| Pokémon | Nível | Tipo |
|---|---|---|
| Emolga | 25 | Electric/Flying |
| Emolga | 25 | Electric/Flying |
| Zebstrika | 27 | Electric |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Elesa

---

## Trecho 5 — Nimbasa → Driftveil (Ginásio 5: Clay, Ground)

Locais: Route 5, Driftveil Drawbridge, Driftveil City.

### Route 5
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Minccino | 30% | 19–22 | A pé (grama) |
| Gothita | 20% | 19–22 | A pé (grama) |
| Liepard | 20% | 20, 22 | A pé (grama) |
| Trubbish | 20% | 19, 21 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_5
Nota Black/White: Gothita (Black) vira Solosis (White).

### Driftveil Drawbridge
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Ducklett | 100% | 22–25 | Sombra voando (mecânica própria da ponte) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Driftveil_Drawbridge

### Clay (Ginásio 5 — Ground)
| Pokémon | Nível | Tipo |
|---|---|---|
| Krokorok | 29 | Ground/Dark |
| Palpitoad | 29 | Water/Ground |
| Excadrill | 31 | Ground/Steel |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Clay

---

## Trecho 6 — Driftveil → Mistralton (Ginásio 6: Skyla, Flying)

Locais: Route 6, Chargestone Cave, Mistralton City.

### Route 6
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Deerling (Primavera) | 35% | 22–24 | A pé (grama) |
| Karrablast | 25% | 22–24 | A pé (grama) |
| Tranquill | 15% | 23–25 | A pé (grama) |
| Foongus | 15% | 23–25 | A pé (grama) |
| Swadloon | 10% | 23 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_6
Nota: Deerling/Vanillite mudam por estação do jogo — só a tabela de
Primavera entrou (ver Metodologia).

### Chargestone Cave
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Joltik | 39% | 24–27 | A pé (caverna) |
| Klink | 29% | 25–27 | A pé (caverna) |
| Ferroseed | 20% | 24–26 | A pé (caverna) |
| Boldore | 10% | 24 | A pé (caverna) |
| Tynamo | 2% | 27 | A pé (caverna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Chargestone_Cave
Nota: Drilbur também aparece em "nuvens de poeira" (100%, todas as áreas)
— não incluído, mesma decisão de simplificação de mecânicas de encontro
especial já tomada nas regiões anteriores.

### Mistralton City
Sem encontro selvagem.

### Skyla (Ginásio 6 — Flying)
| Pokémon | Nível | Tipo |
|---|---|---|
| Swoobat | 33 | Psychic/Flying |
| Unfezant | 33 | Normal/Flying |
| Swanna | 35 | Water/Flying |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Skyla

---

## Trecho 7 — Mistralton → Icirrus (Ginásio 7: Brycen, Ice)

Locais: Route 7, Twist Mountain, Icirrus City.

### Route 7
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Tranquill | 30% | 26, 28 | A pé (grama) |
| Cubchoo | 30% | 26, 28 | A pé (grama) |
| Watchog | 20% | 27–29 | A pé (grama) |
| Zebstrika | 20% | 27, 29 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_7
Nota: Celestial Tower (side, ao norte) não entrou — opcional, sem
progressão obrigatória. Deerling (Primavera) e Foongus também aparecem
nessa rota; tabela acima já prioriza os 4 mais citados.

### Twist Mountain
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Boldore | 49% | 28–31 | A pé (caverna, Primavera) |
| Gurdurr | 30% | 28–30 | A pé (caverna, Primavera) |
| Woobat | 15% | 28–31 | A pé (caverna) |
| Cubchoo | 10% | 28 | A pé (caverna, Primavera) |
| Cryogonal | 5% | 28–31 | A pé (caverna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Twist_Mountain
Nota: taxas mudam por estação (Primavera usada, ver Metodologia); Drilbur
em nuvem de poeira (100%) não incluído.

### Icirrus City
Sem encontro selvagem.

### Brycen (Ginásio 7 — Ice)
| Pokémon | Nível | Tipo |
|---|---|---|
| Vanillish | 37 | Ice |
| Cryogonal | 37 | Ice |
| Beartic | 39 | Ice |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Brycen

---

## Trecho 8 — Icirrus → Opelucid (Ginásio 8: Drayden, Dragon) → Elite Four → Campeão

Locais: Route 8, Tubeline Bridge, Route 9, Opelucid City, Route 10,
Victory Road.

### Route 8
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Palpitoad | 40% | 30–33 | A pé (grama/poça) |
| Shelmet | 40% | 30–33 | A pé (grama/poça) |
| Stunfisk | 20% | 31–32 | A pé (grama/poça) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_8
Nota: Moor of Icirrus (side, ao norte) não entrou — opcional.

### Tubeline Bridge
Sem encontro selvagem (ponte suspensa, só NPCs e itens).

Fonte: https://bulbapedia.bulbagarden.net/wiki/Tubeline_Bridge

### Route 9
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Gothorita | 30% | 31–34 | A pé (grama) |
| Pawniard | 20% | 31–34 | A pé (grama) |
| Minccino | 20% | 32 | A pé (grama) |
| Garbodor | 20% | 31–33 | A pé (grama) |
| Liepard | 10% | 33 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_9
Nota Black/White: Gothorita (Black) vira Duosion (White). Challenger's
Cave (side, ao sul) não entrou — pós-jogo.

### Opelucid City
Sem encontro selvagem.

### Drayden (Ginásio 8 — Dragon)
| Pokémon | Nível | Tipo |
|---|---|---|
| Fraxure | 41 | Dragon |
| Druddigon | 41 | Dragon |
| Haxorus | 43 | Dragon |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Drayden
Nota: em White, Iris substitui Drayden (mesmo time, papel de líder) —
seguido Black do início ao fim por consistência (ver Metodologia).

### Route 10
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Herdier | 30% | 33–34 | A pé (grama) |
| Rufflet | 30% | 34, 36 | A pé (grama) |
| Bouffalant | 20% | 34–35 | A pé (grama) |
| Throh | 10% | 33, 36 | A pé (grama) |
| Foongus | 10% | 34–35 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Unova_Route_10
Nota Black/White: Throh (Black) vira Sawk (White); Rufflet (Black) vira
Vullaby (White).

### Victory Road (Unova)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Durant | 40% | 37–42 | A pé (caverna) |
| Boldore | 25% | 37–41 | A pé (caverna) |
| Woobat | 15% | 37–42 | A pé (caverna) |
| Mienfoo | 10% | 39–41 | A pé (caverna) |
| Heatmor | 10% (área externa) | 37–40 | A pé (externo) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Victory_Road_(Black_and_White)
Nota: tabela combina área externa (Fraxure, Mienfoo, Rufflet/Vullaby,
Heatmor) e caverna (Boldore, Woobat, Mienfoo, Durant) — simplificado numa
única lista, mesmo tratamento de outras masmorras multi-área; Excadrill
em nuvem de poeira (100%) não incluído.

### Elite Four de Unova

**Shauntal (Ghost)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Cofagrigus | 48 | Ghost |
| Jellicent | 48 | Water/Ghost |
| Golurk | 48 | Ground/Ghost |
| Chandelure | 50 | Ghost/Fire |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Shauntal

**Marshal (Fighting)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Throh | 48 | Fighting |
| Sawk | 48 | Fighting |
| Conkeldurr | 48 | Fighting |
| Mienshao | 50 | Fighting |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Marshal

**Grimsley (Dark)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Scrafty | 48 | Dark/Fighting |
| Krookodile | 48 | Ground/Dark |
| Liepard | 48 | Dark |
| Bisharp | 50 | Dark/Steel |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Grimsley

**Caitlin (Psychic)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Reuniclus | 48 | Psychic |
| Musharna | 48 | Psychic |
| Sigilyph | 48 | Psychic/Flying |
| Gothitelle | 50 | Psychic |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Caitlin

### Campeão: Alder
| Pokémon | Nível | Tipo |
|---|---|---|
| Accelgor | 75 | Bug |
| Bouffalant | 75 | Normal |
| Druddigon | 75 | Dragon |
| Vanilluxe | 75 | Ice |
| Escavalier | 75 | Bug/Steel |
| Volcarona | 77 | Bug/Fire |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alder
Nota: time FIXO — não varia por inicial escolhido (diferente do Campeão
de Kanto/Hoenn/Sinnoh/Kalos), simplifica a implementação (uma única
`CHAMPION_TEAM` em vez de `CHAMPION_TEAM_BY_STARTER`, ou os 3 iniciais
apontando pro mesmo time).

---

## Resumo — o que fazer com isto

- **~24 locais reais cobertos** (menos que Hoenn/Sinnoh/Kalos — Unova B/W
  tem uma progressão mais compacta/linear), organizados nos 8 trechos por
  insígnia.
- **Achado estrutural**: Ginásio 1 (Striaton) tem 3 líderes
  intercambiáveis por inicial escolhido — recomendo modelar como
  `GYMS_BY_STARTER` (mesmo padrão de `championTeamByStarter`), não
  escolher um só arbitrariamente. Ver nota na Metodologia.
- **8 ginásios + Elite Four (4) + Campeão**, todos com time e nível
  confirmados via Bulbapedia ao vivo. Campeão (Alder) tem time FIXO, não
  depende do inicial — mais simples que as regiões anteriores.
- **Pendências explícitas** (não fabricadas): Wellspring Cave, Dreamyard,
  Relic Castle (dentro de Desert Resort), Castelia Sewers/Park (só em
  B2/W2), Celestial Tower, Moor of Icirrus, Dragonspiral Tower (side norte
  de Icirrus — conteúdo de N/lendário, provavelmente pós-jogo), Challenger's
  Cave, Route 11/16/17/18 e além (pós-jogo/Black2-White2). Se algum desses
  precisar entrar no jogo, pesquisar antes de codificar.
- **Mecânica nova da Gen 5 fora de escopo, registrada aqui pra não
  esquecer**: sazonalidade (grama muda o ano inteiro em ciclo de 4
  estações reais do relógio do 3DS/jogo — Route 6/7, Twist Mountain).
  Nenhuma vira mecânica nova no jogo — mesma decisão já tomada pra
  flores coloridas/swarm/Poké Radar nas regiões anteriores.
