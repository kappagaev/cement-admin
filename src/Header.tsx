import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useAuth } from './context/AuthProvider'

// MuiAppBar is a component that is used to create the header of the application.
// It is a wrapper around the Material UI AppBar component.
// The header contains the title, the menu button, and the logout button.
// The menu button is used to open the menu.
// The logout button is used to logout the user.
// The logout button is only visible when the user is logged in.
interface MuiAppBarProps {
  title: string
  children?: React.ReactNode | React.ReactNodeArray | undefined
}
export const MuiAppBar = ({ title, children }: MuiAppBarProps) => {
  const { logout } = useAuth()
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
        {children}
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

// MuiMenu is a component that is used to create the menu of the application.
// It is a wrapper around the Material UI Menu component.
// The menu contains the menu items.
// The menu items are used to navigate to the different pages of the application.
interface MuiMenuProps {
  children: React.ReactNode
}
export const MuiMenu = ({ children }: MuiMenuProps) => {
  return <Box p={2}>{children}</Box>
}

export default MuiMenu

// MuiMenuItem is a component that is used to create a menu item of the menu.
// It is a wrapper around the Material UI MenuItem component.
// The menu item contains the text of the menu item and the link to the page.
interface MuiMenuItemProps {
  link: string
  text: string
}
export const MuiMenuItem = ({ text, link }: MuiMenuItemProps) => {
  return (
    <Link to={link}>
      <Button color="inherit">{text}</Button>
    </Link>
  )
}

// MuiMenuItem is a component that is used to create a menu item of the menu.
// It is a wrapper around the Material UI MenuItem component.
// The menu item contains the text of the menu item and the link to the page.
interface MuiMenuItemProps {
  text: string
  link: string
}
export const MuiMenuItemLogout = ({ text, link }: MuiMenuItemProps) => {
  return (
    <Link to={link}>
      <Button color="inherit">{text}</Button>
    </Link>
  )
}

export const Header = () => {
  return (
    <MuiAppBar title="dsf">
      <MuiMenu>
        <MuiMenuItem text="Users" link={'/users'} />
        <MuiMenuItem text="sliders" link={'/sliders'} />
        <MuiMenuItem text="Новини" link={'/news'} />
      </MuiMenu>
    </MuiAppBar>
  )
}
