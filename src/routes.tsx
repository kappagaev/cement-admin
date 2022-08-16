import { Edit } from '@mui/icons-material'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import App from './App'
import { Popup } from './components/Popup'
import { useAuth } from './context/AuthProvider'
import { Login } from './pages/Login/Login'
import { CreateSlider } from './pages/Slider/Create'
import { DeleteSlider } from './pages/Slider/Delete'
import { SliderEdit } from './pages/Slider/Edit'
import { SliderImage } from './pages/Slider/Image'
import { Sliders } from './pages/Slider/Sliders'
import { Users } from './Users'

export const ReactRouter = () => {
  const location = useLocation()

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  const state = location.state as { backgroundLocation?: Location }
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route path="users" element={<Users />} />
          <Route path="sliders" element={<Sliders />} />
          <Route path="/sliders/:id/edit" element={<SliderEdit />} />
          <Route path="/sliders/:id/image" element={<SliderImage />} />
          <Route path="/sliders/:id/delete" element={<DeleteSlider />} />
          <Route path="/sliders/create" element={<CreateSlider />} />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/sliders/:id/edit"
            element={
              <Popup>
                <SliderEdit />
              </Popup>
            }
          />
          <Route
            path="/sliders/:id/image"
            element={
              <Popup>
                <SliderImage />
              </Popup>
            }
          />
          <Route
            path="/sliders/:id/delete"
            element={
              <Popup>
                <DeleteSlider />
              </Popup>
            }
          />
          <Route
            path="/sliders/create"
            element={
              <Popup>
                <CreateSlider />
              </Popup>
            }
          />
        </Routes>
      )}
    </>
  )
}
