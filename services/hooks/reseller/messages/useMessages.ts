import { useState } from 'react';

export const useMessages = () => {
    const [chats] = useState([
        {
            id: '1',
            storeName: 'Kicks City',
            lastMessage: "What's the best you can do on 2 pairs?",
            time: '5m',
            unreadCount: 2,
            isOnline: true,
            itemContext: {
                name: "Air Jordan 4 'Black Cat'",
                offer: '$220 offer',
                image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=100'
            }
        },
        {
            id: '2',
            storeName: 'Sole House',
            lastMessage: "Deal confirmed! When can we pick up?",
            time: '1h',
            unreadCount: 0,
            isOnline: false,
            itemContext: {
                name: "Nike Dunk Low 'Panda'",
                offer: '$155 offer',
                image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100'
            }
        },
        {
            id: '3',
            storeName: 'Kicks City',
            lastMessage: "Can you send more photos of the box?",
            time: '2h',
            unreadCount: 1,
            isOnline: true,
            itemContext: {
                name: "Yeezy Boost 350 V2 'Zebra'",
                offer: '$285 offer',
                image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=100'
            }
        }
    ]);

    const unreadTotal = chats.filter(c => c.unreadCount > 0).length;

    return { chats, unreadTotal };
};