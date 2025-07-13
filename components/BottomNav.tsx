import React from 'react';
import { Tab } from '../App';
import { useSound } from '../contexts/SoundContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ElementType;
}

interface BottomNavProps {
  items: NavItem[];
  activeTab: Tab;
  onTabClick: (tab: Tab) => void;
}

const NavButton: React.FC<{item: NavItem, isActive: boolean, onClick: (id: Tab) => void, isBlackTheme: boolean}> = ({ item, isActive, onClick, isBlackTheme }) => {
  const Icon = item.icon;
  const inactiveTextColor = isBlackTheme ? 'text-slate-400 hover:text-[var(--primary-color)]' : 'text-slate-500 hover:text-[var(--primary-color)]';
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`flex flex-col items-center justify-center w-full h-14 transition-all duration-300 rounded-xl ${
        isActive
          ? 'bg-[var(--primary-color)] text-[var(--text-on-primary)] shadow-lg shadow-[var(--primary-color)]/30'
          : inactiveTextColor
      }`}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="font-bold text-xs tracking-tight">{item.label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ items, activeTab, onTabClick }) => {
  const { playSound } = useSound();
  const { theme } = useTheme();

  const handleTabClick = (tab: Tab) => {
    playSound();
    onTabClick(tab);
  };
  
  const isBlackTheme = theme === 'black';
  const navClasses = isBlackTheme 
    ? 'bg-black/80 backdrop-blur-lg border-t border-slate-800/60'
    : 'bg-slate-100/70 backdrop-blur-lg border-t border-slate-200/60';

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-20 ${navClasses}`}>
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2 gap-1">
        {items.map(item => (
            <NavButton key={item.id} item={item} isActive={activeTab === item.id} onClick={handleTabClick} isBlackTheme={isBlackTheme} />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;