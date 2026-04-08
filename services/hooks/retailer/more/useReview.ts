import { useState, useMemo } from 'react';

export const useReviews = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const stats = {
        average: 4.8,
        totalCount: 247,
        categories: [
            { label: 'Customer Service', rating: 4.9 },
            { label: 'Authenticity', rating: 5.0 },
            { label: 'Pickup Speed', rating: 4.7 },
            { label: 'Pricing', rating: 4.8 },
            { label: 'Store Experience', rating: 4.9 },
        ],
        distribution: [
            { stars: 5, percentage: 78, color: '#F59E0B' },
            { stars: 4, percentage: 15, color: '#F59E0B' },
            { stars: 3, percentage: 4, color: '#F59E0B' },
            { stars: 2, percentage: 2, color: '#EF4444' },
            { stars: 1, percentage: 1, color: '#EF4444' },
        ]
    };

    const reviews = [
        {
            id: '1',
            author: 'James Chen',
            initials: 'JC',
            verified: true,
            rating: 5,
            date: '2 days ago',
            product: "Air Jordan 4 'Black Cat' - Size 10.5",
            comment: 'Incredible service! The authentication process was thorough and the pickup was seamless. Definitely my go-to store for sneakers now.',
            helpful: 12,
            subRatings: { service: 5, auth: 5, speed: 5 }
        },
        {
            id: '2',
            author: 'Sarah Williams',
            initials: 'SW',
            verified: true,
            rating: 3,
            date: '5 days ago',
            product: "Nike Dunk Low 'Panda' - Size 9",
            comment: 'Expected better service for the price. Had to wait 30 minutes past my pickup time and staff seemed unprepared.',
            helpful: 8,
            subRatings: { service: 2, auth: 5, speed: 1 },
            needsResponse: true
        }
    ];

    const filteredReviews = useMemo(() => {
        if (activeFilter === 'All') return reviews;
        if (activeFilter === '5★') return reviews.filter(r => r.rating === 5);
        if (activeFilter === '3★ or below') return reviews.filter(r => r.rating <= 3);
        return reviews;
    }, [activeFilter]);

    return { stats, filteredReviews, activeFilter, setActiveFilter };
};