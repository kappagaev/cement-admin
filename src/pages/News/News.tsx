import { Button, Container, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { getSliders, Slider } from '../../services/slider'
import { Link, useLocation } from 'react-router-dom'
import { useNotification } from '../../context/NotificationProvider'
import { NewsTable } from './Table'
import { getAllNews, getNews, News } from '../../services/news'

export const NewsIndex = () => {
  const { data, isLoading, refetch } = useQuery<News[]>(['news'], getAllNews, {})
  const location = useLocation()

  // refecteche data on location change
  useEffect(() => {
    refetch()
  }, [location])

  return (
    <div>
      <Container>
        <Typography variant="h3">Новини:</Typography>
        <p>
          <Link to="/news/create" state={{ backgroundLocation: location }}>
            <Button variant="contained" color="primary">
              Створити
            </Button>
          </Link>
        </p>
        <LoaderOverlay active={isLoading}>
          <NewsTable news={data} />
        </LoaderOverlay>
      </Container>
    </div>
  )
}
