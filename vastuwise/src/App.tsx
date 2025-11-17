import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { User } from '@supabase/supabase-js'

// Layout
import MainLayout from './components/layout/MainLayout'
import AuthLayout from './components/layout/AuthLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import FreeAnalysis from './pages/FreeAnalysis'
import AnalysisInterface from './pages/AnalysisInterface'
import AnalysisResults from './pages/AnalysisResults'
import Consultations from './pages/Consultations'
import ConsultantProfile from './pages/ConsultantProfile'
import Booking from './pages/Booking'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Reports from './pages/Reports'
import ReportViewer from './pages/ReportViewer'
import Profile from './pages/Profile'
import OrderTracking from './pages/OrderTracking'
import Notifications from './pages/Notifications'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <h2 className="text-2xl font-poppins text-saffron">VastuWise</h2>
          <p className="text-charcoal-light mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        </Route>

        {/* Main App Routes */}
        <Route element={<MainLayout user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/free-analysis" element={<FreeAnalysis />} />
          <Route path="/analysis/:id" element={<AnalysisInterface />} />
          <Route path="/results/:id" element={<AnalysisResults />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/consultant/:id" element={<ConsultantProfile />} />
          <Route path="/book/:consultantId" element={<Booking />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/report/:id" element={<ReportViewer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders/:id" element={<OrderTracking />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
