import { Container, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { Popup } from '../../components/Popup'
import { TableImage } from '../../components/tables/TableImage'
import { useNotification } from '../../context/NotificationProvider'
import { getNews, News, updateNews } from '../../services/news'
import { getSlider, getSliders, Slider, updateSlider } from '../../services/slider'
import { NewsForm } from './Form'

export const NewsEdit = () => {
  const { id } = useParams()
  if (!id) {
    return null
  }
  const { data, isLoading, refetch } = useQuery<News>(['news', id], async () => {
    return await getNews(id)
  })
  const [isUpdating, setUpdating] = React.useState(false)
  const { addNotification } = useNotification()

  const onSubmit = async (data: News) => {
    setUpdating(true)
    await updateNews(id, data)
    addNotification({
      type: 'success',
      message: 'Новину успішно оновлено',
    })
    await refetch()
    setUpdating(false)
  }
  return (
    <Container>
      <h1>Редагувати </h1>
      <LoaderOverlay active={isLoading || isUpdating}>
        <NewsForm news={data} onSubmit={onSubmit} />
      </LoaderOverlay>
    </Container>
  )
}
