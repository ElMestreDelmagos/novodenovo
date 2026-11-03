# NovoDeNovo — Cadastro com Node.js + Express + Supabase

## 1. Preparação
1. Instale Node.js 18 ou superior.
2. Na raiz do projeto, execute `npm install`.
3. Copie `.env.example` para `.env`.
4. Preencha `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` com os dados do seu projeto Supabase. A service role deve permanecer somente no servidor.
5. Garanta que as tabelas `endereco_usuario`, `usuario`, `brecho` e `bazar` foram criadas com o SQL fornecido no TCC.

## 2. Executar
Use `npm run dev` durante o desenvolvimento ou `npm start` para iniciar normalmente. Abra `http://localhost:3000` — não abra mais o `index.html` diretamente pelo Live Server para testar o cadastro.

## 3. Rotas de cadastro
- `POST /api/cadastro/usuario`
- `POST /api/cadastro/brecho`
- `POST /api/cadastro/bazar`
- `GET /api/health` para verificar se o servidor está funcionando.

## 4. Fluxo
O formulário em `app/index.html` envia JSON para `js/cadastro.js`. O Express valida os dados, gera hash BCrypt da senha e grava no Supabase. Para brechó/bazar, cria primeiro `endereco_usuario`, depois `usuario` e então o registro específico ligado pelas chaves estrangeiras.

## Segurança
Nunca coloque `SUPABASE_SERVICE_ROLE_KEY` em HTML ou JavaScript do navegador e não envie o arquivo `.env` para repositórios públicos. A senha é armazenada como hash BCrypt, não em texto puro.

## Observação de escopo
Esta entrega integra somente o CADASTRO solicitado. Login, sessões, edição das áreas de brechó/bazar, favoritos e lembretes ainda são etapas separadas.

## Catálogo dinâmico e CRUD
- GET /api/brechos e GET /api/bazares alimentam os cards públicos diretamente do Supabase.
- Após cadastrar brechó/bazar, uma sessão do responsável é criada e ele é redirecionado ao painel.
- GET/PUT/DELETE /api/me/brecho e /api/me/bazar permitem carregar, editar e excluir apenas o cadastro ligado ao usuário da sessão.
- Configure SESSION_SECRET no .env.

## Favoritos de bazares
A estrutura original do banco possuía `favorito` apenas para brechós. Para o coração funcionar também nos cards de bazar, execute uma vez no SQL Editor do Supabase o arquivo `supabase/favorito_bazar.sql`.

Os favoritos agora são persistidos por usuário. O compartilhamento usa o compartilhamento nativo do navegador/celular quando disponível e, no desktop, copia o link do card.

Os filtros de Estilo e Categoria aceitam múltiplas opções simultaneamente. "Todos/Todas" limpa as seleções daquele grupo.
