import { useState } from 'react';

// Define the shape of a single notification
export interface NotificationItem {
    id: string;
    type: string;
    title: string;
    description: string;
    time: string;
    color: string;
    bgColor: string;
    initials?: string;    // Optional
    icon?: string;        // Optional
    actions?: string[];   // Optional
}

interface NotificationSection {
    title: string;
    data: NotificationItem[];
}

export const useNotifications = () => {
    const [activeTab, setActiveTab] = useState('All 4');

    const sections: NotificationSection[] = [
        {
            title: 'TODAY',
            data: [
                {
                    id: '1',
                    type: 'request',
                    title: 'New store request',
                    description: 'Kicks City wants your Air Jordan 4 "Black Cat" Size 10.5 - Deadstock · They offered $185',
                    time: '5 min ago',
                    initials: 'KC',
                    color: '#22C55E',
                    bgColor: '#F0FDF4',
                    actions: ['View Request', 'Ignore']
                },
                {
                    id: '2',
                    type: 'counter',
                    title: 'Counter offer received',
                    description: 'Sole House countered your $210 ask with $195 for Nike Dunk Low - Size 11',
                    time: '1 hr ago',
                    initials: 'SH',
                    color: '#F59E0B',
                    bgColor: '#FFFBEB',
                    actions: ['Accept $195', 'Counter Again', 'Decline']
                },
                {
                    id: '3',
                    type: 'deal',
                    title: 'Deal confirmed!',
                    description: 'Nike Dunk Low · $155 agreed with Sole House. Arrange handoff details.',
                    time: '3 hrs ago',
                    icon: 'checkmark-circle-outline',
                    color: '#22C55E',
                    bgColor: '#F0FDF4',
                    actions: ['View Deal']
                },
                {
                    id: '4',
                    type: 'info',
                    title: '3 stores viewed your inventory',
                    description: 'Kicks City, Sole House, and 1 other store browsed your listings today.',
                    time: 'Today',
                    icon: 'eye-outline',
                    color: '#6B7280',
                    bgColor: '#F9FAFB',
                    actions: ['See Who']
                }
            ]
        },
        {
            title: 'YESTERDAY',
            data: [
                {
                    id: '5',
                    type: 'declined',
                    title: 'Request declined',
                    description: 'Premier Kicks declined your Air Max 90 listing.',
                    time: 'Yesterday',
                    icon: 'close-outline',
                    color: '#EF4444',
                    bgColor: '#FFF1F2',
                },
                {
                    id: '6',
                    type: 'trust',
                    title: 'Trust Score updated',
                    description: 'Your Trust Score is now 98/100. Response rate: 99%',
                    time: 'Yesterday',
                    icon: 'shield-checkmark-outline',
                    color: '#22C55E',
                    bgColor: '#F0FDF4',
                }
            ]
        }
    ];

    return { sections, activeTab, setActiveTab };
};