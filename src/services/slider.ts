import { cementApi } from '../api/cement'

export interface Slider {
  _id: string
  title: string
  subtitle: string
  image_filepath?: string
}
export function sleep(milliseconds: number) {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}
export const getSliders = async () => {
  const response = await cementApi.get<Slider[]>('/slider')

  return response.data
}

export const getSlider = async (id: string) => {
  const response = await cementApi.get<Slider>('/slider/' + id)

  return response.data
}

interface UploadImage {
  id: string
  image: File
}
export const uploadSliderImage = async ({ id, image }: UploadImage) => {
  const formData = new FormData()
  formData.append('image', image)
  console.log(image)
  const response = await cementApi.post<{ imageUrl: string }>(`/slider/${id}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.imageUrl
}
export const destroySlider = async (id: string) => {
  const response = await cementApi.delete<{ message: string }>(`/slider/${id}`)

  return response.data.message
}

export const createSlider = async (slider: Slider) => {
  const response = await cementApi.post<{ message: string }>('/slider', slider)

  return response.data.message
}

export const updateSlider = async (id: string, slider: Slider) => {
  const response = await cementApi.patch<{ message: string }>(`/slider/${id}`, slider)

  return response.data.message
}
