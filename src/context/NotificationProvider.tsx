import React from 'react'

interface Notification {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

interface NotificationProviderProps {
  notifications: Notification[]
  addNotification: (notification: Notification) => void
}

const notificationContext = React.createContext<NotificationProviderProps>({
  addNotification: () => undefined,
  notifications: [],
})

export const useNotification = () => React.useContext(notificationContext)

interface Props {
  children: React.ReactNode | React.ReactNode[]
}
export const NotificationProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification])
  }
  return (
    <notificationContext.Provider
      value={{
        addNotification: addNotification,
        notifications: notifications,
      }}
    >
      {children}
    </notificationContext.Provider>
  )
}
