import { useEffect, useState } from 'react'
import type { ProductType } from '@/types/catalog'

export interface DashboardRequest {
  id: string
  storeName: string
  rating: number
  item: string
  size: string
  condition: string
  price: number
  time: string
  productType: ProductType
}

export interface DashboardActivity {
  id: string
  type: 'request' | 'counter' | 'deal'
  message: string
  time: string
  color: string
}

export const useDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [stats] = useState({
    activeListings: 18,
    storeRequests: 6,
    dealsActive: 4,
    revenue: 5120,
  })

  const [requests] = useState<DashboardRequest[]>([
    {
      id: '1',
      storeName: 'Kicks City',
      rating: 4.8,
      item: "Air Jordan 4 'Black Cat'",
      size: '10.5',
      condition: 'Deadstock',
      price: 185,
      time: '5 min ago',
      productType: 'Sneakers',
    },
    {
      id: '2',
      storeName: 'Union Archive',
      rating: 4.9,
      item: 'Essentials Pullover Hoodie',
      size: 'L',
      condition: 'Near Deadstock',
      price: 88,
      time: '12 min ago',
      productType: 'Clothing',
    },
    {
      id: '3',
      storeName: 'Sole House',
      rating: 4.7,
      item: 'Stussy Varsity Jacket',
      size: 'XL',
      condition: 'Very Good',
      price: 210,
      time: '28 min ago',
      productType: 'Clothing',
    },
    {
      id: '4',
      storeName: 'Urban Sole',
      rating: 4.6,
      item: 'New Balance 550',
      size: '10',
      condition: 'Deadstock',
      price: 96,
      time: '45 min ago',
      productType: 'Sneakers',
    },
  ])

  const [activities] = useState<DashboardActivity[]>([
    {
      id: '1',
      type: 'request',
      message: 'Union Archive requested your Essentials hoodie listing.',
      time: '8 min ago',
      color: '#4ADE80',
    },
    {
      id: '2',
      type: 'counter',
      message: 'You countered $210 to Sole House for the varsity jacket.',
      time: '1 hr ago',
      color: '#FB923C',
    },
    {
      id: '3',
      type: 'deal',
      message: 'Deal confirmed: Nike Dunk Low sold for $155.',
      time: '3 hrs ago',
      color: '#60A5FA',
    },
  ])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  return { stats, requests, activities, loading }
}
