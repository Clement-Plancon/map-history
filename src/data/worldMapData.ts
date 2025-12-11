// World map data with historical nations across different eras
// Coordinates are in SVG viewBox space (0-1000 x, 0-500 y)

export interface Nation {
  id: string;
  name: string;
  color: string;
  path: string;
  capital?: { x: number; y: number; name: string };
  labelPos?: { x: number; y: number };
}

export interface HistoricalEra {
  year: number;
  name: string;
  description: string;
  nations: Nation[];
}

// Extended color palette for all eras
const COLORS = {
  // Medieval/Renaissance Powers
  byzantium: '#7b2d8e',
  ottoman: '#2e8b57',
  hre: '#cfcf30',
  france: '#2e5cb8',
  england: '#c94040',
  castile: '#c9a227',
  aragon: '#e07020',
  portugal: '#2d8b57',
  burgundy: '#8b4513',
  venice: '#00ced1',
  milan: '#d4d4d4',
  papal: '#fffacd',
  naples: '#ffa07a',
  poland: '#d4a5a5',
  lithuania: '#6b8e23',
  hungary: '#5d8c51',
  bohemia: '#7eb0d5',
  denmark: '#c8102e',
  sweden: '#0066cc',
  norway: '#ef4444',
  scotland: '#1e90ff',
  muscovy: '#2f4f4f',
  novgorod: '#8fbc8f',
  golden_horde: '#daa520',
  timurids: '#4682b4',
  mamluks: '#deb887',
  morocco: '#228b22',
  mali: '#ffd700',
  ethiopia: '#006400',
  ming: '#ffff00',
  korea: '#4169e1',
  japan: '#ffffff',
  vijayanagar: '#ff6347',
  delhi: '#9370db',
  ayutthaya: '#ffc0cb',
  majapahit: '#ff4500',
  aztec: '#8b0000',
  inca: '#cd853f',

  // Early Modern
  spain: '#c9a227',
  netherlands: '#f5a623',
  prussia: '#1a1a1a',
  austria: '#ffffff',
  russia: '#2f4f4f',
  commonwealth: '#d4a5a5',

  // Modern
  germany: '#4a4a4a',
  germanReich: '#3d3d3d',
  uk: '#c94040',
  usa: '#3b6ea8',
  ussr: '#8b0000',
  italy: '#4ca64c',
  japanModern: '#e8e8e8',
  china: '#c9a227',
  qing: '#ffff00',

  // Other
  persia: '#239f40',
  safavid: '#239f40',
  mughal: '#2e8b57',
  colonial: '#8b7355',
  native: '#cd853f',
  neutral: '#a0a0a0',
};

