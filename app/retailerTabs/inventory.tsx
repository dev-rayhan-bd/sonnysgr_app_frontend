import React from 'react';
import {
  View, FlatList, StyleSheet, RefreshControl,
} from 'react-native';

import BaseContainer from '@/components/shared/BaseContainer';
import InventoryHeader from '@/components/retailer/inventory/InventoryHeader';
import InventoryStats from '@/components/retailer/inventory/InventoryStats';
import InventoryFilter from '@/components/retailer/inventory/InventoryFilter';
import InventoryCard from '@/components/retailer/inventory/InventoryCard';
import {
  useInventory,
  InventoryProduct,
  FilterTab,
} from '@/services/hooks/retailer/inventory/useInventory';

// Tab display counts — update from real data in production
const TAB_COUNTS: Record<FilterTab, number> = {
  All:            83,
  'In Stock':     71,
  'Low Stock':    12,
  'Out of Stock':  5,
};

export const InventoryScreen: React.FC = () => {
  const {
    activeFilter,
    filterTabs,
    summary,
    syncInfo,
    filteredProducts,
    isRefreshing,
    handleFilterChange,
    handleRefresh,
    handleEditProduct,
    handleProductPress,
  } = useInventory();

  const renderItem = ({ item }: { item: InventoryProduct }) => (
    <InventoryCard
      product={item}
      onPress={handleProductPress}
      onEditPress={handleEditProduct}
    />
  );

  return (
    <BaseContainer backgroundColor="#fff" >
      <View style={styles.container}>

        {/* ── Fixed top ── */}
        <View>
          <InventoryHeader
            onSearchPress={() => console.log('search')}
            onFilterPress={() => console.log('filter')}
          />
          <InventoryStats summary={summary} syncInfo={syncInfo} />
          <InventoryFilter
            tabs={filterTabs}
            active={activeFilter}
            counts={TAB_COUNTS}
            onChange={handleFilterChange}
          />
        </View>

        {/* ── Product list ── */}
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40
  },
  listContent: {
    padding: 12,
    paddingBottom: 32,
  },
});

export default InventoryScreen;