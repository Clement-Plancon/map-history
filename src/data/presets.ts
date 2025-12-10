import scenarios from './scenarios';
import { Era, PresetCategory, Scenario } from '../types';

export type PresetGrouping = {
  category: PresetCategory;
  byEra: Record<Era, Scenario[]>;
};

const grouped: PresetGrouping[] = [];

const categories: PresetCategory[] = ['Historical', 'AltHistorical', 'HistoricalFiction', 'ScienceFiction', 'Fantasy', 'CreatorTemplates'];

categories.forEach((cat) => {
  const byEra: Record<Era, Scenario[]> = {
    'Medieval': [],
    'Renaissance': [],
    'Age of Discovery': [],
    'Industrial': [],
    'WW1': [],
    'Interwar': [],
    'WW2': [],
    'Cold War': [],
    'Modern Day': [],
    'Future': [],
    'Fantasy': []
  };

  scenarios
    .filter((s) => s.category === cat)
    .forEach((s) => {
      byEra[s.era].push(s);
    });

  grouped.push({ category: cat, byEra });
});

export const presetGroupings = grouped;