// ==================== 1444 - LATE MEDIEVAL ====================
const nations1444: Nation[] = [
  // Western Europe
  {
    id: 'france',
    name: 'Kingdom of France',
    color: COLORS.france,
    path: 'M400,175 L445,170 L460,195 L455,230 L425,245 L395,235 L380,205 L385,180 Z',
    capital: { x: 420, y: 200, name: 'Paris' },
    labelPos: { x: 420, y: 205 }
  },
  {
    id: 'england',
    name: 'Kingdom of England',
    color: COLORS.england,
    path: 'M385,130 L415,125 L425,150 L418,175 L395,180 L378,165 L375,140 Z',
    capital: { x: 400, y: 155, name: 'London' },
    labelPos: { x: 398, y: 155 }
  },
  {
    id: 'castile',
    name: 'Kingdom of Castile',
    color: COLORS.castile,
    path: 'M365,220 L410,215 L420,250 L400,275 L360,270 L345,240 Z',
    capital: { x: 380, y: 245, name: 'Toledo' },
    labelPos: { x: 378, y: 245 }
  },
  {
    id: 'aragon',
    name: 'Crown of Aragon',
    color: COLORS.aragon,
    path: 'M415,230 L445,225 L455,255 L445,275 L420,278 L405,255 Z',
    capital: { x: 430, y: 250, name: 'Barcelona' },
    labelPos: { x: 428, y: 252 }
  },
  {
    id: 'portugal',
    name: 'Kingdom of Portugal',
    color: COLORS.portugal,
    path: 'M340,230 L358,228 L365,265 L355,285 L338,275 L332,245 Z',
    capital: { x: 348, y: 255, name: 'Lisboa' },
    labelPos: { x: 348, y: 255 }
  },
  {
    id: 'burgundy',
    name: 'Duchy of Burgundy',
    color: COLORS.burgundy,
    path: 'M435,165 L465,160 L475,185 L465,205 L445,210 L430,190 Z',
    capital: { x: 450, y: 185, name: 'Dijon' },
    labelPos: { x: 450, y: 185 }
  },
  // Central Europe
  {
    id: 'hre',
    name: 'Holy Roman Empire',
    color: COLORS.hre,
    path: 'M465,150 L530,145 L545,175 L535,210 L495,215 L470,200 L460,170 Z',
    capital: { x: 500, y: 180, name: 'Wien' },
    labelPos: { x: 500, y: 180 }
  },
  {
    id: 'bohemia',
    name: 'Kingdom of Bohemia',
    color: COLORS.bohemia,
    path: 'M510,165 L540,162 L548,185 L535,200 L510,195 Z',
    capital: { x: 525, y: 180, name: 'Prague' },
    labelPos: { x: 525, y: 180 }
  },
  {
    id: 'hungary',
    name: 'Kingdom of Hungary',
    color: COLORS.hungary,
    path: 'M530,195 L580,190 L595,225 L575,250 L535,245 L520,220 Z',
    capital: { x: 555, y: 220, name: 'Buda' },
    labelPos: { x: 555, y: 218 }
  },
  {
    id: 'poland',
    name: 'Kingdom of Poland',
    color: COLORS.poland,
    path: 'M530,150 L575,145 L590,175 L580,195 L545,200 L525,180 Z',
    capital: { x: 555, y: 172, name: 'Krakow' },
    labelPos: { x: 555, y: 172 }
  },
  {
    id: 'lithuania',
    name: 'Grand Duchy of Lithuania',
    color: COLORS.lithuania,
    path: 'M565,120 L630,110 L650,160 L630,195 L585,190 L560,155 Z',
    capital: { x: 600, y: 155, name: 'Vilnius' },
    labelPos: { x: 600, y: 152 }
  },
  // Scandinavia
  {
    id: 'denmark',
    name: 'Kingdom of Denmark',
    color: COLORS.denmark,
    path: 'M470,120 L510,115 L520,145 L505,160 L475,155 L465,135 Z',
    capital: { x: 492, y: 140, name: 'Copenhagen' },
    labelPos: { x: 490, y: 138 }
  },
  {
    id: 'sweden',
    name: 'Kingdom of Sweden',
    color: COLORS.sweden,
    path: 'M500,70 L540,65 L555,110 L540,140 L510,135 L495,100 Z',
    capital: { x: 525, y: 105, name: 'Stockholm' },
    labelPos: { x: 522, y: 102 }
  },
  {
    id: 'norway',
    name: 'Kingdom of Norway',
    color: COLORS.norway,
    path: 'M455,50 L500,45 L515,85 L500,115 L470,110 L450,75 Z',
    capital: { x: 480, y: 85, name: 'Oslo' },
    labelPos: { x: 478, y: 82 }
  },
  // Italy
  {
    id: 'venice',
    name: 'Republic of Venice',
    color: COLORS.venice,
    path: 'M485,200 L510,197 L520,220 L510,235 L488,230 Z',
    capital: { x: 500, y: 215, name: 'Venice' },
    labelPos: { x: 500, y: 215 }
  },
  {
    id: 'milan',
    name: 'Duchy of Milan',
    color: COLORS.milan,
    path: 'M460,200 L485,197 L490,220 L475,235 L455,228 Z',
    capital: { x: 472, y: 215, name: 'Milan' },
    labelPos: { x: 472, y: 215 }
  },
  {
    id: 'papal',
    name: 'Papal States',
    color: COLORS.papal,
    path: 'M480,235 L505,232 L515,260 L500,280 L478,275 L470,250 Z',
    capital: { x: 492, y: 255, name: 'Rome' },
    labelPos: { x: 492, y: 255 }
  },
  {
    id: 'naples',
    name: 'Kingdom of Naples',
    color: COLORS.naples,
    path: 'M495,275 L520,270 L535,305 L520,330 L495,325 L485,295 Z',
    capital: { x: 510, y: 300, name: 'Naples' },
    labelPos: { x: 508, y: 298 }
  },
  // Eastern Europe & Balkans
  {
    id: 'byzantium',
    name: 'Byzantine Empire',
    color: COLORS.byzantium,
    path: 'M560,260 L590,255 L605,280 L595,300 L565,295 Z',
    capital: { x: 580, y: 275, name: 'Constantinople' },
    labelPos: { x: 578, y: 275 }
  },
  {
    id: 'ottoman',
    name: 'Ottoman Empire',
    color: COLORS.ottoman,
    path: 'M575,270 L650,260 L680,310 L660,350 L600,355 L565,310 Z',
    capital: { x: 620, y: 305, name: 'Edirne' },
    labelPos: { x: 618, y: 305 }
  },
  // Russia
  {
    id: 'muscovy',
    name: 'Grand Duchy of Muscovy',
    color: COLORS.muscovy,
    path: 'M620,90 L720,75 L760,140 L740,190 L660,195 L620,150 Z',
    capital: { x: 680, y: 140, name: 'Moscow' },
    labelPos: { x: 680, y: 135 }
  },
  {
    id: 'novgorod',
    name: 'Republic of Novgorod',
    color: COLORS.novgorod,
    path: 'M580,60 L650,50 L670,95 L650,120 L595,125 L570,90 Z',
    capital: { x: 620, y: 90, name: 'Novgorod' },
    labelPos: { x: 618, y: 88 }
  },
  {
    id: 'golden_horde',
    name: 'Golden Horde',
    color: COLORS.golden_horde,
    path: 'M680,100 L820,80 L860,160 L820,220 L720,210 L680,160 Z',
    capital: { x: 760, y: 150, name: 'Sarai' },
    labelPos: { x: 760, y: 145 }
  },
  // Middle East & Asia
  {
    id: 'timurids',
    name: 'Timurid Empire',
    color: COLORS.timurids,
    path: 'M700,240 L800,220 L840,290 L810,350 L720,355 L680,300 Z',
    capital: { x: 760, y: 290, name: 'Samarkand' },
    labelPos: { x: 755, y: 285 }
  },
  {
    id: 'mamluks',
    name: 'Mamluk Sultanate',
    color: COLORS.mamluks,
    path: 'M560,320 L620,315 L640,370 L600,410 L550,405 L535,360 Z',
    capital: { x: 585, y: 360, name: 'Cairo' },
    labelPos: { x: 585, y: 358 }
  },
  // Far East
  {
    id: 'ming',
    name: 'Ming Dynasty',
    color: COLORS.ming,
    path: 'M780,200 L880,180 L920,270 L890,350 L810,360 L760,300 L750,240 Z',
    capital: { x: 840, y: 275, name: 'Beijing' },
    labelPos: { x: 835, y: 270 }
  },
  {
    id: 'japan',
    name: 'Ashikaga Shogunate',
    color: COLORS.japan,
    path: 'M900,190 L930,185 L945,230 L935,265 L905,270 L890,235 Z',
    capital: { x: 920, y: 225, name: 'Kyoto' },
    labelPos: { x: 918, y: 225 }
  },
  {
    id: 'korea',
    name: 'Joseon Korea',
    color: COLORS.korea,
    path: 'M885,200 L905,198 L912,235 L900,260 L880,255 L875,225 Z',
    capital: { x: 892, y: 228, name: 'Hanyang' },
    labelPos: { x: 890, y: 228 }
  },
  // India
  {
    id: 'delhi',
    name: 'Delhi Sultanate',
    color: COLORS.delhi,
    path: 'M710,310 L770,300 L790,360 L760,400 L710,395 L690,350 Z',
    capital: { x: 745, y: 350, name: 'Delhi' },
    labelPos: { x: 742, y: 348 }
  },
  {
    id: 'vijayanagar',
    name: 'Vijayanagar Empire',
    color: COLORS.vijayanagar,
    path: 'M720,390 L770,385 L790,430 L765,465 L720,460 L700,420 Z',
    capital: { x: 750, y: 425, name: 'Vijayanagar' },
    labelPos: { x: 745, y: 422 }
  },
  // Africa
  {
    id: 'morocco',
    name: 'Sultanate of Morocco',
    color: COLORS.morocco,
    path: 'M350,290 L400,285 L415,330 L390,365 L345,360 L330,320 Z',
    capital: { x: 372, y: 325, name: 'Fez' },
    labelPos: { x: 370, y: 322 }
  },
  {
    id: 'mali',
    name: 'Mali Empire',
    color: COLORS.mali,
    path: 'M350,370 L430,365 L450,420 L410,465 L345,460 L325,410 Z',
    capital: { x: 390, y: 415, name: 'Timbuktu' },
    labelPos: { x: 388, y: 412 }
  },
  {
    id: 'ethiopia',
    name: 'Ethiopian Empire',
    color: COLORS.ethiopia,
    path: 'M590,400 L640,395 L660,445 L635,480 L585,475 L565,435 Z',
    capital: { x: 615, y: 438, name: 'Gondar' },
    labelPos: { x: 612, y: 435 }
  },
  // Americas
  {
    id: 'aztec',
    name: 'Aztec Empire',
    color: COLORS.aztec,
    path: 'M100,300 L150,295 L165,345 L140,380 L95,375 L80,335 Z',
    capital: { x: 125, y: 340, name: 'Tenochtitlan' },
    labelPos: { x: 122, y: 338 }
  },
  {
    id: 'inca',
    name: 'Inca Empire',
    color: COLORS.inca,
    path: 'M160,420 L200,415 L215,490 L190,540 L150,535 L140,470 Z',
    capital: { x: 178, y: 475, name: 'Cusco' },
    labelPos: { x: 175, y: 472 }
  },
];

