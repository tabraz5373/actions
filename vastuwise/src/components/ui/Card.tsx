import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

const Card = ({ children, className = '', hover = false, onClick }: CardProps) => {
  const hoverClass = hover ? 'hover:shadow-xl cursor-pointer transform hover:-translate-y-1' : ''
  
  return (
    <div
      className={`bg-white rounded-xl shadow-md transition-all duration-300 p-6 ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
