import { useState, useMemo, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType =
  | 'refund'
  | 'stock'
  | 'order'
  | 'hold'
  | 'pickup'
  | 'sync';

export type NotificationSection = 'Needs attention' | 'Today' | 'Earlier';

export type NotificationFilter = 'All' | 'Orders' | 'Holds' | 'Refunds' | 'Inventory';

export interface NotificationAction {
  label: string;
  /** 'solid' (black, default) or 'outline' (white with border). */
  variant?: 'solid' | 'outline';
  /** Route to push when the button is pressed. */
  route?: string;
  params?: Record<string, string>;
  /** Optional non-navigation action key handled in the screen. */
  key?: string;
}

export interface NotificationItem {
  id: string;
  type: NotificationType;
  section: NotificationSection;
  title: string;
  subtitle: string;
  /** Second meta line, e.g. "Marcus L. · Pickup · Main St". */
  meta?: string;
  location?: string;
  time: string;
  unread: boolean;
  /** ISO deadline → renders the red "23h 18m left" pill. */
  deadlineIso?: string;
  primary?: NotificationAction;
  secondary?: NotificationAction;
  /** Where tapping the whole card / chevron goes. */
  route?: string;
  params?: Record<string, string>;
}

// ─── Filter → type mapping ────────────────────────────────────────────────────

export const FILTERS: NotificationFilter[] = [
  'All',
  'Orders',
  'Holds',
  'Refunds',
  'Inventory',
];

const FILTER_TYPES: Record<Exclude<NotificationFilter, 'All'>, NotificationType[]> = {
  Orders: ['order', 'pickup'],
  Holds: ['hold'],
  Refunds: ['refund'],
  Inventory: ['stock', 'sync'],
};

export const LOCATIONS = ['All locations', 'Main St', 'Downtown'] as const;
export type LocationOption = (typeof LOCATIONS)[number];

// ─── Mock data (replace with RTK Query when the endpoint is ready) ────────────

const hoursFromNow = (h: number, m = 0) =>
  new Date(Date.now() + h * 3600 * 1000 + m * 60 * 1000).toISOString();

const INITIAL: NotificationItem[] = [
  {
    id: 'n-refund-1',
    type: 'refund',
    section: 'Needs attention',
    title: 'Refund claim requires response',
    subtitle: 'Order #20948 · $44 deposit · Sonny Garcia',
    location: 'Main St',
    time: 'Just now',
    unread: true,
    deadlineIso: hoursFromNow(23, 18),
    primary: {
      label: 'Review Claim',
      route: '/screens/retailer/refund/reviewClaimScreen',
      params: { claimId: 'claim-1' },
    },
    secondary: {
      label: 'View Order',
      route: '/screens/retailer/refund/refundClaimsScreen',
    },
    route: '/screens/retailer/refund/refundClaimsScreen',
  },
  {
    id: 'n-stock-1',
    type: 'stock',
    section: 'Needs attention',
    title: 'Low stock in Size 10.5',
    subtitle: 'Jordan 4, Dunk Low, and Air Max 90',
    location: 'Downtown',
    time: 'Today',
    unread: false,
    primary: { label: 'View Inventory', route: '/retailerTabs/inventory' },
    secondary: { label: 'Restock', route: '/screens/retailer/home/more/sourceInventoryScreen' },
    route: '/retailerTabs/inventory',
  },
  {
    id: 'n-order-1',
    type: 'order',
    section: 'Today',
    title: 'New order received',
    subtitle: 'Air Jordan 1 Retro High · Size 10.5 · $220',
    meta: 'Marcus L. · Pickup · Main St',
    time: '8 min ago',
    unread: true,
    location: 'Main St',
    primary: { label: 'Confirm Order', key: 'confirm-order' },
    secondary: { label: 'View Details', route: '/retailerTabs/orders' },
    route: '/retailerTabs/orders',
  },
  {
    id: 'n-hold-1',
    type: 'hold',
    section: 'Today',
    title: 'Hold confirmed',
    subtitle: 'Yeezy Boost 350 V2 · Size 9 · $280',
    meta: 'Sarah K. · Deposit paid · Downtown',
    time: '15 min ago',
    unread: true,
    location: 'Downtown',
    primary: { label: 'Prepare Item', key: 'prepare-item' },
    secondary: { label: 'View Hold', route: '/retailerTabs/orders' },
    route: '/retailerTabs/orders',
  },
  {
    id: 'n-pickup-1',
    type: 'pickup',
    section: 'Today',
    title: 'Pickup ready reminder',
    subtitle: 'Order #20881 has been ready for 2 hours',
    time: '2 hr ago',
    unread: false,
    location: 'Main St',
    primary: { label: 'View Order', variant: 'outline', route: '/retailerTabs/orders' },
    route: '/retailerTabs/orders',
  },
  {
    id: 'n-sync-1',
    type: 'sync',
    section: 'Earlier',
    title: 'Inventory sync completed',
    subtitle: '83 active items · No sync errors',
    time: 'Yesterday',
    unread: false,
    location: 'Downtown',
    route: '/screens/retailer/home/more/syncLogsScreen',
  },
  {
    id: 'n-order-2',
    type: 'order',
    section: 'Earlier',
    title: 'Order picked up',
    subtitle: 'Nike Dunk Low · Size 10 · $135',
    meta: 'Priya S. · Pickup · Main St',
    time: 'Yesterday',
    unread: false,
    location: 'Main St',
    route: '/retailerTabs/orders',
  },
];

const SECTION_ORDER: NotificationSection[] = ['Needs attention', 'Today', 'Earlier'];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useNotifications = () => {
  const [items, setItems] = useState<NotificationItem[]>(INITIAL);
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('All');
  const [location, setLocation] = useState<LocationOption>('All locations');

  // Items after the location dropdown is applied (counts respect location).
  const locationScoped = useMemo(
    () =>
      location === 'All locations'
        ? items
        : items.filter(n => !n.location || n.location === location),
    [items, location],
  );

  // Count badges — total items per chip (respects the location dropdown).
  const counts = useMemo(() => {
    const result = { All: locationScoped.length } as Record<NotificationFilter, number>;
    (Object.keys(FILTER_TYPES) as Exclude<NotificationFilter, 'All'>[]).forEach(f => {
      result[f] = locationScoped.filter(n => FILTER_TYPES[f].includes(n.type)).length;
    });
    return result;
  }, [locationScoped]);

  const unreadCount = useMemo(
    () => locationScoped.filter(n => n.unread).length,
    [locationScoped],
  );

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return locationScoped;
    const types = FILTER_TYPES[activeFilter];
    return locationScoped.filter(n => types.includes(n.type));
  }, [locationScoped, activeFilter]);

  const sections = useMemo(
    () =>
      SECTION_ORDER.map(title => ({
        title,
        data: filtered.filter(n => n.section === title),
      })).filter(s => s.data.length > 0),
    [filtered],
  );

  const markAsRead = useCallback((id: string) => {
    setItems(prev => prev.map(n => (n.id === id ? { ...n, unread: false } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setItems(prev => prev.map(n => ({ ...n, unread: false })));
  }, []);

  /** Removes an actioned notification (e.g. after "Confirm Order"). */
  const resolve = useCallback((id: string) => {
    setItems(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    activeFilter,
    setActiveFilter,
    location,
    setLocation,
    counts,
    sections,
    markAsRead,
    markAllRead,
    resolve,
    hasUnread: unreadCount > 0,
    isEmpty: filtered.length === 0,
  };
};