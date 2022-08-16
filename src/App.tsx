import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { Header, MuiAppBar, MuiMenu, MuiMenuItem } from './Header'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Container, ThemeProvider } from '@mui/material'
import theme from './theme'
import { NotificationsOverlay } from './components/NotificationsOverlay'
import { useAuth } from './context/AuthProvider'

function App() {
  const navigate = useNavigate()
  const { isLogged } = useAuth()
  useEffect(() => {
    if (!isLogged) {
      navigate('/login')
    }
  }, [isLogged])
  return (
    <div>
      <NotificationsOverlay />
      <Container>
        <Header />
      </Container>
      <div style={{ marginTop: '100px' }}>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  )
}

export default App
