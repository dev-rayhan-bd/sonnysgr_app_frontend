import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Order, OrderStatus } from '@/types/Orders';

interface OrderCardProps {
    order: Order;
    onConfirmOrder: (orderId: string) => void;
    onMarkReady: (orderId: string) => void;
    onMarkPickedUp: (orderId: string) => void;
    onViewDetails: (orderId: string) => void;
    onViewHoldDetails: (orderId: string) => void;
}

const TAG_STYLE: Record<string, { bg: string; color: string }> = {
    'BUY NOW': { bg: '#EDE7F6', color: '#4A148C' },
    'DETAILS': { bg: '#EDE7F6', color: '#4A148C' },
    'PICKUP':  { bg: '#EDE7F6', color: '#4A148C' },
};

const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; color: string }> = {
    new:       { label: 'New',       bg: '#E8F5E9', color: '#2E7D32' },
    holding:   { label: 'Holding',   bg: '#FFF3E0', color: '#E65100' },
    ready:     { label: 'Ready',     bg: '#E3F2FD', color: '#1565C0' },
    completed: { label: 'Completed', bg: '#F3F3F3', color: '#555555' },
    cancelled: { label: 'Cancelled', bg: '#FFEBEE', color: '#B71C1C' },
};

type ActionConfig = {
    label: string;
    bg: string;
    onPress: () => void;
};

const getPrimaryAction = (
    status: OrderStatus,
    id: string,
    onConfirm: (id: string) => void,
    onReady: (id: string) => void,
    onPickup: (id: string) => void,
): ActionConfig | null => {
    switch (status) {
        case 'new':     return { label: 'Confirm Order',  bg: '#1B5E20', onPress: () => onConfirm(id) };
        case 'holding': return { label: 'Mark Ready',     bg: '#111111', onPress: () => onReady(id)   };
        case 'ready':   return { label: 'Mark Picked Up', bg: '#1565C0', onPress: () => onPickup(id)  };
        default:        return null;
    }
};

const getSecondaryLabel = (status: OrderStatus): string => {
    if (status === 'holding') return 'View Hold Details';
    return 'View Details';
};

