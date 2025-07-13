import React from 'react';
import { WasteItem } from '../types';
import { BIN_THEMES, DEFAULT_BIN_THEME, binTypeMapQueries, visualMap } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import { Info, ChevronDown, MapPin, Home } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const handleOpenMaps = (query: string) => {
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
};

const AccordionWasteItem: React.FC<{ item: WasteItem; isOpen: boolean; onToggle: () => void }> = ({ item, isOpen, onToggle }) => {
  const { t } = useLanguage();
  const { playSound } = useSound();
  const { theme: appTheme } = useTheme();
  const isBlackTheme = appTheme === 'black';

  const binTheme = BIN_THEMES[item.bin] || DEFAULT_BIN_THEME;
  const VisualComponent = visualMap[item.visual || 'default'];
  const mapQuery = binTypeMapQueries[item.bin];

  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound();
    if(mapQuery) {
        handleOpenMaps(mapQuery);
    }
  };
  
  const cardBg = isBlackTheme ? 'bg-slate-900/80' : 'bg-white/60';
  const borderClass = isBlackTheme ? 'border-slate-800/80' : 'border-white/20';
  const textColor = isBlackTheme ? 'text-slate-200' : 'text-slate-800';
  const subtitleColor = isBlackTheme ? 'text-slate-400' : 'text-slate-700';

  return (
    <div className={`${cardBg} backdrop-blur-md border ${borderClass} rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg`}>
      <button
        onClick={onToggle}
        className={`w-full p-3 flex items-center space-x-4 text-left ${isBlackTheme ? 'hover:bg-slate-800/50' : 'hover:bg-white/20'} transition-colors`}
      >
        <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg p-2 ${binTheme.bgLight} ${binTheme.textOnLight}`}>
          <VisualComponent className="w-full h-full" />
        </div>
        <div className="flex-grow">
          <h3 className={`font-semibold ${textColor}`}>{item.name}</h3>
        </div>
        <ChevronDown className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`${isBlackTheme ? 'bg-black/20' : 'bg-white/30'} p-4 border-t ${isBlackTheme ? 'border-slate-700' : 'border-slate-200/50'} animate-fade-in`}>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-2">{t('binGuide.disposeIn')}</h4>
              <div className={`${binTheme.bg} ${binTheme.text} font-bold py-1.5 px-3.5 rounded-full text-sm shadow-sm inline-block`}>
                {item.bin}
              </div>
            </div>

            {item.notes && (
              <div>
                <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-2">{t('binGuide.importantNotes')}</h4>
                <p className={`${subtitleColor} flex items-start text-sm`}>
                  <Info size={16} className="mr-2.5 flex-shrink-0 mt-0.5 text-sky-500" />
                  <span>{item.notes}</span>
                </p>
              </div>
            )}
            
            <div>
              <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1">{t('binGuide.collectionType')}</h4>
              {mapQuery ? (
                <button
                  onClick={handleMapClick}
                  className="bg-sky-500 text-white font-semibold text-sm py-2 px-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-sky-600 transition-colors shadow-md w-full sm:w-auto mt-1"
                  title={`${t('binGuide.findFacilities')} ${item.bin}`}
                >
                  <MapPin size={16} />
                  <span>{t('binGuide.findFacilitiesButton')}</span>
                </button>
              ) : (
                <div className={`flex items-center space-x-2 ${subtitleColor} pt-1`}>
                  <Home size={18} className="flex-shrink-0 text-slate-500" />
                  <p className="text-sm font-medium">{t('binGuide.homeCollection')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionWasteItem;