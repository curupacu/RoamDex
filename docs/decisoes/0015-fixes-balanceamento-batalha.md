# 0015 — Fixes de balanceamento e feedback de batalha (relato do usuário)

Testando o painel de admin, o dono do projeto achou 3 problemas reais:

**1. "Forçar encontro" ignorava o nível escolhido.** `handleAdminForceEncounter`
tinha `level: 10` fixo no código, nunca lia o campo do formulário. Provável
causa raiz do "Dragonite lvl 20 mata Mewtwo lvl 200" — o Mewtwo "nível 200"
provavelmente estava sendo forçado como inimigo selvagem no nível 10 de
verdade. Corrigido: `onForceEncounter` agora recebe o nível do formulário.

**2. Selvagens "aparecem do nada no nível 100".** `wildLevelForProgress`
tinha `LEVEL_PER_LIFETIME_CANDIES = 100` — ou seja, cada 100 doces
acumulados (trivial, um upgrade custa centenas/milhares) somava 1 nível,
batendo no teto (100) quase instantaneamente. Subido pra 2000, então leva
bem mais progresso pra sair do começo do jogo.

**3. Batalhas acabavam em ~5 golpes, dos dois lados.** `DAMAGE_SCALE`
(introduzido no fix de dano do Sprint 15, `docs/decisoes/0009`) estava em
0.15 — ainda alto o bastante pra zerar a maioria das lutas rápido demais.
Baixado pra 0.06 (simulação: Bulbasaur vs Rattata mesmo nível passa de
~5 pra ~11-12 golpes pra vencer, e o jogador de ~5 pra ~25-30 golpes pra
perder).

**Também corrigido (achado ao investigar "não consigo ver diferença entre
acertar/errar o minigame"):** o multiplicador do QTE (cheio 2.5×, parcial
1.6×, fraco 1×) sempre existiu, mas nada na tela avisava qual tier você
tirou — só o número de dano mudava um pouco, fácil de não perceber.
Adicionado `qteResult` em `BattleHit` e uma mensagem própria ("Golpe
cheio!"/"Golpe parcial!"/"Golpe fraco...") que aparece junto (ou em vez)
da mensagem de efetividade de tipo.

**Hardening especulativo** (não consegui reproduzir de forma determinística
via leitura de código, mas o relato "às vezes o QTE buga quando o inimigo
ataca no meio" apontava pra uma possível janela): o timer de ataque do
inimigo agora reseta pra uma janela cheia assim que um QTE termina, em vez
de continuar contando de onde tinha parado quando o QTE abriu — antes,
terminar um QTE que demorou podia resultar em apanhar quase instantaneamente
depois. Também zera o efeito visual de tremor (`telegraph`) assim que o QTE
abre, pra não ficar tremendo por trás do modal. Se o problema persistir
depois desse fix, precisamos de mais detalhes de como reproduzir.

**Ainda pendente (não é bug, é mudança de escopo):** o usuário descreveu um
fluxo bem diferente do atual — progressão linear guiada por marcos (sem
botão "Batalha" avulso, selvagens fracos tipo Caterpie/Metapod/Spearow nível
~6 no início, indo até o 1º ginásio). Isso é redesenho de fluxo, não bug;
combinei de perguntar antes de mexer nisso.
