import { useCallback, useMemo, useState } from 'react';

export type PromotionStep = 'details' | 'audience' | 'review';

export type PromotionType = 'Flash Sale' | 'New Arrivals' | 'Restock' | 'Exclusive Drop' | 'Announcement';

export interface PromotionTypeOption {
  id: PromotionType;
  label: string;
  icon: 'zap' | 'box' | 'bell' | 'circle' | 'megaphone';
  color: string;
  bgColor: string;
}

export type CategoryTag = 'Sneakers' | 'Clothing' | 'Accessories';

export type MatchRule = 'Match any keyword' | 'Match all keywords';

export type DiscountType = '% off' | '$ off' | 'Custom';

export interface AudienceSegment {
  id: 'store_followers' | 'nearby_opted_in' | 'size_match';
  label: string;
  description: string;
  count: number;
  icon: 'users' | 'map-pin' | 'bar-chart-2';
}

export type DeliveryOption = 'send_now' | 'schedule';

const PROMOTION_TYPES: PromotionTypeOption[] = [
  { id: 'Flash Sale', label: 'Flash Sale', icon: 'zap', color: '#059669', bgColor: '#ECFDF5' },
  { id: 'New Arrivals', label: 'New Arrivals', icon: 'box', color: '#4B5563', bgColor: '#F9FAFB' },
  { id: 'Restock', label: 'Restock', icon: 'bell', color: '#4B5563', bgColor: '#F9FAFB' },
  { id: 'Exclusive Drop', label: 'Exclusive Drop', icon: 'circle', color: '#EF4444', bgColor: '#F9FAFB' },
  { id: 'Announcement', label: 'Announcement', icon: 'megaphone', color: '#4B5563', bgColor: '#F9FAFB' },
];

const CATEGORY_TAGS: CategoryTag[] = ['Sneakers', 'Clothing', 'Accessories'];

const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {
    id: 'store_followers',
    label: 'Store followers',
    description: 'People who follow your store',
    count: 156,
    icon: 'users',
  },
  {
    id: 'nearby_opted_in',
    label: 'Nearby opted-in customers',
    description: 'Users within 5 miles who have push notifications enabled',
    count: 1249,
    icon: 'map-pin',
  },
  {
    id: 'size_match',
    label: 'Size-match customers',
    description: 'Customers who saved sizes that match promotion',
    count: 820,
    icon: 'bar-chart-2',
  },
];

export const useCreatePromotion = () => {
  const [step, setStep] = useState<PromotionStep>('details');

  // Promotion type
  const [selectedType, setSelectedType] = useState<PromotionType>('Flash Sale');

  // Promotion details
  const [title, setTitle] = useState('Weekend Flash Sale — 20% Off Jordans');

  // Product targeting
  const [keywords, setKeywords] = useState<string[]>(['Jordan', 'Retro']);
  const [keywordInput, setKeywordInput] = useState('');
  const [categoryTags, setCategoryTags] = useState<CategoryTag[]>(['Sneakers']);
  const [matchRule, setMatchRule] = useState<MatchRule>('Match any keyword');
  const activeListingsMatched = 48;

  // Discount
  const [discountType, setDiscountType] = useState<DiscountType>('% off');
  const [discountValue, setDiscountValue] = useState('20');
  const [startsAt] = useState('Fri, Jun 7, 6:00 PM');
  const [endsAt] = useState('Sun, Jun 9, 9:00 PM');

  // Push notification
  const [notificationMessage, setNotificationMessage] = useState(
    'This weekend only: Save 20% on selected Jordans while supplies last.'
  );
  const notificationCharLimit = 200;

  // Audience
  const [selectedAudience, setSelectedAudience] = useState<Record<AudienceSegment['id'], boolean>>({
    store_followers: true,
    nearby_opted_in: true,
    size_match: true,
  });

  // Delivery
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('schedule');
  const [scheduledAt] = useState('Friday, Jun 7, 6:00 PM');

  const toggleKeyword = useCallback((kw: string) => {
    setKeywords((prev) => prev.filter((k) => k !== kw));
  }, []);

  const addKeyword = useCallback(() => {
    const trimmed = keywordInput.trim();
    if (trimmed.length === 0) return;
    setKeywords((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    setKeywordInput('');
  }, [keywordInput]);

  const toggleCategoryTag = useCallback((tag: CategoryTag) => {
    setCategoryTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const toggleAudienceSegment = useCallback((id: AudienceSegment['id']) => {
    setSelectedAudience((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const estimatedUniqueReach = useMemo(() => {
    // Rough de-duplicated estimate across selected segments, matching the mock's ~1,842 figure.
    const selectedCounts = AUDIENCE_SEGMENTS.filter((seg) => selectedAudience[seg.id]).map(
      (seg) => seg.count
    );
    if (selectedCounts.length === 0) return 0;
    const raw = selectedCounts.reduce((sum, c) => sum + c, 0);
    // Apply an overlap discount so combined reach isn't a naive sum.
    return Math.round(raw * 0.735);
  }, [selectedAudience]);

  const canGoToAudience = title.trim().length > 0 && keywords.length > 0;
  const canGoToReview = Object.values(selectedAudience).some(Boolean);
  const canSubmit = canGoToAudience && canGoToReview;

  const goToStep = useCallback((next: PromotionStep) => {
    setStep(next);
  }, []);

  const goNext = useCallback(() => {
    if (step === 'details' && canGoToAudience) setStep('audience');
    else if (step === 'audience' && canGoToReview) setStep('review');
  }, [step, canGoToAudience, canGoToReview]);

  const goBack = useCallback(() => {
    if (step === 'audience') setStep('details');
    else if (step === 'review') setStep('audience');
  }, [step]);

  return {
    step,
    goToStep,
    goNext,
    goBack,

    promotionTypes: PROMOTION_TYPES,
    selectedType,
    setSelectedType,

    title,
    setTitle,

    keywords,
    keywordInput,
    setKeywordInput,
    addKeyword,
    toggleKeyword,
    categoryTags,
    availableCategoryTags: CATEGORY_TAGS,
    toggleCategoryTag,
    matchRule,
    setMatchRule,
    activeListingsMatched,

    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,
    startsAt,
    endsAt,

    notificationMessage,
    setNotificationMessage,
    notificationCharLimit,

    audienceSegments: AUDIENCE_SEGMENTS,
    selectedAudience,
    toggleAudienceSegment,
    estimatedUniqueReach,

    deliveryOption,
    setDeliveryOption,
    scheduledAt,

    canGoToAudience,
    canGoToReview,
    canSubmit,
  };
};