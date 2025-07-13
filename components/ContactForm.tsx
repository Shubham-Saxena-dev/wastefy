import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import { Send, Loader, CheckCircle, ChevronDown, AlertTriangle } from 'lucide-react';
import { config } from '../config';
import { useTheme } from '../contexts/ThemeContext';

const ContactForm: React.FC = () => {
    const { t } = useLanguage();
    const { playSound } = useSound();
    const { theme } = useTheme();
    const isBlackTheme = theme === 'black';

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const recipientEmail = config.contact.email;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleToggle = () => {
        playSound();
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipientEmail) return;
        
        playSound();
        setIsSubmitting(true);
        const { name, email, message } = formData;
        
        setTimeout(() => {
            const subject = encodeURIComponent(t('contact.emailSubject'));
            const body = encodeURIComponent(`${t('contact.name')}: ${name}\n${t('contact.email')}: ${email}\n\n${t('contact.message')}:\n${message}`);
            
            window.open(`mailto:${recipientEmail}?subject=${subject}&body=${body}`);
            
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
                setIsSubmitted(false);
                setIsOpen(false);
            }, 5000);
        }, 1000);
    };

    const labelColor = isBlackTheme ? 'text-slate-300' : 'text-slate-700';
    const subtitleColor = isBlackTheme ? 'text-slate-400' : 'text-slate-500';
    const hoverBg = isBlackTheme ? 'hover:bg-slate-800/50' : 'hover:bg-white/20';
    const inputClasses = isBlackTheme
        ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]'
        : 'bg-white/70 border-slate-300/70 placeholder:text-slate-500 focus:outline-none focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]';
    const borderClass = isBlackTheme ? 'border-slate-700' : 'border-white/20';


    return (
        <>
            <button 
                onClick={handleToggle} 
                className={`w-full flex justify-between items-center p-4 text-left ${hoverBg} transition-colors`}
                aria-expanded={isOpen}
            >
                <div>
                    <h3 className={`text-base font-semibold ${labelColor}`}>{t('contact.title')}</h3>
                    <p className={`text-sm ${subtitleColor}`}>{t('contact.subtitle')}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
                <div className="px-4 pb-4">
                    <div className={`border-t ${borderClass} -mx-4 mb-4`}></div>
                     {!recipientEmail ? (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg" role="alert">
                            <div className="flex items-center">
                                <AlertTriangle className="mr-3" />
                                <div>
                                    <p className="font-bold">{t('contact.notConfigured.title')}</p>
                                    <p>{t('contact.notConfigured.message')}</p>
                                </div>
                            </div>
                        </div>
                    ) : isSubmitted ? (
                        <div className="bg-[var(--primary-light)] border-l-4 border-[var(--primary-color)] text-[var(--primary-dark)] p-4 rounded-r-lg" role="alert">
                            <div className="flex items-center">
                                <CheckCircle className="mr-3" />
                                <div>
                                    <p className="font-bold">{t('contact.success.title')}</p>
                                    <p>{t('contact.success.message')}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                required 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder={t('contact.name')}
                                aria-label={t('contact.name')}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${inputClasses}`} 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                required 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder={t('contact.email')}
                                aria-label={t('contact.email')}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${inputClasses}`} 
                            />
                            <textarea 
                                name="message" 
                                id="message" 
                                rows={3} 
                                required 
                                value={formData.message} 
                                onChange={handleChange} 
                                placeholder={t('contact.message')}
                                aria-label={t('contact.message')}
                                className={`block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${inputClasses}`}
                            ></textarea>
                            <div>
                                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[var(--text-on-primary)] bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] disabled:bg-[var(--primary-disabled)]">
                                    {isSubmitting ? <Loader className="animate-spin" /> : <Send className="mr-2" size={16} />}
                                    {isSubmitting ? t('contact.sending') : t('contact.sendButton')}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </>
    );
};

export default ContactForm;