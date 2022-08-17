import axios, { AxiosRequestConfig } from 'axios'
import { refreshAccessToken } from '../services/auth'

export const cementApi = axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// cementApi.interceptors.request.use((config: AxiosRequestConfig) => {
//   config.headers = { ...config.headers }
//   config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
//   return config
// })

// cementApi.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async function (error) {
//     const originalRequest = error.config
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true
//       const refreshToken = localStorage.getItem('refreshToken')
//       if (!refreshToken) {
//         return Promise.reject(error)
//       }
//       const tokens = await refreshAccessToken(refreshToken)

//       if (!tokens) {
//         return Promise.reject(error)
//       }
//       localStorage.setItem('accessToken', tokens.accessToken)
//       localStorage.setItem('refreshToken', tokens.refreshToken)
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokens.accessToken
//       return cementApi(originalRequest)
//     }
//     return Promise.reject(error)
//   },
// )
