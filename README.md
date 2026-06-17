# CineList — Projeto TECWEB

Aplicação web de filmes favoritos desenvolvida com React, React Router e integração com API REST via json-server.

---

## Como rodar

**Pré-requisito:** Node.js instalado.

```bash
# 1. Acesse a pasta do frontend
cd tec_web_app/frontend

# 2. Instale as dependências
npm install

# 3. Inicie o frontend e a API juntos
npm run dev
```

O comando `npm run dev` sobe os dois serviços simultaneamente:

| Serviço | URL |
|---|---|
| App React (Vite) | `http://localhost:5173` |
| API REST (json-server) | `http://localhost:3001` |

> Para rodar apenas a API: `npm run api`

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Página inicial com chamada para ação |
| `/cadastro` | Formulário para cadastrar um novo filme |
| `/listagem` | Listagem dos filmes cadastrados |

---

## Arquitetura

```
tec_web_app/
├── backend/
│   └── db.json             # Banco de dados da API (json-server)
│
└── frontend/
    ├── vite.config.js      # Proxy /api → http://localhost:3001
    ├── package.json
    └── src/
        ├── App.jsx         # Roteamento principal e layout
        ├── main.jsx        # Entry point React
        ├── css/
        │   └── style.css   # Estilização global e responsiva
        ├── context/
        │   └── FilmesContext.jsx  # Estado global + chamadas à API
        ├── pages/
        │   ├── Inicio.jsx
        │   ├── Cadastro.jsx
        │   └── Listagem.jsx
        └── components/
            └── FilmeCard.jsx
```

---

## API REST

Os dados são persistidos no arquivo `backend/db.json` via json-server. O Vite faz proxy das chamadas `/api/*` para `http://localhost:3001`.

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/filmes` | Lista todos os filmes |
| `POST` | `/api/filmes` | Cadastra um novo filme |
| `DELETE` | `/api/filmes/:id` | Remove um filme |

Estrutura de um filme:

```json
{
  "id": 1,
  "titulo": "Matrix",
  "genero": "Ficção Científica",
  "nota": 9,
  "descricao": "Um programador descobre que a realidade é uma simulação."
}
```

---

## Funcionalidades

- Navegação entre três páginas com React Router e menu ativo
- Formulário controlado com validação de campos obrigatórios (título, gênero e nota)
- Mensagens de erro por campo e feedback de sucesso ao cadastrar
- Listagem dinâmica em grid responsivo
- Remoção individual de filmes
- Estado compartilhado entre páginas via Context API
- Dados persistidos na API — sobrevivem a refresh e fechamento de aba

---

## Divisão de tarefas

| Pessoa | Responsabilidade |
|---|---|
| P1 | Estrutura do projeto React, App.jsx, roteamento e CSS global |
| P2 | Formulário de cadastro (Cadastro.jsx), validação e FilmeCard |
| P3 | Listagem dinâmica (Listagem.jsx), Context API e integração com a API REST |

---

## Tecnologias

- React 18 com hooks (useState, useEffect, useContext)
- React Router v6 (BrowserRouter, NavLink, Routes)
- Context API para gerenciamento de estado global
- json-server para API REST local
- Vite como bundler e servidor de desenvolvimento
- CSS3 com custom properties, Grid e Flexbox


## Integrantes

- Diego Furtado Amorim
- Isadora Batista Alves
- Roberto Campelo Uchôa