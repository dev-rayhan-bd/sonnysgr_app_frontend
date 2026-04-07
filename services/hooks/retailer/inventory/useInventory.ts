import { useState, useCallback, useMemo } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Hold';

export type FilterTab = 'All' | 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface SizeEntry {
  size: string;
  qty: number; // 0 = unavailable
}

export interface InventoryProduct {
  id: string;
  brand: string;
  name: string;
  sku: string;
  price: number;
  cost: number;
  status: StockStatus;
  lowCount?: number;   // only for 'Low Stock'
  sizes: SizeEntry[];
  imageUri?: string;
  imageBg: string;    // fallback bg color
}

export interface InventorySummary {
  active: number;
  lowStock: number;
  outOfStock: number;
  onHold: number;
}

export interface SyncInfo {
  isSynced: boolean;
  lastSyncedLabel: string;
  isPosConnected: boolean;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useInventory = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filterTabs: FilterTab[] = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  const summary: InventorySummary = {
    active: 83,
    lowStock: 12,
    outOfStock: 5,
    onHold: 3,
  };

  const syncInfo: SyncInfo = {
    isSynced: true,
    lastSyncedLabel: 'Synced 2 min ago',
    isPosConnected: true,
  };

  const allProducts: InventoryProduct[] = [
    {
      id: 'prod-1',
      brand: 'NIKE',
      name: 'Air Jordan 1 Retro High OG',
      sku: 'DJ1237-010',
      price: 220,
      cost: 140,
      status: 'In Stock',
      imageBg: '#E8F5E9',
      sizes: [
        { size: '9',    qty: 1 },
        { size: '9.5',  qty: 1 },
        { size: '10',   qty: 3 },
        { size: '10.5', qty: 2 },
        { size: '11',   qty: 4 },
        { size: '11.5', qty: 1 },
        { size: '12',   qty: 1 },
      ],
    },
    {
      id: 'prod-2',
      brand: 'ADIDAS',
      name: 'Yeezy Boost 350 V2',
      sku: 'FZ5246',
      price: 220,
      cost: 180,
      status: 'Low Stock',
      lowCount: 2,
      imageBg: '#F3F4F6',
      sizes: [
        { size: '8',   qty: 1 },
        { size: '9.0', qty: 1 },
        { size: '9.5', qty: 0 },
        { size: '10',  qty: 0 },
      ],
    },
    {
      id: 'prod-3',
      brand: 'NIKE',
      name: 'Nike Dunk Low Retro',
      sku: 'DD1391-100',
      price: 150,
      cost: 90,
      status: 'In Stock',
      imageBg: '#E8F0FE',
      sizes: [
        { size: '8',  qty: 2 },
        { size: '10', qty: 3 },
        { size: '11', qty: 1 },
        { size: '12', qty: 2 },
      ],
    },
    {
      id: 'prod-4',
      brand: 'JORDAN',
      name: 'Air Jordan 4 Retro',
      sku: 'DH7138-160',
      price: 250,
      cost: 160,
      status: 'On Hold',
      imageBg: '#FDE8E8',
      sizes: [
        { size: '9.5', qty: 1 },
        { size: '10',  qty: 1 },
        { size: '11',  qty: 1 },
      ],
    },
  ];

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return allProducts;
    return allProducts.filter(p => {
      if (activeFilter === 'In Stock')     return p.status === 'In Stock';
      if (activeFilter === 'Low Stock')    return p.status === 'Low Stock';
      if (activeFilter === 'Out of Stock') return p.status === 'Out of Stock';
      return true;
    });
  }, [activeFilter]);

  const handleFilterChange = useCallback((tab: FilterTab) => {
    setActiveFilter(tab);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(res => setTimeout(res, 1200));
    setIsRefreshing(false);
  }, []);

  const handleEditProduct = useCallback((product: InventoryProduct) => {
    console.log('edit product', product.id);
  }, []);

  const handleProductPress = useCallback((product: InventoryProduct) => {
    console.log('product pressed', product.id);
  }, []);

  return {
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
  };
};