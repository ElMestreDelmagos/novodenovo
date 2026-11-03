# NovoDeNovo — FrontEnd

Projeto estático do NovoDeNovo, organizado com uma estrutura inspirada na separação de arquivos de projetos Next.js, mas **sem React, sem React Native e sem backend**.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro (Vanilla JS)
- Google Fonts

## Estrutura

```text
NovoDeNovo/
├── app/
│   └── index.html
├── components/
├── css/
│   ├── style.css
│   ├── navbar.css
│   ├── home.css
│   ├── brechos.css
│   ├── eventos.css
│   ├── impacto.css
│   └── responsivo.css
├── js/
│   ├── app.js
│   ├── carousel.js
│   └── filters.js
├── data/
│   └── mockData.js
├── assets/
│   ├── img/
│   ├── icons/
│   └── logo/
├── .env.example
└── .gitignore
```

## Como executar

Como é HTML/CSS/JS puro, não é necessário instalar Node.js.

Abra:

`app/index.html`

no navegador.

Também pode usar a extensão Live Server do VS Code para desenvolvimento.

## Observação

A pasta `app` representa a área de página principal, seguindo a ideia de organização do Next.js. A pasta `components` está reservada para componentes reutilizáveis caso o projeto seja migrado futuramente para um framework.

O projeto atual não usa React/React Native.

---

# Documentação técnica do NovoDeNovo

## 1. Objetivo do projeto

O **NovoDeNovo** é uma plataforma voltada à moda circular. A proposta é facilitar a descoberta de brechós, bazares e eventos, além de apoiar a divulgação de estabelecimentos e a organização de eventos favoritos/na agenda. A interface foi construída com HTML, CSS e JavaScript, e o projeto também contém uma estrutura de backend Node.js/Express integrada ao Supabase.

## 2. O que foi acrescentado nesta versão

- **Comentários explicativos no código:** foram adicionados comentários em HTML para identificar as principais áreas das páginas, em CSS para indicar a finalidade das folhas e regras visuais, e em JavaScript/PHP para explicar a responsabilidade dos módulos e dos blocos funcionais.
- **Identificação das seções da página inicial:** os comentários ajudam a localizar o cabeçalho, a apresentação inicial, eventos, agenda, brechós, busca/filtros, mapa, impacto socioambiental e modais de participação/cadastro.
- **Identificação das áreas administrativas:** foram sinalizados os formulários de bazar e brechó, pré-visualizações, dados do usuário, favoritos e agenda.
- **Este README ampliado:** foi incluída uma visão geral da arquitetura, das pastas, do fluxo de funcionamento e das instruções de execução.

Os comentários foram adicionados como documentação, sem a intenção de remover funcionalidades ou substituir a lógica existente. Arquivos de configuração que exigem sintaxe estrita, como `package.json` e arquivos JSON, foram mantidos sem comentários para não invalidar seu formato.

## 3. Organização das pastas e arquivos

### Arquivos principais da raiz

| Arquivo | Finalidade |
|---|---|
| `server.js` | Inicializa o servidor Express, configura CORS, leitura de dados enviados, sessão, rotas da API, arquivos estáticos, rota inicial e tratamento de erros. |
| `package.json` | Define metadados do projeto, dependências Node.js e comandos `start` e `dev`. |
| `package-lock.json` | Registra as versões resolvidas das dependências para instalações reproduzíveis. |
| `.env` | Guarda variáveis de ambiente locais, como porta, URL/chaves de serviços e segredo de sessão. Não deve ser publicado nem compartilhado com credenciais reais. |
| `.gitignore` | Define arquivos e pastas que não devem ser enviados ao controle de versão. |
| `README-BACKEND.md` | Documentação complementar dedicada à parte de backend. |

### `app/` — páginas HTML

| Arquivo | Finalidade |
|---|---|
| `app/index.html` | Página principal: navegação, apresentação do projeto, eventos, agenda, brechós, pesquisa e filtros, mapa, impacto socioambiental e modais de participação/cadastro. |
| `app/area-bazar.html` | Interface para cadastrar ou atualizar informações de um bazar e visualizar uma prévia dos dados. |
| `app/area-brecho.html` | Interface para cadastrar ou atualizar informações de um brechó e visualizar uma prévia do perfil. |
| `app/area-usuario.html` | Área pessoal para dados da conta, favoritos e eventos guardados na agenda. |

Os comentários inseridos junto aos elementos HTML indicam onde cada bloco de conteúdo começa. Os atributos `id` e `class` continuam sendo usados pelo CSS e pelo JavaScript para localizar e estilizar os elementos.

### `css/` — aparência e responsividade

| Arquivo | Finalidade |
|---|---|
| `css/style.css` | Regras globais: tipografia, cores, espaçamentos, botões, cartões e classes compartilhadas. |
| `css/navbar.css` | Cabeçalho, links de navegação e controles do menu. |
| `css/home.css` | Aparência da seção inicial e seus elementos de destaque. |
| `css/brechos.css` | Cartões e apresentação dos brechós. |
| `css/eventos.css` | Componentes visuais dos eventos e da agenda. |
| `css/impacto.css` | Seção de impacto e indicadores socioambientais. |
| `css/responsivo.css` | Ajustes para diferentes tamanhos de tela, inclusive dispositivos móveis. |
| `css/areas.css` | Estilos das páginas de gestão e área pessoal. |

### `js/` — funcionalidades no navegador

