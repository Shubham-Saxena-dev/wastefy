
import React, { useState, useEffect } from 'react';
import { KNOWLEDGE_ICON_MAP } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import { KnowledgeArticle, LocationArticle, CategoryImageType, KnowledgeCategory, KnowledgeSubCategory } from '../types';
import { ChevronDown, ArrowRight, ChevronLeft } from 'lucide-react';
import { WasteBinsImage, SustainabilityImage, LocationsImage } from './BinImages';
import { useTheme } from '../contexts/ThemeContext';

const categoryImageMap: Record<CategoryImageType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  bins: WasteBinsImage,
  sustainability: SustainabilityImage,
  locations: LocationsImage,
};

const AccordionItem: React.FC<{ article: KnowledgeArticle, isOpen: boolean, onToggle: () => void, isBlackTheme: boolean }> = ({ article, isOpen, onToggle, isBlackTheme }) => {
  const Icon = KNOWLEDGE_ICON_MAP[article.iconKey];
  if (!Icon) return null;

  return (
    <div className={`border-t ${isBlackTheme ? 'border-slate-700' : 'border-white/20'} first:border-t-0`}>
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center p-4 text-left font-semibold ${isBlackTheme ? 'text-slate-200 hover:bg-slate-800/50' : 'text-slate-800 hover:bg-white/20'} transition-colors`}
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6 text-[var(--primary-color)] flex-shrink-0" />
          <span className="flex-grow">{article.title}</span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 text-slate-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className={`px-4 pb-4 ${isBlackTheme ? 'text-slate-400' : 'text-slate-600'}`}>
          <ul className="list-disc list-inside space-y-1 pl-9">
            {article.content.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LocationCard: React.FC<{ article: LocationArticle, onFind: () => void, isBlackTheme: boolean }> = ({ article, onFind, isBlackTheme }) => {
    const Icon = KNOWLEDGE_ICON_MAP[article.iconKey];
    if (!Icon) return null;

    const cardBg = isBlackTheme ? 'bg-slate-900/80 hover:bg-slate-800' : 'bg-white/60 hover:bg-white/70';
    const borderClass = isBlackTheme ? 'border-slate-700/80' : 'border-white/20';
    const textColor = isBlackTheme ? 'text-slate-200' : 'text-slate-800';
    const subtitleColor = isBlackTheme ? 'text-slate-400' : 'text-slate-600';

    return (
        <button
            onClick={onFind}
            className={`w-full ${cardBg} backdrop-blur-md border ${borderClass} rounded-xl shadow p-4 text-left flex items-center justify-between transition-all duration-200 hover:shadow-md`}
        >
            <div className="flex items-center space-x-4">
                <div className="bg-[var(--primary-light)] text-[var(--primary-color)] p-3 rounded-full">
                    <Icon className="w-6 h-6"/>
                </div>
                <div className="flex-grow">
                    <h3 className={`font-semibold ${textColor}`}>{article.title}</h3>
                    <p className={`${subtitleColor} text-sm mt-1`}>{article.content[0]}</p>
                </div>
            </div>
            <ArrowRight size={20} className="text-slate-400 flex-shrink-0" />
        </button>
    );
};

interface KnowledgeBaseProps {
  mode?: 'locations-only';
  onAction?: () => void;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ mode, onAction }) => {
  const { t, getLocalizedKnowledgeBase, language } = useLanguage();
  const { playSound } = useSound();
  const { theme } = useTheme();
  const isBlackTheme = theme === 'black';

  const [knowledgeBaseContent, setKnowledgeBaseContent] = useState(() => getLocalizedKnowledgeBase());
  
  const handleOpenMaps = (query: string) => {
    playSound();
    onAction?.();
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };
  
  const textColor = isBlackTheme ? 'text-slate-200' : 'text-slate-800';
  const subtitleColor = isBlackTheme ? 'text-slate-400' : 'text-slate-700';
  const cardBg = isBlackTheme ? 'bg-slate-900/80' : 'bg-white/60';
  const borderClass = isBlackTheme ? 'border-slate-700/80' : 'border-white/20';

  if (mode === 'locations-only') {
    const findNearbyCategory = knowledgeBaseContent.find(cat => cat.image === 'locations');
    
    if (!findNearbyCategory) {
      return (
        <div className="p-4 text-center text-slate-500">
          Location content not found.
        </div>
      );
    }

    return (
      <div className="p-4 space-y-4">
        <h2 className={`text-3xl font-bold ${textColor} text-center drop-shadow-sm`}>{findNearbyCategory.title}</h2>
        {findNearbyCategory.subCategories.map(subCategory => (
          <div key={subCategory.title}>
            <h3 className={`font-semibold text-lg ${subtitleColor} mb-2 ml-1 drop-shadow-sm`}>{subCategory.title}</h3>
            <div className="space-y-3">
              {subCategory.articles.map(article => {
                const locationArticle = article as LocationArticle;
                return (
                  <LocationCard
                    key={locationArticle.title}
                    article={locationArticle}
                    onFind={() => handleOpenMaps(locationArticle.mapQuery)}
                    isBlackTheme={isBlackTheme}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default "Learn" tab view
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | null>(null);
  
  const categoriesForLearnTab = knowledgeBaseContent.filter(cat => cat.image !== 'locations');

  useEffect(() => {
    setKnowledgeBaseContent(getLocalizedKnowledgeBase());
    setSelectedCategory(null);
  }, [language, getLocalizedKnowledgeBase]);

  const handleToggle = (title: string) => {
    playSound();
    setOpenAccordion(openAccordion === title ? null : title);
  };

  const handleSelectCategory = (category: KnowledgeCategory) => {
    playSound();
    setSelectedCategory(category);
  };

  const handleBack = () => {
    playSound();
    setSelectedCategory(null);
  };

  const renderDetailView = () => {
    if (!selectedCategory) return null;
    return (
      <div className="p-4 space-y-4">
        <button onClick={handleBack} className="flex items-center space-x-2 text-sm text-[var(--primary-color)] hover:text-[var(--primary-dark)] font-semibold mb-2">
          <ChevronLeft size={18} />
          <span>{t('knowledge.back')}</span>
        </button>
        <h2 className={`text-2xl font-bold ${textColor} ml-1 drop-shadow-sm`}>{selectedCategory.title}</h2>
        {selectedCategory.subCategories.map(subCategory => {
          if (subCategory.type === 'accordion') {
            return (
              <div key={subCategory.title}>
                <h3 className={`font-semibold text-lg ${subtitleColor} mb-2 ml-1 drop-shadow-sm`}>{subCategory.title}</h3>
                <div className={`${cardBg} backdrop-blur-md border ${borderClass} rounded-xl shadow overflow-hidden`}>
                  {subCategory.articles.map(article => (
                    <AccordionItem 
                      key={article.title} 
                      article={article as KnowledgeArticle}
                      isOpen={openAccordion === article.title} 
                      onToggle={() => handleToggle(article.title)} 
                      isBlackTheme={isBlackTheme}
                    />
                  ))}
                </div>
              </div>
            );
          }
          if (subCategory.type === 'location') {
            return (
              <div key={subCategory.title}>
                <h3 className={`font-semibold text-lg ${subtitleColor} mb-2 ml-1 drop-shadow-sm`}>{subCategory.title}</h3>
                <div className="space-y-3">
                  {subCategory.articles.map(article => {
                    const locationArticle = article as LocationArticle;
                    return (
                      <LocationCard
                        key={locationArticle.title}
                        article={locationArticle}
                        onFind={() => handleOpenMaps(locationArticle.mapQuery)}
                        isBlackTheme={isBlackTheme}
                      />
                    );
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderHomeView = () => {
    return (
        <div className="p-4 space-y-8">
          <div className="text-center">
            <h2 className={`text-3xl font-bold ${textColor} drop-shadow-sm`}>{t('knowledge.title')}</h2>
          </div>
          <div className="space-y-5">
              {categoriesForLearnTab.map(category => {
                  const CategoryImage = categoryImageMap[category.image];
                  return (
                    <div key={category.title} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                        <button onClick={() => handleSelectCategory(category)} className="w-full text-left relative h-32 rounded-2xl shadow-md overflow-hidden">
                            <CategoryImage className="absolute inset-0 w-full h-full" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                <h3 className="font-bold text-lg text-white drop-shadow-md">{category.title}</h3>
                                <div className="flex items-center text-sm font-semibold text-white/90 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <span>{t('knowledge.explore')}</span>
                                  <ArrowRight size={16} className="ml-1" />
                                </div>
                            </div>
                        </button>
                    </div>
                  );
              })}
          </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-x-hidden">
        <div className={`transition-transform duration-300 ease-in-out ${selectedCategory ? '-translate-x-full' : 'translate-x-0'}`}>
            {renderHomeView()}
        </div>
        <div className={`transition-transform duration-300 ease-in-out absolute top-0 left-0 w-full h-full ${selectedCategory ? 'translate-x-0' : 'translate-x-full'}`}>
            {renderDetailView()}
        </div>
    </div>
  );
};

export default KnowledgeBase;
