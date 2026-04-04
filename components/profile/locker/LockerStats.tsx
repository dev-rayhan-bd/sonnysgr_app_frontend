import React from 'react'
import { View, Text } from 'react-native'
import type { LockerStats as LockerStatsType } from '@/types/locker'

interface LockerStatsProps {
  stats: LockerStatsType
}

const formatCurrency = (value: number): string =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`

const StatCell: React.FC<{ value: string; label: string; accent?: boolean }> = ({
  value,
  label,
  accent,
}) => (
  <View className="flex-1 items-center py-4">
    <Text
      className={`text-xl font-black tracking-tight ${accent ? 'text-green-500' : 'text-gray-900'}`}
    >
      {value}
    </Text>
    <Text className="text-xs font-medium text-gray-400 mt-0.5">{label}</Text>
  </View>
)

const LockerStats: React.FC<LockerStatsProps> = ({ stats }) => (
  <View className="bg-white border-b border-gray-100 flex-row">
    <StatCell value={String(stats.totalPairs)} label="Pairs" />

    {/* Divider */}
    <View className="w-px bg-gray-100 my-3" />

    <StatCell
      value={formatCurrency(stats.estimatedValue)}
      label="Estimated Value"
      accent
    />

    {/* Divider */}
    <View className="w-px bg-gray-100 my-3" />

    <StatCell value={`${stats.avgCondition}★`} label="Avg Condition" />
  </View>
)

export default LockerStats