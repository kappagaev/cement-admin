import { Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TableImage } from '../tables/TableImage'
import { Slider } from '../../services/slider'

interface Props {
  imageFilepath: string | undefined
  onSubmit: ({ image }: { image: FileList }) => void
}
export const ImageForm = ({ imageFilepath, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ image: FileList }>()

  return (
    <p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '20px' }}>
          <TableImage src={imageFilepath} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input type="file" {...register('image')} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Button type="submit">Зберегти</Button>
        </div>
      </form>
    </p>
  )
}
