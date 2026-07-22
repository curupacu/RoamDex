# PokéIdle — Roadmap de Design & Plano de Sprints

> Versão 2 — substitui o plano anterior. Incorpora o design definido pelo criador do projeto: regiões como rebirth, batalhas estilo GO com QTE por tipo, sistema de captura-ou-loot, Elite 4 como portão de rebirth e Victory Road.

---

# PARTE 1 — ROADMAP DE DESIGN (o jogo explicado)

## 1. O loop macro: geração = rebirth

```
Escolhe inicial (1 de 3 da geração)
        │
        ▼
┌─── LOOP DA REGIÃO ────────────────────────────────┐
│  Clica → ganha doces → compra upgrades            │
│  Selvagem aparece → batalha ou ignora             │
│  Venceu → captura OU loot                         │
│  Pokémon sobem de nível → evoluem → ficam fortes  │
│  Doces compram buffs e Rare Candies na loja       │
│  8 GINÁSIOS pelo caminho — entrada exige DOCES    │
│  ACUMULADOS na run (marco atingido, não gasto)    │
└──────────────────┬────────────────────────────────┘
                   ▼ (com as 8 insígnias de ginásio
                      + marco de doces acumulados)
         Desafia a ELITE 4 da região
                   │ (venceu)
                   ▼
              REBIRTH ★
   • Perde: todos os doces e upgrades da run
   • Mantém: todos os Pokémon, MAS em lvl 1 e forma base
   • Registra: time campeão na VICTORY ROAD
   • Desbloqueia: próxima geração + Loja de Rebirth
                   ▼
     Nova geração, novos 3 iniciais, recomeça
     (pode usar veteranos resetados, novos, ou misturar)
```

### Regras exatas do rebirth
| O quê | O que acontece |
|---|---|
| Doces | Zerados |
| Upgrades da run (clique, geradores) | Zerados |
| Upgrades da Loja de Rebirth | **Permanentes** — nunca resetam |
| Pokémon capturados | Mantidos, todos voltam a **lvl 1** e **forma base** (Venusaur→Bulbasaur, Gengar→Gastly; quem não evolui só reseta o nível) |
| Pokédex (registro de já vistos/capturados) | Permanente — é coleção, não poder |
| Victory Road | Ganha uma entrada nova: snapshot do time que venceu a Elite 4 (espécies, formas e níveis no momento da vitória) |
| Time ativo | Reescolhido do zero — pode misturar gerações livremente |

**Victory Road** é, por enquanto, um "hall da fama" somente-leitura. A estrutura de dados guarda o snapshot completo do time por região vencida, preparada para os planos futuros (não implementamos nada além do registro + tela de visualização).

## 2. Iniciais
No começo de **cada** geração o jogador escolhe 1 dos 3 iniciais daquela geração (Gen 1: Bulbasaur/Charmander/Squirtle; Gen 2: Chikorita/Cyndaquil/Totodile; e assim vai). O inicial vem em lvl 5 pra run não começar do zero absoluto.

## 3. Sistema de tipos (o coração de tudo)
Cada Pokémon herda do seu **tipo** duas coisas: um **bônus multiplicador** (economia) e um **super golpe de batalha** com 3 estágios de poder (por evolução/nível). Pokémon de tipo duplo usa o tipo primário para o golpe e recebe metade do bônus econômico do secundário.

### Tabela mestra dos 18 tipos

