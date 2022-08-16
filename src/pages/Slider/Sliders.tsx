import { Button, Container, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { SliderTable } from './table/SliderTable'
import { getSliders, Slider } from '../../services/slider'
import { Link, useLocation } from 'react-router-dom'
import { useNotification } from '../../context/NotificationProvider'

export const Sliders = () => {
  const { data, isLoading, refetch } = useQuery<Slider[]>(['sliders'], getSliders, {})
  const location = useLocation()

  // refecteche data on location change
  useEffect(() => {
    refetch()
  }, [location])

  return (
    <div>
      <Container>
        <Typography variant="h3">Слайдери:</Typography>
        <p>
          <Link to="/sliders/create" state={{ backgroundLocation: location }}>
            <Button variant="contained" color="primary">
              Створити
            </Button>
          </Link>
        </p>
        <LoaderOverlay active={isLoading}>
          <SliderTable slides={data} />
        </LoaderOverlay>
      </Container>
    </div>
  )
}
