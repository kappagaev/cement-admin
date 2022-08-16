import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TableImage } from '../../components/tables/TableImage'
import { News } from '../../services/news'

interface Props {
  news: News[] | undefined
}
export const NewsTable = ({ news }: Props) => {
  const location = useLocation()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Картинка</TableCell>
            <TableCell align="center">Заголовок</TableCell>
            <TableCell align="center">Опис</TableCell>
            <TableCell align="center">Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {news?.map((newsItem: News) => (
            <TableRow key={newsItem._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">
                {newsItem.image_filepath ? (
                  <TableImage src={'/' + newsItem.image_filepath} alt={newsItem.title} />
                ) : null}
              </TableCell>
              <TableCell align="center">{newsItem.title}</TableCell>
              <TableCell align="center">{newsItem.description}</TableCell>
              <TableCell align="center">
                <Link to={`/news/${newsItem._id}/edit`} state={{ backgroundLocation: location }}>
                  <Button variant="outlined">
                    Edit <i className="fas fa-edit" />
                  </Button>
                </Link>
                <Link to={`/news/${newsItem._id}/image`} state={{ backgroundLocation: location }}>
                  <Button variant="outlined">
                    Завантажити Картинку <i className="fas fa-edit" />
                  </Button>
                </Link>
                <Link to={`/news/${newsItem._id}/delete`} state={{ backgroundLocation: location }}>
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
