

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CATEGORY_THEMES } from '../constants';
import { WasteItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import { Search, Loader, XCircle, ChevronLeft } from 'lucide-react';
import { BioWasteIcon, PaperWasteIcon, GeneralWasteIcon, ElectronicsWasteIcon, GardenWasteIcon, GlassBulkyWasteIcon, DefaultWasteIcon } from './WasteVisuals';
import AccordionWasteItem from './AccordionWasteItem';
import { useTheme } from '../contexts/ThemeContext';

interface BinGuideProps {
  onSearch?: () => void;
  onCategoryView?: () => void;
}

const CategoryCard: React.FC<{ categoryKey: string; title: string; onClick: () => void }> = ({ categoryKey, title, onClick }) => {
    const theme = CATEGORY_THEMES[categoryKey];
    if (!theme) return null;

    const categoryVisuals: Record<string, React.FC<any>> = {
        "kitchen_food": BioWasteIcon,
        "paper_packaging": PaperWasteIcon,
        "household_bathroom": GeneralWasteIcon,
        "special_electronic": ElectronicsWasteIcon,
        "garden_outdoors": GardenWasteIcon,
        "glass_bulky": GlassBulkyWasteIcon,
    };
    const Icon = categoryVisuals[categoryKey] || DefaultWasteIcon;

    return (
        <button
            onClick={onClick}
            className={`bg-gradient-to-br ${theme.from} ${theme.to} ${theme.text} rounded-2xl shadow-lg p-2 flex flex-col items-center justify-center text-center space-y-1.5 transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 ${theme.shadow} h-24`}
        >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 p-1.5 backdrop-blur-sm">
                <Icon className="w-full h-full" />
            </div>
            <h3 className="font-bold text-xs tracking-tight drop-shadow-sm">{title}</h3>
        </button>
    );
};


const ITEMS_PER_PAGE = 250;

const BinGuide: React.FC<BinGuideProps> = ({ onSearch, onCategoryView }) => {
  const { t, language, getLocalizedWasteItems } = useLanguage();
  const { playSound } = useSound();
  const { theme } = useTheme();
  const isBlackTheme = theme === 'black';

  const [categorizedWasteItems, setCategorizedWasteItems] = useState(() => getLocalizedWasteItems());
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<WasteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItemName, setOpenItemName] = useState<string | null>(null);
  
  const [allCategoryItems, setAllCategoryItems] = useState<WasteItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<WasteItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isPagingLoading, setIsPagingLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setCategorizedWasteItems(getLocalizedWasteItems());
    setSelectedCategory(null);
    setSearchTerm('');
  }, [language, getLocalizedWasteItems]);

  const handleToggleItem = (itemName: string) => {
    playSound();
    // Trigger ad logic only when opening an item, not closing it.
    if (openItemName !== itemName) {
      onCategoryView?.();
    }
    setOpenItemName(openItemName === itemName ? null : itemName);
  };

  const handleSearchTrigger = useCallback(() => {
    if (onSearch) {
        onSearch();
    }
  }, [onSearch]);

  useEffect(() => {
    const searchDebounceTimer = setTimeout(() => {
      const trimmedSearchTerm = searchTerm.trim();
      
      if (trimmedSearchTerm.length < 3) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }
      
      const previousSearchTerm = sessionStorage.getItem('previousSearchTerm') || '';
      if (!previousSearchTerm) {
          handleSearchTrigger();
      }
      sessionStorage.setItem('previousSearchTerm', trimmedSearchTerm);
      
      setIsLoading(true);

      const lowerCaseSearchTerm = trimmedSearchTerm.toLowerCase();
      
      const localResults: WasteItem[] = [];
      Object.values(categorizedWasteItems).flat().forEach(item => {
        const inName = item.name.toLowerCase().includes(lowerCaseSearchTerm);
        const inKeywords = item.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearchTerm));
        if (inName || inKeywords) {
          localResults.push(item);
        }
      });
      
      // Check if the currently open item is still in the new results. If not, close it.
      if (openItemName && !localResults.some(item => item.name === openItemName)) {
        setOpenItemName(null);
      }

      setSearchResults(localResults);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(searchDebounceTimer);
  }, [searchTerm, categorizedWasteItems, handleSearchTrigger, openItemName]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    if (!searchTerm && newSearchTerm) {
       sessionStorage.removeItem('previousSearchTerm');
    }
    setSearchTerm(newSearchTerm);
  };

  const loadMoreItems = useCallback(() => {
    if (!selectedCategory) return;
    setIsPagingLoading(true);
    
    setTimeout(() => {
        const allItems = allCategoryItems;
        const currentLength = displayedItems.length;
        const nextItems = allItems.slice(currentLength, currentLength + ITEMS_PER_PAGE);
        
        setDisplayedItems(prev => [...prev, ...nextItems]);
        setHasMore(currentLength + ITEMS_PER_PAGE < allItems.length);
        setIsPagingLoading(false);
    }, 500);
  }, [selectedCategory, displayedItems, allCategoryItems]);

  const loadMoreRef = useCallback(node => {
    if (isPagingLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            loadMoreItems();
        }
    });
    if (node) observer.current.observe(node);
  }, [isPagingLoading, hasMore, loadMoreItems]);

  useEffect(() => {
    if (selectedCategory) {
      const items = categorizedWasteItems[selectedCategory] || [];
      setAllCategoryItems(items);
      setDisplayedItems(items.slice(0, ITEMS_PER_PAGE));
      setHasMore(items.length > ITEMS_PER_PAGE);
    }
  }, [selectedCategory, categorizedWasteItems, t]);
  
  const handleCategoryClick = (category: string) => {
    playSound();
    onCategoryView?.();
    setSelectedCategory(category);
    setOpenItemName(null);
  };

  const handleBackToCategories = () => {
    playSound();
    setSelectedCategory(null);
    setSearchTerm('');
  };

  const clearSearch = () => {
    playSound();
    setSearchTerm('');
    setSearchResults([]);
  }
  
  const textColor = isBlackTheme ? 'text-slate-200' : 'text-slate-800';
  const subtitleColor = isBlackTheme ? 'text-slate-400' : 'text-slate-600';
  const cardBg = isBlackTheme ? 'bg-slate-900/50 border border-slate-700' : 'bg-white/50 rounded-lg shadow-sm';

  const renderContent = () => {
    if (searchTerm.length >= 3) {
      return (
        <div className="space-y-4">
          <h2 className={`text-xl font-bold ${textColor} drop-shadow-sm`}>{t('binGuide.searchResults')}</h2>
          {isLoading && <div className={`flex items-center space-x-2 ${subtitleColor}`}><Loader className="animate-spin" /><span>{t('binGuide.searching')}</span></div>}
          {!isLoading && searchResults.length === 0 && (
            <div className={`text-center py-8 px-4 ${cardBg}`}>
                <p className={`font-semibold ${textColor}`}>{t('binGuide.noResults', { searchTerm: searchTerm })}</p>
                <p className={`text-sm ${subtitleColor} mt-1`}>{t('binGuide.noResultsHint')}</p>
            </div>
          )}
          {!isLoading && searchResults.length > 0 && (
            <div className="space-y-3">
              {searchResults.map(item => (
                <AccordionWasteItem
                  key={item.name}
                  item={item}
                  isOpen={openItemName === item.name}
                  onToggle={() => handleToggleItem(item.name)}
                />
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (selectedCategory) {
      const titleEntry = Object.entries(t('waste_categories')).find(([, title]) => String(title) === selectedCategory);
      const categoryTitle = titleEntry ? String(titleEntry[1]) : selectedCategory;
      return (
        <div className="space-y-4">
          <button onClick={handleBackToCategories} className="flex items-center space-x-2 text-sm text-[var(--primary-color)] hover:text-[var(--primary-dark)] font-semibold">
            <ChevronLeft size={18} />
            <span>{t('binGuide.backToCategories')}</span>
          </button>
          <h2 className={`text-xl font-bold ${textColor} drop-shadow-sm`}>{categoryTitle}</h2>
          <div className="space-y-3">
            {displayedItems.map(item => (
              <AccordionWasteItem
                key={item.name}
                item={item}
                isOpen={openItemName === item.name}
                onToggle={() => handleToggleItem(item.name)}
              />
            ))}
          </div>
          {isPagingLoading && <div className="flex justify-center items-center py-4"><Loader className="animate-spin text-[var(--primary-color)]" /></div>}
          {!isPagingLoading && !hasMore && <div className={`text-center text-sm ${subtitleColor} py-4`}>{t('binGuide.endOfList')}</div>}
          <div ref={loadMoreRef} style={{ height: '1px' }} />
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h2 className={`text-xl font-bold ${textColor} drop-shadow-sm`}>{t('binGuide.subtitle')}</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(t('waste_categories')).map(([key, title]) => (
              <CategoryCard 
                  key={key} 
                  categoryKey={key} 
                  title={String(title)}
                  onClick={() => handleCategoryClick(String(title))} 
              />
          ))}
        </div>
      </div>
    );
  };
  
  const stickyBg = isBlackTheme 
    ? 'bg-black/80 backdrop-blur-md' 
    : 'bg-gradient-to-br from-[var(--primary-light)] via-slate-50 to-white';
    
  const inputClasses = isBlackTheme
    ? 'bg-slate-800/70 border-slate-700 text-slate-100 placeholder:text-slate-400 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]'
    : 'bg-white/70 border-slate-300 placeholder:text-slate-500 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]';


  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <h2 className={`text-2xl font-bold ${textColor} drop-shadow-sm`}>{t('binGuide.title')}</h2>
      </div>
      
      <div className={`sticky top-0 z-10 py-3 -mx-4 px-4 ${stickyBg}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder={t('binGuide.searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearchChange}
            className={`w-full pl-10 pr-10 py-3 backdrop-blur-sm border rounded-lg outline-none transition shadow-sm ${inputClasses}`}
          />
          {searchTerm && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <XCircle />
            </button>
          )}
        </div>
      </div>
      
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default BinGuide;