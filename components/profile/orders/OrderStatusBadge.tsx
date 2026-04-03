// components/orders/OrderStatusBadge.tsx
import React from 'react'
import { View, Text } from 'react-native'
import type { OrderStatus } from '@/services/hooks/profile/useOrders'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

const STATUS_STYLES: Record<
  OrderStatus,
  { bg: string; text: string; label: string }
> = {
  Completed:       { bg: '#DCFCE7', text: '#16A34A', label: 'Completed'      },
  Active:          { bg: '#DBEAFE', text: '#2563EB', label: 'Active'          },
  'Pick Up Ready': { bg: '#D1FAE5', text: '#059669', label: 'Pick Up Ready'  },
  'On Hold':       { bg: '#FEF9C3', text: '#CA8A04', label: 'On Hold'         },
  Cancelled:       { bg: '#FFE4E6', text: '#E11D48', label: 'Cancelled'       },
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const s = STATUS_STYLES[status]
  return (
    <View className="px-3 py-1 rounded-full" style={{ backgroundColor: s.bg }}>
      <Text className="text-xs font-semibold" style={{ color: s.text }}>
        {s.label}
      </Text>
    </View>
  )
}

export default OrderStatusBadge