import { useMemo, useState } from 'react'
import type { FilterState } from './useOrderFilter'
import type { Audience, ProductType } from '@/types/catalog'

export type OrderStatus = 'Completed' | 'Active' | 'Pick Up Ready' | 'On Hold' | 'Cancelled'
export type OrderFilter = 'All' | 'Completed' | 'Active' | 'Pick Up Ready' | 'Holds' | 'Cancelled'
export type OrderGroup = string

export interface Order {
  id: string
  productName: string
  productType: ProductType
  brand: string
  size: string
  audience: Audience
  store: string
  date: string
  price: number
  status: OrderStatus
  imageColor: string
  group: OrderGroup
  pickupDeadline?: string
  sortDate: number
}

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    productName: "Air Jordan 4 'Black Cat'",
    productType: 'Sneakers',
    brand: 'Jordan',
    size: '10.5',
    audience: "Men's",
    store: 'Kicks City',
    date: 'Mar 21',
    price: 220,
    status: 'Completed',
    imageColor: '#CBD5E1',
    group: 'THIS WEEK',
    sortDate: new Date('2024-03-21').getTime(),
  },
  {
    id: '2',
    productName: 'Essentials Pullover Hoodie',
    productType: 'Clothing',
    brand: 'Essentials',
    size: 'L',
    audience: "Men's",
    store: "Sonny's Kicks",
    date: 'Mar 23',
    price: 120,
    status: 'Pick Up Ready',
    imageColor: '#93C5FD',
    group: 'THIS WEEK',
    sortDate: new Date('2024-03-23').getTime(),
    pickupDeadline: 'Pickup by Today, 6:00 PM',
  },
  {
    id: '3',
    productName: 'Stussy Varsity Jacket',
    productType: 'Clothing',
    brand: 'Stussy',
    size: 'M',
    audience: 'Unisex',
    store: 'Sneaker Haven',
    date: 'Mar 20',
    price: 320,
    status: 'On Hold',
    imageColor: '#FCD34D',
    group: 'THIS WEEK',
    sortDate: new Date('2024-03-20').getTime(),
  },
  {
    id: '4',
    productName: 'New Balance 550',
    productType: 'Sneakers',
    brand: 'New Balance',
    size: '10.5',
    audience: "Women's",
    store: 'Urban Sole',
    date: 'Mar 18',
    price: 130,
    status: 'Cancelled',
    imageColor: '#FCA5A5',
    group: 'THIS WEEK',
    sortDate: new Date('2024-03-18').getTime(),
  },
  {
    id: '5',
    productName: 'Nike Sportswear Club Tee',
    productType: 'Clothing',
    brand: 'Nike',
    size: 'S',
    audience: "Women's",
    store: 'Kicks City',
    date: 'Mar 5',
    price: 45,
    status: 'Completed',
    imageColor: '#BFDBFE',
    group: 'MARCH 2024',
    sortDate: new Date('2024-03-05').getTime(),
  },
  {
    id: '6',
    productName: 'Adidas Forum Low',
    productType: 'Sneakers',
    brand: 'Adidas',
    size: '10',
    audience: "Men's",
    store: "Sonny's Kicks",
    date: 'Mar 10',
    price: 95,
    status: 'Completed',
    imageColor: '#6EE7B7',
    group: 'MARCH 2024',
    sortDate: new Date('2024-03-10').getTime(),
  },
  {
    id: '7',
    productName: 'Fear of God Track Pant',
    productType: 'Clothing',
    brand: 'Fear of God',
    size: 'Kids L',
    audience: "Kids'",
    store: 'Sneaker Haven',
    date: 'Mar 20',
    price: 98,
    status: 'Active',
    imageColor: '#DDD6FE',
    group: 'THIS WEEK',
    sortDate: new Date('2024-03-20').getTime(),
  },
]

const TAB_FILTER_MAP: Record<OrderFilter, OrderStatus[]> = {
  All: ['Completed', 'Active', 'Pick Up Ready', 'On Hold', 'Cancelled'],
  Completed: ['Completed'],
  Active: ['Active'],
  'Pick Up Ready': ['Pick Up Ready'],
  Holds: ['On Hold'],
  Cancelled: ['Cancelled'],
}

export const useOrders = (appliedFilter?: FilterState) => {
  const [orders] = useState<Order[]>(MOCK_ORDERS)
  const [activeTab, setActiveTab] = useState<OrderFilter>('All')

  const processed = useMemo(() => {
    let result = [...orders]

    const tabStatuses = TAB_FILTER_MAP[activeTab]
    result = result.filter((order) => tabStatuses.includes(order.status))

    if (appliedFilter?.category && appliedFilter.category !== 'All') {
      result = result.filter((order) => order.productType === appliedFilter.category)
    }

    switch (appliedFilter?.sort) {
      case 'Oldest':
        result = [...result].sort((a, b) => a.sortDate - b.sortDate)
        break
      case 'Price: Low to High':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'Price: High to Low':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      default:
        result = [...result].sort((a, b) => b.sortDate - a.sortDate)
        break
    }

    return result
  }, [orders, activeTab, appliedFilter])

  const grouped = useMemo(() => {
    const groupOrder = ['THIS WEEK', 'MARCH 2024']
    const groupedOrders: Record<string, Order[]> = {}

    processed.forEach((order) => {
      if (!groupedOrders[order.group]) {
        groupedOrders[order.group] = []
      }

      groupedOrders[order.group].push(order)
    })

    return groupOrder
      .filter((group) => groupedOrders[group]?.length > 0)
      .map((group) => ({ group, items: groupedOrders[group] }))
  }, [processed])

  return {
    grouped,
    activeTab,
    setActiveTab,
  }
}
