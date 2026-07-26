# 0029 — Cena de geradores (efeito "jardim que cresce") + correção do grid de clique

## Contexto

Feedback direto do dono do projeto depois de ver a decisão 0028 rodando de
verdade: "tá muito feio", sem a "visionariedade" que o projeto precisa.
Trouxe de novo `docs/referencias/exemplo coockie clicker.jfif` como
referência e pediu pra eu descrever exatamente o que falta pra chegar num
nível de polimento tipo Cookie Clicker (fábricas aparecendo conforme
compra, sprites bonitinhos), já que ele consegue caçar/produzir a arte,
só precisa saber exatamente o que desenhar.

## O que a referência mostra, olhando com atenção

A screenshot do Cookie Clicker tem 3 painéis, e o ponto central é que **o
cookie (alvo de clique) nunca é coberto por UI**:

1. **Esquerda**: só o cookie grande + contador. Nada sobrepõe.
2. **Meio**: uma cena/jardim que cresce — prédios comprados aparecem como
   sprites espalhados na paisagem, crescendo com o progresso.
3. **Direita**: a loja, lista vertical ícone+nome+custo+quantidade (isso o
   `UpgradesPanel` já faz desde a 0027/0028).

## Bug encontrado e corrigido: grid cobrindo o Pokémon

Rodei um mock estático (HTML isolado carregando o `index.css` real do
projeto, headless via Brave/Playwright, sem precisar do fluxo de login
Firebase) pra conferir visualmente a decisão 0028 antes de mexer em mais
nada. Com só 3-4 upgrades de clique o `.click-upgrades-grid` (posicionado
`absolute` no canto superior direito do `.click-stage`) parecia ok, mas
testando com os **7 upgrades de clique de Kanto** (número real do jogo) a
grade vira 4 linhas e cobre quase metade do sprite do Pokémon — o próprio
alvo de clique. Rigorosamente o mesmo erro que a referência do Cookie
Clicker mostra como errado (o cookie nunca fica coberto).

**Correção**: `.click-stage` virou `display: flex` e o grid deixou de ser
`position: absolute` — agora fica ao lado do Pokémon, não em cima,
crescendo pra baixo sem nunca sobrepor o sprite, não importa quantos
upgrades estejam destravados. Ver `frontend/src/index.css` (`.click-stage`,
`.click-upgrades-grid`).

## Novo: `UpgradeScene.tsx` — a cena que cresce

Implementado agora, **sem precisar de asset novo** (reaproveita o mesmo
ícone pedido na 0028 via `upgradeIconUrl(id)`):

- Cada upgrade de CPS possuído (`kind === 'cps'`, mesmo filtro que já
  existe pro popup idle) aparece como até 5 cópias do seu ícone,
  espalhadas numa faixa larga (`.upgrade-scene`) logo abaixo da área de
  clique/loja — visualmente o "jardim crescendo" do Cookie Clicker.
- Posição de cada cópia é um scatter **determinístico** (hash simples do
  id + índice), não `Math.random()` — não fica "pulando" a cada
  re-render, mas parece espalhado e não uma grade.
- Animação de flutuação sutil (`scene-bob`, CSS puro) pra não ficar
  estático. Se/quando chegar um GIF em vez de PNG pro ícone do upgrade
  (já previsto na 0028), ele anima sozinho aqui também, de graça — é o
  mesmo `<img src>`, o código não precisa saber a diferença.
- Arquivo novo: `frontend/src/ui/components/UpgradeScene.tsx`. Ligado em
  `App.tsx` logo abaixo do `.game-area` (área de clique + loja).

## O que preciso de você (pra realmente ficar bonito)

1. **Prioridade zero, sem mudar**: a lista de 30 ícones da decisão 0028
   (`docs/decisoes/0028-*.md`) continua sendo o que trava tudo — sem eles,
   tanto o grid de clique quanto a loja **e agora a cena nova** mostram só
   texto (o `onError` some com a `<img>` quebrada). Um ícone só resolve os
   três lugares de uma vez, já que a cena reaproveita o mesmo arquivo.
2. **Opcional, se quiser a cena mais bonita que a loja**: hoje a cena usa
   o ícone pequeno (mesmo da loja, 40×40) ampliado pra 28×28 na tela — dá
   pra jogar já, mas uma arte dedicada maior/mais detalhada por prédio
   (tipo os prédios do Cookie Clicker, que são diferentes do ícone da
   loja) ficaria mais rica. Se topar produzir isso depois, aviso o
   formato exato quando chegarmos nessa parte — não vale a pena
   especificar agora sem saber se você quer investir nisso.
3. **Fora do escopo desta rodada** (mesma ressalva da 0027/0028): os
   cursorzinhos orbitando o cookie no Cookie Clicker não têm equivalente
   aqui ainda (seria um efeito ambiente sobre os upgrades de *clique*, não
   os de CPS) — candidato pra próxima rodada, não implementado agora.
   Nav principal, cards de região, telas de ginásio seguem como texto
   puro, mesma decisão de adiar da 0028.

## Verificação

`tsc -b`, `oxlint`, `vite build` e a suíte inteira (203 testes) passam.
Validação visual feita via mock estático (`index.css` real + Brave
headless por Playwright, screenshots comparando antes/depois com 4 e com
os 7 upgrades de clique de Kanto) — **não** foi testado dentro do app
rodando de verdade (login Firebase + fluxo de seleção de região/inicial
não foram exercitados nesta sessão), então vale um play manual rápido pra
confirmar que bate com o mock antes de considerar fechado.
