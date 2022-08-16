import { Container, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { Popup } from '../../components/Popup'
import { TableImage } from '../../components/tables/TableImage'
import { useNotification } from '../../context/NotificationProvider'
import { getSlider, getSliders, Slider, updateSlider } from '../../services/slider'
import { SliderForm } from './form/SliderForm'

export const SliderEdit = () => {
  const { id } = useParams()
  if (!id) {
    return null
  }
  const { data, isLoading, refetch } = useQuery<Slider>(['slider', id], async () => {
    return await getSlider(id)
  })
  const [isUpdating, setUpdating] = React.useState(false)
  const { addNotification } = useNotification()
  return (
    <Container>
      <h1>Редагувати </h1>
      <LoaderOverlay active={isLoading || isUpdating}>
        <SliderForm
          slider={data}
          onSubmit={async (data: Slider) => {
            setUpdating(true)
            addNotification({
              type: 'success',
              message: await updateSlider(id, data),
            })
            await refetch()
            setUpdating(false)
          }}
        />
      </LoaderOverlay>
    </Container>
  )
}
