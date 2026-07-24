# 0005 — Sprint 12: a loja só vende o que já tem efeito de verdade

**Contexto:** a seção 10 do roadmap descreve a Loja de Doces vendendo
"buffs temporários pro time (+ATK, +XP, +captura) e Rare Candies". +ATK
depende do motor de batalha (Sprint 13+); +captura depende do sistema de
captura (Sprint 19). Nenhum dos dois existe ainda.

**Decisão:** não vender um item que não faz nada — isso pareceria bug,
não feature futura (diferente do Sprint 9, onde o bônus "(em breve)" era
só informativo, nunca uma compra de verdade). Sprint 12 vende apenas:
- **Rare Candy** — sobe 1 nível instantâneo do alvo (preço escala com o
  nível do alvo), pode inclusive causar evolução, igual XP normal.
- **Reforço de treino** — buff de 2x XP por 10 min, empilha estendendo o
  timer em vez de resetar.

`+ATK` e `+captura` ficam de fora até Sprint 13/19 trazerem sistemas que
deem efeito real a eles.

**Reuso:** `save.buffs: Record<string, number>` (buffId → timestamp de
expiração) é genérico o bastante pra qualquer buff futuro sem precisar
de outro bump de versão — só quando o efeito em si (ATK, captura) for
implementado é que essa tabela ganha uma nova entrada.

**Contadores separados na UI:** "Saldo" (`candies`, gasta) e
"Acumulado" (`lifetimeCandies`, nunca reduz) já existiam desde o Sprint
6 internamente — só não apareciam os dois juntos na tela. Isso fecha o
critério de pronto do Sprint 12 e já deixa visível o número que vai
virar gate de ginásio no Sprint 20.
