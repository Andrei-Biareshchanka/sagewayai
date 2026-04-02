import { Link } from 'react-router-dom';
import type { Story } from './mockData';

interface StoryMiniCardProps {
  story: Story;
}

function StoryMiniCard({ story }: StoryMiniCardProps) {
  return (
    <Link
      to={`/stories/${story.id}`}
      className="group flex flex-col rounded-[12px] border border-[rgba(0,0,0,0.08)] bg-white p-6 transition-shadow hover:shadow-sm"
    >
      <span className="mb-3 text-[11px] font-medium uppercase tracking-[0.5px] text-[#6B8F71]">
        {story.topic}
      </span>

      <h3 className="mb-3 font-serif text-xl font-semibold leading-snug text-[#1A1A1A] group-hover:text-[#6B8F71] transition-colors">
        {story.title}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-[#6B7280]">
        {story.excerpt}
      </p>

      <span className="text-xs text-[#6B7280]">{story.readTime} min read</span>
    </Link>
  );
}

export { StoryMiniCard };
