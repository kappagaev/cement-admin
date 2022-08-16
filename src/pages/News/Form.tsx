import { Button, Container, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TableImage } from '../../components/tables/TableImage'
import { News } from '../../services/news'

interface Props {
  news?: News | undefined
  onSubmit: (data: News) => void
}
export const NewsForm = ({ news, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<News>()
  return (
    <Container sx={{ minWidth: '500px', paddingBottom: '40px' }}>
      {news?.image_filepath ? <TableImage src={'/' + news?.image_filepath} /> : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginTop: '20px' }}>
          <InputLabel htmlFor="title">Заголовок</InputLabel>
          <Input id="title" {...register('title', { required: true, value: news?.title })} />
        </div>

        <div style={{ marginTop: '20px' }}>
          <InputLabel htmlFor="subtitle">Опис</InputLabel>
          <TextField
            multiline
            rows={2}
            sx={{ width: '100%' }}
            id="description"
            {...register('description', { required: true, value: news?.description })}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary">
            Зберегти
          </Button>
        </div>
      </form>
    </Container>
  )
}
