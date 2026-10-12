# Plano: envio de times pela comunidade

Data: 2026-10-12. Branch: `teams`. Nada implementado ainda.

## Objetivo

Permitir que qualquer pessoa envie um time para a página Teams. O time aparece na hora para todo mundo, ao lado dos times do VGCPastes, e reaproveita a infra dos pastes.

## Decisões fechadas

- **Envio**
  - Botão **Submit Team** no menu lateral da página Teams.
  - O formulário aparece no lugar da listagem (`/teams?submit`), com o menu lateral escondido e **Back to Teams** na linha do título, como no paste aberto.
  - Depois do envio, o paste do time abre ali mesmo.
- **Campos**

  | Campo | Regra |
  | --- | --- |
  | Texto Showdown | obrigatório |
  | Nome do time | obrigatório, até 60 |
  | Criador | obrigatório, até 40 |
  | Twitter | opcional, até 15, `^[A-Za-z0-9_]{1,15}$` |
  | Torneio | opcional, texto livre, até 60 |

  Nenhum campo de texto aceita link (`LINK_PATTERN` do `core.mjs`).
- **Regulation:** sem campo no formulário. O servidor grava sempre na regulation mais recente, definida numa configuração da Lambda (hoje `M-C`).
- **Gravação:** um único `POST /api/teams` cria o paste e o time. O servidor tira os membros e os SPs do texto, sem confiar no cliente.
- **Cache dos pastes de times:** 1 dia nos dados, na página `/paste/{id}` e na imagem de prévia. Os pastes normais continuam com 1 ano. A Cloudflare respeita esse cache (`edge_ttl: respect_origin` em `infra/cloudflare/cache.tf`).
- **Listagem**
  - Filtro de origem: All, VGCPastes e Community. No All, os do VGCPastes vêm antes de todos, e os da comunidade vêm depois, por data de envio.
  - Origem visível em cada time.
  - Os eventos digitados pela comunidade ficam no fim da lista de Event, sem repetir e juntando as variações de maiúsculas e espaços.
- **Remoção**
  - Quem enviou vê uma lixeira no próprio time (coluna Copy To da compacta e lateral da detalhada), só no navegador que guarda o token.
  - Remover apaga o time e o paste. Tudo some em até 1 dia, sem limpar cache.
- **Moderação**
  - O time é publicado na hora.
  - Você usa um script local para **ocultar** (o time sai do índice e o paste continua) ou **apagar** (o time e o paste).
  - Sem aviso por e-mail.

## Modelo de dados

### Objetos no bucket de pastes

| Chave | Público | Conteúdo | Cache |
| --- | --- | --- | --- |
| `api/pastes/{id}` | sim (já existe) | paste normal, mais `source: "community-team"` | `public, max-age=86400` |
| `teams/entries/{pasteId}.json` | **não** | registro completo: campos do formulário, regulation, membros, `hasSps`, `createdAt`, `tokenHash`, `hidden` | |
| `api/teams/index/{regulation}.json` | sim | lista pública da regulation, sem `tokenHash` e sem ocultos | `public, max-age=60` |

### Entrada do índice

Mesmo formato do `CommunityTeamSummary` atual, mais o campo de origem:

```json
{ "id": "<pasteId>", "pasteId": "<pasteId>", "description": "...", "player": "...", "handle": "...", "regulation": "M-C",
  "event": "...", "date": "2026-10-12T...Z", "hasSps": true, "members": [{ "name": "Garchomp", "item": "Choice Scarf" }], "source": "community" }
```

`handle` e `event` são omitidos quando vazios. Os times da comunidade nunca têm `placement` nem `replicaCode`.

### Token de remoção

- O servidor gera 32 bytes aleatórios e devolve o token em base64url na resposta do `POST`.
- O servidor guarda só o `sha256` dele.
- O navegador guarda `{ [pasteId]: token }` no `localStorage`.
- A comparação do hash usa `timingSafeEqual`.

## API

