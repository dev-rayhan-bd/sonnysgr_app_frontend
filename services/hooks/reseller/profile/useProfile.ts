import { useState } from 'react'

export const useProfile = () => {
  const [user] = useState({
    username: 'marcus_archive',
    company: 'Marcus Reseller Co.',
    location: 'Miami, FL',
    isTrusted: true,
    stats: {
      dealsDone: 47,
      responseRate: 96,
      volumeSold: '18.4K',
      rating: 4.9,
    },
    bio: 'Selling sneakers, outerwear, and apparel for over 10 years. Fast responses, clean photos, and store-ready inventory.',
    inventoryCount: 16,
  })

  const items = [
    { id: '1', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200' },
    { id: '2', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200' },
    { id: '3', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200' },
  ]

  return { user, items }
}
