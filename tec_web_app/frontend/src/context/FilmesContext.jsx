import { createContext, useContext, useState, useEffect } from 'react'

const FilmesContext = createContext()

const API = '/api/filmes'

export function FilmesProvider({ children }) {
  const [filmes, setFilmes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroApi, setErroApi] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(API, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Falha ao carregar filmes.')
        return res.json()
      })
      .then(data => setFilmes(data))
      .catch(err => {
        if (err.name !== 'AbortError') setErroApi(err.message)
      })
      .finally(() => setCarregando(false))
    return () => controller.abort()
  }, [])

  async function adicionarFilme(filme) {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filme)
    })
    if (!res.ok) throw new Error('Falha ao cadastrar o filme.')
    const novo = await res.json()
    setFilmes(prev => [...prev, novo])
  }

  async function atualizarFilme(id, dados) {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!res.ok) throw new Error('Falha ao atualizar o filme.')
    const atualizado = await res.json()
    setFilmes(prev => prev.map(f => f.id === id ? atualizado : f))
  }

  async function removerFilme(id) {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Falha ao remover o filme.')
    setFilmes(prev => prev.filter(f => f.id !== id))
  }

  return (
    <FilmesContext.Provider value={{ filmes, adicionarFilme, atualizarFilme, removerFilme, carregando, erroApi }}>
      {children}
    </FilmesContext.Provider>
  )
}

export function useFilmes() {
  return useContext(FilmesContext)
}
