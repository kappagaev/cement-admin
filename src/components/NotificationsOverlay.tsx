import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useNotification } from '../context/NotificationProvider'

interface Props {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}
const Notification = ({ message, type }: Props) => {
  const [open, setOpen] = React.useState(true)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export const NotificationsOverlay = () => {
  const { notifications } = useNotification()

  return (
    <>
      {notifications.map((notification, index) => (
        <Notification key={index} {...notification} />
      ))}
    </>
  )
}
