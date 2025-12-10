import { Scenario } from '../types';

const clamp = (value: number) => Math.min(100, Math.max(0, value));

const balanced = (value: number) => clamp(value + 0);

export const scenarios: Scenario[] = [
  {
    id: 'europe-1939',
    title: 'Europe 1939',
    era: 'WW2',
    category: 'Historical',
    yearStart: 1939,
    region: 'Europe',
    description: 'The continent braces for total war as alliances and borders harden under rising tensions.',
    tags: ['war', 'diplomacy', 'industry'],
    initialStats: {
      stability: 62,
      economy: 58,
      military: 70,
      diplomacy: 55,
      legitimacy: 60
    },
    turnLimit: 12,
    factions: [
      { id: 'allied', name: 'Allied Bloc', color: '#5db1ff', description: 'France, UK, and aligned partners.', relations: 20 },
      { id: 'axis', name: 'Axis Coalition', color: '#ff6b6b', description: 'Expansionist powers seeking domination.', relations: -40 },
      { id: 'neutral', name: 'Non-Aligned', color: '#9ca3af', description: 'Smaller states seeking survival.', relations: 0 }
    ],
    eventDeck: [
      {
        id: 'ultimatum',
        title: 'Border Ultimatums',
        flavorText: 'Neighbors issue harsh demands over disputed territories.',
        tags: ['diplomacy', 'stability'],
        choices: [
          {
            id: 'stand-firm',
            label: 'Stand firm',
            description: 'Reject the demands outright.',
            statChanges: { stability: -3, diplomacy: -5, military: +4 },
            logText: 'Refused coercion and readied forces.'
          },
          {
            id: 'negotiate',
            label: 'Offer concessions',
            description: 'Seek compromise to buy time.',
            statChanges: { stability: -1, diplomacy: +6, economy: -2 },
            logText: 'Opened back-channel talks to ease tensions.'
          }
        ]
      },
      {
        id: 'rearmament',
        title: 'Rapid Rearmament',
        flavorText: 'Factories switch to war production with unprecedented speed.',
        tags: ['military', 'economy'],
        choices: [
          {
            id: 'full-shift',
            label: 'Full shift',
            description: 'Everything for the front.',
            statChanges: { military: +8, economy: -4, stability: -2 },
            logText: 'Industry surges for arms at great social cost.'
          },
          {
            id: 'balanced',
            label: 'Balanced program',
            description: 'Arm without crippling civilians.',
            statChanges: { military: +4, economy: -1, stability: +1 },
            logText: 'Kept essential services while arming steadily.'
          }
        ]
      },
      {
        id: 'alliance-talks',
        title: 'Alliance Talks',
        flavorText: 'Envoys court partners with promises of security.',
        tags: ['diplomacy'],
        choices: [
          {
            id: 'join-allies',
            label: 'Side with the Allies',
            description: 'Lean on democracies for aid.',
            statChanges: { diplomacy: +6, economy: +2, legitimacy: +3 },
            logText: 'Committed to collective defense.'
          },
          {
            id: 'neutral-stance',
            label: 'Maintain neutrality',
            description: 'Avoid entanglement for now.',
            statChanges: { diplomacy: +1, stability: +2, military: -2 },
            logText: 'Balanced between rival blocs.'
          }
        ]
      },
      {
        id: 'sabotage',
        title: 'Sabotage in the Docks',
        flavorText: 'Explosions rock supply yards, sowing doubt about security.',
        tags: ['stability', 'military'],
        choices: [
          {
            id: 'tighten-security',
            label: 'Tighten security',
            description: 'Purge suspects and lock down.',
            statChanges: { stability: -2, military: +5, legitimacy: -1 },
            logText: 'Crackdowns restore control at reputational cost.'
          },
          {
            id: 'public-inquiry',
            label: 'Public inquiry',
            description: 'Reveal findings to calm citizens.',
            statChanges: { stability: +2, legitimacy: +3, military: -2 },
            logText: 'Transparency rebuilds trust but slows response.'
          }
        ]
      },
      {
        id: 'intel-coup',
        title: 'Intelligence Windfall',
        flavorText: 'Captured documents outline an enemy timetable.',
        tags: ['military', 'diplomacy'],
        choices: [
          {
            id: 'strike-first',
            label: 'Strike first',
            description: 'Preempt their move.',
            statChanges: { military: +6, diplomacy: -5, legitimacy: -2 },
            logText: 'Preemptive action shocks rivals.'
          },
          {
            id: 'share-allies',
            label: 'Share with allies',
            description: 'Coordinate response.',
            statChanges: { diplomacy: +5, military: +2 },
            logText: 'Built trust through intelligence sharing.'
          }
        ]
      },
      {
        id: 'homefront',
        title: 'Homefront Mobilization',
        flavorText: 'Citizens volunteer to bolster the war effort.',
        tags: ['stability', 'economy'],
        choices: [
          {
            id: 'propaganda',
            label: 'Propaganda blitz',
            description: 'Rally morale with slogans.',
            statChanges: { stability: +4, legitimacy: +2, economy: -1 },
            logText: 'Patriotic messaging unites the populace.'
          },
          {
            id: 'incentives',
            label: 'Economic incentives',
            description: 'Pay bonuses for productivity.',
            statChanges: { economy: -3, stability: +2, military: +2 },
            logText: 'Higher wages increase output and loyalty.'
          }
        ]
      },
      {
        id: 'siege-supply',
        title: 'Siege on Supplies',
        flavorText: 'Enemy submarines choke trade routes.',
        tags: ['economy', 'military'],
        choices: [
          {
            id: 'convoy-system',
            label: 'Organize convoys',
            description: 'Escort merchants heavily.',
            statChanges: { military: +3, economy: +1, diplomacy: -1 },
            logText: 'Convoys reduce losses at higher escort cost.'
          },
          {
            id: 'rationing',
            label: 'Ration goods',
            description: 'Conserve stockpiles.',
            statChanges: { economy: -2, stability: -1, legitimacy: +2 },
            logText: 'Rationing preserves supply but strains patience.'
          }
        ]
      },
      {
        id: 'victory-dawn',
        title: 'Victory or Exile',
        flavorText: 'The war nears conclusion; the world watches your next move.',
        tags: ['ending'],
        turnMin: 10,
        choices: [
          {
            id: 'push-capitulation',
            label: 'Demand surrender',
            description: 'Force total capitulation.',
            statChanges: { military: +4, diplomacy: -3, legitimacy: +2 },
            logText: 'Pressed advantage for an unconditional end.'
          },
          {
            id: 'broker-peace',
            label: 'Broker peace',
            description: 'Seek negotiated stability.',
            statChanges: { diplomacy: +6, stability: +3, military: -2 },
            logText: 'Closed the conflict through diplomacy.'
          }
        ]
      }
    ]
  },
  {
    id: 'iron-curtain-1947',
    title: 'Iron Curtain 1947',
    era: 'Cold War',
    category: 'Historical',
    yearStart: 1947,
    region: 'Europe / Global',
    description: 'The world bifurcates into spheres of influence as reconstruction meets suspicion.',
    tags: ['proxy', 'economy', 'diplomacy'],
    initialStats: {
      stability: 68,
      economy: 63,
      military: 55,
      diplomacy: 70,
      legitimacy: 65
    },
    turnLimit: 14,
    factions: [
      { id: 'east', name: 'Eastern Bloc', color: '#e11d48', description: 'Planned economies bound by ideology.', relations: -10 },
      { id: 'west', name: 'Western Coalition', color: '#2563eb', description: 'Markets, aid plans, and alliances.', relations: 20 },
      { id: 'non-aligned', name: 'Non-Aligned Movement', color: '#22c55e', description: 'States refusing great-power control.', relations: 5 }
    ],
    eventDeck: [
      {
        id: 'marshall',
        title: 'Aid or Alignment',
        flavorText: 'Economic packages arrive with strings attached.',
        tags: ['economy', 'diplomacy'],
        choices: [
          {
            id: 'accept-aid',
            label: 'Accept the aid',
            description: 'Jumpstart recovery.',
            statChanges: { economy: +8, legitimacy: +2, diplomacy: +2 },
            logText: 'Foreign funds rebuild shattered industries.'
          },
          {
            id: 'refuse-aid',
            label: 'Refuse aid',
            description: 'Avoid dependency.',
            statChanges: { economy: -1, legitimacy: +3, stability: +2 },
            logText: 'Self-reliance hardens national resolve.'
          }
        ]
      },
      {
        id: 'espionage',
        title: 'Espionage Web',
        flavorText: 'Spies trade secrets between rival capitals.',
        tags: ['diplomacy', 'stability'],
        choices: [
          {
            id: 'expel-spies',
            label: 'Expel operatives',
            description: 'Dramatic crackdowns.',
            statChanges: { stability: -2, legitimacy: +2, diplomacy: -4 },
            logText: 'Public arrests send a stern message.'
          },
          {
            id: 'double-agents',
            label: 'Turn double agents',
            description: 'Quietly feed disinformation.',
            statChanges: { stability: +1, diplomacy: +2, military: +3 },
            logText: 'Counterintelligence yields strategic advantages.'
          }
        ]
      },
      {
        id: 'airlift',
        title: 'Supply Airlift',
        flavorText: 'A city under blockade depends on your lifeline.',
        tags: ['economy', 'legitimacy'],
        choices: [
          {
            id: 'commit-airlift',
            label: 'Commit resources',
            description: 'Air bridge at any cost.',
            statChanges: { economy: -3, legitimacy: +6, diplomacy: +4 },
            logText: 'Supplies rain from the sky, inspiring the world.'
          },
          {
            id: 'limited-support',
            label: 'Limited sorties',
            description: 'Help but conserve stock.',
            statChanges: { economy: -1, legitimacy: +2, stability: +1 },
            logText: 'A measured response keeps coffers intact.'
          }
        ]
      },
      {
        id: 'proxy-war',
        title: 'Proxy Conflict',
        flavorText: 'A distant flashpoint risks great-power escalation.',
        tags: ['military', 'diplomacy'],
        choices: [
          {
            id: 'arm-allies',
            label: 'Arm local allies',
            description: 'Influence through matériel.',
            statChanges: { military: +5, diplomacy: -3, economy: -2 },
            logText: 'Weapons flow quietly into the conflict.'
          },
          {
            id: 'mediate',
            label: 'Offer mediation',
            description: 'Seek ceasefire.',
            statChanges: { diplomacy: +5, legitimacy: +2, stability: +1 },
            logText: 'Peace talks avert escalation.'
          }
        ]
      },
      {
        id: 'space-race',
        title: 'Spaceflight Gambit',
        flavorText: 'Orbital ambitions capture imaginations worldwide.',
        tags: ['legitimacy', 'economy'],
        choices: [
          {
            id: 'fund-program',
            label: 'Fund rockets',
            description: 'Showcase progress.',
            statChanges: { economy: -4, legitimacy: +6, diplomacy: +2 },
            logText: 'Daring launches inspire citizens and allies.'
          },
          {
            id: 'focus-earth',
            label: 'Focus on earthbound needs',
            description: 'Pragmatism over glory.',
            statChanges: { economy: +2, stability: +2, legitimacy: -2 },
            logText: 'Resources favor infrastructure over spectacle.'
          }
        ]
      },
      {
        id: 'summit',
        title: 'Leaders Summit',
        flavorText: 'Talks about arms control test trust.',
        tags: ['diplomacy'],
        choices: [
          {
            id: 'sign-treaty',
            label: 'Sign reductions',
            description: 'Commit to de-escalation.',
            statChanges: { diplomacy: +6, military: -3, legitimacy: +2 },
            logText: 'A signature eases nuclear fears.'
          },
          {
            id: 'stall',
            label: 'Stall negotiations',
            description: 'Delay to retain leverage.',
            statChanges: { diplomacy: -2, military: +2, stability: +1 },
            logText: 'Hedged bets to keep options open.'
          }
        ]
      },
      {
        id: 'cultural-wave',
        title: 'Cultural Wave',
        flavorText: 'Music and cinema shift global perception.',
        tags: ['legitimacy', 'stability'],
        choices: [
          {
            id: 'promote-art',
            label: 'Promote soft power',
            description: 'Fund touring artists.',
            statChanges: { legitimacy: +4, diplomacy: +3, economy: -1 },
            logText: 'Soft power wins hearts abroad.'
          },
          {
            id: 'censor',
            label: 'Censor imports',
            description: 'Shield domestic values.',
            statChanges: { stability: +2, legitimacy: -3 },
            logText: 'Gatekeeping sparks debate on openness.'
          }
        ]
      },
      {
        id: 'detente',
        title: 'Détente or Division',
        flavorText: 'After crises, a thaw seems possible.',
        tags: ['ending'],
        turnMin: 12,
        choices: [
          {
            id: 'pursue-detente',
            label: 'Pursue détente',
            description: 'Lower tensions and open trade.',
            statChanges: { diplomacy: +7, economy: +3, stability: +2 },
            logText: 'Bridges built across the divide.'
          },
          {
            id: 'double-down',
            label: 'Double down on defense',
            description: 'Maintain pressure.',
            statChanges: { military: +5, diplomacy: -4, stability: +1 },
            logText: 'Prepared for a long rivalry.'
          }
        ]
      }
    ]
  },
  {
    id: 'multipolar-2025',
    title: 'Multipolar World 2025',
    era: 'Modern Day',
    category: 'Historical',
    yearStart: 2025,
    region: 'Global',
    description: 'Competing blocs, trade realignments, and climate urgency define the near future.',
    tags: ['modern', 'climate', 'tech'],
    initialStats: {
      stability: 72,
      economy: 70,
      military: 60,
      diplomacy: 68,
      legitimacy: 75
    },
    turnLimit: 12,
    factions: [
      { id: 'atlantic', name: 'Atlantic Coalition', color: '#38bdf8', description: 'Trade-heavy democracies.', relations: 10 },
      { id: 'pacific', name: 'Pacific Compact', color: '#f97316', description: 'Tech-driven powers.', relations: 5 },
      { id: 'global-south', name: 'Global South Forum', color: '#a3e635', description: 'Rising multipolar voices.', relations: 15 }
    ],
    eventDeck: [
      {
        id: 'supply-chain',
        title: 'Supply Chain Shock',
        flavorText: 'Critical chips go scarce after a port fire.',
        tags: ['economy', 'tech'],
        choices: [
          {
            id: 'nearshore',
            label: 'Nearshore factories',
            description: 'Reshape manufacturing.',
            statChanges: { economy: -2, stability: +2, legitimacy: +1 },
            logText: 'Brought production closer to home.'
          },
          {
            id: 'stockpile',
            label: 'Stockpile imports',
            description: 'Pay premium to secure goods.',
            statChanges: { economy: -3, diplomacy: +2, military: +1 },
            logText: 'Outbid rivals for scarce components.'
          }
        ]
      },
      {
        id: 'energy-transition',
        title: 'Energy Transition',
        flavorText: 'Grid planners debate nuclear vs renewables.',
        tags: ['economy', 'stability'],
        choices: [
          {
            id: 'go-nuclear',
            label: 'Greenlight reactors',
            description: 'Fast baseload buildout.',
            statChanges: { economy: -2, stability: +3, legitimacy: +2 },
            logText: 'Nuclear renaissance steadies the grid.'
          },
          {
            id: 'distributed',
            label: 'Distributed renewables',
            description: 'Local solar cooperatives.',
            statChanges: { economy: -1, diplomacy: +2, stability: +1 },
            logText: 'Neighborhood microgrids bloom nationwide.'
          }
        ]
      },
      {
        id: 'info-war',
        title: 'Information War',
        flavorText: 'Leaked deepfakes spark protests.',
        tags: ['stability', 'legitimacy'],
        choices: [
          {
            id: 'transparency',
            label: 'Radical transparency',
            description: 'Publish forensic proofs.',
            statChanges: { legitimacy: +6, stability: +2, diplomacy: +2 },
            logText: 'Open evidence restores confidence.'
          },
          {
            id: 'censor-fakes',
            label: 'Censor aggressively',
            description: 'Scrub the networks.',
            statChanges: { stability: +1, legitimacy: -4 },
            logText: 'Heavy-handed filters spark backlash.'
          }
        ]
      },
      {
        id: 'climate-accord',
        title: 'Climate Accord',
        flavorText: 'A summit seeks bolder pledges.',
        tags: ['diplomacy', 'economy'],
        choices: [
          {
            id: 'lead-pledge',
            label: 'Lead ambitious cuts',
            description: 'Commit to steep reductions.',
            statChanges: { diplomacy: +5, legitimacy: +4, economy: -3 },
            logText: 'Leadership boosts global standing despite costs.'
          },
          {
            id: 'conditional',
            label: 'Offer conditional targets',
            description: 'Tie cuts to aid.',
            statChanges: { diplomacy: +2, economy: 0, stability: +1 },
            logText: 'Balanced pledges hinge on shared funding.'
          }
        ]
      },
      {
        id: 'orbital-incident',
        title: 'Orbital Incident',
        flavorText: 'A satellite collision threatens critical networks.',
        tags: ['military', 'tech'],
        choices: [
          {
            id: 'debris-clean',
            label: 'Fund debris cleanup',
            description: 'Build laser sweepers.',
            statChanges: { economy: -3, legitimacy: +3, military: +1 },
            logText: 'New tech safeguards the commons.'
          },
          {
            id: 'harden-ground',
            label: 'Harden ground nets',
            description: 'Backup terrestrial links.',
            statChanges: { stability: +2, economy: -1 },
            logText: 'Resilient infrastructure keeps data flowing.'
          }
        ]
      },
      {
        id: 'alliance-shuffle',
        title: 'Alliance Shuffle',
        flavorText: 'A neighbor hints at switching blocs.',
        tags: ['diplomacy', 'military'],
        choices: [
          {
            id: 'offer-pact',
            label: 'Offer security pact',
            description: 'Guarantee defense.',
            statChanges: { diplomacy: +4, military: -2, legitimacy: +1 },
            logText: 'Assurances keep allies close.'
          },
          {
            id: 'economic-ties',
            label: 'Deepen trade',
            description: 'Weave markets tighter.',
            statChanges: { economy: +3, diplomacy: +2 },
            logText: 'Shared prosperity outshines rival bids.'
          }
        ]
      },
      {
        id: 'urban-unrest',
        title: 'Urban Unrest',
        flavorText: 'Cost-of-living protests erupt downtown.',
        tags: ['stability', 'economy'],
        choices: [
          {
            id: 'price-freeze',
            label: 'Freeze prices',
            description: 'Intervene directly.',
            statChanges: { economy: -4, stability: +4, legitimacy: +1 },
            logText: 'Controls ease tensions but stress markets.'
          },
          {
            id: 'cash-relief',
            label: 'Cash relief',
            description: 'Target households.',
            statChanges: { economy: -2, stability: +2, diplomacy: +1 },
            logText: 'Transfers calm streets with moderate cost.'
          }
        ]
      },
      {
        id: 'quiet-handover',
        title: 'Peaceful Transition',
        flavorText: 'Elections conclude with a calm handover of power.',
        tags: ['ending'],
        turnMin: 11,
        choices: [
          {
            id: 'celebrate',
            label: 'Celebrate consensus',
            description: 'Lean into the stability boost.',
            statChanges: { stability: +5, legitimacy: +4, diplomacy: +2 },
            logText: 'A rare moment of unity strengthens institutions.'
          },
          {
            id: 'push-reforms',
            label: 'Push bold reforms',
            description: 'Spend political capital.',
            statChanges: { legitimacy: +3, economy: -2, military: -1 },
            logText: 'Rode goodwill to enact change.'
          }
        ]
      }
    ]
  },
  {
    id: "kaiser-triumph",
    title: "The Kaiser's Triumph",
    era: 'WW1',
    category: 'AltHistorical',
    yearStart: 1917,
    region: 'Europe',
    description: 'An early breakthrough leaves empires scrambling to redraw the continent.',
    tags: ['alternate', 'imperial'],
    initialStats: {
      stability: 55,
      economy: 60,
      military: 78,
      diplomacy: 50,
      legitimacy: 58
    },
    turnLimit: 10,
    factions: [
      { id: 'reich', name: 'Imperial Directorate', color: '#facc15', description: 'Victorious yet stretched administration.', relations: 10 },
      { id: 'entente', name: 'Entente Remnants', color: '#1d4ed8', description: 'Retreating but resilient allies.', relations: -20 },
      { id: 'rebels', name: 'Liberation Fronts', color: '#ef4444', description: 'Uprisings across occupied territories.', relations: -10 }
    ],
    eventDeck: [
      {
        id: 'occupation',
        title: 'Occupation Strains',
        flavorText: 'Supply lines groan under the weight of new territories.',
        tags: ['economy', 'stability'],
        choices: [
          {
            id: 'levy-taxes',
            label: 'Levy heavy taxes',
            description: 'Extract resources fast.',
            statChanges: { economy: +5, stability: -4, legitimacy: -2 },
            logText: 'Harsh levies fill coffers but inflame dissent.'
          },
          {
            id: 'infrastructure',
            label: 'Invest in infrastructure',
            description: 'Stabilize regions.',
            statChanges: { economy: -3, stability: +4, legitimacy: +2 },
            logText: 'Rail lines pacify territories and spur loyalty.'
          }
        ]
      },
      {
        id: 'naval-race',
        title: 'Naval Race Continues',
        flavorText: 'Rivals expand fleets to contest the seas.',
        tags: ['military', 'economy'],
        choices: [
          {
            id: 'build-dreadnoughts',
            label: 'Build dreadnoughts',
            description: 'Impose maritime dominance.',
            statChanges: { military: +6, economy: -3, diplomacy: -2 },
            logText: 'Steel giants slide into the water.'
          },
          {
            id: 'sub-focus',
            label: 'Submarine focus',
            description: 'Asymmetric raiding.',
            statChanges: { military: +3, economy: -1, stability: +1 },
            logText: 'Quiet hunters threaten enemy trade.'
          }
        ]
      },
      {
        id: 'new-order',
        title: 'Designing the New Order',
        flavorText: 'Statesmen debate the post-war balance.',
        tags: ['diplomacy', 'legitimacy'],
        choices: [
          {
            id: 'puppet-states',
            label: 'Create puppet states',
            description: 'Friendly governments, tight control.',
            statChanges: { legitimacy: +2, diplomacy: -2, stability: +1 },
            logText: 'Installed compliant leaders with mixed reception.'
          },
          {
            id: 'confederation',
            label: 'Form a confederation',
            description: 'Shared parliament of nations.',
            statChanges: { diplomacy: +5, legitimacy: +4, economy: -2 },
            logText: 'A lofty union promises enduring peace.'
          }
        ]
      },
      {
        id: 'uprising',
        title: 'Coordinated Uprising',
        flavorText: 'Insurgents strike across multiple cities.',
        tags: ['stability', 'military'],
        choices: [
          {
            id: 'martial-law',
            label: 'Declare martial law',
            description: 'Suspend civil rights.',
            statChanges: { stability: +3, legitimacy: -4, military: +2 },
            logText: 'Iron rule halts chaos but tarnishes image.'
          },
          {
            id: 'amnesty',
            label: 'Offer amnesty',
            description: 'Weaken insurgent resolve.',
            statChanges: { stability: +1, legitimacy: +3, military: -2 },
            logText: 'Clemency splinters rebel leadership.'
          }
        ]
      },
      {
        id: 'tech-twist',
        title: 'Chemical Treaty Debate',
        flavorText: 'Scientists urge a ban on cruel weapons.',
        tags: ['legitimacy', 'military'],
        choices: [
          {
            id: 'sign-ban',
            label: 'Sign the ban',
            description: 'Renounce chemical weapons.',
            statChanges: { legitimacy: +5, military: -3, diplomacy: +2 },
            logText: 'Humanitarian stance wins cautious praise.'
          },
          {
            id: 'secret-stock',
            label: 'Stockpile secretly',
            description: 'Retain deterrent.',
            statChanges: { legitimacy: -3, military: +3, stability: -1 },
            logText: 'Hidden caches promise leverage and risk.'
          }
        ]
      },
      {
        id: 'imperial-court',
        title: 'Imperial Court Intrigue',
        flavorText: 'Nobles vie for favor in the postwar capital.',
        tags: ['legitimacy', 'stability'],
        choices: [
          {
            id: 'meritocracy',
            label: 'Promote meritocrats',
            description: 'Sideline old houses.',
            statChanges: { legitimacy: +4, stability: -1, economy: +2 },
            logText: 'Reforms empower capable administrators.'
          },
          {
            id: 'appease-nobles',
            label: 'Appease nobles',
            description: 'Buy their loyalty.',
            statChanges: { stability: +3, legitimacy: -2, economy: -2 },
            logText: 'Lavish courts secure fragile support.'
          }
        ]
      },
      {
        id: 'winter',
        title: 'Winter Logistics',
        flavorText: 'Snow-choked passes threaten supply.',
        tags: ['economy', 'military'],
        choices: [
          {
            id: 'stock-winter',
            label: 'Stockpile coal',
            description: 'Prepare in advance.',
            statChanges: { economy: -2, stability: +2, military: +1 },
            logText: 'Warm depots keep forces moving.'
          },
          {
            id: 'press-forward',
            label: 'Press the advance',
            description: 'Momentum matters.',
            statChanges: { military: +3, economy: -1, stability: -2 },
            logText: 'Bold offensives brave the cold.'
          }
        ]
      },
      {
        id: 'crowning',
        title: 'Crowning of Heirs',
        flavorText: 'A dynastic celebration signals consolidation.',
        tags: ['ending'],
        turnMin: 9,
        choices: [
          {
            id: 'grand-ceremony',
            label: 'Grand ceremony',
            description: 'Project confidence.',
            statChanges: { legitimacy: +6, stability: +3, economy: -2 },
            logText: 'Pageantry cements the new order.'
          },
          {
            id: 'modest',
            label: 'Modest rites',
            description: 'Focus on rebuilding.',
            statChanges: { legitimacy: +3, economy: +1 },
            logText: 'A humble approach saves resources.'
          }
        ]
      }
    ]
  },
  {
    id: 'solar-concord-2150',
    title: 'Solar Concord 2150',
    era: 'Future',
    category: 'ScienceFiction',
    yearStart: 2150,
    region: 'Solar System',
    description: 'Orbital habitats, Martian republics, and Jovian guilds contest the post-Earth balance.',
    tags: ['space', 'future', 'trade'],
    initialStats: {
      stability: 65,
      economy: 80,
      military: 60,
      diplomacy: 70,
      legitimacy: 68
    },
    turnLimit: 12,
    factions: [
      { id: 'martian', name: 'Martian Syndicates', color: '#f97316', description: 'Clans steering red planet commerce.', relations: 5 },
      { id: 'orbital', name: 'Orbital League', color: '#22d3ee', description: 'Station councils guarding the skyways.', relations: 10 },
      { id: 'jovian', name: 'Jovian Guilds', color: '#a855f7', description: 'Outer-system magnates with deep coffers.', relations: 0 }
    ],
    eventDeck: [
      {
        id: 'helium-rights',
        title: 'Helium-3 Rights',
        flavorText: 'Moon miners petition for royalties.',
        tags: ['economy', 'legitimacy'],
        choices: [
          {
            id: 'grant-royalties',
            label: 'Grant royalties',
            description: 'Share profits.',
            statChanges: { economy: -3, stability: +2, legitimacy: +4 },
            logText: 'Fair shares keep miners loyal.'
          },
          {
            id: 'retain-state',
            label: 'Retain state control',
            description: 'Prioritize central budgets.',
            statChanges: { economy: +2, legitimacy: -2, diplomacy: -1 },
            logText: 'Central control funds fleets, at political cost.'
          }
        ]
      },
      {
        id: 'gravity-well',
        title: 'Gravity Well Piracy',
        flavorText: 'Corsairs ambush ships at planetary wells.',
        tags: ['military', 'stability'],
        choices: [
          {
            id: 'escort',
            label: 'Escort convoys',
            description: 'Deploy frigates with freighters.',
            statChanges: { military: +4, economy: -2, stability: +1 },
            logText: 'Protected lanes restore confidence.'
          },
          {
            id: 'bounty',
            label: 'Bounty program',
            description: 'Privateers hunt pirates.',
            statChanges: { military: +2, economy: -1, legitimacy: +1 },
            logText: 'Licensed hunters keep trade safer.'
          }
        ]
      },
      {
        id: 'ai-charter',
        title: 'AI Governance Charter',
        flavorText: 'Sentient AIs demand representation.',
        tags: ['legitimacy', 'diplomacy'],
        choices: [
          {
            id: 'grant-seats',
            label: 'Grant assembly seats',
            description: 'Welcome synthetic voices.',
            statChanges: { legitimacy: +5, diplomacy: +2, stability: +1 },
            logText: 'Inclusivity eases tensions between minds.'
          },
          {
            id: 'limited-access',
            label: 'Limited participation',
            description: 'Observe with caution.',
            statChanges: { legitimacy: -2, stability: +2, economy: +1 },
            logText: 'Careful oversight keeps humans reassured.'
          }
        ]
      },
      {
        id: 'terraform',
        title: 'Terraforming Budget',
        flavorText: 'Martian councils request extra funding.',
        tags: ['economy', 'stability'],
        choices: [
          {
            id: 'fund-terraform',
            label: 'Fund fully',
            description: 'Push atmospheric processors.',
            statChanges: { economy: -4, stability: +3, legitimacy: +2 },
            logText: 'Red horizon grows greener under massive spending.'
          },
          {
            id: 'delay',
            label: 'Delay phases',
            description: 'Conserve resources.',
            statChanges: { economy: +1, stability: -2 },
            logText: 'Caution slows the dream, frustrating colonists.'
          }
        ]
      },
      {
        id: 'jovian-credit',
        title: 'Jovian Credit Crunch',
        flavorText: 'Outer guild loans tighten suddenly.',
        tags: ['economy', 'diplomacy'],
        choices: [
          {
            id: 'backstop',
            label: 'Backstop loans',
            description: 'Guarantee liquidity.',
            statChanges: { economy: -3, diplomacy: +3, stability: +1 },
            logText: 'Emergency credit prevents collapse.'
          },
          {
            id: 'let-reset',
            label: 'Let markets reset',
            description: 'Painful but cleansing.',
            statChanges: { economy: -1, legitimacy: -2, stability: -1 },
            logText: 'Defaults ripple but clear bad debt.'
          }
        ]
      },
      {
        id: 'rift-ceremony',
        title: 'Rift Passage Ceremony',
        flavorText: 'A new wormhole gate opens to cheers.',
        tags: ['legitimacy', 'diplomacy'],
        choices: [
          {
            id: 'invite-all',
            label: 'Invite all factions',
            description: 'Shared prosperity.',
            statChanges: { legitimacy: +4, diplomacy: +4, economy: +1 },
            logText: 'Unity at the gateway boosts trust.'
          },
          {
            id: 'exclusive',
            label: 'Exclusive control',
            description: 'Claim priority rights.',
            statChanges: { economy: +3, diplomacy: -3, legitimacy: -2 },
            logText: 'Exclusive claims spark quiet resentment.'
          }
        ]
      },
      {
        id: 'exo-threat',
        title: 'Exo Threat Rumors',
        flavorText: 'Sensors detect unknown craft near Neptune.',
        tags: ['military', 'stability'],
        choices: [
          {
            id: 'deploy-fleet',
            label: 'Deploy response fleet',
            description: 'Show readiness.',
            statChanges: { military: +5, economy: -2, stability: +1 },
            logText: 'Patrols reassure colonies.'
          },
          {
            id: 'silent-watch',
            label: 'Observe silently',
            description: 'Avoid provoking.',
            statChanges: { diplomacy: +2, military: -1, legitimacy: +1 },
            logText: 'Covert monitoring keeps options open.'
          }
        ]
      },
      {
        id: 'golden-era',
        title: 'Golden Era or Fracture',
        flavorText: 'Your stewardship shapes the Solar Concord legacy.',
        tags: ['ending'],
        turnMin: 11,
        choices: [
          {
            id: 'golden-era',
            label: 'Declare Golden Era',
            description: 'Celebrate unity and prosperity.',
            statChanges: { legitimacy: +6, stability: +3, diplomacy: +3 },
            logText: 'A jubilant milestone cements harmony.'
          },
          {
            id: 'fortify',
            label: 'Fortify perimeters',
            description: 'Prepare for uncertain skies.',
            statChanges: { military: +5, economy: -2, stability: +1 },
            logText: 'Preparedness defines your twilight years.'
          }
        ]
      }
    ]
  },
  {
    id: 'shattered-empire',
    title: 'The Shattered Empire',
    era: 'Fantasy',
    category: 'Fantasy',
    yearStart: 1025,
    region: 'Mythic Continent',
    description: 'Ancient provinces splinter as rival houses and mages vie for the throne.',
    tags: ['magic', 'dynasty'],
    initialStats: {
      stability: 50,
      economy: 55,
      military: 65,
      diplomacy: 52,
      legitimacy: 48
    },
    turnLimit: 10,
    factions: [
      { id: 'north', name: 'House Northwind', color: '#60a5fa', description: 'Frozen keepers of old vows.', relations: 5 },
      { id: 'spire', name: 'Azur Spire', color: '#22d3ee', description: 'Mage conclave guarding arcane lore.', relations: 0 },
      { id: 'dunes', name: 'Dune Riders', color: '#facc15', description: 'Desert riders mastering trade routes.', relations: 10 }
    ],
    eventDeck: [
      {
        id: 'crown-fragments',
        title: 'Fragments of the Crown',
        flavorText: 'Relics resurface, each shard coveted.',
        tags: ['legitimacy', 'diplomacy'],
        choices: [
          {
            id: 'share-relics',
            label: 'Share relics',
            description: 'Bind factions with ritual.',
            statChanges: { legitimacy: +5, diplomacy: +3, stability: +2 },
            logText: 'Shared rites renew ancient bonds.'
          },
          {
            id: 'hoard',
            label: 'Hoard them',
            description: 'Centralize power.',
            statChanges: { legitimacy: -2, stability: -1, military: +3 },
            logText: 'Secrecy fuels suspicion but strengthens claim.'
          }
        ]
      },
      {
        id: 'dragon',
        title: 'Dragon Demands Tribute',
        flavorText: 'A drake offers protection for a price.',
        tags: ['stability', 'military'],
        choices: [
          {
            id: 'pay-dragon',
            label: 'Pay the tribute',
            description: 'Buy safety.',
            statChanges: { economy: -4, stability: +3, legitimacy: +1 },
            logText: 'Gold buys a fiery guardian.'
          },
          {
            id: 'slay',
            label: 'Attempt the slay',
            description: 'Rally heroes.',
            statChanges: { military: +5, stability: -2, legitimacy: +2 },
            logText: 'A daring hunt could reshape legends.'
          }
        ]
      },
      {
        id: 'fey-treaty',
        title: 'Treaty with the Fey',
        flavorText: 'Spirits demand respect for the old forests.',
        tags: ['diplomacy', 'legitimacy'],
        choices: [
          {
            id: 'sign-pact',
            label: 'Sign the pact',
            description: 'Honor ancient customs.',
            statChanges: { diplomacy: +4, legitimacy: +3, stability: +1 },
            logText: 'Fey blessings sweeten your rule.'
          },
          {
            id: 'ignore',
            label: 'Ignore the spirits',
            description: 'Prioritize expansion.',
            statChanges: { economy: +2, legitimacy: -4, stability: -2 },
            logText: 'Sacred groves fall to axes, angering the wilds.'
          }
        ]
      },
      {
        id: 'guild-strike',
        title: 'Guild Strike',
        flavorText: 'Craftsmen halt production over levies.',
        tags: ['economy', 'stability'],
        choices: [
          {
            id: 'reduce-levy',
            label: 'Reduce the levy',
            description: 'Placate guilds.',
            statChanges: { economy: -2, stability: +3, legitimacy: +2 },
            logText: 'Concessions restart the forges.'
          },
          {
            id: 'bring-scabs',
            label: 'Import labor',
            description: 'Keep production moving.',
            statChanges: { economy: +1, stability: -3, military: +2 },
            logText: 'Replacement crews work under guard.'
          }
        ]
      },
      {
        id: 'oracle',
        title: 'The Oracle Speaks',
        flavorText: 'Visions warn of a coming eclipse.',
        tags: ['legitimacy', 'stability'],
        choices: [
          {
            id: 'prepare-ritual',
            label: 'Prepare the ritual',
            description: 'Appease omens.',
            statChanges: { legitimacy: +4, stability: +2, economy: -1 },
            logText: 'Rituals soothe the fearful masses.'
          },
          {
            id: 'dismiss',
            label: 'Dismiss superstition',
            description: 'Stay pragmatic.',
            statChanges: { legitimacy: -2, economy: +1, diplomacy: +1 },
            logText: 'Skepticism charms scholars but worries believers.'
          }
        ]
      },
      {
        id: 'border-riders',
        title: 'Border Riders',
        flavorText: 'Nomads raid frontier hamlets.',
        tags: ['military', 'stability'],
        choices: [
          {
            id: 'fortify',
            label: 'Fortify walls',
            description: 'Hold the lines.',
            statChanges: { military: +3, economy: -2, stability: +2 },
            logText: 'Stone bastions deter incursions.'
          },
          {
            id: 'parley',
            label: 'Parley with riders',
            description: 'Trade horses for peace.',
            statChanges: { diplomacy: +3, stability: +1, military: -2 },
            logText: 'Gifts open a tenuous truce.'
          }
        ]
      },
      {
        id: 'arcane-surge',
        title: 'Arcane Surge',
        flavorText: 'Wild magic ripples through the capital.',
        tags: ['legitimacy', 'stability'],
        choices: [
          {
            id: 'mage-guards',
            label: 'Deploy mage-guards',
            description: 'Contain the surge.',
            statChanges: { stability: +2, military: +2, legitimacy: +1 },
            logText: 'Discipline channels dangerous energies.'
          },
          {
            id: 'study',
            label: 'Study the surge',
            description: 'Risky research.',
            statChanges: { legitimacy: +2, economy: +2, stability: -2 },
            logText: 'Scholarship yields breakthroughs and mishaps.'
          }
        ]
      },
      {
        id: 'throne-ascend',
        title: 'Ascendancy or Ruin',
        flavorText: 'The shards align; the empire may be reborn.',
        tags: ['ending'],
        turnMin: 9,
        choices: [
          {
            id: 'unite',
            label: 'Unite the realms',
            description: 'Forge a single banner.',
            statChanges: { legitimacy: +7, stability: +4, diplomacy: +3 },
            logText: 'Crowns bow to a restored throne.'
          },
          {
            id: 'fragment',
            label: 'Rule through vassals',
            description: 'Looser federation.',
            statChanges: { legitimacy: +3, diplomacy: +2, economy: +1 },
            logText: 'Autonomy buys peace and trade.'
          }
        ]
      }
    ]
  }
];

export const allFactions = scenarios.flatMap((scenario) => scenario.factions);

export default scenarios;
