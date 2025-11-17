import { useNavigate } from 'react-router-dom'
import { Compass, Video, Calendar, ShoppingBag, Star, ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Home = () => {
  const navigate = useNavigate()

  const services = [
    {
      icon: Video,
      title: 'Online Consultation',
      description: 'Connect with experts via video call',
      color: 'bg-saffron',
      path: '/consultations',
    },
    {
      icon: Calendar,
      title: 'Book Consultation',
      description: 'Schedule in-person visit',
      color: 'bg-emerald',
      path: '/consultations',
    },
    {
      icon: ShoppingBag,
      title: 'Vastu Products',
      description: 'Browse remedial items',
      color: 'bg-purple',
      path: '/products',
    },
  ]

  const featuredConsultants = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      photo: 'https://i.pravatar.cc/150?img=12',
      experience: 15,
      rating: 4.8,
      specialization: 'Residential Vastu',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      photo: 'https://i.pravatar.cc/150?img=45',
      experience: 10,
      rating: 4.9,
      specialization: 'Commercial Vastu',
    },
    {
      id: '3',
      name: 'Amit Patel',
      photo: 'https://i.pravatar.cc/150?img=33',
      experience: 12,
      rating: 4.7,
      specialization: 'Industrial Vastu',
    },
  ]

  const testimonials = [
    {
      name: 'Sunita Reddy',
      text: 'VastuWise transformed my home! The analysis was spot-on and the remedies really worked.',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      text: 'Professional consultants and easy-to-understand reports. Highly recommended!',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-vastu text-white py-16 px-4 sacred-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 animate-fade-in">
            Transform Your Space with Ancient Wisdom
          </h1>
          <p className="text-xl mb-8 font-crimson animate-fade-in">
            Get instant Vastu analysis and expert guidance
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/free-analysis')}
            className="bg-white text-saffron hover:bg-cream animate-slide-up"
          >
            <Compass className="w-5 h-5 inline mr-2" />
            Get Free Vastu Analysis
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                hover
                onClick={() => navigate(service.path)}
                className="text-center"
              >
                <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-charcoal-light">{service.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Featured Consultants */}
      <section className="bg-cream-dark py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-poppins font-bold text-charcoal">
              Featured Consultants
            </h2>
            <button
              onClick={() => navigate('/consultations')}
              className="text-saffron font-semibold hover:underline flex items-center"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredConsultants.map((consultant) => (
              <Card
                key={consultant.id}
                hover
                onClick={() => navigate(`/consultant/${consultant.id}`)}
              >
                <img
                  src={consultant.photo}
                  alt={consultant.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-poppins font-semibold text-center mb-2">
                  {consultant.name}
                </h3>
                <p className="text-charcoal-light text-center mb-2">
                  {consultant.specialization}
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    {consultant.rating}
                  </span>
                  <span className="text-charcoal-light">
                    {consultant.experience} years exp.
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-poppins font-bold text-charcoal mb-8 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-charcoal-light mb-4 italic">
                "{testimonial.text}"
              </p>
              <p className="font-semibold text-charcoal">- {testimonial.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-vastu text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-poppins font-bold mb-4">
          Ready to Transform Your Space?
        </h2>
        <p className="text-xl mb-8 font-crimson">
          Start your Vastu journey today
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/free-analysis')}
          className="bg-white text-saffron hover:bg-cream"
        >
          Get Started Now
        </Button>
      </section>
    </div>
  )
}

export default Home