// ==================== 1492 - AGE OF DISCOVERY ====================
const nations1492: Nation[] = [
  {
    id: 'spain',
    name: 'Kingdom of Spain',
    color: COLORS.spain,
    path: 'M355,215 L425,208 L440,260 L415,295 L355,290 L335,250 Z',
    capital: { x: 385, y: 252, name: 'Madrid' },
    labelPos: { x: 385, y: 250 }
  },
  {
    id: 'portugal',
    name: 'Kingdom of Portugal',
    color: COLORS.portugal,
    path: 'M330,225 L355,222 L362,275 L348,305 L325,295 L318,255 Z',
    capital: { x: 342, y: 262, name: 'Lisboa' },
    labelPos: { x: 340, y: 260 }
  },
  {
    id: 'france',
    name: 'Kingdom of France',
    color: COLORS.france,
    path: 'M400,165 L455,160 L470,195 L462,235 L428,250 L395,240 L380,200 Z',
    capital: { x: 425, y: 200, name: 'Paris' },
    labelPos: { x: 425, y: 200 }
  },
  {
    id: 'england',
    name: 'Kingdom of England',
    color: COLORS.england,
    path: 'M385,125 L420,120 L432,152 L422,180 L395,185 L375,165 L372,138 Z',
    capital: { x: 402, y: 155, name: 'London' },
    labelPos: { x: 400, y: 152 }
  },
  {
    id: 'hre',
    name: 'Holy Roman Empire',
    color: COLORS.hre,
    path: 'M455,145 L535,138 L552,180 L540,220 L490,225 L465,205 L455,170 Z',
    capital: { x: 502, y: 182, name: 'Vienna' },
    labelPos: { x: 500, y: 180 }
  },
  {
    id: 'poland_lithuania',
    name: 'Poland-Lithuania',
    color: COLORS.commonwealth,
    path: 'M530,130 L620,118 L645,175 L625,210 L555,215 L530,175 Z',
    capital: { x: 580, y: 168, name: 'Krakow' },
    labelPos: { x: 578, y: 165 }
  },
  {
    id: 'muscovy',
    name: 'Grand Duchy of Muscovy',
    color: COLORS.muscovy,
    path: 'M620,70 L760,55 L800,140 L770,200 L670,205 L620,150 Z',
    capital: { x: 700, y: 135, name: 'Moscow' },
    labelPos: { x: 700, y: 130 }
  },
  {
    id: 'ottoman',
    name: 'Ottoman Empire',
    color: COLORS.ottoman,
    path: 'M540,230 L660,215 L700,290 L680,360 L580,370 L530,310 Z',
    capital: { x: 610, y: 290, name: 'Constantinople' },
    labelPos: { x: 608, y: 285 }
  },
  {
    id: 'mamluks',
    name: 'Mamluk Sultanate',
    color: COLORS.mamluks,
    path: 'M555,340 L620,335 L645,395 L610,440 L555,435 L530,385 Z',
    capital: { x: 585, y: 385, name: 'Cairo' },
    labelPos: { x: 585, y: 382 }
  },
  {
    id: 'safavid',
    name: 'Safavid Persia',
    color: COLORS.safavid,
    path: 'M680,280 L760,265 L800,330 L775,385 L700,390 L665,340 Z',
    capital: { x: 732, y: 330, name: 'Tabriz' },
    labelPos: { x: 730, y: 328 }
  },
  {
    id: 'ming',
    name: 'Ming Dynasty',
    color: COLORS.ming,
    path: 'M780,190 L890,170 L930,270 L895,360 L810,370 L760,300 Z',
    capital: { x: 845, y: 275, name: 'Beijing' },
    labelPos: { x: 840, y: 270 }
  },
  {
    id: 'japan',
    name: 'Sengoku Japan',
    color: COLORS.japan,
    path: 'M905,185 L935,180 L950,230 L938,270 L908,275 L892,235 Z',
    capital: { x: 922, y: 228, name: 'Kyoto' },
    labelPos: { x: 920, y: 225 }
  },
  {
    id: 'aztec',
    name: 'Aztec Empire',
    color: COLORS.aztec,
    path: 'M90,295 L155,288 L175,350 L145,395 L85,388 L65,340 Z',
    capital: { x: 122, y: 342, name: 'Tenochtitlan' },
    labelPos: { x: 120, y: 340 }
  },
  {
    id: 'inca',
    name: 'Inca Empire',
    color: COLORS.inca,
    path: 'M150,410 L210,402 L235,500 L200,560 L140,552 L125,465 Z',
    capital: { x: 180, y: 482, name: 'Cusco' },
    labelPos: { x: 178, y: 480 }
  },
  {
    id: 'mali',
    name: 'Songhai Empire',
    color: COLORS.mali,
    path: 'M370,380 L460,372 L485,440 L445,495 L365,488 L340,425 Z',
    capital: { x: 415, y: 435, name: 'Gao' },
    labelPos: { x: 412, y: 432 }
  },
];

