/**
 * Centralized configuration for the application.
 * This file may read from environment variables or contain hardcoded values.
 * It provides a single source for configuration throughout the app.
 */
export const config = {
  admob: {
    appId: import.meta.env.VITE_ADMOB_APP_ID,
    bannerAdUnitId: import.meta.env.VITE_ADMOB_BANNER_UNIT_ID,
    interstitialAdUnitId: import.meta.env.VITE_ADMOB_INTERSTITIAL_UNIT_ID,
  },
  contact: {
    email: 'john.reins@altmail.kr',
  },
};
