import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TableImage } from '../../../components/tables/TableImage'
import { Slider } from '../../../services/slider'

interface Props {
  slider?: Slider
  onSubmit: (data: Slider) => void
}
export const SliderForm = ({ slider, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Slider>()
  return (
    <p>
      {slider?.image_filepath ? <TableImage src={'/' + slider?.image_filepath} /> : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginTop: '20px' }}>
          <InputLabel htmlFor="title">Заголовок</InputLabel>
          <Input id="title" {...register('title', { required: true, value: slider?.title })} />
        </div>

        <div style={{ marginTop: '20px' }}>
          <InputLabel htmlFor="subtitle">Підзаголовок</InputLabel>
          <Input id="subtitle" {...register('subtitle', { required: true, value: slider?.subtitle })} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary">
            Зберегти
          </Button>
        </div>
      </form>
    </p>
  )
}
