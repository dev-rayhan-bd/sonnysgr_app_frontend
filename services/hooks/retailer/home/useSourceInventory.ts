import { useMemo, useState } from 'react';

export type SourceFilter = 'All' | 'Local Pickup' | 'Ships' | 'Dropship' | 'Bulk Lots';

export interface SourceListing {
  id: string;
  isDemandMatch: boolean;
  isBulkAvailable: boolean;
  productName: string;
  sizeLabel: string;
  availableCount: number;
  minPairs: number;
  imageIcon: 'sneaker';
  supplier: {
    initials: string;
    name: string;
    verified: boolean;
    rating: string;
    completedOrders: number;
    respondsIn?: string;
  };
  pricing: {
    itemCost: number;
    shippingFees: number;
    landedCost: number;
    expectedRetail: number;
    estimatedMarginPct: number;
  };
  fulfillment: 'ships' | 'pickup_or_ships' | 'pickup';
  fulfillmentNote: string;
  filterTags: SourceFilter[];
}

const FILTERS: SourceFilter[] = ['All', 'Local Pickup', 'Ships', 'Dropship', 'Bulk Lots'];

const ALL_LISTINGS: SourceListing[] = [
  {
    id: 'panda-dks',
    isDemandMatch: true,
    isBulkAvailable: false,
    productName: "Nike Dunk Low 'Panda'",
    sizeLabel: "Men's US 10.5",
    availableCount: 6,
    minPairs: 1,
    imageIcon: 'sneaker',
    supplier: {
      initials: 'DKS',
      name: 'Detroit Kicks Supply',
      verified: true,
      rating: '4.9',
      completedOrders: 247,
      respondsIn: '12 min',
    },
    pricing: { itemCost: 155, shippingFees: 10, landedCost: 165, expectedRetail: 220, estimatedMarginPct: 25 },
    fulfillment: 'ships',
    fulfillmentNote: 'Ships in 1–2 days',
    filterTags: ['All', 'Ships'],
  },
  {
    id: 'chicago-glw',
    isDemandMatch: false,
    isBulkAvailable: true,
    productName: "Air Jordan 1 'Chicago'",
    sizeLabel: "Men's US 10",
    availableCount: 12,
    minPairs: 3,
    imageIcon: 'sneaker',
    supplier: {
      initials: 'GLW',
      name: 'Great Lakes Wholesale',
      verified: true,
      rating: '4.8',
      completedOrders: 184,
    },
    pricing: { itemCost: 245, shippingFees: 13, landedCost: 258, expectedRetail: 340, estimatedMarginPct: 24 },
    fulfillment: 'pickup_or_ships',
    fulfillmentNote: 'Pickup or ships',
    filterTags: ['All', 'Bulk Lots', 'Local Pickup', 'Ships'],
  },
];

export const useSourceInventory = () => {
  const [activeFilter, setActiveFilter] = useState<SourceFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [shipTo] = useState("Sonny's Kicks · Novi");

  const listings = useMemo(() => {
    return ALL_LISTINGS.filter((listing) => {
      const matchesFilter = activeFilter === 'All' || listing.filterTags.includes(activeFilter);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        listing.productName.toLowerCase().includes(q) ||
        listing.supplier.name.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const demandMatchCount = useMemo(
    () => ALL_LISTINGS.filter((l) => l.isDemandMatch).length,
    []
  );

  return {
    shipTo,
    searchQuery,
    setSearchQuery,
    filters: FILTERS,
    activeFilter,
    setActiveFilter,
    listings,
    demandMatchCount,
  };
};