// ==================== 1648 - PEACE OF WESTPHALIA ====================
const nations1648: Nation[] = [
  {
    id: 'france',
    name: 'Kingdom of France',
    color: COLORS.france,
    path: 'M390,165 L460,158 L478,200 L468,245 L430,260 L388,248 L372,205 Z',
    capital: { x: 425, y: 205, name: 'Paris' },
    labelPos: { x: 425, y: 202 }
  },
  {
    id: 'spain',
    name: 'Spanish Empire',
    color: COLORS.spain,
    path: 'M350,220 L420,212 L438,268 L412,305 L350,298 L328,258 Z',
    capital: { x: 382, y: 260, name: 'Madrid' },
    labelPos: { x: 380, y: 258 }
  },
  {
    id: 'england',
    name: 'Commonwealth of England',
    color: COLORS.england,
    path: 'M382,122 L422,115 L436,152 L425,185 L392,190 L372,168 L368,138 Z',
    capital: { x: 402, y: 155, name: 'London' },
    labelPos: { x: 400, y: 152 }
  },
  {
    id: 'dutch',
    name: 'Dutch Republic',
    color: COLORS.netherlands,
    path: 'M432,148 L458,145 L465,172 L455,188 L435,185 L428,165 Z',
    capital: { x: 448, y: 168, name: 'Amsterdam' },
    labelPos: { x: 445, y: 165 }
  },
  {
    id: 'hre',
    name: 'Holy Roman Empire',
    color: COLORS.hre,
    path: 'M458,148 L540,140 L558,185 L545,228 L498,235 L468,215 L455,175 Z',
    capital: { x: 505, y: 188, name: 'Vienna' },
    labelPos: { x: 505, y: 185 }
  },
  {
    id: 'prussia',
    name: 'Brandenburg-Prussia',
    color: COLORS.prussia,
    path: 'M505,145 L545,142 L555,168 L545,188 L515,185 L505,165 Z',
    capital: { x: 528, y: 165, name: 'Berlin' },
    labelPos: { x: 528, y: 162 }
  },
  {
    id: 'sweden',
    name: 'Swedish Empire',
    color: COLORS.sweden,
    path: 'M490,60 L580,50 L605,120 L580,165 L520,160 L495,110 Z',
    capital: { x: 545, y: 108, name: 'Stockholm' },
    labelPos: { x: 542, y: 105 }
  },
  {
    id: 'commonwealth',
    name: 'Polish-Lithuanian Commonwealth',
    color: COLORS.commonwealth,
    path: 'M545,145 L625,135 L652,195 L630,235 L565,240 L540,195 Z',
    capital: { x: 595, y: 188, name: 'Warsaw' },
    labelPos: { x: 592, y: 185 }
  },
  {
    id: 'russia',
    name: 'Tsardom of Russia',
    color: COLORS.russia,
    path: 'M620,60 L820,40 L870,150 L830,230 L700,240 L640,180 Z',
    capital: { x: 720, y: 145, name: 'Moscow' },
    labelPos: { x: 720, y: 140 }
  },
  {
    id: 'ottoman',
    name: 'Ottoman Empire',
    color: COLORS.ottoman,
    path: 'M540,235 L680,218 L720,300 L695,375 L585,385 L530,320 Z',
    capital: { x: 620, y: 300, name: 'Constantinople' },
    labelPos: { x: 618, y: 295 }
  },
  {
    id: 'safavid',
    name: 'Safavid Empire',
    color: COLORS.safavid,
    path: 'M700,290 L790,275 L830,355 L800,420 L720,425 L680,360 Z',
    capital: { x: 755, y: 355, name: 'Isfahan' },
    labelPos: { x: 752, y: 352 }
  },
  {
    id: 'mughal',
    name: 'Mughal Empire',
    color: COLORS.mughal,
    path: 'M720,340 L800,328 L835,420 L800,490 L725,495 L695,420 Z',
    capital: { x: 765, y: 415, name: 'Delhi' },
    labelPos: { x: 762, y: 410 }
  },
  {
    id: 'qing',
    name: 'Qing Dynasty',
    color: COLORS.qing,
    path: 'M790,180 L910,160 L955,275 L915,375 L820,385 L770,300 Z',
    capital: { x: 865, y: 280, name: 'Beijing' },
    labelPos: { x: 862, y: 275 }
  },
  {
    id: 'japan',
    name: 'Tokugawa Japan',
    color: COLORS.japan,
    path: 'M912,188 L945,182 L962,238 L948,280 L918,285 L900,242 Z',
    capital: { x: 932, y: 235, name: 'Edo' },
    labelPos: { x: 930, y: 232 }
  },
  // Colonial Americas
  {
    id: 'new_spain',
    name: 'Viceroyalty of New Spain',
    color: COLORS.spain,
    path: 'M55,250 L170,240 L195,330 L155,400 L60,395 L30,320 Z',
    capital: { x: 115, y: 325, name: 'Mexico City' },
    labelPos: { x: 112, y: 320 }
  },
  {
    id: 'new_france',
    name: 'New France',
    color: COLORS.france,
    path: 'M100,120 L200,110 L225,180 L195,230 L95,238 L65,175 Z',
    capital: { x: 155, y: 175, name: 'Quebec' },
    labelPos: { x: 152, y: 172 }
  },
  {
    id: 'thirteen_colonies',
    name: 'British Colonies',
    color: COLORS.england,
    path: 'M175,170 L210,168 L225,220 L210,258 L178,255 L165,212 Z',
    capital: { x: 198, y: 215, name: 'Jamestown' },
    labelPos: { x: 195, y: 212 }
  },
];