| Rota | Método | Corpo / cabeçalhos | Respostas |
| --- | --- | --- | --- |
| `/api/teams` | `POST` | `{ showdown, useSpsMode, name, player, handle?, event? }`, `x-amz-content-sha256`, `x-paste-stamp` | `201 { pasteId, token }`, `400`, `429`, `503` |
| `/api/teams/{pasteId}` | `DELETE` | `x-team-token` | `204`, `401` com token errado (403 seria reescrito para 404 pela página de erro do CloudFront), `404`, `429` |

Valem a prova de trabalho e o limite por IP já existentes, com o IP vindo do `CF-Connecting-IP` quando a requisição passa pela Cloudflare.

### Fluxo do POST

1. Valida o corpo, reaproveitando o `validatePaste` para o texto Showdown e o `useSpsMode`, e adiciona as regras dos campos novos.
2. Extrai os membros com `parseSets`: espécie e item. O `hasSps` é verdadeiro se algum membro declara EVs ou SPs.
3. Grava o paste com `source: "community-team"` e `CacheControl: public, max-age=86400`.
4. Grava `teams/entries/{pasteId}.json` com `IfNoneMatch: *`.
5. Acrescenta a entrada no índice da regulation com `IfMatch` no ETag, tentando de novo até 5 vezes se houver conflito.
6. Se o passo 4 ou 5 falhar, o paste fica solto. O script limpa esses casos (veja a etapa 4).

### Fluxo do DELETE

1. Lê o registro, confere o hash do token e responde `401` se não bater.
2. Remove a entrada do índice com `IfMatch` e novas tentativas.
3. Apaga o registro e o paste.

## Etapas

### Etapa 1: Lambda (backend)

- [x] `core.mjs`: `validateTeamSubmission(rawBody)`, que reaproveita o `validatePaste` e valida `name`, `player`, `handle` e `event`.
- [x] `core.mjs`: `teamMembers(showdown)` (espécie e item) e `declaresSps(showdown)`.
- [x] `core.mjs`: `newTeamToken(randomBytes)`, `teamTokenHash(token)` e `isTeamTokenMatch(hash, token)`.
- [x] `core.mjs`: `addToIndex(index, entry)` e `removeFromIndex(index, pasteId)`, ambas puras.
- [x] `s3-store.mjs`:
  - `putPasteIfAbsent` com cache configurável;
  - `getEntry`, `putEntryIfAbsent`, `deleteEntry`;
  - `getIndex` (com ETag), `replaceIndex` (com `IfMatch`, ou `IfNoneMatch` no primeiro envio);
  - `deletePaste`.
- [x] `handlers.mjs`: `createTeamHandler` e `deleteTeamHandler`. O roteamento do `pasteApiHandler` passa a incluir `/api/teams` e `/api/teams/{id}`.
- [x] `handlers.mjs` (`pastePageHandler`): para `source: "community-team"`, a página e o `og.png` usam cache de 1 dia (`s-maxage=86400`) em vez de 1 ano.
- [x] Testes em `infra/modules/pastes/test/`:
  - validação de cada campo;
  - membros e SPs;
  - token;
  - conflito de ETag com nova tentativa;
  - `401` e `404` no DELETE;
  - cache do paste e da página.

### Etapa 2: Infra (Terraform, em dev primeiro). Aplicada em dev em 2026-10-12, produção pendente

- [x] Variável `current_regulation` no módulo de pastes, passada à Lambda como `CURRENT_TEAM_REGULATION`.
- [x] IAM da Lambda de criação:
  - `GetObject`, `PutObject` e `DeleteObject` em `teams/entries/*` e `api/teams/index/*`;
  - `DeleteObject` em `api/pastes/*`.
- [x] Bucket policy: o CloudFront pode ler `api/teams/index/*`.
- [x] CloudFront (`infra/modules/site/distribution.tf`):
  - `/api/teams` e `/api/teams/*` com método `DELETE` vão para a Lambda de criação, sem cache;
  - `GET /api/teams/index/*` vai para o bucket de pastes e respeita o `max-age=60`.

  A ordem dos comportamentos precisa separar o índice (GET, S3) do DELETE (Lambda). Confirmar o desenho no plan do Terraform.
- [x] Cloudflare: nada a mudar. `/api/teams/*` já cai no bypass, e `/api/pastes/*` respeita o cache da origem.
- [x] `proxy.conf.json` do `ng serve`: incluir `/api/teams`.

