// components/profile/mysales/MySales.tsx
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useMySales, STATUS_COLOR, SaleItem } from '@/services/hooks/profile/useMySales'

interface MySalesProps {
  onSeeAll: () => void
}

const StatPill: React.FC<{ label: string; value: string | number; color?: string }> = ({
  label,
  value,
  color = '#111827',
}) => (
  <View className="flex-1 bg-gray-50 rounded-xl py-2.5 items-center">
    <Text className="text-sm font-extrabold" style={{ color }}>
      {value}
    </Text>
    <Text className="text-[10px] text-gray-400 mt-0.5 font-semibold">{label}</Text>
  </View>
)

const SaleRow: React.FC<{ item: SaleItem; isLast: boolean; onPress: () => void }> = ({
  item,
  isLast,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className={`flex-row items-center py-3 gap-3 ${
      !isLast ? 'border-b border-gray-100' : ''
    }`}
  >
    <View className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} className="w-full h-full" resizeMode="cover" />
      ) : (
        <View className="w-full h-full bg-gray-200" />
      )}
    </View>

    <View className="flex-1">
      <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5">
        Size {item.sizeLabel} · {item.productType}
      </Text>
    </View>

    <View className="items-end gap-1">
      <Text className="text-sm font-extrabold text-gray-900">${item.askingPrice}</Text>
      <View
        className="px-2 py-0.5 rounded-full"
        style={{ backgroundColor: `${STATUS_COLOR[item.status]}20` }}
      >
        <Text className="text-[10px] font-bold" style={{ color: STATUS_COLOR[item.status] }}>
          {item.status === 'Pending' ? 'Pending approval' : item.status}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

const MySales: React.FC<MySalesProps> = ({ onSeeAll }) => {
  const { sales, activeCount } = useMySales()
  const pendingCount = sales.filter((s) => s.status === 'Pending').length
  const soldCount = sales.filter((s) => s.status === 'Sold').length
  const preview = sales.slice(0, 2)

  return (
    <View
      className="bg-white rounded-2xl px-4 py-4 mb-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <View className="flex-row items-center justify-between mb-3.5">
        <Text className="text-base font-extrabold text-gray-900">My selling</Text>
        <TouchableOpacity onPress={onSeeAll} className="flex-row items-center gap-0.5">
          <Text className="text-xs font-bold text-green-600">View all</Text>
          <Feather name="chevron-right" size={13} color="#16A34A" />
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-2 mb-4">
        <StatPill label="Active" value={activeCount} color="#22C55E" />
        <StatPill label="Pending" value={pendingCount} color="#F59E0B" />
        <StatPill label="Sold" value={soldCount} color="#3B82F6" />
      </View>

      <View>
        {preview.length === 0 ? (
          <View className="py-8 items-center gap-2">
            <Feather name="tag" size={26} color="#D1D5DB" />
            <Text className="text-sm text-gray-400 font-medium">No listings yet</Text>
          </View>
        ) : (
          preview.map((item, index) => (
            <SaleRow
              key={item.id}
              item={item}
              isLast={index === preview.length - 1}
              onPress={onSeeAll}
            />
          ))
        )}
      </View>

      <TouchableOpacity
        onPress={onSeeAll}
        activeOpacity={0.8}
        className="mt-3 border border-green-500 rounded-full py-3 flex-row items-center justify-center gap-2"
      >
        <Feather name="plus" size={15} color="#22C55E" />
        <Text className="text-sm font-bold text-green-600">List an item</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MySales