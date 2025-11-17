import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Compass, ZoomIn, ZoomOut, RotateCw, Save } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const AnalysisInterface = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [northDirection, setNorthDirection] = useState(0)
  const [overlayOpacity, setOverlayOpacity] = useState(0.5)
  const [zoom, setZoom] = useState(1)
  const [analyzing, setAnalyzing] = useState(false)

  // Vastu Chakra 32 zones
  const vastuZones = [
    { id: 1, name: 'North-East (Ishanya)', angle: 0, color: '#FFD700' },
    { id: 2, name: 'North', angle: 11.25, color: '#87CEEB' },
    { id: 3, name: 'North', angle: 22.5, color: '#87CEEB' },
    { id: 4, name: 'North', angle: 33.75, color: '#87CEEB' },
    { id: 5, name: 'North-West', angle: 45, color: '#DDA0DD' },
    { id: 6, name: 'North-West', angle: 56.25, color: '#DDA0DD' },
    { id: 7, name: 'West', angle: 67.5, color: '#F0E68C' },
    { id: 8, name: 'West', angle: 78.75, color: '#F0E68C' },
    { id: 9, name: 'West', angle: 90, color: '#F0E68C' },
    { id: 10, name: 'West', angle: 101.25, color: '#F0E68C' },
    { id: 11, name: 'South-West', angle: 112.5, color: '#CD853F' },
    { id: 12, name: 'South-West', angle: 123.75, color: '#CD853F' },
    { id: 13, name: 'South-West', angle: 135, color: '#CD853F' },
    { id: 14, name: 'South-West', angle: 146.25, color: '#CD853F' },
    { id: 15, name: 'South', angle: 157.5, color: '#FF6347' },
    { id: 16, name: 'South', angle: 168.75, color: '#FF6347' },
    { id: 17, name: 'South', angle: 180, color: '#FF6347' },
    { id: 18, name: 'South', angle: 191.25, color: '#FF6347' },
    { id: 19, name: 'South-East', angle: 202.5, color: '#FF8C00' },
    { id: 20, name: 'South-East', angle: 213.75, color: '#FF8C00' },
    { id: 21, name: 'South-East', angle: 225, color: '#FF8C00' },
    { id: 22, name: 'East', angle: 236.25, color: '#98FB98' },
    { id: 23, name: 'East', angle: 247.5, color: '#98FB98' },
    { id: 24, name: 'East', angle: 258.75, color: '#98FB98' },
    { id: 25, name: 'East', angle: 270, color: '#98FB98' },
    { id: 26, name: 'East', angle: 281.25, color: '#98FB98' },
    { id: 27, name: 'North-East', angle: 292.5, color: '#FFD700' },
    { id: 28, name: 'North-East', angle: 303.75, color: '#FFD700' },
    { id: 29, name: 'North-East', angle: 315, color: '#FFD700' },
    { id: 30, name: 'North-East', angle: 326.25, color: '#FFD700' },
    { id: 31, name: 'North', angle: 337.5, color: '#87CEEB' },
    { id: 32, name: 'North', angle: 348.75, color: '#87CEEB' },
  ]

  useEffect(() => {
    drawVastuChakra()
  }, [northDirection, overlayOpacity, zoom])

  const drawVastuChakra = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw sample floor plan (placeholder)
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100)
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 2
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100)

    // Draw rooms (placeholder)
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 1
    ctx.strokeRect(100, 100, 200, 150)
    ctx.strokeRect(300, 100, 150, 150)
    ctx.strokeRect(100, 250, 150, 100)
    ctx.strokeRect(250, 250, 200, 100)

    // Draw Vastu Chakra overlay
    ctx.globalAlpha = overlayOpacity
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((northDirection * Math.PI) / 180)

    vastuZones.forEach((zone) => {
      const startAngle = ((zone.angle - 5.625) * Math.PI) / 180
      const endAngle = ((zone.angle + 5.625) * Math.PI) / 180

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, radius, startAngle, endAngle)
      ctx.closePath()

      ctx.fillStyle = zone.color
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(0, 0, 30, 0, 2 * Math.PI)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw compass directions
    ctx.globalAlpha = 1
    ctx.font = 'bold 16px Arial'
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.fillText('N', 0, -radius - 10)
    ctx.fillText('S', 0, radius + 20)
    ctx.fillText('E', radius + 15, 5)
    ctx.fillText('W', -radius - 15, 5)

    ctx.restore()
    ctx.globalAlpha = 1
  }

  const handleProceedAnalysis = () => {
    setAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      navigate(`/results/${id}`)
    }, 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-poppins font-bold text-charcoal mb-2">
          Vastu Chakra Alignment
        </h1>
        <p className="text-charcoal-light">
          Align the Vastu Chakra with your property's north direction
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Area */}
        <div className="lg:col-span-2">
          <Card>
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="w-full border border-gray-200 rounded-lg"
            />

            {/* Controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="p-2 hover:bg-cream rounded-lg transition-colors"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  className="p-2 hover:bg-cream rounded-lg transition-colors"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>

              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-poppins font-semibold mb-4 flex items-center">
              <Compass className="w-5 h-5 mr-2 text-saffron" />
              North Direction
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Rotate Chakra: {northDirection}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={northDirection}
                  onChange={(e) => setNorthDirection(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setNorthDirection(0)}
                  className="btn-outline py-2 px-3 text-sm"
                >
                  N
                </button>
                <button
                  onClick={() => setNorthDirection(90)}
                  className="btn-outline py-2 px-3 text-sm"
                >
                  E
                </button>
                <button
                  onClick={() => setNorthDirection(180)}
                  className="btn-outline py-2 px-3 text-sm"
                >
                  S
                </button>
                <button
                  onClick={() => setNorthDirection(270)}
                  className="btn-outline py-2 px-3 text-sm"
                >
                  W
                </button>
              </div>

              <button
                onClick={() => setNorthDirection((northDirection + 45) % 360)}
                className="w-full btn-outline flex items-center justify-center"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Rotate 45°
              </button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-poppins font-semibold mb-4">
              Overlay Opacity
            </h3>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-charcoal-light mt-2">
              {Math.round(overlayOpacity * 100)}%
            </p>
          </Card>

          <Card className="bg-cream-dark">
            <h3 className="text-lg font-poppins font-semibold mb-2">
              Instructions
            </h3>
            <ul className="text-sm text-charcoal-light space-y-2">
              <li>1. Identify north direction on your floor plan</li>
              <li>2. Rotate the Vastu Chakra to align with north</li>
              <li>3. Adjust opacity to see both layers clearly</li>
              <li>4. Click "Proceed with Analysis" when ready</li>
            </ul>
          </Card>

          <Button
            fullWidth
            size="lg"
            onClick={handleProceedAnalysis}
            disabled={analyzing}
          >
            {analyzing ? (
              <>
                <div className="spinner inline-block w-5 h-5 mr-2"></div>
                Analyzing...
              </>
            ) : (
              'Proceed with Analysis'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AnalysisInterface
