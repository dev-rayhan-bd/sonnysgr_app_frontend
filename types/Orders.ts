export type OrderStatus = 'new' | 'holding' | 'ready' | 'completed' | 'cancelled';

export type OrderTag = 'BUY NOW' | 'DETAILS' | 'PICKUP';

export interface Order {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    tag: OrderTag;
    productName: string;
    size: string;
    gender: string;
    customerName: string;
    price: number;
    timeAgo: string;
    imageUrl?: string;
    // New order — urgency to confirm
    confirmWithinMinutes?: number;
    inventoryReserved?: boolean;
    // Holding — deposit + expiry
    expiresIn?: string;
    depositPaid?: boolean;
    depositAmount?: number;
    // Ready — pickup wait tracking
    readySince?: string;
    customerNotified?: boolean;
    waitingSince?: string;
    // Completed / cancelled
    completedDate?: string;
    cancelledDate?: string;
    cancelledBy?: string;
}