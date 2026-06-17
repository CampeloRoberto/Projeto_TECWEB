import { useState } from 'react'
import { useFilmes } from '../context/FilmesContext'

const GENEROS = ['Ação', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Animação', 'Documentário', 'Outro']

export default function Cadastro() {
  const { adicionarFilme } = useFilmes()

  const [titulo, setTitulo] = useState('')
  const [genero, setGenero] = useState('')
  const [nota, setNota] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erros, setErros] = useState({})
  const [sucesso, setSucesso] = useState(false)
  const [erroApi, setErroApi] = useState('')

  function validar() {
    const novosErros = {}
    if (!titulo.trim()) novosErros.titulo = 'O título é obrigatório.'
    if (!genero) novosErros.genero = 'Selecione um gênero.'
    if (!nota || nota < 1 || nota > 10) novosErros.nota = 'A nota deve ser entre 1 e 10.'
    return novosErros
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }
    try {
      await adicionarFilme({ titulo, genero, nota: Number(nota), descricao })
      setTitulo('')
      setGenero('')
      setNota('')
      setDescricao('')
      setErros({})
      setErroApi('')
      setSucesso(true)
      setTimeout(() => setSucesso(false), 3000)
    } catch {
      setErroApi('Erro ao cadastrar o filme. Verifique se o servidor está rodando.')
    }
  }

  return (
    <main>
      <section>
        <h2>Cadastrar Filme</h2>
        <form onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Dados do filme</legend>

            <label htmlFor="titulo">Título *</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={e => { setTitulo(e.target.value); setErros(prev => ({ ...prev, titulo: '' })) }}
              placeholder="Ex: O Poderoso Chefão"
            />
            {erros.titulo && <span className="erro">{erros.titulo}</span>}

            <label htmlFor="genero">Gênero *</label>
            <select
              id="genero"
              value={genero}
              onChange={e => { setGenero(e.target.value); setErros(prev => ({ ...prev, genero: '' })) }}
            >
              <option value="">Selecione...</option>
              {GENEROS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            {erros.genero && <span className="erro">{erros.genero}</span>}

            <label htmlFor="nota">Nota (1–10) *</label>
            <input
              id="nota"
              type="number"
              min="1"
              max="10"
              value={nota}
              onChange={e => { setNota(e.target.value); setErros(prev => ({ ...prev, nota: '' })) }}
              placeholder="Ex: 8"
            />
            {erros.nota && <span className="erro">{erros.nota}</span>}

            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              rows="3"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Breve descrição ou comentário pessoal..."
            />
          </fieldset>

          <button type="submit">Cadastrar</button>
          {sucesso && <p className="sucesso">Filme cadastrado com sucesso!</p>}
          {erroApi && <p className="erro">{erroApi}</p>}
        </form>
      </section>
    </main>
  )
}
