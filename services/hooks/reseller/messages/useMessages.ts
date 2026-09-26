import { useState } from 'react'
import type { ProductType } from '@/types/catalog'

export const useMessages = () => {
  const [chats, setChats] = useState([
    {
      id: '1',
      storeName: 'Kicks City',
      lastMessage: 'What is the best you can do on the AJ4?',
      time: '5m',
      unreadCount: 2,
      isOnline: true,
      role: 'Selling' as const,
      itemContext: {
        name: "Air Jordan 4 'Black Cat'",
        size: '10',
        offer: '$220 offer',
        productType: 'Sneakers' as ProductType,
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=100',
        status: 'Offer Sent',
      },
    },
    {
      id: '2',
      storeName: 'Union Archive',
      lastMessage: 'Deal confirmed. When can we pick up...',
      time: '1h',
      unreadCount: 0,
      isOnline: false,
      role: 'Selling' as const,
      itemContext: {
        name: 'Stussy Varsity Jacket',
        size: 'L',
        offer: '$225 offer',
        productType: 'Clothing' as ProductType,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100',
        status: 'Deal Accepted',
      },
    },
    {
      id: '3',
      storeName: 'Archive Room',
      lastMessage: 'Can you send more photos of the wash tag...',
      time: '2h',
      unreadCount: 1,
      isOnline: true,
      role: 'Selling' as const,
      itemContext: {
        name: 'Nike Sportswear Club Tee',
        size: 'M',
        offer: '$32 offer',
        productType: 'Clothing' as ProductType,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100',
        status: 'Negotiating',
      },
    },
    {
      id: '4',
      storeName: 'Detroit Threads',
      lastMessage: 'Are these still available?',
      time: '4h',
      unreadCount: 0,
      isOnline: false,
      role: 'Buying' as const,
      itemContext: {
        name: 'Yeezy Slide - Onyx',
        size: '10',
        offer: '$50 offer',
        productType: 'Sneakers' as ProductType,
        image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=100',
        status: 'Offer Sent',
      },
    },
    {
      id: '5',
      storeName: 'Sole Traders',
      lastMessage: 'Can you do $180?',
      time: '6h',
      unreadCount: 0,
      isOnline: false,
      role: 'Buying' as const,
      itemContext: {
        name: 'Essentials Hoodie',
        size: 'L',
        offer: '$180 offer',
        productType: 'Clothing' as ProductType,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100',
        status: 'Negotiating',
      },
    },
  ])

  const unreadTotal = chats.filter((chat) => chat.unreadCount > 0).length

  const toggleRead = (chatId: string) => {
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unreadCount: c.unreadCount > 0 ? 0 : 1 } : c))
    )
  }

  const archiveChat = (chatId: string) => {
    setChats((prev) => prev.filter((c) => c.id !== chatId))
  }

  const muteChat = (chatId: string) => {
    // Placeholder — wire up to a real "muted" flag once backend support exists
    setChats((prev) => [...prev])
  }

  return { chats, unreadTotal, toggleRead, archiveChat, muteChat }
}