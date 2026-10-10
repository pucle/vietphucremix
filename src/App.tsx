import React, { useState, useEffect, useRef } from 'react';
import {
  TRADITIONAL_COSTUMES,
  EVENTS,
  COLOR_OPTIONS,
  BOTTOMS,
  FOOTWEAR,
  ACCESSORIES,
  CostumeItem,
  EventOption,
  ColorOption,
  ClothingPiece,
  checkCulturalRules,
  evaluateColorHarmony,
  StylingRuleViolation,
} from './data/costumesData';
import { OutfitVisualizer } from './components/OutfitVisualizer';
import { WardrobeItemCard } from './components/WardrobeItemCard';
import { CulturalBottomSheet } from './components/CulturalBottomSheet';
import { LookbookModal } from './components/LookbookModal';
import { IntroHeroModal } from './components/IntroHeroModal';
import { OutfitConfig } from './components/CompareModal';
import { AvatarGender, HeritagePatternType } from './components/LayeredAvatarEngine';
import {
  Shirt,
  Layers,
  Crown,
  Sparkles,
  Footprints,
  Palette,
  Search,
  Filter,
  Info,
  Heart,
  Check,
  ArrowRightLeft,
  RefreshCw,
  X,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  HelpCircle,
  MoreVertical,
} from 'lucide-react';

// Custom SVG Avatars for Character Gender Selection (Young Vietnamese Gen Z)
const FemaleAvatarIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 drop-shadow-2xs" fill="none">
    <circle cx="12" cy="12" r="11" fill={active ? '#BE123C' : '#F5EBE1'} stroke={active ? '#FFFFFF' : '#E2D3C1'} strokeWidth="1" />
    <rect x="11" y="15.5" width="2" height="3" fill="#F8D7BE" />
    <path d="M9 18 Q 12 19.5 15 18 L16 23 L8 23 Z" fill="#DC2626" />
    <path d="M8.5 11 C8.5 7.5, 15.5 7.5, 15.5 11 C15.5 14.5, 13.8 16.8, 12 16.8 C10.2 16.8, 8.5 14.5, 8.5 11 Z" fill="#FDEFE4" />
    <circle cx="9.8" cy="12.5" r="1.1" fill="#F43F5E" opacity="0.3" />
    <circle cx="14.2" cy="12.5" r="1.1" fill="#F43F5E" opacity="0.3" />
    <ellipse cx="10.5" cy="11.5" rx="0.9" ry="1.1" fill="#2E1C14" />
    <circle cx="10.2" cy="11.1" r="0.35" fill="#FFFFFF" />
    <ellipse cx="13.5" cy="11.5" rx="0.9" ry="1.1" fill="#2E1C14" />
    <circle cx="13.2" cy="11.1" r="0.35" fill="#FFFFFF" />
    <path d="M11.3 13.8 Q 12 14.4 12.7 13.8" stroke="#BE123C" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M8 10.5 C8 6, 16 6, 16 10.5 C15 8, 9 8, 8 10.5 Z" fill="#241411" />
    <path d="M8 10.5 Q 9.5 13 9.5 15.5" stroke="#241411" strokeWidth="1.2" fill="none" />
    <path d="M16 10.5 Q 14.5 13 14.5 15.5" stroke="#241411" strokeWidth="1.2" fill="none" />
  </svg>
);

const MaleAvatarIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 drop-shadow-2xs" fill="none">
    <circle cx="12" cy="12" r="11" fill={active ? '#78350F' : '#EAE3D5'} stroke={active ? '#FFFFFF' : '#D0C3B0'} strokeWidth="1" />
    <rect x="10.8" y="15.5" width="2.4" height="3" fill="#F8D7BE" />
    <path d="M8.5 18 Q 12 19.5 15.5 18 L16.5 23 L7.5 23 Z" fill="#1E293B" />
    <path d="M8.5 11 C8.5 7, 15.5 7, 15.5 11 C15.5 15, 13.8 17, 12 17 C10.2 17, 8.5 15, 8.5 11 Z" fill="#FDEFE4" />
    <ellipse cx="10.5" cy="11.5" rx="0.9" ry="1.1" fill="#1C1917" />
    <circle cx="10.2" cy="11.1" r="0.35" fill="#FFFFFF" />
    <ellipse cx="13.5" cy="11.5" rx="0.9" ry="1.1" fill="#1C1917" />
    <circle cx="13.2" cy="11.1" r="0.35" fill="#FFFFFF" />
    <path d="M11.4 14 Q 12 14.6 12.6 14" stroke="#9A3412" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M8 10.5 C8 6, 16 6, 16 10.5 C14.5 7.5, 9.5 7.5, 8 10.5 Z" fill="#1C1917" />
    <path d="M8.5 9.5 L10 11 L11 9.5 L12.5 11.5 L14 9.5 L15.5 10.5" stroke="#292524" strokeWidth="1" fill="#1C1917" />
  </svg>
);

