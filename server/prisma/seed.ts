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
  titleRu?: string;
  contentRu?: string;
  moralRu?: string;
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
      titleRu: 'Пустая чаша',
      contentRu: `Учёный пришёл к дзен-мастеру в поисках мудрости. Мастер начал наливать чай в его чашку. Он лил и лил, пока чай не потёк через край на стол, но продолжал лить.

«Хватит! Чашка полна — больше не войдёт!» — воскликнул учёный.

Мастер поставил чайник и тихо сказал: «Как эта чашка, ты полон собственными суждениями и знаниями. Как я могу показать тебе мудрость, если ты сначала не опустошишь свою чашку?»

Учёный долго сидел в тишине, затем медленно отложил свои книги.`,
      moralRu: 'Чтобы учиться, мы должны сначала быть готовы разучиться.',
    },
    {
      title: 'The Second Arrow',
      content: `A student asked the Buddha: "If someone shoots you with an arrow, that is pain. But if you then spend the rest of the day lamenting the arrow, cursing the archer, worrying about infection — is that not a second arrow you shoot into yourself?"

The student said nothing.

"The first arrow is unavoidable," the Buddha continued. "It is the nature of life. But the second arrow — suffering over the suffering — this is the one we choose."

That night, the student slept more peacefully than he had in years.`,
      moral: 'Pain is inevitable. Suffering is optional.',
      readTime: 2,
      titleRu: 'Вторая стрела',
      contentRu: `Ученик спросил Будду: «Если кто-то ранит тебя стрелой — это боль. Но если ты весь день оплакиваешь эту стрелу, проклинаешь лучника, боишься заражения — разве это не вторая стрела, которую ты пускаешь в себя сам?»

Ученик молчал.

«Первая стрела неизбежна», — продолжил Будда. «Такова природа жизни. Но вторая стрела — страдание о страдании — это то, что мы выбираем сами».

В ту ночь ученик спал спокойнее, чем за долгие годы.`,
      moralRu: 'Боль неизбежна. Страдание — это выбор.',
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
      titleRu: 'Соль в воде',
      contentRu: `Несчастный юноша пришёл к старому учителю и сказал, что его жизнь полна горечи.

Старик протянул ему стакан воды и бросил туда горсть соли. «Пей», — сказал он. Юноша выпил и поморщился.

Затем учитель повёл его к чистому озеру и бросил в него ещё одну горсть соли. «Теперь пей из озера».

Юноша выпил. Вода была сладкой.

«Боль жизни — это чистая соль», — сказал учитель. «Её количество одинаково. Но то, что ты ощущаешь, зависит от сосуда, в который её помещаешь».`,
      moralRu: 'Горечь боли зависит от размера сердца, которое её вмещает.',
    },
    {
      title: 'The Two Wolves',
      content: `A grandfather told his grandson: "Inside every person, two wolves are fighting. One is full of anger, envy, greed, and pride. The other is full of kindness, humility, compassion, and love."

The boy thought for a moment. "Which wolf wins?"

The grandfather said, "The one you feed."`,
      moral: 'We become what we give our attention to.',
      readTime: 1,
      titleRu: 'Два волка',
      contentRu: `Дед сказал внуку: «Внутри каждого человека идёт война двух волков. Один полон злобы, зависти, жадности и гордыни. Другой полон доброты, смирения, сострадания и любви».

Мальчик задумался. «Какой волк победит?»

Дед ответил: «Тот, которого ты кормишь».`,
      moralRu: 'Мы становимся тем, чему уделяем своё внимание.',
    },
    {
      title: 'The Cracked Pot',
      content: `A water bearer carried two pots on a yoke. One pot was perfect; the other had a crack and leaked half its water by journey's end.

The cracked pot was ashamed. "I am sorry. Because of my flaw, you carry only half a load."

The bearer smiled. "Notice the flowers only on your side of the path. I planted seeds there, knowing you would water them every day."

On the perfect side, the path was bare.`,
      moral: 'Our flaws can become our gifts — if we allow them to.',
      readTime: 2,
      titleRu: 'Треснувший кувшин',
      contentRu: `Водонос нёс два кувшина на коромысле. Один был целым, другой имел трещину и к концу пути терял половину воды.

Треснувший кувшин стыдился: «Мне жаль. Из-за моего изъяна ты приносишь лишь полгруза».

Водонос улыбнулся: «Посмотри на цветы только по твою сторону тропинки. Я сажал там семена, зная, что ты будешь их поливать каждый день».

На стороне целого кувшина тропинка была пустой.`,
      moralRu: 'Наши изъяны могут стать нашими дарами — если мы позволим им.',
    },
    {
      title: 'The Butterfly Dream',
      content: `One night, Zhuangzi dreamed he was a butterfly, fluttering freely with no thoughts of being Zhuangzi.

He woke up, a man again.

But he could not shake the question: Was he Zhuangzi who had dreamed of being a butterfly, or was he now a butterfly dreaming he was Zhuangzi?

He decided the question itself was the teaching.`,
      moral: 'What we call reality may be only our deepest and most persistent dream.',
      readTime: 2,
      titleRu: 'Сон о бабочке',
      contentRu: `Однажды ночью Чжуанцзы приснилось, что он — бабочка, свободно порхающая без мыслей о том, что он Чжуанцзы.

Он проснулся — снова человеком.

Но не мог избавиться от вопроса: был ли он Чжуанцзы, которому приснилось, что он бабочка, или сейчас он — бабочка, которой снится, что она Чжуанцзы?

Он решил, что сам этот вопрос и есть урок.`,
      moralRu: 'То, что мы называем реальностью, может быть лишь нашим самым глубоким и устойчивым сном.',
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
      titleRu: 'Слепые мудрецы и слон',
      contentRu: `Шестеро слепых встретили слона, и каждый ощупал разную его часть.

«Он как стена», — сказал тот, кто коснулся бока.
«Как копьё», — сказал тот, кто коснулся бивня.
«Как змея», — сказал тот, кто коснулся хобота.
«Как дерево», — сказал тот, кто коснулся ноги.
«Как веер», — сказал тот, кто коснулся уха.
«Как верёвка», — сказал тот, кто коснулся хвоста.

Они спорили ожесточённо, каждый был уверен в своей правоте.

Никто из них не был неправ. Никто не был полностью прав.`,
      moralRu: 'Истина больше, чем любая отдельная точка зрения.',
    },
    {
      title: 'The River and the Stone',
      content: `A student asked a master: "How does water, which is soft, wear away stone, which is hard?"

The master picked up a smooth river stone and placed it in the student's hand.

"Not by force," he said. "By constancy. The water does not attack the stone. It simply keeps moving, every day, in the same direction."

The student turned the stone over and felt its smoothness.`,
      moral: 'Gentleness over time is stronger than force in a moment.',
      readTime: 2,
      titleRu: 'Река и камень',
      contentRu: `Ученик спросил мастера: «Как вода, которая мягкая, может точить камень, который твёрдый?»

Мастер поднял гладкий речной камень и вложил его в руку ученику.

«Не силой», — сказал он. «Постоянством. Вода не атакует камень. Она просто продолжает двигаться, каждый день, в одном направлении».

Ученик повернул камень и ощутил его гладкость.`,
      moralRu: 'Мягкость со временем сильнее, чем сила в один момент.',
    },
    {
      title: 'The Weight of Resentment',
      content: `A teacher asked her students to bring potatoes in a bag — one for each person they hadn't forgiven. They were to carry the bags for a week.

By day three, the bags smelled. By day five, they were heavy. By day seven, the students could think of nothing else.

"This is what it feels like," said the teacher, "to carry resentment."`,
      moral: 'Forgiveness is not a gift to others — it is a burden you put down yourself.',
      readTime: 2,
      titleRu: 'Тяжесть обиды',
      contentRu: `Учительница попросила учеников принести картошку в сумке — по одной на каждого, кого они не простили. Им нужно было носить сумки целую неделю.

На третий день сумки начали пахнуть. На пятый день они стали тяжёлыми. На седьмой день ученики ни о чём другом уже не могли думать.

«Вот как это ощущается», — сказала учительница, — «когда несёшь обиду».`,
      moralRu: 'Прощение — не подарок другим, а груз, который ты сам откладываешь в сторону.',
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
      titleRu: 'Меч различения',
      contentRu: `Молодой самурай похвастался старому монаху: «Я могу разрубить самое толстое дерево, самую прочную броню».

«А можешь ли ты разрубить собственный страх?» — спросил монах.

«Можешь ли ты разрубить свою гордость, свою потребность быть правым, свою уверенность в том, что ты всё знаешь?»

Самурай замолчал.

«Когда ты овладеешь этим», — сказал монах, — «тебе не понадобится меч».`,
      moralRu: 'Самый острый инструмент — это ум, способный разрубить собственные иллюзии.',
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
      titleRu: 'Борьба бабочки',
      contentRu: `Один человек нашёл кокон, из которого с трудом выбиралась бабочка. Желая помочь, он осторожно расширил отверстие.

Бабочка легко выползла — но её крылья были сморщены, а тело раздуто. Всю оставшуюся жизнь она провела, так и не взлетев.

Человек не понял: борьба сквозь узкое отверстие — это способ природы вынудить жидкость из тела в крылья, делая их сильными.

Именно ту борьбу, которую человек убрал, и должна была совершить бабочка, чтобы взлететь.`,
      moralRu: 'Борьба — не враг роста, а его механизм.',
    },
    {
      title: 'The Bamboo Tree',
      content: `A farmer planted a bamboo seed and watered it every day for four years. Nothing appeared above the ground.

His neighbors laughed. His family worried.

In the fifth year, a green shoot broke through the soil. Within six weeks, the bamboo grew to ninety feet.

Had it done nothing for four years? No — it had spent four years building roots strong enough to hold what was coming.`,
      moral: 'Invisible progress is still progress.',
      readTime: 2,
      titleRu: 'Бамбуковое дерево',
      contentRu: `Фермер посадил семя бамбука и поливал его каждый день четыре года. Над землёй не было ничего.

Соседи смеялись. Семья беспокоилась.

На пятый год из земли пробился зелёный росток. За шесть недель бамбук вырос до двадцати семи метров.

Разве он ничего не делал четыре года? Нет — он провёл четыре года, выращивая корни, достаточно крепкие, чтобы удержать то, что должно было прийти.`,
      moralRu: 'Невидимый прогресс всё равно остаётся прогрессом.',
    },
    {
      title: 'The Starfish Thrower',
      content: `After a storm, thousands of starfish lay stranded on the beach. A child walked the shore throwing them, one by one, back into the sea.

A man stopped her. "There are miles of beach and thousands of starfish. You can't possibly make a difference."

The child picked up another starfish and threw it into the waves.

"I made a difference to that one," she said.`,
      moral: 'You cannot change everything. But you can change something.',
      readTime: 1,
      titleRu: 'Тот, кто бросал морских звёзд',
      contentRu: `После шторма тысячи морских звёзд лежали выброшенными на берег. Девочка шла по берегу и бросала их одну за другой обратно в море.

Мужчина остановил её: «Вдоль берега километры, и тысячи морских звёзд. Ты не можешь что-то изменить».

Девочка подняла ещё одну морскую звезду и бросила её в волны.

«Для этой я изменила», — сказала она.`,
      moralRu: 'Нельзя изменить всё. Но можно изменить что-то.',
    },
    {
      title: 'The Burning Ships',
      content: `When Hernán Cortés landed in Mexico, his men were terrified. They had heard stories of great armies. Some wanted to sail home.

Cortés ordered the ships burned.

"Now," he told his men, "we have no choice but to succeed."

Without retreat, the mind finds resources it never knew it had.`,
      moral: 'Commitment becomes possible when retreat is no longer an option.',
      readTime: 2,
      titleRu: 'Сожжённые корабли',
      contentRu: `Когда Эрнан Кортес высадился в Мексике, его люди были в страхе. Они слышали о великих армиях. Некоторые хотели плыть домой.

Кортес приказал сжечь корабли.

«Теперь», — сказал он своим людям, — «у нас нет другого выбора, кроме как победить».

Когда отступление невозможно, разум находит ресурсы, о которых не подозревал.`,
      moralRu: 'Преданность делу становится возможной, когда отступление больше не является вариантом.',
    },
    {
      title: 'The Broken Violin',
      content: `Itzhak Perlman walked slowly to the stage. Halfway through the concert, one of his violin strings snapped.

He paused, closed his eyes — then continued playing the entire concerto on three strings, recomposing the music in his head in real time.

When the performance ended, the audience rose in silence before the applause.

He said afterward: "Sometimes it is the artist's task to find out how much music you can still make with what you have left."`,
      moral: 'Limitations can become the source of the greatest work.',
      readTime: 2,
      titleRu: 'Сломанная скрипка',
      contentRu: `Ицхак Перлман медленно вышел на сцену. На середине концерта одна из струн его скрипки лопнула.

Он остановился, закрыл глаза — и продолжил исполнять весь концерт на трёх струнах, переосмысливая музыку в голове прямо на ходу.

Когда выступление закончилось, зал встал в тишине, прежде чем разразился аплодисментами.

Он сказал после: «Иногда задача художника — выяснить, сколько музыки ты ещё можешь создать из того, что у тебя осталось».`,
      moralRu: 'Ограничения могут стать источником величайших творений.',
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
      titleRu: 'Стрела и лук',
      contentRu: `Учительница держала стрелу и спросила ученика: «Когда стрела живёт по-настоящему?»

«Когда летит», — ответил ученик.

«А когда она летит?»

«Когда её отпускают с лука».

«А до того, как отпустить?»

«Она... натянута назад».

Учительница улыбнулась: «Так что, когда тебя тянет назад, не думай, что ты никуда не движешься».`,
      moralRu: 'Когда тебя оттягивают назад — это подготовка к движению вперёд.',
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
      titleRu: 'Алмаз под давлением',
      contentRu: `Ученица пожаловалась наставнику: «Всё идёт не так. Я под слишком большим давлением. Чувствую, что вот-вот сломаюсь».

Наставник взял кусок угля.

«Знаешь, во что он превращается под достаточным давлением?»

«В алмаз», — ответила ученица.

«Да. Но только если давление действует достаточно долго и уголь не убегает от него».`,
      moralRu: 'Давление, приложенное достаточно долго, преображает всё, чего касается.',
    },
    {
      title: 'The Mountain Climber',
      content: `A woman who had climbed many mountains was asked what the hardest part was.

"Is it the summit?" someone asked. "The last push when you're exhausted?"

"No," she said. "The hardest part is the third day, when the summit feels no closer and the valley is too far to return to, and you have nothing but the path in front of you."

She paused. "That is where character is made."`,
      moral: 'The middle of the journey, not the end, is where we are truly tested.',
      readTime: 2,
      titleRu: 'Альпинистка',
      contentRu: `Женщину, покорившую многие горы, спросили, что было самым трудным.

«Вершина?» — предположил кто-то. «Последний рывок, когда ты совсем без сил?»

«Нет», — сказала она. «Самое трудное — третий день, когда вершина кажется не ближе, а до долины уже слишком далеко возвращаться, и у тебя нет ничего, кроме тропы впереди».

Она помолчала. «Именно там закаляется характер».`,
      moralRu: 'Середина пути, а не его конец — вот где нас действительно испытывают.',
    },
    {
      title: 'The Sleeping Giant',
      content: `A great statue lay half-buried in a field for centuries. Travelers walked past it. Children played on it. No one noticed what it was.

One day, an old sculptor stopped, looked carefully, and said: "There is a giant here. It has always been here."

He spent years removing what didn't belong.

When he was done, the giant stood.`,
      moral: 'Greatness is not added — it is uncovered.',
      readTime: 1,
      titleRu: 'Спящий великан',
      contentRu: `Огромная статуя пролежала наполовину закопанной в поле несколько веков. Путники проходили мимо. Дети играли на ней. Никто не замечал, что это такое.

Однажды старый скульптор остановился, внимательно посмотрел и сказал: «Здесь великан. Он был здесь всегда».

Он провёл годы, убирая всё лишнее.

Когда работа была закончена, великан встал.`,
      moralRu: 'Величие не добавляется — оно открывается.',
    },
    {
      title: 'The Second Try',
      content: `Robert the Bruce, watching a spider try to spin its web, saw it fail six times. Each time, it fell. Each time, it climbed back.

On the seventh attempt, the thread held.

Bruce had lost six battles. He had been hiding in a cave, ready to give up.

He went back. He won on the seventh.`,
      moral: 'The only difference between failure and the last try is whether you stop.',
      readTime: 2,
      titleRu: 'Вторая попытка',
      contentRu: `Роберт Брюс, наблюдая за пауком, пытавшимся сплести паутину, видел, как тот падал шесть раз. Каждый раз он падал. Каждый раз возвращался.

На седьмой попытке нить наконец держалась.

Брюс проиграл шесть сражений. Он скрывался в пещере, готовый сдаться.

Он вернулся. И победил на седьмой раз.`,
      moralRu: 'Единственное различие между поражением и последней попыткой — останавливаешься ли ты.',
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
      titleRu: 'Генерал и повар',
      contentRu: `Повар принца Хуэя разделывал быка. Каждое движение рук, каждый шаг, каждый удар лезвия были совершенно гармоничны — будто исполнялся танец.

«Как ты искусен!» — сказал принц.

«То, чему я следую, — это Дао», — ответил повар, — «что выше мастерства. Я работаю умом, а не глазами. Мой ум действует без контроля чувств. Следуя вечным принципам, я скольжу сквозь суставы, подчиняясь естественному устройству животного».`,
      moralRu: 'Истинное мастерство — работать с природой вещей, а не против неё.',
    },
    {
      title: 'The Shepherd Who Became King',
      content: `A young shepherd was chosen to lead his people. He asked his predecessor: "What is the most important thing a king must do?"

The old king said: "Walk among your people. Not to be seen, but to see."

The young king remembered this. Every week he walked the market, the fields, the poorest streets — without ceremony.

His people never feared him. They trusted him.`,
      moral: 'A leader who listens knows more than one who only commands.',
      readTime: 2,
      titleRu: 'Пастух, ставший королём',
      contentRu: `Молодого пастуха выбрали вождём своего народа. Он спросил предшественника: «Что самое важное должен делать король?»

Старый король ответил: «Ходи среди своего народа. Не чтобы тебя видели, а чтобы видеть самому».

Молодой король запомнил это. Каждую неделю он ходил по рынку, полям, беднейшим улицам — без церемоний.

Его народ никогда не боялся его. Они доверяли ему.`,
      moralRu: 'Лидер, который слушает, знает больше, чем тот, кто только приказывает.',
    },
    {
      title: 'The Bamboo and the Oak',
      content: `After a great storm, a traveler came upon a forest.

The mighty oaks had fallen. Their roots had held the ground so fiercely that when the wind came, they had no give — and they had broken.

The bamboo was bent low, almost to the ground — but standing. When the wind passed, it rose again.

The traveler sat among the bamboo for a long time.`,
      moral: 'Strength that cannot yield will eventually break.',
      readTime: 1,
      titleRu: 'Бамбук и дуб',
      contentRu: `После сильного шторма путник вышел в лес.

Могучие дубы повалились. Их корни так крепко держались за землю, что когда пришёл ветер, у них не было гибкости — и они сломались.

Бамбук согнулся низко, почти до земли — но стоял. Когда ветер стих, он поднялся снова.

Путник долго сидел среди бамбука.`,
      moralRu: 'Сила, которая не умеет уступать, в конце концов ломается.',
    },
    {
      title: 'The Orchestra Conductor',
      content: `A new conductor was told he was the greatest musician in the hall.

"No," he said. "I am the only musician in the hall who makes no sound."

His job was not to play. It was to listen to all the others, hear what was missing, and create the conditions for each musician to give their best.

"That," he said, "is the whole of leadership."`,
      moral: 'A leader\'s role is to amplify others, not themselves.',
      readTime: 2,
      titleRu: 'Дирижёр',
      contentRu: `Новому дирижёру сказали, что он лучший музыкант в зале.

«Нет», — ответил он. «Я единственный музыкант в зале, который не издаёт ни звука».

Его работа состояла не в том, чтобы играть. А в том, чтобы слушать всех остальных, замечать то, чего не хватает, и создавать условия для того, чтобы каждый музыкант мог дать лучшее.

«Вот и всё руководство», — сказал он.`,
      moralRu: 'Задача лидера — усиливать других, а не себя.',
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
      titleRu: 'Свеча и ветер',
      contentRu: `Огонь гордился своим светом.

«Я освещаю всё», — говорил он.

Ветер услышал это и начал дуть. Огонь сопротивлялся, разгораясь сильнее — и был потушен.

Рядом стоял фонарь с изогнутым стеклом вокруг пламени. Ветер дул, пламя металось, но не гасло.

Когда ветер утих, свет фонаря оказался единственным, кто уцелел.`,
      moralRu: 'Самый сильный свет — тот, который знает, когда нужна защита, а не только горение.',
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
      titleRu: 'Капитан и шторм',
      contentRu: `В сильный шторм матросы запаниковали. Они бросились к капитану.

Он стоял у штурвала — спокойный, глядя на воду.

«Ты не боишься?» — спросили они.

«Боюсь», — ответил он. «Но кораблю нужны не мои страхи. Ему нужны мои руки».

Он снова повернулся к штурвалу.`,
      moralRu: 'Лидерство — это не отсутствие страха, а выбор действия вместо паники.',
    },
    {
      title: 'The King\'s Three Questions',
      content: `A king asked three questions: Who is the most important person? What is the most important time? What is the most important thing to do?

After much deliberation, a wise elder answered:

"The most important person is the one before you now. The most important time is now. The most important thing is to do good for the person before you."

The king dismissed his advisors and went to work.`,
      moral: 'Leadership lives entirely in the present moment, with the person in front of you.',
      readTime: 2,
      titleRu: 'Три вопроса царя',
      contentRu: `Царь задал три вопроса: Кто самый важный человек? Какое самое важное время? Каким самым важным делом следует заниматься?

После долгих раздумий мудрец ответил:

«Самый важный человек — тот, кто сейчас перед тобой. Самое важное время — сейчас. Самое важное дело — сделать добро для человека, который сейчас перед тобой».

Царь отпустил своих советников и пошёл работать.`,
      moralRu: 'Лидерство живёт целиком в настоящем моменте — с человеком перед тобой.',
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
      titleRu: 'Смотритель маяка',
      contentRu: `Смотрителя маяка спросили: «Ты зажигаешь свет, который ведёт тысячи кораблей домой. Разве ты сам не хочешь плавать?»

Он долго думал.

«Моряк видит берег мгновение и плывёт дальше», — сказал он. «Я знаю каждый риф, каждое течение, каждый туман этих вод. Мои знания живут в этом свете».

Он зажёг лампу.

«Отсюда я веду кораблей больше, чем любой моряк».`,
      moralRu: 'Лидерство может означать быть тем, кто остаётся, а не тем, кто уходит.',
    },
    {
      title: 'The General\'s Humility',
      content: `After a great victory, a general's aide praised his genius at every step.

The general stopped him. "Tell me one decision I made that was wrong."

The aide hesitated. "I... cannot think of one."

"Then you are useless to me," the general said. "The enemy will find my mistakes. I need someone who finds them first."`,
      moral: 'The leader who cannot hear criticism cannot learn from failure.',
      readTime: 1,
      titleRu: 'Смирение генерала',
      contentRu: `После великой победы адъютант генерала расхвалил его гениальность на каждом шагу.

Генерал остановил его: «Назови мне одно решение, которое я принял неверно».

Адъютант замялся. «Я... не могу вспомнить ни одного».

«Тогда ты мне бесполезен», — сказал генерал. «Враг найдёт мои ошибки. Мне нужен тот, кто найдёт их первым».`,
      moralRu: 'Лидер, который не слышит критики, не может учиться на провалах.',
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
      titleRu: 'Секрет садовника',
      contentRu: `Сад королевы был лучшим во всём королевстве. Она спросила главного садовника о его секрете.

«Я ничего не выращиваю», — ответил он.

Королева нахмурилась: «Но цветы...»

«Я создаю условия», — сказал он. «Правильную почву, правильную воду, правильный свет. Цветы растут сами».

Она посмотрела на своих министров. Потом на сад.

Она всё поняла.`,
      moralRu: 'Задача лидера — создавать условия, а не управлять результатами.',
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
      titleRu: 'Два монаха и река',
      contentRu: `Два монаха шли дорогой и подошли к реке с сильным течением. На берегу стояла молодая женщина, не решавшаяся переходить.

Старший монах, хотя их устав запрещал прикасаться к женщинам, предложил ей помощь. Она согласилась, и он перенёс её через реку. Он опустил её на другом берегу, и монахи пошли дальше.

Через несколько часов младший монах не выдержал: «Как ты мог её нести? Наши правила запрещают это».

Старший монах улыбнулся: «Я опустил её несколько часов назад. Почему ты всё ещё несёшь её?»`,
      moralRu: 'Мы страдаем больше от воображения, чем от реальности.',
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
      titleRu: 'Паломник и пыль',
      contentRu: `Паломник шёл долгой дорогой и остановился у колодца. Старая женщина спросила, куда он идёт.

«В святой город», — ответил он. «Надеюсь найти там покой».

Женщина зачерпнула для него воды. «Я прожила у этого колодца всю жизнь», — сказала она. «Люди приходят из святого города в поисках покоя, и другие идут туда за тем же».

Она протянула ему кружку. «Что ты несёшь с собой?»

Он никогда не задумывался над этим вопросом.`,
      moralRu: 'Дорога не даёт нам покой. Мы должны принести его с собой.',
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
      titleRu: 'Потерянный ключ',
      contentRu: `Человек что-то искал под фонарём. Вышел сосед: «Что ты ищешь?»

«Ключ».

«Где ты его потерял?»

«В переулке».

«Тогда почему ищешь здесь?»

«Потому что здесь светло».

Они оба постояли молча.

Потом человек медленно пошёл в темноту туда, где на самом деле потерял ключ.`,
      moralRu: 'Мы ищем там, где удобно, а не там, где лежит ответ.',
    },
    {
      title: 'The Returning Traveler',
      content: `After twenty years abroad, a man returned to his village. He expected to find the same streets, the same people, the same river.

Everything had changed. The friends of his youth had aged. The children were now adults. The river had shifted course.

He felt lost in the place he had called home.

An elder saw his confusion. "You also have changed," she said. "Perhaps that is the reunion you were not expecting."`,
      moral: 'We cannot return to what we left — only to what we have both become.',
      readTime: 2,
      titleRu: 'Вернувшийся странник',
      contentRu: `После двадцати лет за рубежом мужчина вернулся в своё село. Он ожидал увидеть те же улицы, тех же людей, ту же реку.

Всё изменилось. Друзья юности постарели. Дети выросли. Река изменила русло.

Он чувствовал себя потерянным на родине.

Пожилая женщина увидела его растерянность: «Ты тоже изменился», — сказала она. «Может, именно этой встречи ты не ожидал».`,
      moralRu: 'Мы не можем вернуться к тому, что оставили, — только к тому, чем стали оба.',
    },
    {
      title: 'The Fork in the Road',
      content: `At a crossroads, a traveler found two signs. One pointed to the easy road — smooth, well-traveled, with inns along the way. The other to the difficult road — steep, unmarked, with no promise of shelter.

She asked an old man resting at the fork: "Which road leads somewhere worth going?"

He looked at her for a long time. "Both lead somewhere," he said. "The question is what kind of traveler you want to be when you arrive."`,
      moral: 'The path we choose shapes us as much as the destination.',
      readTime: 2,
      titleRu: 'Развилка',
      contentRu: `На перекрёстке путница увидела два указателя. Один указывал на лёгкую дорогу — ровную, оживлённую, с постоялыми дворами. Другой — на трудную: крутую, непомеченную, без обещания ночлега.

Она спросила старика, отдыхавшего у развилки: «Какая дорога ведёт туда, куда стоит идти?»

Он долго смотрел на неё. «Обе куда-то ведут», — сказал он. «Вопрос в том, каким путником ты хочешь прийти к цели».`,
      moralRu: 'Путь, который мы выбираем, формирует нас не меньше, чем пункт назначения.',
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
      titleRu: 'Урок реки',
      contentRu: `Молодая река стремительно неслась вниз с горы, пробивая скалы, уверенная в своей силе.

На краю пустыни она попыталась пересечь песок — и снова и снова исчезала, впитываясь прежде, чем достичь другого берега.

Голос сказал: «Позволь ветру нести тебя».

«Но я потеряю себя», — сказала река.

«Ты потеряешь лишь то, чем была. Ты станешь дождём».`,
      moralRu: 'Некоторые превращения требуют от нас отпустить ту форму, к которой мы привязаны.',
    },
    {
      title: 'The Map and the Territory',
      content: `A young explorer set out with the most detailed map ever made. He followed it precisely through valleys and over passes.

Then the path ended at a cliff the map did not show.

An old guide found him there. "Your map was made by someone who walked this road thirty years ago," she said. "The road has changed."

She folded the map. "Now walk with your eyes."`,
      moral: 'The map is not the territory. At some point, we must trust our own steps.',
      readTime: 2,
      titleRu: 'Карта и местность',
      contentRu: `Молодой путешественник отправился в путь с самой подробной картой, когда-либо составленной. Он точно следовал ей через долины и перевалы.

Потом тропа обрывалась у обрыва, которого на карте не было.

Старый проводник нашёл его там. «Твою карту составлял тот, кто прошёл этой дорогой тридцать лет назад», — сказала она. «Дорога изменилась».

Она сложила карту. «Теперь иди с открытыми глазами».`,
      moralRu: 'Карта — это не местность. В какой-то момент нужно довериться собственным шагам.',
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
      titleRu: 'Берег и глубина',
      contentRu: `Годами мужчина каждый день стоял у кромки океана, глядя на воду. Люди называли его мечтателем.

Однажды моряк спросил: «Почему ты никогда не выходишь в море?»

«Я изучаю океан», — ответил мужчина.

«С берега океан не изучишь».

Мужчина посмотрел на горизонт. «Знаю. Но мне нужно было понять, чего именно я боюсь, прежде чем садиться в лодку».

На следующее утро он купил билет на корабль.`,
      moralRu: 'Понять свой страх — это начало его преодоления.',
    },
    {
      title: 'The Long Way Home',
      content: `A daughter left home angry and swore she would not return. She traveled far, saw much, and after many years found herself exhausted and homesick.

She wrote to her mother: "I am coming home, but I am not who you remembered. I am changed."

Her mother wrote back: "Come as you are. I have also changed. We will meet as strangers who love each other."

The daughter wept and packed her bag.`,
      moral: 'Coming home is not returning to what was — it is being received as what you have become.',
      readTime: 2,
      titleRu: 'Долгий путь домой',
      contentRu: `Дочь ушла из дома в гневе и поклялась не возвращаться. Она много путешествовала, многое видела и спустя годы почувствовала себя измотанной и тоскующей по дому.

Она написала матери: «Я возвращаюсь, но я уже не та, которую ты помнишь. Я изменилась».

Мать ответила: «Приходи такой, какая есть. Я тоже изменилась. Мы встретимся как чужие люди, которые любят друг друга».

Дочь заплакала и начала собирать вещи.`,
      moralRu: 'Вернуться домой — это не возврат к тому, что было, а принятие тем, чем ты стала.',
    },
    {
      title: 'The Wanderer\'s Question',
      content: `A wanderer had traveled every road, crossed every sea, and climbed every mountain. He had seen more than any person he knew.

In his old age, a child asked him: "What is the most important thing you have seen?"

He thought for a long time.

"I have seen that the most interesting country," he said at last, "is the one inside each person I have met."`,
      moral: 'The greatest journey is into understanding another person.',
      readTime: 2,
      titleRu: 'Вопрос странника',
      contentRu: `Странник прошёл все дороги, пересёк все моря, взобрался на все горы. Он видел больше, чем кто-либо из его знакомых.

В старости ребёнок спросил его: «Что самое важное ты видел?»

Он долго думал.

«Я видел, что самая интересная страна», — сказал он наконец, — «это та, что живёт внутри каждого человека, с которым я встречался».`,
      moralRu: 'Величайшее путешествие — это путешествие в понимание другого человека.',
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
      titleRu: 'Горчичное зерно',
      contentRu: `Киса Готами потеряла маленького сына и в безумии горя носила его тело по деревне, умоляя дать ей лекарство, чтобы воскресить его.

Кто-то отправил её к Будде. «Принеси мне горсть горчичных зёрен», — сказал он, — «из дома, где никто не умирал».

Она ходила от двери к двери, но в каждом доме слышала: здесь умер муж, ребёнок, родитель. К вечеру она тихо похоронила сына.

Она вернулась к Будде и сказала: «Теперь я понимаю. Смерть — это не только моё».`,
      moralRu: 'Разделённое горе — это начало исцеления.',
    },
    {
      title: 'The Broken Vase',
      content: `A woman broke her favorite vase — a gift from her late mother. She wept for a long time.

A friend suggested she throw the pieces away.

Instead, she learned kintsugi — the Japanese art of repairing broken pottery with gold.

When the vase was whole again, its cracks gleamed. It was more beautiful than before, and she could see in it everything the vase had survived.`,
      moral: 'What has been broken and repaired can become more beautiful than what was never broken.',
      readTime: 2,
      titleRu: 'Разбитая ваза',
      contentRu: `Женщина разбила любимую вазу — подарок покойной матери. Она долго плакала.

Подруга посоветовала выбросить осколки.

Вместо этого женщина освоила кинцуги — японское искусство склеивания разбитой керамики золотом.

Когда ваза снова стала целой, её трещины сияли. Она была красивее прежнего, и в ней можно было увидеть всё, что ваза пережила.`,
      moralRu: 'То, что было разбито и восстановлено, может стать прекраснее того, что никогда не разбивалось.',
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
      titleRu: 'Осенние листья',
      contentRu: `Ребёнок спросил деда, почему листья падают с деревьев.

«Чтобы освободить место», — ответил он.

«Для чего?»

«Для весны». Он помолчал. «Но они падают, не зная этого. Они падают, потому что пришло их время. Весна наступает потому, что они были готовы отпустить».

Ребёнок поднял красный лист и повертел в руках.

«Вот почему ты не грустишь?» — спросил он.

Дед улыбнулся, но ничего не ответил.`,
      moralRu: 'Отпустить — это не потеря. Это условие для того, что придёт следом.',
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
      titleRu: 'Пустое гнездо',
      contentRu: `Когда последний ребёнок ушёл, мать долго стояла в дверях.

Муж нашёл её там. «О чём ты думаешь?»

«Думаю о всех годах, когда я мечтала о тихом доме», — сказала она. «Молилась о тихом утре без суеты».

Она посмотрела на пустой коридор.

«Теперь я понимаю, что эта суета и была самим главным. Шум был любовью».`,
      moralRu: 'Мы часто понимаем, что имели, только когда этого не стало.',
    },
    {
      title: 'The Potter\'s Wheel',
      content: `A master potter was known for the most beautiful bowls in the region. Students came to learn.

They noticed he kept a bowl with a long crack on his shelf, separate from the others.

"Why do you keep the broken one?" they asked.

"Because it is the one I learned the most from," he said. "Every perfect bowl I have made since — I made knowing what breaking feels like."`,
      moral: 'Failure teaches what success cannot.',
      readTime: 2,
      titleRu: 'Гончарный круг',
      contentRu: `Мастер-гончар был известен лучшими чашами в округе. К нему приходили учиться.

Они заметили, что на его полке стоит чаша с длинной трещиной — отдельно от остальных.

«Почему ты хранишь сломанную?» — спросили они.

«Потому что именно она научила меня больше всего», — ответил он. «Каждая совершенная чаша, которую я сделал с тех пор, я делал, зная, каково это — разбить».`,
      moralRu: 'Провал учит тому, чему успех научить не может.',
    },
    {
      title: 'The Willow Tree',
      content: `After a great flood, a farmer walked his ruined fields. Only one tree still stood: a willow at the river's edge.

He asked it: "How did you survive while the oaks were swept away?"

The willow's branches moved in the current.

"I did not hold on," it said. "I let the water move through me. The oaks tried to stop the river. I tried to be part of it."`,
      moral: 'Grief moves through us when we stop trying to stop it.',
      readTime: 2,
      titleRu: 'Ива',
      contentRu: `После великого наводнения фермер обходил разорённые поля. Стояло лишь одно дерево: ива у берега реки.

Он спросил её: «Как ты выжила, когда дубы унесло?»

Ветви ивы колыхались в потоке.

«Я не держалась», — ответила она. «Я позволила воде проходить сквозь меня. Дубы пытались остановить реку. Я пыталась стать её частью».`,
      moralRu: 'Горе проходит сквозь нас, когда мы перестаём его сдерживать.',
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
      titleRu: 'Угасающая звезда',
      contentRu: `Астроном сказала своим студентам: «Свет некоторых из этих звёзд вышел ещё до того, как по земле ходили люди. Сама звезда, возможно, уже не существует».

Студент спросил: «На что же мы тогда смотрим?»

«На то, что было», — сказала она. «И может, этого достаточно. Свет путешествует долго после того, как источник угас».

Она выключила лампу.

В темноте звёзды стали ярче.`,
      moralRu: 'То, что мы любили, продолжает своё путешествие, даже когда источника уже нет.',
    },
    {
      title: 'The Last Letter',
      content: `A man found, after his father died, a box of unsent letters. His father had written to him for thirty years — every birthday, every milestone — but had never sent them.

At first the man was angry.

Then he read them. All of them.

By the last letter, he understood that his father had been speaking to him his whole life, in the only language he knew: silence and hope.`,
      moral: 'Some love is expressed in ways we only see after the person is gone.',
      readTime: 2,
      titleRu: 'Последнее письмо',
      contentRu: `После смерти отца мужчина нашёл коробку с неотправленными письмами. Отец писал ему тридцать лет — на каждый день рождения, на каждое важное событие — но так и не отправил ни одного.

Сначала мужчина был в ярости.

Потом он прочёл их. Все до одного.

К последнему письму он понял: отец разговаривал с ним всю жизнь — на единственном языке, который знал: молчания и надежды.`,
      moralRu: 'Некоторая любовь выражается так, как мы видим лишь после того, как человека не стало.',
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
      titleRu: 'Открытая ладонь',
      contentRu: `Скорбящая женщина пришла к мудрецу. «Как мне унять боль от потери любимого человека?»

Мудрец вложил ей в ладонь камень. «Сожми его как можно крепче».

Она сжала кулак.

«А теперь попробуй что-нибудь принять».

Она не могла открыть руку, не выронив камень.

«Горе, которое держишь слишком крепко», — сказал он, — «не оставляет места для того, что жизнь всё ещё предлагает».`,
      moralRu: 'Нужно научиться держать потерю достаточно бережно, чтобы всё ещё принимать жизнь.',
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
      titleRu: 'Тающая свеча',
      contentRu: `Ребёнок заплакал, когда свеча догорала. «Она умирает», — сказал он.

Бабушка покачала головой.

«Посмотри вокруг», — сказала она. «В этой комнате было темно. Теперь ты видишь картины, книги, лица людей, которых любишь. Свеча не исчезла — она стала светом».

Ребёнок перестал плакать.

Долго смотрел на свет на стенах.`,
      moralRu: 'То, что мы теряем, не исчезает — оно превращается в то, что оно нам дало.',
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
      titleRu: 'Прыжок лягушки',
      contentRu: `На бревне сидели пять лягушек. Четыре решили прыгнуть.

Сколько лягушек осталось на бревне?

Пять.

Есть разница между решением и действием.

Лягушка, которая по-настоящему это поняла, уже прыгнула в пруд, не зная его глубины — и обнаружила, что умеет плавать.`,
      moralRu: 'Решить — это не сделать. В пространстве между ними умирают мечты.',
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
      titleRu: 'Орёл и обрыв',
      contentRu: `Мать-орлица столкнула орлёнка из гнезда. Он падал, беспомощно хлопая крыльями, земля неслась навстречу.

В последний момент мать поднырнула под него и вернула обратно в гнездо.

Потом столкнула снова.

И снова.

Пока крылья не вспомнили, для чего они.`,
      moralRu: 'Некоторым вещам можно научиться только в падении.',
    },
    {
      title: 'The Seed and the Dark',
      content: `A seed sat at the edge of a garden bed, watching other seeds be pressed into the dark earth.

"I don't want to go in," it said. "It is dark and I do not know what will happen."

A gardener heard it. "You are right," she said. "You don't know. But what you are now is the smallest thing you will ever be."

She pressed it gently into the soil.`,
      moral: 'Growth begins where certainty ends.',
      readTime: 1,
      titleRu: 'Семя и тьма',
      contentRu: `Семя сидело у края грядки и смотрело, как другие семена вдавливают в тёмную землю.

«Я не хочу туда», — сказало оно. «Там темно, и я не знаю, что случится».

Садовница услышала это. «Ты права», — сказала она. «Не знаешь. Но то, чем ты являешься сейчас, — это самое маленькое, чем ты когда-либо будешь».

Она осторожно вдавила его в почву.`,
      moralRu: 'Рост начинается там, где заканчивается уверенность.',
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
      titleRu: 'Канатоходец',
      contentRu: `Шарль Блонден перешёл Ниагарский водопад по канату перед толпой в несколько тысяч человек. Он спросил: «Вы верите, что я смогу перейти снова?»

«Да!» — кричала толпа.

«Верите, что смогу провезти кого-нибудь в тачке?»

«Да! Да!»

«Отлично», — сказал он, берясь за ручки. «Тогда садитесь».

Толпа замолчала. Никто не двинулся с места.`,
      moralRu: 'Есть разница между верой и готовностью.',
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
      titleRu: 'Нераспечатанный подарок',
      contentRu: `После смерти пожилой женщины нашли красивое шёлковое платье в коробке — с нетронутой папиросной бумагой и непоснятыми бирками.

Дочь узнала его: «Ты купила это пятнадцать лет назад».

«Берегла для особого случая», — тихо сказала соседка.

Дочь держала платье в руках.

«Я не буду ничего беречь», — сказала она. «Каждый день, когда я просыпаюсь, — это и есть тот самый случай».`,
      moralRu: 'Риск откладывать жизнь на потом в том, что потом так и не наступает.',
    },
    {
      title: 'The Locked Garden',
      content: `Behind a stone wall in the city, a locked garden had gone untended for years. People passed the locked gate and imagined what was inside — flowers, shade, peace.

One day, a child found the key in the gutter and opened the gate.

Inside was dirt and weeds.

She didn't leave. She came back the next day with seeds.`,
      moral: 'What we imagine behind closed doors is never what we find. But that is not a reason to leave the door locked.',
      readTime: 2,
      titleRu: 'Запертый сад',
      contentRu: `За каменной стеной в городе был запертый сад, долгие годы стоявший в запустении. Люди проходили мимо запертой калитки и воображали, что там внутри — цветы, тень, покой.

Однажды ребёнок нашёл ключ в сточной канаве и открыл калитку.

Внутри были грязь и сорняки.

Она не ушла. Она вернулась на следующий день с семенами.`,
      moralRu: 'За закрытыми дверями никогда не оказывается то, что мы воображали. Но это не повод держать дверь запертой.',
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
      titleRu: 'Парашют',
      contentRu: `Инструктор по прыжкам с парашютом спросила ученика перед первым прыжком: «Что самое страшное может случиться?»

«Парашют не откроется», — ответил он.

«И тогда?»

«Я дёрну запасной».

«А если и он не откроется?»

Он помолчал. «Тогда я погибну».

«Да», — сказала она. «И тебе страшно?»

«Очень».

«Хорошо. Страх означает, что ты понимаешь ставки. Теперь прыгаем».`,
      moralRu: 'Ясное понимание худшего — это то, что даёт нам свободу выбора.',
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
      titleRu: 'Переправа через реку',
      contentRu: `Мужчина стоял на берегу быстрой реки без моста и смотрел на течение.

Друг окликнул его с другого берега: «Переправы нет! Течение слишком сильное!»

Мужчина вошёл в воду. Вода поднялась до колен, до пояса, до груди. Он перебрался.

На другом берегу он обернулся и крикнул: «Можно переправиться!»

«Откуда ты знал?» — крикнул друг.

«Не знал. Это единственный способ узнать».`,
      moralRu: 'Некоторые вещи можно оценить только изнутри.',
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
      titleRu: 'Незаконченная картина',
      contentRu: `Художница держала наполовину написанный холст на стене десять лет.

Студенты спрашивали: «Почему ты не заканчиваешь его?»

«Боюсь», — говорила она. «Пока он не закончен, он может оказаться моим лучшим творением».

Молодой студент сказал: «Пока он не закончен, он — ничто».

На следующее утро она взяла кисть.`,
      moralRu: 'Риск незавершённости — навсегда остаться в безопасности потенциала.',
    },
    {
      title: 'The Two Doors',
      content: `A man stood before two doors. One was familiar — he knew exactly what was behind it. The other he had never opened.

He stood there for so long that a woman behind him finally said: "Are you going in?"

"I don't know what's behind the second door."

"Neither do I," she said. "But I know you've already seen everything behind the first one."`,
      moral: 'The greatest risk is choosing the known over the possible.',
      readTime: 1,
      titleRu: 'Две двери',
      contentRu: `Мужчина стоял перед двумя дверями. Одна была знакомой — он точно знал, что за ней. Другую он никогда не открывал.

Он стоял так долго, что женщина за его спиной наконец спросила: «Вы войдёте?»

«Я не знаю, что за второй дверью».

«Я тоже», — сказала она. «Но я знаю, что за первой вы уже видели всё».`,
      moralRu: 'Величайший риск — выбрать известное вместо возможного.',
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
      titleRu: 'Строитель мостов',
      contentRu: `Старый человек, идущий одинокой дорогой, подошёл на исходе дня к широкой пропасти. Он перебрался через неё, умело и осторожно, в сумеречном свете.

Но достигнув другого берега, он обернулся и начал строить мост назад.

Попутчик сказал: «Старик, ты безопасно пересёк эту пропасть — зачем строить мост, по которому ты уже не пойдёшь?»

Строитель ответил: «Следом за мной идёт юноша, которому тоже нужно пройти этой ночью».`,
      moralRu: 'Доверие строится не для себя, а для тех, кто придёт после.',
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
      titleRu: 'Слепой путник',
      contentRu: `Слепому нужно было впервые пересечь оживлённый город. Незнакомец предложил проводить его.

«Как я знаю, что ты не заведёшь меня под машину?» — спросил слепой.

«Не знаешь», — ответил незнакомец.

Они стояли молча.

«Вот в чём природа доверия», — сказал незнакомец. «Это не уверенность. Это решение».

Слепой взял его под руку.`,
      moralRu: 'Доверие — это не уверенность. Это выбор, сделанный в её отсутствие.',
    },
    {
      title: 'The Seed and the Farmer',
      content: `A farmer planted her best seeds in the dark earth and walked away.

A neighbor asked: "How do you know they will grow? You can't see them."

"I don't know," she said. "But I know that seeds need darkness before they need light. And I know that watching them every hour will not make them grow faster."

She went home and had her supper.`,
      moral: 'Sometimes trust means planting and walking away.',
      readTime: 1,
      titleRu: 'Семя и фермер',
      contentRu: `Фермер посадила лучшие семена в тёмную землю и ушла.

Сосед спросил: «Откуда ты знаешь, что они вырастут? Ты же их не видишь».

«Не знаю», — ответила она. «Но я знаю, что семенам нужна тьма, прежде чем им нужен свет. И знаю, что смотреть на них каждый час не ускорит их рост».

Она пошла домой и поужинала.`,
      moralRu: 'Иногда доверие — это посадить и уйти.',
    },
    {
      title: 'The Tightrope and the Net',
      content: `Before a young circus performer's first show, she looked down at the net below the wire.

"I don't need it," she told her trainer. "I won't fall."

"The net is not for when you think you will fall," he said. "It is for when the unexpected happens. It is not a sign of weakness. It is a sign that someone thought you were worth catching."

She performed without falling. But she was glad the net was there.`,
      moral: 'Being trusted with a safety net is a form of love.',
      readTime: 2,
      titleRu: 'Канат и сеть',
      contentRu: `Перед первым выступлением молодая цирковая артистка посмотрела вниз на страховочную сеть.

«Она мне не нужна», — сказала она тренеру. «Я не упаду».

«Сеть — не для того, когда ты думаешь, что упадёшь», — ответил он. «Она для неожиданного. Это не признак слабости. Это знак того, что кто-то решил: ты стоишь того, чтобы тебя поймать».

Она выступила без падений. Но была рада, что сеть была там.`,
      moralRu: 'Получить страховочную сеть — это форма любви.',
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
      titleRu: 'Деревенский колодец',
      contentRu: `В засушливый год деревня делила один колодец. Каждой семье полагалось по ведру в день.

Ночью одна семья взяла два. Никто не видел.

Но на следующее утро колодец оказался ниже. А потом ещё кто-то взял два. Потом ещё одна семья.

Через неделю колодец высох.

Никто не договаривался брать меньше. Никто не договаривался брать больше. Но доверие, нарушенное одной семьёй, рухнуло для всех.`,
      moralRu: 'Доверие — это общее достояние. Когда один нарушает его, платят все.',
    },
    {
      title: 'The Captain\'s Word',
      content: `A captain was known for one thing: he never promised what he couldn't deliver, and he always delivered what he promised.

His first mate asked: "Is that really the secret of command?"

"No," said the captain. "The secret is that your crew will sail into storms for you — but only if they believe you will bring them home. And they will only believe that if everything small you've ever told them has been true."`,
      moral: 'Trust is built in small moments long before it is needed in great ones.',
      readTime: 2,
      titleRu: 'Слово капитана',
      contentRu: `Капитан был известен одним: он никогда не обещал того, чего не мог выполнить, и всегда выполнял то, что обещал.

Первый помощник спросил: «Это и есть секрет командования?»

«Нет», — сказал капитан. «Секрет в том, что твоя команда пойдёт с тобой в шторм — но только если верит, что ты вернёшь их домой. А они поверят только тогда, когда всё маленькое, что ты когда-либо говорил, оказалось правдой».`,
      moralRu: 'Доверие строится в малых моментах задолго до того, как оно понадобится в великих.',
    },
    {
      title: 'The Hidden Roots',
      content: `A student asked: "What keeps the oldest trees standing when the storms come?"

The master took him to the forest and showed him the surface of the ground, then dug into the earth to show the roots: thick as trunks, reaching deep and wide, invisible to everyone above ground.

"The tree does not stand because of what you see," she said. "It stands because of what built slowly, in the dark, over many years."`,
      moral: 'The strength of any relationship lies in what was built before the storm came.',
      readTime: 2,
      titleRu: 'Скрытые корни',
      contentRu: `Студент спросил: «Что держит старейшие деревья, когда приходят бури?»

Мастер отвела его в лес, показала поверхность земли, а потом раскопала почву, чтобы обнажить корни: толстые как стволы, уходящие глубоко и в стороны, невидимые всем, кто смотрит сверху.

«Дерево стоит не благодаря тому, что видишь», — сказала она. «Оно стоит благодаря тому, что медленно строилось в темноте долгие годы».`,
      moralRu: 'Сила любых отношений — в том, что было выстроено до прихода бури.',
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
      titleRu: 'Задержанный поезд',
      contentRu: `Путник ждал часами на платформе поезда, который задержали, а потом отменили. Он был в ярости.

Пожилая женщина рядом была спокойна.

«Вы часто ездили этим поездом?» — спросил он.

«Много раз», — ответила она. «Иногда он опаздывает. Иногда не приходит. Но он всегда в конце концов приходил».

Она посмотрела на него. «Вопрос в том, доверяете ли вы системе достаточно, чтобы ждать, или злость обходится вам дороже, чем задержка».`,
      moralRu: 'Доверие испытывается всего сильнее в ожидании, а не в прибытии.',
    },
    {
      title: 'The Borrowed Light',
      content: `A lantern maker was dying and had one last lamp. Many came to ask for it.

He gave it to the person he trusted least.

Everyone was shocked.

"She is the one," he said, "who will need it most. Those I trust already carry their own light. But she — if she has this lamp, she will remember that someone believed she was worth trusting. And that memory will light more than any lamp."`,
      moral: 'Trust offered to those who expect none of it has the power to transform them.',
      readTime: 2,
      titleRu: 'Одолженный свет',
      contentRu: `Умирающий мастер-фонарщик имел один последний светильник. Многие пришли просить его.

Он отдал его тому, кому доверял меньше всего.

Все были потрясены.

«Это человек», — сказал он, — «которому это нужнее всего. Тем, кому я доверяю, уже есть свой свет. Но она — если у неё будет этот светильник, она запомнит, что кто-то счёл её достойной доверия. И это воспоминание осветит больше, чем любой светильник».`,
      moralRu: 'Доверие, предложенное тем, кто его не ожидает, способно их преобразить.',
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
      titleRu: 'Незаконченный мост',
      contentRu: `Две деревни начали строить мост с противоположных берегов. Каждая работала, не видя прогресса другой.

Прошли годы. Когда они наконец встретились посередине, арки не совпали точь-в-точь.

Но они были достаточно близко.

Инженеры сказали, что можно поправить за день.

Жители посмотрели на зазор — свидетельство многолетней раздельной веры в то, что другая сторона тоже строит — и решили оставить его как есть.`,
      moralRu: 'Небольшое несовпадение в доверии доказывает, что обе стороны работали.',
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
      titleRu: 'Каменотёсы',
      contentRu: `Путница наткнулась на трёх каменотёсов, работавших в каменоломне.

«Что ты делаешь?» — спросила она первого.

«Рублю камень», — ответил он, не поднимая головы.

Она спросила второго. Тот остановился: «Зарабатываю, чтобы семья могла есть».

Она спросила третьего. Он отложил зубило, посмотрел на наполовину готовый блок и с тихой гордостью сказал:

«Я строю собор».`,
      moralRu: 'Одна и та же работа, сделанная ради смысла, становится совершенно другой.',
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
      titleRu: 'Последний урок',
      contentRu: `Умирающий профессор попросил студентов собраться. Он был слишком слаб, чтобы стоять, и преподавал с постели.

Студент спросил: «Что самое важное вы узнали за жизнь?»

Он долго думал.

«Что вопросы важнее ответов. Я много раз менял ответы. Но вопросы — глубокие вопросы — я хранил всю жизнь».

Он закрыл глаза.

«Берегите свои вопросы», — сказал он.`,
      moralRu: 'Вопросы, которые мы несём в себе, ценнее ответов, которые мы держим в голове.',
    },
    {
      title: 'The Name Carved in Stone',
      content: `A man visited an ancient cemetery and noticed that the graves of the very old had smooth stones — the names worn away by time and weather.

Newer graves had sharp, legible inscriptions.

He asked the caretaker: "Does it bother the families, that the names fade?"

"The stones fade," she said. "But as long as someone is alive who remembers — the name is still carved somewhere."`,
      moral: 'We are not remembered in stone but in the people who carry us.',
      readTime: 2,
      titleRu: 'Имя, высеченное в камне',
      contentRu: `Мужчина посетил старинное кладбище и заметил, что на очень старых надгробиях камни стали гладкими — имена стёрло время и непогода.

На новых надгробиях надписи были чёткими и разборчивыми.

Он спросил смотрителя: «Родственников не беспокоит, что имена стираются?»

«Камни стираются», — ответила она. «Но пока жив хоть один человек, который помнит — имя всё ещё высечено где-то».`,
      moralRu: 'Нас помнят не в камне, а в людях, которые нас хранят.',
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
      titleRu: 'Царь, спросивший «зачем»',
      contentRu: `Царь вызвал своего мудрейшего советника и спросил: «В чём смысл моей жизни?»

Советник долго молчал.

«Ваше величество строил дороги, прекращал войны, кормил тысячи людей. Разве этого недостаточно?»

Царь посмотрел в окно. «Потому что я никогда этого не выбирал. Это была жизнь, в которую я родился».

Советник сказал: «Тогда, может быть, смысл — не в том, что вы сделали, а в том, что вы задали этот вопрос».`,
      moralRu: 'Смысл приходит не в ответе, а в самом вопрошании.',
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
      titleRu: 'Пустой трон',
      contentRu: `После смерти великого царя его трон пустовал три года. Царство жило в мире.

Гости спрашивали: «Кто правит?»

Министры отвечали: «Последние законы царя. Его последние слова. Его последние решения».

Один гость сказал: «Значит, он всё ещё царь».

«Нет», — ответил старый министр. «Но то, что он построил, по-прежнему стоит. Это лучше».`,
      moralRu: 'Величайшая жизнь та, чьё влияние переживает саму жизнь.',
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
      titleRu: 'Два семени',
      contentRu: `Два семени лежали в земле. Одно говорило: «Я боюсь. Если я вырасту, ветер может меня сломать. Животные могут меня съесть. Засуха может убить».

Другое семя пробило маленький росток к свету.

«Но если я не вырасту», — сказало оно, — «я наверняка умру здесь, в темноте, так и не узнав, чем должно было стать».

Первое семя долго думало об этом.

К тому времени второе семя уже стало деревом.`,
      moralRu: 'Риск стать — меньше, чем уверенность остаться ничем.',
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
      titleRu: 'Носильщик фонаря',
      contentRu: `Мужчина каждую ночь ходил по тёмному городу с фонарём, хотя сам прекрасно видел в темноте.

Люди спрашивали: «Зачем ты несёшь это? Тебе не нужно».

«Нет», — говорил он. «Но тем, кто идёт позади меня, нужно. И если я несу его, они могут идти без страха».

Кто-то спросил: «Они знают, что ты несёшь его ради них?»

«Нет», — ответил он.

И шёл дальше.`,
      moralRu: 'Некоторые из самых значимых поступков невидимы для тех, кому они служат.',
    },
    {
      title: 'The Forgotten Artist',
      content: `A painter died unknown, her canvases rolled and stored in a barn. Decades later, a child found them and was transfixed.

The child grew up to be an artist, and always said she owed everything to a painter she had never met.

Her students asked who this painter was.

"I don't know her name," she said. "But she painted as if someone would find her work long after she was gone — and put everything into it."`,
      moral: 'Work done with integrity creates value beyond what we can see.',
      readTime: 2,
      titleRu: 'Забытая художница',
      contentRu: `Художница умерла безвестной, её холсты свёрнуты и сложены в амбаре. Десятилетия спустя ребёнок нашёл их и был потрясён.

Этот ребёнок вырос художником и всегда говорил, что всем обязан художнице, с которой никогда не был знаком.

Её студенты спрашивали, кто эта художница.

«Не знаю её имени», — говорила она. «Но она писала так, будто кто-то найдёт её работы спустя долгое время после её ухода — и вкладывала в них всё».`,
      moralRu: 'Работа, сделанная с честностью, создаёт ценность, которую мы не можем увидеть.',
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
      titleRu: 'Предназначение реки',
      contentRu: `Река спросила океан: «В чём моё предназначение?»

«Достичь меня», — ответил океан.

«Но я течу к тебе уже тысячу лет. Неужели всё — только добраться?»

Океан помолчал.

«Нет. Твоё предназначение — долина, которую ты прорезала, деревни, которые ты питала, рыбы, которых несла, дети, купавшиеся в тебе. Достичь меня было лишь последним из того, что ты сделала».`,
      moralRu: 'Наше предназначение живёт в пути, а не в пункте назначения.',
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
      titleRu: 'Странница и звёзды',
      contentRu: `Странница посмотрела на ночное небо и почувствовала отчаяние. «Я такая маленькая», — сказала она. «Что вообще имеет значение?»

Старый астроном рядом с ней сказал: «Каждый атом в твоём теле был выкован в умирающей звезде. Ты не маленькая в этой вселенной. Ты из неё сделана».

Она снова подняла глаза.

«Это делает мою жизнь значимой?» — спросила она.

«Это делает тебя древней», — ответил он. «Что ты с этим сделаешь — решать тебе».`,
      moralRu: 'Вселенная даёт нам происхождение. Смысл мы даём себе сами.',
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
        update: {
          titleRu:   parable.titleRu   ?? null,
          contentRu: parable.contentRu ?? null,
          moralRu:   parable.moralRu   ?? null,
        },
        create: {
          title:     parable.title,
          content:   parable.content,
          moral:     parable.moral,
          readTime:  parable.readTime,
          titleRu:   parable.titleRu   ?? null,
          contentRu: parable.contentRu ?? null,
          moralRu:   parable.moralRu   ?? null,
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
