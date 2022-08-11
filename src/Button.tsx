import React from 'react'
import { useThemeContext } from './ThemeContext'

export const Button = () => {
  const { dark, toggleTheme } = useThemeContext()
  return <button onClick={toggleTheme}>Button</button>
}
