import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import { signInWithPhone, signInWithGoogle, verifyOtp } from '../lib/supabase'

const Login = () => {
  const navigate = useNavigate()
  const [method, setMethod] = useState<'phone' | 'email'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePhoneLogin = async () => {
    setLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithPhone(phone)
      if (error) throw error
      setShowOtp(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setLoading(true)
    setError('')
    
    try {
      const { error } = await verifyOtp(phone, otp)
      if (error) throw error
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="animate-slide-up">
      <h2 className="text-2xl font-poppins font-bold text-charcoal mb-6 text-center">
        Welcome Back
      </h2>

      {/* Method Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMethod('phone')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            method === 'phone'
              ? 'bg-saffron text-white'
              : 'bg-cream text-charcoal'
          }`}
        >
          <Phone className="w-4 h-4 inline mr-2" />
          Phone
        </button>
        <button
          onClick={() => setMethod('email')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            method === 'email'
              ? 'bg-saffron text-white'
              : 'bg-cream text-charcoal'
          }`}
        >
          <Mail className="w-4 h-4 inline mr-2" />
          Email
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {method === 'phone' ? (
        <div className="space-y-4">
          {!showOtp ? (
            <>
              <Input
                type="tel"
                label="Phone Number"
                placeholder="+91 1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                fullWidth
                onClick={handlePhoneLogin}
                disabled={loading || !phone}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                label="Enter OTP"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
              <Button
                fullWidth
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <button
                onClick={() => setShowOtp(false)}
                className="text-sm text-saffron hover:underline"
              >
                Change phone number
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <Button
            fullWidth
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <Mail className="w-5 h-5 inline mr-2" />
            {loading ? 'Connecting...' : 'Continue with Google'}
          </Button>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-charcoal-light">
          Don't have an account?{' '}
          <Link to="/register" className="text-saffron font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link to="/" className="text-sm text-charcoal-light hover:text-saffron">
          Skip for now
        </Link>
      </div>
    </Card>
  )
}

export default Login
