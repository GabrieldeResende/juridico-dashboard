# Juridico Dashboard

Painel interno desenvolvido para um escritório de advocacia, com o objetivo de visualizar e gerenciar dados de agendamentos jurídicos a partir de uma base de dados em JSON.

A aplicação é composta por duas camadas:
- **Back-end:** servidor Node.js/Express que fornece dados via API REST a partir de um JSON local.
- **Front-end:** aplicação React criada com Vite que consome a API para exibir métricas, gráficos e tabela interativa.

---

## 1. Instalação e execução do back-end

### Requisitos
- Node.js 18+ instalado

### Passos
1. Abra o terminal na pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

O servidor será executado em `http://localhost:3000` por padrão e expõe as rotas da API que alimentam o front-end.

> Para desenvolvimento com recarga automática, use `npm run dev`.

---

## 2. Instalação e execução do front-end

### Requisitos
- Node.js 18+ instalado

### Passos
1. Abra o terminal na pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação ficará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

> Certifique-se de que o back-end esteja rodando antes de usar o front-end para que as chamadas de API funcionem corretamente.

---

## 3. Dependências utilizadas e justificativa

### Back-end
- `express` — framework leve para criar a API REST.
- `cors` — permite que o front-end faça requisições ao back-end em domínios diferentes durante o desenvolvimento.
- `nodemon` (devDependency) — recarrega automaticamente o servidor ao detectar mudanças no código.

### Front-end
- `react` — biblioteca principal para construção da interface.
- `react-dom` — renderiza o React no DOM.
- `vite` — bundler rápido e moderno para desenvolvimento e build.
- `@vitejs/plugin-react` — integra React ao Vite.
- `axios` — cliente HTTP usado para consumir a API do back-end.
- `recharts` — biblioteca de gráficos para exibir métricas visuais.
- `jspdf` + `jspdf-autotable` — geram exportação em PDF com tabelas formatadas.
- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` — garantem qualidade de código e boas práticas no front-end.

---

## 4. Decisões técnicas tomadas

- **Separação front-end/back-end:** facilita desenvolvimento e manutenção, além de permitir evolução independente de cada camada.
- **JSON estático como fonte de dados:** simplifica a prova de conceito e evita overhead de banco de dados para o escopo atual.
- **React + Vite:** escolha orientada por performance de build e experiência de desenvolvimento fluida.
- **API REST simples:** fornece dados para o cliente de forma clara e segue padrões comuns para aplicações web.
- **Exportação no cliente:** CSV e PDF são gerados no front-end para manter o back-end leve e reduzir complexidade.