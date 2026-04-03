// hooks/notifications/useNotificationSettings.ts
import { useState, useCallback } from 'react'
import Toast from 'react-native-toast-message'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NotificationSetting {
  id: string
  label: string
  description: string
  enabled: boolean
  badge?: string
  badgeColor?: string
}

export interface NotificationSection {
  id: string
  title: string
  items: NotificationSetting[]
}

// ─── Initial State ────────────────────────────────────────────────────────────

const INITIAL_SECTIONS: NotificationSection[] = [
  {
    id: 'global',
    title: '',
    items: [
      {
        id: 'push_notifications',
        label: 'Push Notifications',
        description: 'Turn off to disable all GoSNKR alerts',
        enabled: true,
      },
    ],
  },
  {
    id: 'inventory_restocks',
    title: 'INVENTORY & RESTOCKS',
    items: [
      {
        id: 'restock_alerts',
        label: 'Restock Alerts',
        description: "Get notified when items restock in your size",
        enabled: true,
      },
      {
        id: 'nearby_restock',
        label: 'Nearby Restock',
        description: 'Get restocked within 5 miles of you',
        enabled: true,
      },
      {
        id: 'followed_store_restock',
        label: 'Followed Store Restock',
        description: 'Stores you follow',
        enabled: false,
      },
      {
        id: 'price_drop_alert',
        label: 'Price Drop Alert',
        description: 'When a saved pair drops in price',
        enabled: true,
      },
    ],
  },
  {
    id: 'orders_pickups',
    title: 'ORDERS & PICKUPS',
    items: [
      {
        id: 'order_status_updates',
        label: 'Order Status Updates',
        description: 'Confirmation, ready for pickup, etc.',
        enabled: true,
      },
      {
        id: 'pickup_ready',
        label: 'Pickup Ready',
        description: 'When your sale is waiting at the counter',
        enabled: true,
        badge: 'Important',
        badgeColor: '#EF4444',
      },
      {
        id: 'pickup_reminder',
        label: 'Pickup Reminder',
        description: '1 hour before your pickup, so they expire',
        enabled: true,
      },
      {
        id: 'order_cancelled',
        label: 'Order Cancelled',
        description: 'If a store cancels, see next in order',
        enabled: false,
      },
    ],
  },
  {
    id: 'drops_releases',
    title: 'DROPS & RELEASES',
    items: [
      {
        id: 'exclusive_drop_alerts',
        label: 'Exclusive Drop Alerts',
        description: 'From stores you follow',
        enabled: true,
      },
      {
        id: 'release_reminders',
        label: 'Release Reminders',
        description: 'Stay all reminded for upcoming drops',
        enabled: true,
      },
      {
        id: 'raffle_results',
        label: 'Raffle Results',
        description: 'Notifications for raffle entries',
        enabled: false,
      },
    ],
  },
  {
    id: 'promotions',
    title: 'PROMOTIONS',
    items: [
      {
        id: 'flash_sales',
        label: 'Flash Sales',
        description: 'From stores you follow locally',
        enabled: true,
      },
      {
        id: 'store_announcements',
        label: 'Store Announcements',
        description: 'Updates from your followed stores',
        enabled: true,
      },
      {
        id: 'gosnkr_offers',
        label: 'GoSNKR Offers',
        description: 'Exclusive app-only deals and rewards',
        enabled: false,
        badge: 'These are optional',
        badgeColor: '#6B7280',
      },
    ],
  },
  {
    id: 'quiet_hours',
    title: 'QUIET HOURS',
    items: [
      {
        id: 'quiet_hours',
        label: 'Quiet Hours',
        description: '10 PM – 8 AM',
        enabled: true,
      },
    ],
  },
]

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useNotificationSettings = () => {
  const [sections, setSections] = useState<NotificationSection[]>(INITIAL_SECTIONS)
  const [saving, setSaving] = useState(false)

  // Derive master push toggle from global section
  const pushEnabled = sections[0]?.items[0]?.enabled ?? true

  const toggleSetting = useCallback((sectionId: string, itemId: string) => {
    setSections(prev =>
      prev.map(section => {
        if (section.id !== sectionId) return section
        return {
          ...section,
          items: section.items.map(item =>
            item.id === itemId ? { ...item, enabled: !item.enabled } : item
          ),
        }
      })
    )
  }, [])

  // Toggle master push — disables/enables every setting
  const togglePushNotifications = useCallback(() => {
    setSections(prev => {
      const next = !prev[0].items[0].enabled
      return prev.map((section, si) => ({
        ...section,
        items: section.items.map((item, ii) =>
          si === 0 && ii === 0
            ? { ...item, enabled: next }
            : { ...item, enabled: next ? item.enabled : false }
        ),
      }))
    })
  }, [])

  const saveSettings = useCallback(async () => {
    try {
      setSaving(true)
      // TODO: persist to API
      await new Promise(res => setTimeout(res, 700))
      Toast.show({
        type: 'success',
        text1: 'Settings saved',
        text2: 'Your notification preferences are updated.',
        position: 'top',
        topOffset: 56,
      })
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save',
        text2: e?.message ?? 'Please try again.',
        position: 'top',
        topOffset: 56,
      })
    } finally {
      setSaving(false)
    }
  }, [sections])

  return {
    sections,
    pushEnabled,
    saving,
    toggleSetting,
    togglePushNotifications,
    saveSettings,
  }
}