| Tipo | Bônus econômico (por Pokémon no time) | Super golpe (base → médio → final) | QTE do golpe |
|---|---|---|---|
| Grama | +% CPS | Vine Whip → Bullet Seed → Leaf Storm | Segurar pra carregar, soltar na zona verde da barra |
| Fogo | +% doces por clique | Ember → Flamethrower → Fire Blast | Mash: clicar o máximo em 3s pra "soprar as chamas" |
| Água | +% CPS | Water Gun → Surf → Hydro Pump | Barra oscilando como onda; clicar no pico |
| Elétrico | +% chance de crítico no clique | Thunder Shock → Thunderbolt → Thunder | 4 alvos acendem em sequência rápida; clicar cada um |
| Normal | +% doces ganhos em loot | Tackle → Body Slam → Hyper Beam | Clique ritmado: manter o ritmo do medidor |
| Gelo | −% custo de upgrades | Powder Snow → Ice Beam → Blizzard | Clicar rachaduras pra quebrar o gelo antes do timer |
| Lutador | +% ATK do time | Karate Chop → Brick Break → Close Combat | Combo alternado: esquerda-direita-esquerda... |
| Venenoso | Dano contínuo (DoT) em batalha | Poison Sting → Sludge Bomb → Gunk Shot | Estourar bolhas de veneno que sobem na tela |
| Terra | +% chance de loot ser upgrade | Mud-Slap → Dig → Earthquake | Arrastar/deslizar pra abrir a fenda no chão |
| Voador | −% tempo entre aparições de selvagens | Peck → Aerial Ace → Brave Bird | Seguir e clicar um alvo em movimento |
| Psíquico | +% XP ganho pelo time | Confusion → Psybeam → Psychic | Simon says de 3–5 símbolos |
| Inseto | +% chance de selvagem raro | Bug Bite → X-Scissor → Megahorn | Vários alvos pequenos simultâneos; limpar todos |
| Pedra | +% DEF do time | Rock Throw → Rock Slide → Stone Edge | Segurar firme: manter o dedo/botão numa zona que treme |
| Fantasma | Selvagens raros podem aparecer "à noite" (janela bônus) | Lick → Shadow Ball → Phantom Force | Alvo que some e reaparece; clicar antes de sumir |
| Dragão | +% pequeno em TUDO | Dragon Breath → Dragon Claw → Draco Meteor | Anéis que encolhem; clicar quando o anel cruza o alvo |
| Aço | −% dano recebido em batalha | Metal Claw → Iron Head → Meteor Mash | Parry: clicar no exato momento do ataque inimigo |
| Escuridão | +% chance de loot em dobro | Bite → Crunch → Dark Pulse | Tela escurece; clicar no brilho que pisca |
| Fada | +% chance de captura | Fairy Wind → Dazzling Gleam → Moonblast | Traçar/clicar 3 estrelas na ordem certa |

- QTE bem executado = golpe com dano cheio + bônus; QTE mediano = dano parcial; falhou = golpe fraco. Nunca é punição além disso.
- **Decisão proposta:** o estágio do golpe segue o estágio evolutivo (forma base / 1ª evo / 2ª evo). Pokémon sem evolução sobe de estágio por marcos de nível (20/40).

## 4. Batalha (estilo Pokémon GO)
- **Stats: só HP, ATK e DEF.** Derivados da PokeAPI (decisão proposta): `HP = base_hp`, `ATK = max(attack, sp_attack)`, `DEF = média(defense, sp_defense)`, escalados por nível. Assim Chansey é esponja de HP, Machamp bate forte, Steelix tanka — os arquétipos emergem sozinhos dos dados reais.
- **Como joga:** tap na tela = ataque básico do seu Pokémon ativo. Barra de energia enche com os taps; cheia, libera o **super golpe** que dispara o QTE do tipo. O inimigo ataca automaticamente em intervalos (telegrafado com animação — dá pra ver vindo).
- **Efetividade de tipos** (tabela oficial simplificada: 2×, 1×, 0.5×) aplica em ambos os lados.
- **Vitória:** HP do inimigo zera ("derrotado", sem eufemismo). **Derrota:** seu time zera — você não perde nada, só a oportunidade. Pós-batalha, todo mundo cura full automaticamente. Não existe morte, custo de cura nem hospital.
- 1v1 com troca: você leva o time (até 6), troca o ativo manualmente; se o ativo cair, entra o próximo.

## 5. Encontros selvagens
- Durante o clicker, a cada X tempo (base ~90s, reduzível por bônus Voador/upgrades) aparece um selvagem no canto com timer de ~20s: **Batalhar** ou deixar ir.
- Pool de espécies = geração atual da run. Nível do selvagem escala com o progresso da run (doces totais).
- Raridade por tier (comum/incomum/raro) derivada do `capture_rate` da API; Inseto/Fantasma no time mexem nas chances.

## 6. Pós-batalha: capturar OU loot (escolha exclusiva)
Venceu → escolhe **uma** das duas:
1. **Jogar Pokébola:** chance de captura baseada no `capture_rate` + bônus (Fada, upgrades). Falhou a bola → o Pokémon foge (a escolha consome a oportunidade — mantém a decisão tensa).
2. **Loot:** rola na tabela — doces (comum, escala com o nível do inimigo), upgrade grátis (raro), item (futuro — sistema de itens fica pra um sprint próprio depois).

