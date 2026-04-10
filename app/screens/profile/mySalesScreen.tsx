import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import BaseContainer from '@/components/shared/BaseContainer'
import {
  useMySales,
  STATUS_COLOR,
  SaleItem,
  SaleTab,
} from '@/services/hooks/profile/useMySales'

const TABS: SaleTab[] = ['All', 'Active Listings', 'Offers Received', 'Completed']

const TabBar: React.FC<{ active: SaleTab; onChange: (t: SaleTab) => void }> = ({
  active,
  onChange,
}) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
    <View className="flex-row gap-2 pr-4">
      {TABS.map((tab) => {
        const isActive = tab === active
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onChange(tab)}
            activeOpacity={0.8}
            className={`px-4 py-1.5 rounded-full border ${
              isActive ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'
            }`}
          >
            <Text className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-gray-500'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  </ScrollView>
)

const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <Text className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2 mt-5">
    {label}
  </Text>
)

const StatusDot: React.FC<{ status: SaleItem['status'] }> = ({ status }) => {
  const bgColor = STATUS_COLOR[status]
  const icon =
    status === 'Sold'
      ? 'check'
      : status === 'Active'
        ? 'radio'
        : status === 'Pending'
          ? 'clock'
          : 'x'

  return (
    <View className="w-5 h-5 rounded-full items-center justify-center" style={{ backgroundColor: bgColor }}>
      <Feather name={icon} size={10} color="#fff" />
    </View>
  )
}

const SaleSubLine: React.FC<{ item: SaleItem }> = ({ item }) => {
  if (item.status === 'Pending' && item.offerFrom) {
    return <Text className="text-[11px] text-gray-400 mt-0.5">Offer from {item.offerFrom}</Text>
  }

  if (item.status === 'Active' && item.stores) {
    return (
      <Text className="text-[11px] text-gray-400 mt-0.5">
        Listing active · {item.stores} stores
      </Text>
    )
  }

  if (item.status === 'Sold' && item.soldFor) {
    return (
      <Text className="text-[11px] text-gray-400 mt-0.5">
        Sold for ${item.soldFor} · {item.soldAt} · {item.soldDate}
      </Text>
    )
  }

  if (item.listingExpired) {
    return <Text className="text-[11px] text-gray-400 mt-0.5">No offers · Listing expired</Text>
  }

  return null
}

