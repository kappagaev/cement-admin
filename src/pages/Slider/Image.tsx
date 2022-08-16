import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { getSlider, Slider, uploadSliderImage } from '../../services/slider'
import { ImageForm } from '../../components/forms/ImageForm'
import { useNotification } from '../../context/NotificationProvider'

export const SliderImage = () => {
  const { id } = useParams()
  if (!id) {
    return null
  }
  const { data, isLoading, refetch } = useQuery<Slider>(['slider', id], async () => {
    return await getSlider(id)
  })
  const { addNotification } = useNotification()
  const [isUploading, setUploading] = React.useState(false)

  const uploadImage = async (image: File) => {
    setUploading(true)
    await uploadSliderImage({ id, image })
    await refetch()
    addNotification({
      type: 'success',
      message: 'Зображення змінено',
    })

    setUploading(false)
  }

  return (
    <Container>
      <h1>Завантажити картинку </h1>
      <LoaderOverlay active={isLoading || isUploading}>
        <ImageForm
          imageFilepath={data?.image_filepath}
          onSubmit={({ image }: { image: FileList }) => uploadImage(image[0])}
        />
      </LoaderOverlay>
    </Container>
  )
}