## 7. Níveis, XP e evolução
- **Decisão proposta:** XP vem de batalhas (todo o time ganha; o ativo ganha mais). Complemento idle: upgrade "Treinamento" que gera XP passivo lento, pra ninguém travar por odiar batalhar.
- Evolução automática no nível oficial da API. Evoluções por pedra/troca/felicidade: convertidas em marcos de nível equivalentes (simplificação assumida).
- Evoluir = stats maiores + super golpe sobe de estágio + multiplicador econômico do Pokémon cresce.
- **Rare Candy** (Loja de Doces): sobe 1 nível instantâneo; preço escala com o nível do alvo — atalho caro, não substituto do jogo.

## 8. Ginásios & Elite 4 (a espinha da run)

### Ginásios — os doces como marco de progresso
- **8 ginásios por região**, com líderes e times temáticos clássicos da geração (conteúdo em dados, não código).
- **Entrada:** exige um total de **doces acumulados na run** (quanto você já *ganhou*, não quanto tem no bolso). Entrar não gasta nada — gastar doces na loja nunca atrapalha seu progresso pros ginásios.
- Cada ginásio é uma batalha contra o líder (mesmo motor de batalha, time fixo mais forte que a curva).
- Vencer dá a **insígnia do ginásio**, que concede um mini-bônus permanente durante a run (decisão proposta: +2% CPS cada, ou bônus temático por líder).
- Os marcos de doces dos 8 ginásios formam a "trilha" da região — o clicker sempre está te empurrando pro próximo ginásio.

### Elite 4 (portão do rebirth)
- **Desbloqueia com: as 8 insígnias + marco final de doces acumulados na run.**
- 4 batalhas em sequência + campeão, times temáticos da geração, níveis bem acima da curva — é pra perder na primeira vez e voltar depois.
- 4 batalhas em sequência + campeão, times temáticos da geração, níveis bem acima da curva — é pra perder na primeira vez e voltar depois.
- Entre batalhas da sequência: cura parcial (50%), pra ter tensão sem frustração.
- Perdeu → sai, continua a run, tenta quando quiser. Venceu → cutscene de vitória → registro na Victory Road → **botão de rebirth** (o jogador escolhe quando apertar; pode ficar farmando antes).

## 9. Loja de Rebirth
- Moeda: **Insígnias** (ganha por Elite 4 vencida + marcos da run).
- Upgrades permanentes que começam modestos e escalam absurdo no late game. Exemplos da árvore:
  - Doces iniciais da run (100 → ... → 1% do recorde anterior)
  - +% CPS global permanente
  - Iniciais começam em lvl mais alto
  - Selvagens aparecem mais rápido / raros mais comuns
  - "Memória de batalha": Pokémon resetados re-upam X% mais rápido
  - Segunda chance de Pokébola após falha (upgrade caro, late game)
  - Slot de time extra em batalha? (futuro)

## 10. Pra que servem os doces (os três papéis da moeda)
Correção do problema "clicker inútil" — o doce agora tem três papéis simultâneos:
1. **Marco de progresso:** os gates de ginásio e Elite 4 olham o **total acumulado na run** (nunca gastam). Clicar sempre te aproxima do próximo ginásio, não importa o que você compre.
2. **Upgrades do clicker:** os upgrades de clique/CPS clássicos (esses gastam).
3. **Loja de Doces:** buffs temporários pro time (ex.: +ATK por 10 min, +XP, +chance de captura na próxima batalha) e **Rare Candies**. Como os gates são por acumulado, gastar aqui é decisão de otimização sem culpa.

> Os marcos de doces acumulados **resetam no rebirth** junto com a run (decisão proposta — cada geração tem sua própria trilha de ginásios recalibrada).

## 11. Persistência e hospedagem (cloud save)
O jogo é feito pra sair e voltar mil vezes, então o save não pode viver só no navegador:

| Camada | Escolha | Papel |
|---|---|---|
| Save local | localStorage (local-first) | O jogo SEMPRE funciona, até offline; salva a cada 10s |
| Conta | **Firebase Auth** — login anônimo automático, upgrade opcional pra Google | Zero fricção pra começar; login Google leva o save entre aparelhos |
| Save na nuvem | **Firebase Firestore** | Sync do save (1 documento por jogador); última gravação vence + backup das 3 últimas versões contra corrupção |
| Hospedagem | **Vercel** conectado ao repositório GitHub | Deploy automático a cada push; preview por branch |

- Estratégia **local-first**: joga local, sincroniza quando dá. Sem internet = sem perda de nada.
- Free tier do Firebase e da Vercel aguentam o volume esperado de um projeto fan-made com folga.
- Anti-conflito simples: ao abrir, compara timestamp local vs nuvem e oferece escolher se divergirem muito.

## 12. Plano futuro PRÓXIMO: Raids da Victory Road ★
Entra logo depois da base polida (pós Fase 5). É o payoff dos times salvos na Victory Road:

- **Desbloqueia após o primeiro rebirth** (venceu Kanto → raids abrem).
- **Você luta com os times salvos da Victory Road** — os snapshots congelados (espécies, formas e níveis do momento da vitória). É literalmente "seu time campeão de Kanto volta pra batalhar". Quanto mais regiões vencidas, mais times disponíveis pra escalar.
- **Recompensas: Pokémon fortes/lendários que entram no modo padrão/história** — e obedecem as regras normais de rebirth de lá (voltam a lvl 1/forma base, ex.: Dratini).
- **Progressão de tiers:**
  | Tier | Recompensas (exemplos) | Dificuldade |
  |---|---|---|
  | 1 | Bebês pseudo-lendários: Riolu, Dratini, Larvitar, Bagon, Beldum | Times da Victory Road dão conta com estratégia básica |
  | 2 | Lendários menores: Victini, trio de pássaros, Heatran | Exige múltiplos times / composição pensada |
  | 3 | Supremos: Primal Kyogre, Mega Rayquaza, Arceus | **Mecânicas únicas por boss** (fases, QTEs especiais, gimmicks) |
- Tier 3 é onde entram as mecânicas especiais por boss (a evolução natural do framework de QTE já construído).
- Detalhamento fino das mecânicas de cada boss: quando chegarmos lá — a base precisa estar polida primeiro.

## 13. Fora de escopo por enquanto (registrado, não esquecido)
- Sistema de **itens** (loot dropa, inventário, uso em batalha) — sprint próprio no futuro
- Shiny, habilidades individuais (hoje o "poder" vem do tipo — mantém simples e coeso)
- Sons/música além do básico

---

# PARTE 2 — PLANO DE DESENVOLVIMENTO EM SPRINTS

Cada sprint tem **entregável jogável/testável** e critério de pronto (✅). A ordem respeita dependências.

## FASE 0 — Fundação
| Sprint | O que fazer | Entrega | ✅ Pronto quando |
|---|---|---|---|
| Sprint 1 | Setup do projeto | Vite + TS + React + Zustand, estrutura de pastas (engine/systems/content/ui/stores), deploy de dev | `npm run dev` roda um hello-world com hot reload e CI de lint |
| Sprint 2 | Pipeline PokeAPI | Script que gera JSONs estáticos da Gen 1: espécies, tipos, stats base, cadeias de evolução, capture_rate, sprites (URLs + fallback) | Rodar o script gera `gen1.json` válido; jogo carrega os 151 sem chamada de rede em runtime |
| Sprint 3 | Engine base | Game loop por timestamp (100ms lógico), sistema de save com versão + migrações, formatador de números grandes | Save sobrevive a refresh e a mudança de versão simulada; loop não deriva com aba em background |
| Sprint 4 | Conta & cloud save | Firebase Auth (anônimo automático + Google opcional), Firestore com 1 doc por jogador, sync local-first, backup das 3 últimas versões, hospedagem Vercel ligada ao GitHub com deploy automático | Jogar no PC, logar no celular e continuar a mesma run; jogar offline não perde nada |

