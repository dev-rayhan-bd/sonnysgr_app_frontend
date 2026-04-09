import React from 'react'
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native'
import BaseContainer from '@/components/shared/BaseContainer'
import InventoryCard from '@/components/retailer/inventory/InventoryCard'
import InventoryFilter from '@/components/retailer/inventory/InventoryFilter'
import InventoryHeader from '@/components/retailer/inventory/InventoryHeader'
import InventoryStats from '@/components/retailer/inventory/InventoryStats'
import {
  useInventory,
  InventoryProduct,
} from '@/services/hooks/retailer/inventory/useInventory'

export const InventoryScreen: React.FC = () => {
  const {
    activeFilter,
    filterTabs,
    filterCounts,
    summary,
    syncInfo,
    filteredProducts,
    isRefreshing,
    handleFilterChange,
    handleRefresh,
    handleEditProduct,
    handleProductPress,
  } = useInventory()

  const renderItem = ({ item }: { item: InventoryProduct }) => (
    <InventoryCard
      product={item}
      onPress={handleProductPress}
      onEditPress={handleEditProduct}
    />
  )

  return (
    <BaseContainer backgroundColor="#fff">
      <View style={styles.container}>
        <View>
          <InventoryHeader
            onSearchPress={() => console.log('search')}
            onFilterPress={() => console.log('filter')}
          />
          <InventoryStats summary={summary} syncInfo={syncInfo} />
          <InventoryFilter
            tabs={filterTabs}
            active={activeFilter}
            counts={filterCounts}
            onChange={handleFilterChange}
          />
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#00C853"
              colors={['#00C853']}
            />
          }
        />
      </View>
    </BaseContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  listContent: {
    padding: 12,
    paddingBottom: 32,
  },
})

export default InventoryScreen
