

import React, { useState, useEffect } from 'react';
import { AdMob, PrepareInterstitialOptions } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import { Loader } from 'lucide-react';
import { config } from '../config';
import type { PluginListenerHandle } from '@capacitor/core';

interface InterstitialAdProps {
  onClose: () => void;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ onClose }) => {
  const interstitialAdUnitId = config.admob.interstitialAdUnitId;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Capacitor.isNativePlatform() || !interstitialAdUnitId) {
      onClose();
      return;
    }

    let listener: PluginListenerHandle;

    const loadAndShowAd = async () => {
      // Add a listener for when the user closes the ad.
      listener = await AdMob.addListener('interstitialAdDismissed', () => {
        onClose();
      });

      try {
        setIsLoading(true);
        const options: PrepareInterstitialOptions = {
          adId: interstitialAdUnitId,
          isTesting: true,
        };
        // Prepare the ad before showing it
        await AdMob.prepareInterstitial(options);
        setIsLoading(false);
        // Show the ad
        await AdMob.showInterstitial();
      } catch (e: any) {
        console.error('Error with AdMob interstitial:', e);
        setError('Ad failed to load.');
        setIsLoading(false);
        // Automatically close our loading overlay if the ad fails to show.
        setTimeout(onClose, 2000);
      }
    };

    loadAndShowAd();

    // Cleanup function to remove listener when component unmounts
    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [interstitialAdUnitId, onClose]);

  // The native plugin handles the full-screen ad UI.
  // We just show a loading overlay from the web side until the ad is ready.
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-white">
        <Loader className="animate-spin" size={48} />
        <span className="text-lg font-medium">{error || 'Loading Ad...'}</span>
      </div>
    </div>
  );
};

export default InterstitialAd;