## FASE 1 — Clicker core
| Sprint | O que fazer | Entrega | ✅ Pronto quando |
|---|---|---|---|
| Sprint 5 | Clique & doces | Área de clique com o inicial, doces, feedback visual (+N flutuante), contador | Clicar é gostoso; números certos |
| Sprint 6 | Upgrades & geradores | Painel lateral de upgrades (clique e CPS), custo `base×1.15^n`, desbloqueio progressivo | 30 min de jogo com sempre algo pra comprar em <5min |
| Sprint 7 | Progresso offline | Cálculo por timestamp ao abrir, tela "enquanto você estava fora" | Fechar 1h e voltar dá os doces esperados (com cap) |
| Sprint 8 | Escolha do inicial | Tela de novo jogo: escolher 1 dos 3 da Gen 1, inicial em lvl 5 vira o Pokémon ativo | Fluxo novo-jogo → escolha → clicker completo |

## FASE 2 — Sistema de tipos e time
| Sprint | O que fazer | Entrega | ✅ Pronto quando |
|---|---|---|---|
| Sprint 9 | Tipos: bônus econômicos | Os 18 bônus da tabela mestra implementados; tipo duplo = ½ do secundário; UI mostrando origem de cada bônus | Trocar o time muda a economia visivelmente e o jogador entende por quê |
| Sprint 10 | Time & Pokédex | Time ativo de até 6, tela de coleção com filtros (tipo/capturado), stats na ficha | Montar time e navegar a dex é fluido |
| Sprint 11 | Níveis, XP & evolução | Curva de XP, evolução automática por nível (dados da API), stats escalando, golpe muda de estágio | Bulbasaur→Ivysaur→Venusaur acontece e fortalece de verdade |
| Sprint 12 | Loja de Doces | Primeiro "ralo" de doces: buffs temporários pro time (+ATK, +XP, +captura) e Rare Candies com preço escalando por nível; contador separado de doces acumulados na run (base dos gates de ginásio) | Gastar doce vira decisão de otimização; acumulado e saldo aparecem separados na UI |

## FASE 3 — Batalha (o coração ativo)
| Sprint | O que fazer | Entrega | ✅ Pronto quando |
|---|---|---|---|
| Sprint 13 | Motor de batalha 1v1 | Tela de batalha tap-to-attack, HP/ATK/DEF derivados, barra de energia, ataque inimigo telegrafado, troca de Pokémon, vitória/derrota, cura automática pós-batalha | Batalha completa contra inimigo fixo de teste, divertida no tap puro |
| Sprint 14 | Efetividade de tipos | Tabela 2×/1×/0.5× nos dois sentidos, indicador visual ("super efetivo!") | Escalar contra o tipo certo muda o resultado |
| Sprint 15 | Super golpes + QTE (leva 1) | Framework de QTE + 6 primeiros tipos (Grama, Fogo, Água, Elétrico, Normal, Lutador) com 3 estágios de golpe | QTE bom = dano cheio; framework aceita QTE novo só com config |
| Sprint 16 | QTE leva 2 | +6 tipos (Gelo, Venenoso, Terra, Voador, Psíquico, Pedra) | Idem |
| Sprint 17 | QTE leva 3 | +6 tipos finais (Inseto, Fantasma, Dragão, Aço, Escuridão, Fada) | Os 18 tipos completos |
| Sprint 18 | Encontros selvagens | Spawn periódico com timer, pool da geração, nível escalando com a run, tiers de raridade via capture_rate, botão batalhar/ignorar | Loop clicker→encontro→batalha→volta sem fricção |
| Sprint 19 | Capturar OU loot | Tela pós-vitória com a escolha exclusiva; chance de captura por capture_rate+bônus; tabela de loot (doces/upgrade; slot de item reservado) | A escolha gera dilema real; falha de bola = fuga |

