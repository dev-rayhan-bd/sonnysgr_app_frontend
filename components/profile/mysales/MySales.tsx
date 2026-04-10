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
  <View className="flex-1 bg-gray-50 rounded-2xl py-3 items-center">
    <Text className="text-base font-extrabold" style={{ color }}>
      {value}
    </Text>
    <Text className="text-xs text-gray-400 mt-0.5">{label}</Text>
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
    className={`flex-row items-center py-3.5 gap-3 ${
      !isLast ? 'border-b border-gray-100' : ''
    }`}
  >
    <View className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden">
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} className="w-full h-full" resizeMode="cover" />
      ) : (
        <View className="w-full h-full bg-gray-200" />
      )}
    </View>

    <View className="flex-1">
      <Text className="text-[10px] font-bold uppercase tracking-widest text-green-500">
        {item.productType}
      </Text>
      <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5">Size {item.sizeLabel}</Text>
    </View>

    <View className="items-end gap-1.5">
      <Text className="text-sm font-extrabold text-gray-900">${item.askingPrice}</Text>
      <View
        className="px-2.5 py-0.5 rounded-full"
        style={{ backgroundColor: `${STATUS_COLOR[item.status]}20` }}
      >
        <Text className="text-[11px] font-bold" style={{ color: STATUS_COLOR[item.status] }}>
          {item.status}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

const MySales: React.FC<MySalesProps> = ({ onSeeAll }) => {
  const { sales, totalEarned, activeCount, declineCount } = useMySales()
  const preview = sales.slice(0, 3)

  return (
    <View className="mt-7">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-2xl font-extrabold text-gray-900">My Sales</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text className="text-lg font-semibold text-green-600">See all</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-sm text-gray-400 mb-3">Your active listings and history</Text>

      <View className="flex-row gap-2 mb-4">
        <StatPill label="Total Earned" value={`$${totalEarned}`} color="#22C55E" />
        <StatPill label="Active" value={activeCount} color="#111827" />
        <StatPill label="Expired" value={declineCount} color="#F59E0B" />
      </View>

      <View className="bg-white rounded-2xl px-4 overflow-hidden shadow-sm">
        {preview.length === 0 ? (
          <View className="py-10 items-center gap-2">
            <Feather name="tag" size={28} color="#D1D5DB" />
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
        className="mt-3 border border-dashed border-gray-300 rounded-2xl py-4 flex-row items-center justify-center gap-2"
      >
        <Feather name="plus" size={16} color="#22C55E" />
        <Text className="text-sm font-bold text-green-600">List a new item</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MySales
