import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, Home, Building2, HelpCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

const FreeAnalysis = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential')
  const [propertySize, setPropertySize] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile)
      } else {
        alert('Please upload a PDF file')
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
      } else {
        alert('Please upload a PDF file')
      }
    }
  }

  const handleStartAnalysis = async () => {
    if (!file || !propertySize) {
      alert('Please upload a floor plan and enter property size')
      return
    }

    setUploading(true)

    // Simulate upload and processing
    setTimeout(() => {
      // In production, this would upload to Supabase Storage
      const analysisId = 'demo-' + Date.now()
      navigate(`/analysis/${analysisId}`)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-poppins font-bold text-charcoal mb-4">
          Free Vastu Analysis
        </h1>
        <p className="text-lg text-charcoal-light">
          Upload your property floor plan and get instant Vastu insights
        </p>
      </div>

      <Card className="mb-6">
        <h2 className="text-xl font-poppins font-semibold mb-4">
          Upload Floor Plan
        </h2>

        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-saffron bg-saffron/10'
              : 'border-gray-300 hover:border-saffron'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="space-y-4">
              <FileText className="w-16 h-16 text-saffron mx-auto" />
              <div>
                <p className="font-semibold text-charcoal">{file.name}</p>
                <p className="text-sm text-charcoal-light">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFile(null)}
              >
                Remove File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-16 h-16 text-charcoal-light mx-auto" />
              <div>
                <p className="text-lg font-semibold text-charcoal mb-2">
                  Drag and drop your floor plan here
                </p>
                <p className="text-sm text-charcoal-light mb-4">
                  or click to browse (PDF only)
                </p>
              </div>
              <label className="inline-block">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="btn-primary cursor-pointer inline-block">
                  Choose File
                </span>
              </label>
            </div>
          )}
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-poppins font-semibold mb-4">
          Property Details
        </h2>

        <div className="space-y-4">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Property Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPropertyType('residential')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  propertyType === 'residential'
                    ? 'border-saffron bg-saffron/10'
                    : 'border-gray-300 hover:border-saffron'
                }`}
              >
                <Home className="w-8 h-8 mx-auto mb-2 text-saffron" />
                <p className="font-semibold">Residential</p>
              </button>
              <button
                onClick={() => setPropertyType('commercial')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  propertyType === 'commercial'
                    ? 'border-saffron bg-saffron/10'
                    : 'border-gray-300 hover:border-saffron'
                }`}
              >
                <Building2 className="w-8 h-8 mx-auto mb-2 text-saffron" />
                <p className="font-semibold">Commercial</p>
              </button>
            </div>
          </div>

          {/* Property Size */}
          <Input
            type="number"
            label="Property Size (sq. ft.)"
            placeholder="e.g., 1500"
            value={propertySize}
            onChange={(e) => setPropertySize(e.target.value)}
          />
        </div>
      </Card>

      <Button
        fullWidth
        size="lg"
        onClick={handleStartAnalysis}
        disabled={!file || !propertySize || uploading}
      >
        {uploading ? (
          <>
            <div className="spinner inline-block w-5 h-5 mr-2"></div>
            Processing...
          </>
        ) : (
          'Start Analysis'
        )}
      </Button>

      {/* Help Section */}
      <Card className="mt-6 bg-cream-dark">
        <div className="flex items-start space-x-3">
          <HelpCircle className="w-6 h-6 text-saffron flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-charcoal mb-2">
              Need help with your floor plan?
            </h3>
            <ul className="text-sm text-charcoal-light space-y-1">
              <li>• Ensure your floor plan is in PDF format</li>
              <li>• Include all rooms and their dimensions</li>
              <li>• Mark the main entrance clearly</li>
              <li>• File size should be under 10MB</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Upload History */}
      <div className="mt-8">
        <h2 className="text-xl font-poppins font-semibold mb-4">
          Recent Analyses
        </h2>
        <div className="space-y-3">
          {[1, 2].map((item) => (
            <Card key={item} hover onClick={() => navigate(`/results/${item}`)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-saffron" />
                  <div>
                    <p className="font-semibold">Analysis #{item}</p>
                    <p className="text-sm text-charcoal-light">
                      Completed 2 days ago
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FreeAnalysis