type WardrobeCategory = 'tops' | 'bottoms' | 'headwear' | 'accessories' | 'shoes' | 'colors';

export const HERITAGE_PATTERNS: { id: HeritagePatternType; name: string; desc: string }[] = [
  { id: 'sen', name: 'Hoa Sen Tây Hồ', desc: 'Thanh cao thuần hậu' },
  { id: 'trong_dong', name: 'Trống Đồng Đông Sơn', desc: 'Hào khí Đại Việt' },
  { id: 'chu_tho', name: 'Chữ Thọ Hoàng Gia', desc: 'Gấm vóc cung đình' },
  { id: 'van_may', name: 'Vân Mây Cổ', desc: 'Uyển chuyển phóng khoáng' },
  { id: 'none', name: 'Lụa Mộc Trơn', desc: 'Tinh giản mộc mạc' },
];

export default function App() {
  // Wardrobe active category
  const [activeCategory, setActiveCategory] = useState<WardrobeCategory>('tops');

  // Avatar Character Gender state ('female': An Nhiên | 'male': Minh Triết)
  const [avatarGender, setAvatarGender] = useState<AvatarGender>('female');

  // Heritage Brocade Pattern state
  const [heritagePattern, setHeritagePattern] = useState<HeritagePatternType>('sen');
  const [colorSubTab, setColorSubTab] = useState<'colors' | 'patterns'>('colors');

  // Active outfit state
  const [selectedCostume, setSelectedCostume] = useState<CostumeItem>(TRADITIONAL_COSTUMES[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);
  const [selectedBottom, setSelectedBottom] = useState<ClothingPiece>(BOTTOMS[0]);
  const [selectedFootwear, setSelectedFootwear] = useState<ClothingPiece>(FOOTWEAR[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<ClothingPiece[]>([ACCESSORIES[3]]); // Tote
  const [styleMode, setStyleMode] = useState<'traditional' | 'light_modern' | 'genz_streetwear'>('light_modern');

  // Camera zoom state: 'full' | 'upper' | 'lower'
  const [cameraZoom, setCameraZoom] = useState<'full' | 'upper' | 'lower'>('full');

  // Split-screen comparison mode
  const [isSplitScreen, setIsSplitScreen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventFilter, setSelectedEventFilter] = useState<EventOption | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Favorites state
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('vietphuc_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Saved Lookbook state
  const [savedOutfits, setSavedOutfits] = useState<(OutfitConfig & { id: string; savedAt: string; eventName: string })[]>(() => {
    try {
      const stored = localStorage.getItem('vietphuc_remix_lookbook');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Ephemeral item name tag near character
  const [ephemeralLabel, setEphemeralLabel] = useState<string>(TRADITIONAL_COSTUMES[0].name);
  const [isLabelVisible, setIsLabelVisible] = useState(true);
  const labelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Modals & Bottom Sheets
  const [bottomSheetType, setBottomSheetType] = useState<'info' | 'violation' | null>(null);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [hasSavedCurrent, setHasSavedCurrent] = useState(false);
  const [showHarmonyPopover, setShowHarmonyPopover] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Save lookbook to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vietphuc_remix_lookbook', JSON.stringify(savedOutfits));
    } catch (e) {
      console.error(e);
    }
  }, [savedOutfits]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vietphuc_favorites', JSON.stringify(favoriteIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteIds]);

  // Log active character, outfit and expected image asset on each change
  useEffect(() => {
    const isFemale = avatarGender === 'female';
    const characterName = isFemale ? 'An Nhiên (Nữ)' : 'Minh Triết (Nam)';
    const expectedBaseImage = isFemale ? '/characters/an_nhien_base.jpg' : '/characters/minh_triet_base.png (CHƯA CÓ)';
    console.log('[Việt Phục Remix] Cập nhật nhân vật & trang phục:', {
      gender: avatarGender,
      character: characterName,
      costume: selectedCostume.name,
      costumeId: selectedCostume.id,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      bottom: selectedBottom.name,
      footwear: selectedFootwear.name,
      accessories: selectedAccessories.map((a) => a.name),
      pattern: heritagePattern,
      baseImageFile: expectedBaseImage,
    });
  }, [avatarGender, selectedCostume, selectedColor, selectedBottom, selectedFootwear, selectedAccessories, heritagePattern]);

  // Helper to trigger temporary name badge near mannequin
  const triggerEphemeralLabel = (label: string) => {
    setEphemeralLabel(label);
    setIsLabelVisible(true);
    setHasSavedCurrent(false);
    if (labelTimeoutRef.current) {
      clearTimeout(labelTimeoutRef.current);
    }
    labelTimeoutRef.current = setTimeout(() => {
      setIsLabelVisible(false);
    }, 3800);
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter((item) => item !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  };

  // Cultural violations and color harmony
  const violations = checkCulturalRules(
    selectedCostume,
    selectedBottom,
    selectedFootwear,
    selectedAccessories,
    selectedEventFilter?.id
  );
  const harmony = evaluateColorHarmony(selectedColor, selectedBottom, selectedCostume);

  // Prioritize most severe alert
  const topViolation =
    violations.find((v) => v.level === 'warning') ||
    violations.find((v) => v.level === 'caution') ||
    violations[0];

  // Auto-apply cultural recommendation
  const handleApplyRecommendation = () => {
    if (selectedCostume.formality_level === 'royal' && selectedBottom.id === 'quan_jeans_denim') {
      setSelectedBottom(BOTTOMS[0]);
    }
    if (selectedCostume.id === 'ao_tac' && selectedFootwear.id === 'sneaker_trang') {
      setSelectedFootwear(FOOTWEAR[3]);
    }
    if (selectedCostume.id === 'ao_ba_ba' && selectedAccessories.some((a) => a.id === 'non_quai_thao')) {
      setSelectedAccessories([
        ...selectedAccessories.filter((a) => a.id !== 'non_quai_thao'),
        ACCESSORIES.find((a) => a.id === 'non_la_chop')!,
      ]);
    }
    if (selectedCostume.id === 'ao_tu_than' && selectedBottom.id === 'quan_au_suong') {
      setSelectedBottom(BOTTOMS.find((b) => b.id === 'vay_dup_den') || BOTTOMS[0]);
    }
    triggerEphemeralLabel('Đã căn chỉnh trang phục chuẩn mực');
  };

  // Reference outfit for split-screen comparison
  const referenceOutfit: OutfitConfig = {
    costume: selectedCostume,
    color: COLOR_OPTIONS.find((c) => c.hex === selectedCostume.defaultColor) || COLOR_OPTIONS[0],
    bottom: BOTTOMS.find((b) => b.id === selectedCostume.defaultBottomId) || BOTTOMS[0],
    footwear: FOOTWEAR.find((f) => f.id === selectedCostume.defaultFootwearId) || FOOTWEAR[0],
    accessories: ACCESSORIES.filter((a) => selectedCostume.defaultAccessoryIds.includes(a.id)),
    styleMode: 'traditional',
    name: 'Bản Chuẩn Cổ Truyền',
  };

  const currentOutfitConfig: OutfitConfig = {
    costume: selectedCostume,
    color: selectedColor,
    bottom: selectedBottom,
    footwear: selectedFootwear,
    accessories: selectedAccessories,
    styleMode,
    name: `Remix ${selectedCostume.name}`,
  };

  // Reset to authentic original
  const handleResetOutfit = () => {
    setSelectedColor(COLOR_OPTIONS.find((c) => c.hex === selectedCostume.defaultColor) || COLOR_OPTIONS[0]);
    setSelectedBottom(BOTTOMS.find((b) => b.id === selectedCostume.defaultBottomId) || BOTTOMS[0]);
    setSelectedFootwear(FOOTWEAR.find((f) => f.id === selectedCostume.defaultFootwearId) || FOOTWEAR[0]);
    setSelectedAccessories(
      ACCESSORIES.filter((a) => selectedCostume.defaultAccessoryIds.includes(a.id))
    );
    setStyleMode('traditional');
    setCameraZoom('full');
    triggerEphemeralLabel(`Chuẩn gốc: ${selectedCostume.name}`);
  };

  // Save to Lookbook
  const handleSaveToLookbook = () => {
    if (hasSavedCurrent) {
      setIsLookbookOpen(true);
      return;
    }
    const newEntry = {
      id: `outfit-${Date.now()}`,
      costume: selectedCostume,
      color: selectedColor,
      bottom: selectedBottom,
      footwear: selectedFootwear,
      accessories: selectedAccessories,
      styleMode,
      name: `Remix ${selectedCostume.name}`,
      eventName: selectedEventFilter?.name || 'Dạo phố OOTD',
      savedAt: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };
    setSavedOutfits([newEntry, ...savedOutfits]);
    setHasSavedCurrent(true);
  };

  // Category counts
  const headwearItems = ACCESSORIES.filter((a) =>
    ['khan_van_dong', 'non_la_chop', 'non_quai_thao', 'khan_vanh_day'].includes(a.id)
  );
  const generalAccessories = ACCESSORIES.filter(
    (a) => !['khan_van_dong', 'non_la_chop', 'non_quai_thao', 'khan_vanh_day'].includes(a.id)
  );

  // Filter items by search query if any
  const filterList = (items: { id: string; name: string }[]) => {
    if (!searchQuery.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FAF7F2] text-stone-900 flex flex-col font-sans select-none">
      {/* --- TOP THIN BAR: SEARCH, EVENT FILTER, EXIT / INTRO --- */}
      <header className="h-12 border-b border-amber-900/10 bg-[#FAF7F2]/90 backdrop-blur px-3 sm:px-5 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          {/* Logo Badge */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#C0392B] to-[#78350F] flex items-center justify-center text-white font-serif font-black text-xs shadow-2xs">
              V
            </span>
            <span className="font-serif-title font-bold text-sm tracking-tight hidden sm:inline">
              Việt Phục Remix
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm món đồ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs rounded-full bg-white/80 border border-stone-200/90 focus:outline-hidden focus:border-amber-700 w-28 sm:w-44 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Center / Right: Filter Button & Extra Tools */}
        <div className="flex items-center gap-2">
          {/* Event Filter Button */}
          <div className="relative">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition cursor-pointer ${
                selectedEventFilter
                  ? 'bg-amber-900 text-white border-amber-950 shadow-2xs'
                  : 'bg-white/80 text-stone-700 border-stone-200/90 hover:bg-stone-50'
              }`}
            >
              <Filter className="w-3 h-3 text-amber-700" />
              <span>{selectedEventFilter ? selectedEventFilter.name : 'Bộ Lọc'}</span>
            </button>

            {/* Filter Modal Dialog */}
            {isFilterMenuOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs animate-in fade-in">
                <div className="w-full max-w-sm bg-white rounded-3xl border border-stone-200 shadow-2xl p-4.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="font-bold text-sm text-stone-900">Lọc Theo Dịp / Sự Kiện</span>
                    <button
                      onClick={() => {
                        setSelectedEventFilter(null);
                        setIsFilterMenuOpen(false);
                      }}
                      className="text-xs text-amber-800 hover:underline cursor-pointer"
                    >
                      Bỏ lọc
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-[60vh] overflow-y-auto">
                    {EVENTS.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => {
                          setSelectedEventFilter(ev);
                          setIsFilterMenuOpen(false);
                          triggerEphemeralLabel(`Bối cảnh: ${ev.name}`);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${
                          selectedEventFilter?.id === ev.id
                            ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                            : 'hover:bg-stone-50 text-stone-700 border border-transparent'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{ev.icon}</span>
                          <span>{ev.name}</span>
                        </span>
                        <span className="text-[10px] text-stone-400">{ev.tag}</span>
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setIsFilterMenuOpen(false)}
                      className="px-4 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Intro Idea Modal Trigger */}
          <button
            onClick={() => setIsIntroOpen(true)}
            className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition cursor-pointer"
            title="Ý tưởng & Thể lệ đề bài"
          >
            <HelpCircle className="w-4 h-4 text-amber-800" />
          </button>

          {/* Reset button */}
          <button
            onClick={handleResetOutfit}
            className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition cursor-pointer"
            title="Đặt lại bản thuần gốc"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* --- MAIN WARDROBE INTERFACE (FULL SCREEN GAME LAYOUT) --- */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* === 1. LEFT VERTICAL CATEGORY RAIL (ICONS ONLY WITH COUNT) === */}
        <aside className="w-full md:w-16 h-12 md:h-full border-b md:border-b-0 md:border-r border-amber-900/10 bg-[#FAF7F2] flex flex-row md:flex-col items-center justify-around md:justify-start md:py-4 gap-1 md:gap-3 shrink-0 z-20">
          {[
            { id: 'tops', label: 'Áo', icon: <Shirt className="w-5 h-5" />, count: TRADITIONAL_COSTUMES.length },
            { id: 'bottoms', label: 'Quần & Váy', icon: <Layers className="w-5 h-5" />, count: BOTTOMS.length },
            { id: 'headwear', label: 'Khăn & Mũ', icon: <Crown className="w-5 h-5" />, count: headwearItems.length },
            { id: 'accessories', label: 'Phụ kiện', icon: <Sparkles className="w-5 h-5" />, count: generalAccessories.length },
            { id: 'shoes', label: 'Giày dép', icon: <Footprints className="w-5 h-5" />, count: FOOTWEAR.length },
            { id: 'colors', label: 'Màu & Họa tiết', icon: <Palette className="w-5 h-5" />, count: COLOR_OPTIONS.length + HERITAGE_PATTERNS.length },
          ].map((cat) => {
            const isCatActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as WardrobeCategory);
                  // Auto camera zoom logic based on category!
                  if (cat.id === 'headwear') {
                    setCameraZoom('upper');
                  } else if (cat.id === 'shoes' || cat.id === 'bottoms') {
                    setCameraZoom('lower');
                  } else {
                    setCameraZoom('full');
                  }
                }}
                title={cat.label}
                className={`relative p-2 md:p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isCatActive
                    ? 'bg-amber-900 text-white shadow-md ring-2 ring-amber-600/40 scale-105'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {cat.icon}
                {/* Small item count badge */}
                <span
                  className={`text-[9px] font-bold mt-0.5 px-1 rounded-full ${
                    isCatActive ? 'bg-amber-700 text-amber-100' : 'text-stone-400'
                  }`}
                >
                  {cat.count}
                </span>
                {/* Active glow indicator */}
                {isCatActive && (
                  <span className="hidden md:block absolute -right-1 w-1 h-5 rounded-l-full bg-amber-600" />
                )}
              </button>
            );
          })}
        </aside>

        {/* === 2. ITEM GRID (3-COLUMNS, SCROLLABLE INDEPENDENTLY, IMAGES ONLY + STAR) === */}
        <section className="w-full md:w-72 lg:w-80 h-36 md:h-full border-b md:border-b-0 md:border-r border-amber-900/10 bg-[#F5EFEB]/50 backdrop-blur overflow-y-auto p-2.5 shrink-0 z-10">
          <div className="grid grid-cols-4 md:grid-cols-3 gap-2">
            {/* Tops Category */}
            {activeCategory === 'tops' &&
              filterList(TRADITIONAL_COSTUMES).map((item) => {
                const isSelected = selectedCostume.id === item.id;
                const isFavorite = favoriteIds.includes(item.id);
                return (
                  <WardrobeItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category="tops"
                    isSelected={isSelected}
                    isFavorite={isFavorite}
                    colorHex={selectedColor.hex}
                    onClick={() => {
                      setSelectedCostume(item as CostumeItem);
                      triggerEphemeralLabel(item.name);
                    }}
                    onToggleFavorite={(e) => handleToggleFavorite(item.id, e)}
                  />
                );
              })}

            {/* Bottoms Category */}
            {activeCategory === 'bottoms' &&
              filterList(BOTTOMS).map((item) => {
                const isSelected = selectedBottom.id === item.id;
                const isFavorite = favoriteIds.includes(item.id);
                return (
                  <WardrobeItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category="bottoms"
                    isSelected={isSelected}
                    isFavorite={isFavorite}
                    onClick={() => {
                      setSelectedBottom(item as ClothingPiece);
                      triggerEphemeralLabel(item.name);
                      setCameraZoom('lower');
                    }}
                    onToggleFavorite={(e) => handleToggleFavorite(item.id, e)}
                  />
                );
              })}

            {/* Headwear Category */}
            {activeCategory === 'headwear' &&
              filterList(headwearItems).map((item) => {
                const isSelected = selectedAccessories.some((a) => a.id === item.id);
                const isFavorite = favoriteIds.includes(item.id);
                return (
                  <WardrobeItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category="headwear"
                    isSelected={isSelected}
                    isFavorite={isFavorite}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedAccessories(selectedAccessories.filter((a) => a.id !== item.id));
                        triggerEphemeralLabel(`Bỏ chọn: ${item.name}`);
                      } else {
                        // replace existing headwear
                        const nonHeadwear = selectedAccessories.filter(
                          (a) => !['khan_van_dong', 'non_la_chop', 'non_quai_thao', 'khan_vanh_day'].includes(a.id)
                        );
                        setSelectedAccessories([...nonHeadwear, item as ClothingPiece]);
                        triggerEphemeralLabel(item.name);
                      }
                      setCameraZoom('upper');
                    }}
                    onToggleFavorite={(e) => handleToggleFavorite(item.id, e)}
                  />
                );
              })}

            {/* Accessories Category */}
            {activeCategory === 'accessories' &&
              filterList(generalAccessories).map((item) => {
                const isSelected = selectedAccessories.some((a) => a.id === item.id);
                const isFavorite = favoriteIds.includes(item.id);
                return (
                  <WardrobeItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category="accessories"
                    isSelected={isSelected}
                    isFavorite={isFavorite}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedAccessories(selectedAccessories.filter((a) => a.id !== item.id));
                        triggerEphemeralLabel(`Bỏ chọn: ${item.name}`);
                      } else {
                        const headwear = selectedAccessories.filter((a) =>
                          ['khan_van_dong', 'non_la_chop', 'non_quai_thao', 'khan_vanh_day'].includes(a.id)
                        );
                        setSelectedAccessories([...headwear, item as ClothingPiece]);
                        triggerEphemeralLabel(item.name);
                      }
                    }}
                    onToggleFavorite={(e) => handleToggleFavorite(item.id, e)}
                  />
                );
              })}

            {/* Shoes Category */}
            {activeCategory === 'shoes' &&
              filterList(FOOTWEAR).map((item) => {
                const isSelected = selectedFootwear.id === item.id;
                const isFavorite = favoriteIds.includes(item.id);
                return (
                  <WardrobeItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category="shoes"
                    isSelected={isSelected}
                    isFavorite={isFavorite}
                    onClick={() => {
                      setSelectedFootwear(item as ClothingPiece);
                      triggerEphemeralLabel(item.name);
                      setCameraZoom('lower');
                    }}
                    onToggleFavorite={(e) => handleToggleFavorite(item.id, e)}
                  />
                );
              })}

            {/* Colors & Patterns Category with Subtabs */}
            {activeCategory === 'colors' && (
              <div className="col-span-4 md:col-span-3 flex items-center bg-stone-200/60 p-1 rounded-xl mb-1 text-[11px] font-semibold text-stone-600">
                <button
                  onClick={() => setColorSubTab('colors')}
                  className={`flex-1 py-1 rounded-lg text-center transition cursor-pointer ${
                    colorSubTab === 'colors' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  Bảng Màu ({COLOR_OPTIONS.length})
                </button>
                <button
                  onClick={() => setColorSubTab('patterns')}
                  className={`flex-1 py-1 rounded-lg text-center transition cursor-pointer ${
                    colorSubTab === 'patterns' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  Họa Tiết Gấm ({HERITAGE_PATTERNS.length})
                </button>
              </div>
            )}

            {/* Colors Subtab Items */}
            {activeCategory === 'colors' &&
              colorSubTab === 'colors' &&
              COLOR_OPTIONS.map((c) => {
                const isSelected = selectedColor.id === c.id;
                const isFavorite = favoriteIds.includes(c.id);
                return (
                  <WardrobeItemCard
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    category="colors"
                    isSelected={isSelected}
                    isFavorite={isFavorite}
                    colorHex={c.hex}
                    elementSymbol={c.element}
                    onClick={() => {
                      setSelectedColor(c);
                      triggerEphemeralLabel(`Sắc màu: ${c.name}`);
                    }}
                    onToggleFavorite={(e) => handleToggleFavorite(c.id, e)}
                  />
                );
              })}

            {/* Heritage Patterns Subtab Items */}
            {activeCategory === 'colors' &&
              colorSubTab === 'patterns' &&
              HERITAGE_PATTERNS.map((p) => {
                const isSelected = heritagePattern === p.id;
                const isFavorite = favoriteIds.includes(`pat_${p.id}`);
                return (
                  <WardrobeItemCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    category="patterns"
                    isSelected={isSelected}
                    isFavorite={isFavorite}
                    onClick={() => {
                      setHeritagePattern(p.id);
                      triggerEphemeralLabel(`Họa tiết: ${p.name}`);
                    }}
                    onToggleFavorite={(e) => handleToggleFavorite(`pat_${p.id}`, e)}
                  />
                );
              })}
          </div>
        </section>

        {/* === 3. CHARACTER STAGE (SÂN KHẤU NHÂN VẬT - PHẦN LỚN KHÔNG GIAN) === */}
        <main className="flex-1 h-full relative overflow-hidden flex items-center justify-center p-3">
          {/* Stage Atmosphere Background Elements */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Center soft theatrical glow */}
            <div className="w-[420px] h-[420px] rounded-full bg-amber-500/5 blur-2xl" />
          </div>

          {/* Top Stage Controls: Streamlined Gender Switcher & Camera Zoom + 3-Dots Menu */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
            {/* Left: Avatar Character Gender Switcher: An Nhiên (Nữ) vs Minh Triết (Nam) with SVG icons */}
            <div className="flex items-center bg-white/90 backdrop-blur rounded-full border border-stone-200/90 p-0.5 shadow-xs text-xs">
              <button
                onClick={() => {
                  setAvatarGender('female');
                  triggerEphemeralLabel('Nhân vật: An Nhiên (Nữ)');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold transition cursor-pointer ${
                  avatarGender === 'female'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FemaleAvatarIcon active={avatarGender === 'female'} />
                <span className="hidden sm:inline">An Nhiên (Nữ)</span>
                <span className="sm:hidden text-[11px]">Nữ</span>
              </button>
              <button
                onClick={() => {
                  setAvatarGender('male');
                  triggerEphemeralLabel('Nhân vật: Minh Triết (Nam)');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold transition cursor-pointer ${
                  avatarGender === 'male'
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <MaleAvatarIcon active={avatarGender === 'male'} />
                <span className="hidden sm:inline">Minh Triết (Nam)</span>
                <span className="sm:hidden text-[11px]">Nam</span>
              </button>
            </div>

            {/* Right: Camera Zoom Pills & 3-Dots More Menu */}
            <div className="flex items-center gap-1.5">
              {/* Camera Zoom Pills */}
              <div className="flex items-center bg-white/90 backdrop-blur rounded-full border border-stone-200/90 p-0.5 text-stone-600 text-[11px] shadow-2xs">
                <button
                  onClick={() => setCameraZoom('full')}
                  className={`px-2 py-0.5 rounded-full transition cursor-pointer ${
                    cameraZoom === 'full' ? 'bg-amber-900 text-white font-bold' : 'hover:text-stone-900'
                  }`}
                >
                  Toàn thân
                </button>
                <button
                  onClick={() => setCameraZoom('upper')}
                  className={`px-2 py-0.5 rounded-full transition cursor-pointer ${
                    cameraZoom === 'upper' ? 'bg-amber-900 text-white font-bold' : 'hover:text-stone-900'
                  }`}
                >
                  Cận cảnh
                </button>
              </div>

              {/* 3-Dots More Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  title="Tùy chọn khác"
                  className={`p-1.5 rounded-full border transition cursor-pointer shadow-2xs ${
                    isMoreMenuOpen
                      ? 'bg-amber-900 text-white border-amber-950'
                      : 'bg-white/90 hover:bg-white text-stone-700 border-stone-200/90'
                  }`}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {/* 3-Dots Dropdown Menu */}
                {isMoreMenuOpen && (
                  <div className="absolute right-0 top-9 w-52 bg-white rounded-2xl border border-stone-200 shadow-xl p-2 z-40 space-y-1 animate-in fade-in">
                    {/* So Sánh 2 Bộ Toggle */}
                    <button
                      onClick={() => {
                        setIsSplitScreen(!isSplitScreen);
                        setIsMoreMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition cursor-pointer ${
                        isSplitScreen ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ArrowRightLeft className="w-3.5 h-3.5 text-amber-800" />
                        <span>So sánh 2 phương án</span>
                      </div>
                      <span className="text-[10px] text-stone-400">{isSplitScreen ? 'Bật' : 'Tắt'}</span>
                    </button>

                    {/* Bộ Lọc Dịp / Sự Kiện */}
                    <button
                      onClick={() => {
                        setIsFilterMenuOpen(true);
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-stone-50 text-stone-700 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5 text-amber-800" />
                        <span>Bộ lọc sự kiện</span>
                      </div>
                      <span className="text-[10px] text-stone-400 truncate max-w-[70px]">
                        {selectedEventFilter ? selectedEventFilter.name.split(' ')[0] : 'Tất cả'}
                      </span>
                    </button>

                    {/* Đặt lại chuẩn gốc */}
                    <button
                      onClick={() => {
                        handleResetOutfit();
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-stone-50 text-stone-700 transition cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                      <span>Đặt lại bản thuần gốc</span>
                    </button>

                    {/* Hướng dẫn & Thể lệ */}
                    <button
                      onClick={() => {
                        setIsIntroOpen(true);
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-stone-50 text-stone-700 transition cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
                      <span>Ý tưởng & Thể lệ</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating Compact Color Harmony Circular Badge (Gắn cạnh nhân vật) */}
          <div className="absolute top-16 right-3 sm:right-6 z-20 pointer-events-auto">
            <button
              onClick={() => setShowHarmonyPopover(!showHarmonyPopover)}
              className="w-11 h-11 rounded-full bg-white/95 backdrop-blur border-2 border-stone-200/90 shadow-md hover:scale-105 active:scale-95 transition flex flex-col items-center justify-center cursor-pointer group"
              title={`${harmony.score}đ - ${harmony.verdict}`}
            >
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
                <span className="text-[11px] font-black leading-none text-stone-900 group-hover:text-amber-900">
                  {harmony.score}đ
                </span>
              </div>
              <span className="text-[7.5px] font-bold text-emerald-700 leading-none mt-0.5 uppercase tracking-tighter">
                Hài hòa
              </span>
            </button>

            {/* Harmony Popover Details */}
            {showHarmonyPopover && (
              <div className="absolute right-0 top-12 w-60 p-3 bg-white rounded-2xl border border-stone-200 shadow-xl z-40 text-xs space-y-1.5 animate-in fade-in">
                <div className="flex items-center justify-between font-bold text-stone-800">
                  <span>{harmony.verdict} ({harmony.score}đ)</span>
                  <button
                    onClick={() => setShowHarmonyPopover(false)}
                    className="text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  {harmony.explanation}
                </p>
                {harmony.traditionalPrecedent && (
                  <p className="text-[10px] text-amber-900 italic pt-1 border-t border-stone-100">
                    {harmony.traditionalPrecedent}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sân Khấu Hiển Thị Nhân Vật (Single or Split Screen) */}
          <div className="w-full h-full flex items-center justify-center">
            {isSplitScreen ? (
              // Split-Screen Mode (Chia đôi sân khấu)
              <div className="w-full h-full grid grid-cols-2 gap-3 items-center justify-center animate-in fade-in duration-300">
                {/* Side A: Current Custom Outfit */}
                <div className="flex flex-col items-center justify-center h-full relative">
                  <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold z-20">
                    Bản Đang Phối
                  </span>
                  <OutfitVisualizer
                    gender={avatarGender}
                    costume={selectedCostume}
                    color={selectedColor}
                    bottom={selectedBottom}
                    footwear={selectedFootwear}
                    accessories={selectedAccessories}
                    styleMode={styleMode}
                    cameraZoom="full"
                    compactStage={true}
                    patternType={heritagePattern}
                  />
                </div>

                {/* Side B: Reference Traditional Authentic */}
                <div className="flex flex-col items-center justify-center h-full relative">
                  <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold z-20">
                    Chuẩn Cổ Truyền
                  </span>
                  <OutfitVisualizer
                    gender={avatarGender}
                    costume={referenceOutfit.costume}
                    color={referenceOutfit.color}
                    bottom={referenceOutfit.bottom}
                    footwear={referenceOutfit.footwear}
                    accessories={referenceOutfit.accessories}
                    styleMode="traditional"
                    cameraZoom="full"
                    compactStage={true}
                    patternType={heritagePattern}
                  />
                </div>
              </div>
            ) : (
              // Normal Single Stage Character
              <div className="relative w-full h-full flex items-center justify-center">
                <OutfitVisualizer
                  gender={avatarGender}
                  costume={selectedCostume}
                  color={selectedColor}
                  bottom={selectedBottom}
                  footwear={selectedFootwear}
                  accessories={selectedAccessories}
                  styleMode={styleMode}
                  cameraZoom={cameraZoom}
                  patternType={heritagePattern}
                />

                {/* 2. Floating Ephemeral Label beside character (Tên món tự mờ dần + nút 'i') */}
                {isLabelVisible && (
                  <div className="absolute top-1/4 left-4 sm:left-12 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 text-white backdrop-blur shadow-lg border border-white/20 animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-xs font-semibold">{ephemeralLabel}</span>
                    <button
                      onClick={() => setBottomSheetType('info')}
                      title="Nguồn gốc & Ý nghĩa"
                      className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-amber-300 transition cursor-pointer"
                    >
                      <Info className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Floating Cultural Warning Chip beside character (Không popup chặn màn hình) */}
                {violations.length > 0 && topViolation && (
                  <button
                    onClick={() => setBottomSheetType('violation')}
                    className={`absolute bottom-20 left-4 sm:left-12 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border backdrop-blur transition-all active:scale-95 cursor-pointer animate-in fade-in slide-in-from-left-2 duration-300 ${
                      topViolation.level === 'warning'
                        ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                        : topViolation.level === 'caution'
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-emerald-600 text-white border-emerald-700'
                    }`}
                  >
                    <span>
                      {topViolation.level === 'warning'
                        ? '🛑 Dễ gây hiểu lầm'
                        : topViolation.level === 'caution'
                        ? '⚠️ Nên cân nhắc'
                        : '💡 Gợi ý nhẹ'}
                    </span>
                    <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded-full">
                      Xem
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 4. PRIMARY ACTION BUTTON: Round button with Heart icon (Góc dưới phải ngoài vùng nhân vật) */}
          <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
            <button
              onClick={handleSaveToLookbook}
              title={hasSavedCurrent ? `Đã lưu • Mở Lookbook (${savedOutfits.length})` : 'Lưu vào Lookbook'}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 active:scale-90 cursor-pointer ${
                hasSavedCurrent
                  ? 'bg-rose-600 text-white hover:bg-rose-700 ring-4 ring-rose-200'
                  : 'bg-[#C0392B] text-white hover:bg-[#A93226] ring-4 ring-red-400/30'
              }`}
            >
              <Heart className={`w-5 h-5 transition-transform ${hasSavedCurrent ? 'fill-white scale-110' : 'fill-white/20'}`} />
              {savedOutfits.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {savedOutfits.length}
                </span>
              )}
            </button>
          </div>
        </main>
      </div>

      {/* --- CULTURAL SLENDER BOTTOM SHEET (GỌI RA KHI CẦN, VUỐT XUỐNG ĐÓNG) --- */}
      <CulturalBottomSheet
        isOpen={!!bottomSheetType}
        onClose={() => setBottomSheetType(null)}
        type={bottomSheetType || 'info'}
        costume={selectedCostume}
        violation={topViolation}
        onApplyFix={handleApplyRecommendation}
      />

      {/* --- LOOKBOOK & SHARE STORY EXPORT MODAL --- */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        savedOutfits={savedOutfits}
        onDeleteOutfit={(id) => setSavedOutfits(savedOutfits.filter((o) => o.id !== id))}
        onSelectOutfit={(chosen) => {
          setSelectedCostume(chosen.costume);
          setSelectedColor(chosen.color);
          setSelectedBottom(chosen.bottom);
          setSelectedFootwear(chosen.footwear);
          setSelectedAccessories(chosen.accessories);
          setStyleMode(chosen.styleMode);
          triggerEphemeralLabel(chosen.name || chosen.costume.name);
        }}
        currentOutfit={currentOutfitConfig}
        currentEventName={selectedEventFilter?.name || 'Dạo Phố OOTD'}
      />

      {/* --- INTRO PITCH MODAL --- */}
      <IntroHeroModal
        isOpen={isIntroOpen}
        onClose={() => setIsIntroOpen(false)}
      />
    </div>
  );
}
