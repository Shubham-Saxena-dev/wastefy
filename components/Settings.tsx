import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import ContactForm from './ContactForm';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import ToggleSwitch from './ToggleSwitch';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
    const { t } = useLanguage();
    const { soundEnabled, setSoundEnabled } = useSound();
    const { theme } = useTheme();
    const isBlackTheme = theme === 'black';

    const textColor = isBlackTheme ? 'text-slate-200' : 'text-slate-800';
    const cardBg = isBlackTheme ? 'bg-slate-900/80' : 'bg-white/60';
    const borderClass = isBlackTheme ? 'border-slate-700/80' : 'border-white/20';
    const headerColor = isBlackTheme ? 'text-slate-400' : 'text-slate-500';

    return (
        <div className="p-4 space-y-4">
            <div className="text-center mb-4">
                <h2 className={`text-3xl font-bold ${textColor} drop-shadow-sm`}>{t('settings.title')}</h2>
            </div>

            <div className={`${cardBg} backdrop-blur-md border ${borderClass} rounded-2xl shadow-xl`}>
                <div className="p-4 space-y-2 relative z-30">
                    <h3 className={`text-sm font-bold ${headerColor} tracking-wider uppercase`}>
                        {t('settings.language.title')}
                    </h3>
                    <LanguageSelector />
                </div>

                <div className={`border-t ${borderClass}`}></div>

                <div className="p-4 space-y-2 relative z-20">
                    <h3 className={`text-sm font-bold ${headerColor} tracking-wider uppercase`}>
                        {t('settings.theme')}
                    </h3>
                    <ThemeSelector />
                </div>
                
                <div className={`border-t ${borderClass}`}></div>
                
                <div className="p-4">
                    <ToggleSwitch 
                        id="sound-toggle"
                        label={t('settings.sound.title')}
                        checked={soundEnabled}
                        onChange={setSoundEnabled}
                    />
                </div>
                
                <div className={`border-t ${borderClass}`}></div>
                
                <ContactForm />
            </div>
        </div>
    );
};

export default Settings;