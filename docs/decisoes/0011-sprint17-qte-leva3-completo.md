# 0011 — Sprint 17: QTE "leva 3", os 18 tipos completos

Fecha o que os Sprints 15/16 começaram (`docs/decisoes/0008`/`0010`) —
Inseto, Fantasma, Dragão, Aço, Escuridão e Fada, os últimos 6.
`hasQte()` agora é `true` pros 18 tipos (teste dedicado em
`engine.test.ts` confirma isso iterando `content/types.ts`'s `TYPES`).

Mecânicas:
- **Inseto:** 6 alvos pequenos simultâneos, limpar todos antes do timer.
- **Fantasma:** alvo único que aparece/some em ciclos; clicar enquanto
  visível.
- **Dragão:** anel encolhe até um alvo fixo; clicar quando o tamanho do
  anel cruza a zona do alvo.
- **Aço:** barra de aproximação linear (não onda, diferente da Água);
  clicar "Parry!" perto do fim = timing de defesa.
- **Escuridão:** tela escura, brilho pisca em posição aleatória; clicar
  durante a janela.
- **Fada:** 3 estrelas em posições fixas, ordem revelada por número, jogador
  clica na ordem certa (Simon Says de posição, não de símbolo — variação do
  padrão do Psíquico).

**Efeito colateral no teste do fallback:** como todo TypeName real agora
tem QTE, o teste que cobria "tipo sem QTE, multiplicador fixo" não tinha
mais nenhum tipo de verdade pra usar. Trocado por um tipo fabricado
(`'unconfigured-type' as TypeName`) só pra exercitar esse branch
defensivo — ele continua existindo no código pra caso um 19º tipo (ou
uma variação de conteúdo) apareça sem QTE configurado ainda.

**O que falta pra fechar a Fase 3 de batalha de verdade:** Sprint 18
(encontros selvagens) e Sprint 19 (capturar ou loot) — sem esses, o
Rattata nível-do-jogador continua sendo o único "inimigo" existente.
