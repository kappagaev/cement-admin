import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import React, { ReactNode, useContext, useEffect } from 'react'
import { cementApi } from '../api/cement'
import { refreshAccessToken } from '../services/auth'
import { useAuth } from './AuthProvider'

interface AxiosContextProps {
  cement: AxiosInstance
}

const axiosContext = React.createContext<AxiosContextProps>({} as AxiosContextProps)
export const useAxios = () => {
  useContext(axiosContext)
}

export const AxiosProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [cement, setCement] = React.useState<AxiosInstance>(cementApi)
  const { tokens, setTokens, logout, isLogged } = useAuth()

  return <axiosContext.Provider value={{ cement }}>{children}</axiosContext.Provider>
}