// ==================== 1789 - FRENCH REVOLUTION ====================
const nations1789: Nation[] = [
  {
    id: 'france',
    name: 'Kingdom of France',
    color: COLORS.france,
    path: 'M395,165 L465,158 L485,205 L472,250 L432,265 L392,252 L378,208 Z',
    capital: { x: 432, y: 208, name: 'Paris' },
    labelPos: { x: 430, y: 205 }
  },
  {
    id: 'spain',
    name: 'Kingdom of Spain',
    color: COLORS.spain,
    path: 'M355,225 L430,218 L448,275 L422,315 L355,308 L332,268 Z',
    capital: { x: 390, y: 268, name: 'Madrid' },
    labelPos: { x: 388, y: 265 }
  },
  {
    id: 'uk',
    name: 'Kingdom of Great Britain',
    color: COLORS.uk,
    path: 'M378,118 L425,110 L442,155 L430,192 L388,198 L365,172 L362,138 Z',
    capital: { x: 405, y: 158, name: 'London' },
    labelPos: { x: 402, y: 155 }
  },
  {
    id: 'netherlands',
    name: 'Dutch Republic',
    color: COLORS.netherlands,
    path: 'M438,148 L468,145 L478,178 L465,198 L442,195 L432,170 Z',
    capital: { x: 455, y: 172, name: 'Amsterdam' },
    labelPos: { x: 452, y: 170 }
  },
  {
    id: 'prussia',
    name: 'Kingdom of Prussia',
    color: COLORS.prussia,
    path: 'M490,138 L565,130 L585,175 L570,210 L515,215 L490,178 Z',
    capital: { x: 535, y: 175, name: 'Berlin' },
    labelPos: { x: 532, y: 172 }
  },
  {
    id: 'austria',
    name: 'Habsburg Monarchy',
    color: COLORS.austria,
    path: 'M495,185 L570,178 L592,235 L570,275 L510,280 L488,235 Z',
    capital: { x: 538, y: 228, name: 'Vienna' },
    labelPos: { x: 535, y: 225 }
  },
  {
    id: 'russia',
    name: 'Russian Empire',
    color: COLORS.russia,
    path: 'M580,50 L880,30 L935,170 L890,280 L720,290 L620,220 L560,130 Z',
    capital: { x: 740, y: 165, name: 'St. Petersburg' },
    labelPos: { x: 740, y: 160 }
  },
  {
    id: 'commonwealth',
    name: 'Polish-Lithuanian Commonwealth',
    color: COLORS.commonwealth,
    path: 'M555,148 L620,142 L642,195 L622,235 L568,240 L548,198 Z',
    capital: { x: 595, y: 192, name: 'Warsaw' },
    labelPos: { x: 592, y: 188 }
  },
  {
    id: 'ottoman',
    name: 'Ottoman Empire',
    color: COLORS.ottoman,
    path: 'M545,255 L680,238 L725,325 L695,400 L590,410 L535,340 Z',
    capital: { x: 625, y: 325, name: 'Constantinople' },
    labelPos: { x: 622, y: 320 }
  },
  {
    id: 'persia',
    name: 'Qajar Persia',
    color: COLORS.persia,
    path: 'M700,310 L785,295 L825,375 L795,440 L715,445 L680,380 Z',
    capital: { x: 752, y: 372, name: 'Tehran' },
    labelPos: { x: 750, y: 368 }
  },
  {
    id: 'qing',
    name: 'Qing Dynasty',
    color: COLORS.qing,
    path: 'M795,175 L925,155 L975,290 L930,400 L825,410 L775,320 Z',
    capital: { x: 878, y: 295, name: 'Beijing' },
    labelPos: { x: 875, y: 290 }
  },
  {
    id: 'japan',
    name: 'Tokugawa Japan',
    color: COLORS.japan,
    path: 'M922,188 L955,182 L975,245 L958,292 L928,298 L908,252 Z',
    capital: { x: 942, y: 242, name: 'Edo' },
    labelPos: { x: 940, y: 238 }
  },
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M80,180 L200,172 L225,245 L195,305 L85,310 L55,255 Z',
    capital: { x: 145, y: 245, name: 'Philadelphia' },
    labelPos: { x: 142, y: 242 }
  },
  {
    id: 'new_spain',
    name: 'Viceroyalty of New Spain',
    color: COLORS.spain,
    path: 'M50,280 L145,272 L172,365 L135,430 L48,425 L22,355 Z',
    capital: { x: 98, y: 355, name: 'Mexico City' },
    labelPos: { x: 95, y: 350 }
  },
  {
    id: 'brazil',
    name: 'Colonial Brazil',
    color: COLORS.portugal,
    path: 'M175,380 L285,365 L320,470 L275,545 L180,540 L148,455 Z',
    capital: { x: 238, y: 462, name: 'Rio de Janeiro' },
    labelPos: { x: 235, y: 458 }
  },
];

// ==================== 1815 - CONGRESS OF VIENNA ====================
const nations1815: Nation[] = [
  {
    id: 'france',
    name: 'Kingdom of France',
    color: COLORS.france,
    path: 'M395,168 L460,162 L478,205 L468,248 L430,262 L395,250 L382,210 Z',
    capital: { x: 428, y: 208, name: 'Paris' },
    labelPos: { x: 425, y: 205 }
  },
  {
    id: 'spain',
    name: 'Kingdom of Spain',
    color: COLORS.spain,
    path: 'M352,228 L425,220 L445,278 L418,318 L352,312 L328,272 Z',
    capital: { x: 388, y: 270, name: 'Madrid' },
    labelPos: { x: 385, y: 268 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    color: COLORS.uk,
    path: 'M375,115 L428,108 L448,158 L432,198 L385,205 L360,175 L358,138 Z',
    capital: { x: 405, y: 160, name: 'London' },
    labelPos: { x: 402, y: 158 }
  },
  {
    id: 'netherlands',
    name: 'Kingdom of the Netherlands',
    color: COLORS.netherlands,
    path: 'M432,145 L468,142 L480,178 L465,200 L438,198 L425,170 Z',
    capital: { x: 452, y: 172, name: 'Amsterdam' },
    labelPos: { x: 450, y: 170 }
  },
  {
    id: 'prussia',
    name: 'Kingdom of Prussia',
    color: COLORS.prussia,
    path: 'M485,135 L580,125 L605,180 L585,225 L520,232 L488,185 Z',
    capital: { x: 545, y: 182, name: 'Berlin' },
    labelPos: { x: 542, y: 178 }
  },
  {
    id: 'austria',
    name: 'Austrian Empire',
    color: COLORS.austria,
    path: 'M498,195 L585,185 L615,255 L588,305 L515,312 L488,255 Z',
    capital: { x: 552, y: 252, name: 'Vienna' },
    labelPos: { x: 548, y: 248 }
  },
  {
    id: 'russia',
    name: 'Russian Empire',
    color: COLORS.russia,
    path: 'M590,45 L900,25 L960,185 L905,320 L725,335 L615,245 L565,140 Z',
    capital: { x: 755, y: 185, name: 'St. Petersburg' },
    labelPos: { x: 752, y: 180 }
  },
  {
    id: 'ottoman',
    name: 'Ottoman Empire',
    color: COLORS.ottoman,
    path: 'M555,280 L685,262 L732,355 L698,430 L598,440 L542,368 Z',
    capital: { x: 635, y: 358, name: 'Constantinople' },
    labelPos: { x: 632, y: 352 }
  },
  {
    id: 'persia',
    name: 'Qajar Persia',
    color: COLORS.persia,
    path: 'M710,340 L795,325 L838,410 L805,478 L725,485 L688,418 Z',
    capital: { x: 762, y: 408, name: 'Tehran' },
    labelPos: { x: 760, y: 405 }
  },
  {
    id: 'qing',
    name: 'Qing Dynasty',
    color: COLORS.qing,
    path: 'M805,185 L935,165 L990,310 L942,430 L835,442 L782,345 Z',
    capital: { x: 888, y: 315, name: 'Beijing' },
    labelPos: { x: 885, y: 310 }
  },
  {
    id: 'japan',
    name: 'Tokugawa Japan',
    color: COLORS.japan,
    path: 'M932,198 L968,192 L990,260 L972,312 L940,318 L918,268 Z',
    capital: { x: 955, y: 258, name: 'Edo' },
    labelPos: { x: 952, y: 255 }
  },
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M65,175 L215,165 L250,255 L215,325 L75,332 L40,265 Z',
    capital: { x: 155, y: 255, name: 'Washington' },
    labelPos: { x: 150, y: 250 }
  },
  {
    id: 'mexico',
    name: 'First Mexican Empire',
    color: COLORS.spain,
    path: 'M45,300 L145,292 L178,390 L138,458 L42,452 L15,378 Z',
    capital: { x: 98, y: 382, name: 'Mexico City' },
    labelPos: { x: 95, y: 378 }
  },
  {
    id: 'brazil',
    name: 'Empire of Brazil',
    color: COLORS.portugal,
    path: 'M180,395 L305,378 L345,498 L295,575 L185,568 L152,478 Z',
    capital: { x: 255, y: 488, name: 'Rio de Janeiro' },
    labelPos: { x: 252, y: 482 }
  },
];

