import { Button, Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { TableImage } from '../../components/tables/TableImage'
import { useNotification } from '../../context/NotificationProvider'
import { destroySlider, getSlider, getSliders, Slider } from '../../services/slider'

export const DeleteSlider = () => {
  const { id } = useParams()
  if (!id) {
    return null
  }
  const { data, isLoading } = useQuery<Slider>(['slider', id], async () => {
    return await getSlider(id)
  })
  const [isDeleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const { addNotification } = useNotification()

  const deleteSlider = async (id: string) => {
    setDeleting(true)
    await destroySlider(id)
    setDeleting(false)
    navigate(-1)
    addNotification({
      type: 'success',
      message: 'Слайдер видалено',
    })
  }

  return (
    <Container>
      <h1>Ви впенені що хочете видалити? </h1>
      <LoaderOverlay active={isLoading || isDeleting}>
        <p>
          <TableImage src={'/' + data?.image_filepath} />
        </p>
        <p>
          <Button onClick={() => deleteSlider(id)}>Видалити</Button>
        </p>
      </LoaderOverlay>
    </Container>
  )
}
