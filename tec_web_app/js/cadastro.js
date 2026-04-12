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
//   Validação
// ===========================

function mostrarErro(id, mensagem) {
  document.getElementById(id).textContent = mensagem;
}

function limparErros() {
  document.querySelectorAll('.erro').forEach(el => el.textContent = '');
}

function validarFormulario(titulo, genero, nota) {
  let valido = true;

  if (!titulo.trim()) {
    mostrarErro('erro-titulo', 'O título é obrigatório.');
    valido = false;
  }

  if (!genero) {
    mostrarErro('erro-genero', 'Selecione um gênero.');
    valido = false;
  }

  const notaNum = Number(nota);
  if (!nota || isNaN(notaNum) || notaNum < 1 || notaNum > 10) {
    mostrarErro('erro-nota', 'Informe uma nota entre 1 e 10.');
    valido = false;
  }

  return valido;
}

// ===========================
//   Evento de submit
// ===========================

const form = document.getElementById('form-filme');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

form.addEventListener('submit', function (evento) {
  evento.preventDefault();
  limparErros();
  mensagemSucesso.hidden = true;

  const titulo   = document.getElementById('titulo').value;
  const genero   = document.getElementById('genero').value;
  const nota     = document.getElementById('nota').value;
  const descricao = document.getElementById('descricao').value;

  if (!validarFormulario(titulo, genero, nota)) return;

  const novoFilme = {
    id: Date.now(),
    titulo: titulo.trim(),
    genero,
    nota: Number(nota),
    descricao: descricao.trim(),
  };

  const filmes = getFilmes();
  filmes.push(novoFilme);
  salvarFilmes(filmes);

  form.reset();
  mensagemSucesso.hidden = false;
});

// ===========================
//   Limpa erro ao digitar
// ===========================

document.getElementById('titulo').addEventListener('input', () => mostrarErro('erro-titulo', ''));
document.getElementById('genero').addEventListener('change', () => mostrarErro('erro-genero', ''));
document.getElementById('nota').addEventListener('input', () => mostrarErro('erro-nota', ''));