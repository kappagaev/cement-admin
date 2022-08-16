import { CircularProgress } from '@mui/material'
import './loader-overlay.css'
interface Props {
  children: React.ReactNode | React.ReactNode[]
  active: boolean
}
export const LoaderOverlay = ({ children, active }: Props) => {
  if (!active) {
    return <>{children}</>
  }

  return (
    <div className="loader">
      {/* <div className="loader__overlay">
        <div className="loader__circular">
          <CircularProgress size={'10rem'} />
        </div>
      </div> */}
      <div className="loader__content">{children}</div>
    </div>
  )
}
