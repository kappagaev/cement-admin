import React from 'react'
import { useThemeContext } from './ThemeContext'

export const Hi = () => {
  const { dark } = useThemeContext()
  console.log(dark)
  const style = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? '#eee' : '#222',
  }
  console.log(style)
  return <div style={style}>Hi</div>
}
