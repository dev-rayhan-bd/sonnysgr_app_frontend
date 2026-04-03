// hooks/orders/useOrders.ts
import { useState, useMemo } from 'react'
import type { FilterState } from './useOrderFilter'

// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus = 'Completed' | 'Active' | 'Pick Up Ready' | 'On Hold' | 'Cancelled'
export type OrderFilter = 'All' | 'Completed' | 'Active' | 'Pick Up Ready' | 'Holds' | 'Cancelled'
export type OrderGroup  = string

export interface Order {
  id: string
  sneakerName: string
  size: string
  gender: string
  store: string
  date: string
  price: number
  status: OrderStatus
  imageColor: string
  group: OrderGroup
  pickupDeadline?: string
  sortDate: number   // unix ms for sort
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    sneakerName: "Air Jordan 4 'Black Cat'",
    size: '10.5', gender: "Men's", store: 'Kicks City',
    date: 'Mar 21', price: 220, status: 'Completed',
    imageColor: '#CBD5E1', group: 'THIS WEEK',
    sortDate: new Date('2024-03-21').getTime(),
  },
  {
    id: '2',
    sneakerName: "Nike Dunk Low 'Panda'",
    size: '10.5', gender: "Men's", store: "Sonny's Kicks",
    date: 'Mar 23', price: 110, status: 'Pick Up Ready',
    imageColor: '#93C5FD', group: 'THIS WEEK',
    sortDate: new Date('2024-03-23').getTime(),
    pickupDeadline: 'Pickup by Today, 6:00 PM',
  },
  {
    id: '3',
    sneakerName: 'Yeezy Boost 350 V2',
    size: '11', gender: "Men's", store: 'Sneaker Haven',
    date: 'Mar 20', price: 230, status: 'On Hold',
    imageColor: '#FCD34D', group: 'THIS WEEK',
    sortDate: new Date('2024-03-20').getTime(),
  },
  {
    id: '4',
    sneakerName: 'New Balance 550',
    size: '10.5', gender: "Men's", store: 'Urban Sole',
    date: 'Mar 18', price: 130, status: 'Cancelled',
    imageColor: '#FCA5A5', group: 'THIS WEEK',
    sortDate: new Date('2024-03-18').getTime(),
  },
  {
    id: '5',
    sneakerName: "Air Jordan 1 'Chicago'",
    size: '10.5', gender: "Men's", store: 'Kicks City',
    date: 'Mar 5', price: 280, status: 'Completed',
    imageColor: '#FCA5A5', group: 'MARCH 2024',
    sortDate: new Date('2024-03-05').getTime(),
  },
  {
    id: '6',
    sneakerName: 'Adidas Forum Low',
    size: '10', gender: "Men's", store: "Sonny's Kicks",
    date: 'Mar 10', price: 95, status: 'Completed',
    imageColor: '#6EE7B7', group: 'MARCH 2024',
    sortDate: new Date('2024-03-10').getTime(),
  },
    {
    id: '7',
    sneakerName: 'Yeezy Boost 350 V2',
    size: '11', gender: "Men's", store: 'Sneaker Haven',
    date: 'Mar 20', price: 230, status: 'Active',
    imageColor: '#FCD34D', group: 'THIS WEEK',
    sortDate: new Date('2024-03-20').getTime(),
  },
]

const TAB_FILTER_MAP: Record<OrderFilter, OrderStatus[]> = {
  All:              ['Completed', 'Active', 'Pick Up Ready', 'On Hold', 'Cancelled'],
  Completed:        ['Completed'],
  Active:           ['Active'],
  'Pick Up Ready':  ['Pick Up Ready'],
  Holds:            ['On Hold'],
  Cancelled:        ['Cancelled'],
}
// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useOrders = (appliedFilter?: FilterState) => {
  const [orders]          = useState<Order[]>(MOCK_ORDERS)
  const [activeTab, setActiveTab] = useState<OrderFilter>('All')

  const processed = useMemo(() => {
    let result = [...orders]

    // 1. Tab filter
    const tabStatuses = TAB_FILTER_MAP[activeTab]
    result = result.filter(o => tabStatuses.includes(o.status))

    // 2. Sort
    if (appliedFilter) {
      switch (appliedFilter.sort) {
        case 'Oldest':
          result.sort((a, b) => a.sortDate - b.sortDate)
          break
        case 'Price: Low to High':
          result.sort((a, b) => a.price - b.price)
          break
        case 'Price: High to Low':
          result.sort((a, b) => b.price - a.price)
          break
        default: // Newest
          result.sort((a, b) => b.sortDate - a.sortDate)
      }
    }

    return result
  }, [orders, activeTab, appliedFilter])

  // Group into ordered sections
  const grouped = useMemo(() => {
    const groupOrder = ['THIS WEEK', 'MARCH 2024']
    const map: Record<string, Order[]> = {}
    processed.forEach(o => {
      if (!map[o.group]) map[o.group] = []
      map[o.group].push(o)
    })
    return groupOrder
      .filter(g => map[g]?.length > 0)
      .map(g => ({ group: g, items: map[g] }))
  }, [processed])

  return {
    grouped,
    activeTab,
    setActiveTab,
  }
}