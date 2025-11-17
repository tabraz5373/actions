import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Video, MapPin, Search, Filter } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

const Consultations = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'online' | 'offline'>('all')

  const consultants = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      photo: 'https://i.pravatar.cc/150?img=12',
      experience: 15,
      rating: 4.8,
      reviewCount: 234,
      specializations: ['Residential', 'Commercial', 'Industrial'],
      qualifications: ['PhD in Vastu Shastra', 'Certified Consultant'],
      priceOnline: 999,
      priceOffline: 1999,
      languages: ['English', 'Hindi', 'Tamil'],
      location: 'Mumbai, Maharashtra',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      photo: 'https://i.pravatar.cc/150?img=45',
      experience: 10,
      rating: 4.9,
      reviewCount: 189,
      specializations: ['Residential', 'Remedial Solutions'],
      qualifications: ['Master in Vastu', 'Feng Shui Expert'],
      priceOnline: 799,
      priceOffline: 1499,
      languages: ['English', 'Hindi'],
      location: 'Delhi, NCR',
    },
    {
      id: '3',
      name: 'Amit Patel',
      photo: 'https://i.pravatar.cc/150?img=33',
      experience: 12,
      rating: 4.7,
      reviewCount: 156,
      specializations: ['Commercial', 'Industrial', 'Plot Selection'],
      qualifications: ['Vastu Acharya', 'Astrology Expert'],
      priceOnline: 899,
      priceOffline: 1699,
      languages: ['English', 'Hindi', 'Gujarati'],
      location: 'Ahmedabad, Gujarat',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-poppins font-bold text-charcoal mb-6">
        Vastu Consultants
      </h1>

      {/* Search and Filter */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by name, specialization, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-saffron text-white'
                  : 'bg-cream text-charcoal'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('online')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'online'
                  ? 'bg-saffron text-white'
                  : 'bg-cream text-charcoal'
              }`}
            >
              Online
            </button>
            <button
              onClick={() => setFilterType('offline')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'offline'
                  ? 'bg-saffron text-white'
                  : 'bg-cream text-charcoal'
              }`}
            >
              Offline
            </button>
          </div>
        </div>
      </Card>

      {/* Consultants Grid */}
      <div className="space-y-6">
        {consultants.map((consultant) => (
          <Card key={consultant.id} hover onClick={() => navigate(`/consultant/${consultant.id}`)}>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={consultant.photo}
                alt={consultant.name}
                className="w-32 h-32 rounded-lg object-cover"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-poppins font-bold text-charcoal">
                      {consultant.name}
                    </h3>
                    <p className="text-charcoal-light flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {consultant.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-bold">{consultant.rating}</span>
                    <span className="text-charcoal-light text-sm">
                      ({consultant.reviewCount})
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-charcoal-light mb-1">
                    {consultant.experience} years experience
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {consultant.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-cream px-3 py-1 rounded-full text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div>
                    <p className="text-sm text-charcoal-light">Online</p>
                    <p className="text-xl font-bold text-saffron">
                      ₹{consultant.priceOnline}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-light">Offline</p>
                    <p className="text-xl font-bold text-emerald">
                      ₹{consultant.priceOffline}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/book/${consultant.id}?type=online`)
                      }}
                    >
                      <Video className="w-4 h-4 mr-1" />
                      Book Online
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/book/${consultant.id}?type=offline`)
                      }}
                    >
                      Book Offline
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Consultations
