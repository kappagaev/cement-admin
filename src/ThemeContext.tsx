import React, { createContext, useContext } from 'react'

export interface Theme {
  dark: boolean
  toggleTheme: () => void
}
const ThemeContext = createContext<Theme>({
  dark: false,
  toggleTheme: () => ({}),
})

export const useThemeContext = () => useContext(ThemeContext)

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export function ThemeProvider({ children }: Props) {
  const [dark, setDark] = React.useState(false)

  function toggleTheme() {
    console.log('toggleTheme')
    console.log(dark)
    setDark(!dark)
  }

  return (
    <ThemeContext.Provider
      value={{
        dark: dark,
        toggleTheme: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
