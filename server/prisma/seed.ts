import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  { name: 'Wisdom', slug: 'wisdom', color: '#6B8F71', description: 'Ancient and timeless wisdom' },
  { name: 'Motivation', slug: 'motivation', color: '#E07B54', description: 'Stories that inspire action' },
  { name: 'Leadership', slug: 'leadership', color: '#5B7FA6', description: 'Lessons of great leaders' },
  { name: 'Journey', slug: 'journey', color: '#9B7EC8', description: 'The path of self-discovery' },
  { name: 'Loss', slug: 'loss', color: '#7A8A8C', description: 'Finding meaning through loss' },
  { name: 'Risk', slug: 'risk', color: '#D4A017', description: 'Courage to take the leap' },
  { name: 'Trust', slug: 'trust', color: '#4A90A4', description: 'The foundation of connection' },
  { name: 'Meaning', slug: 'meaning', color: '#8B6F47', description: 'In search of purpose' },
];

const PARABLES: Record<string, { title: string; content: string; moral: string; readTime: number }> = {
  wisdom: {
    title: 'The Empty Cup',
    content: `A scholar came to visit a Zen master, seeking to learn about wisdom. The master began pouring tea into the scholar's cup. He poured and poured, until the tea overflowed onto the table, yet still he continued pouring.

"Stop! The cup is full — no more will go in!" cried the scholar.

The master set down the teapot and said quietly, "Like this cup, you are full of your own opinions and knowledge. How can I show you wisdom unless you first empty your cup?"

The scholar sat in silence for a long time, then slowly set down his books.`,
    moral: 'To learn, we must first be willing to unlearn.',
    readTime: 2,
  },
  motivation: {
    title: 'The Butterfly Struggle',
    content: `A man found a cocoon with a butterfly struggling to emerge. Wanting to help, he carefully widened the opening.

The butterfly crawled out easily — but its wings were shriveled and its body swollen. It spent the rest of its life unable to fly.

The man had not understood: the struggle through the narrow opening was nature's way of forcing fluid from the body into the wings, making them strong.

The struggle the man had removed was the very thing that would have made the butterfly soar.`,
    moral: 'Struggle is not the enemy of growth — it is the mechanism of it.',
    readTime: 2,
  },
  leadership: {
    title: 'The General and the Cook',
    content: `Prince Hui's cook was butchering an ox. Every movement of his hands, every step of his feet, every cut of his blade was perfectly harmonious — as if performing a dance.

"How skilled you are!" said the Prince.

"What I follow is the Tao," said the cook, "which is beyond skill. I work with my mind and not with my eye. My mind works along without the control of the senses. Falling back upon eternal principles, I glide through such great joints as there may be, according to the natural constitution of the animal."`,
    moral: 'True mastery means working with the grain of things, not against them.',
    readTime: 2,
  },
  journey: {
    title: 'Two Monks and a River',
    content: `Two monks were walking when they came to a river with a strong current. A young woman stood at the bank, unable to cross.

The older monk, though their order forbade touching women, offered her his help. She accepted, and he carried her across. He set her down on the other side and the monks continued on their way.

Hours later, the younger monk could no longer contain himself. "How could you carry her? Our rules forbid it."

The older monk smiled. "I set her down hours ago. Why are you still carrying her?"`,
    moral: 'We suffer more from imagination than from reality.',
    readTime: 2,
  },
  loss: {
    title: 'The Mustard Seed',
    content: `Kisa Gotami lost her young son and, mad with grief, carried his body through the village begging for medicine to revive him.

Someone sent her to the Buddha. "Bring me a handful of mustard seeds," he said, "from a house where no one has died."

She went from house to house, but in every home she heard: a husband, a child, a parent had died there. By evening, she gently laid her son to rest.

She returned to the Buddha and said, "I understand now. Death is not mine alone."`,
    moral: 'Grief shared is the beginning of healing.',
    readTime: 3,
  },
  risk: {
    title: 'The Leap of the Frog',
    content: `Five frogs sat on a log. Four decided to jump off.

How many frogs were left on the log?

Five.

There is a difference between deciding and doing.

The frog who truly understood this had already leapt into the pond, not knowing its depth — and discovered it could swim.`,
    moral: 'Deciding is not doing. The gap between them is where dreams die.',
    readTime: 1,
  },
  trust: {
    title: 'The Bridge Builder',
    content: `An old man, traveling a lone highway, came at evening cold and gray to a chasm vast and wide. He crossed by a bridge of skill and care, safe in the twilight dim and pale.

But when he reached the other side, he turned and built a bridge back over.

A fellow traveler said: "Old man, you crossed this chasm safely — why build a bridge you'll never cross again?"

The builder replied: "A youth is following behind me whose path this night must also be made."`,
    moral: 'Trust is built not for ourselves, but for those who come after.',
    readTime: 2,
  },
  meaning: {
    title: 'The Stonecutters',
    content: `A traveler came upon three stonecutters working in a quarry.

"What are you doing?" she asked the first.

"I am cutting stone," he said without looking up.

She asked the second. He paused and said, "I am earning my wage so my family can eat."

She asked the third. He set down his chisel, looked at the half-finished block, and said with quiet pride:

"I am building a cathedral."`,
    moral: 'The same work done for meaning becomes something entirely different.',
    readTime: 2,
  },
};

async function main() {
  console.log('Seeding database...');

  for (const categoryData of CATEGORIES) {
    const parable = PARABLES[categoryData.slug];

    await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: {
        name: categoryData.name,
        slug: categoryData.slug,
        color: categoryData.color,
        description: categoryData.description,
        parablesCount: 1,
        parables: {
          create: {
            title: parable.title,
            content: parable.content,
            moral: parable.moral,
            readTime: parable.readTime,
          },
        },
      },
    });

    console.log(`  ✓ ${categoryData.name}`);
  }

  console.log(`Seeded ${CATEGORIES.length} categories and ${CATEGORIES.length} parables.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
