import { useState, useMemo } from 'react'
import { useFilmes } from '../context/FilmesContext'
import FilmeCard from '../components/FilmeCard'

const GENEROS = ['Ação', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Animação', 'Documentário', 'Outro']

export default function Listagem() {
  const { filmes, removerFilme, carregando } = useFilmes()
  const [filtroGenero, setFiltroGenero] = useState('')
  const [ordenacao, setOrdenacao] = useState('')

  const filmesFiltrados = useMemo(() => {
    let resultado = filtroGenero
      ? filmes.filter(f => f.genero === filtroGenero)
      : [...filmes]

    if (ordenacao === 'maior') resultado.sort((a, b) => b.nota - a.nota)
    if (ordenacao === 'menor') resultado.sort((a, b) => a.nota - b.nota)

    return resultado
  }, [filmes, filtroGenero, ordenacao])

  return (
    <main>
      <section>
        <h2>Meus Filmes</h2>

        {!carregando && filmes.length > 0 && (
          <form className="form-filtro" onSubmit={e => e.preventDefault()}>
            <label htmlFor="filtro-genero">Gênero</label>
            <select
              id="filtro-genero"
              value={filtroGenero}
              onChange={e => setFiltroGenero(e.target.value)}
            >
              <option value="">Todos</option>
              {GENEROS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <label htmlFor="ordenacao">Ordenar por nota</label>
            <select
              id="ordenacao"
              value={ordenacao}
              onChange={e => setOrdenacao(e.target.value)}
            >
              <option value="">Sem ordenação</option>
              <option value="maior">Maior nota primeiro</option>
              <option value="menor">Menor nota primeiro</option>
            </select>

            {(filtroGenero || ordenacao) && (
              <button
                type="button"
                className="btn-limpar"
                onClick={() => { setFiltroGenero(''); setOrdenacao('') }}
              >
                Limpar filtros
              </button>
            )}
          </form>
        )}

        {carregando && <p style={{ color: '#999' }}>Carregando filmes...</p>}

        {!carregando && filmes.length === 0 && (
          <p style={{ color: '#999' }}>
            Nenhum filme cadastrado ainda. Vá para a página de Cadastro!
          </p>
        )}

        {!carregando && filmes.length > 0 && filmesFiltrados.length === 0 && (
          <p style={{ color: '#999' }}>Nenhum filme encontrado para esse gênero.</p>
        )}

        {!carregando && filmesFiltrados.length > 0 && (
          <ul className="lista-filmes">
            {filmesFiltrados.map(filme => (
              <FilmeCard key={filme.id} filme={filme} onRemover={removerFilme} />
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
