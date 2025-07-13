import React, { useEffect } from 'react';
import PaperRecyclingAnimation from './animations/DunkingAnimation';
import GlassRecyclingAnimation from './animations/RaccoonAnimation';
import OrganicWasteAnimation from './animations/PaperPlaneAnimation';
import PackagingRecyclingAnimation from './animations/DancingBottleAnimation';
import EWasteRecyclingAnimation from './animations/EWasteTeleportAnimation';
import BulkyWasteAnimation from './animations/BulkyWasteTetrisAnimation';
import ReuseBoxAnimation from './animations/CatBoxAnimation';
import HazardousWasteAnimation from './animations/BatteryMarchAnimation';
import ClothingDonationAnimation from './animations/BottleSymphonyAnimation';
import DepositReturnAnimation from './animations/CompostVortexAnimation';

const animations: React.FC[] = [
  PaperRecyclingAnimation,
  GlassRecyclingAnimation,
  OrganicWasteAnimation,
  PackagingRecyclingAnimation,
  EWasteRecyclingAnimation,
  BulkyWasteAnimation,
  ReuseBoxAnimation,
  HazardousWasteAnimation,
  ClothingDonationAnimation,
  DepositReturnAnimation,
];

interface AnimationOverlayProps {
  onClose: () => void;
  animationIndex: number;
}

const AnimationOverlay: React.FC<AnimationOverlayProps> = ({ onClose, animationIndex }) => {
  const SelectedAnimation = animations[animationIndex % animations.length];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500); 
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <div className="w-64 h-64 cursor-default" onClick={(e) => e.stopPropagation()}>
        {SelectedAnimation && <SelectedAnimation />}
      </div>
    </div>
  );
};

export default AnimationOverlay;