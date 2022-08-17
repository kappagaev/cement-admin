import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TableImage } from '../../../components/tables/TableImage'
import { Slider } from '../../../services/slider'

interface SliderProps {
  slides: Slider[] | undefined
}
export const SliderTable = ({ slides }: SliderProps) => {
  const location = useLocation()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Картинка</TableCell>
            <TableCell align="center">Заголовок</TableCell>
            <TableCell align="center">Підзаголовок</TableCell>
            <TableCell align="center">Підзаголовок</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slides?.map((slide: Slider) => (
            <TableRow key={slide._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                {slide.image_filepath ? <TableImage src={slide.image_filepath} alt={slide.title} /> : null}
              </TableCell>
              <TableCell align="center">{slide.title}</TableCell>
              <TableCell align="center">{slide.subtitle}</TableCell>
              <TableCell align="center">
                <Link to={`/sliders/${slide._id}/edit`} state={{ backgroundLocation: location }}>
                  <Button variant="outlined">
                    Edit <i className="fas fa-edit" />
                  </Button>
                </Link>
                <Link to={`/sliders/${slide._id}/image`} state={{ backgroundLocation: location }}>
                  <Button variant="outlined">
                    Завантажити Картинку <i className="fas fa-edit" />
                  </Button>
                </Link>
                <Link to={`/sliders/${slide._id}/delete`} state={{ backgroundLocation: location }}>
                  <Button variant="outlined">
                    Видалити <i className="fas fa-edit" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