| Arquivo | Finalidade |
|---|---|
| `js/app.js` | Comportamentos gerais da página inicial e componentes interativos. |
| `js/api.js` | Funções de comunicação com endpoints do backend. |
| `js/auth.js` | Comportamentos ligados à autenticação e à sessão do usuário. |
| `js/cadastro.js` | Fluxos de cadastro e validações de formulários. |
| `js/areas.js` | Funcionalidades compartilhadas pelas áreas de gestão. |
| `js/usuario-area.js` | Recursos da área pessoal do usuário. |
| `js/calendar.js` | Renderização e interação com o calendário/agenda. |
| `js/cardActions.js` | Ações disponíveis nos cartões, como favoritos e inclusão na agenda, conforme implementado no módulo. |
| `js/carousel.js` | Comportamento dos carrosséis. |
| `js/dynamicData.js` | Preparação e carregamento de dados dinâmicos para a interface. |
| `js/filters.js` | Pesquisa, filtros e ordenação de resultados. |
| `data/mockData.js` | Dados de demonstração utilizados em fluxos que recorrem a dados simulados. |

### `api/` — endpoints PHP auxiliares

| Arquivo | Finalidade |
|---|---|
| `api/brechos/listar.php` | Endpoint HTTP que consulta registros de brechós no Supabase e devolve uma resposta JSON, tratando métodos não permitidos e falhas de comunicação. |
| `api/config/supabase.php` | Centraliza a leitura/configuração necessária para a conexão com o Supabase usada pelos endpoints PHP. |

Esta pasta é uma integração auxiliar separada do servidor Node.js. Verifique qual endpoint o frontend está chamando antes de alterar a configuração de um dos backends.

### `src/` — backend Node.js

| Arquivo/pasta | Finalidade |
|---|---|
| `src/config/supabase.js` | Cria/configura o cliente Supabase utilizado pelos serviços Node.js. |
| `src/routes/` | Define os caminhos HTTP e associa cada rota ao controlador correspondente. |
| `src/controllers/` | Recebe requisições, chama serviços e monta respostas HTTP. |
| `src/services/` | Implementa regras de negócio e operações de consulta/alteração dos dados. |
| `src/middlewares/errorHandler.js` | Centraliza o tratamento de erros ocorridos durante as requisições. |
| `src/utils/validacao.js` | Reúne funções auxiliares de validação de dados. |

Os módulos de `routes` encaminham as requisições para `controllers`; estes delegam as operações aos `services`, que acessam o Supabase quando necessário. Essa separação facilita manutenção e testes.

### Outras pastas

- `img/`: imagens e recursos visuais, incluindo a logo.
- `components/`: documentação ou recursos relacionados a componentes reutilizáveis.
- `.vscode/`: preferências locais do editor; não é necessária para a lógica principal do site.
- `node_modules/`: bibliotecas instaladas pelo npm. Normalmente pode ser recriada a partir de `package.json` e `package-lock.json` usando `npm install`; foi mantida no pacote recebido.

## 4. Como a página principal é organizada

1. **Cabeçalho e navegação:** marca NovoDeNovo, links de navegação e ações de acesso/participação.
2. **Apresentação inicial:** introduz a proposta da plataforma e destaca conteúdo visual.
3. **Eventos:** exibe a área de eventos e bazares divulgados.
4. **Agenda:** apresenta o calendário e os eventos adicionados à agenda.
5. **Brechós:** mostra estabelecimentos em destaque.
6. **Descoberta, busca e filtros:** permite explorar os resultados por critérios disponíveis na interface.
7. **Mapa:** reserva a área visual para localização dos estabelecimentos, de acordo com a integração configurada.
8. **Impacto:** explica ou apresenta o impacto socioambiental associado à moda circular.
9. **Participação e cadastro:** modais/formulários para iniciar os fluxos de participação na plataforma.

Nas páginas de área, o conteúdo muda para formulários de cadastro/edição e painéis de pré-visualização. Na área do usuário, há blocos específicos para dados pessoais, favoritos e agenda.

## 5. Como executar localmente

1. Instale uma versão compatível do **Node.js** e do npm.
2. Abra o terminal na pasta que contém o `package.json`.
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Confira o arquivo `.env` local. Preencha as variáveis necessárias de acordo com sua configuração, sem publicar chaves privadas. A aplicação utiliza variáveis de ambiente para configurações como porta, Supabase, CORS e sessão; os nomes efetivamente lidos devem ser conferidos no código.
5. Inicie o servidor:

   ```bash
   npm start
   ```

   Para desenvolvimento com reinicialização automática:

   ```bash
   npm run dev
   ```

6. Acesse `http://localhost:3000` se a variável `PORT` estiver configurada como `3000`. Caso use outra porta, ajuste o endereço.

O servidor também expõe uma rota de verificação em `/api/health`. A resposta confirma que o servidor está ativo, mas não garante, sozinha, que as credenciais ou todas as tabelas do Supabase estejam corretas.

## 6. Integração com o Supabase

O projeto contém configurações do Supabase tanto para o backend Node.js quanto para endpoints PHP. Confira as variáveis esperadas em `src/config/supabase.js`, `api/config/supabase.php` e nos serviços correspondentes. A URL e a chave precisam pertencer ao projeto correto, e as tabelas/colunas consultadas devem existir no banco.

Nunca coloque uma chave `service_role`, senha ou segredo de sessão em arquivos públicos do frontend. Se uma credencial real tiver sido compartilhada por engano, revogue-a e gere outra.

## 7. Sobre os comentários

Os comentários servem para orientar a leitura e a manutenção do projeto. Eles não substituem a documentação da API nem garantem, por si só, que uma funcionalidade esteja operacional. Antes de publicar alterações, teste as páginas, formulários, rotas e consultas ao banco no ambiente configurado.

**Importante:** os comentários de CSS e JavaScript são explicativos e não devem ser confundidos com alterações na regra visual ou na lógica funcional. Arquivos JSON foram mantidos válidos, pois o formato JSON não aceita comentários.

