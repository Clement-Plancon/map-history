// World map data with simplified GeoJSON-style paths for major nations
// Coordinates are in SVG viewBox space (0-1000 x, 0-500 y) mapped from real lat/long

export interface Nation {
  id: string;
  name: string;
  color: string;
  path: string; // SVG path
  capital?: { x: number; y: number; name: string };
  labelPos?: { x: number; y: number };
}

export interface HistoricalEra {
  year: number;
  name: string;
  description: string;
  nations: Nation[];
}

// Color palette inspired by Paradox games
const COLORS = {
  // Major powers
  germany: '#4a4a4a',
  germanReich: '#3d3d3d',
  france: '#2e5cb8',
  uk: '#c94040',
  usa: '#3b6ea8',
  ussr: '#8b0000',
  italy: '#4ca64c',
  japan: '#e8e8e8',
  china: '#c9a227',

  // European nations
  spain: '#c9a227',
  portugal: '#2d8b57',
  netherlands: '#f5a623',
  belgium: '#1a1a1a',
  poland: '#d4a5a5',
  czechoslovakia: '#7eb0d5',
  austria: '#ffffff',
  hungary: '#5d8c51',
  romania: '#ffd700',
  yugoslavia: '#4169e1',
  greece: '#87ceeb',
  bulgaria: '#556b2f',
  finland: '#f0f0f0',
  sweden: '#0066cc',
  norway: '#ef4444',
  denmark: '#c8102e',
  switzerland: '#ff0000',
  ireland: '#009a49',

  // Others
  turkey: '#e30a17',
  iran: '#239f40',
  iraq: '#007a3d',
  saudiArabia: '#006c35',
  egypt: '#c8102e',
  southAfrica: '#007749',
  india: '#ff9933',
  australia: '#00008b',
  canada: '#ff0000',
  brazil: '#009c3b',
  argentina: '#75aadb',
  mexico: '#006847',

  // Colonial/occupied
  colonial: '#8b7355',
  occupied: '#666666',
  neutral: '#a0a0a0',
  water: '#1a3a5c',
};

