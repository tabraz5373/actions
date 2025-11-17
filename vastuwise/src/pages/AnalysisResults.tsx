import { useNavigate, useParams } from 'react-router-dom'
import { AlertTriangle, CheckCircle, Download, Share2, ShoppingBag, Calendar } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const AnalysisResults = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const problems = [
    {
      id: 1,
      zone: 'South-West',
      severity: 'high' as const,
      title: 'Kitchen in South-West Zone',
      description: 'The kitchen is located in the South-West zone, which is governed by the Earth element and associated with stability.',
      impact: 'This placement may lead to financial instability, health issues, and family conflicts.',
      remedies: [
        'Relocate kitchen to South-East zone if possible',
        'Use yellow or earthy colors in the kitchen',
        'Place a Vastu pyramid in the South-West corner',
        'Keep the area well-lit and ventilated',
      ],
      affectedAreas: ['Finance', 'Health', 'Relationships'],
    },
    {
      id: 2,
      zone: 'North-East',
      severity: 'critical' as const,
      title: 'Toilet in North-East Zone',
      description: 'The toilet is positioned in the North-East zone, which is the most sacred direction in Vastu.',
      impact: 'This can block positive energy flow, affecting prosperity, health, and spiritual growth.',
      remedies: [
        'Keep the toilet door always closed',
        'Place a sea salt bowl to absorb negative energy',
        'Use light colors and keep it extremely clean',
        'Install an exhaust fan for proper ventilation',
      ],
      affectedAreas: ['Prosperity', 'Health', 'Spiritual Growth'],
    },
    {
      id: 3,
      zone: 'Main Entrance',
      severity: 'medium' as const,
      title: 'Main Door Facing South',
      description: 'The main entrance is facing South, which can bring in excessive heat energy.',
      impact: 'May cause increased expenses, conflicts, and health issues related to heat.',
      remedies: [
        'Place a Vastu pyramid above the door',
        'Use a bright nameplate',
        'Keep the entrance well-lit',
        'Place auspicious symbols like Swastik',
      ],
      affectedAreas: ['Finance', 'Peace'],
    },
  ]

  const severityConfig = {
    critical: { color: 'bg-red-500', text: 'text-red-500', label: 'Critical' },
    high: { color: 'bg-orange-500', text: 'text-orange-500', label: 'High' },
    medium: { color: 'bg-yellow-500', text: 'text-yellow-500', label: 'Medium' },
    low: { color: 'bg-green-500', text: 'text-green-500', label: 'Low' },
  }

  const recommendedProducts = [
    {
      id: 1,
      name: 'Vastu Pyramid',
      price: 499,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Himalayan Salt Lamp',
      price: 799,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Brass Swastik',
      price: 299,
      image: 'https://via.placeholder.com/150',
    },
  ]

  const handleDownloadReport = () => {
    // In production, this would generate and download a PDF
    alert('Report download will be implemented with jsPDF')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-poppins font-bold text-charcoal mb-2">
          Vastu Analysis Results
        </h1>
        <p className="text-charcoal-light">
          Analysis ID: {id}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-red-500 mb-2">3</div>
          <p className="text-sm text-charcoal-light">Issues Found</p>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-orange-500 mb-2">1</div>
          <p className="text-sm text-charcoal-light">Critical</p>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-yellow-500 mb-2">1</div>
          <p className="text-sm text-charcoal-light">High Priority</p>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-500 mb-2">12</div>
          <p className="text-sm text-charcoal-light">Remedies</p>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button onClick={handleDownloadReport}>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Problems List */}
      <div className="space-y-6 mb-8">
        <h2 className="text-2xl font-poppins font-bold text-charcoal">
          Identified Issues
        </h2>

        {problems.map((problem) => {
          const config = severityConfig[problem.severity]
          return (
            <Card key={problem.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`w-6 h-6 ${config.text} flex-shrink-0 mt-1`} />
                  <div>
                    <h3 className="text-xl font-poppins font-semibold mb-1">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-charcoal-light">
                      Zone: {problem.zone}
                    </p>
                  </div>
                </div>
                <span className={`${config.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                  {config.label}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Description</h4>
                  <p className="text-charcoal-light">{problem.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Impact</h4>
                  <p className="text-charcoal-light">{problem.impact}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Affected Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.affectedAreas.map((area, index) => (
                      <span
                        key={index}
                        className="bg-cream px-3 py-1 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Recommended Remedies</h4>
                  <ul className="space-y-2">
                    {problem.remedies.map((remedy, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                        <span className="text-charcoal-light">{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* CTA Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-saffron to-saffron-dark text-white">
          <h3 className="text-2xl font-poppins font-bold mb-2">
            Need Expert Guidance?
          </h3>
          <p className="mb-4 opacity-90">
            Book a consultation with certified Vastu experts for personalized solutions
          </p>
          <div className="space-y-2">
            <Button
              fullWidth
              className="bg-white text-saffron hover:bg-cream"
              onClick={() => navigate('/consultations')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Online Consultation
            </Button>
            <Button
              fullWidth
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/consultations')}
            >
              Book Offline Consultation
            </Button>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald to-emerald-dark text-white">
          <h3 className="text-2xl font-poppins font-bold mb-2">
            Vastu Remedial Products
          </h3>
          <p className="mb-4 opacity-90">
            Browse our curated collection of authentic Vastu products
          </p>
          <Button
            fullWidth
            className="bg-white text-emerald hover:bg-cream"
            onClick={() => navigate('/products')}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Browse Products
          </Button>
        </Card>
      </div>

      {/* Recommended Products */}
      <div>
        <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">
          Recommended Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedProducts.map((product) => (
            <Card key={product.id} hover onClick={() => navigate(`/product/${product.id}`)}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-charcoal mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-saffron">₹{product.price}</p>
              <Button fullWidth className="mt-4" size="sm">
                Add to Cart
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalysisResults
