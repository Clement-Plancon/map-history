import { MapRegion } from '../types';

export const MAP_REGIONS: MapRegion[] = [
  {
    id: 'western-isles',
    name: 'Western Isles',
    polygon: [
      [40, 160],
      [120, 120],
      [180, 150],
      [170, 210],
      [110, 230],
      [60, 200]
    ],
    defaultFactionId: 'allied',
    labelPosition: { x: 110, y: 180 }
  },
  {
    id: 'northern-shield',
    name: 'Northern Shield',
    polygon: [
      [180, 80],
      [300, 60],
      [360, 100],
      [330, 150],
      [240, 160]
    ],
    defaultFactionId: 'allied',
    labelPosition: { x: 270, y: 110 }
  },
  {
    id: 'fjord-coast',
    name: 'Fjord Coast',
    polygon: [
      [330, 40],
      [430, 40],
      [470, 80],
      [420, 130],
      [340, 120]
    ],
    defaultFactionId: 'allied',
    labelPosition: { x: 405, y: 85 }
  },
  {
    id: 'northern-kingdom',
    name: 'Northern Kingdom',
    polygon: [
      [380, 130],
      [470, 140],
      [520, 190],
      [450, 200],
      [380, 180]
    ],
    defaultFactionId: 'allied',
    labelPosition: { x: 450, y: 175 }
  },
  {
    id: 'lowland-marches',
    name: 'Lowland Marches',
    polygon: [
      [300, 200],
      [380, 180],
      [440, 210],
      [430, 260],
      [330, 270]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 370, y: 230 }
  },
  {
    id: 'central-plains',
    name: 'Central Plains',
    polygon: [
      [430, 210],
      [520, 210],
      [580, 250],
      [530, 290],
      [440, 280]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 505, y: 250 }
  },
  {
    id: 'riverheart',
    name: 'Riverheart',
    polygon: [
      [520, 180],
      [600, 170],
      [650, 210],
      [620, 260],
      [560, 250]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 590, y: 215 }
  },
  {
    id: 'alpine-league',
    name: 'Alpine League',
    polygon: [
      [440, 280],
      [530, 290],
      [550, 340],
      [470, 360],
      [420, 330]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 500, y: 325 }
  },
  {
    id: 'coastal-reaches',
    name: 'Coastal Reaches',
    polygon: [
      [330, 270],
      [430, 260],
      [450, 330],
      [360, 350],
      [300, 310]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 380, y: 310 }
  },
  {
    id: 'sunlit-basin',
    name: 'Sunlit Basin',
    polygon: [
      [250, 300],
      [330, 270],
      [340, 340],
      [280, 360],
      [230, 330]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 300, y: 320 }
  },
  {
    id: 'southern-coast',
    name: 'Southern Coast',
    polygon: [
      [360, 350],
      [450, 330],
      [470, 380],
      [410, 420],
      [340, 400]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 420, y: 380 }
  },
  {
    id: 'peninsula-realm',
    name: 'Peninsula Realm',
    polygon: [
      [410, 420],
      [470, 380],
      [520, 420],
      [500, 470],
      [420, 470]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 470, y: 440 }
  },
  {
    id: 'alabaster-isles',
    name: 'Alabaster Isles',
    polygon: [
      [520, 420],
      [570, 400],
      [610, 430],
      [600, 470],
      [540, 470]
    ],
    defaultFactionId: 'allied',
    labelPosition: { x: 570, y: 440 }
  },
  {
    id: 'dune-coast',
    name: 'Dune Coast',
    polygon: [
      [470, 470],
      [540, 470],
      [570, 520],
      [500, 550],
      [440, 520]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 520, y: 510 }
  },
  {
    id: 'eastern-steppe',
    name: 'Eastern Steppe',
    polygon: [
      [600, 200],
      [700, 180],
      [760, 220],
      [730, 270],
      [640, 260]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 690, y: 230 }
  },
  {
    id: 'northern-frontier',
    name: 'Northern Frontier',
    polygon: [
      [620, 110],
      [720, 90],
      [780, 130],
      [750, 180],
      [660, 170]
    ],
    defaultFactionId: 'allied',
    labelPosition: { x: 700, y: 135 }
  },
  {
    id: 'amber-coast',
    name: 'Amber Coast',
    polygon: [
      [740, 240],
      [820, 230],
      [860, 260],
      [830, 300],
      [760, 300]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 810, y: 270 }
  },
  {
    id: 'great-ridge',
    name: 'Great Ridge',
    polygon: [
      [640, 260],
      [730, 270],
      [750, 330],
      [690, 360],
      [620, 320]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 700, y: 320 }
  },
  {
    id: 'central-arch',
    name: 'Central Arch',
    polygon: [
      [690, 360],
      [750, 330],
      [800, 360],
      [780, 410],
      [700, 410]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 750, y: 380 }
  },
  {
    id: 'southern-passes',
    name: 'Southern Passes',
    polygon: [
      [620, 320],
      [690, 360],
      [700, 410],
      [630, 430],
      [580, 380]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 660, y: 380 }
  },
  {
    id: 'burnt-desert',
    name: 'Burnt Desert',
    polygon: [
      [700, 410],
      [780, 410],
      [820, 450],
      [760, 500],
      [690, 470]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 760, y: 460 }
  },
  {
    id: 'southern-deltas',
    name: 'Southern Deltas',
    polygon: [
      [580, 380],
      [630, 430],
      [640, 480],
      [570, 500],
      [520, 460]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 600, y: 450 }
  },
  {
    id: 'mirror-sea',
    name: 'Mirror Sea',
    polygon: [
      [540, 470],
      [600, 470],
      [620, 520],
      [560, 540],
      [500, 520]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 570, y: 505 }
  },
  {
    id: 'crescent-gulf',
    name: 'Crescent Gulf',
    polygon: [
      [620, 520],
      [690, 470],
      [760, 500],
      [720, 550],
      [650, 560]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 690, y: 525 }
  },
  {
    id: 'desert-throne',
    name: 'Desert Throne',
    polygon: [
      [760, 500],
      [820, 450],
      [880, 480],
      [870, 540],
      [800, 560]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 830, y: 515 }
  },
  {
    id: 'eastern-hinterlands',
    name: 'Eastern Hinterlands',
    polygon: [
      [830, 300],
      [900, 280],
      [940, 330],
      [900, 380],
      [830, 360]
    ],
    defaultFactionId: 'axis',
    labelPosition: { x: 890, y: 330 }
  },
  {
    id: 'oriental-trade',
    name: 'Oriental Trade',
    polygon: [
      [780, 410],
      [830, 360],
      [900, 380],
      [910, 430],
      [840, 450]
    ],
    defaultFactionId: 'neutral',
    labelPosition: { x: 860, y: 410 }
  }
];

export default MAP_REGIONS;
