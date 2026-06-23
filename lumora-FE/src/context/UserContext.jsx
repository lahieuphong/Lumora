import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authApi } from '../services/api'

const UserCtx = createContext({ name: '', refresh: () => {} })

export function UserProvider({ children }) {
  const [name, setName] = useState('')

  const refresh = useCallback(() => {
    if (!localStorage.getItem('lumora_access')) {
      setName('')
      return
    }
    authApi.me()
      .then(({ data }) => {
        if (data) setName(data.full_name || data.name || data.identifier || '')
      })
      .catch(() => setName(''))
  }, [])

  useEffect(() => { refresh() }, [refresh])

  return <UserCtx.Provider value={{ name, refresh }}>{children}</UserCtx.Provider>
}

export const useUser = () => useContext(UserCtx)
