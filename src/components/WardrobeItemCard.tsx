import React from 'react';
import { Star } from 'lucide-react';

export type WardrobeCategoryType = 'tops' | 'bottoms' | 'headwear' | 'accessories' | 'shoes' | 'colors' | 'patterns';

interface WardrobeItemCardProps {
  id: string;
  name: string;
  category: WardrobeCategoryType;
  isSelected: boolean;
  isFavorite: boolean;
  colorHex?: string;
  elementSymbol?: string;
  previewType?: string;
  onClick: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

export const WardrobeItemCard: React.FC<WardrobeItemCardProps> = ({
  id,
  name,
  category,
  isSelected,
  isFavorite,
  colorHex,
  elementSymbol,
  previewType,
  onClick,
  onToggleFavorite,
}) => {
  return (
    <div
      onClick={onClick}
      title={name}
      className={`group relative aspect-square rounded-2xl flex items-center justify-center p-2 cursor-pointer transition-all duration-200 select-none ${
        isSelected
          ? 'bg-amber-900/10 border-2 border-amber-600 shadow-md ring-2 ring-amber-500/30 scale-[1.02]'
          : 'bg-white/80 hover:bg-stone-50 border border-stone-200/90 hover:border-amber-900/20 shadow-2xs hover:shadow-xs'
      }`}
    >
      {/* Favorite Star Button (Top Right) */}
      <button
        onClick={onToggleFavorite}
        title={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
        className={`absolute top-1.5 right-1.5 p-1 rounded-full transition-transform active:scale-125 z-10 ${
          isFavorite
            ? 'text-amber-500 fill-amber-500 hover:text-amber-600'
            : 'text-stone-300 hover:text-amber-400 opacity-60 hover:opacity-100'
        }`}
      >
        <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Visual Graphic Representation (No text, pure icon/visual) */}
      <div className="w-full h-full flex items-center justify-center p-1">
        {category === 'colors' ? (
          // Color Swatch Disc with Gold Ring & Element Symbol
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-inner transition-transform group-hover:scale-105">
            <div
              className="w-10 h-10 rounded-full border-2 border-amber-700/30 flex items-center justify-center shadow-xs"
              style={{ backgroundColor: colorHex || '#C0392B' }}
            >
              <span className="text-[10px] font-bold text-white drop-shadow-md">
                {elementSymbol}
              </span>
            </div>
          </div>
        ) : category === 'patterns' ? (
          // Heritage Pattern Visualizer
          <svg viewBox="0 0 60 60" className="w-10 h-10 drop-shadow-xs" fill="none">
            {id === 'sen' ? (
              // Hoa sen
              <g stroke="#92400E" strokeWidth="1.5">
                <path d="M30 14 C25 24, 25 38, 30 42 C35 38, 35 24, 30 14 Z" fill="#FDE68A" />
                <path d="M30 42 C40 38, 44 28, 42 22 C36 28, 32 36, 30 42 Z" fill="#FEF3C7" />
                <path d="M30 42 C20 38, 16 28, 18 22 C24 28, 28 36, 30 42 Z" fill="#FEF3C7" />
                <circle cx="30" cy="42" r="2.5" fill="#B45309" />
              </g>
            ) : id === 'trong_dong' ? (
              // Trống đồng
              <g stroke="#B45309" strokeWidth="1.2">
                <circle cx="30" cy="30" r="20" fill="#FEF3C7" />
                <circle cx="30" cy="30" r="14" fill="none" strokeDasharray="2 2" />
                <circle cx="30" cy="30" r="5" fill="#D97706" />
                <line x1="30" y1="12" x2="30" y2="48" />
                <line x1="12" y1="30" x2="48" y2="30" />
                <line x1="17" y1="17" x2="43" y2="43" />
                <line x1="17" y1="43" x2="43" y2="17" />
              </g>
            ) : id === 'chu_tho' ? (
              // Chữ Thọ
              <g stroke="#991B1B" strokeWidth="1.5">
                <circle cx="30" cy="30" r="19" fill="#FEE2E2" strokeWidth="2" />
                <line x1="20" y1="24" x2="40" y2="24" />
                <line x1="20" y1="30" x2="40" y2="30" />
                <line x1="20" y1="36" x2="40" y2="36" />
                <line x1="30" y1="18" x2="30" y2="42" strokeWidth="2" />
                <line x1="24" y1="24" x2="24" y2="36" />
                <line x1="36" y1="24" x2="36" y2="36" />
              </g>
            ) : id === 'van_may' ? (
              // Vân mây cổ
              <g stroke="#0369A1" strokeWidth="1.5">
                <path d="M16 32 C16 24, 26 24, 29 28 C32 20, 44 20, 46 28 C48 34, 40 40, 30 40 C20 40, 16 36, 16 32 Z" fill="#E0F2FE" />
                <path d="M30 35 Q 38 32, 35 38" fill="none" />
              </g>
            ) : (
              // Trơn
              <g>
                <rect x="14" y="14" width="32" height="32" rx="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="20" y1="24" x2="40" y2="24" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="20" y1="30" x2="40" y2="30" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="20" y1="36" x2="40" y2="36" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
              </g>
            )}
          </svg>
        ) : category === 'tops' ? (
          // Tops Silhouettes
          <svg viewBox="0 0 60 60" className="w-11 h-11 drop-shadow-xs" fill="none">
            {id === 'ao_tac' ? (
              // Áo Tấc (Tay thụng rộng)
              <path
                d="M24 18 L10 34 L15 45 L22 36 L21 54 L39 54 L38 36 L45 45 L50 34 L36 18 Z"
                fill={colorHex || '#D97706'}
                stroke="#78350F"
                strokeWidth="1.2"
              />
            ) : id === 'ao_nhat_binh' ? (
              // Nhật Bình (Cổ chữ nhật)
              <g>
                <path
                  d="M23 18 L12 32 L17 38 L23 30 L22 52 L38 52 L37 30 L43 38 L48 32 L37 18 Z"
                  fill={colorHex || '#C0392B'}
                  stroke="#78350F"
                  strokeWidth="1.2"
                />
                <rect x="26" y="18" width="8" height="12" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
              </g>
            ) : id === 'ao_giao_linh' ? (
              // Giao Lĩnh (Vạt chéo Y)
              <g>
                <path
                  d="M24 18 L12 34 L17 40 L23 32 L22 54 L38 54 L37 32 L43 40 L48 34 L36 18 Z"
                  fill={colorHex || '#0D9488'}
                  stroke="#042F2E"
                  strokeWidth="1.2"
                />
                <path d="M26 18 L34 32" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            ) : id === 'ao_tu_than' ? (
              // Tứ thân (Yếm đào + vạt buông thắt nút)
              <g>
                <path d="M26 22 Q 30 25 34 22 L33 34 L27 34 Z" fill="#DC2626" />
                <path
                  d="M23 18 L14 34 L19 38 L24 28 L22 52 L26 50 L27 34 L33 34 L34 50 L38 52 L36 28 L41 38 L46 34 L37 18 Z"
                  fill={colorHex || '#78350F'}
                  stroke="#451A03"
                  strokeWidth="1.2"
                />
              </g>
            ) : id === 'ao_ba_ba' ? (
              // Áo Bà Ba (Ngắn, xẻ hông, cúc giữa)
              <path
                d="M24 18 L14 34 L19 37 L23 28 L22 44 L38 44 L37 28 L41 37 L46 34 L36 18 Z"
                fill={colorHex || '#1E293B'}
                stroke="#0F172A"
                strokeWidth="1.2"
              />
            ) : id === 'ao_dai_tan_thoi' ? (
              // Áo Dài Tân Thời (Chiết eo thon, tà trước tà sau bay, khuy bấm nách)
              <g>
                {/* Back flap */}
                <path d="M27 32 L31 54 L36 53 L32 32 Z" fill="#000000" opacity="0.18" />
                {/* Front flap and waisted bodice */}
                <path
                  d="M25 18 L15 34 L20 37 L24 26 C26 31, 26 36, 25 54 L35 54 C34 36, 34 31, 36 26 L40 37 L45 34 L35 18 Z"
                  fill={colorHex || '#C0392B'}
                  stroke="#7F1D1D"
                  strokeWidth="1.2"
                />
                {/* Snap button row */}
                <circle cx="31" cy="21" r="0.9" fill="#FEF08A" />
                <circle cx="33" cy="24" r="0.9" fill="#FEF08A" />
                <circle cx="34" cy="28" r="0.9" fill="#FEF08A" />
              </g>
            ) : (
              // Ngũ Thân Tay Chẽn (Form suông đĩnh đạc 5 thân, 5 cúc)
              <g>
                <path
                  d="M24 18 L14 34 L19 38 L23 28 L21 54 L39 54 L37 28 L41 38 L46 34 L36 18 Z"
                  fill={colorHex || '#1E293B'}
                  stroke="#0F172A"
                  strokeWidth="1.2"
                />
                <circle cx="31" cy="22" r="1.1" fill="#FEF08A" />
                <circle cx="33" cy="26" r="1.1" fill="#FEF08A" />
                <circle cx="35" cy="30" r="1.1" fill="#FEF08A" />
              </g>
            )}
          </svg>
        ) : category === 'bottoms' ? (
          // Pants / Skirts Silhouettes
          <svg viewBox="0 0 60 60" className="w-10 h-10 drop-shadow-xs" fill="none">
            {id === 'chan_vay_xep_ly' || id === 'vay_dup_den' ? (
              <path
                d="M23 15 Q 30 17 37 15 L43 45 Q 30 48 17 45 Z"
                fill={id === 'vay_dup_den' ? '#1E293B' : '#78350F'}
                stroke="#000000"
                strokeOpacity="0.2"
                strokeWidth="1.2"
              />
            ) : (
              <g>
                <path
                  d="M22 15 L18 46 L27 46 L29 25 L31 25 L33 46 L42 46 L38 15 Z"
                  fill={
                    id === 'quan_jeans_denim'
                      ? '#2563EB'
                      : id === 'quan_lua_den'
                      ? '#1E293B'
                      : id === 'quan_au_suong'
                      ? '#475569'
                      : '#FDFBF7'
                  }
                  stroke="#000000"
                  strokeOpacity="0.2"
                  strokeWidth="1.2"
                />
              </g>
            )}
          </svg>
        ) : category === 'headwear' ? (
          // Headwear Icons
          <svg viewBox="0 0 60 60" className="w-10 h-10 drop-shadow-xs" fill="none">
            {id === 'non_la_chop' ? (
              <polygon points="30,16 10,42 50,42" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.5" />
            ) : id === 'non_quai_thao' ? (
              <g>
                <ellipse cx="30" cy="28" rx="22" ry="8" fill="#FEF08A" stroke="#B45309" strokeWidth="1.5" />
                <path d="M16 32 Q 30 48 44 32" stroke="#DC2626" strokeWidth="2" fill="none" />
              </g>
            ) : id === 'khan_vanh_day' ? (
              <ellipse cx="30" cy="30" rx="18" ry="10" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2.5" />
            ) : (
              <ellipse cx="30" cy="30" rx="16" ry="8" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            )}
          </svg>
        ) : category === 'shoes' ? (
          // Shoes Icons
          <svg viewBox="0 0 60 60" className="w-10 h-10 drop-shadow-xs" fill="none">
            {id === 'sneaker_trang' ? (
              <g>
                <path d="M12 36 C12 36, 12 28, 22 28 L34 30 L46 36 L46 42 L12 42 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="12" y1="40" x2="46" y2="40" stroke="#CBD5E1" strokeWidth="2" />
              </g>
            ) : id === 'guoc_moc_nhung' ? (
              <g>
                <rect x="14" y="34" width="32" height="6" fill="#854D0E" rx="1" />
                <path d="M22 34 Q 30 26 38 34" stroke="#C0392B" strokeWidth="3" fill="none" />
              </g>
            ) : (
              <path d="M16 26 L24 26 L26 34 L44 36 L44 42 L16 42 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
            )}
          </svg>
        ) : (
          // Accessories Icons
          <svg viewBox="0 0 60 60" className="w-10 h-10 drop-shadow-xs" fill="none">
            {id === 'kinh_mat_retro' ? (
              <g>
                <ellipse cx="22" cy="30" rx="7" ry="5.5" fill="#0F172A" />
                <ellipse cx="38" cy="30" rx="7" ry="5.5" fill="#0F172A" />
                <line x1="29" y1="29" x2="31" y2="29" stroke="#71717A" strokeWidth="2" />
              </g>
            ) : id === 'tui_tote_canvas' ? (
              <g>
                <path d="M24 24 C24 16, 36 16, 36 24" stroke="#78350F" strokeWidth="2" fill="none" />
                <rect x="20" y="24" width="20" height="24" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" rx="2" />
              </g>
            ) : id === 'quat_giay_thu_phap' ? (
              <path d="M30 42 L16 22 A 20 20 0 0 1 44 22 Z" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.5" />
            ) : (
              <ellipse cx="30" cy="30" rx="16" ry="16" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="2 3" fill="none" />
            )}
          </svg>
        )}
      </div>
    </div>
  );
};
