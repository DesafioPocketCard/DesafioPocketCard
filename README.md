# Desafio Pocket Card

Aplicação web construída com **Next.js 14 (App Router)**, **TypeScript** e **MUI** para o desafio Pocket Card.

---

## 1. Requisitos de ambiente

Antes de rodar o projeto, instale:

- **Node.js**: versão **18 LTS ou superior**
- **Gerenciador de pacotes**: `npm`, `yarn` ou `pnpm` (os exemplos abaixo usam `npm`)
- **Git** (opcional, mas recomendado)

Verifique as versões instaladas:

```bash
node -v
npm -v
```

---

## 2. Configuração do projeto

### 2.1. Instalação das dependências

Na raiz do projeto (`DesafioPocketCard`):

```bash
npm install
```

### 2.2. Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto e configure as variáveis necessárias para a API e autenticação.

Exemplo de configuração mínima:

```bash
# URL base da API utilizada pelo Axios (src/config/api.ts)
NEXT_PUBLIC_API_URL=https://sua-api.com

# Chave utilizada para obter o token de autenticação (src/config/auth.ts e src/services/useAuth.ts)
API_KEY=sua-chave-da-api

# Configurações padrão do NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=uma-chave-secreta-forte
```

> Ajuste os valores de acordo com o ambiente (desenvolvimento, homologação, produção).

### 2.3. Rodando o projeto em desenvolvimento

```bash
npm run dev
```

O projeto ficará disponível em `http://localhost:3000`.

### 2.4. Outros scripts úteis

- **Build de produção**

  ```bash
  npm run build
  ```

- **Rodar em produção (após build)**

  ```bash
  npm start
  ```

- **Lint** (ESLint + config Next.js/Airbnb)

  ```bash
  npm run lint
  ```

- **Checar formatação (Prettier)**

  ```bash
  npm run format
  ```

- **Ajustar formatação automaticamente**

  ```bash
  npm run format:fix
  ```

---

## 3. Arquitetura e estrutura de pastas

A estrutura principal do projeto é:

```text
src/
  app/                  # Rotas (Next.js App Router)
    (auth)/             # Rotas autenticadas
    (unauth)/           # Rotas públicas (login, recuperação de senha, etc.)
    api/                # Rotas de API do Next
    layout.tsx          # Root layout da aplicação
    error.tsx           # Página de erro global
    loading.tsx         # Skeleton/spinner global
    not-found.tsx       # Página 404 padrão

  components/           # Componentes reutilizáveis de UI
    Buttons/
    Cards/
    Containers/
    FormFields/
    Layout/
    Table/
    Tags/
    UI/

  config/               # Configurações globais (API, auth, tema, etc.)
  contexts/             # Providers e React Contexts (tema, loading, notifier, query, sessão)
  global/               # Estilos/ animações globais
  helpers/              # Helpers de UI (Loading, Notifier, etc.)
  hooks/                # Hooks customizados
  services/             # Acesso à API (axios + regras de domínio)
  store/                # Store global (Zustand)
  types/                # Tipagens globais e declarações
  utils/                # Funções utilitárias (tema, masks, validações, etc.)
```

### 3.1. Fluxo global da aplicação (RootLayout)

O arquivo `src/app/layout.tsx` é o entrypoint de layout da aplicação e monta a árvore de providers globais:

- **`SessionProvider`** – gerencia a sessão de usuário via **NextAuth**.
- **`QueryClientProvider`** – provê o cliente do **@tanstack/react-query**.
- **`AppRouterCacheProvider`** – integração do **MUI** com o App Router do Next 14.
- **`DynamicThemeProvider`** – aplica tema dinâmico (tenants) usando as configs de `src/config/theme`.
- **`ThemeInitializer`** – sincroniza as informações de tema entre servidor e cliente (cookies).
- **`LoadingProvider` + `Loading`** – controle e componente global de carregamento.
- **`NotifierProvider` + `Notifier`** – sistema global de notificações/toasts.

Esse layout envolve todos os children do App Router, garantindo que qualquer page tenha acesso à sessão, tema, loading, notificações e client de query.

### 3.2. Autenticação e middleware