const OrderCard: React.FC<OrderCardProps> = ({
    order,
    onConfirmOrder,
    onMarkReady,
    onMarkPickedUp,
    onViewDetails,
    onViewHoldDetails,
}) => {
    const tagCfg         = TAG_STYLE[order.tag] ?? TAG_STYLE['BUY NOW'];
    const statusCfg      = STATUS_CONFIG[order.status];
    const primary        = getPrimaryAction(order.status, order.id, onConfirmOrder, onMarkReady, onMarkPickedUp);
    const secondaryLabel = getSecondaryLabel(order.status);
    const isCompleted    = order.status === 'completed';
    const isCancelled    = order.status === 'cancelled';
    const showActions    = !isCompleted && !isCancelled;

    const onSecondaryPress = order.status === 'holding'
        ? () => onViewHoldDetails(order.id)
        : () => onViewDetails(order.id);

    return (
        <View style={styles.card}>

            {/* ── Row 1: tag + status pill + time ── */}
            <View style={styles.topRow}>
                <View style={styles.topLeft}>
                    <View style={[styles.tagBadge, { backgroundColor: tagCfg.bg }]}>
                        <Text style={[styles.tagText, { color: tagCfg.color }]}>{order.tag}</Text>
                    </View>
                    <View style={[styles.statusPill, { backgroundColor: statusCfg.bg }]}>
                        <Text style={[styles.statusText, { color: statusCfg.color }]}>
                            {statusCfg.label}
                        </Text>
                    </View>
                </View>
                <Text style={styles.timeText}>{order.timeAgo}</Text>
            </View>

            {/* ── Row 2: image + product info ── */}
            <View style={styles.productRow}>
                <View style={styles.imgWrapper}>
                    {order.imageUrl ? (
                        <Image
                            source={{ uri: order.imageUrl }}
                            style={styles.productImg}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.imgPlaceholder} />
                    )}
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>{order.productName}</Text>
                    <Text style={styles.productMeta}>Size {order.size} · {order.gender}</Text>
                    <Text style={styles.customerName}>{order.customerName}</Text>
                </View>
            </View>

            {/* ── Expiry row (holding only) ── */}
            {order.status === 'holding' && order.expiresIn ? (
                <View style={styles.expiryRow}>
                    <View style={[styles.expiryDot, { backgroundColor: '#FF9800' }]} />
                    <Text style={[styles.expiryText, { color: '#FF9800' }]}>
                        Expires in {order.expiresIn}
                    </Text>
                </View>
            ) : null}

            {/* ── Ready-since row (ready only) ── */}
            {order.status === 'ready' && order.readySince ? (
                <View style={styles.expiryRow}>
                    <View style={[styles.expiryDot, { backgroundColor: '#00C853' }]} />
                    <Text style={[styles.expiryText, { color: '#00C853' }]}>
                        Ready since {order.readySince}
                    </Text>
                </View>
            ) : null}

            {/* ── Customer notified (ready only) ── */}
            {order.status === 'ready' && order.customerNotified && order.readySince ? (
                <Text style={styles.customerNotif}>
                    Customer notified · Ready since{' '}
                    <Text style={styles.customerNotifHighlight}>{order.readySince}</Text>
                </Text>
            ) : null}

            {/* ── Price ── */}
            <Text style={styles.price}>${order.price}</Text>

            {/* ── Completed footer ── */}
            {isCompleted && order.completedDate ? (
                <View style={styles.footerRow}>
                    <View style={styles.checkCircle}>
                        <Text style={styles.checkMark}>✓</Text>
                    </View>
                    <Text style={styles.completedText}>
                        Completed {order.completedDate} · ${order.price}
                    </Text>
                </View>
            ) : null}

            {/* ── Cancelled footer ── */}
            {isCancelled && order.cancelledDate ? (
                <View style={styles.footerRow}>
                    <Text style={styles.cancelledText}>
                        Cancelled by {order.cancelledBy ?? 'customer'} · {order.cancelledDate}
                    </Text>
                </View>
            ) : null}

            {/* ── Action buttons (new / holding / ready only) ── */}
            {showActions ? (
                <>
                    <View style={styles.divider} />
                    <View style={styles.actionRow}>
                        {primary ? (
                            <TouchableOpacity
                                style={[styles.primaryBtn, { backgroundColor: primary.bg }]}
                                onPress={primary.onPress}
                                activeOpacity={0.85}
                            >
                                <Text style={styles.primaryBtnText}>{primary.label}</Text>
                            </TouchableOpacity>
                        ) : null}
                        <TouchableOpacity
                            style={styles.secondaryBtn}
                            onPress={onSecondaryPress}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.secondaryBtnText}>{secondaryLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : null}

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 14,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    topLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    tagBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    statusPill: {
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
    },
    timeText: {
        fontSize: 11,
        color: '#999999',
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 8,
    },
    imgWrapper: {
        width: 56,
        height: 56,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#F0F0F0',
        flexShrink: 0,
    },
    productImg: {
        width: 56,
        height: 56,
    },
    imgPlaceholder: {
        width: 56,
        height: 56,
        backgroundColor: '#E8E8E8',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111111',
        lineHeight: 18,
        marginBottom: 2,
    },
    productMeta: {
        fontSize: 11,
        color: '#888888',
        lineHeight: 15,
        marginBottom: 2,
    },
    customerName: {
        fontSize: 12,
        color: '#666666',
    },
    expiryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 4,
    },
    expiryDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    expiryText: {
        fontSize: 11,
        fontWeight: '500',
    },
    customerNotif: {
        fontSize: 11,
        color: '#888888',
        marginBottom: 4,
    },
    customerNotifHighlight: {
        color: '#1565C0',
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111111',
        marginTop: 4,
        marginBottom: 6,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 2,
    },
    checkCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkMark: {
        fontSize: 9,
        color: '#2E7D32',
        fontWeight: '700',
        lineHeight: 14,
    },
    completedText: {
        fontSize: 11,
        color: '#888888',
    },
    cancelledText: {
        fontSize: 11,
        color: '#D32F2F',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 10,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 8,
    },
    primaryBtn: {
        flex: 1,
        paddingVertical: 9,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryBtnText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    secondaryBtn: {
        flex: 1,
        paddingVertical: 9,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
    },
    secondaryBtnText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333333',
    },
});

export default OrderCard;