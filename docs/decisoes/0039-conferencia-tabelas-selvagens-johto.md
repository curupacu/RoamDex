# 0039 — Conferência das tabelas selvagens de Johto contra a Bulbapedia

Item 2 da lista de pendências da decisão 0034: as tabelas de rota com
divisão manhã/dia/noite (Route 30, 31, 38, 39, 42, 43, 45) e a de Victory
Road, sinalizadas em `docs/decisoes/0025-*.md`/`ROTAS-JOHTO.md` como tendo
passado por "normalização manual mais pesada" e precisando de conferência
humana pontual. Essa conferência aconteceu, usando WebFetch direto nas
mesmas URLs já citadas no documento.

## Achados reais (corrigidos)

- **Rota 42**: faltavam as 3 linhas noturnas — Rattata (30%, nv.13),
  Raticate (20%, nv.15) e Marill (5%, nv.15). A rota tinha ficado só com o
  pool diurno; as outras rotas vizinhas (29, 30, 31) já tinham a divisão
  correta, essa não.
- **Rota 43**: faltava Girafarig (30%, nv.15, pool diurno).
- **Rota 45**: faltava Donphan (15%, nv.25–30) como forma já evoluída rara
  de Phanpy — mesmo padrão que Furret/Raticate já tinham em outras rotas
  deste mesmo documento.

Todas as 3 espécies já existiam em `gen2.json` sem precisar regenerar nada
— caem dentro do intervalo 152–251 (dex nativo de Johto), que o
`build-gen2.ts` inclui incondicionalmente, mesmo sem citação direta numa
tabela (decisão 0025). Só precisou editar `content/gen2/locations.ts` e o
documento de pesquisa.

## Falsos alarmes (checados, NÃO mudados)

A ferramenta de fetch tem dois modos de erro que valem documentar pra quem
for confiar nela de novo:

1. **Achata split de versão (Gold/Silver) em duas linhas separadas.** A
   Rota 30 "achou" Weedle/Kakuna coexistindo com Caterpie/Metapod nos
   mesmos números — na verdade é a MESMA célula da tabela fonte marcada
   "G/S", que o resumo automático espalhou em duas linhas sem preservar a
   nota de versão. `ROTAS-JOHTO.md` já tratava isso certo (só a linha de
   Gold). Mesmo padrão suspeito no Victory Road: o fetch mostrou Ursaring
   E Donphan juntos, mas a nota já existente no documento ("Donphan
   substitui Ursaring em Silver") bate com o mesmo padrão version-split já
   confirmado na Rota 28 — **não mudei o Victory Road**.
2. **Conflação entre rotas vizinhas parecidas.** O fetch da Rota 26 voltou
   com uma composição quase idêntica à Rota 27 (incluindo Noctowl/Arbok
   que só a 27 tem no nosso documento) — sinal de que o modelo auxiliar
   confundiu as duas páginas (rotas adjacentes, pool de espécie parecido).
   **Não mudei nem a Rota 26 nem a 27** por causa dessa incerteza.

## O que não foi conferido

Route 38/39 (o fetch mencionou vagamente um possível Noctowl noturno na
Rota 38 sem números claros — não confiável o suficiente pra virar edição)
e a tabela completa de Victory Road (marcada desde a decisão 0025 como "a
tabela com maior chance de imprecisão do documento inteiro") continuam
como estavam, sem confiança suficiente pra mexer. Ficam pra uma conferência
futura com acesso direto à tabela HTML da fonte (não só resumo de modelo).

## Verificação

265 testes (a suíte de smoke test do Johto já confirma que toda espécie
citada existe em `gen2.json`), `tsc -b` e `oxlint` limpos.
