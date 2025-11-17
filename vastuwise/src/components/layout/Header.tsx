import { Link, useNavigate } from 'react-router-dom'
import { User } from '@supabase/supabase-js'
import { Bell, Menu, User as UserIcon } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  user: User | null
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-vastu rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-xl font-poppins font-bold text-charcoal">
            VastuWise
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-cream rounded-full transition-colors"
          >
            <Bell className="w-6 h-6 text-charcoal" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-saffron rounded-full"></span>
          </button>

          {user ? (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-cream rounded-full transition-colors"
            >
              <UserIcon className="w-6 h-6 text-charcoal" />
            </button>
          ) : (
            <Link
              to="/login"
              className="btn-primary text-sm py-2 px-4"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-cream rounded-full transition-colors"
          >
            <Menu className="w-6 h-6 text-charcoal" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-4 top-16 bg-white rounded-lg shadow-xl py-2 w-48 animate-fade-in">
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-cream transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Profile Settings
          </Link>
          <Link
            to="/orders"
            className="block px-4 py-2 hover:bg-cream transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Order History
          </Link>
          <Link
            to="/notifications"
            className="block px-4 py-2 hover:bg-cream transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Notifications
          </Link>
          <hr className="my-2" />
          <a
            href="#"
            className="block px-4 py-2 hover:bg-cream transition-colors"
          >
            Help & FAQ
          </a>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-cream transition-colors"
          >
            Contact Support
          </a>
        </div>
      )}
    </header>
  )
}

export default Header
