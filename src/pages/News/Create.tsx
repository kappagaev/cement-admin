import { Container } from '@mui/system'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { useNotification } from '../../context/NotificationProvider'
import { createNews, News } from '../../services/news'
import { createSlider, Slider } from '../../services/slider'
import { NewsForm } from './Form'

export const NewsCreate = () => {
  const [isCreating, setCreating] = React.useState(false)
  const { addNotification } = useNotification()
  return (
    <Container>
      <h1>Створити новий </h1>
      <LoaderOverlay active={isCreating}>
        <NewsForm
          onSubmit={async (data: News) => {
            setCreating(true)
            await createNews(data)
            addNotification({
              type: 'success',
              message: 'Новину створено',
            })
            setCreating(false)
          }}
        />
      </LoaderOverlay>
    </Container>
  )
}
