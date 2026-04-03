// screens/OrdersScreen.tsx
import React from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import BaseContainer from '@/components/shared/BaseContainer'
import { useOrders } from '@/services/hooks/profile/useOrders'
import { useOrderFilter } from '@/services/hooks/profile/useOrderFilter'
import OrderFilterTabs from '@/components/profile/orders/OrderFilterTabs'
import OrderGroup from '@/components/profile/orders/OrderGroup'
import OrdersEmptyState from '@/components/profile/orders/OrdersEmptyState'
import OrderFilterSheet from '@/components/profile/orders/OrderFilterSheet'

const OrdersScreen = () => {
  const filter = useOrderFilter()

  const { grouped, activeTab, setActiveTab } = useOrders(filter.applied)

  const handleOrderPress = (id: string) => {
    // TODO: navigate to order detail
    console.log('Order pressed:', id)
  }

  return (
    <BaseContainer scrollable backgroundColor='#fff'>
      <View className='pt-10'>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2 bg-white">
          <Text className="text-2xl font-extrabold text-gray-900">My Orders</Text>

          {/* Filter icon with active badge */}
          <TouchableOpacity
            onPress={filter.open}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            className="relative"
          >
            <Feather name="filter" size={20} color="#374151" />
            {filter.activeFilterCount > 0 && (
              <View className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-500 rounded-full items-center justify-center">
                <Text className="text-white text-[9px] font-bold">
                  {filter.activeFilterCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* ── Tab filter row ── */}
        <OrderFilterTabs active={activeTab} onChange={setActiveTab} />

        {/* ── Active sort chip (when sort applied) ── */}
        {filter.activeFilterCount > 0 && (
          <View className="flex-row items-center gap-2 px-4 py-2 bg-gray-50">
            <Text className="text-xs text-gray-400">Sorted by:</Text>
            <View className="flex-row items-center gap-1 bg-gray-900 px-2.5 py-1 rounded-full">
              <Text className="text-white text-[11px] font-semibold">{filter.applied.sort}</Text>
            </View>
            <TouchableOpacity onPress={filter.reset}>
              <Text className="text-xs text-red-400 font-semibold ml-1">Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Grouped orders ── */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 48, paddingTop: 4 }}
        >
          {grouped.length === 0 ? (
            <OrdersEmptyState message="No orders match your filters" />
          ) : (
            grouped.map(({ group, items }) => (
              <OrderGroup
                key={group}
                group={group}
                items={items}
                onPressOrder={handleOrderPress}
              />
            ))
          )}

          {grouped.length > 0 && (
            <View className="items-center mt-2 pb-4">
              <Text className="text-xs text-gray-400">No more orders this month</Text>
            </View>
          )}
        </ScrollView>

        {/* ── Filter bottom sheet ── */}
        <OrderFilterSheet
          visible={filter.visible}
          draft={filter.draft}
          sortOptions={filter.sortOptions}
          onClose={filter.close}
          onSetSort={filter.setSort}
          onReset={filter.reset}
          onApply={filter.apply}
        />
      </View>
    </BaseContainer>
  )
}

export default OrdersScreen