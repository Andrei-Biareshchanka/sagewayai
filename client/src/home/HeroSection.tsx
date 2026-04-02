import { TOPICS } from './mockData';

interface HeroSectionProps {
  onTopicChange: (topic: string) => void;
  activeTopic: string;
}

function HeroSection({ onTopicChange, activeTopic }: HeroSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.5px] text-[#6B7280]">
        Wisdom library
      </p>

      <h1 className="mb-10 max-w-2xl font-serif text-5xl font-semibold leading-tight text-[#1A1A1A]">
        The right story{' '}
        <em className="font-normal italic text-[#6B8F71]">for this moment</em>
      </h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicChange(topic)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeTopic === topic
                ? 'bg-[#6B8F71] text-white'
                : 'bg-[#E8F0E8] text-[#3D6142] hover:bg-[#d8e8d8]'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
    </section>
  );
}

export { HeroSection };
