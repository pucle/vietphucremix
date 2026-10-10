import React, { useState } from 'react';
import { CostumeItem, ClothingPiece, ColorOption } from '../data/costumesData';
import anNhienBaseImg from '../assets/images/an_nhien_base.jpg';

export type AvatarGender = 'female' | 'male';
export type HeritagePatternType = 'sen' | 'trong_dong' | 'chu_tho' | 'van_may' | 'none';

export interface LayeredAvatarEngineProps {
  gender?: AvatarGender;
  costume: CostumeItem;
  color: ColorOption;
  bottom: ClothingPiece;
  footwear: ClothingPiece;
  accessories: ClothingPiece[];
  styleMode: 'traditional' | 'light_modern' | 'genz_streetwear';
  cameraZoom?: 'full' | 'upper' | 'lower';
  compactStage?: boolean;
  patternType?: HeritagePatternType;
}

export const LayeredAvatarEngine: React.FC<LayeredAvatarEngineProps> = ({
  gender = 'female',
  costume,
  color,
  bottom,
  footwear,
  accessories,
  styleMode,
  cameraZoom = 'full',
  compactStage = false,
  patternType = 'sen',
}) => {
  const isFemale = gender === 'female';

  // Accessories checks
  const hasKinhMat = accessories.some((a) => a.id === 'kinh_mat_retro');
  const hasTuiTote = accessories.some((a) => a.id === 'tui_tote_canvas');
  const hasKhanVan = accessories.some((a) => a.id === 'khan_van_dong');
  const hasKhanVanhDay = accessories.some((a) => a.id === 'khan_vanh_day');
  const hasNonLa = accessories.some((a) => a.id === 'non_la_chop');
  const hasNonQuaiThao = accessories.some((a) => a.id === 'non_quai_thao');
  const hasVongNgoc = accessories.some((a) => a.id === 'vong_ngoc_trai');
  const hasQuatGiay = accessories.some((a) => a.id === 'quat_giay_thu_phap');

  // Bottom base and cel-shading colors
  const getBottomColor = () => {
    switch (bottom.id) {
      case 'quan_lua_trang':
        return { base: '#FAF8F5', shadow: '#E2DBD0', line: '#CEC3B3', highlight: '#FFFFFF' };
      case 'quan_lua_den':
      case 'vay_dup_den':
        return { base: '#1E293B', shadow: '#0F172A', line: '#334155', highlight: '#334155' };
      case 'quan_au_suong':
        return { base: '#475569', shadow: '#334155', line: '#64748B', highlight: '#64748B' };
      case 'quan_jeans_denim':
        return { base: '#2563EB', shadow: '#1D4ED8', line: '#FBBF24', highlight: '#60A5FA' };
      case 'chan_vay_xep_ly':
        return { base: '#78350F', shadow: '#582407', line: '#9A3412', highlight: '#9A3412' };
      default:
        return { base: '#FAF8F5', shadow: '#E2DBD0', line: '#CEC3B3', highlight: '#FFFFFF' };
    }
  };

  const bottomColors = getBottomColor();

  // Camera zoom CSS transforms
  const getCameraTransform = () => {
    switch (cameraZoom) {
      case 'upper':
        return 'scale(1.52) translateY(20%)';
      case 'lower':
        return 'scale(1.25) translateY(-15%)';
      case 'full':
      default:
        return 'scale(1) translateY(0)';
    }
  };

  const hex = color.hex;
  const shadowGradId = `shadowGrad_${costume.id}_${gender}`;
  const highlightGradId = `highlightGrad_${costume.id}_${gender}`;

  return (
    <div
      className={`relative w-full ${
        compactStage ? 'max-w-[280px]' : 'max-w-[460px] md:max-w-[500px] h-[92%] max-h-[720px]'
      } mx-auto aspect-[3/4] flex items-center justify-center p-1.5 select-none overflow-hidden`}
    >
      {/* --- THEATRICAL STAGE BACKDROP --- */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#EAE0D3] border border-amber-900/15 shadow-inner overflow-hidden pointer-events-none">
        {/* Traditional Heritage Water Wave Motif (Thủy Ba Cung Đình) */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-24 opacity-[0.06] text-amber-950 pointer-events-none"
          viewBox="0 0 100 25"
          preserveAspectRatio="none"
        >
          <path d="M0 25 Q 12.5 10, 25 25 T 50 25 T 75 25 T 100 25 V 25 H 0 Z" fill="currentColor" />
          <path d="M0 20 Q 12.5 5, 25 20 T 50 20 T 75 20 T 100 20 V 25 H 0 Z" fill="currentColor" />
        </svg>

        {/* Subtle Watermark at bottom right (Không che các nút) */}
        <div className="absolute bottom-2.5 right-3.5 text-amber-950/20 font-serif text-[9px] tracking-widest uppercase select-none pointer-events-none">
          Việt Phục Remix
        </div>
      </div>

      {/* --- SVG LAYERED PAPER-DOLL CHARACTER ENGINE (0 0 400 600) --- */}
      <div
        style={{
          transform: getCameraTransform(),
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease-out',
        }}
        className="relative z-10 w-full h-full flex items-center justify-center animate-in fade-in duration-300"
      >
        <svg
          viewBox="0 0 400 600"
          className="w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Stage Dais Radial Lighting & Shading */}
            <radialGradient id="daisLightGrad" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#EFE6D8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#D9CCA8" stopOpacity="1" />
            </radialGradient>
            <linearGradient id="daisRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C4A876" />
              <stop offset="50%" stopColor="#A88B58" />
              <stop offset="100%" stopColor="#6B4F25" />
            </linearGradient>

            {/* Shading Linear Gradients for Silk & Satin */}
            <linearGradient id={shadowGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={hex} stopOpacity="1" />
              <stop offset="60%" stopColor={hex} stopOpacity="0.88" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id={highlightGradId} x1="25%" y1="0%" x2="75%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
              <stop offset="40%" stopColor={hex} stopOpacity="0.95" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
            </linearGradient>

            {/* Pattern 1: Hoa Sen Tây Hồ (Lotus Brocade Pattern) */}
            <pattern id="pattern_sen" width="36" height="36" patternUnits="userSpaceOnUse">
              <path
                d="M18 4 Q 24 14, 18 22 Q 12 14, 18 4 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.8"
                strokeOpacity="0.22"
              />
              <path
                d="M18 22 Q 26 18, 28 12 Q 23 16, 18 22 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.6"
                strokeOpacity="0.18"
              />
              <path
                d="M18 22 Q 10 18, 8 12 Q 13 16, 18 22 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.6"
                strokeOpacity="0.18"
              />
              <circle cx="18" cy="22" r="1.5" fill="#FFFFFF" fillOpacity="0.2" />
            </pattern>

            {/* Pattern 2: Trống Đồng Đông Sơn (Dong Son Bronze Drum: Sunburst & Lac Bird) */}
            <pattern id="pattern_trong_dong" width="48" height="48" patternUnits="userSpaceOnUse">
              {/* Sunburst center */}
              <circle cx="24" cy="24" r="3" fill="#FFFFFF" fillOpacity="0.25" />
              <line x1="24" y1="17" x2="24" y2="31" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" />
              <line x1="17" y1="24" x2="31" y2="24" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" />
              <line x1="19" y1="19" x2="29" y2="29" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" />
              <line x1="19" y1="29" x2="29" y2="19" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" />
              {/* Concentric rings */}
              <circle cx="24" cy="24" r="10" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.18" fill="none" />
              <circle cx="24" cy="24" r="18" stroke="#FFFFFF" strokeWidth="0.7" strokeDasharray="2 2" strokeOpacity="0.2" fill="none" />
              {/* Soaring Lac Birds */}
              <path d="M12 18 Q 16 16, 18 20" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.22" fill="none" />
              <path d="M36 30 Q 32 32, 30 28" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.22" fill="none" />
            </pattern>

            {/* Pattern 3: Chữ Thọ Tròn Cung Đình (Imperial Longevity Medallion) */}
            <pattern id="pattern_chu_tho" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="12" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
              {/* Inner Sho/Tho character stylization */}
              <line x1="13" y1="16" x2="27" y2="16" stroke="#FFFFFF" strokeWidth="0.7" strokeOpacity="0.22" />
              <line x1="13" y1="20" x2="27" y2="20" stroke="#FFFFFF" strokeWidth="0.7" strokeOpacity="0.22" />
              <line x1="13" y1="24" x2="27" y2="24" stroke="#FFFFFF" strokeWidth="0.7" strokeOpacity="0.22" />
              <line x1="20" y1="12" x2="20" y2="28" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.25" />
              <line x1="16" y1="16" x2="16" y2="24" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.18" />
              <line x1="24" y1="16" x2="24" y2="24" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.18" />
            </pattern>

            {/* Pattern 4: Vân Mây Cổ / Vân Vũ Đại Việt (Imperial Swirling Clouds) */}
            <pattern id="pattern_van_may" width="44" height="44" patternUnits="userSpaceOnUse">
              <path
                d="M10 22 C 10 16, 18 16, 20 20 C 22 14, 32 14, 34 20 C 36 24, 30 28, 22 28 C 14 28, 10 26, 10 22 Z"
                stroke="#FFFFFF"
                strokeWidth="0.7"
                strokeOpacity="0.2"
                fill="none"
              />
              <path d="M22 24 Q 28 22, 26 26" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.18" fill="none" />
            </pattern>

            {/* Gold Trim Shimmer */}
            <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="45%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Cel-shading drop shadows */}
            <filter id="celShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#1E1E1E" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* LAYER -1: CIRCULAR STAGE DAIS & CONTACT SHADOW (BỤC TRÒN SÂN KHẤU) */}
          {/* ============================================================== */}
          <g id="stageDais">
            {/* Ambient floor shadow under the dais */}
            <ellipse cx="200" cy="542" rx="158" ry="34" fill="#78350F" opacity="0.08" />
            <ellipse cx="200" cy="536" rx="146" ry="28" fill="#78350F" opacity="0.14" />

            {/* Dais 3D Base Skirt (Độ dày thành bục 3D sơn mài) */}
            <path
              d="M54 518 C54 544, 346 544, 346 518 L346 534 C346 560, 54 560, 54 534 Z"
              fill="url(#daisRimGrad)"
              stroke="#593E15"
              strokeWidth="1.2"
            />
            {/* Base lower rim outline */}
            <ellipse cx="200" cy="534" rx="146" ry="26" fill="none" stroke="#4A3210" strokeWidth="1" opacity="0.45" />

            {/* Dais Top Circular Surface (Mặt bục gỗ sơn mài sáng ấm) */}
            <ellipse cx="200" cy="518" rx="146" ry="27" fill="url(#daisLightGrad)" stroke="#8C6D37" strokeWidth="1.4" />

            {/* Traditional Concentric Pattern Border (Viền hoa văn đồng tâm truyền thống) */}
            <ellipse cx="200" cy="518" rx="139" ry="24.5" fill="none" stroke="#B45309" strokeWidth="0.9" strokeDasharray="5 3" opacity="0.65" />
            <ellipse cx="200" cy="518" rx="132" ry="22" fill="none" stroke="#D97706" strokeWidth="0.6" opacity="0.4" />

            {/* Center Soft Spotlight Illumination */}
            <ellipse cx="200" cy="516" rx="88" ry="16" fill="#FFFFFF" opacity="0.38" />

            {/* Feet Contact Shadow (Bóng tiếp xúc trực tiếp dưới chân nhân vật) */}
            <ellipse cx="170" cy="520" rx="20" ry="5.5" fill="#3B1E08" opacity="0.45" />
            <ellipse cx="230" cy="520" rx="20" ry="5.5" fill="#3B1E08" opacity="0.45" />
            <ellipse cx="200" cy="522" rx="58" ry="8" fill="#241103" opacity="0.22" />
          </g>

          {/* ============================================================== */}
          {/* LAYER 0: BASE ANATOMY - HIỂN THỊ HÌNH ẢNH NHÂN VẬT GỐC HOẶC BÁO LỖI */}
          {/* ============================================================== */}
          {isFemale ? (
            /* Nhân vật nữ An Nhiên: Dùng hình vẽ 2D Game An Nhiên đã sinh */
            <g id="baseAnatomyImage" filter="url(#celShadow)">
              <image
                href={anNhienBaseImg}
                x="30"
                y="52"
                width="340"
                height="465"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          ) : (
            /* Nhân vật nam Minh Triết: Chưa có ảnh minh_triet_base.png -> Hiển thị ô báo lỗi rõ ràng */
            <g id="baseAnatomyMissing">
              <rect x="50" y="160" width="300" height="180" rx="16" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
              <text x="200" y="210" fill="#B91C1C" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                ⚠️ THIẾU TỆP HÌNH ẢNH NHÂN VẬT
              </text>
              <text x="200" y="240" fill="#4B5563" fontSize="12" textAnchor="middle" fontFamily="sans-serif">
                Tệp yêu cầu: /characters/minh_triet_base.png
              </text>
              <text x="200" y="265" fill="#6B7280" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                (Hiện chỉ có An Nhiên: an_nhien_base.jpg)
              </text>
              <text x="200" y="295" fill="#991B1B" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Vui lòng chọn nhân vật An Nhiên (Nữ) để xem
              </text>
            </g>
          )}

          {/* ============================================================== */}
          {/* LAYER 1: INNER WHITE COLLAR (ÁO LÓT ĐƠN TRẮNG CỔ LẬP LĨNH) */}
          {/* ============================================================== */}
          <g id="innerWhiteCollar">
            <path
              d="M188 152 C188 152, 200 150, 212 152 L210 166 C210 166, 200 164, 190 166 Z"
              fill="#FFFFFF"
              stroke="#D4D4D8"
              strokeWidth="1.2"
            />
            <path d="M190 162 Q 200 165 210 162" stroke="#E4E4E7" strokeWidth="1.5" />
          </g>

          {/* ============================================================== */}
          {/* LAYER 2: BACK FLAP OF ÁO DÀI (TÀ SAU TÁCH RIÊNG CỦA ÁO DÀI) */}
          {/* ============================================================== */}
          {costume.id === 'ao_dai_tan_thoi' && (
            <g id="aoDaiBackFlap">
              {/* Back flap floating slightly to right/background with deep silk shadow */}
              <path
                d="M180 255 Q 200 252 220 255 L248 485 Q 200 495 162 482 Z"
                fill={`url(#${shadowGradId})`}
                stroke="#2A1B18"
                strokeWidth="1.2"
                opacity="0.9"
              />
              {/* Shading fold */}
              <path d="M220 255 L248 485 L236 485 L212 255 Z" fill="#000000" opacity="0.25" />
            </g>
          )}

          {/* ============================================================== */}
          {/* LAYER 3: BOTTOMS / HẠ Y (QUẦN LỤA / QUẦN ÂU / JEANS / VÁY ĐỤP) */}
          {/* ============================================================== */}
          <g id="bottomLayer" filter="url(#celShadow)">
            {bottom.type === 'skirt' || bottom.id === 'vay_dup_den' ? (
              // Skirt / Chân Váy Xếp Ly / Váy Đụp Dân Gian
              <g id="skirtRender">
                <path
                  d="M166 280 Q 200 286 234 280 L262 500 Q 200 514 138 500 Z"
                  fill={bottomColors.base}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                <path d="M166 280 L138 500 L160 505 L178 284 Z" fill={bottomColors.shadow} opacity="0.6" />
                <path d="M234 280 L262 500 L240 505 L222 284 Z" fill={bottomColors.shadow} opacity="0.6" />
                <path d="M190 285 L182 504" stroke={bottomColors.line} strokeWidth="1.2" opacity="0.5" />
                <path d="M200 286 L200 508" stroke={bottomColors.line} strokeWidth="1.4" opacity="0.6" />
                <path d="M210 285 L218 504" stroke={bottomColors.line} strokeWidth="1.2" opacity="0.5" />
              </g>
            ) : (
              // Pants (Quần lụa trắng/đen, Quần âu, Quần Jeans)
              <g id="pantsRender">
                {/* Left Leg */}
                <path
                  d="M166 280 L152 502 L194 502 L200 330 Z"
                  fill={bottomColors.base}
                  stroke="#2A1B18"
                  strokeWidth="1.3"
                />
                <path d="M166 280 L152 502 L164 502 L176 300 Z" fill={bottomColors.shadow} opacity="0.5" />

                {/* Right Leg */}
                <path
                  d="M234 280 L248 502 L206 502 L200 330 Z"
                  fill={bottomColors.base}
                  stroke="#2A1B18"
                  strokeWidth="1.3"
                />
                <path d="M234 280 L248 502 L236 502 L224 300 Z" fill={bottomColors.shadow} opacity="0.5" />

                {/* Denim Specific Seam Details & Golden Stitching */}
                {bottom.id === 'quan_jeans_denim' && (
                  <>
                    <path d="M170 290 L160 500" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 2" />
                    <path d="M230 290 L240 500" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 2" />
                    <ellipse cx="174" cy="400" rx="9" ry="24" fill="#60A5FA" opacity="0.25" />
                    <ellipse cx="226" cy="400" rx="9" ry="24" fill="#60A5FA" opacity="0.25" />
                  </>
                )}

                {/* Silk Pants Pleat lines */}
                {bottom.type === 'silk_pants' && (
                  <>
                    <path d="M182 295 L176 500" stroke={bottomColors.shadow} strokeWidth="1" opacity="0.4" />
                    <path d="M218 295 L224 500" stroke={bottomColors.shadow} strokeWidth="1" opacity="0.4" />
                  </>
                )}
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* LAYER 4: FOOTWEAR / GIÀY DÉP (SNEAKER, GUỐC MỘC, OXFORD, BOOTS) */}
          {/* ============================================================== */}
          <g id="footwearLayer" filter="url(#celShadow)">
            {footwear.id === 'sneaker_trang' ? (
              // Clean White Streetwear Sneakers
              <g>
                <path d="M148 502 C148 502, 144 522, 186 522 L194 504 Z" fill="#FFFFFF" stroke="#2A1B18" strokeWidth="1.2" />
                <path d="M146 518 L188 518 L188 522 L146 522 Z" fill="#E2E8F0" />
                <line x1="158" y1="510" x2="174" y2="510" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="178" cy="510" r="1.5" fill="#EF4444" />
                <path d="M252 502 C252 502, 256 522, 214 522 L206 504 Z" fill="#FFFFFF" stroke="#2A1B18" strokeWidth="1.2" />
                <path d="M254 518 L212 518 L212 522 L254 522 Z" fill="#E2E8F0" />
                <line x1="242" y1="510" x2="226" y2="510" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="222" cy="510" r="1.5" fill="#EF4444" />
              </g>
            ) : footwear.id === 'guoc_moc_nhung' ? (
              // Guốc Mộc Quai Nhung Đỏ Cổ Truyền
              <g>
                <path d="M152 510 L188 510 L186 524 L154 524 Z" fill="#92400E" stroke="#451A03" strokeWidth="1.2" rx="1" />
                <path d="M156 510 Q 170 498 184 510" stroke="#BE123C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M248 510 L212 510 L214 524 L246 524 Z" fill="#92400E" stroke="#451A03" strokeWidth="1.2" rx="1" />
                <path d="M244 510 Q 230 498 216 510" stroke="#BE123C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </g>
            ) : footwear.id === 'boots_da_co_lung' ? (
              // Black Leather Ankle Boots
              <g>
                <path d="M148 488 L144 522 L190 522 L194 488 Z" fill="#18181B" stroke="#09090B" strokeWidth="1.4" />
                <path d="M144 518 L190 518 L190 523 L144 523 Z" fill="#3F3F46" />
                <path d="M252 488 L256 522 L210 522 L206 488 Z" fill="#18181B" stroke="#09090B" strokeWidth="1.4" />
                <path d="M256 518 L210 518 L210 523 L256 523 Z" fill="#3F3F46" />
              </g>
            ) : (
              // Oxford Classic Shoes
              <g>
                <path d="M150 504 L146 522 L192 522 L194 504 Z" fill="#27272A" stroke="#18181B" strokeWidth="1.2" />
                <path d="M250 504 L254 522 L208 522 L206 504 Z" fill="#27272A" stroke="#18181B" strokeWidth="1.2" />
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* LAYER 5: UPPER GARMENTS (CHI TIẾT ĐẶC TRƯNG TỪNG NHÓM VIỆT PHỤC) */}
          {/* ============================================================== */}
          <g id="garmentLayer" filter="url(#celShadow)">
            {/* 1. ÁO DÀI TÂN THỜI (Tà trước tách riêng, chiết eo, cổ đứng, nút bấm nách) */}
            {costume.id === 'ao_dai_tan_thoi' && (
              <g id="aoDaiTanThoi">
                {/* Raglan Sleeves ôm thon */}
                <path
                  d="M172 165 L128 262 L146 270 L172 212 Z"
                  fill={`url(#${shadowGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.3"
                />
                <path
                  d="M228 165 L272 262 L254 270 L228 212 Z"
                  fill={`url(#${shadowGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.3"
                />

                {/* Bodice with Waist Tapering (Đường chiết eo duyên dáng) */}
                {/* Tà trước (Front Flap): Thon ở eo (width ~ 42), xòe lượn thướt tha xuống gối */}
                <path
                  d="M174 162 Q 200 158 226 162 C222 195, 218 235, 216 260 C222 310, 234 380, 238 478 Q 200 484 162 478 C166 380, 178 310, 184 260 C182 235, 178 195, 174 162 Z"
                  fill={`url(#${highlightGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />

                {/* Pattern Overlay on Bodice & Front Flap */}
                {patternType !== 'none' && (
                  <path
                    d="M174 162 Q 200 158 226 162 C222 195, 218 235, 216 260 C222 310, 234 380, 238 478 Q 200 484 162 478 C166 380, 178 310, 184 260 C182 235, 178 195, 174 162 Z"
                    fill={`url(#pattern_${patternType})`}
                  />
                )}

                {/* Cổ đứng ôm cao 2-3cm (Standing Collar) */}
                <path
                  d="M188 154 C188 154, 200 152, 212 154 L210 167 C210 167, 200 165, 190 167 Z"
                  fill={hex}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                {/* Viền cổ lót trắng */}
                <path d="M189 153 Q 200 151 211 153" stroke="#FFFFFF" strokeWidth="2" />

                {/* Đường cong xẻ tà eo (Side Slit from waist) */}
                <path d="M216 258 Q 212 265 214 274" stroke="#000000" strokeWidth="1.8" opacity="0.35" />
                <path d="M184 258 Q 188 265 186 274" stroke="#000000" strokeWidth="1.8" opacity="0.35" />

                {/* Hàng khuy bấm ở cổ và dọc nách sườn phải (Snap buttons from neck along right armpit) */}
                <path d="M201 167 Q 215 180 220 205 Q 222 232 216 258" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" />
                <path d="M201 167 Q 215 180 220 205 Q 222 232 216 258" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="0.8" />
                {[
                  { cx: 201, cy: 169 },
                  { cx: 208, cy: 178 },
                  { cx: 215, cy: 190 },
                  { cx: 219, cy: 206 },
                  { cx: 221, cy: 226 },
                  { cx: 218, cy: 248 },
                ].map((btn, i) => (
                  <circle key={`btn_aodai_${i}`} cx={btn.cx} cy={btn.cy} r="2.2" fill="url(#goldTrimGrad)" stroke="#451A03" strokeWidth="0.7" />
                ))}

                {/* Dải nếp vải mềm dọc tà áo */}
                <path d="M192 265 Q 188 360 184 476" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.2" />
                <path d="M208 265 Q 212 360 216 476" stroke="#000000" strokeOpacity="0.18" strokeWidth="1.2" />
              </g>
            )}

            {/* 2. ÁO NGŨ THÂN TAY CHẼN (Vạt con bên trong, form suông đứng đắn, 5 cúc) */}
            {costume.id === 'ngu_than_tay_chen' && (
              <g id="aoNguThanTayChen">
                {/* Tay Chẽn (ôm vừa vặn) */}
                <path d="M170 165 L126 262 L146 270 L174 212 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />
                <path d="M230 165 L274 262 L254 270 L226 212 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />

                {/* Thân áo: 5 Thân dáng suông chữ A đĩnh đạc, nếp vải dày dặn, không chiết eo */}
                <path
                  d="M172 160 Q 200 156 228 160 L242 440 Q 200 446 158 440 Z"
                  fill={`url(#${highlightGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />

                {/* Pattern Overlay */}
                {patternType !== 'none' && (
                  <path
                    d="M172 160 Q 200 156 228 160 L242 440 Q 200 446 158 440 Z"
                    fill={`url(#pattern_${patternType})`}
                  />
                )}

                {/* Vạt con bên trong (Fifth panel / Thân con lót bên trong hé lộ) */}
                <path
                  d="M194 167 L216 230 L222 280 L204 278 Z"
                  fill="#E2DBD0"
                  opacity="0.35"
                />

                {/* Cổ Đứng Lập Lĩnh 2-3cm kín đáo */}
                <path
                  d="M187 154 C187 154, 200 152, 213 154 L211 167 C211 167, 200 165, 189 167 Z"
                  fill={hex}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                <path d="M188 153 Q 200 151 212 153" stroke="#FFFFFF" strokeWidth="2.2" />

                {/* Vạt cong cài nách phải chuẩn mực cổ truyền */}
                <path d="M202 167 Q 218 186 226 216" stroke="#000000" strokeOpacity="0.25" strokeWidth="2" />
                <path d="M202 167 Q 218 186 226 216" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" />

                {/* 5 Cúc Áo (Ngũ Thường: Nhân - Lễ - Nghĩa - Trí - Tín) Bằng Đồng / Ngọc */}
                {[
                  { cx: 202, cy: 171 },
                  { cx: 209, cy: 183 },
                  { cx: 216, cy: 198 },
                  { cx: 224, cy: 216 },
                  { cx: 225, cy: 242 },
                ].map((c, i) => (
                  <g key={`btn_nguthan_${i}`}>
                    <circle cx={c.cx} cy={c.cy} r="2.8" fill="url(#goldTrimGrad)" stroke="#451A03" strokeWidth="0.8" />
                    <circle cx={c.cx - 0.6} cy={c.cy - 0.6} r="0.9" fill="#FFFFFF" opacity="0.7" />
                  </g>
                ))}

                {/* Thân áo nếp gấp vải dày dặn đặc trưng ngũ thân */}
                <path d="M185 240 L178 438" stroke="#000000" strokeOpacity="0.2" strokeWidth="1.3" />
                <path d="M215 240 L222 438" stroke="#000000" strokeOpacity="0.2" strokeWidth="1.3" />
              </g>
            )}

            {/* 3. ÁO TẤC (Ngũ thân tay thụng buông dài quá đầu ngón tay) */}
            {costume.id === 'ao_tac' && (
              <g id="aoTac">
                {/* Wide Flowing Sleeves (Tay Thụng buông dài quá ngón tay) */}
                <path
                  d="M164 165 L84 280 L116 364 L166 270 Z"
                  fill={`url(#${shadowGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                <path
                  d="M236 165 L316 280 L284 364 L234 270 Z"
                  fill={`url(#${shadowGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                {/* Sleeves Inner Shadow hollow */}
                <path d="M84 280 L116 364 L106 342 L86 280 Z" fill="#000000" opacity="0.32" />
                <path d="M316 280 L284 364 L294 342 L314 280 Z" fill="#000000" opacity="0.32" />

                {/* Robe Body */}
                <path
                  d="M170 160 Q 200 155 230 160 L244 414 Q 200 420 156 414 Z"
                  fill={`url(#${highlightGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                {patternType !== 'none' && (
                  <path
                    d="M170 160 Q 200 155 230 160 L244 414 Q 200 420 156 414 Z"
                    fill={`url(#pattern_${patternType})`}
                  />
                )}

                {/* Cổ Đứng Lập Lĩnh */}
                <path
                  d="M186 154 C186 154, 200 152, 214 154 L212 168 C212 168, 200 166, 188 168 Z"
                  fill={hex}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                <path d="M187 153 Q 200 151 213 153" stroke="#FFFFFF" strokeWidth="2.2" />

                {/* Vạt cong cài sườn phải */}
                <path d="M202 168 Q 220 190 228 225" stroke="#000000" strokeOpacity="0.25" strokeWidth="2" />
                <path d="M202 168 Q 220 190 228 225" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" />

                {/* 5 Cúc Áo Bằng Vàng / Đồng */}
                {[
                  { cx: 202, cy: 172 },
                  { cx: 210, cy: 186 },
                  { cx: 218, cy: 204 },
                  { cx: 226, cy: 226 },
                  { cx: 227, cy: 256 },
                ].map((c, i) => (
                  <g key={`btn_tac_${i}`}>
                    <circle cx={c.cx} cy={c.cy} r="3" fill="url(#goldTrimGrad)" stroke="#451A03" strokeWidth="0.8" />
                    <circle cx={c.cx - 0.7} cy={c.cy - 0.7} r="1" fill="#FFFFFF" opacity="0.6" />
                  </g>
                ))}
              </g>
            )}

            {/* 4. ÁO NHẬT BÌNH (Cổ chữ nhật lớn, dải ngũ sắc ở cửa tay, đối khâm) */}
            {costume.id === 'ao_nhat_binh' && (
              <g id="aoNhatBinh">
                {/* Sleeves */}
                <path d="M168 165 L106 255 L132 278 L172 215 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />
                <path d="M232 165 L294 255 L268 278 L228 215 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />

                {/* Dải Ngũ Sắc Ở Cửa Tay Trái (Xanh lam, Vàng hoàng yến, Trắng, Đỏ son, Đen) */}
                <rect x="106" y="250" width="26" height="4.5" fill="#2563EB" />
                <rect x="110" y="254.5" width="26" height="4.5" fill="#EAB308" />
                <rect x="114" y="259" width="26" height="4.5" fill="#FFFFFF" />
                <rect x="118" y="263.5" width="26" height="4.5" fill="#DC2626" />
                <rect x="122" y="268" width="26" height="4.5" fill="#1E293B" />

                {/* Dải Ngũ Sắc Ở Cửa Tay Phải */}
                <rect x="268" y="250" width="26" height="4.5" fill="#2563EB" />
                <rect x="264" y="254.5" width="26" height="4.5" fill="#EAB308" />
                <rect x="260" y="259" width="26" height="4.5" fill="#FFFFFF" />
                <rect x="256" y="263.5" width="26" height="4.5" fill="#DC2626" />
                <rect x="252" y="268" width="26" height="4.5" fill="#1E293B" />

                {/* Robe Body */}
                <path
                  d="M170 160 Q 200 156 230 160 L242 398 Q 200 404 158 398 Z"
                  fill={`url(#${highlightGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                {patternType !== 'none' && (
                  <path
                    d="M170 160 Q 200 156 230 160 L242 398 Q 200 404 158 398 Z"
                    fill={`url(#pattern_${patternType})`}
                  />
                )}

                {/* Nẹp Cổ Chữ Nhật Nhật Bình Thêu Viền Vàng Kim */}
                <path d="M184 158 H216 V234 H184 Z" fill="url(#goldTrimGrad)" stroke="#78350F" strokeWidth="1.5" />
                {/* Inner cutout showing neck and inner ngũ thân */}
                <path d="M192 158 H208 V222 H192 Z" fill="#FDEFE4" />
                {/* Traditional Phượng/Loan embroidery lines */}
                <line x1="187" y1="172" x2="213" y2="172" stroke="#78350F" strokeWidth="1" />
                <line x1="187" y1="192" x2="213" y2="192" stroke="#78350F" strokeWidth="1" />
                <line x1="187" y1="212" x2="213" y2="212" stroke="#78350F" strokeWidth="1" />
              </g>
            )}

            {/* 5. ÁO GIAO LĨNH (Cổ vạt chéo chữ Y, vạt trái đè lên vạt phải) */}
            {costume.id === 'ao_giao_linh' && (
              <g id="aoGiaoLinh">
                {/* Sleeves */}
                <path d="M168 165 L104 270 L136 290 L174 220 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />
                <path d="M232 165 L296 270 L264 290 L226 220 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />

                {/* Body */}
                <path
                  d="M170 160 Q 200 156 230 160 L242 428 Q 200 434 158 428 Z"
                  fill={`url(#${highlightGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                {patternType !== 'none' && (
                  <path
                    d="M170 160 Q 200 156 230 160 L242 428 Q 200 434 158 428 Z"
                    fill={`url(#pattern_${patternType})`}
                  />
                )}

                {/* Right Lapel (Underneath) */}
                <path d="M220 160 L176 244" stroke="#000000" strokeWidth="2.5" opacity="0.3" />

                {/* Left Lapel (Crosses OVER Right Lapel: Bất Biến Văn Hóa Đại Việt!) */}
                <path d="M180 160 L226 234 L212 242 L172 168 Z" fill="#FFFFFF" fillOpacity="0.3" stroke="#FFFFFF" strokeWidth="1.4" />
                <path d="M180 160 L226 234" stroke="#2A1B18" strokeWidth="1.4" />

                {/* Dải Thắt Lưng Lụa Ngang Eo (Silk Sash) */}
                <rect x="168" y="258" width="64" height="15" fill="#B45309" stroke="#78350F" strokeWidth="1" rx="2" />
                <path d="M198 273 L192 335 L204 332 Z" fill="#D97706" stroke="#78350F" strokeWidth="1" />
              </g>
            )}

            {/* 6. ÁO TỨ THÂN (Yếm Đào + Hai tà trước buộc nút thắt ở bụng, vạt áo bay nhẹ) */}
            {costume.id === 'ao_tu_than' && (
              <g id="aoTuThan">
                {/* Yếm Đào Đỏ Cổ Truyền */}
                <path d="M182 172 Q 200 186 218 172 L212 254 L188 254 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
                <path d="M186 168 L191 148" stroke="#991B1B" strokeWidth="1.2" />
                <path d="M214 168 L209 148" stroke="#991B1B" strokeWidth="1.2" />

                {/* Sleeves */}
                <path d="M168 165 L118 255 L142 268 L174 210 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />
                <path d="M232 165 L282 255 L258 268 L226 210 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />

                {/* Two Front Flaps (2 Vạt trước buông lượn thắt nút) */}
                <path
                  d="M170 162 L186 254 L168 412 L154 406 L164 252 Z"
                  fill={`url(#${highlightGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                <path
                  d="M230 162 L214 254 L232 412 L246 406 L236 252 Z"
                  fill={`url(#${highlightGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />

                {/* Dải Thắt Lưng Điều (Lụa Hồng/Đỏ thắt nút duyên dáng ở bụng) */}
                <path d="M180 252 Q 200 262 220 252 L218 266 Q 200 274 182 266 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.2" />
                {/* Tied knot ribbon tails fluttering gently */}
                <path d="M198 266 Q 192 312 188 340 L198 336 Q 202 300 202 266 Z" fill="#F43F5E" />
                <path d="M202 266 Q 208 312 212 340 L204 336 Q 198 300 198 266 Z" fill="#E11D48" />
              </g>
            )}

            {/* 7. ÁO BÀ BA NAM BỘ (Cổ tròn, xẻ tà 2 bên hông, hàng cúc giữa, 2 túi vuông) */}
            {costume.id === 'ao_ba_ba' && (
              <g id="aoBaBa">
                {/* Sleeves */}
                <path d="M170 165 L124 260 L146 270 L174 212 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />
                <path d="M230 165 L276 260 L254 270 L226 212 Z" fill={`url(#${shadowGradId})`} stroke="#2A1B18" strokeWidth="1.4" />

                {/* Body: Thân ngắn ngang mông xẻ tà */}
                <path
                  d="M172 162 Q 200 158 228 162 L238 338 Q 200 344 162 338 Z"
                  fill={`url(#${highlightGradId})`}
                  stroke="#2A1B18"
                  strokeWidth="1.4"
                />
                {patternType !== 'none' && (
                  <path
                    d="M172 162 Q 200 158 228 162 L238 338 Q 200 344 162 338 Z"
                    fill={`url(#pattern_${patternType})`}
                  />
                )}

                {/* Cổ tròn thanh thoát */}
                <path d="M186 158 Q 200 170 214 158" stroke="#2A1B18" strokeWidth="1.4" fill="none" />

                {/* Hàng cúc dọc giữa thân áo */}
                <line x1="200" y1="170" x2="200" y2="338" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.2" />
                {[180, 205, 230, 255, 280, 305].map((cy, idx) => (
                  <circle key={`btn_baba_${idx}`} cx="200" cy={cy} r="2.2" fill="#FFFFFF" stroke="#475569" strokeWidth="0.8" />
                ))}

                {/* 2 Túi vuông đặc trưng phía trước */}
                <rect x="170" y="286" width="20" height="24" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" rx="2" strokeWidth="1.2" />
                <rect x="210" y="286" width="20" height="24" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" rx="2" strokeWidth="1.2" />
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* LAYER 6: ACCESSORIES & PROPS (KHĂN, NÓN, KÍNH, TÚI, QUẠT, TRÂM) */}
          {/* ============================================================== */}
          <g id="accessoriesLayer" filter="url(#celShadow)">
            {/* Khăn Xếp / Khăn Vấn (Nếp cuốn chữ Nhất nhiều tầng) */}
            {hasKhanVan && (
              <g id="propKhanVan">
                <ellipse cx="200" cy="74" rx="34" ry="14" fill="#1C1917" stroke="#09090B" strokeWidth="1.6" />
                <ellipse cx="200" cy="80" rx="32" ry="10" fill="#292524" />
                {/* Nếp cuốn ziczac chữ Nhất */}
                <path d="M180 82 Q 200 86 220 82" stroke="#44403C" strokeWidth="1.8" fill="none" />
                <path d="M184 76 Q 200 80 216 76" stroke="#44403C" strokeWidth="1.4" fill="none" />
              </g>
            )}

            {/* Khăn Vành Dây Cung Đình Huế (Nhiều lớp vải xếp vành kiêu sa) */}
            {hasKhanVanhDay && (
              <g id="propKhanVanhDay">
                <ellipse cx="200" cy="72" rx="43" ry="17" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2.5" />
                <ellipse cx="200" cy="76" rx="39" ry="12" fill="#1E40AF" />
                <path d="M172 76 Q 200 82 228 76" stroke="#60A5FA" strokeWidth="2" fill="none" />
                {/* Viền kim tuyến vàng lấp lánh */}
                <ellipse cx="200" cy="69" rx="41" ry="14" stroke="url(#goldTrimGrad)" strokeWidth="1.4" fill="none" />
              </g>
            )}

            {/* Nón Lá Chóp Tre (Vòng nan tre xoắn ốc tinh tế) */}
            {hasNonLa && (
              <g id="propNonLa">
                <polygon points="200,32 120,96 280,96" fill="#FEF9C3" stroke="#D97706" strokeWidth="1.6" />
                {/* Spiral bamboo rings (Các vòng nan nón lá) */}
                <line x1="200" y1="32" x2="200" y2="96" stroke="#EAB308" strokeWidth="1" />
                <line x1="140" y1="80" x2="260" y2="80" stroke="#FDE047" strokeWidth="0.9" />
                <line x1="156" y1="68" x2="244" y2="68" stroke="#FDE047" strokeWidth="0.9" />
                <line x1="172" y1="54" x2="228" y2="54" stroke="#FDE047" strokeWidth="0.9" />
                <line x1="184" y1="42" x2="216" y2="42" stroke="#FDE047" strokeWidth="0.9" />
                {/* Quai nón lụa hồng rủ duyên dáng */}
                <path d="M160 96 Q 200 148 240 96" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
              </g>
            )}

            {/* Nón Quai Thao Kinh Bắc (Vành tròn lớn, dải thao đỏ rủ) */}
            {hasNonQuaiThao && (
              <g id="propNonQuaiThao">
                <ellipse cx="200" cy="68" rx="66" ry="18" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
                <ellipse cx="200" cy="68" rx="45" ry="11" fill="#FDE68A" />
                {/* Dải thao đỏ hồng rủ dài quyến rũ */}
                <path d="M152 74 Q 200 135 248 74" stroke="#DC2626" strokeWidth="3" fill="none" />
              </g>
            )}

            {/* Chuỗi Hạt Ngọc Trai */}
            {hasVongNgoc && (
              <path
                d="M184 170 Q 200 200 216 170"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeDasharray="2.5 3.5"
                fill="none"
              />
            )}

            {/* Kính Mát Retro Gen Z */}
            {hasKinhMat && (
              <g id="propKinhMat">
                <ellipse cx="184" cy="106" rx="9" ry="7" fill="#09090B" stroke="#71717A" strokeWidth="1.4" />
                <ellipse cx="216" cy="106" rx="9" ry="7" fill="#09090B" stroke="#71717A" strokeWidth="1.4" />
                <line x1="193" y1="105" x2="207" y2="105" stroke="#D4D4D8" strokeWidth="1.8" />
              </g>
            )}

            {/* Quạt Giấy Thư Pháp */}
            {hasQuatGiay && (
              <g id="propQuatGiay" transform="translate(262, 255) rotate(-18)">
                <path d="M0 0 L-26 -38 A 42 42 0 0 1 26 -38 Z" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.4" />
                <line x1="0" y1="0" x2="-26" y2="-38" stroke="#78350F" strokeWidth="1.2" />
                <line x1="0" y1="0" x2="0" y2="-42" stroke="#78350F" strokeWidth="1.2" />
                <line x1="0" y1="0" x2="26" y2="-38" stroke="#78350F" strokeWidth="1.2" />
                <text x="0" y="-22" fontSize="7" fill="#991B1B" textAnchor="middle" fontFamily="serif">
                  Phong
                </text>
              </g>
            )}

            {/* Túi Tote Canvas Gen Z */}
            {hasTuiTote && (
              <g id="propTuiTote" transform="translate(100, 245)">
                <path d="M8 0 C8 -24, 28 -24, 28 0" stroke="#78350F" strokeWidth="2.5" fill="none" />
                <rect x="0" y="0" width="36" height="46" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" rx="3" />
                <text x="18" y="24" fontSize="8" fill="#C0392B" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                  REMIX
                </text>
                <text x="18" y="34" fontSize="6" fill="#64748B" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  DI SẢN
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Floating Mini Heritage Tag (Bottom Left) */}
      <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur shadow-xs border border-stone-200 text-xs font-medium text-stone-700">
        <span
          className="w-2.5 h-2.5 rounded-full ring-1 ring-black/10"
          style={{ backgroundColor: color.hex }}
        />
        <span>{color.name.split(' ')[0]}</span>
        <span className="text-stone-300">•</span>
        <span className="capitalize">{isFemale ? 'An Nhiên (Nữ)' : 'Minh Triết (Nam)'}</span>
      </div>

      {/* Visual confirmation badge showing active image file */}
      <div className="absolute top-2 left-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur text-white text-[10px] font-mono tracking-tight pointer-events-none shadow-xs border border-white/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>IMG: {isFemale ? 'an_nhien_base.jpg' : 'minh_triet_base.png (MISSING)'}</span>
      </div>
    </div>
  );
};
