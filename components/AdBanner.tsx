

import React, { useEffect } from 'react';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import { config } from '../config';

const AdBanner: React.FC = () => {
  const bannerAdUnitId = config.admob.bannerAdUnitId;

  useEffect(() => {
    // Only run on native platforms
    if (!Capacitor.isNativePlatform() || !bannerAdUnitId) {
      return;
    }

    const showBanner = async () => {
      try {
        // The AdMob plugin positions the banner as an overlay.
        // We set a margin to push it below our app's header.
        const options: BannerAdOptions = {
          adId: bannerAdUnitId,
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 72, // Adjust this to fit below your sticky header
          isTesting: true,
        };
        await AdMob.showBanner(options);
      } catch (e) {
        const error = e as { message?: string };
        // Handle common errors, like when an ad is already shown
        if (error.message?.includes('already')) {
            // Ad is already visible, no action needed.
        } else {
            console.error('Error showing AdMob banner:', e);
        }
      }
    };
    
    // Show banner on component mount
    showBanner();

    // On component unmount, hide the banner to clean up.
    return () => {
      if (Capacitor.isNativePlatform()) {
        AdMob.hideBanner().catch(() => {}); // Ignore errors on hiding, it might already be hidden.
      }
    };
  }, [bannerAdUnitId]);

  // This component only controls the native overlay. It doesn't render any HTML.
  return null;
};

export default AdBanner;