// Pre-WWII 1936
const nations1936: Nation[] = [
  {
    id: 'germany',
    name: 'German Reich',
    color: COLORS.germanReich,
    path: 'M480,155 L510,150 L530,160 L535,180 L520,195 L490,200 L470,190 L465,170 Z',
    capital: { x: 505, y: 175, name: 'Berlin' },
    labelPos: { x: 500, y: 175 }
  },
  {
    id: 'france',
    name: 'France',
    color: COLORS.france,
    path: 'M420,170 L460,165 L470,190 L465,220 L440,235 L410,225 L400,200 L405,175 Z',
    capital: { x: 435, y: 195, name: 'Paris' },
    labelPos: { x: 430, y: 200 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    color: COLORS.uk,
    path: 'M400,130 L425,125 L435,145 L430,165 L410,170 L395,160 L390,140 Z',
    capital: { x: 415, y: 150, name: 'London' },
    labelPos: { x: 410, y: 150 }
  },
  {
    id: 'italy',
    name: 'Kingdom of Italy',
    color: COLORS.italy,
    path: 'M475,210 L495,205 L510,230 L505,265 L490,280 L475,270 L470,240 L465,215 Z',
    capital: { x: 485, y: 235, name: 'Rome' },
    labelPos: { x: 485, y: 245 }
  },
  {
    id: 'spain',
    name: 'Spain',
    color: COLORS.spain,
    path: 'M380,210 L420,205 L435,230 L425,260 L390,265 L365,250 L360,225 Z',
    capital: { x: 395, y: 235, name: 'Madrid' },
    labelPos: { x: 395, y: 235 }
  },
  {
    id: 'portugal',
    name: 'Portugal',
    color: COLORS.portugal,
    path: 'M355,220 L365,218 L370,250 L360,265 L350,255 L345,230 Z',
    capital: { x: 355, y: 240, name: 'Lisbon' },
    labelPos: { x: 355, y: 240 }
  },
  {
    id: 'ussr',
    name: 'Soviet Union',
    color: COLORS.ussr,
    path: 'M540,80 L900,60 L950,150 L920,250 L800,280 L650,260 L580,220 L550,180 L535,140 Z',
    capital: { x: 600, y: 160, name: 'Moscow' },
    labelPos: { x: 720, y: 150 }
  },
  {
    id: 'poland',
    name: 'Poland',
    color: COLORS.poland,
    path: 'M530,160 L560,155 L575,175 L565,195 L540,200 L520,190 Z',
    capital: { x: 545, y: 178, name: 'Warsaw' },
    labelPos: { x: 545, y: 178 }
  },
  {
    id: 'czechoslovakia',
    name: 'Czechoslovakia',
    color: COLORS.czechoslovakia,
    path: 'M500,185 L535,182 L540,195 L525,205 L500,200 Z',
    capital: { x: 515, y: 192, name: 'Prague' },
    labelPos: { x: 515, y: 192 }
  },
  {
    id: 'austria',
    name: 'Austria',
    color: COLORS.austria,
    path: 'M490,195 L510,193 L515,205 L500,212 L485,205 Z',
    capital: { x: 498, y: 202, name: 'Vienna' },
    labelPos: { x: 498, y: 202 }
  },
  {
    id: 'hungary',
    name: 'Hungary',
    color: COLORS.hungary,
    path: 'M515,200 L545,198 L555,215 L540,225 L515,220 Z',
    capital: { x: 530, y: 212, name: 'Budapest' },
    labelPos: { x: 530, y: 212 }
  },
  {
    id: 'romania',
    name: 'Romania',
    color: COLORS.romania,
    path: 'M545,200 L580,195 L595,220 L580,240 L550,235 L540,215 Z',
    capital: { x: 565, y: 218, name: 'Bucharest' },
    labelPos: { x: 565, y: 218 }
  },
  {
    id: 'yugoslavia',
    name: 'Yugoslavia',
    color: COLORS.yugoslavia,
    path: 'M505,215 L540,210 L550,235 L535,250 L510,245 L495,230 Z',
    capital: { x: 520, y: 232, name: 'Belgrade' },
    labelPos: { x: 520, y: 232 }
  },
  {
    id: 'greece',
    name: 'Greece',
    color: COLORS.greece,
    path: 'M530,250 L555,245 L565,270 L550,290 L530,285 L520,265 Z',
    capital: { x: 540, y: 268, name: 'Athens' },
    labelPos: { x: 540, y: 268 }
  },
  {
    id: 'bulgaria',
    name: 'Bulgaria',
    color: COLORS.bulgaria,
    path: 'M555,235 L585,230 L595,250 L580,260 L555,255 Z',
    capital: { x: 572, y: 245, name: 'Sofia' },
    labelPos: { x: 572, y: 245 }
  },
  {
    id: 'turkey',
    name: 'Turkey',
    color: COLORS.turkey,
    path: 'M565,250 L650,240 L680,270 L650,295 L590,290 L565,270 Z',
    capital: { x: 610, y: 265, name: 'Ankara' },
    labelPos: { x: 615, y: 268 }
  },
  {
    id: 'finland',
    name: 'Finland',
    color: COLORS.finland,
    path: 'M545,90 L570,85 L580,120 L565,140 L545,130 Z',
    capital: { x: 558, y: 115, name: 'Helsinki' },
    labelPos: { x: 558, y: 115 }
  },
  {
    id: 'sweden',
    name: 'Sweden',
    color: COLORS.sweden,
    path: 'M490,85 L515,80 L530,120 L520,150 L495,145 L485,110 Z',
    capital: { x: 505, y: 120, name: 'Stockholm' },
    labelPos: { x: 505, y: 115 }
  },
  {
    id: 'norway',
    name: 'Norway',
    color: COLORS.norway,
    path: 'M460,70 L490,60 L500,95 L490,130 L470,135 L455,100 Z',
    capital: { x: 475, y: 105, name: 'Oslo' },
    labelPos: { x: 475, y: 100 }
  },
  {
    id: 'denmark',
    name: 'Denmark',
    color: COLORS.denmark,
    path: 'M475,140 L490,138 L495,152 L485,158 L472,150 Z',
    capital: { x: 482, y: 148, name: 'Copenhagen' },
    labelPos: { x: 482, y: 148 }
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    color: COLORS.netherlands,
    path: 'M445,155 L460,152 L465,168 L455,175 L442,168 Z',
    capital: { x: 452, y: 163, name: 'Amsterdam' },
    labelPos: { x: 452, y: 163 }
  },
  {
    id: 'belgium',
    name: 'Belgium',
    color: COLORS.belgium,
    path: 'M438,168 L455,165 L460,180 L450,187 L435,180 Z',
    capital: { x: 447, y: 176, name: 'Brussels' },
    labelPos: { x: 447, y: 176 }
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    color: COLORS.switzerland,
    path: 'M455,195 L475,193 L480,205 L468,212 L452,205 Z',
    capital: { x: 465, y: 202, name: 'Bern' },
    labelPos: { x: 465, y: 202 }
  },
  {
    id: 'ireland',
    name: 'Ireland',
    color: COLORS.ireland,
    path: 'M375,135 L395,132 L400,155 L388,165 L372,155 Z',
    capital: { x: 385, y: 148, name: 'Dublin' },
    labelPos: { x: 385, y: 148 }
  },
  // North Africa & Middle East
  {
    id: 'egypt',
    name: 'Egypt',
    color: COLORS.colonial,
    path: 'M560,300 L610,295 L630,340 L600,370 L555,360 L545,325 Z',
    capital: { x: 580, y: 330, name: 'Cairo' },
    labelPos: { x: 580, y: 330 }
  },
  {
    id: 'iran',
    name: 'Iran',
    color: COLORS.iran,
    path: 'M660,260 L720,250 L750,290 L730,330 L680,335 L650,300 Z',
    capital: { x: 695, y: 290, name: 'Tehran' },
    labelPos: { x: 695, y: 290 }
  },
  {
    id: 'saudiArabia',
    name: 'Saudi Arabia',
    color: COLORS.saudiArabia,
    path: 'M610,310 L680,300 L710,350 L680,400 L620,395 L590,350 Z',
    capital: { x: 645, y: 350, name: 'Riyadh' },
    labelPos: { x: 645, y: 350 }
  },
  // Asia
  {
    id: 'japan',
    name: 'Empire of Japan',
    color: COLORS.japan,
    path: 'M870,180 L895,175 L910,210 L900,240 L875,245 L860,215 Z',
    capital: { x: 885, y: 210, name: 'Tokyo' },
    labelPos: { x: 885, y: 210 }
  },
  {
    id: 'china',
    name: 'Republic of China',
    color: COLORS.china,
    path: 'M750,200 L850,180 L880,250 L850,320 L780,330 L730,290 L720,240 Z',
    capital: { x: 800, y: 260, name: 'Nanjing' },
    labelPos: { x: 790, y: 260 }
  },
  {
    id: 'india',
    name: 'British India',
    color: COLORS.colonial,
    path: 'M700,280 L760,270 L790,330 L770,390 L720,400 L680,360 L675,310 Z',
    capital: { x: 730, y: 340, name: 'Delhi' },
    labelPos: { x: 730, y: 340 }
  },
  // Americas
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M80,160 L220,150 L240,200 L230,260 L150,270 L70,250 L50,200 Z',
    capital: { x: 180, y: 200, name: 'Washington' },
    labelPos: { x: 150, y: 210 }
  },
  {
    id: 'canada',
    name: 'Canada',
    color: COLORS.canada,
    path: 'M60,80 L240,60 L260,130 L220,155 L80,165 L40,120 Z',
    capital: { x: 175, y: 120, name: 'Ottawa' },
    labelPos: { x: 150, y: 110 }
  },
  {
    id: 'mexico',
    name: 'Mexico',
    color: COLORS.mexico,
    path: 'M70,250 L150,245 L170,290 L140,340 L90,335 L50,290 Z',
    capital: { x: 110, y: 290, name: 'Mexico City' },
    labelPos: { x: 110, y: 290 }
  },
  {
    id: 'brazil',
    name: 'Brazil',
    color: COLORS.brazil,
    path: 'M180,340 L280,320 L310,400 L270,470 L190,465 L150,400 Z',
    capital: { x: 235, y: 395, name: 'Rio de Janeiro' },
    labelPos: { x: 230, y: 400 }
  },
  {
    id: 'argentina',
    name: 'Argentina',
    color: COLORS.argentina,
    path: 'M180,430 L230,420 L250,490 L220,550 L180,545 L160,480 Z',
    capital: { x: 205, y: 480, name: 'Buenos Aires' },
    labelPos: { x: 200, y: 485 }
  },
  // Africa
  {
    id: 'northAfrica',
    name: 'French North Africa',
    color: COLORS.colonial,
    path: 'M380,280 L500,275 L520,320 L480,360 L400,365 L360,320 Z',
    capital: { x: 430, y: 320, name: 'Algiers' },
    labelPos: { x: 430, y: 320 }
  },
  {
    id: 'westAfrica',
    name: 'French West Africa',
    color: COLORS.colonial,
    path: 'M360,340 L450,335 L470,400 L420,440 L350,435 L330,380 Z',
    capital: { x: 400, y: 385, name: 'Dakar' },
    labelPos: { x: 400, y: 385 }
  },
  {
    id: 'centralAfrica',
    name: 'Belgian Congo',
    color: COLORS.colonial,
    path: 'M480,380 L550,375 L570,440 L530,480 L470,475 L450,420 Z',
    capital: { x: 510, y: 425, name: 'Leopoldville' },
    labelPos: { x: 510, y: 425 }
  },
  {
    id: 'eastAfrica',
    name: 'British East Africa',
    color: COLORS.colonial,
    path: 'M560,370 L610,365 L630,430 L600,470 L550,465 L530,410 Z',
    capital: { x: 580, y: 415, name: 'Nairobi' },
    labelPos: { x: 580, y: 415 }
  },
  {
    id: 'southAfrica',
    name: 'South Africa',
    color: COLORS.southAfrica,
    path: 'M510,470 L580,465 L600,520 L560,560 L500,555 L480,510 Z',
    capital: { x: 545, y: 510, name: 'Pretoria' },
    labelPos: { x: 540, y: 510 }
  },
  // Oceania
  {
    id: 'australia',
    name: 'Australia',
    color: COLORS.australia,
    path: 'M800,400 L920,390 L960,460 L920,520 L820,530 L770,470 Z',
    capital: { x: 880, y: 460, name: 'Canberra' },
    labelPos: { x: 870, y: 455 }
  },
];

