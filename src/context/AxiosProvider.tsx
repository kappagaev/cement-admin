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
  useEffect(() => {
    if (tokens.accessToken && isLogged) {
      cementApi.interceptors.request.use((config: AxiosRequestConfig) => {
        // if Authorization header is not set, set it
        config.headers = { ...config.headers }
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`
        }

        return config
      })
      cementApi.interceptors.response.use(
        (response) => {
          return response
        },
        async function (error) {
          const originalRequest = error.config

          if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !error.request.responseURL.endsWith('api/auth/refresh')
          ) {
            originalRequest._retry = true
            const refreshedTokens = await refreshAccessToken(tokens.refreshToken)
            if (!refreshedTokens) {
              logout()
              return Promise.reject(error)
            }
            setTokens(refreshedTokens)
            return cement(originalRequest)
          }
          return Promise.reject(error)
        },
      )
    }
    // refreshesh token if it is expired

    setCement(cementApi)
  }, [tokens])
  return <axiosContext.Provider value={{ cement }}>{children}</axiosContext.Provider>
}
