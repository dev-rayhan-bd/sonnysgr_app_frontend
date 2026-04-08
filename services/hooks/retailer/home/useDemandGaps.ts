import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useDemandGaps = () => {
  const [opportunities, setOpportunities] = useState([
    {
      id: '1',
      name: "Nike Dunk Low 'Panda'",
      tag: 'High Opportunity',
      tagCol: '#10B981',
      wantedSize: 'Size 10.5 Men\'s most wanted',
      searches: '847',
      wishlisted: '234',
      storesNearby: '0',
      avgPrice: '$220',
      resellersCount: 3,
    },
    {
      id: '2',
      name: "Air Jordan 1 'Chicago'",
      tag: 'Rising Fast',
      tagCol: '#EF4444',
      wantedSize: 'Size 10 Men\'s most wanted',
      searches: '623',
      wishlisted: '189',
      storesNearby: '0',
      avgPrice: '$340',
      resellersCount: 2,
    }
  ]);

  const handleAddInventory = (name: string) => {
    Toast.show({
      type: 'info',
      text1: 'Adding to Inventory',
      text2: `Opening manual entry for ${name}`,
    });
  };

  return { opportunities, handleAddInventory };
};