- **`src/config/auth.ts`**: configura o **NextAuth** usando `CredentialsProvider`, consumindo a API via `src/config/api.ts`.
- **`src/config/api.ts`**: instancia um `axios` com `baseURL = process.env.NEXT_PUBLIC_API_URL`, adiciona o token da sessão automaticamente e trata expiracão de token.
- **`src/middleware.ts`**: protege as rotas, redirecionando usuários não autenticados para `/signin`, exceto para caminhos liberados (`/signin`, `/error`, `/recovery`).

### 3.3. Tema e MUI

- **`src/config/theme`**: concentra toda a configuração de tema (paleta, sombras, tipografia, breakpoints e overrides de componentes MUI).
- **`src/config/index.ts`**: exporta as `fonts` aplicadas na tag `<html>` em `RootLayout`.
- **`src/contexts/DynamicThemeProvider.tsx` + `src/components/ThemeInitializer.tsx`**: permitem trocar tema por tenant e manter essa escolha entre requisições.

### 3.4. Camada de serviços e store

- **`src/services/*.service.ts`**: encapsulam chamadas HTTP para recursos de domínio (campanhas, presentes, metas, regulamentos, perfil, recuperação de senha, etc.).
- **`src/store`**: utiliza **Zustand** (`useGift`, `useCategory`) para estado global leve relacionado a entidades da aplicação.

---

## 4. Estrutura de pages e layouts (Next.js App Router)

O projeto usa o App Router (pasta `app`) com **segmentos de grupo** para separar rotas autenticadas e públicas.

### 4.1. Root layout

Arquivo: `src/app/layout.tsx`

- Define o HTML base (`<html lang="pt-BR">`), aplica a fonte global e injeta todos os providers globais.
- Todas as rotas passam por esse layout.

### 4.2. Grupo `(auth)` – rotas autenticadas

Pasta: `src/app/(auth)`

- **`layout.tsx`**: envolve as rotas autenticadas com `PageWrapper` (de `src/components/Layout/Wrappers`).

  - Responsável por fornecer uma estrutura comum (como header, container de conteúdo, etc.) para páginas após o login.

- **`page.tsx`**: página principal autenticada (home logada).

  - Exemplo: usa `RadialWrapper` para compor a tela com um **HeaderComponent** (dados do usuário logado) e um **BodyComponent** (menu de ações como campanhas).

### 4.3. Grupo `(unauth)` – rotas públicas (login/recuperação)

Pasta: `src/app/(unauth)`

- **`signin/page.tsx`**: página de login.
  - Usa `RadialWrapper` com um cabeçalho contendo o logo (`Logo`) e corpo com o formulário `SiginForm`.
  - Estilos específicos em `signin/styles.ts`.

- **`recovery/layout.tsx`**: layout da área de recuperação de senha.
  - Define apenas metadados (title) e renderiza `children` diretamente.

- **`recovery/page.tsx`**: página de recuperação de senha.
  - Também utiliza `RadialWrapper` com um `HeaderComponent` de logo e `BodyComponent` com `RecoveryController` e mensagem de política.

### 4.4. Como criar uma nova page

1. **Escolha o grupo de rotas**:
   - Rotas públicas: crie a pasta dentro de `(unauth)`.
   - Rotas autenticadas: crie a pasta dentro de `(auth)`.

2. **Crie a pasta com o nome da rota**:

   Exemplo: rota `/campains` autenticada:

   ```text
   src/app/(auth)/campains/page.tsx
   ```

3. **Implemente o componente de página**:

   - Exportar por default um componente React.
   - Opcionalmente, exportar `metadata` com `title` e `description`.
   - Recomenda-se reutilizar wrappers existentes (`RadialWrapper`, `PageWrapper`, containers e cards do diretório `components`).

4. **Estilos opcionais**:

   - Crie um arquivo `styles.ts` na mesma pasta da page.
   - Utilize `styled` do MUI para criar containers com base no tema.

5. **(Se necessário) Layout específico da rota**:

   - Crie um `layout.tsx` na pasta da rota para envolver apenas esse grupo específico com um layout diferenciado.

---

## 5. Padrão de componentes com MUI

Os componentes seguem um padrão consistente baseado em **MUI**:

