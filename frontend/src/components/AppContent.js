import React  from 'react'
import { Outlet} from 'react-router-dom'
const AppContent = () => {
  return (
    <>
    <Outlet/>
    </>
    
  )
}
export default React.memo(AppContent)
