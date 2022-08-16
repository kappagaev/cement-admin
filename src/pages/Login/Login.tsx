import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LoaderOverlay } from '../../components/comon/LoaderOverlay'
import { NotificationsOverlay } from '../../components/NotificationsOverlay'
import { Tokens, useAuth } from '../../context/AuthProvider'
import { useNotification } from '../../context/NotificationProvider'
import { singIn } from '../../services/auth'

interface LoginInputs {
  email: string
  password: string
}
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>()
  const navigate = useNavigate()

  const { addNotification } = useNotification()
  const [isLoading, setIsLoading] = useState(false)
  const { setTokens } = useAuth()
  const onSubmit = async ({ email, password }: LoginInputs) => {
    setIsLoading(true)
    const tokens = await singIn(email, password)
    setIsLoading(false)
    console.log(tokens)
    if (!tokens) {
      addNotification({
        type: 'error',
        message: 'Неправильна пошта або пароль',
      })
    } else {
      setTokens(tokens)
      addNotification({
        type: 'success',
        message: 'Ви успішно авторизовані',
      })
      navigate('/')
    }
  }

  return (
    <Container maxWidth="md">
      <NotificationsOverlay />

      <LoaderOverlay active={isLoading}>
        <Grid container justifyContent={'center'} spacing={2}>
          <Grid item xs={12} sm={8} md={6} lg={6}>
            <Paper
              elevation={2}
              sx={{
                padding: '24px',
                borderRadius: '20px',
                paddingTop: '60px',
                marginTop: '80px',
                paddingBottom: '30px',
              }}
            >
              <Box sx={{ marginBottom: '1.5rem' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl sx={{ marginBottom: '1.5rem' }}>
                    <Typography>Вітаємо! Будь ласка, введіть ваші дані авторизації.</Typography>
                  </FormControl>
                  <FormControl sx={{ marginBottom: '1.5rem' }} fullWidth={true}>
                    <TextField
                      id="my-input"
                      label="Пошта"
                      variant="outlined"
                      type="email"
                      {...register('email', { required: true })}
                    />
                  </FormControl>
                  <FormControl sx={{ marginBottom: '1.5rem' }} fullWidth={true}>
                    <TextField
                      id="my-input"
                      variant="outlined"
                      label="Пароль"
                      type="password"
                      {...register('password', { required: true })}
                    />
                  </FormControl>
                  <FormControl sx={{ alignItems: 'center', marginBottom: '1.5rem' }}>
                    <Button type="submit" variant="contained" color="primary">
                      Увійти
                    </Button>
                  </FormControl>
                </form>
              </Box>

              <Divider />
            </Paper>
          </Grid>
        </Grid>
      </LoaderOverlay>
    </Container>
  )
}
