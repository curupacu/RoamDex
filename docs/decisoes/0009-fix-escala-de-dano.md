# 0009 — Fix: dano cru excedia o HP inteiro em 1 hit

**Contexto:** testando o Sprint 15 (QTE) com o usuário, todo clique
único no Bulbasaur nocauteava o Rattata de teste, mesmo depois de
igualar os níveis (`docs/decisoes` do fix anterior). A barra de energia
nunca tinha chance de encher (precisa de 5 toques), então o QTE nunca
abria.

**Causa raiz:** `deriveStats` deriva HP e ATK/DEF de stats base
*independentes* (roadmap seção 4) — um "canhão de vidro" como o Rattata
tem ATK/DEF razoáveis mas HP baixo (30 base). A fórmula de dano
(`atk - def×0.5`) não tinha nenhuma normalização relativa ao HP, então
o dano de um único golpe regularmente passava do HP máximo do alvo,
**independente do nível** (o fator de crescimento por nível cancela na
razão dano/HP — é só álgebra: ambos escalam pelo mesmo `growth`).

**Fix:** `DAMAGE_SCALE = 0.15` multiplicando o resultado de
`atk - def×0.5` antes do piso de 1. Simulação (Bulbasaur vs Rattata,
mesmo nível): ~5 toques pra nocautear em vez de 1, em qualquer nível
testado (5/15/30) — dá espaço real pra barra de energia (5 toques)
completar e o QTE aparecer.

Mesmo tratamento dos outros números de batalha
(`docs/decisoes/0006`/`0007`/`0008`): provisório, Sprint 25
("Balanceamento") ajusta de verdade com simulação de várias horas de
jogo.
