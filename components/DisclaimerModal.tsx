import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import AppLogo from './AppLogo';
import { useTheme } from '../contexts/ThemeContext';

interface DisclaimerModalProps {
    onAccept: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onAccept }) => {
    const { t } = useLanguage();
    const { playSound } = useSound();
    const { theme } = useTheme();
    const isBlackTheme = theme === 'black';

    const handleAccept = () => {
        playSound();
        onAccept();
    };
    
    const cardBg = isBlackTheme ? 'bg-slate-900' : 'bg-white';
    const textColor = isBlackTheme ? 'text-slate-200' : 'text-slate-800';
    const subtitleColor = isBlackTheme ? 'text-slate-400' : 'text-slate-600';
    const borderColor = isBlackTheme ? 'border-slate-800' : 'border-slate-200';
    const footerBg = isBlackTheme ? 'bg-black/50' : 'bg-slate-50/70';

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`${cardBg} rounded-2xl shadow-2xl w-full max-w-md m-4 animate-fade-in-up flex flex-col max-h-[90vh]`}>
                <div className={`p-6 text-center border-b ${borderColor}`}>
                    <div className="flex justify-center mb-4">
                      <AppLogo size={48} />
                    </div>
                    <h2 className={`text-xl font-bold ${textColor}`}>{t('disclaimerModal.title')}</h2>
                </div>
                
                <div className={`p-6 overflow-y-auto ${subtitleColor} text-sm space-y-3 flex-grow`}>
                    <p>{t('disclaimer.content')}</p>
                </div>
                
                <div className={`p-4 ${footerBg} border-t ${borderColor}`}>
                    <button
                        onClick={handleAccept}
                        className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)] text-[var(--text-on-primary)] font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-[var(--primary-color)]/30 transition-all duration-300 shadow-md"
                    >
                        {t('disclaimerModal.acceptButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerModal;