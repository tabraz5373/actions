import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-vastu flex items-center justify-center p-4 sacred-bg">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-poppins font-bold text-white mb-2">
            VastuWise
          </h1>
          <p className="text-cream text-lg font-crimson">
            Harmonize Your Space, Transform Your Life
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
