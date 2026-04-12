# CineList — Projeto TECWEB

Aplicação web de filmes favoritos desenvolvida com HTML, CSS e JavaScript puro, sem frameworks. Os dados são persistidos no localStorage do navegador.

---

## Como rodar

**Pré-requisito:** Node.js instalado.

```bash
# 1. Acesse a pasta da aplicação
cd tec_web_app

# 2. Instale as dependências (apenas o Vite, usado como servidor local)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse no navegador: `http://localhost:5173`

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` ou `/index.html` | Página inicial com chamada para ação |
| `/cadastro.html` | Formulário para cadastrar um filme |
| `/listagem.html` | Listagem de filmes salvos com filtro e remoção |

---

## Arquitetura

```
tec_web_app/
├── index.html          # Página Início
├── cadastro.html       # Página Cadastro
├── listagem.html       # Página Listagem
├── css/
│   └── style.css       # Estilização global e responsiva
└── js/
    ├── cadastro.js     # Lógica do formulário e validação
    └── listagem.js     # Renderização, filtro e remoção de filmes
```

Não há backend. Todo o estado da aplicação vive no **localStorage** do navegador sob a chave `filmes`, como um array de objetos JSON:

```json
[
  {
    "id": 1712345678900,
    "titulo": "Interestelar",
    "genero": "Ficção Científica",
    "nota": 10,
    "descricao": "Uma jornada pelo espaço e pelo tempo."
  }
]
```

---

## Funcionalidades

- Navegação entre três páginas via menu fixo no topo
- Formulário com validação de campos obrigatórios (título, gênero e nota)
- Mensagens de erro por campo e feedback de sucesso ao cadastrar
- Listagem dinâmica em grid responsivo
- Filtro de filmes por gênero
- Remoção individual de filmes
- Dados persistidos no navegador — sobrevivem a refresh e fechamento de aba

---

## Inspecionar os dados pelo console

Abra o DevTools (`F12`) e no console do navegador:

```js
// Ver todos os filmes salvos
JSON.parse(localStorage.getItem('filmes'))

// Limpar todos os filmes
localStorage.removeItem('filmes')
```

---

## Divisão de tarefas

| Pessoa | Responsabilidade |
|---|---|
| P1 | Estrutura HTML das 3 páginas, menu de navegação e CSS global |
| P2 | Formulário de cadastro, validação e persistência no localStorage |
| P3 | Listagem dinâmica, filtro por gênero e remoção de filmes |

---

## Tecnologias

- HTML5 semântico (sem uso de `<div>`)
- CSS3 com custom properties e Grid/Flexbox
- JavaScript ES6+ vanilla
- localStorage para persistência de dados
- Vite como servidor de desenvolvimento
