# Rotas de Paldea — dados reais para o novo sistema de batalha

> Documento de pesquisa/design. Segue o mesmo modelo de `docs/ROTAS-KANTO.md`,
> `docs/ROTAS-JOHTO.md`, `docs/ROTAS-HOENN.md`, `docs/ROTAS-SINNOH.md`,
> `docs/ROTAS-KALOS.md` e `docs/ROTAS-UNOVA.md`. Os iniciais de Paldea
> (Sprigatito #906, Fuecoco #909, Quaxly #912) entram no nível 5, mesmo
> padrão das regiões anteriores.

## Metodologia

- Fonte única: **Bulbapedia**, dados de encontro selvagem/times de
  Pokémon **Scarlet** (quando Scarlet e Violet divergem — trocas
  clássicas por versão como Larvitar/Deino ou Great Tusk/Iron Treads —
  só ficou o lado de **Scarlet**, anotado onde acontece). Times de
  líder de ginásio, Elite Four e Campeã são o time de **"AI Trainer"/
  Champion Assessment** (o confronto real que o jogador enfrenta na
  progressão principal), não o rebatalha mais forte da Academy Ace
  Tournament nem o time ainda mais alto do League Club Room
  (pós-Indigo Disk) — mesmo critério já usado nas regiões anteriores
  de sempre pegar "o primeiro confronto real".
- **Achado estrutural, o motivo deste documento existir**: Paldea é
  **mundo aberto de verdade** — os 8 ginásios podem ser enfrentados em
  qualquer ordem, o jogo não força sequência nenhuma (diferente de
  todas as regiões anteriores). Decisão já tomada pelo dono do
  projeto: **este jogo mantém o sistema de rotas linear** (mesmo
  padrão das outras 6 regiões), então os 8 ginásios foram colocados em
  **UMA ordem fixa, por nível recomendado crescente** — não a ordem
  alfabética de insígnia nem qualquer caminho específico do jogo
  original. A ordem escolhida (nível/time confirmados via Bulbapedia
  ao vivo nesta sessão):

  | # | Líder | Tipo | Cidade | Nível |
  |---|---|---|---|---|
  | 1 | Katy | Bug | Cortondo | 14–15 |
  | 2 | Brassius | Grass | Artazon | 16–17 |
  | 3 | Iono | Electric | Levincia | 23–24 |
  | 4 | Kofu | Water | Cascarrafa | 29–30 |
  | 5 | Larry | Normal | Medali | 35–36 |
  | 6 | Ryme | Ghost | Montenevera | 41–42 |
  | 7 | Tulip | Psychic | Alfornada | 44–45 |
  | 8 | Grusha | Ice | Glaseado Mountain | 47–48 |

  Essa é, por coincidência, também a ordem mais comumente recomendada
  por guias em runs "livres" do jogo real (o nível recomendado de cada
  líder já forma uma curva crescente quase perfeita sozinho) — não foi
  necessário forçar nada artificialmente.
- **Achado secundário, escala das áreas não é só geografia**: como o
  jogo é mundo aberto, o nível das zonas (South/East/West/North
  Province) é amarrado à ordem de progressão de **três arcos de
  história paralelos** (Ginásios / Path of Legends-Titãs / Team
  Star), não só à distância do centro do mapa. Isso quer dizer que
  zonas vizinhas no mapa às vezes têm níveis bem diferentes (ex:
  Glaseado Mountain, nível 34–42, fica geograficamente colada ao North
  Province, nível 43–56). **Qual Province Area(s) entra em cada
  trecho, e em que ordem, foi minha escolha editorial** — usei sempre
  a área/cidade real mais associada ao ginásio de destino como o
  último passo antes dele, e ordenei o resto das áreas abertas pelo
  nível de encontro selvagem mais próximo do ginásio seguinte. Dois
  trechos exigem um salto geográfico grande no mapa real (Trecho 4:
  Levincia, leste, até Cascarrafa, oeste; Trecho 7: Montenevera, norte
  extremo, até Alfornada, sul) — sinalizado explicitamente na seção
  do trecho. Isso é uma consequência inevitável de forçar estrutura
  linear num mundo aberto de verdade, exatamente como o
  esqueleto/pedido do dono do projeto previu.
- **Terastalização** (mecânica nova da Gen 9 — todo líder, Elite Four
  e Campeã Terastaliza seu Pokémon "ace" para um tipo às vezes
  diferente do tipo base) fica **fora de escopo**, mesmo tratamento já
  dado a Mega Evolução (Kalos) e sazonalidade (Unova): os Pokémon
  entram como espécie base, o tipo de Tera de cada ace foi só anotado
  na tabela pra registro, não vira mecânica nova do jogo.
- **Ginásio da Ryme é batalha dupla** (2v2) — dado novo que não existe
  nas 6 regiões anteriores. Anotado na tabela dele; fica como
  pendência de design se o sistema de batalha atual não suporta 2v2.
- **Titãs (Path of Legends) e bases da Equipe Estelar** (Team Star, 5
  esquadrões por tipo) são as duas outras histórias paralelas de
  Paldea e não têm ginásio/insígnia — ficam **fora de escopo** deste
  documento (mesmo tratamento dado a conteúdo secundário/pós-jogo nas
  regiões anteriores), só citadas de passagem quando a localização
  delas coincide com um local já listado (ex: Tagtree Thicket).
- **Great Crater of Paldea / Area Zero**: na história oficial esse é
  o epílogo "O Caminho Para Casa", **jogado depois de virar Campeã**,
  não antes do Elite Four. Como a lista de locais fornecida terminava
  exatamente nesses dois nomes (sem nenhum prédio "Pokémon League"
  próprio na lista) e eles são a única masmorra de nível alto
  disponível, usei os dois aqui no papel estrutural de **"Victory
  Road" de Paldea** — a masmorra final antes do Elite Four — mesmo
  fora da ordem real da história. Sinalizado aqui para não confundir
  quem for implementar.
- **Qualidade dos dados**: todas as tabelas vieram de WebFetch ao vivo
  nesta sessão. Times de líder de ginásio, Elite Four e Campeã são de
  alta confiança (páginas simples, dado estruturado, cada time
  cross-checado por 2 perguntas na mesma página quando a IA de fetch
  cortou algum integrante na primeira passada — foi o caso de Larry
  Elite Four, que só apareceu completo na segunda tentativa). As
  tabelas de encontro selvagem de Paldea têm biomas demais por área
  (pradaria/floresta/lago/oceano/caverna/rochoso/cidade/montanha/
  campo de neve, às vezes 6+ por local só) — cada tabela aqui é um
  **resumo das espécies mais citadas por bioma**, não a lista 100%
  completa (mesmo espírito de simplificação já usado nas regiões
  anteriores para masmorras multi-área); East Province (Area Two) veio
  sem porcentagem por espécie na fonte, tratado como lista qualitativa.
- **Números da Pokédex Nacional**: para as ~90 espécies nativas de
  Paldea (#906–#1010), usei uma tabela dedicada da Bulbapedia/Serebii
  cross-checada nesta sessão (alta confiança — dado estático, não
  narrativo). Para espécies de gerações anteriores que reaparecem em
  Paldea, usei o número de Pokédex Nacional já estabelecido/conhecido
  para a espécie (formas regionais de Paldea, como Wooper e Tauros,
  mantêm o mesmo número da espécie base).

---

## Trecho 1 — Cabo Poco → Cortondo (Ginásio 1: Katy, Bug)

Locais: Cabo Poco, Poco Path, Inlet Grotto, South Province (Area One),
Los Platos, Mesagoza, South Province (Area Two), Cortondo.

### Cabo Poco
Cidade inicial (a casa do jogador fica aqui).
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Tarountula (#917) | fixo | 2 | Pendurado numa árvore perto de Poco Path |
| Squawkabilly (#931, plumagem verde) | fixo, até 2 | 2 | Em cima da casa do jogador |
| Fletchling (#661) | fixo | 2 | A pé (respawna) |
| Wingull (#278) | fixo, até 3 | 3 | A pé (respawna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Cabo_Poco

### Poco Path
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Fletchling (#661) | 100% | 2–4 | A pé (pradaria) |
| Hoppip (#187) | 40% | 2–4 | A pé (pradaria) |
| Lechonk (#915) | comum | 2–4 | A pé (pradaria) |
| Tarountula (#917) | comum | 2–4 | A pé (pradaria) |
| Scatterbug (#664) | raro | 4 | A pé (pradaria) |
| Pawmi (#921) | 5% | 5 | A pé (pradaria) |
| Wingull (#278) | 80% | 2–4 | A pé (praia/oceano) |
| Buizel (#418) | 20% | 2–4 | A pé (praia/oceano) |
| Magikarp (#129) | comum | 2–4 | Água |
| Arrokuda (#846) | comum | 2–4 | Água |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Poco_Path
Nota: também abriga o Farol de Poco Path e a entrada de Inlet Grotto.

### Inlet Grotto
Caverna lateral (entrada numa praia de Poco Path, saída no alto do
penhasco) — opcional, mas inclusa por ser local real no caminho.
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Houndour (#228) | 60% | 3–5 | Caverna |
| Diglett (#050) | 20% | 3–5 | Caverna |
| Yungoos (#734) | 20% | 3–5 | Caverna |
| Psyduck (#054) | fixo | 4 | Caverna (respawna) |
| Hoppip (#187) | fixo | 3 | Caverna (respawna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Inlet_Grotto

### South Province (Area One)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Fletchling (#661) | 100% | 2–8 | A pé (pradaria) |
| Lechonk (#915) | 80% | 2–8 | A pé (pradaria) |
| Hoppip (#187) | 60% | 2–8 | A pé (pradaria) |
| Tarountula (#917) | 50% | 2–8 | A pé (pradaria) |
| Pawmi (#921) | 10% | 2–8 | A pé (pradaria) |
| Bounsweet (#761) | 60% | 5–8 | A pé (floresta) |
| Bonsly (#438) | 30% | 5–8 | A pé (floresta) |
| Psyduck (#054) | 60% | 6–8 | Água (lago) |
| Magikarp (#129) | 60% | 6–8 | Água (lago/rio) |
| Surskit (#283) | 60% | 8 | Água (lago) |
| Azurill (#298) | 60% | 6–8 | Água (lago) |
| Wingull (#278) | 60–80% | 3–7 | A pé (praia/oceano) |
| Gastly (#092) | 100% | 4–7 | Ruínas (ar) |
| Combee (#415) | 40–90% | 5–8 | Campo de flores |
| Sunkern (#191) | 60% | 5–8 | Campo de flores |

Fonte: https://bulbapedia.bulbagarden.net/wiki/South_Province_(Area_One)
Nota: contém Cabo Poco, Los Platos e o Santuário Grasswither; conecta
com Mesagoza ao norte.

### Los Platos
Vilarejo pequeno dentro de South Province (Area One), sem encontro
selvagem próprio.

Fonte: https://bulbapedia.bulbagarden.net/wiki/Los_Platos

### Mesagoza
Capital de Paldea, hub central — sem encontro selvagem (só NPCs,
lojas e as academias Naranja/Uva). Conecta a South Province (Area
One) ao sul, (Area Two) a oeste e (Area Three) a leste.

Fonte: https://bulbapedia.bulbagarden.net/wiki/Mesagoza

### South Province (Area Two)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Fletchling (#661) | 100% | 7–14 | A pé (pradaria) |
| Starly (#396) | 70% | 7–14 | A pé (pradaria) |
| Mareep (#179) | 60% | 9–14 | A pé (pradaria) |
| Hoppip (#187) | 40% | 7–8 | A pé (pradaria) |
| Maschiff (#942) | 30% | 10–14 | A pé (pradaria) |
| Pikachu (#025) | comum | 10 | A pé (floresta) |
| Pichu (#172) | comum | 7–10 | A pé (floresta) |
| Skwovet (#819) | comum | 7–10 | A pé (floresta) |
| Applin (#840) | comum | 10 | A pé (floresta) |
| Shroodle (#964) | comum | 7–10 | A pé (floresta) |
| Psyduck/Magikarp/Azurill/Buizel/Chewtle/Arrokuda/Tadbulb (#054/#129/#298/#418/#833/#846/#938) | variável | 7–14 | Água (beira-rio) |
| Diglett (#050) | comum | 7–11 | A pé (olival) |
| Smoliv (#928) | comum | 7–11 | A pé (olival) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/South_Province_(Area_Two)
Nota: contém Cortondo e o Grande Olival (Grand Olive Orchard).

### Cortondo (cidade do Ginásio 1)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Snom (#872) | único selvagem da cidade | — | A pé |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Cortondo
Nota: também tem troca de NPC (dá um Flabébé, recebe um Snom
apelidado "Snowsalot") — não conta como encontro selvagem.

### Katy (Ginásio 1 — Bug)
| Pokémon | Nível | Tipo |
|---|---|---|
| Nymble (#919) | 14 | Bug |
| Tarountula (#917) | 14 | Bug |
| Teddiursa (#216) | 15 | Normal (Tera Bug) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Katy
Nota: recomendada como "o primeiro ginásio", o mais fraco dos 8.

---

## Trecho 2 — Cortondo → Artazon (Ginásio 2: Brassius, Grass)

Locais: South Province (Area Three), Artazon.

### South Province (Area Three)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Rookidee (#821) | comum | 7–17 | A pé (pradaria) |
| Nymble (#919) | comum | 14–17 | A pé (pradaria) |
| Murkrow (#198) | 60% | 15–17 | A pé (pradaria) |
| Dunsparce (#206) | incomum | 15–17 | A pé (pradaria) |
| Pawmi (#921) | 10% | 7–12 | A pé (pradaria) |
| Shinx (#403) | 40% | 7–12 | A pé (área rochosa) |
| Skiddo (#672) | 40% | 14–17 | A pé (área rochosa) |
| Nacli (#932) | 60% | 10–17 | A pé (área rochosa) |
| Klawf (#950) | 30% | 15–17 | A pé (área rochosa) |
| Makuhita (#296) | 30% | 10–17 | A pé (área rochosa) |
| Growlithe (#058) | incomum | 17 | A pé (área rochosa) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/South_Province_(Area_Three)
Nota: conecta Mesagoza (oeste), South Province Area Five (sul), East
Province Area One (norte) e Artazon (leste, direto).

### Artazon
Sem tabela de encontro selvagem listada na fonte.

Fonte: https://bulbapedia.bulbagarden.net/wiki/Artazon

### Brassius (Ginásio 2 — Grass)
| Pokémon | Nível | Tipo |
|---|---|---|
| Petilil (#548) | 16 | Grass |
| Smoliv (#928) | 16 | Grass/Normal |
| Sudowoodo (#185) | 17 | Rock (Tera Grass) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Brassius

---

## Trecho 3 — Artazon → Levincia (Ginásio 3: Iono, Electric)

Locais: East Province (Area One), East Province (Area Two), East
Province (Area Three), Levincia.

### East Province (Area One)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Skiploom (#188) | 100% | 18–23 | A pé (pradaria) |
| Tauros, raça combativa (#128) | 90% | 22–23 | A pé (pradaria) |
| Murkrow (#198) | 60% | 17–23 | A pé (pradaria/floresta) |
| Corvisquire (#822) | 100% | 18–23 | A pé (vários biomas) |
| Rookidee (#821) | 30% | 17–23 | A pé (vários biomas) |
| Pikachu (#025) | 10% | 17–23 | A pé (floresta) |
| Psyduck (#054) | 60% | 18–23 | Água (beira-rio) |
| Magikarp (#129) | 60% | 18–23 | Água (beira-rio/oceano) |
| Shellder (#090) | 60% | 18–23 | Água (oceano/praia) |
| Mareanie (#747) | 60–80% | 18–23 | Água (oceano/praia) |
| Wattrel (#940) | 60% | 18–23 | Água (oceano/céu) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/East_Province_(Area_One)

### East Province (Area Two)
| Pokémon | Nível | Método |
|---|---|---|
| Magnemite (#081) | 19–26 | A pé (pradaria) |
| Venonat (#048) | 19–26 | A pé (floresta) |
| Pineco (#204) | 19–26 | A pé (floresta) |
| Komala (#775) | 19–26 | A pé (floresta) |
| Slowpoke (#079) | 19–26 | A pé (praia) |
| Sandygast (#769) | 19–26 | A pé (praia) |
| Wiglett (#960) | 19–26 | A pé (praia) |
| Gastly (#092) / Mimikyu (#778) / Tinkatink (#957) | 19–26 | Ruínas |
| Grimer (#088) / Rotom (#479) | 19–26 | Cidade |

Fonte: https://bulbapedia.bulbagarden.net/wiki/East_Province_(Area_Two)
Nota: fonte não trouxe porcentagem por espécie — tabela tratada como
lista qualitativa (ver Metodologia). Contém Levincia.

### East Province (Area Three)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Meowth (#052) | 30% | 23–28 | A pé (pradaria/cidade) |
| Rookidee (#821) | 30% | 23–24 | A pé (pradaria) |
| Corvisquire (#822) | 20% | 23–24 | A pé (pradaria) |
| Pawmo (#922) | 10% | 23–24 | A pé (pradaria) |
| Voltorb (#100) | 30% | 26–28 | A pé (cidade) |
| Murkrow (#198) | variável | 24–28 | A pé (cidade) |
| Diglett (#050) / Makuhita (#296) / Rolycoly (#837) / Salandit (#757) / Orthworm (#968) | — | 17–36 | Caverna/mina |

Fonte: https://bulbapedia.bulbagarden.net/wiki/East_Province_(Area_Three)
Nota: por nível (22–29), colocada neste trecho em vez de junto ao
Trecho 6 mesmo conectando geograficamente com Tagtree Thicket —
escolha editorial (ver Metodologia).

### Levincia (cidade do Ginásio 3)
Sem encontro selvagem (só troca de NPC: Pincurchin nível 25).

Fonte: https://bulbapedia.bulbagarden.net/wiki/Levincia

### Iono (Ginásio 3 — Electric)
| Pokémon | Nível | Tipo |
|---|---|---|
| Wattrel (#940) | 23 | Electric/Flying |
| Bellibolt (#939) | 23 | Electric |
| Luxio (#404) | 23 | Electric |
| Mismagius (#429) | 24 | Ghost (Tera Electric) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Iono

---

## Trecho 4 — Levincia → Cascarrafa (Ginásio 4: Kofu, Water)

Locais: South Province (Area Four), West Province (Area One), Asado
Desert, Porto Marinada, West Province (Area Two), Cascarrafa.

**Salto geográfico grande** (ver Metodologia): no mapa real, ir de
Levincia (extremo leste) a Cascarrafa (extremo oeste) cruza quase todo
o sul de Paldea de volta — não existe um caminho direto único; a
sequência abaixo é a escolha editorial que melhor mantém o nível
crescente.

### South Province (Area Four)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Starly (#396) | 70% | 16–23 | A pé (pradaria) |
| Murkrow (#198) | 60% | 16–23 | A pé (pradaria) |
| Deerling, forma de Primavera (#585) | 60% | 16–23 | A pé (pradaria) |
| Toxel (#848) | 60% | 16–23 | A pé (pradaria) |
| Lechonk (#915) | 80% | 16–18 | A pé (pradaria) |
| Meditite (#307) | 60% | 20–23 | A pé (montanha) |
| Mudbray (#749) | 60% | 16–23 | A pé (montanha) |
| Rufflet (#627) | 40% | 21–23 | A pé (montanha) |
| Skiddo (#672) | 40% | 16–23 | A pé (montanha) |
| Basculin (#550) | 70% | 16–20 | Água |
| Wattrel (#940) | 60% | 16–20 | Água |
| Finizen (#963) | 30% | 16–20 | Água |

Fonte: https://bulbapedia.bulbagarden.net/wiki/South_Province_(Area_Four)

### West Province (Area One)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Numel (#322) | 60% | 18–20 | A pé (montanha) |
| Swablu (#333) | 70% | 18–20 | A pé (montanha) |
| Mankey (#056) | 40% | 15–19 | A pé (montanha) |
| Phanpy (#231) | 20% | 13–20 | A pé (montanha) |
| Rockruff (#744) | 40% | 13–17 | A pé (montanha) |
| Psyduck (#054) | 60% | 13–17 | Água (beira-rio) |
| Tadbulb (#938) | 50% | 13–17 | Água (beira-rio) |
| Qwilfish (#211) / Luvdisc (#370) | — | 13–20 | Água (oceano) |
| Diglett (#050) / Larvitar (#246) / Sableye (#302) / Bagon (#371) / Gible (#443) | — | 13–20 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/West_Province_(Area_One)

### Asado Desert
| Pokémon | Nível | Método |
|---|---|---|
| Silicobra (#751) | 22–26 | A pé (deserto) |
| Phanpy (#231) | 19–26 | A pé (deserto) |
| Cacnea (#331) | 20–24 | A pé (deserto, lado leste) |
| Hippopotas (#449) | 23–26 | A pé (deserto, lado oeste) |
| Rufflet (#627) | 21–26 | A pé (deserto) |
| Larvesta (#636) | 24–26 | A pé (deserto) |
| Stonjourner (#874) | 20–26 | A pé (deserto) |
| Flittle (#955) | 19–26 | A pé (deserto) |
| Murkrow (#198) | 20–23 | A pé (pradaria, canto noroeste) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Asado_Desert
Nota: conecta West Province (Area Two) a oeste e Cascarrafa a leste.

### Porto Marinada
Sem encontro selvagem — vilarejo portuário dentro de West Province
(Area Two), conhecido pela casa de leilões (Auction House); é onde
acontece o teste de ginásio de Kofu (devolver a carteira dele e disputar
um leilão de alga rara em seu lugar).

Fonte: https://bulbapedia.bulbagarden.net/wiki/Porto_Marinada

### West Province (Area Two)
| Pokémon | Nível | Método |
|---|---|---|
| Meowth (#052) / Girafarig (#203) / Ditto (#132) / Cyclizar (#967) | 22–29 | A pé (pradaria) |
| Psyduck (#054) / Magikarp (#129) / Marill (#183) / Azumarill (#184) / Buizel (#418) | 22–29 | Água |
| Diglett (#050) / Dugtrio (#051) / Gible (#443) / Noibat (#714) | 23–29 | Caverna |
| Grimer (#088) / Rotom (#479) / Tandemaus (#924) | 26–29 | Cidade |

Fonte: https://bulbapedia.bulbagarden.net/wiki/West_Province_(Area_Two)
Nota: Porto Marinada fica dentro desta área; conecta Asado Desert ao
sul, West Province (Area Three) a leste, Casseroya Lake ao norte.

### Cascarrafa (cidade do Ginásio 4)
Sem encontro selvagem (só troca de NPC: Wooper).

Fonte: https://bulbapedia.bulbagarden.net/wiki/Cascarrafa

### Kofu (Ginásio 4 — Water)
| Pokémon | Nível | Tipo |
|---|---|---|
| Veluza (#976) | 29 | Water/Psychic |
| Wugtrio (#961) | 29 | Water |
| Crabominable (#740) | 30 | Fighting/Ice (Tera Water) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kofu

---

## Trecho 5 — Cascarrafa → Medali (Ginásio 5: Larry, Normal)

Locais: West Province (Area Three), Medali.

### West Province (Area Three)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Persian (#053) | 30% | 28–35 | A pé (pradaria) |
| Deerling, forma de Outono (#585) | 60% | 28–35 | A pé (pradaria) |
| Fletchinder (#662) | 30% | 28–35 | A pé (pradaria) |
| Oinkologne (#916) | 20% | 28–35 | A pé (pradaria) |
| Meowth (#052) | 30% | 28–32 | A pé (pradaria) |
| Primeape (#057) | 20% | 28–35 | A pé (floresta) |
| Sudowoodo (#185) | 60% | 28–35 | A pé (floresta) |
| Foongus (#590) | 60% | 28–35 | A pé (floresta) |
| Psyduck (#054) / Magikarp (#129) / Azumarill (#184) / Basculin (#550) | — | 28–30 | Água |

Fonte: https://bulbapedia.bulbagarden.net/wiki/West_Province_(Area_Three)
Nota: conecta Cascarrafa (sudoeste), Casseroya Lake (noroeste),
Glaseado Mountain (nordeste) e Medali (norte, direto).

### Medali (cidade do Ginásio 5)
Sem encontro selvagem — a batalha de ginásio de Larry acontece dentro
do restaurante Treasure Eatery.

Fonte: https://bulbapedia.bulbagarden.net/wiki/Medali

### Larry (Ginásio 5 — Normal)
| Pokémon | Nível | Tipo |
|---|---|---|
| Komala (#775) | 35 | Normal |
| Dudunsparce (#982) | 35 | Normal |
| Staraptor (#398) | 36 | Normal/Flying (Tera Normal) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Larry
Nota: Larry usa Normal "porque acha que reflete sua imagem comum" —
o mesmo Larry reaparece como Elite Four de tipo Flying no Trecho 9.

---

## Trecho 6 — Medali → Montenevera (Ginásio 6: Ryme, Ghost)

Locais: Tagtree Thicket, Glaseado Mountain, Montenevera.

### Tagtree Thicket
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Murkrow (#198) | 60% | 25–32 | A pé (floresta) |
| Venonat (#048) | 25% | 25–40 | A pé (floresta) |
| Pineco (#204) | comum | 25–32 | A pé (floresta) |
| Zorua (#570) | comum | 25–31 | A pé (floresta) |
| Foongus (#590) | comum | 25–32 | A pé (floresta) |
| Impidimp (#859) | 40% | 25–32 | A pé (floresta) |
| Psyduck (#054) / Magikarp (#129) / Basculin (#550) / Drednaw (#834) | — | 29–32 | Água (lago) |
| Buizel (#418) / Floatzel (#419) / Arrokuda (#846) / Barraskewda (#847) | — | 25–32 | Água (beira-rio) |
| Makuhita (#296) / Hariyama (#297) / Pawniard (#624) / Skiddo (#672) / Nacli (#932) | — | 25–32 | A pé (área rochosa) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Tagtree_Thicket
Nota: sedia a Base do Esquadrão Veneno da Equipe Estelar — fora de
escopo (ver Metodologia). Conecta East Province (Area Three) a
sudeste e Glaseado Mountain a noroeste.

### Glaseado Mountain
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Sneasel (#215) | 60% | 34–40 | A pé (montanha) |
| Axew (#610) | 60% | 34–42 | A pé (montanha) |
| Cubchoo (#613) | comum | 34–40 | A pé (montanha) |
| Snom (#872) | comum | 34–40 | A pé (montanha) |
| Cetoddle (#974) | 30% | 34–41 | A pé (montanha) |
| Delibird (#225) | 20% | 35–40 | A pé (campo de neve) |
| Beartic (#614) | comum | 40–42 | A pé (campo de neve) |
| Bergmite (#712) | 50% | 35–42 | Água (campo de neve) |
| Avalugg (#713) | comum | 37–42 | A pé (campo de neve) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Glaseado_Mountain
Nota: esta tabela cobre a parte sul/central da montanha, onde fica
Montenevera. O Ginásio Glaseado de Grusha fica "perto do pico mais
alto" da mesma montanha — reaproveitado no Trecho 8 sem repetir
tabela (mesmo local real, seção diferente).

### Montenevera (cidade do Ginásio 6)
Sem encontro selvagem — único assentamento do North Province,
cercado por Glaseado Mountain em todos os lados.

Fonte: https://bulbapedia.bulbagarden.net/wiki/Montenevera

### Ryme (Ginásio 6 — Ghost) — batalha dupla
| Pokémon | Nível | Tipo |
|---|---|---|
| Banette (#354) | 41 | Ghost |
| Mimikyu (#778) | 41 | Ghost/Fairy |
| Houndstone (#972) | 41 | Ghost |
| Toxtricity (#849) | 42 | Electric/Poison (Tera Ghost) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Ryme
Nota: único ginásio deste documento que é 2v2 (dobra) — ver
Metodologia.

---

## Trecho 7 — Montenevera → Alfornada (Ginásio 7: Tulip, Psychic)

Locais: South Province (Area Six), Alfornada.

**Salto geográfico grande** (ver Metodologia): Montenevera fica no
extremo norte da montanha; Alfornada fica no extremo sul de Paldea.
Não há caminho direto — assume-se viagem rápida/backtrack pelo hub de
Mesagoza, igual ao Trecho 4.

### South Province (Area Six)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Murkrow (#198) | 60% | 38–40 | A pé |
| Donphan (#232) | 100% | 37–43 | A pé |
| Floatzel (#419) | 100% | 37–40 | Água (beira-rio) |
| Drednaw (#834) | 100% | 37–40 | Água (lago/beira-rio) |
| Basculin (#550) | 70% | 37–40 | Água |
| Nacli (#932) / Naclstack (#933) | 100% | 37–42 | A pé (área rochosa) |
| Gabite (#444) | 100% | 40–44 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/South_Province_(Area_Six)
Nota: Alfornada fica no centro desta área; também abriga a Torre
Vazante (Leaking Tower), um dos Dez Marcos de Paldea.

### Alfornada (cidade do Ginásio 7)
Sem tabela de encontro selvagem listada na fonte.

Fonte: https://bulbapedia.bulbagarden.net/wiki/Alfornada

### Tulip (Ginásio 7 — Psychic)
| Pokémon | Nível | Tipo |
|---|---|---|
| Farigiraf (#981) | 44 | Normal/Psychic |
| Gardevoir (#282) | 44 | Psychic/Fairy |
| Espathra (#956) | 44 | Psychic |
| Florges (#671) | 45 | Fairy (Tera Psychic) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Tulip

---

## Trecho 8 — Alfornada → Glaseado Mountain (Ginásio 8: Grusha, Ice)

Locais: Casseroya Lake, North Province (Area One), North Province
(Area Two), North Province (Area Three), Glaseado Mountain (pico).

### Casseroya Lake
| Pokémon | Nível | Método |
|---|---|---|
| Slowpoke (#079) / Golduck (#055) / Azumarill (#184) / Dragonair (#148) / Gyarados (#130) / Dondozo (#977) / Tatsugiri (#978) | 49–55 | Água (lago) |
| Beartic (#614) / Cubchoo (#613) | 52–56 | A pé (campo de neve) |
| Houndstone (#972) / Greavard (#971) | 52–56 | A pé (campo de neve) |
| Cetitan (#975) / Cetoddle (#974) | 52–56 | A pé (campo de neve) |
| Kilowattrel (#941) | 49–55 | A pé (área rochosa/praia) |
| Skrelp (#690) / Dragalge (#691) / Clawitzer (#693) / Veluza (#976) | 49–56 | Água (mergulho) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Casseroya_Lake
Nota: fica a oeste de Glaseado Mountain e ao norte de West Province
(Area Two/Three).

### North Province (Area One)
| Pokémon | Nível | Método |
|---|---|---|
| Ampharos (#181) / Ursaring (#217) / Altaria (#334) / Lucario (#448) / Gogoat (#673) / Hawlucha (#701) / Mudsdale (#750) / Indeedee (#876) | 46–53 | A pé (montanha) |
| Weavile (#461) / Glaceon (#471) / Froslass (#478) | 49–53 | A pé (campo de neve) |
| Golduck (#055) / Vaporeon (#134) / Dratini (#147) / Whiscash (#340) / Floatzel (#419) | 47–53 | Água |
| Dugtrio (#051) / Umbreon (#197) / Sableye (#302) / Gabite (#444) / Deino (#633) / Noivern (#715) | 46–53 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/North_Province_(Area_One)
Nota: conecta Glaseado Mountain a oeste, North Province (Area Two) a
leste, East Province (Area Three) ao sul e Tagtree Thicket a sudoeste.

### North Province (Area Two)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Golduck (#055) | 20% | 49–52 | Água (lago) |
| Dratini (#147) | 15% | 49–52 | Água (lago) |
| Altaria (#334) | 20% | 49–52 | A pé (lago) |
| Arcanine (#059) | 2% | 49–52 | A pé (área rochosa) |
| Houndoom (#229) | 20% | 49–52 | A pé (área rochosa) |
| Camerupt (#323) | 20% | 49–52 | A pé (área rochosa) |
| Luxray (#405) | 10% | 49–52 | A pé (área rochosa) |
| Scyther (#123) | 50% | 49–52 | A pé (floresta de bambu) |
| Ursaring (#217) | 20% | 49–52 | A pé (floresta de bambu) |
| Kricketune (#402) | 30% | 49–52 | A pé (floresta de bambu) |
| Bisharp (#625) | 15–20% | 52 | A pé (floresta de bambu) |
| Dugtrio (#051) / Sableye (#302) / Gabite (#444) / Zweilous (#634) | — | 49–56 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/North_Province_(Area_Two)

### North Province (Area Three)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Jumpluff (#189) / Hoppip (#187) | 100% | 43–50 | A pé (pradaria) |
| Chansey (#113) | 1% | 43–50 | A pé (pradaria) |
| Espeon (#196) | 1% | 43–50 | A pé (pradaria) |
| Pawmo (#922) | 10% | 43–50 | A pé (pradaria) |
| Floatzel (#419) / Buizel (#418) | 40–100% | 43–50 | Água (mergulho) |
| Barraskewda (#847) / Arrokuda (#846) | 20–100% | 43–45 | Água (mergulho) |
| Skrelp (#690, só Scarlet) | 60% | 43–50 | Água (mergulho) |
| Naclstack (#933) / Nacli (#932) | 60–100% | 43–47 | A pé (área rochosa) |
| Gogoat (#673) | 30% | 43–47 | A pé (área rochosa) |
| Copperajah (#879) | 20% | 43–47 | A pé (área rochosa) |
| Gible (#443) / Gabite (#444) / Deino (#633) / Sableye (#302) | — | 43–50 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/North_Province_(Area_Three)
Nota: cercada por Glaseado Mountain a leste/oeste/sul; sedia a Base do
Esquadrão Ruchbah da Equipe Estelar (tipo Fairy) — fora de escopo.

### Glaseado Mountain — pico (Ginásio 8)
Mesmo local do Trecho 6 (ver tabela lá — Sneasel, Axew, Cubchoo, Snom,
Cetoddle, Delibird, Beartic, Bergmite, Avalugg); o Ginásio Glaseado
fica "perto do pico mais alto" da montanha.

Fonte: https://bulbapedia.bulbagarden.net/wiki/Glaseado_Mountain

### Grusha (Ginásio 8 — Ice)
| Pokémon | Nível | Tipo |
|---|---|---|
| Frosmoth (#873) | 47 | Ice/Bug |
| Beartic (#614) | 47 | Ice |
| Cetitan (#975) | 47 | Ice |
| Altaria (#334) | 48 | Dragon/Flying (Tera Ice) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Grusha

---

## Trecho 9 — Glaseado Mountain → Elite Four → Campeã

Locais: Great Crater of Paldea, Area Zero.

Ver Metodologia sobre a inversão de ordem da história real (Area
Zero é epílogo pós-Campeã no jogo original; aqui vira o "Victory
Road" final antes do Elite Four, único jeito de aproveitar as duas
únicas masmorras de nível alto da lista fornecida).

### Great Crater of Paldea
| Pokémon | Nível | Método |
|---|---|---|
| Garchomp (#445) | 57–58 | Fixo |
| Magnezone (#462) | 57–58 | Fixo |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Great_Crater_of_Paldea
Nota: a própria Bulbapedia marca a seção de encontros selvagens como
incompleta; também existe um Rayquaza fixo de nível 70 (evento
repetível a cada hora real) — fora de escopo (lendário).

### Area Zero
| Pokémon | Nível | Método |
|---|---|---|
| Raichu (#026) / Venomoth (#049) / Jumpluff (#189) / Medicham (#308) | 52–56 | A pé (campo alto) |
| Golduck (#055) / Altaria (#334) / Floatzel (#419) / Flamigo (#973) | 52–56 | Água (beira-rio, campo alto) |
| Donphan (#232) / Hawlucha (#701) / Lycanroc (#745) / Garganacl (#934) / Naclstack (#933) | 52–56 | A pé (área rochosa, campo alto) |
| Camerupt (#323) / Bellibolt (#939) | 55–59 | Campo baixo |
| Glimmet (#969) / Glimmora (#970) / Carbink (#703) | — | Cavernas/Estações/Profundezas |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Area_Zero
Nota: também aparecem Pokémon Paradoxo exclusivos de versão (Scream
Tail #985/Slither Wing #988 em Scarlet; Iron Bundle #991/Iron Hands
#992 em Violet) — fora de escopo, mesmo tratamento dado a Megas
(Kalos) e sazonalidade (Unova): mecânica nova, não vira conteúdo novo
do jogo.

### Elite Four de Paldea

**Rika (Ground)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Whiscash (#340) | 57 | Water/Ground |
| Camerupt (#323) | 57 | Fire/Ground |
| Donphan (#232) | 57 | Ground |
| Dugtrio (#051) | 57 | Ground |
| Clodsire (#980) | 58 | Poison/Ground (Tera Ground) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Rika

**Poppy (Steel)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Copperajah (#879) | 58 | Steel |
| Magnezone (#462) | 58 | Electric/Steel |
| Bronzong (#437) | 58 | Steel/Psychic |
| Corviknight (#823) | 58 | Flying/Steel |
| Tinkaton (#959) | 59 | Fairy/Steel (Tera Steel) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Poppy

**Larry (Flying)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Tropius (#357) | 59 | Grass/Flying |
| Oricorio, forma Pom-Pom (#741) | 59 | Electric/Flying |
| Altaria (#334) | 59 | Dragon/Flying |
| Staraptor (#398) | 59 | Normal/Flying |
| Flamigo (#973) | 60 | Flying/Fighting (Tera Flying) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Larry
Nota: mesma pessoa do Ginásio 5 (Normal) — ele dobra como Elite Four
de tipo Flying "a pedido da Geeta", exatamente como confirmado no
pedido original do dono do projeto. Modelar como o mesmo `Larry` com
dois times, não dois personagens.

**Hassel (Dragon)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Noivern (#715) | 60 | Flying/Dragon |
| Haxorus (#612) | 60 | Dragon |
| Dragalge (#691) | 60 | Poison/Dragon |
| Flapple (#841) | 60 | Grass/Dragon |
| Baxcalibur (#998) | 61 | Dragon/Ice (Tera Dragon) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hassel

### Campeã: Geeta ("Top Champion")
| Pokémon | Nível | Tipo |
|---|---|---|
| Espathra (#956) | 61 | Psychic |
| Gogoat (#673) | 61 | Grass |
| Veluza (#976) | 61 | Water/Psychic |
| Avalugg (#713) | 61 | Ice |
| Kingambit (#983) | 61 | Dark/Steel |
| Glimmora (#970) | 62 | Rock/Poison (Tera Rock) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Geeta
Nota: time do "Champion Assessment" (nível 61–62) — o confronto real
da progressão principal. Existe um time mais forte no "Academy Ace
Tournament" (69–70) e outro ainda no League Club Room pós-Indigo Disk
(84–85) — ambos fora de escopo, mesmo critério de "só o primeiro
confronto real" usado nos outros Campeões/Campeãs.

---

## Resumo — o que fazer com isto

- **34 locais reais cobertos**, organizados em 8 trechos por insígnia
  + 1 trecho final (Elite Four/Campeã), igual à estrutura das 6
  regiões anteriores — mesmo Paldea sendo mundo aberto de verdade.
- **Achado estrutural principal**: os 8 ginásios não têm ordem
  obrigatória no jogo original. A ordem fixa escolhida aqui (Katy →
  Brassius → Iono → Kofu → Larry → Ryme → Tulip → Grusha) é por
  **nível recomendado crescente** (14→17→24→30→36→42→45→48), decisão
  já tomada pelo dono do projeto; coincide com a ordem mais comum
  recomendada por guias de gameplay livre.
- **8 ginásios + Elite Four (4) + Campeã**, todos com time e nível
  confirmados via Bulbapedia ao vivo. Um dos Elite Four (**Larry**) é
  a mesma pessoa do Ginásio 5 — dobra como especialista Flying, com
  time totalmente diferente do time de ginásio (Normal). Modelar como
  `GYM_LEADER_BY_ID` reaproveitando o mesmo personagem com dois times
  distintos, um por fase do jogo.
- **Todas as espécies com número de Pokédex Nacional** anotado entre
  parênteses na primeira aparição, incluindo as ~90 espécies nativas
  de Paldea (#906–#1010) cross-checadas contra uma lista dedicada
  nesta sessão.
- **Mecânicas novas da Gen 9 fora de escopo, registradas aqui pra não
  esquecer**: Terastalização (todo líder/E4/Campeã Terastaliza o
  Pokémon ace — tipo anotado na tabela, mas não vira mecânica nova do
  jogo), Titãs do Path of Legends e bases da Equipe Estelar (histórias
  paralelas sem insígnia), Pokémon Paradoxo (Area Zero). Nenhuma dessas
  vira conteúdo novo — mesma decisão já tomada pra Mega Evolução
  (Kalos) e sazonalidade (Unova).
- **Achado de formato**: o Ginásio 6 (Ryme, Ghost) é uma **batalha
  dupla (2v2)**, único caso deste documento — pendência de design se o
  sistema de batalha atual só suporta 1v1.
- **Dois trechos exigem salto geográfico grande** por causa da
  natureza mundo-aberto de Paldea (Trecho 4: Levincia→Cascarrafa;
  Trecho 7: Montenevera→Alfornada) — assumido como viagem rápida via
  hub de Mesagoza, sinalizado nos próprios trechos.
- **Pendências explícitas** (não fabricadas): Dalizapa Passage (rota
  lateral entre Medali/Tagtree Thicket/Glaseado Mountain/Great Crater,
  sem tabela própria pesquisada), Zapapico (vilarejo de mineração),
  Socarrat Trail, Titã Bombirdier (norte de Casseroya Lake), Zero
  Gate/Zero Lab/Area Zero Underdepths (só a superfície de Area Zero foi
  coberta em detalhe). **South Province (Area Five) foi pesquisada
  nesta sessão** (Mankey, Skiploom, Murkrow, Luxio, Deerling, Wooper
  paldeano, Wattrel — nível 16–23, conecta South Province Area Three
  ao norte e Artazon a nordeste) mas ficou de fora de todo trecho por
  não ser o caminho mais direto pra nenhum ginásio na ordem escolhida;
  é candidata natural a Trecho 2 ou 4 extra se o jogo precisar de mais
  conteúdo intermediário ali. Se algum desses precisar entrar no jogo,
  pesquisar antes de codificar.
