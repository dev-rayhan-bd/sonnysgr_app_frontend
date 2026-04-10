import { useState } from 'react'
import type { ProductType } from '@/types/catalog'

export const useMessages = () => {
  const [chats] = useState([
    {
      id: '1',
      storeName: 'Kicks City',
      lastMessage: 'What is the best you can do on the AJ4 and hoodie bundle?',
      time: '5m',
      unreadCount: 2,
      isOnline: true,
      itemContext: {
        name: "Air Jordan 4 'Black Cat'",
        offer: '$220 offer',
        productType: 'Sneakers' as ProductType,
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=100',
      },
    },
    {
      id: '2',
      storeName: 'Union Archive',
      lastMessage: 'Deal confirmed. When can we pick up the varsity jacket?',
      time: '1h',
      unreadCount: 0,
      isOnline: false,
      itemContext: {
        name: 'Stussy Varsity Jacket',
        offer: '$225 offer',
        productType: 'Clothing' as ProductType,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100',
      },
    },
    {
      id: '3',
      storeName: 'Archive Room',
      lastMessage: 'Can you send more photos of the wash tag on the tee?',
      time: '2h',
      unreadCount: 1,
      isOnline: true,
      itemContext: {
        name: 'Nike Sportswear Club Tee',
        offer: '$32 offer',
        productType: 'Clothing' as ProductType,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100',
      },
    },
  ])

  const unreadTotal = chats.filter((chat) => chat.unreadCount > 0).length

  return { chats, unreadTotal }
}
