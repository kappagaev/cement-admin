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