- Cada componente fica em uma pasta própria:

  ```text
  src/components/<Categoria>/<NomeDoComponente>/
    index.tsx   # Componente em si
    styles.ts   # (opcional) styled components baseados em MUI
    types.ts    # (opcional) Tipagens de props
  ```

- É comum que `types.ts` estenda as props originais do MUI para adicionar comportamentos específicos.

### 5.1. Exemplo: Button customizado

Arquivos principais:

- `src/components/Buttons/Button/types.ts` – define `IButtonProps` estendendo `ButtonProps` do MUI, com flags como `loading` e `loadingMessage`.
- `src/components/Buttons/Button/styles.ts` – cria o `StyledButton` e o indicador de loading com `styled` do MUI, utilizando o `theme.palette`.
- `src/components/Buttons/Button/index.tsx` – componente React que recebe as props, injeta estados de loading e renderiza o `StyledButton`.

Boas práticas ao criar novos componentes baseados no MUI:

1. **Extenda as props do MUI sempre que possível**
   - Ex.: `interface IMyButtonProps extends ButtonProps { ... }`.
   - Isso mantém compatibilidade com o ecossistema MUI.

2. **Centralize estilos em `styles.ts`**
   - Use `styled(Component)` de `@mui/material`.
   - Utilize tokens de tema (`theme.palette.primary[500]`, `theme.shadows`, `theme.breakpoints`, etc.) ao invés de cores fixas.

3. **Mantenha a lógica de renderização em `index.tsx`**
   - Evite misturar muita regra de negócio dentro dos componentes de UI.
   - Se necessário, crie hooks específicos em `src/hooks`.

4. **Exporte índices agregadores quando fizer sentido**
   - Ex.: `src/components/Buttons/index.ts` reexporta `Button`, `BackButton`, etc., facilitando imports como `import { Button } from "@/components/Buttons";`.

### 5.2. Exemplo: Header usando MUI

O `Header` (`src/components/Layout/Header`) mostra um padrão de composição:

- Usa componentes MUI (`AppBar`, `Avatar`, `IconButton`, `Box`).
- Cria `HeaderContainer` e `Profile` em `styles.ts` usando `styled` do MUI.
- Consome contexto de sessão (`useSession`) para exibir dados do usuário.
- Usa um diálogo genérico (`DialogMenu`) para o menu do usuário, reaproveitando componente de Container.

Você pode seguir a mesma abordagem para criar novos headers, toolbars ou barras laterais.

---

## 6. Como criar novas pages/layouts reutilizando componentes existentes

### 6.1. Reutilizando `RadialWrapper`

`RadialWrapper` (em `src/components/Containers/RadialWrapper`) é muito usado nas telas de autenticação e home, encaixando dois grandes blocos:

- `HeaderComponent`: topo da tela (logo, dados do usuário, título da página, etc.).
- `BodyComponent`: conteúdo principal (formulários, textos, botões de ação, listas, etc.).

Para criar uma nova tela com esse padrão:

1. Importe `RadialWrapper` na nova page.
2. Crie componentes simples (ou styled components) para header e body.
3. Passe-os nas props `HeaderComponent` e `BodyComponent`.

### 6.2. Usando Layouts de grupo

- Para rotas autenticadas, mantenha o padrão dentro de `(auth)` para preservar a navegação comum (header principal, wrappers) via `PageWrapper`.
- Para rotas públicas, utilize `(unauth)` e crie layouts leves (como em `recovery/layout.tsx`) quando precisar de um tratamento diferente de metadados ou estrutura.

---

## 7. Convenções gerais

- **Nome de pastas e arquivos**
  - Components em `PascalCase` quando representam componentes React.
  - hooks em `camelCase` e prefixados com `use` (ex.: `useAuth`, `useDebounce`).
- **Tipagem**
  - Centralizar tipos compartilhados em `src/types`.
  - Criar `types.ts` local para props específicas de componentes.
- **Estilos**
  - Usar o tema do MUI sempre que possível ao invés de valores hardcoded.
  - Preferir componentes `styled` ao uso excessivo de `sx` inline quando o estilo é reaproveitado.

Com essas diretrizes você consegue configurar o ambiente, entender a arquitetura atual e expandir o projeto criando novas pages, layouts e componentes de forma consistente com o que já existe.