const SaleActions: React.FC<{
  item: SaleItem
  onViewOffer: () => void
  onEdit: () => void
  onRemark: () => void
  onDetails: () => void
}> = ({ item, onViewOffer, onEdit, onRemark, onDetails }) => {
  if (item.status === 'Pending') {
    return (
      <TouchableOpacity
        onPress={onViewOffer}
        activeOpacity={0.8}
        className="bg-green-500 px-3 py-1.5 rounded-full mt-1"
      >
        <Text className="text-[11px] font-bold text-white">View Offer</Text>
      </TouchableOpacity>
    )
  }

  if (item.status === 'Active') {
    return (
      <View className="flex-row gap-3 mt-1">
        <TouchableOpacity onPress={onEdit} activeOpacity={0.8}>
          <Text className="text-[11px] font-semibold text-gray-500">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemark} activeOpacity={0.8}>
          <Text className="text-[11px] font-semibold text-red-400">Remark</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (item.status === 'Sold') {
    return (
      <TouchableOpacity onPress={onDetails} activeOpacity={0.8} className="mt-1">
        <Text className="text-[11px] font-semibold text-gray-500">Details</Text>
      </TouchableOpacity>
    )
  }

  return null
}

const SaleRow: React.FC<{
  item: SaleItem
  isLast: boolean
  onViewOffer: () => void
  onEdit: () => void
  onRemark: () => void
  onDetails: () => void
}> = ({ item, isLast, onViewOffer, onEdit, onRemark, onDetails }) => (
  <View
    className={`flex-row items-center py-3.5 gap-3 ${
      !isLast ? 'border-b border-gray-100' : ''
    }`}
  >
    <StatusDot status={item.status} />

    <View className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
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
      <Text className="text-[11px] text-gray-400">Size {item.sizeLabel}</Text>
      <SaleSubLine item={item} />
    </View>

    <View className="items-end">
      <Text className="text-sm font-extrabold text-gray-900">${item.askingPrice}</Text>
      {item.priceDelta !== undefined ? (
        <Text className="text-[11px] font-semibold text-green-500">+${item.priceDelta}</Text>
      ) : null}
      <SaleActions
        item={item}
        onViewOffer={onViewOffer}
        onEdit={onEdit}
        onRemark={onRemark}
        onDetails={onDetails}
      />
    </View>
  </View>
)

const MySalesScreen: React.FC = () => {
  const router = useRouter()
  const {
    thisWeek,
    lastMonth,
    totalEarned,
    soldCount,
    activeCount,
    declineCount,
    activeTab,
    setActiveTab,
    handleNewSale,
    handleViewOffer,
    handleEdit,
    handleRemark,
    handleDetails,
  } = useMySales()

  return (
    <BaseContainer backgroundColor="#fff">
      <View className="flex-row items-center px-4 pt-12 pb-4 bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-extrabold text-gray-900 ml-3">My Sales</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View className="bg-black rounded-2xl p-5 mb-4">
          <Text className="text-xs font-bold text-green-100 tracking-widest uppercase mb-1">
            Total Earned
          </Text>
          <Text className="text-4xl font-extrabold text-white">${totalEarned}</Text>
          <Text className="text-xs text-green-100 mt-1">
            From {soldCount} completed sale{soldCount !== 1 ? 's' : ''}
          </Text>

          <View className="flex-row gap-3 mt-4">
            {[
              { label: 'Sold', value: soldCount },
              { label: 'Active', value: activeCount },
              { label: 'Expired', value: declineCount },
            ].map(({ label, value }) => (
              <View
                key={label}
                className="flex-1 rounded-xl py-2.5 items-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Text className="text-base font-extrabold text-white">{value}</Text>
                <Text className="text-[11px] text-green-100 mt-0.5">{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <TabBar active={activeTab} onChange={setActiveTab} />

        {thisWeek.length > 0 ? (
          <>
            <SectionLabel label="This Week" />
            <View className="bg-white rounded-2xl px-4 overflow-hidden shadow-sm">
              {thisWeek.map((item, index) => (
                <SaleRow
                  key={item.id}
                  item={item}
                  isLast={index === thisWeek.length - 1}
                  onViewOffer={() => handleViewOffer(item)}
                  onEdit={() => handleEdit(item)}
                  onRemark={() => handleRemark(item)}
                  onDetails={() => handleDetails(item)}
                />
              ))}
            </View>
          </>
        ) : null}

        {lastMonth.length > 0 ? (
          <>
            <SectionLabel label="Last Month" />
            <View className="bg-white rounded-2xl px-4 overflow-hidden shadow-sm">
              {lastMonth.map((item, index) => (
                <SaleRow
                  key={item.id}
                  item={item}
                  isLast={index === lastMonth.length - 1}
                  onViewOffer={() => handleViewOffer(item)}
                  onEdit={() => handleEdit(item)}
                  onRemark={() => handleRemark(item)}
                  onDetails={() => handleDetails(item)}
                />
              ))}
            </View>
          </>
        ) : null}

        {thisWeek.length === 0 && lastMonth.length === 0 ? (
          <View className="py-16 items-center gap-3">
            <Feather name="tag" size={32} color="#D1D5DB" />
            <Text className="text-sm text-gray-400 font-medium">No listings found</Text>
          </View>
        ) : null}

        <TouchableOpacity
          onPress={handleNewSale}
          activeOpacity={0.8}
          className="mt-4 border border-dashed border-gray-300 rounded-2xl py-4 flex-row items-center justify-center gap-2"
        >
          <Feather name="plus" size={16} color="#22C55E" />
          <Text className="text-sm font-bold text-green-600">List a new item</Text>
        </TouchableOpacity>
      </ScrollView>
    </BaseContainer>
  )
}

export default MySalesScreen
