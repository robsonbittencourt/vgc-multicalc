# Plano: Most Viewed Teams pelo log de acesso

Data: 2026-10-12. Branch: `teams`. Nada implementado ainda.

## Objetivo

Preencher o card **Most Viewed Teams** do menu lateral com os 3 times mais usados na semana, de qualquer regulation. O desenho prioriza custo previsível e o mínimo de infra na AWS. A contagem é aproximada de propósito.

## Decisões fechadas

- **Uso:** só ações na página Teams: abrir o paste (linha da compacta, card lateral, ícone de nova aba), copiar o texto Showdown, My team e Opponents. Como a contagem é uma por paste por dia, os botões de dentro do paste aberto na Teams não precisam mandar nada, porque abrir já contou. A página do paste aberta por link direto não conta.
- **Contagem:** **uma por paste por dia, por navegador**, controlada no `localStorage`. Não há tipo de evento: o sinal é um único "use".
- **Registro:** o **log de acesso do CloudFront** (entrega no S3, sem cobrança do CloudFront), que passa a ficar ligado de forma permanente com expiração de 7 dias. Sem banco, sem CloudFront Function e sem contador gravado por evento.
- **Ranking:** gerado uma vez por dia por uma Lambda agendada, com a soma dos últimos 7 dias, **um único arquivo para todas as regulations**.
- **Totais:** privados, num arquivo que o site não serve, consultados pelo usuário com o Claude.
- **Abuso:** sem proteção no servidor. Quem burlar o controle do navegador consegue inflar o ranking, e a resposta é ocultar o time pelo script de moderação.

## Custo estimado (com a Cloudflare na frente)

| Item | Custo/mês |
| --- | --- |
| Requisição do sinal | grátis, dentro das 10 milhões de requisições grátis do CloudFront |
| Entrega do log | grátis |
| Armazenamento do log (~65 MB, 7 dias) | ~US$ 0,002 |
| Gravação dos arquivos de log pelo CloudFront (~90 mil/mês) | de US$ 0 a ~US$ 0,45 (não confirmado se é cobrada) |
| Leitura do log pelo job (~90 mil/mês) | ~US$ 0,04 |
| Lambda diária e agendamento | grátis, dentro da faixa |

Total: **~US$ 0,05 a 0,50 por mês**, sem crescer com o uso nem com spam.

## Desenho

### Sinal

- O app pede `GET /api/events/use.json?paste={pasteId}`.
- Do lado da AWS existe **um único objeto estático** de 2 bytes (`{}`) em `api/events/use.json`, no bucket de pastes, com `Cache-Control: public, max-age=0, s-maxage=31536000`. O navegador sempre pede de novo e o CloudFront responde do cache.
- A política de cache do CloudFront ignora a query string, então todos os sinais acertam o mesmo objeto em cache. O log grava a query completa no campo `cs-uri-query`.
- A Cloudflare não guarda o sinal em cache: `/api/events/*` não está na lista de arquivos imutáveis e cai no bypass.

### Controle no navegador

- `localStorage` com `{ "day": "AAAA-MM-DD", "pastes": ["uZ5ATN1fRy", ...] }`.
- Antes de mandar, o app confere se o paste já está na lista do dia. Se o dia mudou, a lista é zerada.
- Se o armazenamento falhar (aba anônima, bloqueado), o sinal é mandado mesmo assim.
- O envio usa `fetch` com `keepalive`, em segundo plano, sem esperar a resposta e sem tratar erro.

### Job diário