// 1939 - Start of WWII
const nations1939: Nation[] = nations1936.map(nation => {
  // Germany annexes Austria and Czechoslovakia
  if (nation.id === 'germany') {
    return {
      ...nation,
      name: 'Greater German Reich',
      path: 'M470,155 L540,150 L565,175 L560,210 L535,220 L490,215 L465,190 L460,170 Z',
    };
  }
  if (nation.id === 'austria' || nation.id === 'czechoslovakia') {
    return null;
  }
  return nation;
}).filter(Boolean) as Nation[];

// 1941 - Axis peak expansion
const nations1941: Nation[] = [
  {
    id: 'germany',
    name: 'Greater German Reich',
    color: COLORS.germanReich,
    path: 'M420,140 L600,120 L650,200 L620,260 L540,280 L470,270 L420,230 L400,180 Z',
    capital: { x: 505, y: 175, name: 'Berlin' },
    labelPos: { x: 520, y: 200 }
  },
  {
    id: 'vichyFrance',
    name: 'Vichy France',
    color: '#6b5b5b',
    path: 'M400,200 L440,195 L455,230 L440,260 L410,255 L395,225 Z',
    capital: { x: 420, y: 230, name: 'Vichy' },
    labelPos: { x: 420, y: 230 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    color: COLORS.uk,
    path: 'M400,130 L425,125 L435,145 L430,165 L410,170 L395,160 L390,140 Z',
    capital: { x: 415, y: 150, name: 'London' },
    labelPos: { x: 410, y: 150 }
  },
  {
    id: 'italy',
    name: 'Kingdom of Italy',
    color: COLORS.italy,
    path: 'M475,210 L530,200 L560,250 L540,310 L490,320 L460,280 L455,230 Z',
    capital: { x: 495, y: 255, name: 'Rome' },
    labelPos: { x: 500, y: 260 }
  },
  {
    id: 'spain',
    name: 'Spain',
    color: COLORS.spain,
    path: 'M380,210 L420,205 L435,230 L425,260 L390,265 L365,250 L360,225 Z',
    capital: { x: 395, y: 235, name: 'Madrid' },
    labelPos: { x: 395, y: 235 }
  },
  {
    id: 'portugal',
    name: 'Portugal',
    color: COLORS.portugal,
    path: 'M355,220 L365,218 L370,250 L360,265 L350,255 L345,230 Z',
    capital: { x: 355, y: 240, name: 'Lisbon' },
    labelPos: { x: 355, y: 240 }
  },
  {
    id: 'ussr',
    name: 'Soviet Union',
    color: COLORS.ussr,
    path: 'M620,80 L900,60 L950,150 L920,250 L800,280 L700,270 L650,230 L610,160 Z',
    capital: { x: 680, y: 160, name: 'Moscow' },
    labelPos: { x: 760, y: 150 }
  },
  {
    id: 'turkey',
    name: 'Turkey',
    color: COLORS.turkey,
    path: 'M565,250 L650,240 L680,270 L650,295 L590,290 L565,270 Z',
    capital: { x: 610, y: 265, name: 'Ankara' },
    labelPos: { x: 615, y: 268 }
  },
  {
    id: 'sweden',
    name: 'Sweden',
    color: COLORS.sweden,
    path: 'M490,85 L515,80 L530,120 L520,150 L495,145 L485,110 Z',
    capital: { x: 505, y: 120, name: 'Stockholm' },
    labelPos: { x: 505, y: 115 }
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    color: COLORS.switzerland,
    path: 'M455,195 L475,193 L480,205 L468,212 L452,205 Z',
    capital: { x: 465, y: 202, name: 'Bern' },
    labelPos: { x: 465, y: 202 }
  },
  {
    id: 'ireland',
    name: 'Ireland',
    color: COLORS.ireland,
    path: 'M375,135 L395,132 L400,155 L388,165 L372,155 Z',
    capital: { x: 385, y: 148, name: 'Dublin' },
    labelPos: { x: 385, y: 148 }
  },
  {
    id: 'japan',
    name: 'Empire of Japan',
    color: COLORS.japan,
    path: 'M820,170 L920,150 L960,250 L930,350 L850,360 L800,300 L790,220 Z',
    capital: { x: 885, y: 210, name: 'Tokyo' },
    labelPos: { x: 870, y: 250 }
  },
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M80,160 L220,150 L240,200 L230,260 L150,270 L70,250 L50,200 Z',
    capital: { x: 180, y: 200, name: 'Washington' },
    labelPos: { x: 150, y: 210 }
  },
  {
    id: 'canada',
    name: 'Canada',
    color: COLORS.canada,
    path: 'M60,80 L240,60 L260,130 L220,155 L80,165 L40,120 Z',
    capital: { x: 175, y: 120, name: 'Ottawa' },
    labelPos: { x: 150, y: 110 }
  },
  {
    id: 'brazil',
    name: 'Brazil',
    color: COLORS.brazil,
    path: 'M180,340 L280,320 L310,400 L270,470 L190,465 L150,400 Z',
    capital: { x: 235, y: 395, name: 'Rio de Janeiro' },
    labelPos: { x: 230, y: 400 }
  },
  {
    id: 'australia',
    name: 'Australia',
    color: COLORS.australia,
    path: 'M800,400 L920,390 L960,460 L920,520 L820,530 L770,470 Z',
    capital: { x: 880, y: 460, name: 'Canberra' },
    labelPos: { x: 870, y: 455 }
  },
];

