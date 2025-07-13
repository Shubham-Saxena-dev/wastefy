import React from 'react';
import { BinType, VisualType } from './types';
import { Zap, Sofa, Recycle, Banknote, Home, MapPin, Package, Trash2, Leaf, Droplets, FlaskConical, Stethoscope, Info, ShoppingBag } from 'lucide-react';
import { BioWasteIcon, PaperWasteIcon, PackagingWasteIcon, GlassWasteIcon, GeneralWasteIcon, ElectronicsWasteIcon, BulkyWasteIcon, SearchIconVisual, DefaultWasteIcon } from './components/WasteVisuals';

export const BIN_THEMES: Record<BinType, {
  bg: string;
  bgLight: string;
  border: string;
  text: string;
  textOnLight: string;
}> = {
  [BinType.Restmull]: { bg: 'bg-gray-700', bgLight: 'bg-gray-100', border: 'border-gray-600', text: 'text-white', textOnLight: 'text-gray-700' },
  [BinType.Bio]: { bg: 'bg-amber-900', bgLight: 'bg-amber-100', border: 'border-amber-800', text: 'text-white', textOnLight: 'text-amber-900' },
  [BinType.Papier]: { bg: 'bg-blue-600', bgLight: 'bg-blue-100', border: 'border-blue-500', text: 'text-white', textOnLight: 'text-blue-700' },
  [BinType.GelberSack]: { bg: 'bg-yellow-400', bgLight: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-black', textOnLight: 'text-yellow-600' },
  [BinType.Glas]: { bg: 'bg-emerald-600', bgLight: 'bg-emerald-100', border: 'border-emerald-500', text: 'text-white', textOnLight: 'text-emerald-700' },
  [BinType.Sperrmull]: { bg: 'bg-orange-500', bgLight: 'bg-orange-100', border: 'border-orange-500', text: 'text-white', textOnLight: 'text-orange-600' },
  [BinType.Elektro]: { bg: 'bg-purple-500', bgLight: 'bg-purple-100', border: 'border-purple-500', text: 'text-white', textOnLight: 'text-purple-700' },
};

export const DEFAULT_BIN_THEME = { bg: 'bg-gray-400', bgLight: 'bg-gray-100', border: 'border-gray-400', text: 'text-white', textOnLight: 'text-gray-700' };

export const CATEGORY_THEMES: Record<string, {
    from: string;
    to: string;
    text: string;
    shadow: string;
}> = {
    "kitchen_food": { from: 'from-amber-400', to: 'to-amber-500', text: 'text-white', shadow: 'hover:shadow-amber-500/30' },
    "paper_packaging": { from: 'from-sky-400', to: 'to-sky-500', text: 'text-white', shadow: 'hover:shadow-sky-500/30' },
    "household_bathroom": { from: 'from-slate-400', to: 'to-slate-500', text: 'text-white', shadow: 'hover:shadow-slate-500/30' },
    "special_electronic": { from: 'from-purple-400', to: 'to-purple-500', text: 'text-white', shadow: 'hover:shadow-purple-500/30' },
    "garden_outdoors": { from: 'from-lime-500', to: 'to-lime-600', text: 'text-white', shadow: 'hover:shadow-lime-500/30' },
    "glass_bulky": { from: 'from-rose-400', to: 'to-rose-500', text: 'text-white', shadow: 'hover:shadow-rose-500/30' },
};

export const binTypeMapQueries: Partial<Record<BinType, string>> = {
  [BinType.Glas]: 'Glascontainer in der Nähe',
  [BinType.Sperrmull]: 'Wertstoffhof in der Nähe',
  [BinType.Elektro]: 'Wertstoffhof oder Elektroschrott Annahmestelle in der Nähe'
};

export const visualMap: Record<VisualType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  bio: BioWasteIcon,
  paper: PaperWasteIcon,
  packaging: PackagingWasteIcon,
  glass: GlassWasteIcon,
  general: GeneralWasteIcon,
  electronics: ElectronicsWasteIcon,
  bulky: BulkyWasteIcon,
  search: SearchIconVisual,
  default: DefaultWasteIcon,
};

export const FAKE_SERVICES: Record<string, { mapQuery: string; phone: string }> = {
  'BSR (Berliner Stadtreinigung)': { mapQuery: 'BSR Berliner Stadtreinigung Recyclinghof', phone: '030 7592-4900' },
  'Stadtreinigung Hamburg': { mapQuery: 'Stadtreinigung Hamburg Recyclinghof', phone: '040 2576-0' },
  'AWM München': { mapQuery: 'AWM Recyclinghof München', phone: '089 233-96200' },
  'AWB Köln': { mapQuery: 'AWB Abfallwirtschaftsbetriebe Köln', phone: '0221 9222224' },
  'FES Frankfurt': { mapQuery: 'FES Frankfurter Entsorgungs- und Service GmbH', phone: '0800 2008007-0' },
  'Remondis': { mapQuery: 'Remondis Recyclinghof', phone: '0800 1223255' },
  'ALBA Group': { mapQuery: 'ALBA Recyclinghof', phone: '030 35182-351' },
  'Veolia': { mapQuery: 'Veolia Umweltservice', phone: '0531 3803-0' },
};

export const KNOWLEDGE_ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Sofa,
  Recycle,
  Banknote,
  Home,
  MapPin,
  Package,
  Trash2,
  Leaf,
  Droplets,
  FlaskConical,
  Stethoscope,
  Info,
  ShoppingBag
};