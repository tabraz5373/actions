import { Link, useLocation } from 'react-router-dom'
import { Home, Compass, Users, ShoppingBag, FileText } from 'lucide-react'

const BottomNav = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/free-analysis', icon: Compass, label: 'Analysis' },
    { path: '/consultations', icon: Users, label: 'Consult' },
    { path: '/products', icon: ShoppingBag, label: 'Products' },
    { path: '/reports', icon: FileText, label: 'Reports' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? 'text-saffron'
                    : 'text-charcoal-light hover:text-saffron'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 w-12 h-1 bg-saffron rounded-t-full"></div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default BottomNav
