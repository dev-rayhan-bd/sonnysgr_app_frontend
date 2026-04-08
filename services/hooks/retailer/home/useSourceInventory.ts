import { useState, useMemo } from 'react';

export const useSourceInventory = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const resellers = useMemo(() => [
    {
      id: '1',
      initials: 'MK',
      name: 'marcus_kicks',
      location: 'Miami',
      distance: '2.3 mi',
      rating: '4.9',
      deals: '47',
      priceRange: '$185–$340',
      isNearby: true,
      hasDS: true,
      hasBulk: false,
    },
    {
      id: '2',
      initials: 'SV',
      name: 'sneaker_vault',
      location: 'Miami',
      distance: '4.1 mi',
      rating: '5.0',
      deals: '89',
      priceRange: '$210–$420',
      isNearby: true,
      hasDS: true,
      hasBulk: true,
    }
  ], []);

  const filteredResellers = useMemo(() => {
    if (activeFilter === 'All') return resellers;
    if (activeFilter === 'Nearby Only') return resellers.filter(r => r.isNearby);
    if (activeFilter === 'DS Only') return resellers.filter(r => r.hasDS);
    if (activeFilter === 'Bulk Lots') return resellers.filter(r => r.hasBulk);
    return resellers;
  }, [activeFilter, resellers]);

  return {
    activeFilter,
    setActiveFilter,
    resellers: filteredResellers,
    opportunityCount: 3
  };
};