
export enum BinType {
  Restmull = 'Restmüll', // General Waste
  Bio = 'Biotonne', // Organic Waste
  Papier = 'Papiertonne', // Paper
  GelberSack = 'Gelber Sack / Tonne', // Packaging
  Glas = 'Glascontainer', // Glass
  Sperrmull = 'Sperrmüll', // Bulky Waste
  Elektro = 'Elektroschrott', // E-waste
}

export type VisualType = 'bio' | 'paper' | 'packaging' | 'glass' | 'general' | 'electronics' | 'bulky' | 'search' | 'default';

export interface WasteItem {
  name: string;
  bin: BinType;
  recyclable: boolean;
  notes?: string;
  keywords: string[];
  visual?: VisualType;
}

export interface KnowledgeArticle {
  title: string;
  iconKey: string;
  content: string[];
}

export interface LocationArticle {
  title: string;
  iconKey: string;
  content: string[];
  mapQuery: string;
}

export interface KnowledgeSubCategory {
  title: string;
  type: 'accordion' | 'location';
  articles: (KnowledgeArticle | LocationArticle)[];
}

export type CategoryImageType = 'bins' | 'sustainability' | 'locations';

export interface KnowledgeCategory {
  title: string;
  image: CategoryImageType;
  subCategories: KnowledgeSubCategory[];
}

export type KnowledgeBaseContent = KnowledgeCategory[];