// ==================== 1914 - WORLD WAR I ====================
const nations1914: Nation[] = [
  {
    id: 'france',
    name: 'French Republic',
    color: COLORS.france,
    path: 'M400,168 L468,160 L488,208 L475,255 L435,270 L398,258 L385,212 Z',
    capital: { x: 438, y: 215, name: 'Paris' },
    labelPos: { x: 435, y: 212 }
  },
  {
    id: 'germany',
    name: 'German Empire',
    color: COLORS.germany,
    path: 'M470,145 L560,135 L585,195 L568,248 L505,255 L475,210 Z',
    capital: { x: 528, y: 198, name: 'Berlin' },
    labelPos: { x: 525, y: 195 }
  },
  {
    id: 'austria_hungary',
    name: 'Austria-Hungary',
    color: COLORS.austria,
    path: 'M505,218 L588,208 L620,275 L595,325 L525,332 L498,278 Z',
    capital: { x: 558, y: 272, name: 'Vienna' },
    labelPos: { x: 555, y: 268 }
  },
  {
    id: 'uk',
    name: 'British Empire',
    color: COLORS.uk,
    path: 'M372,112 L432,105 L455,158 L438,202 L385,210 L358,178 L355,138 Z',
    capital: { x: 408, y: 162, name: 'London' },
    labelPos: { x: 405, y: 158 }
  },
  {
    id: 'russia',
    name: 'Russian Empire',
    color: COLORS.russia,
    path: 'M580,42 L920,22 L985,195 L930,340 L735,355 L620,265 L565,145 Z',
    capital: { x: 768, y: 198, name: 'St. Petersburg' },
    labelPos: { x: 765, y: 192 }
  },
  {
    id: 'ottoman',
    name: 'Ottoman Empire',
    color: COLORS.ottoman,
    path: 'M570,295 L695,278 L745,378 L708,455 L612,465 L555,388 Z',
    capital: { x: 652, y: 378, name: 'Constantinople' },
    labelPos: { x: 648, y: 372 }
  },
  {
    id: 'italy',
    name: 'Kingdom of Italy',
    color: COLORS.italy,
    path: 'M468,245 L510,238 L535,295 L518,345 L480,352 L458,305 Z',
    capital: { x: 498, y: 298, name: 'Rome' },
    labelPos: { x: 495, y: 295 }
  },
  {
    id: 'spain',
    name: 'Kingdom of Spain',
    color: COLORS.spain,
    path: 'M355,232 L432,225 L455,285 L425,328 L355,322 L328,280 Z',
    capital: { x: 392, y: 278, name: 'Madrid' },
    labelPos: { x: 388, y: 275 }
  },
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M55,168 L232,158 L268,268 L228,348 L68,358 L28,278 Z',
    capital: { x: 162, y: 268, name: 'Washington' },
    labelPos: { x: 155, y: 262 }
  },
  {
    id: 'japan',
    name: 'Empire of Japan',
    color: COLORS.japanModern,
    path: 'M888,195 L932,188 L955,265 L935,322 L898,328 L875,272 Z',
    capital: { x: 915, y: 262, name: 'Tokyo' },
    labelPos: { x: 912, y: 258 }
  },
  {
    id: 'qing',
    name: 'Republic of China',
    color: COLORS.china,
    path: 'M780,195 L895,178 L935,315 L895,420 L805,432 L758,348 Z',
    capital: { x: 855, y: 318, name: 'Beijing' },
    labelPos: { x: 850, y: 312 }
  },
  {
    id: 'persia',
    name: 'Qajar Persia',
    color: COLORS.persia,
    path: 'M720,358 L808,342 L855,432 L818,505 L735,512 L695,445 Z',
    capital: { x: 775, y: 432, name: 'Tehran' },
    labelPos: { x: 772, y: 428 }
  },
  {
    id: 'brazil',
    name: 'Republic of Brazil',
    color: COLORS.brazil,
    path: 'M185,408 L318,392 L362,518 L308,602 L192,595 L155,502 Z',
    capital: { x: 265, y: 508, name: 'Rio de Janeiro' },
    labelPos: { x: 260, y: 502 }
  },
];

// ==================== 1936 - PRE-WWII ====================
const nations1936: Nation[] = [
  {
    id: 'germany',
    name: 'Nazi Germany',
    color: COLORS.germanReich,
    path: 'M475,150 L555,142 L580,198 L565,248 L510,255 L480,212 Z',
    capital: { x: 528, y: 200, name: 'Berlin' },
    labelPos: { x: 525, y: 198 }
  },
  {
    id: 'france',
    name: 'French Republic',
    color: COLORS.france,
    path: 'M400,172 L472,165 L492,215 L478,262 L438,278 L400,265 L388,220 Z',
    capital: { x: 442, y: 222, name: 'Paris' },
    labelPos: { x: 438, y: 218 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    color: COLORS.uk,
    path: 'M375,115 L435,108 L458,162 L442,208 L388,215 L362,182 L358,142 Z',
    capital: { x: 412, y: 165, name: 'London' },
    labelPos: { x: 408, y: 162 }
  },
  {
    id: 'italy',
    name: 'Kingdom of Italy',
    color: COLORS.italy,
    path: 'M472,252 L518,245 L545,308 L525,362 L485,370 L462,318 Z',
    capital: { x: 505, y: 312, name: 'Rome' },
    labelPos: { x: 502, y: 308 }
  },
  {
    id: 'ussr',
    name: 'Soviet Union',
    color: COLORS.ussr,
    path: 'M580,45 L940,25 L1000,210 L945,370 L745,385 L625,290 L570,160 Z',
    capital: { x: 785, y: 215, name: 'Moscow' },
    labelPos: { x: 780, y: 208 }
  },
  {
    id: 'poland',
    name: 'Poland',
    color: COLORS.poland,
    path: 'M545,158 L600,152 L622,205 L605,248 L560,255 L538,208 Z',
    capital: { x: 580, y: 205, name: 'Warsaw' },
    labelPos: { x: 578, y: 202 }
  },
  {
    id: 'czechoslovakia',
    name: 'Czechoslovakia',
    color: COLORS.bohemia,
    path: 'M510,212 L560,208 L575,242 L558,268 L518,272 L502,245 Z',
    capital: { x: 538, y: 242, name: 'Prague' },
    labelPos: { x: 535, y: 238 }
  },
  {
    id: 'austria',
    name: 'Austria',
    color: COLORS.austria,
    path: 'M495,248 L530,245 L542,275 L528,298 L498,302 L485,278 Z',
    capital: { x: 515, y: 275, name: 'Vienna' },
    labelPos: { x: 512, y: 272 }
  },
  {
    id: 'hungary',
    name: 'Hungary',
    color: COLORS.hungary,
    path: 'M535,262 L580,258 L598,298 L582,328 L545,332 L528,298 Z',
    capital: { x: 565, y: 298, name: 'Budapest' },
    labelPos: { x: 562, y: 295 }
  },
  {
    id: 'romania',
    name: 'Romania',
    color: '#ffd700',
    path: 'M575,275 L635,268 L658,325 L638,368 L588,375 L565,328 Z',
    capital: { x: 615, y: 325, name: 'Bucharest' },
    labelPos: { x: 612, y: 322 }
  },
  {
    id: 'yugoslavia',
    name: 'Yugoslavia',
    color: '#4169e1',
    path: 'M525,305 L575,298 L598,355 L575,395 L535,402 L512,358 Z',
    capital: { x: 558, y: 355, name: 'Belgrade' },
    labelPos: { x: 555, y: 352 }
  },
  {
    id: 'spain',
    name: 'Spain',
    color: COLORS.spain,
    path: 'M358,238 L438,230 L462,295 L432,342 L358,335 L332,288 Z',
    capital: { x: 398, y: 288, name: 'Madrid' },
    labelPos: { x: 395, y: 285 }
  },
  {
    id: 'japan',
    name: 'Empire of Japan',
    color: COLORS.japanModern,
    path: 'M895,205 L945,198 L972,282 L948,345 L908,352 L882,288 Z',
    capital: { x: 928, y: 278, name: 'Tokyo' },
    labelPos: { x: 925, y: 275 }
  },
  {
    id: 'china',
    name: 'Republic of China',
    color: COLORS.china,
    path: 'M785,212 L905,195 L948,352 L902,468 L808,480 L758,388 Z',
    capital: { x: 862, y: 355, name: 'Nanjing' },
    labelPos: { x: 855, y: 348 }
  },
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M52,175 L245,162 L285,285 L242,375 L68,385 L25,298 Z',
    capital: { x: 172, y: 285, name: 'Washington' },
    labelPos: { x: 165, y: 278 }
  },
  {
    id: 'brazil',
    name: 'Brazil',
    color: COLORS.brazil,
    path: 'M192,425 L332,408 L382,548 L322,638 L202,632 L162,528 Z',
    capital: { x: 278, y: 538, name: 'Rio de Janeiro' },
    labelPos: { x: 272, y: 530 }
  },
];

