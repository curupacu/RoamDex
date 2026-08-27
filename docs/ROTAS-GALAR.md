# Rotas de Galar — dados reais para o novo sistema de batalha

> Documento de pesquisa/design. Segue o mesmo modelo de `docs/ROTAS-KANTO.md`,
> `docs/ROTAS-JOHTO.md`, `docs/ROTAS-HOENN.md`, `docs/ROTAS-SINNOH.md`,
> `docs/ROTAS-KALOS.md` e `docs/ROTAS-UNOVA.md`. Os iniciais de Galar
> (Grookey #810, Grama; Scorbunny #813, Fogo; Sobble #816, Água) entram no
> nível 5, mesmo padrão das regiões anteriores.

## Metodologia

- Fonte única: **Bulbapedia**, dados de encontro selvagem da versão
  **Pokémon Sword** (Geração VIII) — quando Sword e Shield divergem numa
  mesma rota (troca clássica: Vulpix/Growlithe, Lotad/Seedot, Rolycoly
  variações, Jellicent/Mareanie, Shelmet/Karrablast, Boldore/Gurdurr,
  Vullaby+Rufflet/Vullaby só, Delibird+Snover/Darumaka Galariana etc.), só
  ficou o lado de **Sword**, anotado onde acontece.
- Mesmas simplificações já usadas nas regiões anteriores: pesca, encontros
  de horda e cavernas/matas com várias áreas colapsadas numa linha só por
  espécie.
- **Achado que muda a estrutura do 4º e 6º ginásio**: assim como Hoenn/
  Sinnoh/Kalos tiveram trocas de líder por versão, Galar tem **dois pares
  de ginásio version-exclusive**:
  - Stow-on-Side (Ginásio 4): **Bea** (Sword, Fighting) ou **Allister**
    (Shield, Ghost).
  - Circhester (Ginásio 6): **Gordie** (Sword, Rock) ou **Melony**
    (Shield, Ice).

  Decisão de design já tomada pelo dono do projeto: **na criação do save,
  sorteia-se UM de cada par e fica fixo pra aquele save** (espelha a
  experiência real de um jogador, que só vê uma das duas versões). Por
  isso os dois lados de cada par estão documentados aqui, times completos,
  em subseções separadas dentro do mesmo trecho — a implementação decide o
  sorteio, não este documento.
- **Achado que muda a estrutura de duas cidades**: **Motostoke** e
  **Hammerlocke** são visitadas duas vezes no jogo real — Motostoke é o
  primeiro hub (o ginásio de Kabu fica trancado até 2 insígnias) e
  Hammerlocke é passagem obrigatória no meio do jogo (ginásio de Raihan
  trancado até a 7ª insígnia). O esqueleto de locais fornecido lista cada
  cidade uma única vez; neste documento a **primeira passagem** aparece
  como local sem ginásio (trama/hub) e o **ginásio correspondente** é
  resolvido no trecho em que ele efetivamente abre no jogo (Kabu no
  Trecho 3, depois de Turffield e Hulbury; Raihan no Trecho 8, depois de
  Spikemuth) — mesmo espírito de não inventar uma rota nova só pra
  encaixar o esqueleto.
- **Wild Area (Área Selvagem) simplificada**: a Wild Area é uma zona
  aberta enorme com 17 sub-áreas nomeadas, sem uma progressão linear de
  rota — não cabe no formato "trecho único" dos documentos anteriores.
  Bulbapedia também não centraliza as tabelas na página-mãe da Wild Area:
  cada sub-área tem página própria, e a variação por **clima dinâmico**
  (chuva, nevasca, névoa etc., mecânica nova da Gen 8) multiplica as
  tabelas de encontro por zona. Solução adotada, no mesmo espírito de
  colapsar cavernas multi-área numa linha por espécie: cada zona virou
  **uma linha com as ~5-6 espécies de maior chance**, ignorando a variação
  por clima (chance tratada como peso relativo, não fração exata). As 17
  zonas foram agrupadas em **duas tabelas por nível/geografia real do
  jogo** — Wild Area Sul (níveis baixos, acessível logo após Motostoke) e
  Wild Area Norte (níveis médios/altos, liberada depois da Rotom Bike
  upgrade) — confirmando o que a própria Bulbapedia descreve: "Pokémon no
  Wild Area Sul aparecem em nível mais baixo que no Wild Area Norte".
- **Mecânicas novas da Gen 8 fora de escopo**: Dynamax/Gigantamax (líderes
  de ginásio e Leon usam nos Power Spots — não vira mecânica nova no
  jogo), clima dinâmico da Wild Area (ver acima), Curry/acampamento (usado
  só como fonte alternativa de encontro, ignorado). Mesmo espírito de não
  inventar mecânica nova já aplicado a sazonalidade (Unova), flores
  coloridas/Mega Evolução (Kalos).
- **Achado sobre o Campeão**: assim como o time de Blue/Wallace/Cynthia/
  Diantha já muda por época do jogo nos documentos anteriores, o time de
  **Leon** na final do Champion Cup muda ligeiramente conforme o inicial
  escolhido pelo jogador — um slot é ocupado pelo Pokémon-inicial evoluído
  que é forte contra o inicial do jogador (Rillaboom/Cinderace/Inteleon).
  Documentado como 3 variações completas, mesmo padrão de
  `CHAMPION_TEAM_BY_STARTER` já usado no projeto.
- **Qualidade dos dados**: todas as tabelas vieram de WebFetch ao vivo
  nesta sessão. Times de ginásio, Champion Cup e Leon são de alta
  confiança (páginas simples, dado estruturado, cruzado com a variação por
  inicial do Leon). As tabelas de rota têm confiança média-alta; a Wild
  Area tem confiança mais baixa que as rotas lineares — os números de
  chance % vieram de uma extração agregada de múltiplas tabelas de clima
  por zona e devem ser tratados como "os mais comuns", não porcentagem
  exata (mesmo cuidado já registrado pra Sinnoh/Unova).

---

## Trecho 1 — Postwick → Turffield (Ginásio 1: Milo, Grass)

Locais: Postwick, Wedgehurst, Route 1, Route 2, Slumbering Weald,
Motostoke (passagem, ginásio trancado), Route 3, Galar Mine, Route 4.

### Postwick / Wedgehurst
Cidades iniciais, sem encontro selvagem (casa do jogador, laboratório do
Professor Magnolia/Sonia e estação de trem).

### Route 1
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Skwovet (#819) | 50% | 3–6 | A pé (grama) |
| Rookidee (#821) | 30% | 3–6 | A pé (grama) |
| Wooloo (#831) | 15% | 3–6 | A pé (grama) |
| Nickit (#827) | 5% | 3–6 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_1
Nota: tabela oculta ("hidden encounters") também traz Caterpie (#10),
Hoothoot (#163), Grubbin (#736) e Blipbug (#824) em nível 2–5; não
entraram por já estar coberto o essencial da rota, mesmo tratamento dado a
tabelas ocultas nas regiões anteriores.

### Route 2
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Skwovet (#819) | 38% | 5–7 | A pé (grama) |
| Rookidee (#821) | 30% | 5–7 | A pé (grama) |
| Nickit (#827) | 15% | 5–7 | A pé (grama) |
| Chewtle (#833) | 10% | 5–7 | A pé (grama) |
| Yamper (#835) | 5% | 5–7 | A pé (grama) |
| Zigzagoon Galariana (#263) | 2% | 5–7 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_2
Nota Sword/Shield: Lotad (#270) só em Sword (tabela oculta); Seedot (#273)
só em Shield.

### Slumbering Weald (visita 1 — antes das insígnias)
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Skwovet (#819) | 50%/40% (visível/oculto) | 2–3 | A pé (grama) |
| Rookidee (#821) | 30%/20% | 2–3 | A pé (grama) |
| Blipbug (#824) | 20%/10% | 2–3 | A pé (grama) |
| Grubbin (#736) | 10%/5% | 2–3 | A pé (grama) |
| Hoothoot (#163) | — /15% (só oculto) | 2–3 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Slumbering_Weald
Nota: floresta mística visitada duas vezes na história — nesta primeira
visita o jogo não deixa sair até o evento com Zacian/Zamazenta terminar. A
tabela da segunda visita (pós-jogo, nível 45–47, com Weezing Galariana,
Munna, Orbeetle, Corviknight) é pós-game e não entra na progressão linear
deste documento.

### Motostoke (1ª passagem)
Cidade-hub sem encontro selvagem próprio (Estádio fechado — Kabu só abre
depois de 2 insígnias, ver Trecho 3).

### Route 3
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Zigzagoon Galariana (#263) | 38% | 10–14 | A pé (grama) |
| Gossifleur (#829) | 30% | 10–14 | A pé (grama) |
| Vulpix (#037) | 15% | 10–14 | A pé (grama) |
| Stunky (#434) | 10% | 10–14 | A pé (grama) |
| Trubbish (#568) | 5% | 10–14 | A pé (grama) |
| Tyrogue (#236) | 2% | 10–14 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_3
Nota Sword/Shield: Vulpix (Sword) vira Growlithe (Shield). Campo de grama
"oeste" da rota é quase só Rolycoly (#837, 99%) — colapsado nesta linha
já que é praticamente mono-espécie.

### Galar Mine
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Rolycoly (#837) | 35% | 11–14 | A pé (caverna) |
| Roggenrola (#524) | 25% | 11–14 | A pé (caverna) |
| Woobat (#527) | 15% | 11–14 | A pé (caverna) |
| Diglett (#050) | 10% | 11–14 | A pé (caverna) |
| Drilbur (#529) | 10% | 11–14 | A pé (caverna) |
| Timburr (#532) | 5% | 11–14 | A pé (caverna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Mine
Nota Sword/Shield: Timburr 5% em Sword vira 25% em Shield; Roggenrola 25%
em Sword vira 5% em Shield (as duas espécies existem nas duas versões, só
a chance troca).

### Route 4
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Electrike (#309) | 30% | 14–16 | A pé (grama) |
| Meowth Galariana (#052) | 23% | 14–16 | A pé (grama) |
| Yamper (#835) | 20% | 14–16 | A pé (grama) |
| Pumpkaboo (#710, todos tamanhos) | 21% | 14–16 | A pé (grama) |
| Pikachu (#025) | 1% | 14–16 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_4
Nota Sword/Shield: Pikachu 1% em Sword vira 5% em Shield; Eevee (#133) é o
inverso (5% em Sword, 1% em Shield) — Eevee entra como nota, não linha
própria, por chance residual muito baixa.

### Milo (Ginásio 1 — Grass)
| Pokémon | Nível | Tipo |
|---|---|---|
| Gossifleur (#829) | 19 | Grass |
| Eldegoss (#830) | 20 | Grass |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Milo
Nota: Milo Dynamaxa o Eldegoss na primeira oportunidade (ace).

---

## Trecho 2 — Turffield → Hulbury (Ginásio 2: Nessa, Water)

Locais: Route 5.

### Route 5
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Stufful (#759) | 35% | 19–21 | A pé (grama) |
| Spritzee (#682) | 30% | 16–21 | A pé (grama) |
| Dottler (#825) | 26% | 16–18 | A pé (grama) |
| Wobbuffet (#202) | 10% | 19–21 | A pé (grama) |
| Lombre (#271) | 20% | 16–18 | A pé (grama) |
| Applin (#840) | 10% | 16–18 | A pé (grama) |
| Drifloon (#425) | 5% | 19–21 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_5
Nota Sword/Shield: Lombre e Spritzee são de Sword; Shield tem Nuzleaf e
Swirlix nos mesmos slots.

### Nessa (Ginásio 2 — Water)
| Pokémon | Nível | Tipo |
|---|---|---|
| Goldeen (#118) | 22 | Water |
| Arrokuda (#846) | 23 | Water |
| Drednaw (#834) | 24 | Water/Rock |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Nessa
Nota: Nessa Dynamaxa o Drednaw na primeira oportunidade (ace).

---

## Trecho 3 — Hulbury → Motostoke, volta (Ginásio 3: Kabu, Fire)

Locais: Galar Mine No. 2, Motostoke Outskirts, Motostoke (2ª passagem —
ginásio de Kabu finalmente aberto).

### Galar Mine No. 2
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Shellos (Mar do Leste) (#422) | 25% | 20–24 | A pé (caverna) |
| Wimpod (#767) | 25% | 20–24 | A pé (caverna) |
| Croagunk (#453) | 15% | 20–24 | A pé (caverna) |
| Binacle (#688) | 15% | 20–24 | A pé (caverna) |
| Noibat (#714) | 10% | 20–24 | A pé (caverna) |
| Shuckle (#213) | 5% | 20–24 | A pé (caverna) |
| Chewtle (#833) | 5% | 20–24 | A pé (caverna) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Mine_No._2
Nota Sword/Shield: Croagunk é de Sword; Scraggy (#559) ocupa o mesmo slot
em Shield.

### Motostoke Outskirts
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Noctowl (#164) | 35% | 22–26 | A pé (grama) |
| Sudowoodo (#185) | 30% | 22–26 | A pé (grama) |
| Croagunk (#453) | 35% | 21–24 | A pé (grama, oculto) |
| Roggenrola (#524) | 30% | 21–24 | A pé (grama, oculto) |
| Koffing (#109) | 15% | 22–26 | A pé (grama) |
| Hatenna (#856) | 10% | 22–26 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Motostoke_Outskirts
Nota Sword/Shield: Croagunk (Sword) vira Scraggy (Shield) na tabela
oculta.

### Kabu (Ginásio 3 — Fire)
| Pokémon | Nível | Tipo |
|---|---|---|
| Ninetales (#038) | 25 | Fire |
| Arcanine (#059) | 25 | Fire |
| Centiskorch (#851) | 27 | Fire/Bug |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Kabu
Nota: Centiskorch é Gigantamax-capable (ace).

---

## Trecho 4 — Motostoke → Stow-on-Side (Ginásio 4: Bea OU Allister — par version-exclusive)

Locais: Hammerlocke (1ª passagem, ginásio trancado), Route 6, Stow-on-Side.

### Hammerlocke (1ª passagem)
Cidade-hub sem encontro selvagem próprio (castelo/estádio; ginásio de
Raihan só abre depois da 7ª insígnia, ver Trecho 8).

### Route 6
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Yamask Galariana (#562) | 35% | 29–33 | A pé (grama) |
| Helioptile (#694) | 29% | 29–33 | A pé (grama) |
| Dugtrio (#051) | 20% | 29–33 | A pé (grama) |
| Maractus (#556) | 10% | 29–33 | A pé (grama) |
| Trapinch (#328) | 5% | 29–33 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_6
Nota Sword/Shield: Trapinch 5% em Sword vira 1% em Shield.

### Bea (Ginásio 4 — Fighting) — versão Sword
| Pokémon | Nível | Tipo |
|---|---|---|
| Hitmontop (#237) | 34 | Fighting |
| Pangoro (#675) | 34 | Fighting/Dark |
| Sirfetch'd (#865) | 35 | Fighting |
| Machamp (#068) | 36 | Fighting |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Bea
Nota: Machamp é Gigantamax-capable (ace). Bea mantém os Pokémon em Ultra
Balls.

### Allister (Ginásio 4 — Ghost) — versão Shield
| Pokémon | Nível | Tipo |
|---|---|---|
| Yamask (#562) | 34 | Ground/Ghost |
| Mimikyu (#778) | 34 | Ghost/Fairy |
| Cursola (#864) | 35 | Ghost |
| Gengar (#094) | 36 | Ghost/Poison |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Allister
Nota: Gengar é Gigantamax-capable (ace). Allister mantém os Pokémon em
Dusk Balls.

---

## Trecho 5 — Stow-on-Side → Ballonlea (Ginásio 5: Opal, Fairy)

Locais: Glimwood Tangle.

### Glimwood Tangle
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Morgrem (#860) | 20% | 34–36 | A pé (grama) |
| Shiinotic (#756) | 15% | 34–36 | A pé (grama) |
| Ponyta Galariana (#077) | 10% | 34–36 | A pé (grama) |
| Spritzee (#682) | 10% | 34–36 | A pé (grama) |
| Phantump (#708) | 10% | 34–36 | A pé (grama) |
| Sinistea (#854) | 10% | 34–36 | A pé (grama) |
| Hattrem (#857) | 10% | 34–36 | A pé (grama) |
| Oranguru (#765) | 9% | 34–36 | A pé (grama) |
| Indeedee macho (#876) | 5% | 34–36 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Glimwood_Tangle
Nota Sword/Shield: Ponyta Galariana, Oranguru e Indeedee macho são de
Sword; Swirlix, Passimian e Indeedee fêmea ocupam esses slots em Shield.

### Opal (Ginásio 5 — Fairy)
| Pokémon | Nível | Tipo |
|---|---|---|
| Weezing (#110) | 36 | Poison/Fairy |
| Mawile (#303) | 36 | Steel/Fairy |
| Togekiss (#468) | 37 | Fairy/Flying |
| Alcremie (#869) | 38 | Fairy |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Opal
Nota: Opal Gigantamaxa a Alcremie na primeira oportunidade (ace).

---

## Trecho 6 — Ballonlea → Circhester (Ginásio 6: Gordie OU Melony — par version-exclusive)

Locais: Route 7, Route 8, Steamdrift Way.

### Route 7
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Perrserker (#863) | 30% | 37–41 | A pé (grama) |
| Toxel (#848) | 25% | 28–40 | A pé (grama) |
| Shelmet (#616) | 20–25% | 28–40 | A pé (grama) |
| Galvantula (#596) | 20% | 37–41 | A pé (grama) |
| Corviknight (#823) | 20% | 28–40 | A pé (grama) |
| Thievul (#828) | 20% | 37–41 | A pé (grama) |
| Liepard (#510) | 10–15% | 28–41 | A pé (grama) |
| Inkay (#686) | 10% | 37–41 | A pé (grama) |
| Seismitoad (#537) | 5–10% | 28–40 | A pé (grama) |
| Meowstic fêmea (#678) | 10% | 28–40 | A pé (grama) |
| Morpeko (#877) | 5% | 37–41 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_7
Nota Sword/Shield: Shelmet é de Sword; Karrablast (#588) ocupa o mesmo
slot em Shield. Tabela combina encontros ocultos (nível 28–40) e visíveis
(nível 37–41) numa lista só, mesmo tratamento dado a outras rotas
multi-faixa.

### Route 8
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Golett (#622) | 25% | 39–41 | A pé (grama) |
| Boldore (#525) | 25% | 39–41 | A pé (grama) |
| Pawniard (#624) | 20% | 39–41 | A pé (grama) |
| Vullaby (#629) | 10% | 39–41 | A pé (grama) |
| Gurdurr (#533) | 10% | 39–41 | A pé (grama) |
| Lunatone (#337) | 5% | 39–41 | A pé (grama) |
| Togedemaru (#777) | 5% | 39–41 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_8
Nota Sword/Shield: Lunatone, Boldore (25%) e Vullaby são de Sword; Shield
troca Boldore por Gurdurr como mais comum (25%) e usa Solrock no lugar de
Lunatone. Tabela oculta (Haunter #093, Rhyhorn #111, Dusclops #356,
Bronzong #437, Hippowdon #450, Drapion #452, Sandaconda #844, Falinks
#870, nível 38–40) não entrou linha a linha — mesma simplificação de
sempre.

### Steamdrift Way
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Snom (#872) | 40% | 38–43 | A pé (neve) |
| Sneasel (#215) | 20–25% | 38–43 | A pé (neve) |
| Snorunt (#361) | 25% | 39–43 | A pé (neve) |
| Snover (#459) | 20% | 38–41 | A pé (neve) |
| Delibird (#225) | 15% | 38–41 | A pé (neve) |
| Vanillish (#583) | 10% | 39–43 | A pé (neve) |
| Throh (#538) | 5% | 39–43 | A pé (neve) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Steamdrift_Way (a página
redireciona para a seção própria dentro do artigo de Route 8, mas os
dados formam uma tabela distinta, por isso entrou como local próprio,
mesmo espírito de Driftveil Drawbridge em Unova).
Nota Sword/Shield: Delibird e Snover são de Sword; Shield troca por
Darumaka Galariana no mesmo par de slots.

### Gordie (Ginásio 6 — Rock) — versão Sword
| Pokémon | Nível | Tipo |
|---|---|---|
| Barbaracle (#689) | 40 | Rock/Water |
| Shuckle (#213) | 40 | Bug/Rock |
| Stonjourner (#874) | 41 | Rock |
| Coalossal (#839) | 42 | Rock/Fire |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Gordie
Nota: Coalossal é Gigantamax-capable (ace). Todos os Pokémon são machos,
mantidos em Ultra Balls.

### Melony (Ginásio 6 — Ice) — versão Shield
| Pokémon | Nível | Tipo |
|---|---|---|
| Frosmoth (#873) | 40 | Ice/Bug |
| Darmanitan Galariana (#555) | 40 | Ice |
| Eiscue (#875) | 41 | Ice |
| Lapras (#131) | 42 | Water/Ice |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Melony
Nota: Lapras é Gigantamax-capable (ace). Todas as Pokémon são fêmeas,
mantidas em Ultra Balls.

---

## Trecho 7 — Circhester → Spikemuth (Ginásio 7: Piers, Dark)

Locais: Route 9.

### Route 9
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Pelipper (#279) | 40% | 41–44 | A pé (grama/poça) |
| Jellicent (#593) | 35% | 41–44 | A pé (grama/poça) |
| Gastrodon (Mar do Leste) (#423) | 15% | 41–44 | A pé (grama/poça) |
| Mareanie (#747) | 5% | 41–44 | A pé (grama/poça) |
| Pyukumuku (#771) | 5% | 41–44 | A pé (grama/poça) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_9
Nota Sword/Shield: Jellicent 35% em Sword vira 5% em Shield; Mareanie é o
inverso (5% em Sword, 35% em Shield).

### Piers (Ginásio 7 — Dark)
| Pokémon | Nível | Tipo |
|---|---|---|
| Scrafty (#560) | 44 | Dark/Fighting |
| Malamar (#687) | 45 | Dark/Psychic |
| Skuntank (#435) | 45 | Poison/Dark |
| Obstagoon (#862) | 46 | Dark/Normal |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Piers
Nota: Spikemuth não tem Power Spot (sem Dynamax) — o Obstagoon de Piers
compensa com EVs máximos em HP e Defesa; time mantido fiel à fonte mesmo
sendo forte pra posição na progressão (mesmo método já usado no Slaking
de Hoenn e no Avalugg de Wulfric em Kalos).

---

## Trecho 8 — Spikemuth → Hammerlocke, volta (Ginásio 8: Raihan, Dragon) → Wyndon → Champion Cup → Campeão

Locais: Route 10, Hammerlocke (2ª passagem — ginásio de Raihan finalmente
aberto), Wyndon.

### Route 10
| Pokémon | Chance | Nível | Método |
|---|---|---|---|
| Mr. Mime Galariano (#122) | 30–35% | 45–48 | A pé (grama) |
| Snover (#459) | 20–30% | 45–48 | A pé (grama) |
| Cubchoo (#613) | 20–30% | 45–48 | A pé (grama) |
| Vanillish (#583) | 30% | 43–46 | A pé (grama, oculto) |
| Klang (#600) | 30% | 43–46 | A pé (grama, oculto) |
| Sneasel (#215) | 14% | 45–48 | A pé (grama) |
| Glalie (#362) | 10% | 45–48 | A pé (grama) |
| Vanilluxe (#584) | 10% | 45–48 | A pé (grama) |
| Duraludon (#884) | 1% | 45–48 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Galar_Route_10
Nota: rota tem "seção próxima da estação" e "seção norte" com tabelas
ligeiramente diferentes — colapsadas numa lista só, mesmo tratamento dado
a outras rotas com sub-áreas.

### Wyndon
Cidade final, sem encontro selvagem próprio (estádio nacional e Champion
Cup).

### Raihan (Ginásio 8 — Dragon) — batalha de ginásio em Hammerlocke
| Pokémon | Nível | Tipo |
|---|---|---|
| Gigalith (#526) | 46 | Rock |
| Sandaconda (#844) | 46 | Ground |
| Flygon (#330) | 47 | Ground/Dragon |
| Duraludon (#884) | 48 | Steel/Dragon |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Raihan
Nota: Duraludon é Gigantamax-capable (ace).

### Champion Cup (torneio pós-8ª insígnia, Wyndon Stadium)

**Marnie (Dark)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Liepard (#510) | 47 | Dark |
| Toxicroak (#454) | 47 | Poison/Fighting |
| Scrafty (#560) | 47 | Dark/Fighting |
| Morpeko (#877) | 48 | Electric/Dark |
| Grimmsnarl (#861) | 49 | Dark/Fairy |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Marnie
Nota: time da semifinal do Champion Cup (nível 47–49) — Marnie tem times
mais fracos em batalhas de rival anteriores (Motostoke nível 24–26, Route
9 nível 42–44); usado aqui o time mais forte, mesmo critério já aplicado
ao Campeão nas regiões anteriores. Grimmsnarl é Gigantamax-capable (ace).

**Hop (Normal)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Dubwool (#832) | 49 | Normal |
| Snorlax (#143) | 49 | Normal |
| Rillaboom/Cinderace/Inteleon* | 49 | Grass/Fire/Water |
| Corviknight (#823) | 50 | Flying/Steel |
| Zamazenta (#889) | 50 | Fighting/Steel |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hop
Nota: time do Champion Cup (pós-jogo). Corviknight é Gigantamax-capable
(ace nominal), mas Zamazenta (lendário que se junta ao time de Hop após a
história principal) é o mais forte. *O 3º slot é o inicial que Hop
escolheu — sempre o **oposto** do inicial do jogador (mesma lógica de
counter usada por Leon, ver abaixo); nível usado aqui (49) é aproximado,
Bulbapedia não desmembra por variação de inicial nesta página.

**Bede (Fairy)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Mawile (#303) | 61 | Steel/Fairy |
| Gardevoir (#282) | 61 | Psychic/Fairy |
| Rapidash Galariana (#078) | 62 | Psychic/Fairy |
| Sylveon (#700) | 62 | Fairy |
| Hatterene (#858) | 63 | Psychic/Fairy |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Bede
Nota: Hatterene é Gigantamax-capable (ace).

**Raihan (Champion Cup, time diferente do ginásio)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Torkoal (#324) | 53 | Fire |
| Goodra (#706) | 54 | Dragon |
| Turtonator (#776) | 54 | Fire/Dragon |
| Flygon (#330) | 54 | Ground/Dragon |
| Duraludon (#884) | 55 | Steel/Dragon |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Raihan
Nota: time do Champion Cup é maior e mais forte que o de ginásio (5
Pokémon, nível 53–55, estratégia de clima com Torkoal/Drought). Duraludon
segue Gigantamax-capable (ace).

### Campeão: Leon (time varia por inicial escolhido pelo jogador)

**Se o jogador escolheu Grookey**
| Pokémon | Nível | Tipo |
|---|---|---|
| Aegislash (#681) | 62 | Steel/Ghost |
| Dragapult (#887) | 62 | Dragon/Ghost |
| Haxorus (#612) | 63 | Dragon |
| Seismitoad (#537) | 64 | Water/Ground |
| Cinderace (#815) | 64 | Fire |
| Charizard (#006) | 65 | Fire/Flying |

**Se o jogador escolheu Scorbunny**
| Pokémon | Nível | Tipo |
|---|---|---|
| Aegislash (#681) | 62 | Steel/Ghost |
| Dragapult (#887) | 62 | Dragon/Ghost |
| Haxorus (#612) | 63 | Dragon |
| Mr. Rime (#866) | 64 | Ice/Psychic |
| Inteleon (#818) | 64 | Water |
| Charizard (#006) | 65 | Fire/Flying |

**Se o jogador escolheu Sobble**
| Pokémon | Nível | Tipo |
|---|---|---|
| Aegislash (#681) | 62 | Steel/Ghost |
| Dragapult (#887) | 62 | Dragon/Ghost |
| Haxorus (#612) | 63 | Dragon |
| Rhyperior (#464) | 64 | Ground/Rock |
| Rillaboom (#812) | 64 | Grass |
| Charizard (#006) | 65 | Fire/Flying |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Leon
Nota: os 3 primeiros e o último slot (Aegislash, Dragapult, Haxorus,
Charizard) são fixos; os slots 4 e 5 mudam para contra-atacar o tipo do
inicial do jogador (o inicial evoluído de Leon é sempre forte contra o do
jogador — Cinderace/Inteleon/Rillaboom conforme o caso). Charizard é
Gigantamax-capable (ace fixo). Recomendo implementar como
`CHAMPION_TEAM_BY_STARTER`, mesmo padrão já usado em Kanto/Hoenn/Sinnoh/
Kalos.

---

## Wild Area (Área Selvagem) — tabela consolidada

Ver Metodologia para a simplificação adotada: 5–6 espécies mais comuns por
zona, ignorando variação por clima, divididas em duas faixas de nível que
batem com a geografia real do jogo (Sul = acesso logo após Motostoke;
Norte = liberado depois do upgrade da Rotom Bike, aproximadamente na
altura do Trecho 5/6).

### Wild Area Sul (nível baixo, ~7–16)

| Zona | Pokémon mais comuns | Nível |
|---|---|---|
| Rolling Fields | Delibird (#225), Wingull (#278), Electrike (#309), Baltoy (#343), Vanillite (#582), Bunnelby (#659) | 7–10 |
| Dappled Grove | Oddish (#043), Ralts (#280), Baltoy (#343), Purrloin (#509), Tympole (#535), Bunnelby (#659) | 13–15 |
| Watchtower Ruins | Gastly (#092), Machop (#066), Duskull (#355), Electrike (#309), Golett (#622), Woobat (#527) | 11–14 |
| East Lake Axewell | Oddish (#043), Wingull (#278), Electrike (#309), Baltoy (#343), Vanillite (#582), Mudbray (#749) | 8–15 |
| West Lake Axewell | Wooper (#194), Nincada (#290), Electrike (#309), Tympole (#535), Vanillite (#582), Klink (#599) | 7–14 |
| South Lake Miloch | Machop (#066), Wingull (#278), Drifloon (#425), Tympole (#535), Vanillite (#582), Klink (#599) | 14–16 |

Fontes: https://bulbapedia.bulbagarden.net/wiki/Rolling_Fields ,
https://bulbapedia.bulbagarden.net/wiki/Dappled_Grove ,
https://bulbapedia.bulbagarden.net/wiki/Watchtower_Ruins ,
https://bulbapedia.bulbagarden.net/wiki/East_Lake_Axewell ,
https://bulbapedia.bulbagarden.net/wiki/West_Lake_Axewell ,
https://bulbapedia.bulbagarden.net/wiki/South_Lake_Miloch

### Wild Area Norte (nível médio/alto, ~26–52)

| Zona | Pokémon mais comuns | Nível |
|---|---|---|
| Axew's Eye | Axew (#610), Crawdaunt (#342), Drifblim (#426), Snover (#459), Bewear (#760), Mudsdale (#750) | 36–40 |
| Giant's Seat | Electrike (#309), Snover (#459), Golett (#622), Mudbray (#749), Gastly (#092), Natu (#177) | 33–38 |
| North Lake Miloch | Drifloon (#425), Vanillite (#582), Golett (#622), Stunky (#434), Palpitoad (#536), Bunnelby (#659) | 26–28 |
| Motostoke Riverbank | Rhyhorn (#111), Sneasel (#215), Corvisquire (#822), Skorupi (#451), Pawniard (#624), Yamper (#835) | 26–28 |
| Bridge Field | Zigzagoon Galariana (#263), Sneasel (#215), Wobbuffet (#202), Cubchoo (#613), Maractus (#556), Noibat (#714) | 27–29 |
| Stony Wilderness | Machoke (#067), Sneasel (#215), Bonsly (#438), Cubchoo (#613), Maractus (#556), Hatenna (#856) | 28–30 |
| Giant's Mirror | Impidimp (#859), Applin (#840), Shellos Mar do Leste (#422), Hippowdon (#450), Skorupi (#451), Butterfree (#012) | 26–30 |
| Hammerlocke Hills | Wobbuffet (#202), Espurr (#677), Toxel (#848), Stufful (#759), Honedge (#679), Morelull (#755) | 28–31 |
| Giant's Cap | Noctowl (#164), Clefairy (#035), Sneasel (#215), Drednaw (#834), Carkol (#838), Vanillite (#582) | 28–30 |
| Dusty Bowl | Wobbuffet (#202), Hippopotas (#449), Eldegoss (#830), Rhydon (#112), Skuntank (#435), Electrike (#309) | 40–47 |
| Lake of Outrage | Corviknight (#823), Perrserker (#863), Snom (#872), Boltund (#836), Cramorant (#845), Coalossal (#839) | 50–52 |

Fontes: https://bulbapedia.bulbagarden.net/wiki/Axew%27s_Eye ,
https://bulbapedia.bulbagarden.net/wiki/Giant%27s_Seat ,
https://bulbapedia.bulbagarden.net/wiki/North_Lake_Miloch ,
https://bulbapedia.bulbagarden.net/wiki/Motostoke_Riverbank ,
https://bulbapedia.bulbagarden.net/wiki/Bridge_Field ,
https://bulbapedia.bulbagarden.net/wiki/Stony_Wilderness ,
https://bulbapedia.bulbagarden.net/wiki/Giant%27s_Mirror ,
https://bulbapedia.bulbagarden.net/wiki/Hammerlocke_Hills ,
https://bulbapedia.bulbagarden.net/wiki/Giant%27s_Cap ,
https://bulbapedia.bulbagarden.net/wiki/Dusty_Bowl ,
https://bulbapedia.bulbagarden.net/wiki/Lake_of_Outrage

Nota: Lake of Outrage também é onde ficam os Max Raid Dens de nível mais
alto do jogo base — não entrou como mecânica própria (Dynamax fora de
escopo, ver Metodologia).

---

## Resumo — o que fazer com isto

- **~27 locais reais cobertos** nos 8 trechos lineares (Postwick até
  Wyndon) + a Wild Area consolidada em 2 tabelas de 17 zonas — cobertura
  na mesma ordem de grandeza de Hoenn/Sinnoh/Kalos.
- **Achado estrutural nº1**: par version-exclusive **duplo** (Bea/Allister
  no Ginásio 4, Gordie/Melony no Ginásio 6) — ambos os lados documentados
  em subseções próprias; a implementação sorteia um por save na criação
  (decisão já tomada, não a ser revisitada aqui).
- **Achado estrutural nº2**: Motostoke e Hammerlocke são visitadas duas
  vezes (hub trancado → ginásio efetivo mais tarde); resolvido colocando
  o ginásio no trecho em que ele realmente abre no jogo.
- **Achado estrutural nº3**: o time do Campeão Leon muda por inicial
  escolhido (contra-ataque de tipo no slot 4/5) — mesmo padrão de
  `CHAMPION_TEAM_BY_STARTER` já usado no projeto; Hop também troca seu
  Pokémon-inicial no time do Champion Cup, mas pela lógica inversa
  (sempre o inicial "vencedor" contra o do jogador).
- **8 ginásios (10 times documentados, contando os 2 pares
  version-exclusive) + torneio Champion Cup (Marnie, Hop, Bede, Raihan) +
  Campeão Leon (3 variações por inicial)**, todos com time e nível
  confirmados via Bulbapedia ao vivo.
- **Pendências explícitas** (não fabricadas): Route 2 Digging Duo/Isle of
  Armor e Crown Tundra (DLCs, fora de escopo do jogo base), Battle Tower/
  Battle Café (pós-jogo, sem selvagem), interior de Hammerlocke/Wyndon
  fora do estádio (lojas, sem selvagem), Route 9 Old Cemetery e Dyna Tree
  Hill (pós-jogo). Se algum desses precisar entrar no jogo, pesquisar
  antes de codificar.
- **Mecânicas novas da Gen 8 fora de escopo, registradas aqui pra não
  esquecer**: Dynamax/Gigantamax (todos os líderes citados acima usam),
  clima dinâmico da Wild Area (motivo da simplificação em 2 tabelas),
  Curry/acampamento como método alternativo de encontro. Nenhuma dessas
  vira mecânica nova no jogo — mesma decisão já tomada pra sazonalidade
  (Unova) e flores coloridas/Mega Evolução (Kalos).
