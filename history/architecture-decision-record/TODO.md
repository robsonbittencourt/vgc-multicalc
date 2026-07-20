imagens alguns pokes, gengar
Pain split tem que passar fisico. Ver outros.
desc.ts — de longe o maior buraco (249 pontos, 84% s / 79% b). Não ataquei: são dezenas de ramos de formatação de descrição que exigem montar cenários específicos um a um. É o alvo óbvio se quiser continuar.
Weak Armor — probe rodou mas a saída veio truncada no meu grep; não quis chutar a string esperada.

ok-guards.ts:46-50 (Pain Split) — verifiquei: é código morto. O check de move.category === "Status" na linha 24 sempre retorna antes, e já existe um teste no repo documentando exatamente isso. Só daria pra cobrir forçando a categoria por dentro. Vale sua atenção como possível remoção.

