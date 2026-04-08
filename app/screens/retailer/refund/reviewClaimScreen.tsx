import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import BaseContainer from '@/components/shared/BaseContainer';
import ReviewClaimCountdownBanner from '@/components/retailer/refund/ReviewClaimCountDownBanner';
import ReviewClaimCustomer from '@/components/retailer/refund/ReviewClaimCustomer';
import ReviewClaimOrder from '@/components/retailer/refund/ReviewClaimOrder';
import ReviewClaimActions from '@/components/retailer/refund/ReviewClaimActions';
import Toast from 'react-native-toast-message';
import { useClaims } from '@/services/hooks/retailer/refund/useClaims';

const SECTION_LABEL = {
    fontSize: 10,
    fontWeight: '700' as const,
    color: '#9CA3AF',
    letterSpacing: 0.8,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
    backgroundColor: '#F5F5F5',
} as const;

export const ReviewClaimScreen: React.FC = () => {
    const { claimId } = useLocalSearchParams<{ claimId: string }>();

    const {
        newClaims,
        previousClaims,
        isProcessing,
        handleApproveClaim,
        handleRejectClaim,
        handleViewCustomerProfile,
    } = useClaims();

    const [confirmType, setConfirmType] = useState<'approve' | 'reject' | null>(null);
    const [isProcessingAction, setIsProcessingAction] = useState(false);

    const claim = useMemo(() => {
        return [...newClaims, ...previousClaims].find(c => c.id === claimId) ?? null;
    }, [newClaims, previousClaims, claimId]);

    if (!claim) {
        return (
            <BaseContainer backgroundColor="#fff">
                <View style={styles.notFound}>
                    <Text style={{ color: '#9CA3AF', fontSize: 14 }}>
                        Claim not found.
                    </Text>
                </View>
            </BaseContainer>
        );
    }

    const onApprove = () => setConfirmType('approve');
    const onReject = () => setConfirmType('reject');

    const handleConfirm = async () => {
        if (!confirmType) return;

        try {
            setIsProcessingAction(true);

            if (confirmType === 'approve') {
                await handleApproveClaim(claim.id);

                Toast.show({
                    type: 'success',
                    text1: 'Refund Approved',
                    text2: 'The refund has been successfully processed.',
                });
            } else {
                await handleRejectClaim(claim.id);

                Toast.show({
                    type: 'success',
                    text1: 'Claim Rejected',
                    text2: 'The refund claim has been rejected.',
                });
            }

            setConfirmType(null);
            router.back();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1:
                    confirmType === 'approve'
                        ? 'Approval Failed'
                        : 'Rejection Failed',
                text2: 'Something went wrong. Try again.',
            });
        } finally {
            setIsProcessingAction(false);
        }
    };

    return (
        <BaseContainer backgroundColor="#fff">
            <View style={styles.container} className="pt-10">

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="chevron-left" size={24} color="#111" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Review Claim</Text>

                    <TouchableOpacity onPress={() => console.log('edit claim', claim.id)}>
                        <Text style={styles.editBtn}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* Countdown */}
                {claim.status === 'pending' && (
                    <ReviewClaimCountdownBanner
                        deadlineIso={claim.deadlineIso}
                        deadlineDisplay={claim.deadlineDisplay}
                    />
                )}

                {/* Body */}
                <ScrollView
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={SECTION_LABEL}>CUSTOMER</Text>
                    <ReviewClaimCustomer
                        customer={claim.customer}
                        onViewProfile={handleViewCustomerProfile}
                    />

                    <Text style={SECTION_LABEL}>ORDER</Text>
                    <ReviewClaimOrder order={claim.order} />

                    {claim.status === 'pending' && (
                        <ReviewClaimActions
                            depositAmount={claim.order.depositAmount}
                            isProcessing={isProcessing}
                            onApprove={onApprove}
                            onReject={onReject}
                        />
                    )}
                </ScrollView>

                {/* Confirmation Modal */}
                {confirmType && (
                    <View style={styles.modalOverlay}>
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>
                                {confirmType === 'approve'
                                    ? 'Approve Refund'
                                    : 'Reject Claim'}
                            </Text>

                            <Text style={styles.modalDesc}>
                                {confirmType === 'approve'
                                    ? `Release $${claim.order.depositAmount.toFixed(
                                          2
                                      )} to ${claim.customer.name}?`
                                    : 'Are you sure you want to reject this refund claim?'}
                            </Text>

                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={styles.modalCancel}
                                    onPress={() => setConfirmType(null)}
                                    disabled={isProcessingAction}
                                >
                                    <Text style={styles.modalCancelText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.modalConfirm,
                                        confirmType === 'reject' && {
                                            backgroundColor: '#DC2626',
                                        },
                                    ]}
                                    onPress={handleConfirm}
                                    disabled={isProcessingAction}
                                >
                                    <Text style={styles.modalConfirmText}>
                                        {isProcessingAction
                                            ? 'Processing...'
                                            : 'Confirm'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </BaseContainer>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10,
    },

    title: { fontSize: 17, fontWeight: '700', color: '#111' },

    editBtn: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },

    scroll: { flex: 1 },

    scrollContent: { paddingBottom: 24 },

    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },

    modal: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
    },

    modalTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },

    modalDesc: {
        fontSize: 13,
        color: '#4B5563',
        marginTop: 8,
        lineHeight: 18,
    },

    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
        gap: 8,
    },

    modalCancel: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    modalCancelText: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '600',
    },

    modalConfirm: {
        backgroundColor: '#111',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },

    modalConfirmText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
});

export default ReviewClaimScreen;