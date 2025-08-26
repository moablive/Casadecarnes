# 🥩 Dashboard Casa de Carnes

![Versão 1.0.0](https://img.shields.io/badge/version-1.0.0-blue)
![Licença ISC](https://img.shields.io/badge/license-ISC-green)

## 📖 Sobre o Projeto

O **Dashboard Casa de Carnes** é uma aplicação web interativa projetada para otimizar o gerenciamento de um açougue. A plataforma permite o cadastro e controle de vendedores e produtos, além de oferecer um sistema robusto para o gerenciamento de pagamentos.

O projeto é construído com uma arquitetura moderna, utilizando um back-end poderoso com **Express.js** e um front-end dinâmico e reativo com **Vue.js**, conectados a um banco de dados **MariaDB**.

## ✨ Funcionalidades

- **Gerenciamento de Vendedores:** Cadastro, edição e exclusão de vendedores.
- **Catálogo de Produtos:** Adicione, atualize e remova produtos do inventário facilmente.
- **Controle de Pagamentos:** Monitore transações e gerencie o status dos pagamentos.
- **Autenticação Segura:** Sistema de login baseado em JWT (JSON Web Token) com diferentes níveis de acesso (usuário e administrador).
- **Dashboard Intuitivo:** Interface amigável para visualização de dados e gerenciamento das operações.

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=vue,express,mysql,nodejs,git" />
  </a>
</p>

## 🚀 Instalação e Uso

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### **Pré-requisitos**

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Um cliente de banco de dados compatível com MariaDB/MySQL (como DBeaver, HeidiSQL, etc.)

### **1. Back-end (API Express)**

1. **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/expresscasadecarne.git](https://github.com/seu-usuario/expresscasadecarne.git)
    ```

2. **Navegue até o diretório do back-end e instale as dependências:**

    ```bash
    cd expresscasadecarne
    npm install
    ```

3. **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione as credenciais do banco de dados:

    ```env
    DB_HOST=xxxxxxxxx
    DB_USER=xxxxxxxxx
    DB_PASSWORD=xxxxxxxxx
    DB_DATABASE=xxxxxxxxx
    DB_PORT=xxxxxxxxx
    PORT=xxxxxxxxx
    JWT_SECRET="xxxxxxxxx
    ```

4. **Execute a aplicação:**

    ```bash
    npm start
    ```

    O servidor será iniciado na porta definida (por exemplo, `http://localhost:3000`).

### **2. Configuração do Banco de Dados**

O script abaixo pode ser usado para criar a estrutura inicial do banco de dados **MariaDB**.

```sql
```

1. Front-end <img src="https://skillicons.dev/icons?i=vue,vite" /> <br>

Navegue até o diretório do front-end e instale as dependências:

```Bash
cd ../pasta-do-frontend
```

```Bash
npm install
```

A aplicação front-end estará disponível em http://localhost:xxxxx
```Bash
npm run dev
```


📄 Licença
Este projeto está licenciado sob a Licença ISC. Consulte o arquivo LICENSE para mais detalhes.
