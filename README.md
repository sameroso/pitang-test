
# 👛 Conversor de moedas

## Introdução

Este teste foi desenvolvido para a empresa Pitang e consiste em um conversor de moedas, permitindo a conversão de diversas moedas para o Real (BRL).

### Instruções para Execução do Projeto

1. **Clonar o repositório:**

```bash
git clone <https://github.com/sameroso/pitang-test.git>
cd pitang-test
```

2. **Instalar dependências:**:

```bash
npm install
```

3. **Iniciar aplicação**:

```bash
npm run dev:db
```

5. **Executar os testes:**:
```bash
npm test
```

5. **Executar os testes com coverage:**:
```bash
npm test --coverage
```


# 💻 Overview da Aplicação

A aplicação permite que o usuário crie uma conta e faça login, visualize uma tabela de conversão de moedas e edite as preferências e seus dados cadastrados ao criar a conta

### Funcionalidades

Foram desenvolvidos para o projeto propost o seguinte funcionalidades:

- Login
- Logout
- Sign In
- Editar usuário
- Editar preferências
- Tabela de Conversão de Moedas com botões para organizar os valores em ascendente e descendente com paginação


# ⚙️ Padrões do Projeto

Impor padrões de projeto é crucial para manter a qualidade, consistência e escalabilidade do código em uma aplicação React. Ao estabelecer e seguir um conjunto de boas práticas, os desenvolvedores podem garantir que a base de código permaneça limpa, organizada e de fácil manutenção. Foram utilizadas as seguintes ferramentas para os padrões do projeto:
#### ESLint

ESLint é uma ferramenta valiosa de linting para JavaScript, ajudando desenvolvedores a manter a qualidade do código e a aderir aos padrões de codificação. Configurando regras no arquivo .`.eslintrc.json`, o ESLint ajuda a identificar e prevenir erros comuns, garantindo a correção do código e promovendo a consistência em toda a base de código. Essa abordagem não só ajuda a detectar erros precocemente, como também impõe uniformidade nas práticas de codificação, melhorando assim a qualidade geral e a legibilidade do código.


#### Prettier

Prettier é uma ferramenta útil para manter a formatação de código consistente em seu projeto. Ao ativar o recurso de "formatar ao salvar" no seu IDE, o código é automaticamente formatado de acordo com as regras definidas no arquivo de configuração `.prettierrc`. Essa prática garante um estilo de código uniforme em toda a base de código e fornece um feedback útil sobre possíveis problemas no código. Se a formatação automática falhar, isso pode indicar um erro de sintaxe. Além disso, o Prettier pode ser integrado ao ESLint para lidar com as tarefas de formatação de código, enquanto aplica eficazmente os padrões de codificação ao longo do processo de desenvolvimento.


#### TypeScript

ESLint é eficaz para detectar bugs relacionados à linguagem em JavaScript. No entanto, devido à natureza dinâmica do JavaScript, o ESLint pode não capturar todos os problemas, especialmente em projetos complexos.


#### Imports Absolutos

As importações absolutas devem sempre ser configuradas e utilizadas, pois facilitam a movimentação de arquivos e evitam caminhos de importação confusos, como ../../../component. Independentemente de onde você mover o arquivo, todas as importações permanecerão intactas. As configurações foram definidas apenas na raiz do projeto.

Configurações do arquivo `tsconfig.json`:

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
```

#### Convenção de nomes de arquivos

No meu projeto, optei por usar o kebab case para nomear arquivos e pastas por várias razões importantes:

##### Legibilidade: 
O kebab case, onde as palavras são separadas por hífens (ex.: `meu-componente.js`), melhora a legibilidade, especialmente em URLs ou caminhos de arquivos. O hífen separa claramente cada palavra, facilitando a leitura e compreensão de forma rápida.

##### Consistência: 
Usar kebab case garante uniformidade em todo o projeto. Manter uma convenção de nomenclatura consistente torna mais simples para os desenvolvedores navegarem e colaborarem no código.

##### Compatibilidade com Sistemas de Arquivos: 
Muitos sistemas de arquivos, incluindo aqueles em ambientes Unix-like, lidam bem com kebab case. Além disso, ele é amigável para URLs, já que os hífens são aceitos normalmente em caminhos da web, ao contrário de underscores ou espaços, que podem exigir codificação especial.


# 🗄️ Estrutura do Projeto

Para facilitar a escalabilidade e a manutenção o projeto foi organizado embasado fortemente na estrutura de features. Cada pasta de recurso deve conter código específico para aquela funcionalidade, mantendo as coisas bem separadas. Essa abordagem ajuda a evitar a mistura de código relacionado a funcionalidades com componentes compartilhados, tornando mais simples gerenciar e manter a base de código em comparação a ter muitos arquivos em uma estrutura de pasta plana. Ao adotar esse método, você pode melhorar a colaboração, a legibilidade e a escalabilidade na arquitetura da aplicação.

a aplicação tem a seguinte estrutura:

```sh
src
|
+-- app               # Estrutra do app do nextjs:
|
+-- components        # Componentes Usados em toda a apliação
|   |               
|   +-- ui            # Componentes gerados pelo ShadcnUI
|        
+-- features          # features baseadas em módulos
|   +-- api           # requisições para apis externas da feature.
|   +-- components    # componentes específicos da feature.
|
+-- hooks             # hooks compartilhados por toda a aplicação
|
+-- lib               # Bilbliotecas reutilizáveis configurada para a aplicação
|
+-- testing           # utilittários para testes e mocks
|
+-- dtos              # Data transfer objects da aplicação
|
+-- services          # camada de serviço usada para confgurar requisições http dos módulos
|
+-- http              # configurações das apis
|
+-- layouts           # layouts reutilizáveis do projeto 
|
+-- style             # funcionalidades reutizáveis para estilização da aplicação
|
+-- providers         # Providers reutilizáveis da aplicação  
```

para restringir cross-feature imports foi criada uma regra no ESLint:

```js
"rules": {
    "import/no-restricted-paths": [
      "error",
      {
        "zones": [
          {
            "target": "./features/auth",
            "from": "./features",
            "except": ["./auth"]
          },
          {
            "target": "./features/currency",
            "from": "./features",
            "except": ["./currency"]
          },
          {
            "target": "./features/preferences",
            "from": "./features",
            "except": ["./preferences"]
          },
          {
            "target": "./features",
            "from": "./app"
          },
          {
            "target": "./components/ui",
            "from": ["./features", "./app", "./dtos"]
          },
          {
            "target": "./components/ui",
            "from": "./components",
            "except": ["./ui"]
          },
          {
            "target": [
              "./src/components",
              "./src/hooks",
              "./src/lib",
              "./src/types",
              "./src/utils"
            ],
            "from": ["./src/features", "./src/app"]
          }
        ]
      }
    ]
  }
