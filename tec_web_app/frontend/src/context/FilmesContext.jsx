import { createContext, useContext, useState, useEffect } from 'react'

const FilmesContext = createContext()

const API = '/api/filmes'

export function FilmesProvider({ children }) {
  const [filmes, setFilmes] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setFilmes(data))
      .finally(() => setCarregando(false))
  }, [])

  async function adicionarFilme(filme) {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filme)
    })
    const novo = await res.json()
    setFilmes(prev => [...prev, novo])
  }

  async function removerFilme(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    setFilmes(prev => prev.filter(f => f.id !== id))
  }

  return (
    <FilmesContext.Provider value={{ filmes, adicionarFilme, removerFilme, carregando }}>
      {children}
    </FilmesContext.Provider>
  )
}

export function useFilmes() {
  return useContext(FilmesContext)
}