## FASE 4 — Rebirth e progressão macro
| Sprint | O que fazer | Entrega | ✅ Pronto quando |
|---|---|---|---|
| Sprint 20 | Ginásios de Kanto | Framework de ginásio + os 8 de Kanto como conteúdo (líder, time, nível, tema); gate de entrada por doces acumulados na run; insígnias com mini-bônus; "trilha" visual da região mostrando o próximo ginásio e quanto falta | Os 8 marcos de doces dão ritmo à run; vencer líder dá insígnia e bônus |
| Sprint 21 | Elite 4 de Kanto | Sequência de 4+1 batalhas como conteúdo (dados, não código), cura de 50% entre lutas, desbloqueio: 8 insígnias + marco final de doces acumulados | Dá pra perder, farmar, voltar e vencer — arco completo |
| Sprint 22 | Rebirth + Victory Road | Reset da run (regras exatas da Parte 1), devolução à forma base, snapshot do time na Victory Road + tela do hall, fluxo de nova geração | Rebirth roda sem perder dados que deviam persistir; Victory Road registra certinho |
| Sprint 23 | Loja de Rebirth | Moeda Insígnias de campeão, ~10 upgrades permanentes da árvore proposta, UI própria | Segunda run é sensivelmente melhor que a primeira |
| Sprint 24 | Gen 2 completa | Pipeline gera Johto, 3 iniciais novos, pool de selvagens, 8 ginásios e Elite 4 próprios, balanceamento da segunda run | Jogador faz o ciclo Kanto→rebirth→Johto inteiro |

## FASE 5 — Polimento e lançamento
| Sprint | O que fazer | Entrega | ✅ Pronto quando |
|---|---|---|---|
| Sprint 25 | Balanceamento | Planilha viva + testes Vitest simulando 1h/10h/50h de jogo | Sem muros nem inflação nas simulações |
| Sprint 26 | Polimento de UI/UX | Animações, transições de batalha, tutorial de 60s, responsivo mobile, settings (janela de QTE, reduzir efeitos) | Testável por alguém que nunca viu o jogo sem explicação |
| Sprint 27 | Export/import de save | Backup em Base64, botão copiar/colar | Save migra entre navegadores |
| Sprint 28 | Deploy público | Build de produção + hospedagem + disclaimer fan-made sem fins lucrativos | URL pública jogável |

## FASE 6 — Raids da Victory Road (plano futuro PRÓXIMO — só após a Fase 5 polida)
| Sprint | O que fazer | Entrega | ✅ Pronto quando |
|---|---|---|---|
| Sprint 29 | Framework de raids | Modo raid desbloqueado após o 1º rebirth; seleção e uso dos times salvos da Victory Road em batalha (snapshots congelados); estrutura de tiers e recompensas que entram no modo padrão | Lutar com o time campeão de Kanto funciona; recompensa aparece na coleção do modo história |
| Sprint 30 | Raids Tier 1 | Primeiras raids: bebês pseudo-lendários (Riolu, Dratini, Larvitar, Bagon, Beldum) como recompensa | Ciclo raid→recompensa→usar na história completo |
| Sprint 31 | Raids Tier 2 | Lendários menores (Victini, trio de pássaros, Heatran) com dificuldade que exige composição de times | Precisa pensar na escalação pra vencer |
| Sprint 32 | Raids Tier 3 | Supremos (Primal Kyogre, Mega Rayquaza...) com **mecânica única por boss** (fases, QTEs especiais, gimmicks) | Cada boss supremo é memorável e distinto |

## BACKLOG (pós-lançamento, já encaixado no design)
| Tam. | Item |
|---|---|
| M | **Sistema de itens** (o loot passa a dropar itens, inventário, uso em batalha/economia) |
| G | Gen 3 (e cada gen seguinte — o pipeline torna isso quase só conteúdo) |
| M | Shiny + variações raras |
| P | Cada Pokémon/boss/ajuste de conteúdo pontual |

---

## Decisões propostas que precisam do teu OK
1. **XP por batalha + treinamento passivo** como complemento idle (seção 7).
2. **Derivação de stats**: `ATK = max(atk, sp_atk)`, `DEF = média(def, sp_def)` (seção 4).
3. **Evoluções por pedra/troca viram marcos de nível** (seção 7).
4. **Falhou a Pokébola = Pokémon foge** (sem segunda chance, exceto upgrade caro da Loja de Rebirth) (seção 6).
5. **Estágio do super golpe segue estágio evolutivo**; sem evolução = marcos de nível 20/40 (seção 3).
6. **Rebirth é botão manual** após vencer a Elite 4 (pode farmar antes de apertar) (seção 8).
7. **Insígnia de ginásio dá mini-bônus na run** (ex.: +2% CPS cada, ou bônus temático por líder) (seção 8).
8. **Os marcos de doces acumulados resetam no rebirth** — cada geração tem sua trilha de ginásios recalibrada (seção 10).
9. **Firebase (Auth anônimo + Firestore) + Vercel** como infra, com estratégia local-first (seção 11).