```


# 🧪 Testes
Os testes foram desenvolvidos com <b>Jest</b> e <b>React Testing Library</b>, sendo organizados próximos aos arquivos correspondentes. Essa abordagem não apenas facilita a localização dos testes, mas também melhora a organização do projeto, permitindo que os desenvolvedores compreendam rapidamente a relação entre o código e seus testes. Dessa forma, garantimos uma maior eficiência no processo de desenvolvimento e manutenção do código.

Exemplo da estrutura dos testes:

```sh
src        
+-- features          
|   +-- api           
|    |   +-- user.ts
|    |   +-- user.spec.ts           
|   +-- components 
|    |   +-- user-form.ts
|    |   +-- user-form.spec.ts
|
```


# 🗃️ Gerenciamento de Estado

Gerenciar o estado de forma eficaz é crucial para otimizar o desempenho da sua aplicação. Em vez de armazenar todas as informações de estado em um único repositório centralizado, considere dividi-las em várias categorias com base em seu uso. Ao categorizar seu estado, você pode simplificar o processo de gerenciamento de estado e melhorar a eficiência geral da sua aplicação.


## Estado Global da Aplicação e Estados do Servidor

Para o estado global da aplicação foi utilizado o Redux Toolik com RTK query para gerenciar estados vindos do servidor.

foi utilizado um mecanismo de Dependency Injection pelo Redux onde os Services são Injetados pelo StoreProvider e passados para os Handlers

````javascript
// lib/redux/store-provider.ts
export interface StoreProviderProps {
  extraArgument: ExtraArgument;
  children: ReactNode;
}
export default function StoreProvider({
  children,
  extraArgument,
}: StoreProviderProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore(extraArgument); // injeção dos services
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}


// providers/app-store-provider.tsx
export default function AppStoreProvider({ children }: PropsWithChildren) {
  return (
    <StoreProvider
      extraArgument={{
        authService: authService,
        currencyService: currencyService,
      }}
    >
      {children}
    </StoreProvider>
  );
}

````


## Estados de Formulário
Para os estados do formulário foi utilizado <b>React Hook Form</b> para controle de estados e <b>zod</b> para validação dos formulários.




# 🧱 Componentes e Estilização

## Bibliotecas de Componentes

Foi utilizado <b>ShadCN UI</b> para o projeto por ser uma biblioteca de componentes headless que é  altamente customizável e que gera componentes sob demanda.

- [ShadCN UI](https://ui.shadcn.com/)


## Solução para estilização

Como estratégia de estilização foi utilizado <b>Tailwind</b> por ser uma solução leve flexível e possuir um ecossistema amplo em volta da solução  

# 🔐 Autenticação e Banco de Dados

## Autentição e Preferências

Para a autenticação e preferências do usuário, optei por utilizar <b>cookies</b>, pois eles armazenam apenas um conjunto pequeno e leve de dados. Essa abordagem permite que as informações sejam facilmente acessadas tanto pelo lado do cliente quanto pelo lado do servidor, garantindo eficiência e agilidade no gerenciamento da sessão do usuário

## Banco de Dados

Como banco de dados foi utilizado o <b>json-server</b> para finalidade de teste sendo os dados tratados pelo route handlers do do <b>NextJs</b> atuando como um <b>BFF</b> entre o banco e o frontend. 
