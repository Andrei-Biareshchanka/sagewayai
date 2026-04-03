import { useState } from 'react';
import { HeroSection } from './HeroSection';
import { DailyParableCard } from './FeaturedStoryCard';
import { ParableCard } from './StoryMiniCard';
import { DAILY_PARABLE, PARABLES } from './mockData';

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <main>
      <HeroSection activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <DailyParableCard parable={DAILY_PARABLE} />

      <section className="mx-auto max-w-[1200px] px-6 pb-20">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-[#1A1A1A]">
          More parables
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {PARABLES.map((parable) => (
            <ParableCard key={parable.id} parable={parable} />
          ))}
        </div>
      </section>
    </main>
  );
}

export { HomePage };
