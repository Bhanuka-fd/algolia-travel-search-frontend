export interface Product {
  objectID: string
  productId: string
  name: string
  country: string
  duration: number
  theme: string
  rating: number
  basePrice: number
  departureCount: number
}

export interface Departure {
  objectID: string
  departureId: string
  productId: string
  productName: string
  startDate: string
  endDate: string
  price: number
  availability: number
  deal: boolean
}