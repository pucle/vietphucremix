import React from 'react';
import { CostumeItem, ClothingPiece, ColorOption } from '../data/costumesData';
import { LayeredAvatarEngine, AvatarGender, HeritagePatternType } from './LayeredAvatarEngine';

export interface OutfitVisualizerProps {
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

export const OutfitVisualizer: React.FC<OutfitVisualizerProps> = ({
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
  return (
    <LayeredAvatarEngine
      gender={gender}
      costume={costume}
      color={color}
      bottom={bottom}
      footwear={footwear}
      accessories={accessories}
      styleMode={styleMode}
      cameraZoom={cameraZoom}
      compactStage={compactStage}
      patternType={patternType}
    />
  );
};