// ==================== 1942 - AXIS ZENITH ====================
const nations1942: Nation[] = [
  {
    id: 'germany',
    name: 'Greater German Reich',
    color: COLORS.germanReich,
    path: 'M420,135 L650,118 L705,235 L680,340 L545,355 L475,305 L415,218 Z',
    capital: { x: 555, y: 235, name: 'Berlin' },
    labelPos: { x: 548, y: 228 }
  },
  {
    id: 'vichy',
    name: 'Vichy France',
    color: '#6b5b5b',
    path: 'M388,205 L438,200 L455,255 L438,298 L398,305 L378,258 Z',
    capital: { x: 418, y: 255, name: 'Vichy' },
    labelPos: { x: 415, y: 252 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    color: COLORS.uk,
    path: 'M375,115 L435,108 L458,162 L442,208 L388,215 L362,182 L358,142 Z',
    capital: { x: 412, y: 165, name: 'London' },
    labelPos: { x: 408, y: 162 }
  },
  {
    id: 'italy',
    name: 'Kingdom of Italy',
    color: COLORS.italy,
    path: 'M468,268 L545,258 L588,345 L558,418 L492,428 L458,358 Z',
    capital: { x: 525, y: 352, name: 'Rome' },
    labelPos: { x: 520, y: 345 }
  },
  {
    id: 'ussr',
    name: 'Soviet Union',
    color: COLORS.ussr,
    path: 'M680,55 L940,35 L1000,235 L945,398 L780,415 L695,325 L655,195 Z',
    capital: { x: 825, y: 245, name: 'Moscow' },
    labelPos: { x: 820, y: 238 }
  },
  {
    id: 'japan',
    name: 'Empire of Japan',
    color: COLORS.japanModern,
    path: 'M785,205 L975,185 L1010,365 L965,505 L835,520 L775,405 Z',
    capital: { x: 895, y: 362, name: 'Tokyo' },
    labelPos: { x: 888, y: 355 }
  },
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M52,175 L245,162 L285,285 L242,375 L68,385 L25,298 Z',
    capital: { x: 172, y: 285, name: 'Washington' },
    labelPos: { x: 165, y: 278 }
  },
  {
    id: 'spain',
    name: 'Spain',
    color: COLORS.spain,
    path: 'M358,238 L420,232 L442,292 L418,335 L358,328 L335,285 Z',
    capital: { x: 392, y: 285, name: 'Madrid' },
    labelPos: { x: 388, y: 282 }
  },
  {
    id: 'brazil',
    name: 'Brazil',
    color: COLORS.brazil,
    path: 'M192,425 L332,408 L382,548 L322,638 L202,632 L162,528 Z',
    capital: { x: 278, y: 538, name: 'Rio de Janeiro' },
    labelPos: { x: 272, y: 530 }
  },
];

