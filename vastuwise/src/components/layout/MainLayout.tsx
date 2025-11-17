import { Outlet, useLocation } from 'react-router-dom'
import { User } from '@supabase/supabase-js'
import Header from './Header'
import BottomNav from './BottomNav'

interface MainLayoutProps {
  user: User | null
}

const MainLayout = ({ user }: MainLayoutProps) => {
  const location = useLocation()
  
  // Hide bottom nav on certain pages
  const hideBottomNav = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header user={user} />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  )
}

export default MainLayout