- Lambda agendada pelo EventBridge Scheduler para 1 vez por dia (por exemplo, 01:00 UTC), processando o dia anterior.
- Lista os arquivos do log com o prefixo `{distributionId}.{AAAA-MM-DD}-`, descomprime, filtra as linhas com `cs-uri-stem` igual a `/api/events/use.json` e `sc-status` 200 ou 304, e lê `paste` da query.
- Valida o `pasteId` (10 caracteres alfanuméricos) e ignora o resto.
- Grava:
  - `stats/daily/{AAAA-MM-DD}.json` (privado): contagem do dia por paste;
  - `api/teams/most-viewed.json` (público, `Cache-Control: public` com `Expires` na próxima execução do job, 03:10 UTC; a Cloudflare também guarda esse arquivo): os 20 mais usados da soma dos últimos 7 dias, com `pasteId` e contagem;
  - `stats/totals.json` (privado): total acumulado por paste, somando o dia processado.
- Se o dia já foi processado (o arquivo diário existe), não soma de novo nos totais. Assim, rodar duas vezes não duplica.

### Página Teams

- O card Most Viewed Teams baixa `/api/teams/most-viewed.json` e cruza os `pasteId` com os times de **todas as regulations**: os resumos do VGCPastes (já carregados por demanda pelo repositório, ~170 KB comprimidos no total, em cache depois da primeira vez) e os índices da comunidade. Ocultos e removidos ficam de fora, porque não estão nos índices. Mostra os 3 primeiros.
- O card carrega esses dados só quando a listagem está visível, sem atrasar a lista central.
- Sem dados, ou se o arquivo não existir: "No views yet.".
- Disparam o sinal: abrir o paste (linha da compacta, card lateral, ícone de nova aba), copiar o texto Showdown (compacta e detalhada), My team e Opponents (compacta e detalhada).

## Etapas

### Etapa 1: Infra (Terraform, dev primeiro)

- [x] Objeto `api/events/use.json` no bucket de pastes (`aws_s3_object`).
- [x] Bucket policy: o CloudFront também lê `api/events/*` e `api/teams/most-viewed.json`.
- [x] Rotas no CloudFront: `/api/events/*` e `/api/teams/most-viewed.json` vão para o bucket de pastes com a política de cache do site. A ordem precisa ficar antes de `/api/teams/*`, que vai para a Lambda.
- [x] Log de acesso ligado em produção de forma permanente (`access_logs = true` em `infra/site`), com expiração de 7 dias. Já estava assim no Terraform; não pode ser desligado.
- [x] Lambda `team-stats` (Node, arm64), com permissão de listar e ler o bucket de log e de ler e gravar `stats/*` e `api/teams/most-viewed.json` no bucket de pastes.
- [x] Agendamento diário no EventBridge Scheduler, com a role para invocar a Lambda.
- [x] `proxy.conf.json`: incluir `/api/events`.

### Etapa 2: Lambda do job

- [x] Funções puras:
  - leitura de uma linha do log (campos separados por tab, com o cabeçalho `#Fields`);
  - extração e validação de `paste`;
  - contagem do dia;
  - soma dos 7 dias e ranking;
  - soma nos totais.
- [x] Handler: lista, lê, conta e grava os três arquivos, com a proteção contra rodar duas vezes no mesmo dia.
- [x] Testes com 100% de cobertura nas funções puras e no handler (store em memória), no mesmo padrão dos testes da Lambda de pastes.

### Etapa 3: App

- [x] Serviço de uso (`src/app/services`, cobertura de 100%): controle diário no `localStorage` e envio do sinal com `keepalive`.
- [x] Chamadas nos pontos de uso da página Teams.
- [x] Card Most Viewed Teams com o arquivo público e o cruzamento com os times de todas as regulations.

### Etapa 4: Validação

- [ ] Em dev: gerar sinais, conferir as linhas no log (pode demorar de minutos a algumas horas), rodar o job manualmente e conferir os arquivos e o card.
- [ ] Produção só com ordem explícita, junto com o lançamento do envio de times.
- [ ] No lançamento: aplicar `infra/cloudflare` (regra de cache inclui `/api/teams/most-viewed.json`). A Cloudflare só fica na frente da produção, por isso não foi aplicada em dev.

## Fora deste plano

- Contagem por pessoa única (IP). Descartada, porque o log do CloudFront vê os IPs da Cloudflare.
- Ranking em tempo real.
