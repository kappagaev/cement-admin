import { Container } from '@mui/system'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { useNotification } from '../../context/NotificationProvider'
import { createSlider, Slider } from '../../services/slider'
import { SliderForm } from './form/SliderForm'

export const CreateSlider = () => {
  const [isCreating, setCreating] = React.useState(false)
  const { addNotification } = useNotification()
  return (
    <Container>
      <h1>Створити новий </h1>
      <LoaderOverlay active={isCreating}>
        <SliderForm
          onSubmit={async (data: Slider) => {
            setCreating(true)
            await createSlider(data)
            addNotification({
              type: 'success',
              message: 'Слайдер створено',
            })
            setCreating(false)
          }}
        />
      </LoaderOverlay>
    </Container>
  )
}
