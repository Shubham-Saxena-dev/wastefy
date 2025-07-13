import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, languages, LanguageCode } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import FlagIcon from './FlagIcon';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const { playSound } = useSound();
    const { theme } = useTheme();
    const isBlackTheme = theme === 'black';

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        playSound();
        setIsOpen(!isOpen);
    }

    const handleSelect = (langCode: LanguageCode) => {
        playSound();
        setLanguage(langCode);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const buttonClasses = isBlackTheme
        ? 'bg-slate-800 border-slate-700 text-slate-100'
        : 'bg-white border-slate-300 text-slate-800';
    
    const panelClasses = isBlackTheme
        ? 'bg-slate-900 border-slate-700'
        : 'bg-white border-slate-200';
        
    const itemClasses = isBlackTheme
        ? 'hover:bg-slate-800/80 text-slate-200'
        : 'hover:bg-[var(--primary-light)]/50 text-slate-700';

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleToggle}
                className={`w-full flex items-center justify-between p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)]/70 shadow-sm ${buttonClasses}`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="Select Language"
            >
                <span className="flex items-center space-x-3">
                    <FlagIcon lang={language} className="w-6 h-auto rounded-sm shadow-sm" />
                    <span className="font-semibold">{languages[language].name}</span>
                </span>
                <ChevronDown className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            
            <div className={`transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                <div
                    className={`absolute z-10 w-full mt-2 origin-top-right border rounded-lg shadow-xl overflow-hidden ${panelClasses}`}
                    role="menu"
                >
                    <ul className="max-h-60 overflow-y-auto">
                        {Object.entries(languages).map(([code, lang]) => (
                            <li key={code}>
                                <button
                                    onClick={() => handleSelect(code as LanguageCode)}
                                    className={`w-full text-left flex items-center space-x-3 px-4 py-3 transition-colors ${itemClasses}`}
                                    role="menuitem"
                                >
                                    <FlagIcon lang={code as LanguageCode} className="w-6 h-auto rounded-sm shadow-sm" />
                                    <span className="font-semibold">{lang.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelector;