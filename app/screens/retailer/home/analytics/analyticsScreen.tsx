import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import BaseContainer from '@/components/shared/BaseContainer';
import { useAnalytics } from '@/services/hooks/retailer/home/useAnalytics';
import AnalyticsHeader from '@/components/retailer/home/analytics/AnalyticsHeader';
import AnalyticsTimeFilter from '@/components/retailer/home/analytics/AnalyticsTimeFilter';
import AnalyticsRevenueCard from '@/components/retailer/home/analytics/AnalyticsRevenueCard';
import AnalyticsStatCards from '@/components/retailer/home/analytics/AnalyticsStatCards';
import AnalyticsRevenueChart from '@/components/retailer/home/analytics/AnalyticsReveueChart';
import AnalyticsTopProducts from '@/components/retailer/home/analytics/AnalyticsTopProduct';
import AnalyticsOrderStatus from '@/components/retailer/home/analytics/AnalyticsOrderStatus';
import AnalyticsSizes from '@/components/retailer/home/analytics/AnalyticsSizes';

const AnalyticsScreen: React.FC = () => {
    const {
        activeFilter,
        chartMode,
        data,
        barData,
        barLabels,
        handleFilterChange,
        handleChartModeChange,
    } = useAnalytics();

    return (
        <BaseContainer scrollable backgroundColor='#fff'>
            <View className='pt-10'>
                <AnalyticsHeader />

                <AnalyticsTimeFilter
                    active={activeFilter}
                    onChange={handleFilterChange}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={s.body}
                >
                    <AnalyticsRevenueCard
                        totalRevenue={data.totalRevenue}
                        revenueChange={data.revenueChange}
                        sparklineData={data.sparklineData}
                    />

                    <AnalyticsStatCards
                        orders={data.orders}
                        ordersChange={data.ordersChange}
                        rating={data.rating}
                        totalRatings={data.totalRatings}
                    />

                    <AnalyticsRevenueChart
                        chartMode={chartMode}
                        barData={barData}
                        barLabels={barLabels}
                        onChartModeChange={handleChartModeChange}
                    />

                    <AnalyticsTopProducts products={data.topProducts} />

                    <AnalyticsOrderStatus orderStatus={data.orderStatus} />

                    <AnalyticsSizes sizes={data.sizes} />
                </ScrollView>
            </View>
        </BaseContainer>
    );
};

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F9FAFB', paddingTop: 52 },
    body: { paddingHorizontal: 16, paddingTop: 4 },
});

export default AnalyticsScreen;