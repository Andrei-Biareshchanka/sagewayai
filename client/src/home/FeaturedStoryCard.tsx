import { Link } from 'react-router-dom';
import { Story } from './mockData';

interface FeaturedStoryCardProps {
  story: Story;
}

function FeaturedStoryCard({ story }: FeaturedStoryCardProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-12">
      <div className="rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-[#F0F4F0] p-10">
        <div className="mb-5 flex items-center gap-3">
          <span className="rounded-full bg-[#6B8F71] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.5px] text-white">
            Featured story
          </span>
          <span className="text-[11px] uppercase tracking-[0.5px] text-[#6B7280]">
            {story.topic}
          </span>
        </div>

        <h2 className="mb-4 max-w-2xl font-serif text-4xl font-semibold leading-snug text-[#1A1A1A]">
          {story.title}
        </h2>

        <p className="mb-8 max-w-2xl text-base leading-relaxed text-[#6B7280]">
          {story.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B7280]">{story.readTime} min read · {story.author}</span>
          <Link
            to={`/stories/${story.id}`}
            className="rounded-full border border-[#6B8F71] px-6 py-2 text-sm font-medium text-[#6B8F71] transition-colors hover:bg-[#6B8F71] hover:text-white"
          >
            Read story
          </Link>
        </div>
      </div>
    </div>
  );
}

export { FeaturedStoryCard };
