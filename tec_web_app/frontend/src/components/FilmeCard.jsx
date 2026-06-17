import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FilmeCard({ filme, onRemover }) {
  const navigate = useNavigate()
  const [confirmando, setConfirmando] = useState(false)

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
          {confirmando ? (
            <div className="confirmacao-remover">
              <span>Deseja excluir o filme?</span>
              <button className="btn-confirmar-sim" onClick={() => onRemover(filme.id)}>Sim</button>
              <button className="btn-confirmar-nao" onClick={() => setConfirmando(false)}>Não</button>
            </div>
          ) : (
            <>
              <button className="btn-editar" onClick={() => navigate(`/editar/${filme.id}`)}>
                Editar
              </button>
              <button className="btn-remover" onClick={() => setConfirmando(true)}>
                Remover
              </button>
            </>
          )}
        </footer>
      </article>
    </li>
  )
}
