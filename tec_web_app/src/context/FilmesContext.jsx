import { createContext, useContext, useState } from 'react'

const FilmesContext = createContext()

export function FilmesProvider({ children }) {
  const [filmes, setFilmes] = useState([])

  function adicionarFilme(filme) {
    setFilmes(prev => [...prev, { ...filme, id: crypto.randomUUID() }])
  }

  function removerFilme(id) {
    setFilmes(prev => prev.filter(f => f.id !== id))
  }

  return (
    <FilmesContext.Provider value={{ filmes, adicionarFilme, removerFilme }}>
      {children}
    </FilmesContext.Provider>
  )
}

export function useFilmes() {
  return useContext(FilmesContext)
}
