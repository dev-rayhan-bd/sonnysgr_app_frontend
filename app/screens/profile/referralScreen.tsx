import React, { useCallback } from 'react'
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useReferral } from '@/services/hooks/profile/useReferral'
import ReferralHero from '@/components/profile/referral/ReferralHero'
import ReferralCodeCard from '@/components/profile/referral/ReferralCodeCard'
import ReferralShareOptions from '@/components/profile/referral/ReferralShareOptions'
import ReferralHowItWorks from '@/components/profile/referral/ReferralHowItWorks'
import ReferralEarnings from '@/components/profile/referral/ReferralLearnings'
import BaseContainer from '@/components/shared/BaseContainer'
const ReferralScreen: React.FC = () => {
    const router = useRouter()
    const {
        referralCode,
        copied,
        entries,
        stats,
        shareOptions,
        copyCode,
        handleShareOption,
    } = useReferral()

    const handleBack = useCallback(() => {
        if (router.canGoBack()) router.back()
    }, [router])

    return (
        <BaseContainer scrollable backgroundColor='#fff'>

            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <ReferralHero onBack={handleBack} />

                <ReferralCodeCard
                    code={referralCode}
                    copied={copied}
                    onCopy={copyCode}
                />

                <ReferralShareOptions
                    options={shareOptions}
                    onSelect={handleShareOption}
                    copied={copied}
                />

                <ReferralHowItWorks />

                <ReferralEarnings stats={stats} entries={entries} />
            </ScrollView>
        </BaseContainer>
    )
}

export default ReferralScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
    },
})