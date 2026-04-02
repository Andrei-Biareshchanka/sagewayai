import { useState } from 'react';
import { HeroSection } from './HeroSection';
import { FeaturedStoryCard } from './FeaturedStoryCard';
import { StoryMiniCard } from './StoryMiniCard';
import { FEATURED_STORY, MINI_STORIES } from './mockData';

function HomePage() {
  const [activeTopic, setActiveTopic] = useState('All');

  return (
    <main>
      <HeroSection activeTopic={activeTopic} onTopicChange={setActiveTopic} />
      <FeaturedStoryCard story={FEATURED_STORY} />

      <section className="mx-auto max-w-[1200px] px-6 pb-20">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-[#1A1A1A]">
          More stories
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {MINI_STORIES.map((story) => (
            <StoryMiniCard key={story.id} story={story} />
          ))}
        </div>
      </section>
    </main>
  );
}

export { HomePage };
