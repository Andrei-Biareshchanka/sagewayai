export const CATEGORIES = [
  'All',
  'Wisdom',
  'Motivation',
  'Leadership',
  'Journey',
  'Loss',
  'Risk',
  'Trust',
  'Meaning',
];

export interface Parable {
  id: string;
  title: string;
  content: string;
  moral: string;
  source?: string;
  readTime: number;
  category: string;
}

export const DAILY_PARABLE: Parable = {
  id: '1',
  title: 'The Farmer and His Field',
  content:
    'An old farmer, exhausted from fighting rocky soil, sold his land for almost nothing and moved to the city. The buyer, intrigued by the strange stones, called a geologist — and discovered one of the richest gold veins in the region lay beneath the field.',
  moral: 'What looks like an obstacle may be a gift — if you learn to see it differently.',
  source: 'Folk wisdom',
  readTime: 3,
  category: 'Wisdom',
};

export const PARABLES: Parable[] = [
  {
    id: '2',
    title: 'Two Wolves',
    content: 'A grandfather tells his grandson about the battle that rages inside every person.',
    moral: 'The wolf that wins is the one you feed.',
    source: 'Cherokee',
    readTime: 2,
    category: 'Meaning',
  },
  {
    id: '3',
    title: 'The Bamboo and the Oak',
    content:
      'In a great storm, the mighty oak snapped — while the flexible bamboo bent to the ground and rose again.',
    moral: 'Flexibility outlasts rigidity.',
    readTime: 2,
    category: 'Motivation',
  },
  {
    id: '4',
    title: 'The Bridge Builder',
    content:
      'An old man crosses a chasm at sunset, then turns back to build a bridge — for those who will follow.',
    moral: 'Wisdom means building roads for people you will never meet.',
    source: 'Will Allen Dromgoole',
    readTime: 3,
    category: 'Journey',
  },
];
