# Rotas de Alola — dados reais para o novo sistema de batalha

> Documento de pesquisa/design. Segue o mesmo modelo de `docs/ROTAS-KANTO.md`,
> `docs/ROTAS-JOHTO.md`, `docs/ROTAS-HOENN.md`, `docs/ROTAS-SINNOH.md`,
> `docs/ROTAS-UNOVA.md` e `docs/ROTAS-KALOS.md`. Os iniciais de Alola
> (Rowlet #722, Litten #725, Popplio #728) entram no nível 5, mesmo padrão
> das regiões anteriores.

## Metodologia

- Fonte única: **Bulbapedia**, dados de encontro selvagem da versão
  **Pokémon Sun** (Geração VII) — quando Sun e Moon divergem, só ficou o
  lado de **Sun**, anotado onde acontece.
- **Alola não tem Ginásios tradicionais** — tem Provações (Trial, com
  batalha contra um Pokémon Totem) e Grandes Provações (Grand Trial, contra
  um Kahuna). Decisão de projeto já tomada (não relitigada aqui): **ambas
  viram `GymDefinition`** no nosso sistema, só trocando o texto de
  "líder de ginásio" por flavor de provação/kahuna. Para cada Provação,
  documentei **dois times**: o do Capitão da Provação (flavor/NPC que
  conduz o desafio) e o do **Totem + aliado(s)** convocado(s) em batalha —
  é o Totem quem realmente battle o jogador no fim da provação, então
  recomendo usar **Totem+aliados como o time do `GymDefinition`** e o
  Capitão só como texto de flavor, exatamente como pedido. Para Grandes
  Provações (Kahuna), não há Totem — o Kahuna mesmo é quem bate.
- **Achado estrutural sobre os Capitães**: nem todo Capitão tem um time
  pessoal documentado lutando antes do Totem na campanha principal de Sun.
  Confirmado espécie por espécie via Bulbapedia:
  - Ilima e Hala **têm** time próprio documentado (Ilima também tem uma
    segunda rebatalha pós-jogo na Trainers' School, não usada aqui).
  - Lana e Kiawe têm um time pessoal listado na Bulbapedia com Z-Cristal
    equipado no membro mais forte — sinal de que é provavelmente o time de
    **rebatalha/pós-provação**, não o encontro do dia 1; documentado aqui
    mesmo assim como flavor, com a ressalva.
  - Mallow **não tem tabela própria para Sun** na Bulbapedia (só existe
    tabela dela para **Moon**) — a página de Lush Jungle confirma que ela
    conduz a provação em Sun, mas sem time de batalha pessoal documentado
    nessa versão. Usei o time de Moon como flavor de baixa confiança,
    sinalizado na tabela dela.
  - Sophocles e Acerola **não têm time pessoal documentado** para a
    provação principal em nenhuma versão nas páginas consultadas — só o
    Totem bate no jogador. Sem time de captão pra esses dois.
  - A 10ª provação (Totem Kommo-o, Vast Poni Canyon) **não tem capitão** —
    é enfrentada em dupla com outro NPC (Totem direto), mantida como
    entrada própria na lista de provações pedida.
- **Kahunas reaparecem na Elite Four** (2ª aparição, pós-jogo, times
  diferentes/mais fortes) — documentado os dois times (Grande Provação e
  Elite Four) pra Hala, Olivia e Acerola (que assume a vaga de Nanu — ele
  recusou entrar pra Elite Four, texto confirmado na Bulbapedia). Nanu só
  tem o time da Grande Provação.
- **Mecânica nova da Gen 7 fora de escopo**: Island Scan / QR Scanner
  (Pokémon exclusivos por dia da semana, escaneando um QR code) — mesmo
  tratamento já dado a Poké Radar (Sinnoh), swarm (Johto) e flores
  coloridas (Kalos): não entra nas tabelas. SOS Battles (aliado
  selvagem convocado em batalha comum, ex.: Elekid chamando Electabuzz)
  também ficaram de fora das tabelas de encontro comum, mesmo espírito de
  não documentar mecânica de batalha (como itens/habilidades já não
  entravam nas tabelas anteriores) — a única convocação de aliado
  registrada aqui é a de **Totem Pokémon**, porque é estrutural pra
  provação (pedido explícito).
- **Encontros por "nuvem de terra"/emboscada/perseguição** (Alolan
  Diglett, Wimpod etc.) foram mantidos como método próprio — não é
  mecânica nova, é só outro "tipo de grama" de Gen 7 (mesmo tratamento já
  dado à ponte de Driftveil em Unova e aos montinhos de terra da Route 13
  de Kalos).
- **Ordenação de Ula'ula/Poni**: a lista de locais fornecida como
  esqueleto agrupa os locais por ilha, não estritamente na ordem de
  progressão da história. Reordenei dentro de cada trecho usando a
  progressão real do jogo (ex.: Mount Lanakila fica no fim, é o caminho
  pra Elite Four, não no meio de Ula'ula) — sinalizado onde acontece.
  Todos os locais do esqueleto aparecem, nenhum foi descartado.
- **Números de Pokédex Nacional**: escritos entre parênteses na primeira
  aparição de cada espécie em uma tabela, ex. "Rattata Alolana (#19)".
  Formas de Alola mantêm o número da espécie base (ex. Rattata Alolana é
  #19, igual ao Rattata comum).
- **Qualidade dos dados**: todas as tabelas vieram de WebFetch ao vivo
  nesta sessão. Times de Kahuna, Totem e Elite Four são de alta confiança
  (páginas de local/treinador, dado estruturado). Confiança um pouco menor
  que Kalos/Unova em: (a) times "pessoais" de Lana/Kiawe (possível
  time de rebatalha, não dia 1, ver acima), (b) time de Mallow (só existe
  documentado pra Moon), (c) nível exato de alguns aliados de Totem quando
  fontes divergiam (Mimikyu: usei os níveis da página do local, que
  destoam de uma busca secundária — ver nota na tabela de Acerola).

---

## Trecho 1 — Hau'oli City → Verdant Cavern (Provação 1: Ilima, Normal)

Locais: Hau'oli City, Route 1, Route 2, Route 3, Melemele Meadow, Verdant
Cavern.

### Hau'oli City (Distrito Comercial)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Rattata Alolana (#19) | 20% | 5–8 | A pé (urbano) |
| Meowth Alolano (#52) | 10% | 5–8 | A pé (urbano) |
| Abra (#63) | 25% | 5–8 | A pé (urbano) |
| Magnemite (#81) | 10% | 5–8 | A pé (urbano) |
| Grimer Alolano (#88) | 10% | 5–8 | A pé (urbano) |
| Pichu (#172) | 5% | 5–8 | A pé (urbano) |
| Wingull (#278) | 20% | 5–8 | A pé (urbano) |
| Yungoos (#734) | 20% | 5–8 | A pé (urbano) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hau%27oli_City
Nota: Klink por Island Scan (quinta-feira) não incluído (ver Metodologia).

### Route 1 (inclui Hau'oli City Outskirts)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Caterpie (#10) | 20% | 2–5 | A pé (grama) |
| Rattata Alolana | 30% | 2–13 | A pé (grama, noite) |
| Ledyba (#165) | 20% | 2–13 | A pé (grama, dia) |
| Spinarak (#167) | 20% | 2–13 | A pé (grama, noite) |
| Pikipek (#731) | 20–30% | 2–13 | A pé (grama) |
| Yungoos | 30% | 2–13 | A pé (grama, noite) |
| Grubbin (#736) | 10% | 3–5 | A pé (grama) |
| Metapod (#11) | 10% | 3–13 | A pé (grama) |
| Bonsly (#438) | 15% | 10–13 | A pé (grama) |
| Munchlax (#446) | 5% | 10–13 | A pé (grama) |
| Slowpoke (#79) | 20% | 5–7 | A pé (Hau'oli Outskirts) |
| Wingull | 50% | 5–7 | A pé (Hau'oli Outskirts) |
| Tentacool (#72) | 40% | 15–18 | Surf (Melemele Sea) |
| Finneon (#456) | 40% | 15–18 | Surf (Melemele Sea) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_1
Nota: colapsei 5 sub-campos de grama da rota (níveis 2–3 até 10–13) numa
única lista por espécie, mesmo tratamento dado a cavernas multi-área nas
regiões anteriores; Pichu de SOS-ally não incluído (ver Metodologia).

### Route 2
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Rattata Alolana | 10% | 7–10 | A pé (grama) |
| Meowth Alolano | 30% | 7–10 | A pé (grama) |
| Abra | 20% | 7–10 | A pé (grama) |
| Drowzee (#96) | 20% | 7–10 | A pé (grama) |
| Smeargle (#235) | 10–20% | 7–10 | A pé (grama) |
| Yungoos | 10% | 7–10 | A pé (grama) |
| Spearow (#21) | 40% | 7–10 | A pé (grama) |
| Growlithe (#58) | 20% | 7–10 | A pé (grama) |
| Cutiefly (#742) | 20% | 7–10 | A pé (grama) |
| Makuhita (#296) | 30% | 9–10 | Grama batendo (emboscada) |
| Crabrawler (#739) | 100% | 7–10 | Monte de berries |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_2

### Route 3
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Rattata Alolana | 10% | 9–12 | A pé (grama) |
| Spearow | 40–49% | 9–12 | A pé (grama) |
| Mankey (#56) | 20% | 9–12 | A pé (grama) |
| Delibird (#225) | 10% | 9–12 | A pé (grama) |
| Yungoos | 10% | 9–12 | A pé (grama) |
| Cutiefly | 20% | 9–12 | A pé (grama) |
| Bagon (#371) | 1% | 9–12 | A pé (grama) |
| Rufflet (#627) | 30% | 11–12 | Sombra voando (emboscada) |
| Vullaby (#629) | 30% | 11–12 | Sombra voando (emboscada) |
| Crabrawler | 100% | 9–12 | Monte de berries |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_3

### Melemele Meadow
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Caterpie | 10% | 9–12 | A pé (flores amarelas) |
| Metapod | 9% | 9–12 | A pé (flores amarelas) |
| Butterfree (#12) | 1% | 9–12 | A pé (flores amarelas) |
| Petilil (#548) | 30% | 9–12 | A pé (flores amarelas) |
| Oricorio (Estilo Pom-Pom) (#741) | 20% | 9–12 | A pé (flores amarelas) |
| Cutiefly | 30% | 9–12 | A pé (flores amarelas) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Melemele_Meadow

### Verdant Cavern
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Zubat (#41) | 70% | 8–11 | A pé (caverna) |
| Diglett Alolano (#50) | 30% | 8–11 | A pé (caverna) |
| Rattata Alolana | 100% | 11 | Nuvem de terra (emboscada) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Verdant_Cavern
Nota: só os encontros acima aparecem antes de terminar a provação de
Ilima; Totem e capitão abaixo.

### Ilima (Capitão da Provação — flavor)
| Pokémon | Nível | Tipo |
|---|---|---|
| Yungoos | 9 | Normal |
| Smeargle | 10 | Normal |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Ilima

### Totem Gumshoos + aliado (batalha real da provação)
| Pokémon | Nível | Tipo |
|---|---|---|
| Gumshoos (#735) — Totem, Pecha Berry, Adaptability | 12 | Normal |
| Yungoos — aliado convocado | 10 | Normal |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Verdant_Cavern

---

## Trecho 2 — Verdant Cavern → Iki Town (Grande Provação: Hala, Fighting)

Locais: Ten Carat Hill, Iki Town.

### Ten Carat Hill
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Zubat | 30% | 10–13 | A pé (caverna) |
| Diglett Alolano | 20% | 10–13 | A pé (caverna) |
| Roggenrola (#524) | 20–30% | 10–13 | A pé (caverna) |
| Carbink (#703) | 20% | 10–13 | A pé (caverna) |
| Psyduck (#54) | 20% | 15–18 | Surf |
| Machop (#66) | 30% | 10–13 | A pé (Farthest Hollow) |
| Spinda (#327) | 10% | 10–13 | A pé (Farthest Hollow) |
| Rockruff (#744) | 20% | 10–13 | A pé (Farthest Hollow) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Ten_Carat_Hill
Nota: caverna principal e Farthest Hollow (área interna) colapsadas numa
lista só, mesmo tratamento de cavernas multi-área das regiões anteriores;
Deino de Island Scan não incluído.

### Iki Town
Sem encontro selvagem (só o campo do festival e a Grande Provação).

### Hala (Kahuna — Grande Provação, Fighting)
| Pokémon | Nível | Tipo |
|---|---|---|
| Mankey | 14 | Fighting |
| Makuhita | 14 | Fighting |
| Crabrawler | 15 | Fighting |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hala

### Hala — time da Elite Four (pós-jogo, reaparece)
| Pokémon | Nível | Tipo |
|---|---|---|
| Hariyama (#297) | 54 | Fighting |
| Primeape (#57) | 54 | Fighting |
| Bewear (#760) | 54 | Normal/Fighting |
| Poliwrath (#62) | 54 | Water/Fighting |
| Crabominable (#740) | 55 | Fighting/Ice |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hala
Nota: Crabominable recebe Z-Move na primeira oportunidade em ambas as
aparições, segundo a fonte — Pokémon "ace" de Hala.

---

## Trecho 3 — Heahea → Brooklet Hill (Provação 3: Lana, Water)

Locais: Heahea City, Route 4, Route 5, Route 6, Route 7, Route 8,
Route 9, Paniola Town, Paniola Ranch, Brooklet Hill.

### Heahea City
Sem encontro selvagem documentado em Sun (confirmado via Bulbapedia).

### Route 4
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Rattata Alolana | 10% | 11–14 | A pé (grama) |
| Eevee (#133) | 5% | 11–14 | A pé (grama) |
| Igglybuff (#174) | 10% | 11–14 | A pé (grama) |
| Lillipup (#506) | 30% | 11–14 | A pé (grama) |
| Pikipek | 15% | 11–14 | A pé (grama) |
| Yungoos | 10% | 11–14 | A pé (grama) |
| Grubbin | 10% | 11–14 | A pé (grama) |
| Mudbray (#749) | 20% | 11–14 | A pé (grama) |
| Crabrawler | 100% | 11–14 | Monte de berries |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_4
Nota: Venipede de Island Scan não incluído.

### Route 5
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Caterpie | 10–15% | 13–21 | A pé (grama) |
| Metapod | 9–10% | 13–21 | A pé (grama) |
| Butterfree | 1–5% | 13–21 | A pé (grama) |
| Lillipup | 30% | 13–16 | A pé (grama) |
| Pikipek | 20% | 13–16 | A pé (grama) |
| Grubbin | 10% | 13–16 | A pé (grama) |
| Fomantis (#753) | 20–30% | 13–21 | A pé (grama) |
| Crabrawler | 100% | 13–16 | Monte de berries |
| Bonsly | 10% | 18–21 | A pé (grama) |
| Trumbeak (#732) | 20% | 18–21 | A pé (grama) |
| Diglett Alolano | 100% | 18–21 | Nuvem de terra (emboscada) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_5
Nota: metade sul e metade norte colapsadas numa lista só; Bounsweet (troca)
e Bellsprout (Island Scan) não incluídos.

### Route 6
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Rattata Alolana | 10% | 14–17 | A pé (grama, noite) |
| Eevee | 5% | 14–17 | A pé (grama) |
| Igglybuff | 10% | 14–17 | A pé (grama, dia) |
| Lillipup | 30% | 14–17 | A pé (grama) |
| Pikipek | 15–25% | 14–17 | A pé (grama) |
| Yungoos | 10% | 14–17 | A pé (grama, dia) |
| Grubbin | 10% | 14–17 | A pé (grama) |
| Mudbray | 20% | 14–17 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_6
Nota: 3 campos de grama colapsados numa lista só (mesmos encontros);
Gothita (#574) de Island Scan não incluída.

### Route 7
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Diglett Alolano | 100% | 16–19 | Nuvem de terra (emboscada) |
| Tentacool | 30% | 16–19 | Surf |
| Wingull | 20% | 16–19 | Surf |
| Finneon | 30–40% | 16–19 | Surf |
| Pyukumuku (#771) | 20% | 16–19 | Surf |
| Magikarp (#129) | 79% | 10–19 | Pesca |
| Wishiwashi (#746) | 20% | 10–19 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_7
Nota: Spheal de Island Scan não incluído.

### Route 8
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Rattata Alolana | 30% | 17–20 | A pé (grama) |
| Fletchinder (#662) | 15% | 17–20 | A pé (grama) |
| Pikipek | 30% | 17–20 | A pé (grama) |
| Yungoos | 30% | 17–20 | A pé (grama) |
| Salandit (#757) | 20% | 17–20 | A pé (grama) |
| Stufful (#759) | 5% | 17–20 | A pé (grama) |
| Crabrawler | 100% | 17–20 | Monte de berries |
| Wimpod (#767) | 100% | 17–20 | Perseguição (emboscada) |
| Tentacool | 40% | 17–20 | Surf |
| Wingull | 20% | 17–20 | Surf |
| Finneon | 40% | 17–20 | Surf |
| Magikarp | 60–79% | 10–20 | Pesca |
| Chinchou (#170) | 1–20% | 10–20 | Pesca |
| Wishiwashi | 20% | 10–20 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_8

### Route 9
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Magikarp | 15% | 10–23 | Pesca |
| Corsola (#222) | 5% | 10–23 | Pesca |
| Luvdisc (#370) | 70% | 10–23 | Pesca |
| Wishiwashi | 10% | 10–23 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_9
Nota: rota marítima só com pesca, liga Akala a Ula'ula.

### Paniola Town
Sem encontro em terra; só pesca.
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Magikarp | 99% | 10–18 | Pesca |
| Barboach (#339) | 1% | 10–18 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Paniola_Town

### Paniola Ranch
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Tauros (#128) | 5% | 12–15 | A pé (grama) |
| Miltank (#241) | 5% | 12–15 | A pé (grama) |
| Lillipup | 40% | 12–15 | A pé (grama) |
| Mudbray | 50% | 12–15 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Paniola_Ranch

### Brooklet Hill
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Paras (#46) | 20% | 14–17 | A pé (grama) |
| Psyduck | 20–30% | 14–17 | A pé (grama)/Surf |
| Poliwag (#60) | 10% | 14–17 | A pé (grama) |
| Wingull | 10% | 14–17 | A pé (grama) |
| Surskit (#283) | 10–40% | 14–17 | A pé (grama)/Surf |
| Lillipup | 20% | 14–17 | A pé (grama) |
| Dewpider (#751) | 10–40% | 14–17 | A pé (grama)/Surf |
| Morelull (#755) | 20% | 14–17 | A pé (grama) |
| Goldeen (#118) | 29% | 10–15 | Pesca |
| Magikarp | 70% | 10–15 | Pesca |
| Feebas (#349) | 1% | 10–15 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Brooklet_Hill

### Lana (Capitã da Provação — flavor, possível time de rebatalha)
| Pokémon | Nível | Tipo |
|---|---|---|
| Chinchou | 26 | Water/Electric |
| Shellder (#90) | 26 | Water |
| Araquanid (#752) — Waterium Z | 27 | Water/Bug |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lana
Nota: time equipado com Z-Cristal, sinal de rebatalha pós-provação, não
necessariamente o encontro do dia 1 (ver Metodologia).

### Totem Wishiwashi (Forma Cardume) + aliados (batalha real da provação)
| Pokémon | Nível | Tipo |
|---|---|---|
| Wishiwashi (Forma Cardume) — Totem | 20 | Water |
| Wishiwashi — aliado (convocado 1º turno) | 18 | Water |
| Alomomola (#594) — aliado (convocado com HP < 50%) | 18 | Water |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Brooklet_Hill

---

## Trecho 4 — Brooklet Hill → Wela Volcano Park (Provação 4: Kiawe, Fire)

Locais: Wela Volcano Park.

### Wela Volcano Park
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Cubone (#104) | 24% | 16–19 | A pé (grama) |
| Kangaskhan (#115) | 1% | 16–19 | A pé (grama) |
| Magby (#240) | 15% | 16–19 | A pé (grama) |
| Fletchling (#661) | 30% | 16–19 | A pé (grama) |
| Salandit | 30% | 16–19 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Wela_Volcano_Park

### Kiawe (Capitão da Provação — flavor, possível time de rebatalha)
| Pokémon | Nível | Tipo |
|---|---|---|
| Growlithe | 26 | Fire |
| Fletchinder | 26 | Fire/Flying |
| Marowak (#105) | 27 | Fire/Ghost |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kiawe
Nota: mesma ressalva de Lana — time provavelmente de rebatalha.

### Totem Salazzle + aliado (batalha real da provação)
| Pokémon | Nível | Tipo |
|---|---|---|
| Salazzle (#758) — Totem | 22 | Poison/Fire |
| Salandit — aliado convocado | 20 | Poison/Fire |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Wela_Volcano_Park
Nota: Totem convoca Salandit adicionais continuamente, segundo a fonte,
independente de quantos já foram derrotados — mecânica própria dessa
provação, mantida como nota (não achatada em "1 aliado só").

---

## Trecho 5 — Wela Volcano Park → Lush Jungle (Provação 5: Mallow, Grass)

Locais: Lush Jungle.

### Lush Jungle
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Caterpie | 5–20% | 18–21 | A pé (grama) |
| Metapod | 5–20% | 18–21 | A pé (grama) |
| Paras | 5–20% | 18–21 | A pé (grama) |
| Bonsly | 5–20% | 18–21 | A pé (grama) |
| Trumbeak | 5–20% | 18–21 | A pé (grama) |
| Fomantis | 5–20% | 18–21 | A pé (grama) |
| Morelull | 5–20% | 18–21 | A pé (grama) |
| Comfey (#764) | 5–20% | 18–21 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lush_Jungle
Nota: Goomy (#704) e Castform (#351) só aparecem com chuva (mecânica
climática) — mantidos fora da tabela principal, mesmo tratamento dado a
encontros dependentes de clima nas regiões anteriores quando não eram o
foco da rota.

### Mallow (Capitã da Provação — flavor, baixa confiança)
| Pokémon | Nível | Tipo |
|---|---|---|
| Phantump (#708) | 26 | Ghost/Grass |
| Shiinotic (#756) | 26 | Grass/Fairy |
| Steenee (#762) | 27 | Grass |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Mallow
Nota: **baixa confiança** — esse time só está documentado pra versão Moon
na Bulbapedia; a página de Lush Jungle confirma Mallow como capitã em Sun
mas não lista time pessoal próprio pra essa versão (ver Metodologia). Não
afeta a batalha real (Totem abaixo), só o flavor.

### Totem Lurantis + aliados (batalha real da provação)
| Pokémon | Nível | Tipo |
|---|---|---|
| Lurantis (#754) — Totem, Power Herb, +2 Speed | 24 | Grass |
| Trumbeak — aliado (convocado 1º) | 22 | Normal/Flying |
| Castform — aliado (convocado se Trumbeak cair) | 22 | Normal |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Lush_Jungle

---

## Trecho 6 — Lush Jungle → Akala Outskirts (Grande Provação: Olivia, Rock)

Locais: Diglett's Tunnel, Konikoni City, Memorial Hill, Akala Outskirts.

### Diglett's Tunnel
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Zubat | 70% | 19–22 | A pé (caverna) |
| Diglett Alolano | 30–100% | 19–22 | A pé (caverna)/Nuvem de terra |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Diglett%27s_Tunnel

### Konikoni City
Sem encontro selvagem em Sun/Moon padrão.

### Memorial Hill
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Zubat | 20% | 20–23 | A pé (grama) |
| Gastly (#92) | 50% | 20–23 | A pé (grama) |
| Phantump | 30% | 20–23 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Memorial_Hill

### Akala Outskirts
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana (#20) | 30% | 20–23 | A pé (grama) |
| Wingull | 50% | 20–23 | A pé (grama) |
| Nosepass (#299) | 15% | 20–23 | A pé (grama) |
| Gumshoos | 30% | 20–23 | A pé (grama) |
| Stufful | 5% | 20–23 | A pé (grama) |
| Magikarp | 60–79% | 10–23 | Pesca |
| Chinchou | 1–20% | 10–23 | Pesca |
| Wishiwashi | 20% | 10–23 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Akala_Outskirts
Nota: Honedge (#679) de Island Scan não incluído. Batalha de Olivia
acontece nas Ruins of Life, dentro desta área (sub-local de destino da
Grande Provação, não uma rota própria).

### Olivia (Kahuna — Grande Provação, Rock)
| Pokémon | Nível | Tipo |
|---|---|---|
| Nosepass | 26 | Rock |
| Boldore (#525) | 26 | Rock |
| Lycanroc (#745) | 27 | Rock |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Olivia

### Olivia — time da Elite Four (pós-jogo, reaparece)
| Pokémon | Nível | Tipo |
|---|---|---|
| Relicanth (#369) | 54 | Water/Rock |
| Carbink | 54 | Rock/Fairy |
| Golem Alolano (#76) | 54 | Rock/Electric |
| Probopass (#476) | 54 | Rock/Steel |
| Lycanroc | 55 | Rock |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Olivia

---

## Trecho 7 — Malie City → Mount Hokulani (Provação 7: Sophocles, Electric)

Locais: Malie City, Route 10, Route 11, Mount Hokulani.

### Malie City
Sem encontro selvagem na cidade principal. A área anexa "Outer Cape" tem
tabela própria:
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 20% | 24–27 | A pé (grama) |
| Magnemite | 20% | 24–27 | A pé (grama) |
| Grimer Alolano | 30% | 24–27 | A pé (grama) |
| Trubbish (#568) | 30% | 24–27 | A pé (grama) |
| Gumshoos | 20% | 24–27 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Malie_City

### Route 10
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 30% | 24–27 | A pé (grama) |
| Fearow (#22) | 30–80% | 24–27 | A pé (grama)/Árvores balançando |
| Ledian (#166) | 20% | 24–27 | A pé (grama) |
| Ariados (#168) | 20% | 24–27 | A pé (grama) |
| Skarmory (#227) | 10–20% | 24–27 | A pé (grama)/Árvores balançando |
| Pancham (#674) | 10% | 24–27 | A pé (grama) |
| Gumshoos | 30% | 24–27 | A pé (grama) |
| Crabrawler | 100% | 24–27 | Monte de berries |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_10
Nota: Staravia de Island Scan não incluída.

### Route 11
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 20% | 24–27 | A pé (grama) |
| Paras | 10% | 24–27 | A pé (grama) |
| Ledian | 20% | 24–27 | A pé (grama) |
| Ariados | — | 24–27 | A pé (grama) |
| Pancham | 20% | 24–27 | A pé (grama) |
| Trumbeak | 20% | 24–27 | A pé (grama) |
| Gumshoos | 20% | 24–27 | A pé (grama) |
| Morelull | — | 24–27 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_11
Nota: Komala (#775) e Vigoroth (#288) de Island Scan não incluídos.

### Mount Hokulani
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Fearow | 30–40% | 25–28 | A pé (grama) |
| Ditto (#132) | 10% | 25–28 | A pé (grama) |
| Cleffa (#173) | 10% | 25–28 | A pé (grama, noite) |
| Skarmory | 10% | 25–28 | A pé (grama) |
| Beldum (#374) | 10% | 25–28 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Mount_Hokulani
Nota: Minior (#774) e Axew (#610) de Island Scan não incluídos.

### Sophocles (Capitão da Provação)
Sem time pessoal documentado para a campanha principal em Sun — só o
Totem bate no jogador (ver Metodologia).

### Totem Vikavolt + aliados (batalha real da provação)
| Pokémon | Nível | Tipo |
|---|---|---|
| Vikavolt (#738) — Totem, Occa Berry, Levitate | 29 | Bug/Electric |
| Charjabug (#737) — aliado, Vice Grip | 28 | Bug/Electric |
| Charjabug — aliado, Spark | 28 | Bug/Electric |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hokulani_Observatory

---

## Trecho 8 — Mount Hokulani → Thrifty Megamart (Provação 8: Acerola, Ghost)

Locais: Route 12, Route 13, Blush Mountain, Tapu Village, Po Town,
Thrifty Megamart.

### Route 12
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Geodude Alolano (#74) | 40% | 25–29 | A pé (grama) |
| Elekid (#239) | 10% | 25–29 | A pé (grama) |
| Torkoal (#324) | 20% | 25–29 | A pé (grama) |
| Mudbray | 30% | 25–29 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_12

### Route 13
Sem encontro em terra; só pesca.
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Magikarp | 50–79% | 10–30 | Pesca |
| Wishiwashi | 20–30% | 10–30 | Pesca |
| Bruxish (#779) | 1–20% | 10–30 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_13

### Blush Mountain
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Geodude Alolano | 30% | 27–30 | A pé (grama) |
| Elekid | 10% | 27–30 | A pé (grama) |
| Torkoal | 10% | 27–30 | A pé (grama) |
| Charjabug | 10% | 27–30 | A pé (grama) |
| Mudbray | 20% | 27–30 | A pé (grama) |
| Turtonator (#776) | 10% | 27–30 | A pé (grama) |
| Togedemaru (#777) | 10% | 27–30 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Blush_Mountain
Nota: campo oeste e leste colapsados numa lista só (mesmos encontros);
Rhyhorn de Island Scan não incluído.

### Tapu Village
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 30% | 28–31 | A pé (grama) |
| Sandshrew Alolano (#27) | 10% | 28–31 | A pé (grama) |
| Vulpix Alolano (#37) | 10% | 28–31 | A pé (grama) |
| Pelipper (#279) | 30% | 28–31 | A pé (grama) |
| Absol (#359) | 10% | 28–31 | A pé (grama) |
| Snorunt (#361) | 20% | 28–31 | A pé (grama) |
| Gumshoos | 30% | 28–31 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Tapu_Village

### Po Town
Sem encontro selvagem — só batalhas contra Capangas do Team Skull.

Fonte: https://bulbapedia.bulbagarden.net/wiki/Po_Town

### Thrifty Megamart (Abandoned Site)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Golbat (#42) | 40% | 29–32 | A pé (após a provação) |
| Haunter (#93) | 40% | 29–32 | A pé (após a provação) |
| Klefki (#707) | 15% | 29–32 | A pé (após a provação) |
| Mimikyu (#778) | 5% | 29–32 | A pé (após a provação) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Thrifty_Megamart_(Abandoned_Site)
Nota: Ula'ula Island, ao norte da Route 14; encontros só liberam depois de
completar a provação.

### Acerola (Capitã da Provação)
Sem time pessoal documentado para a campanha principal em Sun — só o
Totem bate no jogador (ver Metodologia).

### Totem Mimikyu + aliados (batalha real da provação)
| Pokémon | Nível | Tipo |
|---|---|---|
| Mimikyu — Totem, Lum Berry, +1 todos os status | 33 | Ghost/Fairy |
| Haunter — aliado (convocado 1º turno) | 27 | Ghost/Poison |
| Gengar (#94) — aliado (convocado com HP < 2/3) | 27 | Ghost/Poison |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Thrifty_Megamart_(Abandoned_Site)

### Acerola — time da Elite Four (pós-jogo, assume a vaga de Nanu)
| Pokémon | Nível | Tipo |
|---|---|---|
| Sableye (#302) | 54 | Dark/Ghost |
| Drifblim (#426) | 54 | Ghost/Flying |
| Dhelmise (#781) | 54 | Ghost/Grass |
| Froslass (#478) | 54 | Ice/Ghost |
| Palossand (#770) — Ghostium Z | 55 | Ghost/Ground |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Acerola

---

## Trecho 9 — Thrifty Megamart → Malie City (Grande Provação: Nanu, Dark)

Locais: Route 14, Route 15, Route 16, Route 17, Aether House, Haina
Desert.

### Route 14
Só surf e pesca (sem grama).
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Tentacool | 40% | 28–31 | Surf |
| Pelipper | 20% | 28–31 | Surf |
| Finneon | 40% | 28–31 | Surf |
| Magikarp | 50–79% | 10–31 | Pesca |
| Wishiwashi | 20–30% | 10–31 | Pesca |
| Bruxish | 1–20% | 10–31 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_14

### Route 15
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 30% | 30–33 | A pé (grama) |
| Slowpoke | 20% | 30–33 | A pé (grama) |
| Pelipper | 20–50% | 30–33 | A pé (grama)/Surf |
| Gumshoos | 30% | 30–33 | A pé (grama) |
| Tentacool | 40% | 30–33 | Surf |
| Finneon | 40% | 30–33 | Surf |
| Magikarp | 50–79% | 10–33 | Pesca (pode chamar Gyarados #130) |
| Wishiwashi | 20–30% | 10–33 | Pesca |
| Bruxish | 1–20% | 10–33 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_15

### Route 16
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 30% | 30–33 | A pé (grama) |
| Slowpoke | 20% | 30–33 | A pé (grama) |
| Pelipper | 50% | 30–33 | A pé (grama) |
| Gumshoos | 30% | 30–33 | A pé (grama) |
| Crabrawler | 100% | 30–33 | Monte de berries |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_16
Nota: Duosion (#578) de Island Scan não incluído; Zygarde de missão de
história não incluído (não é encontro selvagem comum).

### Route 17
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 30% | 31–34 | A pé (grama) |
| Fearow | 30% | 31–34 | A pé (grama) |
| Ledian | 20% | 31–34 | A pé (grama) |
| Gumshoos | 30% | 31–34 | A pé (grama, dia) |
| Graveler Alolano (#75) | 20% | 31–34 | A pé (grama marrom) |
| Skarmory | 10% | 31–34 | A pé (grama marrom) |
| Pancham | 10% | 31–34 | A pé (grama marrom) |
| Crabrawler | 100% | 31–34 | Monte de berries |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alola_Route_17
Nota: Goomy e Castform dependentes de clima (chuva/granizo/areia) não
incluídos, mesmo tratamento de Lush Jungle.

### Aether House
Sem encontro selvagem (ponto de história do Team Skull/Aether Foundation).

### Haina Desert
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Dugtrio Alolano (#51) | 20–30% | 28–31 | A pé (areia funda)/Nuvem de areia |
| Sandile (#551) | 70% | 28–31 | A pé (areia funda)/Nuvem de areia |
| Trapinch (#328) | 10% | 28–31 | Nuvem de areia (emboscada) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Haina_Desert
Nota: Gabite (#444) e Castform dependentes de clima (tempestade de
areia/chuva/granizo) não incluídos.

### Nanu (Kahuna — Grande Provação, Dark)
| Pokémon | Nível | Tipo |
|---|---|---|
| Sableye | 38 | Dark/Ghost |
| Krokorok (#552) | 38 | Ground/Dark |
| Persian Alolano (#53) | 39 | Dark |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Nanu
Nota: Nanu recusou a vaga na Elite Four — Acerola assume o posto no lugar
dele (ver Trecho 8). Sem time separado de Elite Four pra Nanu.

---

## Trecho 10 — Rumo a Poni: Vast Poni Canyon (Provação 10: Totem Kommo-o, Dragon)

Locais: Seafolk Village, Poni Meadow, Poni Wilds, Ancient Poni Path,
Poni Breaker Coast, Exeggutor Island, Vast Poni Canyon.

### Seafolk Village
Sem encontro em terra; só pesca.
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Magikarp | 79% | 10–43 | Pesca |
| Wailmer (#320) | 20% | 10–43 | Pesca |
| Dhelmise | 1% | 10–43 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Seafolk_Village

### Poni Meadow
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Cottonee (#546) | 50% | 54–57 | A pé (grama) |
| Petilil | 50% | 54–57 | A pé (grama) |
| Oricorio (Estilo Sensu) | 20% | 54–57 | A pé (grama) |
| Ribombee (#743) | 30% | 54–57 | A pé (grama) |
| Magikarp | 50–59% | 10–57 | Pesca |
| Dratini (#147) | 1–10% | 10–57 | Pesca |
| Barboach | 40% | 10–57 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Poni_Meadow
Nota: Leavanny (#542) de Island Scan não incluída.

### Poni Wilds
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 30% | 40–43 | A pé (grama) |
| Exeggcute (#102) | 10% | 40–43 | A pé (grama) |
| Granbull (#210) | 20% | 40–43 | A pé (grama) |
| Pelipper | 20–30% | 40–43 | A pé (grama)/Surf |
| Gastrodon (Mar do Leste) (#423) | 10–20% | 40–43 | A pé (grama)/Surf |
| Gumshoos | 30% | 40–43 | A pé (grama) |
| Crabrawler | 100% | 40–43 | Monte de berries |
| Wimpod | 100% | 40–43 | Perseguição (emboscada) |
| Tentacruel (#73) | 20% | 40–43 | Surf |
| Lapras (#131) | 5% | 40–43 | Surf |
| Lumineon (#457) | 25% | 40–43 | Surf |
| Wailmer | 90% | 40–43 | Água (emboscada) |
| Wailord (#321) | 10% | 40–43 | Água (emboscada) |
| Magikarp | 50–79% | 10–43 | Pesca |
| Relicanth | 1–10% | 10–43 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Poni_Wilds

### Ancient Poni Path
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 30% | 40–43 | A pé (grama) |
| Exeggcute | 10% | 40–43 | A pé (grama) |
| Granbull | 20% | 40–43 | A pé (grama) |
| Pelipper | 30% | 40–43 | A pé (grama) |
| Gastrodon (Mar do Leste) | 10% | 40–43 | A pé (grama) |
| Gumshoos | 30% | 40–43 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Ancient_Poni_Path
Nota: Emboar (#500) de Island Scan não incluído.

### Poni Breaker Coast
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Wimpod | 100% | 40–43 | Perseguição (emboscada) |
| Magikarp | 50–79% | 10–43 | Pesca |
| Sharpedo (#319) | 1–10% | 10–43 | Pesca |
| Wailmer | 20–40% | 10–43 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Poni_Breaker_Coast

### Exeggutor Island
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Exeggcute | 40% | 40–43 | A pé (grama) |
| Exeggutor Alolano (#103) | 20% | 40–43 | A pé (grama) |
| Pelipper | 30% | 40–43 | A pé (grama) |
| Gastrodon (Mar do Leste) | 10% | 40–43 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Exeggutor_Island
Nota: Sliggoo (#705) e Castform dependentes de chuva não incluídos;
Serperior de Island Scan não incluída.

### Vast Poni Canyon
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Machoke (#67) | 30% | 41–44 | A pé (grama) |
| Lycanroc (Forma Diurna) | 20% | 41–44 | A pé (grama) |
| Carbink | 15–20% | 41–44 | A pé (grama)/caverna |
| Jangmo-o (#782) | 5% | 41–44 | A pé (grama) |
| Murkrow (#198) | 10% | 41–44 | A pé (grama) |
| Skarmory | 10% | 41–44 | A pé (grama) |
| Boldore | 10–30% | 41–44 | A pé (grama)/caverna |
| Golbat | 30% | 41–44 | A pé (caverna) |
| Dugtrio Alolano | 20% | 41–44 | A pé (caverna) |
| Magikarp | 59% | 41–44 | Pesca |
| Barboach | 40% | 41–44 | Pesca |
| Dratini | 1% | 41–44 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Vast_Poni_Canyon
Nota: área externa (grama) e interna (caverna) colapsadas numa lista só,
mesmo tratamento de masmorras multi-área das regiões anteriores.

### Totem Kommo-o + aliados (batalha real da provação — sem capitão)
| Pokémon | Nível | Tipo |
|---|---|---|
| Kommo-o (#784) — Totem, Mental Herb | 45 | Dragon/Fighting |
| Hakamo-o (#783) — aliado (convocado 1º turno) | 32 | Dragon/Fighting |
| Scizor (#212) — aliado (convocado com HP < 2/3) | 32 | Bug/Steel |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Vast_Poni_Canyon
Nota: única provação sem Capitão dedicado — o jogador enfrenta o Totem
direto, acompanhado de outro NPC na história (sem batalha própria dele).

---

## Trecho 11 — Poni Grove → Vast Poni Canyon (Grande Provação: Hapu, Ground) → Elite Four → Campeão

Locais: Poni Grove, Poni Plains, Poni Coast, Poni Gauntlet, Mount
Lanakila.

Nota de ordenação: reposicionei Mount Lanakila para o fim deste trecho —
é o caminho de acesso à Pokémon League/Elite Four (equivalente à Victory
Road), não um local do meio de Ula'ula como a ordem bruta do esqueleto
sugeria (ver Metodologia).

### Poni Grove
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 30% | 52–55 | A pé (grama) |
| Pinsir (#127) | 10% | 52–55 | A pé (grama) |
| Granbull | 20% | 52–55 | A pé (grama) |
| Riolu (#447) | 10% | 52–55 | A pé (grama) |
| Trumbeak | 30% | 52–55 | A pé (grama) |
| Gumshoos | 30% | 52–55 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Poni_Grove
Nota: Eelektross (#604) de Island Scan não incluído.

### Poni Plains
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 10–30% | 54–57 | A pé (grama) |
| Tauros | 10% | 54–57 | A pé (grama) |
| Miltank | 10% | 54–57 | A pé (grama) |
| Cottonee | 20% | 54–57 | A pé (grama) |
| Petilil | 20% | 54–57 | A pé (grama) |
| Trumbeak | 10–30% | 54–57 | A pé (grama) |
| Gumshoos | 10–30% | 54–57 | A pé (grama) |
| Fearow | 20% | 54–57 | A pé (grama, montanha) |
| Hypno (#97) | 20% | 54–57 | A pé (grama, norte) |
| Mudsdale (#750) | 20% | 54–57 | A pé (grama, norte) |
| Pelipper | 20% | 54–57 | A pé (grama, litoral) |
| Hariyama | 30% | 54–57 | Grama batendo (emboscada) |
| Braviary (#628) | 30% | 54–57 | Sombra voando (emboscada) |
| Mandibuzz (#630) | 30% | 54–57 | Sombra voando (emboscada) |
| Primeape | 80% | 54–57 | Árvore balançando (emboscada) |
| Emolga (#587) | 20% | 54–57 | Árvore balançando (emboscada) |
| Scyther (#123) | 30% | 54–57 | Arbusto balançando (emboscada) |
| Crabrawler | 100% | 54–57 | Monte de berries |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Poni_Plains
Nota: vários campos de grama (7 pequenos + 2 grandes ao norte + 3 de
montanha + 3 de litoral) colapsados numa lista só por espécie, mesmo
tratamento de rotas multi-campo das regiões anteriores.

### Poni Coast
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Dugtrio Alolano | 100% | 56–59 | Nuvem de terra (emboscada) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Poni_Coast

### Poni Gauntlet
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Raticate Alolana | 30% | 56–59 | A pé (grama) |
| Golduck (#55) | 15% | 56–59 | A pé (grama) |
| Granbull | 20% | 56–59 | A pé (grama) |
| Pelipper | 30% | 56–59 | A pé (grama) |
| Gumshoos | 30% | 56–59 | A pé (grama) |
| Bewear | 5% | 56–59 | A pé (grama) |
| Magikarp | 50–59% | 10–59 | Pesca |
| Dratini | 1–10% | 10–59 | Pesca |
| Barboach | 40% | 10–59 | Pesca |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Poni_Gauntlet
Nota: Togekiss (#468) só via troca/Island Scan, não incluído; caminho que
leva à Battle Tree (pós-jogo, fora de escopo).

### Mount Lanakila
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Sandshrew Alolano | 30% | 42–48 | A pé (neve) |
| Vulpix Alolano | 30% | 45–48 | A pé (neve) |
| Sneasel (#215) | 20% | 42–48 | A pé (neve)/caverna |
| Absol | 10–20% | 42–48 | A pé (neve)/caverna |
| Snorunt | 30% | 42–48 | A pé (neve)/caverna |
| Golbat | 30% | 42–48 | A pé (caverna) |
| Drampa (#780) | 10% | 42–45 | A pé (caverna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Mount_Lanakila
Nota: área externa nevada e caverna interna colapsadas numa lista só;
Vanillish (#583)/Castform dependentes de granizo/chuva não incluídos.

### Hapu (Kahuna — Grande Provação, Ground)
| Pokémon | Nível | Tipo |
|---|---|---|
| Dugtrio Alolano | 47 | Ground/Steel |
| Gastrodon (Mar do Leste) | 47 | Water/Ground |
| Flygon (#330) | 47 | Ground/Dragon |
| Mudsdale — Groundium Z | 48 | Ground |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hapu

### Elite Four de Alola

**Hala (Fighting)** — ver time completo no Trecho 2.

**Olivia (Rock)** — ver time completo no Trecho 6.

**Acerola (Ghost)** — ver time completo no Trecho 8.

**Kahili (Flying)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Skarmory | 54 | Steel/Flying |
| Crobat (#169) | 54 | Poison/Flying |
| Oricorio | 54 | Flying (varia por estilo) |
| Mandibuzz | 54 | Dark/Flying |
| Toucannon (#733) — Flyinium Z | 55 | Normal/Flying |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kahili

### Campeão: Professor Kukui
| Pokémon | Nível | Tipo |
|---|---|---|
| Lycanroc | 57 | Rock |
| Ninetales Alolano (#38) | 56 | Ice/Fairy |
| Braviary | 56 | Normal/Flying |
| Magnezone (#462) | 56 | Electric/Steel |
| Snorlax (#143) | 56 | Normal |
| **Final (varia por inicial):** | | |
| — se Rowlet: Incineroar (#727) | 58 | Fire/Dark |
| — se Litten: Primarina (#730) | 58 | Water/Fairy |
| — se Popplio: Decidueye (#724) | 58 | Grass/Ghost |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kukui
Nota: o 6º Pokémon de Kukui é sempre a evolução final do inicial que é
**forte contra** o inicial escolhido pelo jogador — mesmo padrão de
`CHAMPION_TEAM_BY_STARTER` já usado em Kanto/Hoenn/Sinnoh/Kalos.

---

## Resumo — o que fazer com isto

- **~50 locais reais cobertos**, organizados em **11 trechos** (mais que
  as outras regiões — Alola tem 11 provações/grandes provações em vez de
  8 ginásios), cada um terminando numa Provação ou Grande Provação.
- **Achado estrutural principal**: Provação ≠ Grande Provação.
  Recomendo modelar cada Provação como um `GymDefinition` cujo time de
  batalha real é o **Totem + aliado(s)** (documentado em todas as 8
  provações com Totem), e o Capitão vira só texto de flavor — quando ele
  tem time documentado. Grandes Provações usam o time do Kahuna
  diretamente, sem Totem.
- **3 capitães sem time pessoal documentado pra Sun** (Mallow parcial/só
  Moon, Sophocles, Acerola) — não bloqueia a implementação porque o time
  de batalha real vem do Totem, mas o flavor de "quem apresenta a
  provação" fica sem stats de batalha nesses 3 casos.
- **Kahunas reaparecem na Elite Four**: Hala, Olivia e Acerola (que assume
  a vaga de Nanu, documentado como recusa dele) têm dois times cada — o
  de Grande Provação/campanha e o de Elite Four pós-jogo, ambos
  registrados. Kahili é o 4º membro sem Grande Provação própria (ela não
  é Kahuna).
- **Campeão (Kukui) com time por inicial**: mesmo padrão de
  `CHAMPION_TEAM_BY_STARTER` de Kanto/Hoenn/Sinnoh/Kalos — só o 6º
  Pokémon muda (evolução do inicial forte contra o do jogador).
- **Mecânicas novas da Gen 7 fora de escopo, registradas aqui pra não
  esquecer**: Island Scan/QR Scanner (Pokémon exclusivo por dia da
  semana), SOS Battles em encontros comuns (convocação de aliado
  selvagem — mantido só nas batalhas de Totem, que são estruturais).
  Nenhuma dessas vira mecânica nova no jogo — mesma decisão já tomada
  pras mecânicas de Gen 5/6 nos documentos anteriores.
- **Pendências explícitas** (não fabricadas): Aether Paradise (ilha
  artificial, conteúdo de trama/lendário — Nihilego, Ultra Beasts, fora de
  escopo), Poni Island's Battle Tree, Ultra Space/Ultra Wormhole (pós-jogo
  Ultra Sun/Ultra Moon — este documento cobriu só Sun original), segunda
  rebatalha de Ilima na Trainers' School, times de Battle Tree dos
  capitães. Se algum desses precisar entrar no jogo, pesquisar antes de
  codificar.
