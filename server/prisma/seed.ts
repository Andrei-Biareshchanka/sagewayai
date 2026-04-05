import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] });
const prisma = new PrismaClient({ adapter });

interface ParableData {
  title: string;
  content: string;
  moral: string;
  readTime: number;
}

const CATEGORIES = [
  { name: 'Wisdom', slug: 'wisdom', color: '#6B8F71', description: 'Ancient and timeless wisdom' },
  { name: 'Motivation', slug: 'motivation', color: '#E07B54', description: 'Stories that inspire action' },
  { name: 'Leadership', slug: 'leadership', color: '#5B7FA6', description: 'Lessons of great leaders' },
  { name: 'Journey', slug: 'journey', color: '#9B7EC8', description: 'The path of self-discovery' },
  { name: 'Loss', slug: 'loss', color: '#7A8A8C', description: 'Finding meaning through loss' },
  { name: 'Risk', slug: 'risk', color: '#D4A017', description: 'Courage to take the leap' },
  { name: 'Trust', slug: 'trust', color: '#4A90A4', description: 'The foundation of connection' },
  { name: 'Meaning', slug: 'meaning', color: '#8B6F47', description: 'In search of purpose' },
] as const;

const PARABLES: Record<string, ParableData[]> = {
  wisdom: [
    {
      title: 'The Empty Cup',
      content: `A scholar came to visit a Zen master, seeking to learn about wisdom. The master began pouring tea into the scholar's cup. He poured and poured, until the tea overflowed onto the table, yet still he continued pouring.

"Stop! The cup is full — no more will go in!" cried the scholar.

The master set down the teapot and said quietly, "Like this cup, you are full of your own opinions and knowledge. How can I show you wisdom unless you first empty your cup?"

The scholar sat in silence for a long time, then slowly set down his books.`,
      moral: 'To learn, we must first be willing to unlearn.',
      readTime: 2,
    },
    {
      title: 'The Second Arrow',
      content: `A student asked the Buddha: "If someone shoots you with an arrow, that is pain. But if you then spend the rest of the day lamenting the arrow, cursing the archer, worrying about infection — is that not a second arrow you shoot into yourself?"

The student said nothing.

"The first arrow is unavoidable," the Buddha continued. "It is the nature of life. But the second arrow — suffering over the suffering — this is the one we choose."

That night, the student slept more peacefully than he had in years.`,
      moral: 'Pain is inevitable. Suffering is optional.',
      readTime: 2,
    },
    {
      title: 'The Salt in the Water',
      content: `An unhappy young man came to an old teacher and said his life was full of bitterness.

The old man handed him a cup of water and poured a handful of salt into it. "Drink," he said. The young man drank and winced.

Then the teacher led him to a clear lake and poured another handful of salt into the water. "Now drink from the lake."

The young man drank. The water was sweet.

"The pain of life is pure salt," said the teacher. "The amount is the same. But what you taste depends on the vessel you put it in."`,
      moral: 'The bitterness of pain depends on the size of the heart that holds it.',
      readTime: 2,
    },
    {
      title: 'The Two Wolves',
      content: `A grandfather told his grandson: "Inside every person, two wolves are fighting. One is full of anger, envy, greed, and pride. The other is full of kindness, humility, compassion, and love."

The boy thought for a moment. "Which wolf wins?"

The grandfather said, "The one you feed."`,
      moral: 'We become what we give our attention to.',
      readTime: 1,
    },
    {
      title: 'The Cracked Pot',
      content: `A water bearer carried two pots on a yoke. One pot was perfect; the other had a crack and leaked half its water by journey's end.

The cracked pot was ashamed. "I am sorry. Because of my flaw, you carry only half a load."

The bearer smiled. "Notice the flowers only on your side of the path. I planted seeds there, knowing you would water them every day."

On the perfect side, the path was bare.`,
      moral: 'Our flaws can become our gifts — if we allow them to.',
      readTime: 2,
    },
    {
      title: 'The Butterfly Dream',
      content: `One night, Zhuangzi dreamed he was a butterfly, fluttering freely with no thoughts of being Zhuangzi.

He woke up, a man again.

But he could not shake the question: Was he Zhuangzi who had dreamed of being a butterfly, or was he now a butterfly dreaming he was Zhuangzi?

He decided the question itself was the teaching.`,
      moral: 'What we call reality may be only our deepest and most persistent dream.',
      readTime: 2,
    },
    {
      title: 'The Blind Men and the Elephant',
      content: `Six blind men encountered an elephant and each touched a different part.

"It is like a wall," said the one who touched the side.
"A spear," said the one who touched the tusk.
"A snake," said the one who touched the trunk.
"A tree," said the one who touched the leg.
"A fan," said the one who touched the ear.
"A rope," said the one who touched the tail.

They argued fiercely, each convinced he was right.

None of them was wrong. None of them was fully right.`,
      moral: 'Truth is larger than any single perspective.',
      readTime: 2,
    },
    {
      title: 'The River and the Stone',
      content: `A student asked a master: "How does water, which is soft, wear away stone, which is hard?"

The master picked up a smooth river stone and placed it in the student's hand.

"Not by force," he said. "By constancy. The water does not attack the stone. It simply keeps moving, every day, in the same direction."

The student turned the stone over and felt its smoothness.`,
      moral: 'Gentleness over time is stronger than force in a moment.',
      readTime: 2,
    },
    {
      title: 'The Weight of Resentment',
      content: `A teacher asked her students to bring potatoes in a bag — one for each person they hadn't forgiven. They were to carry the bags for a week.

By day three, the bags smelled. By day five, they were heavy. By day seven, the students could think of nothing else.

"This is what it feels like," said the teacher, "to carry resentment."`,
      moral: 'Forgiveness is not a gift to others — it is a burden you put down yourself.',
      readTime: 2,
    },
    {
      title: 'The Sword of Discernment',
      content: `A young samurai boasted to an old monk: "I can cut through the thickest wood, the strongest armor."

"Can you cut through your own fear?" the monk asked.

"Can you cut through your pride, your need to be right, your certainty that you know?"

The samurai was quiet.

"When you have mastered that," said the monk, "you will have no need of a sword."`,
      moral: 'The sharpest instrument is a mind that can cut through its own illusions.',
      readTime: 2,
    },
  ],

  motivation: [
    {
      title: 'The Butterfly Struggle',
      content: `A man found a cocoon with a butterfly struggling to emerge. Wanting to help, he carefully widened the opening.

The butterfly crawled out easily — but its wings were shriveled and its body swollen. It spent the rest of its life unable to fly.

The man had not understood: the struggle through the narrow opening was nature's way of forcing fluid from the body into the wings, making them strong.

The struggle the man had removed was the very thing that would have made the butterfly soar.`,
      moral: 'Struggle is not the enemy of growth — it is the mechanism of it.',
      readTime: 2,
    },
    {
      title: 'The Bamboo Tree',
      content: `A farmer planted a bamboo seed and watered it every day for four years. Nothing appeared above the ground.

His neighbors laughed. His family worried.

In the fifth year, a green shoot broke through the soil. Within six weeks, the bamboo grew to ninety feet.

Had it done nothing for four years? No — it had spent four years building roots strong enough to hold what was coming.`,
      moral: 'Invisible progress is still progress.',
      readTime: 2,
    },
    {
      title: 'The Starfish Thrower',
      content: `After a storm, thousands of starfish lay stranded on the beach. A child walked the shore throwing them, one by one, back into the sea.

A man stopped her. "There are miles of beach and thousands of starfish. You can't possibly make a difference."

The child picked up another starfish and threw it into the waves.

"I made a difference to that one," she said.`,
      moral: 'You cannot change everything. But you can change something.',
      readTime: 1,
    },
    {
      title: 'The Burning Ships',
      content: `When Hernán Cortés landed in Mexico, his men were terrified. They had heard stories of great armies. Some wanted to sail home.

Cortés ordered the ships burned.

"Now," he told his men, "we have no choice but to succeed."

Without retreat, the mind finds resources it never knew it had.`,
      moral: 'Commitment becomes possible when retreat is no longer an option.',
      readTime: 2,
    },
    {
      title: 'The Broken Violin',
      content: `Itzhak Perlman walked slowly to the stage. Halfway through the concert, one of his violin strings snapped.

He paused, closed his eyes — then continued playing the entire concerto on three strings, recomposing the music in his head in real time.

When the performance ended, the audience rose in silence before the applause.

He said afterward: "Sometimes it is the artist's task to find out how much music you can still make with what you have left."`,
      moral: 'Limitations can become the source of the greatest work.',
      readTime: 2,
    },
    {
      title: 'The Arrow and the Bow',
      content: `A teacher held an arrow and asked her student: "When is an arrow most alive?"

"When it flies," said the student.

"And when does it fly?"

"When it is released from the bow."

"And before it is released?"

"It is... pulled back."

The teacher smiled. "So when you are pulled back, do not think you are going nowhere."`,
      moral: 'Being drawn back is preparation for moving forward.',
      readTime: 1,
    },
    {
      title: 'The Diamond Under Pressure',
      content: `A student complained to her mentor: "Everything is going wrong. I am under too much pressure. I feel like I am going to crack."

The mentor picked up a lump of coal.

"Do you know what this becomes under sufficient pressure?"

"A diamond," said the student.

"Yes. But only if the pressure is applied long enough, and the coal does not run from it."`,
      moral: 'Pressure applied long enough transforms what it touches.',
      readTime: 1,
    },
    {
      title: 'The Mountain Climber',
      content: `A woman who had climbed many mountains was asked what the hardest part was.

"Is it the summit?" someone asked. "The last push when you're exhausted?"

"No," she said. "The hardest part is the third day, when the summit feels no closer and the valley is too far to return to, and you have nothing but the path in front of you."

She paused. "That is where character is made."`,
      moral: 'The middle of the journey, not the end, is where we are truly tested.',
      readTime: 2,
    },
    {
      title: 'The Sleeping Giant',
      content: `A great statue lay half-buried in a field for centuries. Travelers walked past it. Children played on it. No one noticed what it was.

One day, an old sculptor stopped, looked carefully, and said: "There is a giant here. It has always been here."

He spent years removing what didn't belong.

When he was done, the giant stood.`,
      moral: 'Greatness is not added — it is uncovered.',
      readTime: 1,
    },
    {
      title: 'The Second Try',
      content: `Robert the Bruce, watching a spider try to spin its web, saw it fail six times. Each time, it fell. Each time, it climbed back.

On the seventh attempt, the thread held.

Bruce had lost six battles. He had been hiding in a cave, ready to give up.

He went back. He won on the seventh.`,
      moral: 'The only difference between failure and the last try is whether you stop.',
      readTime: 2,
    },
  ],

  leadership: [
    {
      title: 'The General and the Cook',
      content: `Prince Hui's cook was butchering an ox. Every movement of his hands, every step of his feet, every cut of his blade was perfectly harmonious — as if performing a dance.

"How skilled you are!" said the Prince.

"What I follow is the Tao," said the cook, "which is beyond skill. I work with my mind and not with my eye. My mind works along without the control of the senses. Falling back upon eternal principles, I glide through such great joints as there may be, according to the natural constitution of the animal."`,
      moral: 'True mastery means working with the grain of things, not against them.',
      readTime: 2,
    },
    {
      title: 'The Shepherd Who Became King',
      content: `A young shepherd was chosen to lead his people. He asked his predecessor: "What is the most important thing a king must do?"

The old king said: "Walk among your people. Not to be seen, but to see."

The young king remembered this. Every week he walked the market, the fields, the poorest streets — without ceremony.

His people never feared him. They trusted him.`,
      moral: 'A leader who listens knows more than one who only commands.',
      readTime: 2,
    },
    {
      title: 'The Bamboo and the Oak',
      content: `After a great storm, a traveler came upon a forest.

The mighty oaks had fallen. Their roots had held the ground so fiercely that when the wind came, they had no give — and they had broken.

The bamboo was bent low, almost to the ground — but standing. When the wind passed, it rose again.

The traveler sat among the bamboo for a long time.`,
      moral: 'Strength that cannot yield will eventually break.',
      readTime: 1,
    },
    {
      title: 'The Orchestra Conductor',
      content: `A new conductor was told he was the greatest musician in the hall.

"No," he said. "I am the only musician in the hall who makes no sound."

His job was not to play. It was to listen to all the others, hear what was missing, and create the conditions for each musician to give their best.

"That," he said, "is the whole of leadership."`,
      moral: 'A leader\'s role is to amplify others, not themselves.',
      readTime: 2,
    },
    {
      title: 'The Candle and the Wind',
      content: `A flame was proud of its light.

"I illuminate everything," it said.

The wind heard this and began to blow. The flame fought back, burning more fiercely — and was extinguished.

A nearby lantern had curved glass around its flame. The wind blew, and the flame danced but did not die.

After the wind passed, the lantern's light was the only one left.`,
      moral: 'The strongest light is the one that knows when to be protected, not just when to burn.',
      readTime: 2,
    },
    {
      title: 'The Captain and the Storm',
      content: `In a great storm, the sailors panicked. They ran to the captain.

He was standing at the helm, calm, watching the water.

"Are you not afraid?" they asked.

"I am," he said. "But the ship does not need my fear. It needs my hands."

He turned back to the wheel.`,
      moral: 'Leadership is not the absence of fear — it is choosing action over panic.',
      readTime: 1,
    },
    {
      title: 'The King\'s Three Questions',
      content: `A king asked three questions: Who is the most important person? What is the most important time? What is the most important thing to do?

After much deliberation, a wise elder answered:

"The most important person is the one before you now. The most important time is now. The most important thing is to do good for the person before you."

The king dismissed his advisors and went to work.`,
      moral: 'Leadership lives entirely in the present moment, with the person in front of you.',
      readTime: 2,
    },
    {
      title: 'The Lighthouse Keeper',
      content: `A lighthouse keeper was asked: "You tend a light that guides thousands of ships safely home. Do you not wish to sail yourself?"

He thought for a long time.

"The sailor sees the coast for a moment and moves on," he said. "I know every rock, every current, every fog pattern of these waters. My knowledge lives in this light."

He lit the lamp.

"From here, I guide more ships than any sailor ever could."`,
      moral: 'Leadership can mean being the one who stays, not the one who goes.',
      readTime: 2,
    },
    {
      title: 'The General\'s Humility',
      content: `After a great victory, a general's aide praised his genius at every step.

The general stopped him. "Tell me one decision I made that was wrong."

The aide hesitated. "I... cannot think of one."

"Then you are useless to me," the general said. "The enemy will find my mistakes. I need someone who finds them first."`,
      moral: 'The leader who cannot hear criticism cannot learn from failure.',
      readTime: 1,
    },
    {
      title: 'The Gardener\'s Secret',
      content: `A queen's garden was the finest in all the kingdom. She asked her head gardener for his secret.

"I do not grow anything," he said.

The queen frowned. "But the flowers—"

"I create the conditions," he said. "The right soil, the right water, the right light. The flowers do the growing themselves."

She looked at her ministers. She looked at the garden.

She understood.`,
      moral: 'The leader\'s task is to create conditions, not to control outcomes.',
      readTime: 2,
    },
  ],

  journey: [
    {
      title: 'Two Monks and a River',
      content: `Two monks were walking when they came to a river with a strong current. A young woman stood at the bank, unable to cross.

The older monk, though their order forbade touching women, offered her his help. She accepted, and he carried her across. He set her down on the other side and the monks continued on their way.

Hours later, the younger monk could no longer contain himself. "How could you carry her? Our rules forbid it."

The older monk smiled. "I set her down hours ago. Why are you still carrying her?"`,
      moral: 'We suffer more from imagination than from reality.',
      readTime: 2,
    },
    {
      title: 'The Pilgrim and the Dust',
      content: `A pilgrim walked a long road and stopped at a well. An old woman there asked where he was going.

"To the holy city," he said. "I hope to find peace there."

The woman drew water for him. "I have lived by this well my whole life," she said. "People come from the holy city looking for peace, and people go there looking for the same."

She handed him the cup. "What are you bringing with you?"

He had never considered the question.`,
      moral: 'The journey does not give us peace. We must bring it.',
      readTime: 2,
    },
    {
      title: 'The Lost Key',
      content: `A man was searching under a streetlight. His neighbor came out. "What are you looking for?"

"My key."

"Where did you lose it?"

"In the alley."

"Then why are you looking here?"

"Because the light is better here."

They both stood in silence.

Then, slowly, the man walked into the darkness where he had truly lost it.`,
      moral: 'We search where it is comfortable, not where the answer lies.',
      readTime: 1,
    },
    {
      title: 'The Returning Traveler',
      content: `After twenty years abroad, a man returned to his village. He expected to find the same streets, the same people, the same river.

Everything had changed. The friends of his youth had aged. The children were now adults. The river had shifted course.

He felt lost in the place he had called home.

An elder saw his confusion. "You also have changed," she said. "Perhaps that is the reunion you were not expecting."`,
      moral: 'We cannot return to what we left — only to what we have both become.',
      readTime: 2,
    },
    {
      title: 'The Fork in the Road',
      content: `At a crossroads, a traveler found two signs. One pointed to the easy road — smooth, well-traveled, with inns along the way. The other to the difficult road — steep, unmarked, with no promise of shelter.

She asked an old man resting at the fork: "Which road leads somewhere worth going?"

He looked at her for a long time. "Both lead somewhere," he said. "The question is what kind of traveler you want to be when you arrive."`,
      moral: 'The path we choose shapes us as much as the destination.',
      readTime: 2,
    },
    {
      title: 'The River\'s Lesson',
      content: `A young river rushed down a mountain, cutting through rock, certain of its strength.

At the edge of the desert, it tried to cross the sand — and kept disappearing, absorbed before it could reach the other side.

A voice said: "Let the wind carry you."

"But I will lose myself," said the river.

"You will only lose what you were. You will become rain."`,
      moral: 'Some transformations require us to give up the form we are attached to.',
      readTime: 2,
    },
    {
      title: 'The Map and the Territory',
      content: `A young explorer set out with the most detailed map ever made. He followed it precisely through valleys and over passes.

Then the path ended at a cliff the map did not show.

An old guide found him there. "Your map was made by someone who walked this road thirty years ago," she said. "The road has changed."

She folded the map. "Now walk with your eyes."`,
      moral: 'The map is not the territory. At some point, we must trust our own steps.',
      readTime: 2,
    },
    {
      title: 'The Shore and the Deep',
      content: `A man stood at the ocean's edge every day for years, watching the water. People called him a dreamer.

One day a sailor asked: "Why do you never sail?"

"I am learning the ocean," the man said.

"You cannot learn the ocean from the shore."

The man looked at the horizon. "I know. But I needed to understand what I was afraid of before I got in the boat."

He bought passage the next morning.`,
      moral: 'Understanding our fear is the beginning of overcoming it.',
      readTime: 2,
    },
    {
      title: 'The Long Way Home',
      content: `A daughter left home angry and swore she would not return. She traveled far, saw much, and after many years found herself exhausted and homesick.

She wrote to her mother: "I am coming home, but I am not who you remembered. I am changed."

Her mother wrote back: "Come as you are. I have also changed. We will meet as strangers who love each other."

The daughter wept and packed her bag.`,
      moral: 'Coming home is not returning to what was — it is being received as what you have become.',
      readTime: 2,
    },
    {
      title: 'The Wanderer\'s Question',
      content: `A wanderer had traveled every road, crossed every sea, and climbed every mountain. He had seen more than any person he knew.

In his old age, a child asked him: "What is the most important thing you have seen?"

He thought for a long time.

"I have seen that the most interesting country," he said at last, "is the one inside each person I have met."`,
      moral: 'The greatest journey is into understanding another person.',
      readTime: 2,
    },
  ],

  loss: [
    {
      title: 'The Mustard Seed',
      content: `Kisa Gotami lost her young son and, mad with grief, carried his body through the village begging for medicine to revive him.

Someone sent her to the Buddha. "Bring me a handful of mustard seeds," he said, "from a house where no one has died."

She went from house to house, but in every home she heard: a husband, a child, a parent had died there. By evening, she gently laid her son to rest.

She returned to the Buddha and said, "I understand now. Death is not mine alone."`,
      moral: 'Grief shared is the beginning of healing.',
      readTime: 3,
    },
    {
      title: 'The Broken Vase',
      content: `A woman broke her favorite vase — a gift from her late mother. She wept for a long time.

A friend suggested she throw the pieces away.

Instead, she learned kintsugi — the Japanese art of repairing broken pottery with gold.

When the vase was whole again, its cracks gleamed. It was more beautiful than before, and she could see in it everything the vase had survived.`,
      moral: 'What has been broken and repaired can become more beautiful than what was never broken.',
      readTime: 2,
    },
    {
      title: 'The Autumn Leaves',
      content: `A child asked her grandfather why the leaves fell from the trees.

"To make room," he said.

"For what?"

"For spring." He paused. "But they don't fall knowing that. They fall because it is their time. The spring happens because they were willing to let go."

The child picked up a red leaf and turned it over in her hands.

"Is that why you're not sad?" she asked.

He smiled but didn't answer.`,
      moral: 'Letting go is not loss. It is the condition for what comes next.',
      readTime: 2,
    },
    {
      title: 'The Empty Nest',
      content: `When the last child left, a mother stood in the doorway for a long time.

Her husband found her there. "What are you thinking?"

"I am thinking about all the years I wanted a quiet house," she said. "I prayed for a morning without chaos."

She looked at the empty hallway.

"Now I understand that the chaos was the thing itself. The noise was the love."`,
      moral: 'We often only recognize what we had in its absence.',
      readTime: 2,
    },
    {
      title: 'The Potter\'s Wheel',
      content: `A master potter was known for the most beautiful bowls in the region. Students came to learn.

They noticed he kept a bowl with a long crack on his shelf, separate from the others.

"Why do you keep the broken one?" they asked.

"Because it is the one I learned the most from," he said. "Every perfect bowl I have made since — I made knowing what breaking feels like."`,
      moral: 'Failure teaches what success cannot.',
      readTime: 2,
    },
    {
      title: 'The Willow Tree',
      content: `After a great flood, a farmer walked his ruined fields. Only one tree still stood: a willow at the river's edge.

He asked it: "How did you survive while the oaks were swept away?"

The willow's branches moved in the current.

"I did not hold on," it said. "I let the water move through me. The oaks tried to stop the river. I tried to be part of it."`,
      moral: 'Grief moves through us when we stop trying to stop it.',
      readTime: 2,
    },
    {
      title: 'The Fading Star',
      content: `An astronomer told her students: "The light from some of those stars left before humans walked the earth. The star itself may no longer exist."

A student asked: "Then what are we looking at?"

"What was," she said. "And perhaps that is enough. The light travels long after the source is gone."

She turned off the lamp.

In the darkness, the stars were brighter.`,
      moral: 'What we loved continues to travel, even after the source is gone.',
      readTime: 2,
    },
    {
      title: 'The Last Letter',
      content: `A man found, after his father died, a box of unsent letters. His father had written to him for thirty years — every birthday, every milestone — but had never sent them.

At first the man was angry.

Then he read them. All of them.

By the last letter, he understood that his father had been speaking to him his whole life, in the only language he knew: silence and hope.`,
      moral: 'Some love is expressed in ways we only see after the person is gone.',
      readTime: 2,
    },
    {
      title: 'The Open Hand',
      content: `A grieving woman came to a sage. "How do I stop the pain of losing someone I loved?"

The sage placed a stone in her palm. "Hold it as tightly as you can."

She clenched her fist.

"Now try to receive something."

She could not open her hand without dropping the stone.

"Grief held too tightly," he said, "leaves no room for what life is still offering."`,
      moral: 'We must learn to hold loss gently enough to still receive life.',
      readTime: 2,
    },
    {
      title: 'The Melting Candle',
      content: `A child cried when the candle burned down. "It is dying," she said.

Her grandmother shook her head.

"Look around," she said. "This room was dark. Now you can see the paintings, the books, the faces of the people you love. The candle did not disappear — it became light."

The child stopped crying.

She looked at the light on the walls for a long time.`,
      moral: 'What we lose does not vanish — it transforms into what it gave us.',
      readTime: 2,
    },
  ],

  risk: [
    {
      title: 'The Leap of the Frog',
      content: `Five frogs sat on a log. Four decided to jump off.

How many frogs were left on the log?

Five.

There is a difference between deciding and doing.

The frog who truly understood this had already leapt into the pond, not knowing its depth — and discovered it could swim.`,
      moral: 'Deciding is not doing. The gap between them is where dreams die.',
      readTime: 1,
    },
    {
      title: 'The Eagle and the Cliff',
      content: `A mother eagle pushed her eaglet from the nest. It fell, wings flapping uselessly, the ground rushing up.

At the last moment, the mother swooped beneath it and carried it back to the nest.

Then pushed it again.

And again.

Until the wings remembered what they were for.`,
      moral: 'Some things can only be learned in the falling.',
      readTime: 1,
    },
    {
      title: 'The Seed and the Dark',
      content: `A seed sat at the edge of a garden bed, watching other seeds be pressed into the dark earth.

"I don't want to go in," it said. "It is dark and I do not know what will happen."

A gardener heard it. "You are right," she said. "You don't know. But what you are now is the smallest thing you will ever be."

She pressed it gently into the soil.`,
      moral: 'Growth begins where certainty ends.',
      readTime: 1,
    },
    {
      title: 'The Tightrope Walker',
      content: `Charles Blondin crossed Niagara Falls on a tightrope before a crowd of thousands. He asked: "Do you believe I can cross again?"

"Yes!" they cheered.

"Do you believe I can push someone in a wheelbarrow?"

"Yes! Yes!"

"Good," he said, picking up the handles. "Then get in."

The crowd fell silent. No one moved.`,
      moral: 'There is a difference between belief and commitment.',
      readTime: 2,
    },
    {
      title: 'The Unopened Gift',
      content: `An old woman was found after her death with a beautiful silk dress still in its box, tissue paper unfolded, tags still attached.

Her daughter recognized it. "You bought this fifteen years ago."

"I was saving it for a special occasion," the neighbor said quietly.

The daughter held the dress.

"I will not save things," she said. "Every day I wake up is the occasion."`,
      moral: 'The risk of saving life for later is that later never comes.',
      readTime: 2,
    },
    {
      title: 'The Locked Garden',
      content: `Behind a stone wall in the city, a locked garden had gone untended for years. People passed the locked gate and imagined what was inside — flowers, shade, peace.

One day, a child found the key in the gutter and opened the gate.

Inside was dirt and weeds.

She didn't leave. She came back the next day with seeds.`,
      moral: 'What we imagine behind closed doors is never what we find. But that is not a reason to leave the door locked.',
      readTime: 2,
    },
    {
      title: 'The Parachute',
      content: `A skydiving instructor asked her student before the first jump: "What is the worst that could happen?"

"The parachute doesn't open," he said.

"And if it doesn't?"

"I pull the reserve."

"And if that doesn't open?"

He paused. "Then I die."

"Yes," she said. "And are you afraid?"

"Terrified."

"Good. Fear means you understand the stakes. Now let's jump."`,
      moral: 'Knowing the worst clearly is what allows us to choose freely.',
      readTime: 2,
    },
    {
      title: 'The River Crossing',
      content: `A man stood at the bank of a fast river with no bridge. He watched the current.

A friend called from the other side: "There is no safe crossing! The current is too strong!"

The man stepped in. The water reached his knees, his waist, his chest. He pushed across.

On the other side, he turned and called back: "It is manageable!"

"How did you know?" his friend called.

"I didn't. That is the only way to know."`,
      moral: 'Some things can only be assessed from inside them.',
      readTime: 2,
    },
    {
      title: 'The Unfinished Painting',
      content: `A painter kept a canvas on her wall, half-finished, for ten years.

Students asked: "Why don't you complete it?"

"I am afraid," she said. "As long as it is unfinished, it might be my greatest work."

A young student said: "And as long as it is unfinished, it is nothing."

She picked up her brush the next morning.`,
      moral: 'The risk of not finishing is remaining forever in the safety of potential.',
      readTime: 1,
    },
    {
      title: 'The Two Doors',
      content: `A man stood before two doors. One was familiar — he knew exactly what was behind it. The other he had never opened.

He stood there for so long that a woman behind him finally said: "Are you going in?"

"I don't know what's behind the second door."

"Neither do I," she said. "But I know you've already seen everything behind the first one."`,
      moral: 'The greatest risk is choosing the known over the possible.',
      readTime: 1,
    },
  ],

  trust: [
    {
      title: 'The Bridge Builder',
      content: `An old man, traveling a lone highway, came at evening cold and gray to a chasm vast and wide. He crossed by a bridge of skill and care, safe in the twilight dim and pale.

But when he reached the other side, he turned and built a bridge back over.

A fellow traveler said: "Old man, you crossed this chasm safely — why build a bridge you'll never cross again?"

The builder replied: "A youth is following behind me whose path this night must also be made."`,
      moral: 'Trust is built not for ourselves, but for those who come after.',
      readTime: 2,
    },
    {
      title: 'The Blind Traveler',
      content: `A blind man needed to cross a busy city for the first time. A stranger offered to guide him.

"How do I know you won't lead me into traffic?" the man asked.

"You don't," the stranger said.

They stood in silence.

"That," said the stranger, "is the nature of trust. It is not certainty. It is a decision."

The blind man took his arm.`,
      moral: 'Trust is not certainty — it is a choice made in the absence of it.',
      readTime: 2,
    },
    {
      title: 'The Seed and the Farmer',
      content: `A farmer planted her best seeds in the dark earth and walked away.

A neighbor asked: "How do you know they will grow? You can't see them."

"I don't know," she said. "But I know that seeds need darkness before they need light. And I know that watching them every hour will not make them grow faster."

She went home and had her supper.`,
      moral: 'Sometimes trust means planting and walking away.',
      readTime: 1,
    },
    {
      title: 'The Tightrope and the Net',
      content: `Before a young circus performer's first show, she looked down at the net below the wire.

"I don't need it," she told her trainer. "I won't fall."

"The net is not for when you think you will fall," he said. "It is for when the unexpected happens. It is not a sign of weakness. It is a sign that someone thought you were worth catching."

She performed without falling. But she was glad the net was there.`,
      moral: 'Being trusted with a safety net is a form of love.',
      readTime: 2,
    },
    {
      title: 'The Village Well',
      content: `In a drought year, a village shared a single well. Each family was rationed a bucket a day.

One night, a family took two. No one saw them.

But the next morning, the well was lower. And the next morning, someone else took two. And then another family.

Within a week, the well was dry.

No one had agreed to share less. No one had agreed to take more. And yet the trust, once broken by one family, had collapsed for all.`,
      moral: 'Trust is a commons. When one person breaks it, everyone pays.',
      readTime: 2,
    },
    {
      title: 'The Captain\'s Word',
      content: `A captain was known for one thing: he never promised what he couldn't deliver, and he always delivered what he promised.

His first mate asked: "Is that really the secret of command?"

"No," said the captain. "The secret is that your crew will sail into storms for you — but only if they believe you will bring them home. And they will only believe that if everything small you've ever told them has been true."`,
      moral: 'Trust is built in small moments long before it is needed in great ones.',
      readTime: 2,
    },
    {
      title: 'The Hidden Roots',
      content: `A student asked: "What keeps the oldest trees standing when the storms come?"

The master took him to the forest and showed him the surface of the ground, then dug into the earth to show the roots: thick as trunks, reaching deep and wide, invisible to everyone above ground.

"The tree does not stand because of what you see," she said. "It stands because of what built slowly, in the dark, over many years."`,
      moral: 'The strength of any relationship lies in what was built before the storm came.',
      readTime: 2,
    },
    {
      title: 'The Delayed Train',
      content: `A traveler waited hours at a platform for a train that was delayed, then cancelled. He was furious.

An old woman beside him was calm.

"You've taken this train before?" he asked.

"Many times," she said. "Sometimes it is late. Sometimes it doesn't come. But it has always, eventually, come."

She looked at him. "The question is whether you trust the system enough to wait, or whether the anger costs you more than the delay."`,
      moral: 'Trust is tested most in the waiting, not the arriving.',
      readTime: 2,
    },
    {
      title: 'The Borrowed Light',
      content: `A lantern maker was dying and had one last lamp. Many came to ask for it.

He gave it to the person he trusted least.

Everyone was shocked.

"She is the one," he said, "who will need it most. Those I trust already carry their own light. But she — if she has this lamp, she will remember that someone believed she was worth trusting. And that memory will light more than any lamp."`,
      moral: 'Trust offered to those who expect none of it has the power to transform them.',
      readTime: 2,
    },
    {
      title: 'The Unfinished Bridge',
      content: `Two villages began building a bridge from opposite banks. Each worked without seeing the other's progress.

Years passed. When they finally met in the middle, the arches didn't quite align.

But they were close enough.

The engineers said it could be fixed in a day.

The villagers looked at the gap — the evidence of years of separate faith that the other side was building too — and decided to leave it as it was.`,
      moral: 'The small imperfection in trust is what proves both sides were working.',
      readTime: 2,
    },
  ],

  meaning: [
    {
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
    {
      title: 'The Last Lesson',
      content: `A dying professor asked his students to gather. He was too weak to stand, so he taught from his bed.

A student asked: "What is the most important thing you have learned in your life?"

He thought for a long time.

"That the questions matter more than the answers. I have changed my answers many times. But the questions — the deep ones — those I have kept my whole life."

He closed his eyes.

"Keep your questions," he said.`,
      moral: 'The questions we carry are more valuable than the answers we hold.',
      readTime: 2,
    },
    {
      title: 'The Name Carved in Stone',
      content: `A man visited an ancient cemetery and noticed that the graves of the very old had smooth stones — the names worn away by time and weather.

Newer graves had sharp, legible inscriptions.

He asked the caretaker: "Does it bother the families, that the names fade?"

"The stones fade," she said. "But as long as someone is alive who remembers — the name is still carved somewhere."`,
      moral: 'We are not remembered in stone but in the people who carry us.',
      readTime: 2,
    },
    {
      title: 'The King Who Asked Why',
      content: `A king summoned his wisest advisor and asked: "What is the meaning of my life?"

The advisor was silent for a long time.

"Your Majesty has built roads, ended wars, fed thousands. Why is that not enough?"

The king looked out the window. "Because I never chose it. It was the life I was born into."

The advisor said: "Then perhaps the meaning is not in what you have done, but in the moment you chose to ask this question."`,
      moral: 'Meaning arrives not in the answer, but in the asking.',
      readTime: 2,
    },
    {
      title: 'The Empty Throne',
      content: `After a great king died, his throne sat empty for three years. The kingdom was at peace.

Visitors asked: "Who rules?"

The ministers said: "The king's last laws. His last words. His last decisions."

One visitor said: "Then he is still king."

"No," said an elder minister. "But what he built is still standing. That is better."`,
      moral: 'The greatest life is one whose influence outlasts the living of it.',
      readTime: 2,
    },
    {
      title: 'The Two Seeds',
      content: `Two seeds lay in the ground. One said: "I am afraid. If I grow, the wind may break me. Animals may eat me. A drought may kill me."

The other seed pushed a small shoot toward the light.

"But if I don't grow," it said, "I will certainly die here, in the dark, never knowing what I was meant to become."

The first seed thought about this for a long time.

By then, the second seed was already a tree.`,
      moral: 'The risk of becoming is smaller than the certainty of remaining nothing.',
      readTime: 2,
    },
    {
      title: 'The Lantern Carrier',
      content: `A man carried a lantern through a dark city every night, though he himself could see perfectly in the dark.

People asked: "Why do you carry that? You don't need it."

"No," he said. "But the people behind me do. And if I carry it, they can walk without fear."

Someone asked: "Do they know you carry it for them?"

"No," he said.

He walked on.`,
      moral: 'Some of the most meaningful acts are invisible to those they serve.',
      readTime: 2,
    },
    {
      title: 'The Forgotten Artist',
      content: `A painter died unknown, her canvases rolled and stored in a barn. Decades later, a child found them and was transfixed.

The child grew up to be an artist, and always said she owed everything to a painter she had never met.

Her students asked who this painter was.

"I don't know her name," she said. "But she painted as if someone would find her work long after she was gone — and put everything into it."`,
      moral: 'Work done with integrity creates value beyond what we can see.',
      readTime: 2,
    },
    {
      title: 'The River\'s Purpose',
      content: `A river asked the ocean: "What is my purpose?"

"To reach me," said the ocean.

"But I have been flowing toward you for a thousand years. Was that all — just to arrive?"

The ocean was quiet for a moment.

"No. Your purpose was the valley you carved, the villages you fed, the fish you carried, the children who swam in you. Reaching me was just the last thing you did."`,
      moral: 'Our purpose lives in the journey, not in the destination.',
      readTime: 2,
    },
    {
      title: 'The Wanderer and the Stars',
      content: `A wanderer looked up at the night sky and felt despair. "I am so small," she said. "What does any of this matter?"

An old astronomer beside her said: "Every atom in your body was forged in a dying star. You are not small in the universe. You are made of it."

She looked up again.

"Does that make my life meaningful?" she asked.

"It makes you ancient," he said. "What you do with that is yours to decide."`,
      moral: 'The universe gives us origin. We give ourselves meaning.',
      readTime: 2,
    },
  ],
};

async function main() {
  console.log('Seeding database...');

  for (const categoryData of CATEGORIES) {
    const parables = PARABLES[categoryData.slug];

    const category = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: { parablesCount: parables.length },
      create: {
        name: categoryData.name,
        slug: categoryData.slug,
        color: categoryData.color,
        description: categoryData.description,
        parablesCount: parables.length,
      },
    });

    for (const parable of parables) {
      await prisma.parable.upsert({
        where: { title_categoryId: { title: parable.title, categoryId: category.id } },
        update: {},
        create: {
          title: parable.title,
          content: parable.content,
          moral: parable.moral,
          readTime: parable.readTime,
          categoryId: category.id,
        },
      });
    }

    console.log(`  ✓ ${categoryData.name} (${parables.length} parables)`);
  }

  const total = Object.values(PARABLES).reduce((sum, p) => sum + p.length, 0);
  console.log(`\nSeeded ${CATEGORIES.length} categories and ${total} parables.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
