/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMOB_APP_ID: string;
  readonly VITE_ADMOB_BANNER_UNIT_ID: string;
  readonly VITE_ADMOB_INTERSTITIAL_UNIT_ID: string;
  // Add more VITE_ variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}