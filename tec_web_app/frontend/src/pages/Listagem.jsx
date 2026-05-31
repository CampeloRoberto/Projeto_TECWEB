import { useFilmes } from '../context/FilmesContext'
import FilmeCard from '../components/FilmeCard'

export default function Listagem() {
  const { filmes, removerFilme, carregando } = useFilmes()

  return (
    <main>
      <section>
        <h2>Meus Filmes</h2>

        {carregando && <p style={{ color: '#999' }}>Carregando filmes...</p>}

        {!carregando && filmes.length === 0 && (
          <p style={{ color: '#999' }}>
            Nenhum filme cadastrado ainda. Vá para a página de Cadastro!
          </p>
        )}

        {!carregando && filmes.length > 0 && (
          <ul className="lista-filmes">
            {filmes.map(filme => (
              <FilmeCard key={filme.id} filme={filme} onRemover={removerFilme} />
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
