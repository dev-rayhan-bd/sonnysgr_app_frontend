import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import BaseContainer from '@/components/shared/BaseContainer';
import {
  useCreatePromotion,
  type PromotionTypeOption,
  type CategoryTag,
  type AudienceSegment,
  type PromotionStep,
} from '@/services/hooks/retailer/promote/useCreatePromotion';

const STEPS: { key: PromotionStep; label: string }[] = [
  { key: 'details', label: 'Details' },
  { key: 'audience', label: 'Audience' },
  { key: 'review', label: 'Review' },
];

export default function CreatePromotionScreen() {
  const router = useRouter();
  const promo = useCreatePromotion();

  return (
    <BaseContainer scrollable backgroundColor="#fff">
      <View style={{ paddingBottom: 120 }}>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Feather name="arrow-left" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Create Promotion</Text>
          <TouchableOpacity
            onPress={() => router.push('/screens/retailer/promote/promotionHistoryScreen')}
            style={s.historyBtn}
          >
            <Feather name="clock" size={15} color="#10B981" />
            <Text style={s.historyText}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Stepper */}
        <View style={s.stepperRow}>
          {STEPS.map((st, i) => (
            <React.Fragment key={st.key}>
              <StepDot
                index={i + 1}
                label={st.label}
                state={getStepState(st.key, promo.step)}
                onPress={() => promo.goToStep(st.key)}
              />
              {i < STEPS.length - 1 && <View style={s.stepConnector} />}
            </React.Fragment>
          ))}
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          {promo.step === 'details' && <DetailsStep promo={promo} />}
          {promo.step === 'audience' && <AudienceStep promo={promo} />}
          {promo.step === 'review' && <ReviewStep promo={promo} />}
        </View>

        {/* Footer button */}
        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <TouchableOpacity
            style={[
              s.reviewBtn,
              promo.step === 'review'
                ? { opacity: promo.canSubmit ? 1 : 0.5 }
                : { opacity: promo.step === 'details' ? (promo.canGoToAudience ? 1 : 0.5) : promo.canGoToReview ? 1 : 0.5 },
            ]}
            disabled={promo.step === 'review' ? !promo.canSubmit : promo.step === 'details' ? !promo.canGoToAudience : !promo.canGoToReview}
            onPress={promo.step === 'review' ? undefined : promo.goNext}
          >
            <Text style={s.reviewBtnText}>
              {promo.step === 'review' ? 'Review Promotion' : promo.step === 'details' ? 'Continue to Audience' : 'Continue to Review'}
            </Text>
          </TouchableOpacity>
          {promo.step === 'review' && (
            <Text style={s.reviewFootnote}>Nothing will be sent until you confirm on the next screen.</Text>
          )}
        </View>
      </View>
    </BaseContainer>
  );
}

function getStepState(key: PromotionStep, current: PromotionStep): 'done' | 'active' | 'upcoming' {
  const order: PromotionStep[] = ['details', 'audience', 'review'];
  const curIdx = order.indexOf(current);
  const idx = order.indexOf(key);
  if (idx < curIdx) return 'done';
  if (idx === curIdx) return 'active';
  return 'upcoming';
}

