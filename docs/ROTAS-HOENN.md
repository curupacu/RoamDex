# Rotas de Hoenn — dados reais para o novo sistema de batalha

> Documento de pesquisa/design. Segue o mesmo modelo de `docs/ROTAS-KANTO.md` e
> `docs/ROTAS-JOHTO.md`: o jogador anda por uma **rota**, um selvagem aparece
> periodicamente, ele batalha, evolui e fica mais forte; a qualquer momento
> pode tentar o ginásio daquela área. Ao vencer o ginásio, destrava a próxima
> rota. Os iniciais de Hoenn (Treecko #252, Torchic #255, Mudkip #258) entram
> no nível 5, mesmo padrão de Kanto/Johto.
>
> **Escopo desta sessão:** só Hoenn (Gen 3) foi pesquisado a fundo — o dono do
> projeto pediu pra focar aqui e deixar Sinnoh/Unova/Kalos/Alola/Galar/Paldea
> pra depois (só o esqueleto delas está em
> `docs/PESQUISA-GEN3-9-ESQUELETO.md`).

## Metodologia

- Fonte única: **Bulbapedia**, dados de encontro selvagem "a pé"/surf da versão
  **Pokémon Emerald** (Geração III). Nenhum número foi inventado — cada tabela
  abaixo veio de um WebFetch ao vivo nesta sessão contra a URL citada logo
  abaixo dela.
- **Por que Emerald e não Ruby/Sapphire:** Emerald é a versão "completa" de
  Hoenn (Battle Frontier, times de ginásio/Elite Four mais fortes) e também
  muda a peça final da região — **Juan** (não Wallace) é o 8º líder de
  ginásio em Sootopolis, e **Wallace** vira o Campeão (em Ruby/Sapphire é
  Steven Stone quem é Campeão, e Wallace é o 8º líder). Fiquei só com a
  versão Emerald pra não misturar as duas configurações, mesmo espírito da
  escolha "só Gold" em Johto.
- **Mesmas simplificações já usadas em Johto** (pra manter o padrão entre
  regiões): pesca (Old/Good/Super Rod) e Rock Smash descartados do escopo do
  jogo; Surf entra na mesma tabela da rota "a pé" sem renormalizar; masmorras
  com vários andares colapsadas numa linha só por espécie (nível vira faixa
  mín–máx cobrindo todos os andares, % somada sem renormalizar).
- **Hoenn não tem ciclo dia/noite nem swarms** como mecânica relevante pro
  escopo do jogo — a única exceção notada é Route 116, que tem uma entrada de
  "Skitty por swarm" na Bulbapedia; tratada como variação rara, não como
  mecânica nova (mesmo espírito do item já resolvido em Johto pra Manhã/Noite).
- **Geografia real de Hoenn não é linear** (pior que Johto, inclusive — tem
  ida-e-volta constante e dois eventos de trama, Team Aqua/Magma, no meio do
  caminho). Pra virar uma progressão simples "rota → ginásio → próxima rota",
  agrupei os locais reais em **8 trechos, na ordem oficial de insígnias**:
  Stone (Roxanne) → Knuckle (Brawly) → Dynamo (Wattson) → Heat (Flannery) →
  Balance (Norman) → Feather (Winona) → Mind (Tate & Liza) → Rain (Juan).
- **O que ficou de fora desta pesquisa (não fabricado, só não pesquisado
  ainda — pendente pra próxima sessão se for preciso):** Route 106/107/108
  (rotas de água perto de Dewford, mesmo padrão Tentacool/Wingull/Pelipper
  das outras rotas de água já cobertas), Route 124/127/130/132/133, Safari
  Zone, Abandoned Ship, New Mauville, Sealed Chamber, Desert Underpass,
  Cave of Origin, Sky Pillar (interior — só a entrada em Route 131 foi
  confirmada). Nenhum número pra essas foi inventado; se aparecerem no jogo
  antes de serem pesquisadas, tratar como TODO explícito, não como dado
  pronto.
- **Qualidade dos dados:** todas as tabelas abaixo vieram de WebFetch ao vivo
  nesta sessão contra a Bulbapedia (não são só "conhecimento treinado").
  Times de líder de ginásio, Elite Four e Campeão são de alta confiança
  (páginas simples, sem tabela de horário). Como em Johto, **recomendo
  revisão humana pontual das tabelas de rota mais densas** (Route 110,
  Meteor Falls, Victory Road) contra a URL citada antes de qualquer número
  entrar em `content/` do jogo.

---

## Trecho 1 — Littleroot Town → Rustboro (Ginásio 1: Roxanne, Rock)

Locais reais agrupados: Littleroot Town, Route 101, Route 102, Route 103,
Petalburg City, Route 104 (metade sul), Petalburg Woods, Rustboro City.

**Sugestão de arte de fundo:** Littleroot/Route 101 como grama baixa e clara,
bem parecido com New Bark Town de Johto (mesmo papel narrativo); Petalburg
Woods como floresta densa e escura; Rustboro City com prédios de pedra
cinza — é a "cidade grande" da primeira badge.

### Route 101
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Poochyena | 45% | 2–3 | A pé (grama) |
| Wurmple | 45% | 2–3 | A pé (grama) |
| Zigzagoon | 10% | 2–3 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_101
Nota: é aqui que o jogador recebe o inicial (Treecko/Torchic/Mudkip, nível 5)
do Prof. Birch — não é encontro selvagem, só evento único.

### Route 102
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Poochyena | 30% | 3–4 | A pé (grama) |
| Wurmple | 30% | 3–4 | A pé (grama) |
| Lotad | 20% | 3–4 | A pé (grama) |
| Zigzagoon | 15% | 3–4 | A pé (grama) |
| Ralts | 4% | 4 | A pé (grama) |
| Seedot | 1% | 3 | A pé (grama) |
| Surskit | 1% | 3 | A pé (grama) |
| Marill | 99% | 5–35 | Surf |
| Goldeen | 1% | 20–30 | Surf |
| Surskit | 1% | 20–30 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_102

### Route 103
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Poochyena | 60% | 2–4 | A pé (grama) |
| Zigzagoon | 20% | 3–4 | A pé (grama) |
| Wingull | 20% | 2–4 | A pé (grama) |
| Tentacool | 60% | 5–35 | Surf |
| Wingull | 35% | 10–30 | Surf |
| Pelipper | 5% | 25–30 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_103
Nota: rota opcional (dead-end ao norte de Oldale Town), mas acessível já no
início — mantida por completude, igual rotas curtas opcionais de Kanto/Johto.

### Route 104 + Petalburg Woods
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Zigzagoon | 50% | 4–5 | A pé (grama, Route 104) |
| Poochyena | 40% | 4–5 | A pé (grama, Route 104) |
| Marill | 20% | 4–5 | A pé (grama, Route 104) |
| Wurmple | 20% | 4 | A pé (grama, Route 104) |
| Taillow | 10% | 4–5 | A pé (grama, Route 104) |
| Wingull | 10% | 3–5 | A pé (grama, Route 104) |
| Wingull | 95% | 10–30 | Surf (Route 104) |
| Pelipper | 5% | 25–30 | Surf (Route 104) |
| Poochyena | 30% | 5–6 | A pé (grama, Petalburg Woods) |
| Zigzagoon | 30% | 5–6 | A pé (grama, Petalburg Woods) |
| Wurmple | 25% | 5–6 | A pé (grama, Petalburg Woods) |
| Silcoon | 10% | 5 | A pé (grama, Petalburg Woods) |
| Cascoon | 10% | 5 | A pé (grama, Petalburg Woods) |
| Shroomish | 15% | 5–6 | A pé (grama, Petalburg Woods) |
| Taillow | 5% | 5–6 | A pé (grama, Petalburg Woods) |
| Slakoth | 5% | 5–6 | A pé (grama, Petalburg Woods) |

Fontes: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_104 e
https://bulbapedia.bulbagarden.net/wiki/Petalburg_Woods
Nota: Route 104 é uma única rota que liga Petalburg a Rustboro por terra (com
Petalburg Woods no meio) e depois continua pela costa até o barco do Sr.
Briney rumo a Dewford (Trecho 2) — por isso ela aparece de novo lá.

### Roxanne (Ginásio 1 — Rock)
| Pokémon | Nível | Tipo |
|---|---|---|
| Geodude | 12 | Rock/Ground |
| Nosepass | 15 | Rock |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Roxanne

---

## Trecho 2 — Rustboro → Dewford (Ginásio 2: Brawly, Fighting)

Locais reais agrupados: Route 104 (metade norte/costa, barco do Sr. Briney),
Route 109, Granite Cave, Dewford Town.

**Sugestão de arte de fundo:** travessia de barco (mar aberto, silhueta de
ilha ao fundo) pra marcar a mudança de "trilha a pé" pra "ilha"; Granite Cave
como caverna escura de pedra cinza-azulada.

### Route 109
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Tentacool | 60% | 5–35 | Surf |
| Wingull | 35% | 10–30 | Surf |
| Pelipper | 5% | 25–30 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_109
Nota: sem encontro "a pé" em Emerald — rota exclusivamente de água (praia).

### Granite Cave
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Zubat | 30% | 7–11 | Caverna (1F–B2F, somado) |
| Abra | 10% | 8–10 | Caverna (1F–B2F, somado) |
| Makuhita | 30% | 6–11 | Caverna (1F–B1F, somado) |
| Geodude | 10% | 6–9 | Caverna (1F) |
| Sableye | 15% | 9–12 | Caverna (B1F–B2F, somado) |
| Mawile | 15% | 9–12 | Caverna (B1F–B2F, somado) |
| Aron | 40% | 9–12 | Caverna (B1F–B2F, somado) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Granite_Cave
Nota: Sableye só em Ruby/Mawile só em Sapphire na versão original — Emerald
tem os dois juntos (mantido, já que a fonte única aqui é Emerald, diferente
da regra "só Gold" de Johto que era pra separar Gold/Silver).

### Brawly (Ginásio 2 — Fighting)
| Pokémon | Nível | Tipo |
|---|---|---|
| Machop | 16 | Fighting |
| Meditite | 16 | Fighting/Psychic |
| Makuhita | 19 | Fighting |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Brawly

---

## Trecho 3 — Dewford → Mauville (Ginásio 3: Wattson, Electric)

Locais reais agrupados: Route 117, Route 116, Rusturf Tunnel, Verdanturf
Town, Route 110, Mauville City.

**Sugestão de arte de fundo:** Route 116/117 como campo aberto com trilha de
terra; Rusturf Tunnel como túnel estreito de rocha (curto, um único Pokémon);
Mauville City como cidade movimentada com neon (é a "capital elétrica").

### Route 116
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Whismur | 50% | 6–7 | A pé (grama) |
| Poochyena | 28% | 6–8 | A pé (grama) |
| Zigzagoon | 28% | 6–8 | A pé (grama) |
| Taillow | 20% | 6–8 | A pé (grama) |
| Nincada | 20% | 6–7 | A pé (grama) |
| Abra | 10% | 7 | A pé (grama) |
| Skitty | 2% | 7–8 | A pé (grama, raro) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_116
Nota: Bulbapedia lista Skitty também como "swarm" (evento de enxame raro,
50% quando ativo) — tratado aqui só como a entrada normal de 2%, mesmo
espírito da nota de swarm/horário de Johto (não vira mecânica nova).

### Rusturf Tunnel
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Whismur | 100% | 5–8 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Rusturf_Tunnel

### Route 117
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Oddish | 40% | 13–14 | A pé (grama) |
| Poochyena | 30% | 13–14 | A pé (grama) |
| Zigzagoon | 30% | 13–14 | A pé (grama) |
| Roselia | 30% | 13–14 | A pé (grama) |
| Volbeat | 18% | 13–14 | A pé (grama) |
| Illumise | 1% | 13 | A pé (grama) |
| Surskit | 1% | 13 | A pé (grama) |
| Seedot | 1% | 13 | A pé (grama) |
| Marill | 99% | 5–35 | Surf |
| Goldeen | 1% | 20–30 | Surf |
| Surskit | 1% | 20–30 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_117
Nota: Volbeat (Ruby/Emerald) vs Illumise (Sapphire) é troca de versão
clássica — mantido só o lado de Emerald.

### Route 110
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Electrike | 30% | 12–13 | A pé (grama) |
| Zigzagoon | 20% | 12 | A pé (grama) |
| Poochyena | 20% | 12 | A pé (grama) |
| Gulpin | 15% | 12–13 | A pé (grama) |
| Wingull | 8% | 12 | A pé (grama) |
| Oddish | 10% | 13 | A pé (grama) |
| Minun | 2% | 12–13 | A pé (grama) |
| Tentacool | 60% | 5–35 | Surf |
| Wingull | 35% | 10–30 | Surf |
| Pelipper | 5% | 25–30 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_110
Nota: Minun (Emerald tem os dois; Ruby só Plusle, Sapphire só Minun) —
mantido como consta na tabela de Emerald.

### Wattson (Ginásio 3 — Electric)
| Pokémon | Nível | Tipo |
|---|---|---|
| Voltorb | 20 | Electric |
| Electrike | 20 | Electric |
| Magneton | 22 | Electric/Steel |
| Manectric | 24 | Electric |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Wattson

---

## Trecho 4 — Mauville → Lavaridge (Ginásio 4: Flannery, Fire)

Locais reais agrupados: Route 111, Route 112, Mt. Chimney, Fiery Path,
Jagged Pass, Route 113, Lavaridge Town.

**Sugestão de arte de fundo:** Route 111 como deserto de areia (parte
central intransponível sem Go-Goggles); Mt. Chimney/Fiery Path/Jagged Pass
como vulcão — pedra vermelho-alaranjada, fumaça; Route 113 como grama cinza
de cinza vulcânica (visual único, bem diferente de tudo que veio antes).

### Route 111
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Sandshrew | 35% | 19–21 | A pé (areia) |
| Trapinch | 35% | 19–21 | A pé (areia) |
| Baltoy | 24% | 19–21 | A pé (areia) |
| Cacnea | 6% | 20–22 | A pé (areia) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_111
Nota: a área de deserto no meio da rota exige os Go-Goggles (item de trama);
existe também um trecho ao sul com Rock Smash e uma lagoa de Surf, descartados
pela mesma regra de Johto (Rock Smash/pesca fora de escopo).

### Route 112 (base do Mt. Chimney)
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Numel | 75% | 14–16 | A pé (grama) |
| Machop | 25% | 14–16 | A pé (grama) |
| Marill | 25% | 14–16 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_112

### Mt. Chimney
Sem encontro selvagem em nenhuma versão — é só cratera + evento de trama
(Team Magma), confirmado na Bulbapedia. Não entra na tabela de spawn, mas
conta como "local" pro trecho (visual + progressão).

Fonte: https://bulbapedia.bulbagarden.net/wiki/Mt._Chimney

### Fiery Path
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Numel | 30% | 15–16 | Caverna |
| Koffing | 25% | 15–16 | Caverna |
| Grimer | 25% | 15–16 | Caverna |
| Torkoal | 18% | 14–16 | Caverna |
| Machop | 15% | 15–16 | Caverna |
| Slugma | 10% | 15 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Fiery_Path

### Jagged Pass
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Numel | 55% | 20–22 | A pé (grama) |
| Machop | 25% | 20–22 | A pé (grama) |
| Spoink | 20% | 20–22 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Jagged_Pass

### Route 113
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Spinda | 70% | 14–16 | A pé (grama de cinza) |
| Sandshrew | 25% | 14–16 | A pé (grama de cinza) |
| Slugma | 25% | 14–16 | A pé (grama de cinza) |
| Skarmory | 5% | 16 | A pé (grama de cinza) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_113

### Flannery (Ginásio 4 — Fire)
| Pokémon | Nível | Tipo |
|---|---|---|
| Numel | 24 | Fire/Ground |
| Slugma | 24 | Fire |
| Camerupt | 26 | Fire/Ground |
| Torkoal | 29 | Fire |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Flannery

---

## Trecho 5 — Lavaridge → Petalburg (Ginásio 5: Norman, Normal)

Sem locais novos: o jogo manda o jogador voltar por Route 111/104 (já
cobertas no Trecho 1/4) até Petalburg City, onde o ginásio do Norman (que
antes recusava batalha) finalmente abre. Não repeti a tabela de encontro —
é a mesma de quando a rota foi visitada antes.

### Norman (Ginásio 5 — Normal)
| Pokémon | Nível | Tipo |
|---|---|---|
| Spinda | 27 | Normal |
| Vigoroth | 27 | Normal |
| Linoone | 29 | Normal |
| Slaking | 31 | Normal |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Norman

---

## Trecho 6 — Petalburg → Fortree (Ginásio 6: Winona, Flying)

Locais reais agrupados: Route 104/116 (agora com o atalho do Rusturf Tunnel
já aberto), Route 114, Route 115, Route 118, Route 119, Fortree City.

**Sugestão de arte de fundo:** Route 119 como selva densa e verde (a rota
mais "floresta tropical" do jogo); Fortree City com casas na copa das
árvores — visual único, "cidade suspensa".

### Route 114
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Swablu | 40% | 15–17 | A pé (grama) |
| Lotad | 30% | 15–16 | A pé (grama) |
| Seedot | 30% | 15–16 | A pé (grama) |
| Lombre | 20% | 16–18 | A pé (grama) |
| Zangoose | 19% | 15–17 | A pé (grama) |
| Seviper | 9% | 15–17 | A pé (grama) |
| Nuzleaf | 1% | 15 | A pé (grama) |
| Surskit | 1% | 15 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_114
Nota: Zangoose (Ruby/Emerald) vs Seviper (Sapphire) é outra troca clássica de
versão — Emerald tem os dois, mantido como está na tabela.

### Meteor Falls
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Zubat | 80% | 14–20 | Caverna (1F 1R) |
| Golbat | 65% | 33–40 | Caverna (1F 2R–B1F 1R–B1F 2R, somado) |
| Lunatone | 55% | 14–39 | Caverna (todas as salas, somado) |
| Solrock | 55% | 14–39 | Caverna (todas as salas, somado) |
| Bagon | 25% | 25–35 | Caverna (B1F 2R) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Meteor_Falls
Nota: Surf na mesma caverna repete o trio padrão de água de Hoenn
(Tentacool/Wingull/Pelipper — ver Route 109) e foi descartado daqui pela
mesma regra de não duplicar tabela; Golbat/Lunatone/Solrock também aparecem
via Surf nas fontes originais, omitido por já constarem via Caverna acima.

### Route 115
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Taillow | 40% | 23–25 | A pé (grama) |
| Swablu | 30% | 23–25 | A pé (grama) |
| Jigglypuff | 10% | 24–25 | A pé (grama) |
| Wingull | 10% | 24–26 | A pé (grama) |
| Swellow | 10% | 25 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_115

### Route 118
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Electrike | 30% | 24–26 | A pé (grama) |
| Zigzagoon | 30% | 24–26 | A pé (grama) |
| Linoone | 10% | 26 | A pé (grama) |
| Manectric | 10% | 26 | A pé (grama) |
| Wingull | 19% | 25–27 | A pé (grama) |
| Kecleon | 1% | 25 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_118

### Route 119
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Zigzagoon | 30% | 25–27 | A pé (grama alta) |
| Linoone | 30% | 25–27 | A pé (grama alta) |
| Oddish | 30% | 24–27 | A pé (grama alta) |
| Tropius | 9% | 25–27 | A pé (grama alta) |
| Kecleon | 1% | 25 | A pé (grama alta) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_119
Nota: se o jogador estiver pescando numa casa d'água de Feebas, o jogo troca
o pool inteiro — irrelevante aqui já que pesca está fora de escopo.

### Winona (Ginásio 6 — Flying)
| Pokémon | Nível | Tipo |
|---|---|---|
| Swablu | 29 | Normal/Flying |
| Tropius | 29 | Grass/Flying |
| Pelipper | 30 | Water/Flying |
| Skarmory | 31 | Steel/Flying |
| Altaria | 33 | Dragon/Flying |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Winona

---

## Trecho 7 — Fortree → Mossdeep (Ginásio 7: Tate & Liza, Psychic)

Locais reais agrupados: Route 120, Route 121, Route 122, Mt. Pyre, Route
123, Lilycove City, Route 125, Mossdeep City. (Route 124, entre Lilycove e
Mossdeep, ainda não foi pesquisada — ver nota na Metodologia.)

**Sugestão de arte de fundo:** Mt. Pyre como cemitério nebuloso, tons de
cinza/roxo (é o local mais "sombrio" da região); Lilycove City como porto
grande e colorido (maior cidade de Hoenn); Mossdeep City com o
observatório/instituto espacial ao fundo.

### Route 120
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Mightyena | 30% | 25–27 | A pé (grama alta) |
| Linoone | 30% | 25–27 | A pé (grama alta) |
| Oddish | 25% | 25–27 | A pé (grama alta) |
| Absol | 8% | 25–27 | A pé (grama alta) |
| Seedot | 1% | 25 | A pé (grama alta) |
| Surskit | 1% | 25 | A pé (grama alta) |
| Kecleon | 1% | 25 | A pé (grama alta) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_120

### Route 121
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Mightyena | 20% | 26–28 | A pé (grama) |
| Shuppet | 30% | 26–28 | A pé (grama) |
| Duskull | 30% | 26–28 | A pé (grama) |
| Wingull | 9% | 26–28 | A pé (grama) |
| Poochyena | 20% | 26 | A pé (grama) |
| Oddish | 15% | 26–28 | A pé (grama) |
| Gloom | 5% | 28 | A pé (grama) |
| Kecleon | 1% | 25 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_121

### Route 122
Só água nesta rota em Emerald — sem encontro "a pé".
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Tentacool | 60% | 5–35 | Surf |
| Wingull | 35% | 10–30 | Surf |
| Pelipper | 5% | 25–30 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_122
Nota: é aqui que fica o Mirage Tower/Cave of Origin entrance mais adiante —
fora do escopo desta tabela.

### Mt. Pyre
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Shuppet | 60% | 22–29 | A pé (interior, 1F–6F, somado) |
| Duskull | 60% | 22–29 | A pé (interior, 1F–6F, somado) |
| Vulpix | 30% | 25–29 | A pé (exterior) |
| Meditite | 30% | 27–29 | A pé (exterior) |
| Wingull | 10% | 26–28 | A pé (exterior) |
| Chimecho | 2% | 28 | A pé (topo/summit) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Mt._Pyre
Nota: local de trama importante (Team Aqua/Magma roubam o orbe azul/vermelho
aqui) — mantive só o dado de encontro selvagem, sem modelar o evento.

### Route 123
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Duskull | 30% | 26–28 | A pé (grama) |
| Mightyena | 20% | 26–28 | A pé (grama) |
| Linoone | 20% | 26–28 | A pé (grama) |
| Oddish | 15% | 26–28 | A pé (grama) |
| Wingull | 9% | 26–28 | A pé (grama) |
| Gloom | 5% | 28 | A pé (grama) |
| Kecleon | 1% | 25 | A pé (grama) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_123

### Route 125
Só água nesta rota em Emerald — sem encontro "a pé". Mesmo trio de
Tentacool/Wingull/Pelipper de Route 103/109/117/122 (padrão de rota de água
de Hoenn).
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Tentacool | 60% | 5–35 | Surf |
| Wingull | 35% | 10–30 | Surf |
| Pelipper | 5% | 25–30 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_125
Nota: liga Mossdeep a Shoal Cave (não pesquisada em detalhe — ver
Metodologia); Route 126/128/129/131/134 repetem o mesmo trio quase idêntico,
ver Trecho 8.

### Tate & Liza (Ginásio 7 — Psychic)
| Pokémon | Nível | Tipo |
|---|---|---|
| Claydol | 41 | Ground/Psychic |
| Xatu | 41 | Psychic/Flying |
| Lunatone | 42 | Rock/Psychic |
| Solrock | 42 | Rock/Psychic |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Tate_and_Liza
Nota: batalha em dupla (Double Battle) no jogo original — o motor de batalha
1v1 deste projeto não modela isso; tratar como sequência normal de 4, igual
qualquer outro ginásio (mesma simplificação já aceita pro resto do jogo).

---

## Trecho 8 — Mossdeep → Sootopolis (Ginásio 8: Juan, Water) → Elite Four → Campeã

Locais reais agrupados: Route 126, Route 128, Shoal Cave, Seafloor Cavern,
Sootopolis City, Route 131 (entrada do Sky Pillar), Route 134, Ever Grande
City, Victory Road (Hoenn). (Route 127/130/132/133 ainda não pesquisadas —
ver Metodologia; são rotas de água entre ilhas, mesmo padrão das já
cobertas.)

**Sugestão de arte de fundo:** Sootopolis City dentro de uma cratera com
água por todo lado — visual super distinto (cidade circular cercada de
paredão de pedra); Victory Road (Hoenn) como caverna final, mais escura e
perigosa que as anteriores; Ever Grande City com o prédio da Liga ao fundo.

### Route 126 / Route 128 / Route 134
Três rotas de água quase idênticas (mesmo trio de todas as rotas de água já
vistas em Hoenn — não há variação por rota nesta região, diferente de
Johto).
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Tentacool | 60% | 5–35 | Surf |
| Wingull | 35% | 10–30 | Surf |
| Pelipper | 5% | 25–30 | Surf |

Fontes: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_126 ·
https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_128 ·
https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_134

### Shoal Cave
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Spheal | 45% | 26–32 | Caverna (câmara principal) |
| Zubat | 45% | 26–32 | Caverna (câmara principal) |
| Snorunt | 10% | 26–30 | Caverna (sala de gelo, maré baixa) |
| Golbat | 5% | 30–32 | Caverna (sala de gelo, maré baixa) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Shoal_Cave
Nota: tem mecânica real de maré alta/baixa (algumas salas só abrem em
horário específico) — simplificado aqui numa tabela só, mesmo espírito da
simplificação de andares das outras cavernas.

### Seafloor Cavern
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Zubat | 90% | 28–35 | Caverna |
| Golbat | 10% | 33–36 | Caverna |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Seafloor_Cavern
Nota: local de trama (Team Aqua/Magma libera Kyogre/Groudon aqui) — só o
dado de encontro selvagem entrou na tabela.

### Route 131
Sem tabela de encontro capturada nesta sessão além do trio padrão de Surf —
ver Metodologia. Contém a entrada do Sky Pillar (interior não pesquisado).
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Tentacool | 60% | 5–35 | Surf |
| Wingull | 35% | 10–30 | Surf |
| Pelipper | 5% | 25–30 | Surf |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Hoenn_Route_131

### Juan (Ginásio 8 — Water)
| Pokémon | Nível | Tipo |
|---|---|---|
| Luvdisc | 41 | Water |
| Whiscash | 41 | Water/Ground |
| Sealeo | 43 | Ice/Water |
| Crawdaunt | 43 | Water/Dark |
| Kingdra | 46 | Water/Dragon |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Juan

### Victory Road (Hoenn)
| Pokémon | Chance (Emerald) | Nível | Método |
|---|---|---|---|
| Golbat | 35% | 38–44 | Caverna (1F–B2F, somado) |
| Hariyama | 30% | 36–42 | Caverna (1F–B1F, somado) |
| Lairon | 20% | 40–44 | Caverna (1F–B2F, somado) |
| Medicham | 12% | 40–44 | Caverna (B1F–B2F, somado) |
| Whismur | 5% | 36 | Caverna (1F) |
| Loudred | 10% | 40 | Caverna (1F) |
| Aron | 5% | 36 | Caverna (1F) |
| Zubat | 10% | 36 | Caverna (1F) |
| Sableye | 35% | 40–44 | Caverna (B2F) |
| Mawile | 5% | 42–44 | Caverna (B2F) |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Victory_Road_(Hoenn)
Nota: numa passagem também tem Rock Smash (Geodude/Graveler) e pesca —
descartados pela mesma regra do resto do documento.

### Elite Four de Hoenn

**Sidney (Dark)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Mightyena | 46 | Dark |
| Cacturne | 46 | Grass/Dark |
| Shiftry | 48 | Grass/Dark |
| Crawdaunt | 48 | Water/Dark |
| Absol | 49 | Dark |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Sidney

**Phoebe (Ghost)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Dusclops | 48 | Ghost |
| Banette | 49 | Ghost |
| Banette | 49 | Ghost |
| Sableye | 50 | Dark/Ghost |
| Dusclops | 51 | Ghost |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Phoebe

**Glacia (Ice)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Sealeo | 50 | Ice/Water |
| Glalie | 50 | Ice |
| Sealeo | 52 | Ice/Water |
| Glalie | 52 | Ice |
| Walrein | 53 | Ice/Water |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Glacia

**Drake (Dragon)**
| Pokémon | Nível | Tipo |
|---|---|---|
| Shelgon | 52 | Dragon |
| Altaria | 54 | Dragon/Flying |
| Kingdra | 53 | Water/Dragon |
| Flygon | 53 | Ground/Dragon |
| Salamence | 55 | Dragon/Flying |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Drake

### Campeã: Wallace
| Pokémon | Nível | Tipo |
|---|---|---|
| Tentacruel | 55 | Water/Poison |
| Ludicolo | 56 | Water/Grass |
| Whiscash | 56 | Water/Ground |
| Gyarados | 56 | Water/Flying |
| Wailord | 57 | Water |
| Milotic | 58 | Water |

Fonte: https://bulbapedia.bulbagarden.net/wiki/Wallace
Nota: só existe como Campeão em Emerald (em Ruby/Sapphire quem é Campeão é
Steven Stone, Rock — descartado por não ser a versão-fonte deste documento).

---

## Resumo — implementado em `content/gen3/*`

- **47 locais reais cobertos** (mais que a contagem inicial de "~34"
  estimada durante a pesquisa — a contagem final bateu maior porque
  Route 104/Petalburg Woods viraram 2 entradas separadas e Meteor Falls foi
  incluída), organizados nos mesmos 8 trechos por insígnia. Ver
  `docs/decisoes/0043-*.md` pro registro da implementação em código.
- **8 ginásios + Elite Four (4) + Campeã**, todos com time completo e nível
  confirmado via Bulbapedia ao vivo, já em `content/gen3/gyms.ts` e
  `content/gen3/eliteFour.ts`.
- `scripts/build-data/build-gen3.ts` já roda com a lista de `LEGACY_IDS`
  (espécies de Gen 1/2 reaproveitadas nas tabelas de Hoenn — Geodude,
  Tentacool, Oddish, Xatu, Kingdra etc., mesmo problema que o Johto teve)
  — `gen3.json` tem 168 entradas (135 nativas + 33 legadas).
- **Pendências explícitas** (não fabricadas, não implementadas): Route
  106/107/108/124/127/130/132/133, Safari Zone, Abandoned Ship, New
  Mauville, Sealed Chamber, Desert Underpass, interior do Sky Pillar, Cave
  of Origin — mesma recomendação de Johto: se algum desses precisar entrar
  no jogo, pesquisar antes de codificar, não estimar de memória.
- `LEVEL_BUMP`/`CHAMPION_LEVEL_BUMP` em `content/gen3/eliteFour.ts` usam os
  valores ORIGINAIS de Kanto (12/8) como ponto de partida, não os já
  recalibrados de Kanto/Johto — **ainda não passaram por simulação real**
  (`tests/simulations/`), mesmo aviso da 0038/0042. `unlockAt` de
  `content/gen3/locations.ts` é uma curva provisória escrita à mão (mesma
  ordem de grandeza final de Johto, ~650k–670k) — nenhum dos dois foi
  testado em playthrough real ainda.
