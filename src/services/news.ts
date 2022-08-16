import { cementApi } from '../api/cement'

export interface News {
  _id?: string
  title: string
  description: string
  image_filepath?: string
}

export const getAllNews = async () => {
  const response = await cementApi.get('/news')
  return response.data
}

interface CreateNewsDTO {
  title: string
  description: string
}
export const createNews = async (news: CreateNewsDTO) => {
  const response = await cementApi.post('/news', news)
  return response.data
}

interface UpdateNewsDTO {
  title?: string
  description?: string
}
export const updateNews = async (id: string, news: UpdateNewsDTO) => {
  const response = await cementApi.patch(`/news/${id}`, news)
  return response.data
}

export const uploadNewsImage = async (id: string, image: File) => {
  const formData = new FormData()
  formData.append('image', image)
  const response = await cementApi.post(`/news/${id}/image`, formData)
  return response.data
}

export const getNews = async (id: string) => {
  const response = await cementApi.get(`/news/${id}`)
  return response.data
}

export const deleteNews = async (id: string) => {
  const response = await cementApi.delete(`/news/${id}`)
  return response.data
}
