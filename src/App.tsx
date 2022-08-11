import React from 'react'
import { Button } from './Button'
import { Hi } from './Hi'
import { ThemeProvider, useThemeContext } from './ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Button />
      <Hi />
    </ThemeProvider>
  )
}

export default App
