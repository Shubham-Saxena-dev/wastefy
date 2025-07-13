import React from 'react';
import { useSound } from '../contexts/SoundContext';
import { useTheme } from '../contexts/ThemeContext';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange, id }) => {
  const { playSound } = useSound();
  const { theme } = useTheme();
  const isBlackTheme = theme === 'black';
  
  const handleChange = () => {
    playSound();
    onChange(!checked);
  };
  
  const labelColor = isBlackTheme ? 'text-slate-300' : 'text-slate-700';

  return (
    <label htmlFor={id} className="flex items-center justify-between cursor-pointer w-full">
      <span className={`text-base font-semibold ${labelColor}`}>{label}</span>
      <div className="relative">
        <input 
          id={id} 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={handleChange}
        />
        <div className={`block w-12 h-7 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-[var(--primary-color)]' : 'bg-slate-300'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow ${checked ? 'translate-x-5' : ''}`}></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;