function StepDot({
  index,
  label,
  state,
  onPress,
}: {
  index: number;
  label: string;
  state: 'done' | 'active' | 'upcoming';
  onPress: () => void;
}) {
  const bg = state === 'upcoming' ? '#F3F4F6' : '#10B981';
  const textColor = state === 'upcoming' ? '#9CA3AF' : '#fff';
  const labelColor = state === 'upcoming' ? '#9CA3AF' : '#111827';

  return (
    <TouchableOpacity onPress={onPress} style={s.stepDotWrap} disabled={state === 'upcoming'}>
      <View style={[s.stepDot, { backgroundColor: bg }]}>
        {state === 'done' ? (
          <Feather name="check" size={13} color="#fff" />
        ) : (
          <Text style={{ color: textColor, fontSize: 12, fontWeight: '800' }}>{index}</Text>
        )}
      </View>
      <Text style={[s.stepLabel, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ------------------------------- DETAILS STEP ------------------------------- */

function DetailsStep({ promo }: { promo: ReturnType<typeof useCreatePromotion> }) {
  return (
    <View>
      {/* Promotion type */}
      <Text style={s.sectionTitle}>Promotion type</Text>
      <View style={s.typeRow}>
        {promo.promotionTypes.map((opt) => (
          <PromotionTypeChip
            key={opt.id}
            option={opt}
            selected={promo.selectedType === opt.id}
            onSelect={() => promo.setSelectedType(opt.id)}
          />
        ))}
      </View>

      {/* Locations */}
      <Text style={[s.sectionTitle, { marginTop: 24 }]}>Locations</Text>
      <TouchableOpacity style={s.locationsCard}>
        <View style={s.locationsIconWrap}>
          <Feather name="home" size={16} color="#4B5563" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.locationsTitle}>All 3 locations</Text>
          <Text style={s.locationsSubtitle}>Customers will see availability for their nearest store</Text>
        </View>
        <Feather name="chevron-right" size={18} color="#D1D5DB" />
      </TouchableOpacity>

      {/* Promotion details */}
      <Text style={[s.sectionTitle, { marginTop: 24 }]}>Promotion details</Text>
      <Text style={s.fieldLabel}>Promotion title</Text>
      <View style={s.inputBox}>
        <TextInput
          value={promo.title}
          onChangeText={promo.setTitle}
          maxLength={80}
          placeholder="e.g. Weekend Flash Sale — 20% Off Jordans"
          placeholderTextColor="#9CA3AF"
          style={s.inputText}
        />
      </View>
      <Text style={s.charCounter}>{promo.title.length}/80</Text>

      {/* Product targeting */}
      <Text style={[s.sectionTitle, { marginTop: 20 }]}>Product targeting</Text>
      <Text style={s.fieldLabel}>Keywords or product names</Text>
      <View style={s.searchBox}>
        <Feather name="search" size={16} color="#9CA3AF" />
        <TextInput
          value={promo.keywordInput}
          onChangeText={promo.setKeywordInput}
          onSubmitEditing={promo.addKeyword}
          placeholder="Add keywords or product names (e.g. Jordan, Air Max, Dunk)"
          placeholderTextColor="#9CA3AF"
          style={s.searchInput}
          returnKeyType="done"
        />
      </View>

      <View style={s.keywordChipsRow}>
        {promo.keywords.map((kw) => (
          <View key={kw} style={s.keywordChip}>
            <Text style={s.keywordChipText}>{kw}</Text>
            <TouchableOpacity onPress={() => promo.toggleKeyword(kw)} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
              <Feather name="x" size={12} color="#059669" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={s.addKeywordChip} onPress={promo.addKeyword}>
          <Feather name="plus" size={12} color="#4B5563" />
          <Text style={s.addKeywordText}>Add keyword</Text>
        </TouchableOpacity>
      </View>

      {/* Category tags */}
      <View style={s.categoryTagsRow}>
        {promo.availableCategoryTags.map((tag) => (
          <TouchableOpacity
            key={tag}
            onPress={() => promo.toggleCategoryTag(tag)}
            style={[s.categoryTag, promo.categoryTags.includes(tag) && s.categoryTagActive]}
          >
            <Text
              style={[
                s.categoryTagText,
                promo.categoryTags.includes(tag) && s.categoryTagTextActive,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Match rule */}
      <Text style={[s.fieldLabel, { marginTop: 18 }]}>Match rule</Text>
      <TouchableOpacity style={s.matchRuleSelect}>
        <Text style={s.matchRuleText}>{promo.matchRule}</Text>
        <Feather name="chevron-down" size={16} color="#6B7280" />
      </TouchableOpacity>

      {/* Matching listings banner */}
      <View style={s.matchBanner}>
        <Feather name="bar-chart-2" size={16} color="#059669" />
        <Text style={s.matchBannerText}>{promo.activeListingsMatched} active listings match</Text>
        <Text style={s.matchBannerLink}>Preview matching products →</Text>
      </View>
      <Text style={s.matchBannerFootnote}>
        All matching active listings will be included automatically.
      </Text>

      {/* Discount */}
      <Text style={[s.sectionTitle, { marginTop: 20 }]}>Discount</Text>
      <View style={s.discountTabsRow}>
        {(['% off', '$ off', 'Custom'] as const).map((dt) => (
          <TouchableOpacity
            key={dt}
            onPress={() => promo.setDiscountType(dt)}
            style={[s.discountTab, promo.discountType === dt && s.discountTabActive]}
          >
            <Text style={[s.discountTabText, promo.discountType === dt && s.discountTabTextActive]}>
              {dt === '% off' ? `${promo.discountValue}% off` : dt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.dateRow}>
        <View style={s.dateCell}>
          <Feather name="calendar" size={13} color="#9CA3AF" />
          <View>
            <Text style={s.dateLabel}>Starts</Text>
            <Text style={s.dateValue}>{promo.startsAt}</Text>
          </View>
        </View>
        <View style={s.dateCell}>
          <Feather name="calendar" size={13} color="#9CA3AF" />
          <View>
            <Text style={s.dateLabel}>Ends</Text>
            <Text style={s.dateValue}>{promo.endsAt}</Text>
          </View>
        </View>
      </View>

      <View style={s.autoApplyNote}>
        <Feather name="info" size={13} color="#6B7280" />
        <Text style={s.autoApplyNoteText}>
          This discount will automatically apply to all active inventory matching selected keywords or categories at the chosen locations.
        </Text>
      </View>

      {/* Push notification */}
      <Text style={[s.sectionTitle, { marginTop: 20 }]}>Push notification</Text>
      <View style={s.notifInputBox}>
        <TextInput
          value={promo.notificationMessage}
          onChangeText={promo.setNotificationMessage}
          maxLength={promo.notificationCharLimit}
          multiline
          style={s.notifInputText}
        />
      </View>
      <Text style={s.charCounter}>
        {promo.notificationMessage.length}/{promo.notificationCharLimit}
      </Text>

      {/* Notification preview */}
      <View style={s.notifPreviewCard}>
        <View style={s.notifPreviewIcon}>
          <Text style={s.notifPreviewIconText}>SNKR</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.notifPreviewTitle}>GoSNKR</Text>
          <Text style={s.notifPreviewBody} numberOfLines={2}>
            {promo.notificationMessage}
          </Text>
        </View>
        <Text style={s.notifPreviewNow}>now</Text>
      </View>
      <TouchableOpacity>
        <Text style={s.previewFullLink}>Preview full customer view →</Text>
      </TouchableOpacity>
    </View>
  );
}

function PromotionTypeChip({
  option,
  selected,
  onSelect,
}: {
  option: PromotionTypeOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const iconName =
    option.icon === 'zap'
      ? 'zap'
      : option.icon === 'box'
      ? 'package'
      : option.icon === 'bell'
      ? 'bell'
      : option.icon === 'circle'
      ? 'circle'
      : 'megaphone';

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        s.typeChip,
        { backgroundColor: selected ? option.bgColor : '#F9FAFB' },
        selected && { borderColor: option.color, borderWidth: 1.5 },
      ]}
    >
      {option.icon === 'circle' ? (
        <Feather name="circle" size={20} color={option.color} />
      ) : option.icon === 'megaphone' ? (
        <MaterialCommunityIcons name="bullhorn-outline" size={20} color={selected ? option.color : '#9CA3AF'} />
      ) : (
        <Feather name={iconName as any} size={20} color={selected ? option.color : '#9CA3AF'} />
      )}
      <Text style={[s.typeChipText, selected && { color: option.color, fontWeight: '800' }]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
}

/* ------------------------------- AUDIENCE STEP ------------------------------- */

function AudienceStep({ promo }: { promo: ReturnType<typeof useCreatePromotion> }) {
  return (
    <View>
      <Text style={s.sectionTitle}>Audience</Text>
      {promo.audienceSegments.map((seg) => (
        <AudienceRow
          key={seg.id}
          segment={seg}
          checked={promo.selectedAudience[seg.id]}
          onToggle={() => promo.toggleAudienceSegment(seg.id)}
        />
      ))}

      <View style={s.reachBanner}>
        <Feather name="bar-chart-2" size={16} color="#059669" />
        <Text style={s.reachBannerText}>
          Estimated unique reach: {promo.estimatedUniqueReach.toLocaleString()} people
        </Text>
      </View>
      <Text style={s.reachFootnote}>Overlapping audiences count once here.</Text>

      {/* Delivery */}
      <Text style={[s.sectionTitle, { marginTop: 24 }]}>Delivery</Text>
      <View style={s.deliveryRow}>
        <TouchableOpacity
          onPress={() => promo.setDeliveryOption('send_now')}
          style={[s.deliveryTab, promo.deliveryOption === 'send_now' && s.deliveryTabActive]}
        >
          <Text style={[s.deliveryTabText, promo.deliveryOption === 'send_now' && s.deliveryTabTextActive]}>
            Send now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => promo.setDeliveryOption('schedule')}
          style={[s.deliveryTab, promo.deliveryOption === 'schedule' && s.deliveryTabActive]}
        >
          <Text style={[s.deliveryTabText, promo.deliveryOption === 'schedule' && s.deliveryTabTextActive]}>
            Schedule
          </Text>
        </TouchableOpacity>
      </View>

      {promo.deliveryOption === 'schedule' && (
        <View style={s.scheduleRow}>
          <Feather name="calendar" size={14} color="#9CA3AF" />
          <Text style={s.scheduleText}>{promo.scheduledAt}</Text>
          <Feather name="chevron-right" size={16} color="#D1D5DB" style={{ marginLeft: 'auto' }} />
        </View>
      )}
      <Text style={s.scheduleFootnote}>Local time for each selected store</Text>
    </View>
  );
}

function AudienceRow({
  segment,
  checked,
  onToggle,
}: {
  segment: AudienceSegment;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <TouchableOpacity style={s.audienceRow} onPress={onToggle} activeOpacity={0.7}>
      <View style={[s.checkbox, checked && s.checkboxChecked]}>
        {checked && <Feather name="check" size={13} color="#fff" />}
      </View>
      <View style={s.audienceIconWrap}>
        <Feather name={segment.icon} size={15} color="#4B5563" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.audienceLabel}>{segment.label}</Text>
        <Text style={s.audienceDescription}>{segment.description}</Text>
      </View>
      <Text style={s.audienceCount}>{segment.count.toLocaleString()}</Text>
    </TouchableOpacity>
  );
}

/* ------------------------------- REVIEW STEP ------------------------------- */

function ReviewStep({ promo }: { promo: ReturnType<typeof useCreatePromotion> }) {
  const selectedSegments = promo.audienceSegments.filter((seg) => promo.selectedAudience[seg.id]);

  return (
    <View>
      <Text style={s.sectionTitle}>Review your promotion</Text>

      <View style={s.reviewCard}>
        <Text style={s.reviewCardLabel}>Type</Text>
        <Text style={s.reviewCardValue}>{promo.selectedType}</Text>
      </View>

      <View style={s.reviewCard}>
        <Text style={s.reviewCardLabel}>Title</Text>
        <Text style={s.reviewCardValue}>{promo.title}</Text>
      </View>

      <View style={s.reviewCard}>
        <Text style={s.reviewCardLabel}>Discount</Text>
        <Text style={s.reviewCardValue}>
          {promo.discountType === '% off' ? `${promo.discountValue}% off` : promo.discountType}
        </Text>
        <Text style={s.reviewCardSubvalue}>
          {promo.startsAt} → {promo.endsAt}
        </Text>
      </View>

      <View style={s.reviewCard}>
        <Text style={s.reviewCardLabel}>Keywords</Text>
        <Text style={s.reviewCardValue}>{promo.keywords.join(', ') || '—'}</Text>
      </View>

      <View style={s.reviewCard}>
        <Text style={s.reviewCardLabel}>Audience</Text>
        {selectedSegments.map((seg) => (
          <Text key={seg.id} style={s.reviewCardSubvalue}>
            • {seg.label} ({seg.count.toLocaleString()})
          </Text>
        ))}
        <Text style={[s.reviewCardValue, { marginTop: 6 }]}>
          Est. reach: {promo.estimatedUniqueReach.toLocaleString()} people
        </Text>
      </View>

      <View style={s.reviewCard}>
        <Text style={s.reviewCardLabel}>Delivery</Text>
        <Text style={s.reviewCardValue}>
          {promo.deliveryOption === 'send_now' ? 'Send now' : `Scheduled · ${promo.scheduledAt}`}
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 14,
  },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '800', color: '#111827', textAlign: 'center', marginRight: -40 },
  historyBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  historyText: { fontSize: 13, fontWeight: '700', color: '#10B981' },

  stepperRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  stepDotWrap: { alignItems: 'center', width: 56 },
  stepDot: { width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  stepLabel: { fontSize: 10, fontWeight: '700', marginTop: 4 },
  stepConnector: { flex: 1, height: 1, backgroundColor: '#E5E7EB', marginTop: 13, marginHorizontal: -6 },

  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#111827', marginBottom: 12 },

  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeChip: {
    width: '18.5%',
    aspectRatio: 0.85,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  typeChipText: { fontSize: 9, fontWeight: '700', color: '#6B7280', textAlign: 'center' },

  locationsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  locationsIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationsTitle: { fontSize: 13, fontWeight: '800', color: '#111827' },
  locationsSubtitle: { fontSize: 11, color: '#9CA3AF', marginTop: 2, fontWeight: '600' },

  fieldLabel: { fontSize: 12, color: '#6B7280', fontWeight: '700', marginBottom: 8 },
  inputBox: { backgroundColor: '#F9FAFB', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },
  inputText: { fontSize: 14, color: '#111827', fontWeight: '600' },
  charCounter: { fontSize: 10, color: '#D1D5DB', textAlign: 'right', marginTop: 4, fontWeight: '600' },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#111827' },

  keywordChipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  keywordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  keywordChipText: { fontSize: 12, fontWeight: '800', color: '#059669' },
  addKeywordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  addKeywordText: { fontSize: 12, fontWeight: '700', color: '#4B5563' },

  categoryTagsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  categoryTag: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  categoryTagActive: { backgroundColor: '#ECFDF5', borderWidth: 1, borderColor: '#10B981' },
  categoryTagText: { fontSize: 12, fontWeight: '700', color: '#9CA3AF' },
  categoryTagTextActive: { color: '#059669' },

  matchRuleSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  matchRuleText: { fontSize: 13, fontWeight: '700', color: '#111827' },

  matchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
  },
  matchBannerText: { fontSize: 12, fontWeight: '800', color: '#059669' },
  matchBannerLink: { fontSize: 11, fontWeight: '700', color: '#059669', marginLeft: 'auto' },
  matchBannerFootnote: { fontSize: 11, color: '#9CA3AF', marginTop: 8, fontWeight: '600' },

  discountTabsRow: { flexDirection: 'row', gap: 8 },
  discountTab: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 12, borderRadius: 14, alignItems: 'center' },
  discountTabActive: { backgroundColor: '#111827' },
  discountTabText: { fontSize: 13, fontWeight: '800', color: '#6B7280' },
  discountTabTextActive: { color: '#fff' },

  dateRow: { flexDirection: 'row', gap: 12, marginTop: 14 },
  dateCell: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: '600' },
  dateValue: { fontSize: 12, fontWeight: '700', color: '#111827', marginTop: 1 },

  autoApplyNote: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
  },
  autoApplyNoteText: { flex: 1, fontSize: 11, color: '#6B7280', lineHeight: 16, fontWeight: '600' },

  notifInputBox: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 14, minHeight: 70 },
  notifInputText: { fontSize: 13, color: '#111827', fontWeight: '600', textAlignVertical: 'top' },

  notifPreviewCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    gap: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  notifPreviewIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifPreviewIconText: { color: '#fff', fontSize: 7, fontWeight: '900' },
  notifPreviewTitle: { fontSize: 12, fontWeight: '800', color: '#111827' },
  notifPreviewBody: { fontSize: 12, color: '#4B5563', marginTop: 2, fontWeight: '600' },
  notifPreviewNow: { fontSize: 10, color: '#9CA3AF', fontWeight: '600' },
  previewFullLink: { fontSize: 12, fontWeight: '800', color: '#059669', marginTop: 10 },

  reviewBtn: { backgroundColor: '#111827', height: 58, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  reviewBtnText: { color: '#fff', fontSize: 15, fontWeight: '900' },
  reviewFootnote: { textAlign: 'center', fontSize: 11, color: '#9CA3AF', marginTop: 10, fontWeight: '600' },

  /* Audience step */
  audienceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: '#10B981', borderColor: '#10B981' },
  audienceIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audienceLabel: { fontSize: 13, fontWeight: '800', color: '#111827' },
  audienceDescription: { fontSize: 11, color: '#9CA3AF', marginTop: 2, fontWeight: '600' },
  audienceCount: { fontSize: 13, fontWeight: '800', color: '#111827' },

  reachBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
  },
  reachBannerText: { fontSize: 13, fontWeight: '800', color: '#059669' },
  reachFootnote: { fontSize: 11, color: '#9CA3AF', marginTop: 6, fontWeight: '600' },

  deliveryRow: { flexDirection: 'row', gap: 8 },
  deliveryTab: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  deliveryTabActive: { backgroundColor: '#111827' },
  deliveryTabText: { fontSize: 13, fontWeight: '800', color: '#6B7280' },
  deliveryTabTextActive: { color: '#fff' },
  scheduleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F9FAFB', borderRadius: 14, padding: 14, marginTop: 12 },
  scheduleText: { fontSize: 13, fontWeight: '700', color: '#111827' },
  scheduleFootnote: { fontSize: 11, color: '#9CA3AF', marginTop: 8, fontWeight: '600' },

  /* Review step */
  reviewCard: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 14, marginBottom: 10 },
  reviewCardLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '700', marginBottom: 4 },
  reviewCardValue: { fontSize: 14, fontWeight: '800', color: '#111827' },
  reviewCardSubvalue: { fontSize: 12, color: '#6B7280', marginTop: 3, fontWeight: '600' },
});