// 1945 - End of WWII
const nations1945: Nation[] = [
  {
    id: 'alliedGermany',
    name: 'Allied Occupied Germany',
    color: '#666699',
    path: 'M460,155 L530,150 L545,180 L535,210 L505,215 L475,205 L465,180 Z',
    capital: { x: 505, y: 180, name: 'Berlin' },
    labelPos: { x: 500, y: 185 }
  },
  {
    id: 'sovietGermany',
    name: 'Soviet Zone Germany',
    color: '#993333',
    path: 'M515,160 L545,155 L555,185 L545,200 L520,195 Z',
    capital: { x: 535, y: 178, name: 'East Berlin' },
    labelPos: { x: 535, y: 178 }
  },
  {
    id: 'france',
    name: 'France',
    color: COLORS.france,
    path: 'M420,170 L460,165 L470,190 L465,220 L440,235 L410,225 L400,200 L405,175 Z',
    capital: { x: 435, y: 195, name: 'Paris' },
    labelPos: { x: 430, y: 200 }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    color: COLORS.uk,
    path: 'M400,130 L425,125 L435,145 L430,165 L410,170 L395,160 L390,140 Z',
    capital: { x: 415, y: 150, name: 'London' },
    labelPos: { x: 410, y: 150 }
  },
  {
    id: 'italy',
    name: 'Italy',
    color: COLORS.italy,
    path: 'M475,210 L495,205 L510,230 L505,265 L490,280 L475,270 L470,240 L465,215 Z',
    capital: { x: 485, y: 235, name: 'Rome' },
    labelPos: { x: 485, y: 245 }
  },
  {
    id: 'spain',
    name: 'Spain',
    color: COLORS.spain,
    path: 'M380,210 L420,205 L435,230 L425,260 L390,265 L365,250 L360,225 Z',
    capital: { x: 395, y: 235, name: 'Madrid' },
    labelPos: { x: 395, y: 235 }
  },
  {
    id: 'ussr',
    name: 'Soviet Union',
    color: COLORS.ussr,
    path: 'M530,80 L900,60 L950,150 L920,250 L800,280 L650,260 L560,220 L540,160 Z',
    capital: { x: 600, y: 160, name: 'Moscow' },
    labelPos: { x: 720, y: 150 }
  },
  {
    id: 'poland',
    name: "People's Republic of Poland",
    color: '#cc6666',
    path: 'M520,160 L555,155 L570,180 L560,200 L530,205 L515,190 Z',
    capital: { x: 540, y: 180, name: 'Warsaw' },
    labelPos: { x: 540, y: 180 }
  },
  {
    id: 'czechoslovakia',
    name: 'Czechoslovakia',
    color: '#7799bb',
    path: 'M495,190 L530,185 L540,200 L525,212 L495,207 Z',
    capital: { x: 515, y: 198, name: 'Prague' },
    labelPos: { x: 515, y: 198 }
  },
  {
    id: 'yugoslavia',
    name: 'Yugoslavia',
    color: '#4466aa',
    path: 'M505,215 L545,210 L555,240 L540,260 L510,255 L495,235 Z',
    capital: { x: 525, y: 238, name: 'Belgrade' },
    labelPos: { x: 525, y: 238 }
  },
  {
    id: 'usa',
    name: 'United States',
    color: COLORS.usa,
    path: 'M80,160 L220,150 L240,200 L230,260 L150,270 L70,250 L50,200 Z',
    capital: { x: 180, y: 200, name: 'Washington' },
    labelPos: { x: 150, y: 210 }
  },
  {
    id: 'china',
    name: 'Republic of China',
    color: COLORS.china,
    path: 'M750,200 L860,180 L890,260 L860,330 L780,340 L730,300 L720,250 Z',
    capital: { x: 800, y: 270, name: 'Nanjing' },
    labelPos: { x: 800, y: 270 }
  },
  {
    id: 'japan',
    name: 'Occupied Japan',
    color: '#999999',
    path: 'M870,180 L895,175 L910,210 L900,240 L875,245 L860,215 Z',
    capital: { x: 885, y: 210, name: 'Tokyo' },
    labelPos: { x: 885, y: 210 }
  },
];

export const historicalEras: HistoricalEra[] = [
  {
    year: 1936,
    name: 'Pre-War Europe',
    description: 'The calm before the storm. Hitler consolidates power in Germany.',
    nations: nations1936
  },
  {
    year: 1939,
    name: 'War Begins',
    description: 'Germany invades Poland. Britain and France declare war.',
    nations: nations1939
  },
  {
    year: 1941,
    name: 'Axis Zenith',
    description: 'Germany controls most of Europe. Japan dominates the Pacific.',
    nations: nations1941
  },
  {
    year: 1945,
    name: 'Allied Victory',
    description: 'Germany and Japan defeated. The world order is reshaped.',
    nations: nations1945
  }
];

export default historicalEras;
