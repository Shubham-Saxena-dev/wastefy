import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import BinGuide from './components/BinGuide';
import PickupSchedule from './components/PickupSchedule';
import KnowledgeBase from './components/KnowledgeBase';
import Settings from './components/Settings';
import DisclaimerModal from './components/DisclaimerModal';
import { useLanguage } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';
import { Home, Calendar, BookOpen, Settings as SettingsIcon, MapPin } from 'lucide-react';
import AdBanner from './components/AdBanner';
import InterstitialAd from './components/InterstitialAd';
import { Capacitor } from '@capacitor/core';
import { AdMob } from '@capacitor-community/admob';

export enum Tab {
  Home = 'Home',
  Schedule = 'Schedule',
  FindNearby = 'FindNearby',
  Knowledge = 'Knowledge',
  Settings = 'Settings',
}

const App: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as Tab;
    if (tabParam && Object.values(Tab).includes(tabParam)) {
      return tabParam;
    }
    return Tab.Home;
  });
  
  const [tabKeys, setTabKeys] = useState({
    [Tab.Home]: 0,
    [Tab.Schedule]: 0,
    [Tab.FindNearby]: 0,
    [Tab.Knowledge]: 0,
    [Tab.Settings]: 0,
  });

  const [showDisclaimer, setShowDisclaimer] = useState(true);
  
  const [showInterstitialAd, setShowInterstitialAd] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [actionCount, setActionCount] = useState(0);
  const [categoryViewCount, setCategoryViewCount] = useState(0);

   useEffect(() => {
    // Initialize AdMob when the app starts on a native device.
    if (Capacitor.isNativePlatform()) {
      AdMob.initialize({
        initializeForTesting: true,
      }).catch(e => console.error("Error initializing AdMob", e));
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
  };

  const handleTabClick = (tabId: Tab) => {
    if (activeTab === tabId) {
      setTabKeys(prevKeys => ({
        ...prevKeys,
        [tabId]: prevKeys[tabId] + 1
      }));
    } else {
      setActiveTab(tabId);
    }
  };
  
  const handleSearch = () => {
    if (showInterstitialAd) return;
    const newCount = searchCount + 1;
    setSearchCount(newCount);
    // Show an ad on the 3rd search, and every 2nd search after that (5th, 7th, etc.)
    if (newCount >= 3 && newCount % 2 !== 0) {
      setShowInterstitialAd(true);
    }
  };

  const handleAction = () => {
    if (showInterstitialAd) return;
    const newCount = actionCount + 1;
    setActionCount(newCount);
    // Show an ad on the 3rd action, and every 2nd action after that (5th, 7th, etc.)
    if (newCount >= 3 && newCount % 2 !== 0) {
      setShowInterstitialAd(true);
    }
  };
  
   const handleFindServicesAction = () => {
    if (showInterstitialAd) return;
    setShowInterstitialAd(true);
  };

  const handleCategoryView = () => {
    if (showInterstitialAd) return;
    const newCount = categoryViewCount + 1;
    setCategoryViewCount(newCount);
    // Show an ad on every 4th category view
    if (newCount > 0 && newCount % 4 === 0) {
        setShowInterstitialAd(true);
    }
  };

  const handleCloseInterstitial = () => {
    setShowInterstitialAd(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home:
        return <BinGuide key={`${Tab.Home}-${tabKeys[Tab.Home]}`} onSearch={handleSearch} onCategoryView={handleCategoryView} />;
      case Tab.Schedule:
        return <PickupSchedule key={`${Tab.Schedule}-${tabKeys[Tab.Schedule]}`} onFindServices={handleFindServicesAction} />;
      case Tab.FindNearby:
        return <KnowledgeBase key={`${Tab.FindNearby}-${tabKeys[Tab.FindNearby]}`} mode="locations-only" onAction={handleAction} />;
      case Tab.Knowledge:
        return <KnowledgeBase key={`${Tab.Knowledge}-${tabKeys[Tab.Knowledge]}`} onAction={handleAction} />;
      case Tab.Settings:
        return <Settings key={`${Tab.Settings}-${tabKeys[Tab.Settings]}`} />;
      default:
        return <BinGuide key={`${Tab.Home}-${tabKeys[Tab.Home]}`} onSearch={handleSearch} onCategoryView={handleCategoryView} />;
    }
  };
  
  const navItems = [
    { id: Tab.Home, label: t('nav.home'), icon: Home },
    { id: Tab.Schedule, label: t('nav.pickup'), icon: Calendar },
    { id: Tab.FindNearby, label: t('nav.findNearby'), icon: MapPin },
    { id: Tab.Knowledge, label: t('nav.learn'), icon: BookOpen },
    { id: Tab.Settings, label: t('nav.settings'), icon: SettingsIcon },
  ];
  
  const bgClasses = theme === 'black'
    ? 'bg-black text-slate-200'
    : 'bg-gradient-to-br from-[var(--primary-light)] via-slate-50 to-white text-slate-800';

   return (
    <>
      <div className={`min-h-screen font-sans ${bgClasses} flex flex-col ${showDisclaimer || showInterstitialAd ? 'blur-sm' : ''}`}>
        <main className="flex-grow mb-24">
          <div className="max-w-md mx-auto">
            {renderContent()}
          </div>
        </main>

        <div className="fixed bottom-16 left-0 right-0 z-10 pointer-events-none">
            <div className="max-w-md mx-auto pointer-events-auto">
                <AdBanner />
            </div>
        </div>

        <BottomNav
          items={navItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      </div>
      {showDisclaimer && <DisclaimerModal onAccept={handleAcceptDisclaimer} />}
      {showInterstitialAd && <InterstitialAd onClose={handleCloseInterstitial} />}
    </>
  );
};
export default App;