// ==================== 1945 - ALLIED VICTORY ====================
const nations1945: Nation[] = [
  {
    id: 'allied_germany',
    name: 'Occupied Germany (West)',
    color: '#4477aa',
    path: 'M470,155 L530,148 L548,198 L538,242 L495,248 L475,208 Z',
    capital: { x: 510, y: 200, name: 'Bonn' },
    labelPos: { x: 508, y: 198 }
  },
  {
    id: 'soviet_germany',
    name: 'Occupied Germany (East)',
    color: '#aa4444',
    path: 'M525,152 L575,145 L595,195 L580,238 L540,245 L522,200 Z',
    capital: { x: 555, y: 195, name: 'Berlin' },
    labelPos: { x: 552, y: 192 }
  },
  {
    id: 'france',
    name: 'French Republic',
    color: COLORS.france,
    path: 'M400,172 L472,165 L492,215 L478,262 L438,278 L400,265 L388,220 Z',
    capital: { x: 442, y: 222, name: 'Paris' },
    labelPos: { x: 438, y: 218 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    color: COLORS.uk,
    path: 'M375,115 L435,108 L458,162 L442,208 L388,215 L362,182 L358,142 Z',
    capital: { x: 412, y: 165, name: 'London' },
    labelPos: { x: 408, y: 162 }
  },
  {
    id: 'ussr',
    name: 'Soviet Union',
    color: COLORS.ussr,
    path: 'M565,45 L940,25 L1000,210 L945,375 L745,390 L600,310 L555,175 Z',
    capital: { x: 775, y: 218, name: 'Moscow' },
    labelPos: { x: 770, y: 212 }
  },
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M52,175 L245,162 L285,285 L242,375 L68,385 L25,298 Z',
    capital: { x: 172, y: 285, name: 'Washington' },
    labelPos: { x: 165, y: 278 }
  },
  {
    id: 'china',
    name: 'Republic of China',
    color: COLORS.china,
    path: 'M785,218 L905,202 L948,358 L902,475 L808,488 L758,395 Z',
    capital: { x: 862, y: 362, name: 'Nanjing' },
    labelPos: { x: 855, y: 355 }
  },
  {
    id: 'japan',
    name: 'Occupied Japan',
    color: '#888888',
    path: 'M895,212 L945,205 L972,292 L948,358 L908,365 L882,302 Z',
    capital: { x: 928, y: 288, name: 'Tokyo' },
    labelPos: { x: 925, y: 285 }
  },
  {
    id: 'italy',
    name: 'Italy',
    color: COLORS.italy,
    path: 'M472,252 L518,245 L545,308 L525,362 L485,370 L462,318 Z',
    capital: { x: 505, y: 312, name: 'Rome' },
    labelPos: { x: 502, y: 308 }
  },
  {
    id: 'spain',
    name: 'Spain',
    color: COLORS.spain,
    path: 'M358,238 L438,230 L462,295 L432,342 L358,335 L332,288 Z',
    capital: { x: 398, y: 288, name: 'Madrid' },
    labelPos: { x: 395, y: 285 }
  },
  {
    id: 'poland',
    name: "People's Republic of Poland",
    color: '#cc6666',
    path: 'M545,165 L605,158 L628,218 L608,265 L558,272 L535,222 Z',
    capital: { x: 582, y: 218, name: 'Warsaw' },
    labelPos: { x: 578, y: 215 }
  },
  {
    id: 'brazil',
    name: 'Brazil',
    color: COLORS.brazil,
    path: 'M192,425 L332,408 L382,548 L322,638 L202,632 L162,528 Z',
    capital: { x: 278, y: 538, name: 'Rio de Janeiro' },
    labelPos: { x: 272, y: 530 }
  },
];

// ==================== 1991 - END OF COLD WAR ====================
const nations1991: Nation[] = [
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M52,175 L245,162 L285,285 L242,375 L68,385 L25,298 Z',
    capital: { x: 172, y: 285, name: 'Washington' },
    labelPos: { x: 165, y: 278 }
  },
  {
    id: 'russia',
    name: 'Russian Federation',
    color: '#2f4f4f',
    path: 'M600,45 L940,25 L1000,185 L955,320 L780,335 L665,265 L600,155 Z',
    capital: { x: 795, y: 195, name: 'Moscow' },
    labelPos: { x: 790, y: 188 }
  },
  {
    id: 'germany',
    name: 'Germany',
    color: '#1a1a1a',
    path: 'M472,152 L545,145 L568,198 L552,245 L502,252 L478,205 Z',
    capital: { x: 522, y: 200, name: 'Berlin' },
    labelPos: { x: 518, y: 198 }
  },
  {
    id: 'france',
    name: 'France',
    color: COLORS.france,
    path: 'M400,172 L472,165 L492,215 L478,262 L438,278 L400,265 L388,220 Z',
    capital: { x: 442, y: 222, name: 'Paris' },
    labelPos: { x: 438, y: 218 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    color: COLORS.uk,
    path: 'M375,115 L435,108 L458,162 L442,208 L388,215 L362,182 L358,142 Z',
    capital: { x: 412, y: 165, name: 'London' },
    labelPos: { x: 408, y: 162 }
  },
  {
    id: 'china',
    name: "People's Republic of China",
    color: '#cc0000',
    path: 'M785,218 L915,200 L962,365 L912,490 L815,505 L762,408 Z',
    capital: { x: 872, y: 368, name: 'Beijing' },
    labelPos: { x: 865, y: 362 }
  },
  {
    id: 'japan',
    name: 'Japan',
    color: COLORS.japanModern,
    path: 'M905,225 L955,218 L982,310 L958,378 L918,385 L892,318 Z',
    capital: { x: 938, y: 305, name: 'Tokyo' },
    labelPos: { x: 935, y: 302 }
  },
  {
    id: 'india',
    name: 'India',
    color: '#ff9933',
    path: 'M728,365 L812,350 L855,452 L815,535 L738,542 L702,462 Z',
    capital: { x: 778, y: 455, name: 'New Delhi' },
    labelPos: { x: 775, y: 450 }
  },
  {
    id: 'brazil',
    name: 'Brazil',
    color: COLORS.brazil,
    path: 'M192,425 L332,408 L382,548 L322,638 L202,632 L162,528 Z',
    capital: { x: 278, y: 538, name: 'Brasilia' },
    labelPos: { x: 272, y: 530 }
  },
  {
    id: 'australia',
    name: 'Australia',
    color: '#00008b',
    path: 'M832,455 L958,442 L1005,538 L955,615 L852,622 L802,545 Z',
    capital: { x: 908, y: 545, name: 'Canberra' },
    labelPos: { x: 902, y: 538 }
  },
];

// Export all eras
export const historicalEras: HistoricalEra[] = [
  {
    year: 1444,
    name: 'Late Medieval',
    description: 'The fall of Constantinople approaches. The old world order crumbles.',
    nations: nations1444
  },
  {
    year: 1492,
    name: 'Age of Discovery',
    description: 'Columbus reaches the Americas. A new world is revealed.',
    nations: nations1492
  },
  {
    year: 1648,
    name: 'Peace of Westphalia',
    description: 'The Thirty Years War ends. Modern nation-states emerge.',
    nations: nations1648
  },
  {
    year: 1789,
    name: 'French Revolution',
    description: 'Revolution sweeps France. The old regime falls.',
    nations: nations1789
  },
  {
    year: 1815,
    name: 'Congress of Vienna',
    description: 'Napoleon defeated. Europe redrawn by the great powers.',
    nations: nations1815
  },
  {
    year: 1914,
    name: 'World War I',
    description: 'The Great War begins. Empires will fall.',
    nations: nations1914
  },
  {
    year: 1936,
    name: 'Pre-WWII',
    description: 'Fascism rises. The world prepares for war.',
    nations: nations1936
  },
  {
    year: 1942,
    name: 'Axis Zenith',
    description: 'The Axis at peak power. The tide will soon turn.',
    nations: nations1942
  },
  {
    year: 1945,
    name: 'Allied Victory',
    description: 'World War II ends. A new world order emerges.',
    nations: nations1945
  },
  {
    year: 1991,
    name: 'End of Cold War',
    description: 'The Soviet Union dissolves. America stands alone.',
    nations: nations1991
  }
];

export default historicalEras;
