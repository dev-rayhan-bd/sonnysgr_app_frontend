export type OrderStatus = 'new' | 'holding' | 'ready' | 'completed' | 'cancelled';

export type OrderTag = 'BUY NOW' | 'DETAILS' | 'PICKUP';

export interface Order {
    id: string;
    status: OrderStatus;
    tag: OrderTag;
    productName: string;
    size: string;
    gender: string;
    customerName: string;
    price: number;
    timeAgo: string;
    imageUrl?: string;
    expiresIn?: string;
    readySince?: string;
    customerNotified?: boolean;
    completedDate?: string;
    cancelledDate?: string;
    cancelledBy?: string;
}