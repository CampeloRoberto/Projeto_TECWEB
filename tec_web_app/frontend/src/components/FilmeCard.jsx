import { useNavigate } from 'react-router-dom'

export default function FilmeCard({ filme, onRemover }) {
  const navigate = useNavigate()

  return (
    <li className="card-filme">
      <article>
        <header>
          <h3>{filme.titulo}</h3>
          <span className="badge-genero">{filme.genero}</span>
        </header>
        <p className="nota">Nota: {filme.nota}/10</p>
        {filme.descricao && <p className="descricao">{filme.descricao}</p>}
        <footer>
          <button className="btn-editar" onClick={() => navigate(`/editar/${filme.id}`)}>
            Editar
          </button>
          <button className="btn-remover" onClick={() => onRemover(filme.id)}>
            Remover
          </button>
        </footer>
      </article>
    </li>
  )
}