### Etapa 3: App

**Domínio (`@multicalc/community-teams`, cobertura de 100%)**
- [x] `CommunityTeamSummary` ganha `source: "vgcpastes" | "community"`. Os dados fixos passam a ter `source: "vgcpastes"`, pelo gerador ou na leitura do repositório.
- [x] `mergeCommunityTeams(vgcpastes, community)` ordena: VGCPastes primeiro (por data), depois a comunidade (por data de envio).
- [x] `CommunityTeamFilter` ganha `source: "all" | "vgcpastes" | "community"`.
- [x] `communityTeamEvents`: primeiro os eventos do VGCPastes por data, depois os da comunidade, sem repetir e normalizando maiúsculas e espaços.
- [x] `validateTeamSubmission` no cliente, com as mesmas regras do servidor, para mostrar o erro antes de enviar.

**Serviços (`src/app/services`, cobertura de 100%)**
- [x] `CommunityTeamsService`:
  - `index(regulation)` baixa `/api/teams/index/{reg}.json`; se der 404, devolve lista vazia;
  - `submit(form)` usa o mesmo carimbo de prova de trabalho do `PasteService`;
  - `delete(pasteId)`.
- [x] Armazenamento dos tokens no `localStorage`, com `try/catch`, porque pode falhar em aba anônima.

**Página Teams**
- [x] A regulation carregada junta os dados fixos e o índice da comunidade.
- [x] Filtro de origem no menu lateral: segmented control ou toggle group com All, VGCPastes e Community.
- [x] Origem visível: na compacta, abaixo do criador na coluna Player; na detalhada, no cabeçalho do time.
- [x] Visão detalhada e Copy To dos times da comunidade: os sets vêm do paste, buscado pelo `PasteService`, e passam pelo mesmo caminho da página de paste (`buildPasteCards` e `parseShowdownText`).
- [x] Botão **Submit Team** no menu lateral, que abre o formulário em `/teams?submit`.
- [x] Formulário (canônico: Team List modal, com rótulos acima dos campos no widget e botões retangulares). Campos: texto Showdown (área de texto, como no Create Paste), Team, Creator, Twitter e Event. Botão **Submit**.
- [x] Depois do envio: guarda o token, insere o time na lista local sem esperar o cache do índice e abre `?paste=<id>`.
- [x] Lixeira no time, quando houver token: confirma, chama o DELETE, tira o time da lista local e mostra um snackbar.
- [x] Erros em uma linha: 429 vira "Too many submissions. Try again in a minute.", 400 mostra a mensagem do servidor.

### Etapa 4: Script de moderação

`scripts/community-teams-admin.mjs <dev|prod> <comando>`, rodado com `AWS_PROFILE=vgc`. Usa o AWS CLI e as funções do `core.mjs` da Lambda. Testado em dev em 2026-10-12:

- [x] `list [--days N]`: lista os envios recentes (data, nome, criador, torneio, link do paste).
- [x] `hide <pasteId>` e `unhide <pasteId>`: marcam o registro e regeneram o índice da regulation.
- [x] `delete <pasteId>`: apaga o registro, o paste e a entrada do índice.
- [x] `rebuild-index <regulation>`: reconstrói o índice a partir dos registros, ignorando os ocultos.
- [x] `orphans`: pastes `source: "community-team"` sem registro, para apagar.
- [x] O script fala direto com o S3 e não existe endpoint de admin.

### Etapa 5: Validação e lançamento

- [ ] Testes da Lambda e testes unitários com cobertura (domínio e serviços em 100%).
- [ ] Deploy em dev: enviar, listar, remover pelo navegador e ocultar, apagar e reconstruir pelo script.
- [ ] Conferir o cache de 1 dia nas respostas do paste, da página e do `og.png`, e o cache de 60s no índice.
- [ ] Produção só com ordem explícita.

## Fora deste plano

- Top Teams (ranking por uso). Está parado, e a contagem por IP único precisa ser repensada por causa da Cloudflare.
- Publicar os pastes do VGCPastes em produção e trocar o mapeamento de dev.
