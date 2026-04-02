# /new-story

Create a new story for SagewayAI following the project conventions.

## What to do

1. **Ask the user for** (if not already provided in $ARGUMENTS):
   - Title
   - Type: `parable` or `success_story`
   - Topic (one of: Purpose, Leadership, Resilience, Risk, Path, Loss, Trust, Change, Gratitude, Courage)
   - Content (the full story text)
   - Author / source (optional)

2. **Calculate read time**: count words in content, divide by 200, round up to nearest minute.

3. **Create the story object** following the `Story` interface from `client/src/home/mockData.ts`:

```ts
{
  id: '<unique-id>',
  title: '<title>',
  excerpt: '<first 1-2 sentences of content>',
  topic: '<topic>',
  type: 'parable' | 'success_story',
  readTime: <minutes>,
  author: '<author>',
}
```

4. **Add to mock data** (`client/src/home/mockData.ts`) in the `MINI_STORIES` array for now. When the server API is ready, stories will come from the database instead.

5. **Confirm** with the user what was added and where.

## Conventions to follow

- Story content should be 200–1500 words
- Excerpt = first 1–2 sentences, max 200 characters
- Title: title case, concise (3–8 words ideal)
- Type `parable`: timeless, fictional or traditional story with a moral
- Type `success_story`: real person or company, specific and grounded

## Example usage

```
/new-story title="The Two Seeds" type=parable topic=Resilience
```

or just:

```
/new-story
```

Claude will ask for the missing details.
