import { Box } from '@mui/system'
import React from 'react'

interface Props {
  src?: string
  alt?: string
}
export const TableImage = ({ src, alt }: Props) => {
  return (
    <Box
      component="img"
      sx={{
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      src={src}
      alt={alt}
    />
  )
}
