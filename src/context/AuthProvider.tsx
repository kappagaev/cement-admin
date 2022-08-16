import { createContext, useContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

export interface Tokens {
  accessToken: string
  refreshToken: string
}

interface Payload {
  id: string
  email: string
  first_name: string
  is_admin: boolean
}
interface Auth {
  isLogged: boolean
  tokens: Tokens
  data: Payload
  setTokens: (tokens: Tokens) => void
  logout: () => void
}

const AuthContext = createContext<Auth>({} as Auth)

export const useAuth = () => {
  return useContext(AuthContext)
}

// Auth context provider component that is used to provide the auth context to the application.
// The auth context contains the access token and the refresh token.
interface Props {
  children: React.ReactNode | React.ReactNode[] | undefined
}
export const AuthProvider = ({ children }: Props) => {
  const [tokens, setTokens] = useState<Tokens>({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  })
  const [data, setData] = useState<any>({})
  const [isLogged, setIsLogged] = useState(tokens.accessToken != '')
  const auth: Auth = {
    tokens,
    data,
    isLogged,
    setTokens: (tokens: Tokens) => {
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)
      // decodes jwt token and sets the data property of the auth context
      setData(jwt_decode(tokens.accessToken))
      setTokens(tokens)
      setIsLogged(true)
    },
    logout: () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setTokens({ accessToken: '', refreshToken: '' })
      setData({})
      setIsLogged(false)
    },
  }
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (accessToken) {
      auth.setTokens({
        accessToken: localStorage.getItem('accessToken') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
      })
    }
  }, [])
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
