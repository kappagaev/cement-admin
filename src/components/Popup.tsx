import React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { TableImage } from './tables/TableImage'
import { useNavigate, useParams } from 'react-router-dom'
import { Paper } from '@mui/material'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}
export const Popup = ({ children }: Props) => {
  const navigate = useNavigate()

  function onDismiss() {
    navigate(-1)
  }

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: '20px',
      }}
    >
      <Dialog open={true} onClose={onDismiss}>
        {children}
      </Dialog>
    </Paper>
  )
}
