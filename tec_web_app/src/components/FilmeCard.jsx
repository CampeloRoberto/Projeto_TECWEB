export default function FilmeCard({ filme, onRemover }) {
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
          <button className="btn-remover" onClick={() => onRemover(filme.id)}>
            Remover
          </button>
        </footer>
      </article>
    </li>
  )
}
