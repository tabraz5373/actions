import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Phone, User, MapPin } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import { signInWithPhone, signInWithGoogle, verifyOtp } from '../lib/supabase'

const Register = () => {
  const navigate = useNavigate()
  const [method, setMethod] = useState<'phone' | 'email'>('phone')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    otp: '',
  })
  const [showOtp, setShowOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handlePhoneRegister = async () => {
    if (!agreedToTerms) {
      setError('Please agree to terms and conditions')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithPhone(formData.phone)
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
      const { error } = await verifyOtp(formData.phone, formData.otp)
      if (error) throw error
      // TODO: Save additional profile data (name, location)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    if (!agreedToTerms) {
      setError('Please agree to terms and conditions')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Failed to register with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="animate-slide-up">
      <h2 className="text-2xl font-poppins font-bold text-charcoal mb-6 text-center">
        Create Account
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
                type="text"
                label="Full Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                type="tel"
                label="Phone Number"
                placeholder="+91 1234567890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                type="text"
                label="Location"
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-charcoal-light">
                  I agree to the{' '}
                  <a href="#" className="text-saffron hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <Button
                fullWidth
                onClick={handlePhoneRegister}
                disabled={loading || !formData.name || !formData.phone}
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
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                maxLength={6}
              />
              <Button
                fullWidth
                onClick={handleVerifyOtp}
                disabled={loading || formData.otp.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify & Register'}
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
          <div className="flex items-start space-x-2 mb-4">
            <input
              type="checkbox"
              id="terms-google"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms-google" className="text-sm text-charcoal-light">
              I agree to the{' '}
              <a href="#" className="text-saffron hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>

          <Button
            fullWidth
            variant="outline"
            onClick={handleGoogleRegister}
            disabled={loading}
          >
            <Mail className="w-5 h-5 inline mr-2" />
            {loading ? 'Connecting...' : 'Continue with Google'}
          </Button>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-charcoal-light">
          Already have an account?{' '}
          <Link to="/login" className="text-saffron font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </Card>
  )
}

export default Register
