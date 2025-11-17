export interface User {
  id: string
  email?: string
  phone?: string
  name?: string
  avatar?: string
  location?: string
  createdAt: string
}

export interface VastuAnalysis {
  id: string
  userId: string
  propertyType: 'residential' | 'commercial'
  propertySize: number
  floorPlanUrl: string
  northDirection: number
  problems: VastuProblem[]
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: string
  completedAt?: string
}

export interface VastuProblem {
  id: string
  zone: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  impact: string
  remedies: string[]
  affectedAreas: string[]
}

export interface Consultant {
  id: string
  name: string
  photo: string
  experience: number
  rating: number
  reviewCount: number
  specializations: string[]
  qualifications: string[]
  priceOnline: number
  priceOffline: number
  availability: TimeSlot[]
  bio: string
  languages: string[]
}

export interface TimeSlot {
  date: string
  slots: string[]
}

export interface Booking {
  id: string
  userId: string
  consultantId: string
  type: 'online' | 'offline'
  date: string
  time: string
  duration: number
  propertyDetails: string
  specialRequirements?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  price: number
  meetingLink?: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  vastuBenefits: string[]
  usageInstructions: string
  rating: number
  reviewCount: number
  inStock: boolean
  relatedZones: number[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Report {
  id: string
  analysisId: string
  userId: string
  title: string
  pdfUrl: string
  thumbnail: string
  propertyType: string
  createdAt: string
  status: 'draft' | 'final'
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'booking' | 'analysis' | 'order' | 'general'
  read: boolean
  createdAt: string
  actionUrl?: string
}

export interface VastuZone {
  id: number
  name: string
  direction: string
  element: string
  deity: string
  color: string
  activities: string[]
  description: string
}
