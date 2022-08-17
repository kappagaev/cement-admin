import axios from 'axios'
import { cementApi } from '../api/cement'
import { Tokens } from '../context/AuthProvider'
import { sleep } from './slider'

export const singIn = async (email: string, password: string) => {
  try {
    const { data } = await cementApi.post('/auth/local/signin', { email, password })
    return data
  } catch (error) {
    return null
  }
}

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const { data } = await cementApi.post<Tokens>(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    )
    return data
  } catch (error) {
    return null
  }
}
