import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <main>
      <section className="hero">
        <h2>Seus filmes favoritos em um só lugar</h2>
        <p>Cadastre, organize e reveja sua coleção de filmes favoritos a qualquer momento.</p>
        <Link to="/cadastro">Adicionar filme</Link>
      </section>
    </main>
  )
}
