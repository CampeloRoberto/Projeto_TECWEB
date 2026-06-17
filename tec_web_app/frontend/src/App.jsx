import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { FilmesProvider } from './context/FilmesContext'
import Inicio from './pages/Inicio'
import Cadastro from './pages/Cadastro'
import Listagem from './pages/Listagem'
import Editar from './pages/Editar'

export default function App() {
  return (
    <FilmesProvider>
      <BrowserRouter>
        <header>
          <h1>CineList</h1>
          <nav>
            <ul>
              <li><NavLink to="/" end className={({ isActive }) => isActive ? 'ativo' : ''}>Início</NavLink></li>
              <li><NavLink to="/cadastro" className={({ isActive }) => isActive ? 'ativo' : ''}>Cadastro</NavLink></li>
              <li><NavLink to="/listagem" className={({ isActive }) => isActive ? 'ativo' : ''}>Listagem</NavLink></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/listagem" element={<Listagem />} />
          <Route path="/editar/:id" element={<Editar />} />
        </Routes>

        <footer>
          <p>&copy; 2025 CineList — Projeto TECWEB</p>
        </footer>
      </BrowserRouter>
    </FilmesProvider>
  )
}
