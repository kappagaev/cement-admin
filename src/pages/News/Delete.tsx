import { Button, Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { TableImage } from '../../components/tables/TableImage'
import { useNotification } from '../../context/NotificationProvider'
import { deleteNews } from '../../services/news'
import { destroySlider, getSlider, getSliders, Slider } from '../../services/slider'

export const NewsDelete = () => {
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

  // deletes news and redirects to news list
  const onClick = async (id: string) => {
    setDeleting(true)
    await deleteNews(id)
    setDeleting(false)
    navigate(-1)
    addNotification({
      type: 'success',
      message: 'Новину видалено',
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
          <Button onClick={() => onClick(id)}>Видалити</Button>
        </p>
      </LoaderOverlay>
    </Container>
  )
}
