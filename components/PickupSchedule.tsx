import React, { useState, useEffect } from 'react';
import { Search, Building, Loader, MapPin, Phone, ChevronDown } from 'lucide-react';
import { FAKE_SERVICES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import { useTheme } from '../contexts/ThemeContext';

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface PickupScheduleProps {
  onFindServices?: () => void;
}

const PickupSchedule: React.FC<PickupScheduleProps> = ({ onFindServices }) => {
  const { t } = useLanguage();
  const { playSound } = useSound();
  const { theme } = useTheme();
  const isBlackTheme = theme === 'black';

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<NominatimResult | null>(null);
  
  const [foundServices, setFoundServices] = useState<string[]>([]);
  const [openService, setOpenService] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedAddress && inputValue !== selectedAddress.display_name) {
      setSelectedAddress(null);
    }

    if (inputValue.length < 3 || (selectedAddress && inputValue === selectedAddress.display_name)) {
      setSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setIsFetchingSuggestions(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}&countrycodes=de&limit=5`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data: NominatimResult[] = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch address suggestions:", err);
        setSuggestions([]);
      } finally {
        setIsFetchingSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, selectedAddress]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    setFoundServices([]);
    setOpenService(null);
    setError('');
  };

  const handleSuggestionClick = (address: NominatimResult) => {
    playSound();
    setInputValue(address.display_name);
    setSelectedAddress(address);
    setSuggestions([]);
  };
  
  const handleUseMyLocation = () => {
    playSound();
    if (!navigator.geolocation) {
      setError(t('pickup.error.noGeolocation'));
      return;
    }

    setIsLocating(true);
    setError('');
    setFoundServices([]);
    setOpenService(null);
    setSuggestions([]);
    setInputValue('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (!response.ok) throw new Error('Failed to fetch address.');
          const data = await response.json();
          
          if (data && data.display_name) {
            const newAddress: NominatimResult = {
              place_id: data.place_id,
              display_name: data.display_name,
              lat: data.lat,
              lon: data.lon,
            };
            setInputValue(newAddress.display_name);
            setSelectedAddress(newAddress);
          } else {
              setError(t('pickup.error.addressFromLocation'));
          }
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          setError(t('pickup.error.addressFromLocation'));
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        let errorMessage = t('pickup.error.getLocation');
        if (err.code === 1) {
          errorMessage = t('pickup.error.allowLocation');
        }
        setError(errorMessage);
        setIsLocating(false);
      }
    );
  };

  const handleSearchServices = () => {
    playSound();
    if (!selectedAddress) {
      setError(t('pickup.error.selectAddress'));
      return;
    }

    onFindServices?.();
    
    setError('');
    setIsLoading(true);
    setFoundServices([]);
    setOpenService(null);

    setTimeout(() => {
      const serviceNames = Object.keys(FAKE_SERVICES);
      const numServices = Math.floor(Math.random() * 2) + 1;
      const shuffled = [...serviceNames].sort(() => 0.5 - Math.random());
      setFoundServices(shuffled.slice(0, numServices));
      setIsLoading(false);
    }, 1200);
  };

  const handleToggleService = (service: string) => {
    playSound();
    setOpenService(openService === service ? null : service);
  };
  
  const handleOpenMaps = (query: string) => {
    playSound();
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  const handleContactClick = (phone: string) => {
    playSound();
    window.location.href = `tel:${phone}`;
  };
  
  const textColor = isBlackTheme ? 'text-slate-200' : 'text-slate-800';
  const subtitleColor = isBlackTheme ? 'text-slate-400' : 'text-slate-600';
  const cardBg = isBlackTheme ? 'bg-slate-900/80' : 'bg-white/60';
  const borderClass = isBlackTheme ? 'border-slate-700/80' : 'border-white/20';
  const inputClasses = isBlackTheme
    ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]'
    : 'bg-white/70 border-slate-300 placeholder:text-slate-500 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]';


  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-10">
          <Loader className="w-8 h-8 text-[var(--primary-color)] animate-spin" />
          <p className={`ml-3 ${subtitleColor}`}>{t('pickup.searching')}</p>
        </div>
      );
    }

    if (foundServices.length > 0 && selectedAddress) {
      return (
        <div className="space-y-4">
          <div>
            <h3 className={`font-bold text-lg drop-shadow-sm ${textColor}`}>{t('pickup.availableServices')}</h3>
            <p className="font-semibold text-[var(--primary-dark)] -mt-1 drop-shadow-sm">{selectedAddress.display_name}</p>
          </div>
          {foundServices.map(service => {
            const isOpen = openService === service;
            const serviceData = FAKE_SERVICES[service];

            return (
              <div key={service} className={`${cardBg} backdrop-blur-md border ${borderClass} rounded-xl shadow-md overflow-hidden transition-shadow duration-300`}>
                <button
                  onClick={() => handleToggleService(service)}
                  className={`w-full p-4 text-left flex items-center justify-between space-x-4 transition-colors ${isBlackTheme ? 'hover:bg-slate-800/50' : 'hover:bg-white/20'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${isBlackTheme ? 'bg-slate-800 text-slate-300' : 'bg-slate-100/70 text-slate-600'} p-3 rounded-full`}>
                      <Building className="w-6 h-6" />
                    </div>
                    <p className={`font-semibold ${textColor} flex-grow`}>{service}</p>
                  </div>
                  <ChevronDown className={`transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && serviceData && (
                  <div className={`${isBlackTheme ? 'bg-black/20' : 'bg-white/30'} p-4 border-t ${isBlackTheme ? 'border-slate-700' : 'border-slate-200/50'}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => handleOpenMaps(serviceData.mapQuery)}
                        className="bg-sky-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2 shadow-md"
                      >
                        <MapPin size={20} />
                        <span>{t('pickup.findOnMap')}</span>
                      </button>
                      <button
                        onClick={() => handleContactClick(serviceData.phone)}
                        className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] text-[var(--text-on-primary)] font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-[var(--primary-color)]/30 transition-all duration-300 flex items-center justify-center space-x-2 text-center shadow-md"
                      >
                        <Phone size={20} />
                        <span>{t('pickup.contact')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };


  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <h2 className={`text-2xl font-bold ${textColor} drop-shadow-sm`}>{t('pickup.title')}</h2>
      </div>

      <div className={`${cardBg} backdrop-blur-md border ${borderClass} rounded-2xl shadow-xl p-4 space-y-4`}>
        <button
            onClick={handleUseMyLocation}
            disabled={isLocating || isLoading}
            className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] text-[var(--text-on-primary)] font-semibold text-sm py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-[var(--primary-color)]/30 transition-all duration-300 disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none flex items-center justify-center space-x-2 shadow-md"
        >
            {isLocating ? <Loader className="animate-spin" size={20}/> : <MapPin size={20}/>}
            <span>{t('pickup.useMyLocation')}</span>
        </button>

        <div className="flex items-center" aria-hidden="true">
          <div className={`flex-grow border-t ${isBlackTheme ? 'border-slate-700' : 'border-slate-200/50'}`}></div>
          <span className="flex-shrink mx-4 text-slate-400 font-medium text-sm">{t('pickup.or')}</span>
          <div className={`flex-grow border-t ${isBlackTheme ? 'border-slate-700' : 'border-slate-200/50'}`}></div>
        </div>
        
        <div className="space-y-3">
          <label htmlFor="address-input" className={`block text-sm font-semibold ${isBlackTheme ? 'text-slate-300' : 'text-slate-700'}`}>
            {t('pickup.searchManually')}
          </label>
           <div className="relative">
            <input
              id="address-input"
              type="text"
              placeholder={t('pickup.searchPlaceholder')}
              value={inputValue}
              onChange={handleInputChange}
              className={`w-full pl-4 pr-10 py-3 backdrop-blur-sm border rounded-lg outline-none transition shadow-sm ${inputClasses}`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {isFetchingSuggestions ? <Loader className="animate-spin" size={20}/> : <Search />}
            </div>
            {suggestions.length > 0 && (
              <div className={`absolute z-10 w-full mt-1 ${isBlackTheme ? 'bg-slate-900/95 border-slate-700' : 'bg-white/90 border-slate-200'} backdrop-blur-md border rounded-lg shadow-lg max-h-60 overflow-y-auto`}>
                {suggestions.map(s => (
                  <div
                    key={s.place_id}
                    onClick={() => handleSuggestionClick(s)}
                    className={`px-4 py-3 ${isBlackTheme ? 'hover:bg-slate-800/80 text-slate-200' : 'hover:bg-slate-200/50 text-slate-800'} cursor-pointer text-sm`}
                  >
                    {s.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
              onClick={handleSearchServices}
              disabled={!selectedAddress || isLoading || isLocating}
              className={`w-full font-semibold text-sm py-3 px-4 rounded-lg transition-colors shadow-md ${isBlackTheme ? 'bg-slate-200 text-slate-900 hover:bg-white disabled:bg-slate-600 disabled:text-slate-400' : 'bg-slate-700 text-white hover:bg-slate-800 disabled:bg-slate-400'} disabled:cursor-not-allowed`}
          >
              {t('pickup.findServices')}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm px-1">{error}</p>}
      </div>
      
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default PickupSchedule;