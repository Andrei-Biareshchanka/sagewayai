export const TOPICS = [
  'All',
  'Purpose',
  'Leadership',
  'Resilience',
  'Risk',
  'Path',
  'Loss',
  'Trust',
  'Change',
  'Gratitude',
  'Courage',
];

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  topic: string;
  type: 'parable' | 'success_story';
  readTime: number;
  author: string;
}

export const FEATURED_STORY: Story = {
  id: '1',
  title: 'The Farmer Who Sold His Field',
  excerpt:
    'An old farmer, tired of struggling with his rocky land, sold it for almost nothing and moved to the city. The buyer, curious about the strange stones, brought in a geologist — and discovered the field sat atop one of the richest gold veins in the region.',
  topic: 'Resilience',
  type: 'parable',
  readTime: 4,
  author: 'Ancient wisdom',
};

export const MINI_STORIES: Story[] = [
  {
    id: '2',
    title: 'The Two Wolves',
    excerpt: 'A grandfather tells his grandson about the battle inside every person.',
    topic: 'Purpose',
    type: 'parable',
    readTime: 2,
    author: 'Cherokee tradition',
  },
  {
    id: '3',
    title: 'How Howard Schultz Rebuilt Starbucks',
    excerpt:
      'After stepping away for eight years, Schultz returned to a company that had lost its soul — and chose discomfort over decline.',
    topic: 'Leadership',
    type: 'success_story',
    readTime: 5,
    author: 'Starbucks story',
  },
  {
    id: '4',
    title: 'The Bridge Builder',
    excerpt:
      'An old man, crossing a chasm at dusk, turns back to build a bridge for those who will follow.',
    topic: 'Courage',
    type: 'parable',
    readTime: 3,
    author: 'Will Allen Dromgoole',
  },
];
