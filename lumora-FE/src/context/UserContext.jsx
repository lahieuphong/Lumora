import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../services/api'

const UserCtx = createContext({ name: '' })

export function UserProvider({ children }) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('lumora_access')) return
    let mounted = true
    authApi.me()
      .then(({ data }) => {
        if (mounted && data)
          setName(data.full_name || data.name || data.identifier || '')
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  return <UserCtx.Provider value={{ name }}>{children}</UserCtx.Provider>
}

export const useUser = () => useContext(UserCtx)
