import React from 'react'
import AppSidebar from '../components/AppSidebar'
import AppContent from '../components/AppContent'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'


const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter/>
      </div>
    </div>
  )
}

export default DefaultLayout

