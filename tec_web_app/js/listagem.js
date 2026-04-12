// ===========================
//   Utilitários de localStorage
// ===========================

function getFilmes() {
  return JSON.parse(localStorage.getItem('filmes')) || [];
}

function salvarFilmes(filmes) {
  localStorage.setItem('filmes', JSON.stringify(filmes));
}

// ===========================
//   Renderização
// ===========================

function renderizarFilmes(filmes) {
  const lista = document.getElementById('lista-filmes');
  const mensagemVazia = document.getElementById('mensagem-vazia');

  lista.innerHTML = '';

  if (filmes.length === 0) {
    mensagemVazia.hidden = false;
    return;
  }

  mensagemVazia.hidden = true;

  filmes.forEach(function (filme) {
    const item = document.createElement('li');
    item.className = 'card-filme';
    item.innerHTML = `
      <article>
        <header>
          <h3>${filme.titulo}</h3>
          <span class="badge-genero">${filme.genero}</span>
        </header>
        <p class="nota">Nota: <strong>${filme.nota}/10</strong></p>
        ${filme.descricao ? `<p class="descricao">${filme.descricao}</p>` : ''}
        <footer>
          <button class="btn-remover" data-id="${filme.id}">Remover</button>
        </footer>
      </article>
    `;
    lista.appendChild(item);
  });

  document.querySelectorAll('.btn-remover').forEach(function (btn) {
    btn.addEventListener('click', function () {
      removerFilme(Number(btn.dataset.id));
    });
  });
}

// ===========================
//   Remover filme
// ===========================

function removerFilme(id) {
  const filmes = getFilmes().filter(function (f) { return f.id !== id; });
  salvarFilmes(filmes);
  aplicarFiltro();
}

// ===========================
//   Filtro por gênero
// ===========================

function aplicarFiltro() {
  const generoSelecionado = document.getElementById('filtro-genero').value;
  const filmes = getFilmes();

  if (!generoSelecionado) {
    renderizarFilmes(filmes);
  } else {
    renderizarFilmes(filmes.filter(function (f) { return f.genero === generoSelecionado; }));
  }
}

// ===========================
//   Inicialização
// ===========================

document.getElementById('filtro-genero').addEventListener('change', aplicarFiltro);

aplicarFiltro();
