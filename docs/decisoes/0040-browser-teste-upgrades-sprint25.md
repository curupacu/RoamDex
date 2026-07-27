# 0040 — Teste manual no navegador: buffs de CPS/lendários + Padrão 3/4

Item 5 da lista de pendências (deixado por último por pedido do dono do
projeto): confirmar ao vivo, num navegador de verdade, os buffs numéricos
da decisão 0034 (upgrades lendários, gap clique×CPS) e os upgrades novos
da decisão 0035 (sinergia, marco global) — até agora só verificados por
simulação/teste unitário.

## O que foi testado (Kanto, `npm run dev`, guest login)

- **Marco global (Padrão 4)**: com 8 insígnias (via atalho do Admin
  "Pular pra Victory Road"), "Reconhecimento da Liga Pokémon" e "Lenda de
  Kanto" apareceram desbloqueados e comprá­veis. Tooltip mostrou o texto
  certo ("+8% em doces/clique e doces/s, permanente") e, depois de
  comprados, "(comprado)" no lugar do custo — sem linha de "Já rendeu"
  (esperado, não acumula produção própria). O clique base foi de 1 doce
  pra ~1.23 depois de comprar os dois (1.08×1.15 ≈ 1.242) — confirma que
  `globalMultiplierBonus` está de fato entrando na conta de
  `handleClick`, não só existindo no código.
- **Sinergia (Padrão 3)**: comprando 15x Esteira de Doces com Bulbasaur
  (Grama) ativo, "Cultivo Simbiótico" passou de invisível pra desbloqueado
  automaticamente, sem reload. Comprado, mostrou "+60 doces/s (comprado)"
  e "Já rendeu" funcionando (esse sim conta produção, kind `cps` normal).
- **Upgrade lendário (achado da decisão 0034)**: "Fábrica do Zapdos"
  comprado e confirmado rendendo (12 doces/s × 1 Pokémon no roster,
  "Já rendeu 2.29K doces" depois de um tempo parado na tela).
- **Efeito colateral útil**: um clique perdido caiu sem querer em
  "Desafiar a Elite Four" durante o teste, disparando uma luta real contra
  Lorelei (Elite Four de Kanto pós-fix da decisão 0038) — serviu de bônus
  pra confirmar que a animação de início de batalha (decisão 0037) ainda
  funciona sem erro depois de todas as mudanças de hoje.

Console sem nenhum erro do início ao fim da sessão.

## Não testado

Johto (mesma lógica, mesmo código genérico por região — risco baixo de
divergir, mas não foi clicado manualmente desta vez).
