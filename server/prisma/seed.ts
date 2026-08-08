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
  { name: 'Wisdom', nameRu: 'Мудрость', slug: 'wisdom', color: '#6B8F71', description: 'Ancient and timeless wisdom' },
  { name: 'Motivation', nameRu: 'Мотивация', slug: 'motivation', color: '#E07B54', description: 'Stories that inspire action' },
  { name: 'Leadership', nameRu: 'Лидерство', slug: 'leadership', color: '#5B7FA6', description: 'Lessons of great leaders' },
  { name: 'Journey', nameRu: 'Путь', slug: 'journey', color: '#9B7EC8', description: 'The path of self-discovery' },
  { name: 'Loss', nameRu: 'Потеря', slug: 'loss', color: '#7A8A8C', description: 'Finding meaning through loss' },
  { name: 'Risk', nameRu: 'Риск', slug: 'risk', color: '#D4A017', description: 'Courage to take the leap' },
  { name: 'Trust', nameRu: 'Доверие', slug: 'trust', color: '#4A90A4', description: 'The foundation of connection' },
  { name: 'Meaning', nameRu: 'Смысл', slug: 'meaning', color: '#8B6F47', description: 'In search of purpose' },
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
    {
      title: 'The Tea Master and the Ronin',
      content: `A tea master serving a feudal lord was mocked by a proud samurai for having no skill with a sword, only with tea. Provoked into a duel he could not refuse, the tea master sought advice from a swordsman friend the night before.

Rather than teaching him to fight, the swordsman said, "Serve tea to your opponent as if it were the last cup you will ever prepare. Nothing else."

The next morning, the tea master approached the duel with such complete, unafraid presence that when he raised his sword overhead — exactly as he would raise a ladle to pour water — the ronin, unnerved by an opponent who showed neither fear nor aggression, dropped his own sword and begged forgiveness.`,
      moral: 'Complete presence in the smallest act can carry more power than any display of force.',
      readTime: 1,
      titleRu: 'Мастер чая и ронин',
      contentRu: `Мастер чая, служивший при дворе феодала, был осмеян гордым самураем за то, что не владел мечом — только чайной церемонией. Втянутый в поединок, которого не мог избежать, мастер чая накануне вечером обратился за советом к другу-фехтовальщику.

Тот не стал учить его драться, а сказал: «Подавай чай своему противнику так, будто это последняя чашка, которую ты когда-либо приготовишь. Больше ничего не делай».

На следующее утро мастер чая вышел на поединок с таким полным, бесстрашным присутствием, что, подняв меч над головой — точно так же, как поднимал бы ковш, чтобы налить воды, — ронин, обескураженный противником без страха и без агрессии, бросил свой меч и попросил прощения.`,
      moralRu: 'Полное присутствие в самом малом действии может нести больше силы, чем любая демонстрация мощи.',
    },
    {
      title: 'The Useless Tree',
      content: `A carpenter passed an enormous old tree, its trunk gnarled, its branches twisted beyond any use for lumber. His apprentice asked why no one had ever cut it down.

"Because it is useless wood," the carpenter said. "It would ruin any tool that tried to shape it."

That night, the tree appeared to the carpenter in a dream. "You call me useless," it said, "but that very uselessness is why I was never cut down for beams, never split for planks. I have lived three hundred years exactly because I fit no purpose you could name."`,
      moral: 'What refuses to be useful to others is sometimes what survives to become itself.',
      readTime: 1,
      titleRu: 'Бесполезное дерево',
      contentRu: `Плотник проходил мимо огромного старого дерева с узловатым стволом и ветвями, слишком кривыми для какого-либо применения в столярном деле. Его ученик спросил, почему это дерево никогда не срубали.

— Потому что это бесполезная древесина, — ответил плотник. — Она испортит любой инструмент, который попытается её обработать.

Той же ночью дерево явилось плотнику во сне. — Ты называешь меня бесполезным, — сказало оно, — но именно эта бесполезность спасла меня от того, чтобы стать балкой или доской. Я прожило триста лет именно потому, что не годилось ни для одной цели, которую ты мог бы назвать.`,
      moralRu: 'То, что отказывается быть полезным для других, порой именно поэтому и выживает, чтобы остаться собой.',
    },
    {
      title: 'The Triple Filter',
      content: `A man ran up to Socrates, eager to share gossip about a mutual friend. "Wait," Socrates said. "Before you tell me, let's run it through three filters. First: are you certain it's true?"

The man admitted he'd only heard it. "Second: is it something good about our friend?" No, it wasn't.

"Third, then: is it useful to me in any way?" The man shrugged — probably not. "So," Socrates said, "you want to tell me something that may not be true, isn't good, and isn't useful. Why tell me at all?"`,
      moral: 'Most of what people are desperate to tell you fails all three tests, yet gets said anyway.',
      readTime: 1,
      titleRu: 'Тройной фильтр',
      contentRu: `Человек подбежал к Сократу, спеша поделиться слухом об их общем друге. — Постой, — сказал Сократ. — Прежде чем рассказать, давай пропустим это через три фильтра. Первый: ты уверен, что это правда?

Человек признался, что просто где-то это услышал. — Второй: это что-то хорошее о нашем друге? Нет, не хорошее.

— Тогда третий: это мне чем-то полезно? — Мужчина пожал плечами — пожалуй, нет. — Значит, — сказал Сократ, — ты хочешь рассказать мне то, что, возможно, неправда, что нехорошо и бесполезно. Зачем вообще это говорить?`,
      moralRu: 'Большая часть того, что людям не терпится тебе рассказать, не проходит ни один из трёх фильтров — и всё равно произносится.',
    },
    {
      title: 'The Salt Doll and the Ocean',
      content: `A doll made entirely of salt set out one day to learn how deep the ocean was, since it looked vast and unknowable from the shore. It waded in and kept walking forward, deeper and deeper, dissolving a little more of itself into the water with every step.

It never turned back. By the time it reached the depth where the answer would finally have been complete, there was no longer any doll left separate from the ocean to carry that knowledge home.`,
      moral: 'To fully know some things, you may have to stop existing as something separate from them.',
      readTime: 1,
      titleRu: 'Соляная кукла и океан',
      contentRu: `Кукла, целиком сделанная из соли, однажды отправилась узнать, насколько глубок океан, — с берега он казался безбрежным и непостижимым. Она вошла в воду и продолжала идти вперёд, всё глубже и глубже, растворяя себя в воде с каждым шагом.

Она ни разу не повернула назад. К тому моменту, когда она достигла глубины, на которой ответ наконец стал бы полным, от куклы уже не осталось ничего отдельного от океана, что могло бы принести это знание обратно на берег.`,
      moralRu: 'Чтобы по-настоящему что-то познать, порой нужно перестать существовать как нечто отдельное от этого.',
    },
    {
      title: 'The Elephant and the Rope',
      content: `A visitor at a circus noticed that the enormous elephants were held in place by nothing more than a thin rope tied to one front leg and a small wooden stake. He asked the trainer why such powerful animals, easily capable of snapping the rope or uprooting the stake, never even tried to escape.

The trainer explained that when the elephants were very young and much weaker, the very same size of rope and stake had been enough to hold them, and after repeatedly failing to break free as calves, they had simply stopped trying. Now, fully grown and strong enough to walk away at any moment, they still believed the rope could hold them.`,
      moral: 'Many limits we live inside of were only ever true when we were smaller than we are now.',
      readTime: 1,
      titleRu: 'Слон и верёвка',
      contentRu: `Посетитель цирка заметил, что огромных слонов удерживает на месте лишь тонкая верёвка, привязанная к одной передней ноге, и небольшой деревянный колышек. Он спросил дрессировщика, почему такие мощные животные, способные легко порвать верёвку или выдернуть колышек, даже не пытаются сбежать.

Дрессировщик объяснил, что когда слоны были совсем маленькими и намного слабее, такой же верёвки и колышка было достаточно, чтобы их удержать, и после многократных неудачных попыток вырваться в детстве они просто перестали пытаться. Теперь, выросшие и достаточно сильные, чтобы уйти в любой момент, они всё ещё верят, что верёвка способна их удержать.`,
      moralRu: 'Многие границы, внутри которых мы живём, были правдой лишь тогда, когда мы были меньше, чем сейчас.',
    },
    {
      title: 'The Fox Without a Tail',
      content: `A fox caught its tail in a trap and, to escape with his life, chewed it off and ran free. Ashamed to be seen without it, but needing cover for his shame, he called a meeting of all the other foxes and argued passionately that tails were nothing but useless dead weight — heavy, easily grabbed by hunting dogs, and good for nothing but decoration.

He urged every fox present to cut off their own tail immediately for their own safety and convenience. One old fox in the back listened to the whole speech, then said dryly, "You would not be so quick to condemn tails, friend, if you still had one of your own to lose."`,
      moral: 'Be suspicious of advice to give up something valuable from someone who has already lost it themselves.',
      readTime: 1,
      titleRu: 'Лис без хвоста',
      contentRu: `Лис попал хвостом в капкан и, чтобы спастись, отгрыз его и убежал на свободу. Стыдясь показываться без хвоста, но нуждаясь в оправдании своего стыда, он созвал сход всех лисиц и с жаром убеждал, что хвост — не более чем бесполезный груз: тяжёлый, за него легко хватают охотничьи псы, и годится он лишь для украшения.

Он призывал каждую присутствующую лисицу немедленно отрубить себе хвост ради собственной безопасности и удобства. Один старый лис в глубине толпы выслушал всю речь, а затем сухо заметил: — Ты бы не спешил так осуждать хвосты, приятель, будь у тебя самого ещё хоть один, который можно потерять.`,
      moralRu: 'Стоит насторожиться, если совет отказаться от чего-то ценного даёт тот, кто уже сам это потерял.',
    },
    {
      title: 'The Wounded Healer of the Talmud',
      content: `A rabbi met the prophet Elijah near a cave and asked him to point out the Messiah among the beggars gathered at the city gate. Elijah pointed to a leper sitting among the poor, patiently unwrapping and rewrapping his bandages one wound at a time, never all at once.

The rabbi approached him and asked when he would come to redeem the world. "Today," the man answered. The rabbi waited the whole day, and when the man never came, he returned to Elijah, feeling deceived. Elijah explained: the man had meant that he stays ready to answer the call at any single moment, tending one wound at a time so that he is never too encumbered to rise the instant he is needed.`,
      moral: 'Being ready for a single, urgent moment sometimes matters more than trying to have everything already resolved.',
      readTime: 1,
      titleRu: 'Раненый целитель из Талмуда',
      contentRu: `Раввин встретил пророка Илию у пещеры и попросил его указать на Мессию среди нищих, собравшихся у городских ворот. Илия указал на прокажённого, сидевшего среди бедняков и терпеливо разматывавшего и заново перевязывавшего свои раны — по одной за раз, никогда все сразу.

Раввин подошёл к нему и спросил, когда тот придёт, чтобы искупить мир. — Сегодня, — ответил тот. Раввин прождал весь день, и когда человек так и не пришёл, вернулся к Илии, чувствуя себя обманутым. Илия объяснил: человек имел в виду, что он держит себя готовым откликнуться на зов в любой единственный миг, обрабатывая раны по одной, чтобы никогда не оказаться слишком обременённым и суметь подняться в тот самый момент, когда понадобится.`,
      moralRu: 'Готовность к одному-единственному срочному мгновению порой значит больше, чем попытка заранее уладить всё сразу.',
    },
    {
      title: 'The Physician Who Treated the Cause',
      content: `A famous physician was once asked which of the three brothers in his family — all doctors — was truly the best. He answered that his eldest brother was the greatest, because he could see illness in a person's spirit before any symptom appeared at all, and cured it before it ever became visible, so that only his own family knew how skilled he really was.

His second brother was very good, he said, because he could catch a disease at its earliest hint and cure it quickly, so that neighbors merely thought he was decent at treating minor ailments. As for himself, he said, patients only ever saw him inserting needles into their veins and prescribing bitter medicines for illnesses that had already become severe — which was why, of the three, he was the one everyone assumed was the most skilled.`,
      moral: 'The most valuable prevention is often invisible, while the most visible effort is often just cleanup after the real failure already happened.',
      readTime: 1,
      titleRu: 'Лекарь, который лечил причину',
      contentRu: `Знаменитого лекаря однажды спросили, кто из трёх братьев в его семье — все врачи — самый искусный. Он ответил, что старший брат — величайший из них, потому что видит болезнь духа человека прежде, чем появится хоть один симптом, и излечивает её ещё до того, как она станет заметна, так что о его мастерстве знает только собственная семья.

Средний брат тоже очень хорош, сказал он, потому что улавливает болезнь на самой ранней стадии и быстро её излечивает, так что соседи считают его лишь неплохим лекарем от лёгких недугов. Что до него самого, сказал лекарь, пациенты видят лишь, как он вводит иглы в их вены и прописывает горькие снадобья от болезней, уже ставших тяжёлыми, — именно поэтому из троих братьев все считают самым искусным именно его.`,
      moralRu: 'Самая ценная профилактика обычно незаметна, тогда как самое заметное усилие часто оказывается лишь уборкой после уже случившегося провала.',
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
    {
      title: 'The Calf and the Bull',
      content: `In ancient Greece, a boy named Milo decided to become the strongest man alive. He began by lifting a newborn calf onto his shoulders every morning and carrying it across the yard. Neighbors laughed — a boy hauling a calf changed nothing.

But he returned the next day, and the next. The calf grew heavier week by week, and so, without noticing it, did Milo's strength.

Years later, the calf was a full-grown bull, and Milo carried it across the stadium at Olympia before an astonished crowd. He hadn't grown strong all at once. He had simply never stopped lifting.`,
      moral: "Strength you can't yet see is being built by the weight you keep choosing to carry.",
      readTime: 1,
      titleRu: 'Телёнок и бык',
      contentRu: `В древней Греции мальчик по имени Милон решил стать самым сильным человеком на свете. Каждое утро он поднимал на плечи новорождённого телёнка и проносил его через двор. Соседи смеялись — что изменится от того, что мальчик таскает телёнка?

Но он возвращался на следующий день, и ещё через день. Телёнок с каждой неделей становился тяжелее, а вместе с ним, незаметно для самого Милона, росла и его сила.

Годы спустя телёнок превратился во взрослого быка, и Милон пронёс его через весь стадион в Олимпии на глазах у изумлённой толпы. Он не стал сильным в одночасье. Он просто никогда не переставал поднимать.`,
      moralRu: 'Сила, которую пока не видно, куётся тем весом, что ты продолжаешь нести.',
    },
    {
      title: "The Stutterer's Pebbles",
      content: `As a boy, Demosthenes stammered so badly that crowds laughed him off the speaker's platform before he finished a sentence. Rather than give up his dream of becoming a great orator, he began walking to the seashore each morning, placed smooth pebbles under his tongue, and practiced speaking over the roar of the waves.

For months, his words came out garbled and slow. He kept returning to the shore anyway.

Years later, he stood before the assemblies of Athens as the most celebrated speaker in the city, his stammer gone, his voice able to carry over any noise a crowd could make.`,
      moral: 'The obstacle you practice against in private is what your voice is built from in public.',
      readTime: 1,
      titleRu: 'Камешки заики',
      contentRu: `В детстве Демосфен заикался настолько сильно, что толпа освистывала его с трибуны прежде, чем он успевал закончить фразу. Но вместо того чтобы отказаться от мечты стать великим оратором, он начал каждое утро ходить на морской берег, класть под язык гладкие камешки и учиться говорить, перекрывая голосом шум волн.

Месяцами его слова звучали невнятно и медленно. Он всё равно возвращался на берег снова.

Годы спустя он стоял перед народным собранием Афин как самый прославленный оратор города — без единого заикания, с голосом, способным перекрыть любой шум толпы.`,
      moralRu: 'Препятствие, с которым ты тренируешься наедине, и есть то, из чего строится твой голос на публике.',
    },
    {
      title: "Ten Thousand Ways That Don't Work",
      content: `A young assistant, watching Thomas Edison fail experiment after experiment while trying to perfect a working light bulb, finally asked him how he could bear such repeated failure. Edison looked genuinely puzzled by the question.

"I haven't failed," he said. "I've successfully found ten thousand ways that won't work. Each one gets me closer to the one that will."

He kept testing filaments for years afterward, and eventually found one that lasted.`,
      moral: "Calling something 'failure' or 'data' is a choice, and the choice decides whether you keep going.",
      readTime: 1,
      titleRu: 'Десять тысяч неудачных способов',
      contentRu: `Молодой помощник, наблюдая, как Томас Эдисон терпит неудачу за неудачей, пытаясь довести до ума работающую лампу накаливания, наконец спросил его, как он выносит такое количество провалов. Эдисон явно удивился вопросу.

— Я не потерпел неудачу, — сказал он. — Я успешно нашёл десять тысяч способов, которые не работают. Каждый из них приближает меня к тому, который сработает.

Он продолжал испытывать нити накаливания ещё годы после этого и в конце концов нашёл ту, что продержалась.`,
      moralRu: 'Назвать что-то «провалом» или «данными» — это выбор, и именно этот выбор решает, продолжишь ли ты идти дальше.',
    },
    {
      title: 'The Four-Minute Mile',
      content: `For decades, doctors and coaches agreed that running a mile in under four minutes was a physical impossibility — the human body, they said, simply wasn't built for it. Roger Bannister trained anyway, believing the barrier was in people's minds more than in their legs.

In 1954, he broke it, finishing in 3 minutes 59.4 seconds. Within just forty-six days, another runner broke his new record. Within a few years, dozens of runners had done what an entire century had called impossible, once one man had shown them the wall wasn't actually made of stone.`,
      moral: 'Most limits are only proven real by everyone agreeing not to test them.',
      readTime: 1,
      titleRu: 'Миля за четыре минуты',
      contentRu: `Десятилетиями врачи и тренеры сходились во мнении, что пробежать милю быстрее чем за четыре минуты физически невозможно — человеческое тело, говорили они, просто для этого не приспособлено. Роджер Баннистер всё равно тренировался, веря, что этот барьер существует скорее в головах людей, чем в их ногах.

В 1954 году он преодолел его, показав результат 3 минуты 59,4 секунды. Всего через сорок шесть дней другой бегун побил его новый рекорд. Через несколько лет десятки бегунов сделали то, что целое столетие называло невозможным, — стоило одному человеку показать, что стена на самом деле не каменная.`,
      moralRu: 'Большинство пределов доказывают свою реальность лишь тем, что все молчаливо соглашаются их не проверять.',
    },
    {
      title: "The Carpenter's Last House",
      content: `An aging carpenter told his employer he wished to retire and spend his remaining years with his family. The employer, reluctant to lose his best worker, asked him to build one final house as a personal favor. The carpenter agreed, but his heart wasn't in the work anymore — he rushed the framing, used lesser wood, cut corners he would never have cut before.

When the house was finished, the employer handed him the front door key. "This house is my gift to you," he said, "for your years of service." The carpenter stood in shock, realizing he would now spend the rest of his life living inside the very carelessness he had built.`,
      moral: "The last thing you do out of obligation instead of care is the thing you're most likely to have to live inside of.",
      readTime: 1,
      titleRu: 'Последний дом плотника',
      contentRu: `Стареющий плотник сказал хозяину, что хочет уйти на покой и провести остаток лет с семьёй. Хозяин, не желая терять лучшего работника, попросил его построить в качестве личного одолжения ещё один, последний дом. Плотник согласился, но сердце его уже не лежало к работе — он спешил с каркасом, брал дерево похуже, срезал углы, которых прежде никогда бы не срезал.

Когда дом был готов, хозяин вручил ему ключ от входной двери. — Этот дом — мой подарок тебе, — сказал он, — за годы твоей службы. Плотник застыл в шоке, осознав, что теперь ему предстоит провести остаток жизни внутри той самой небрежности, которую он сам и построил.`,
      moralRu: 'Последнее, что ты делаешь по обязанности, а не по заботе, — это как раз то, внутри чего тебе, скорее всего, придётся жить.',
    },
    {
      title: 'The Sculptor Who Only Removed',
      content: `A visitor watched Michelangelo working for hours on a massive, unremarkable block of marble, chipping away small pieces with no visible plan. "How do you know what to carve?" the visitor finally asked.

Michelangelo didn't look up. "The angel is already in the marble," he said. "I just remove everything that isn't him." Years of quiet, unglamorous chipping later, the finished statue stood revealing a figure so lifelike that people said it looked ready to step down and walk away.`,
      moral: "Sometimes the work isn't building something new — it's patiently removing everything that was never actually you.",
      readTime: 1,
      titleRu: 'Скульптор, который только убирал лишнее',
      contentRu: `Посетитель часами наблюдал, как Микеланджело работает над огромной, ничем не примечательной глыбой мрамора, откалывая небольшие куски без видимого плана. — Как ты узнаёшь, что вырезать? — наконец спросил он.

Микеланджело не поднял глаз. — Ангел уже находится внутри мрамора, — сказал он. — Я лишь убираю всё, что им не является. Спустя годы тихой, неприметной работы завершённая статуя предстала фигурой настолько живой, что люди говорили: кажется, она вот-вот сойдёт с постамента и уйдёт.`,
      moralRu: 'Иногда работа заключается не в том, чтобы создать что-то новое, а в том, чтобы терпеливо убрать всё, чем ты на самом деле никогда не был.',
    },
    {
      title: 'The Two Frogs in the Cream',
      content: `Two frogs fell into a deep churn of cream and found the sides too slippery and steep to climb out. One frog quickly decided the situation was hopeless, stopped struggling, and drowned.

The other frog, unwilling to simply give up even without any clear plan, kept kicking and paddling out of sheer stubbornness, hour after hour, long after it seemed pointless. Eventually his relentless kicking churned the cream into a solid lump of butter firm enough to stand on, and he hopped out to safety.`,
      moral: 'Sometimes persistence works not because you had a plan, but because refusing to stop can eventually change the substance of the problem itself.',
      readTime: 1,
      titleRu: 'Две лягушки в сливках',
      contentRu: `Две лягушки упали в глубокую маслобойку со сливками и обнаружили, что стенки слишком скользкие и крутые, чтобы выбраться. Одна лягушка быстро решила, что положение безнадёжно, перестала бороться и утонула.

Другая, не желая просто сдаваться, даже не имея никакого чёткого плана, продолжала грести и барахтаться из чистого упрямства, час за часом, задолго после того, как это стало казаться бессмысленным. В конце концов её неутомимая работа лапками сбила сливки в твёрдый комок масла, достаточно прочный, чтобы на него встать, и она выпрыгнула наружу, в безопасность.`,
      moralRu: 'Иногда упорство срабатывает не потому, что был план, а потому, что отказ остановиться способен в конце концов изменить саму суть проблемы.',
    },
    {
      title: 'The Composer Who Could Not Hear His Own Symphony',
      content: `By the time he finished his ninth and greatest symphony, the composer had been completely deaf for years, unable to hear a single note of the music he had written entirely inside his own head.

At the premiere, the orchestra played to thunderous effect, and when it ended the audience rose in wild applause, but he remained facing his sheet music, hearing nothing, unaware anything had even happened until a singer gently turned him around to see the crowd on its feet.`,
      moral: 'The instrument you are missing does not have to be the same instrument the work gets made with.',
      readTime: 1,
      titleRu: 'Композитор, не слышавший собственную симфонию',
      contentRu: `К тому времени, когда он закончил свою девятую, величайшую симфонию, композитор уже много лет был полностью глух — не мог услышать ни одной ноты музыки, целиком написанной внутри собственной головы.

На премьере оркестр играл с оглушительным эффектом, и когда всё закончилось, зал поднялся в неистовых овациях, но композитор оставался лицом к нотам, ничего не слыша, не подозревая, что вообще что-то произошло, пока певица бережно не повернула его лицом к вставшему залу.`,
      moralRu: 'Инструмент, которого тебе не хватает, не обязан быть тем же инструментом, которым создаётся работа.',
    },
    {
      title: 'The Runner Who Finished Last',
      content: `A marathon runner injured his leg early in an Olympic race but refused to stop, hobbling the remaining nineteen miles alone on a torn muscle while the stadium emptied and the medal ceremony for the winners came and went.

Hours later, in near darkness, with only a handful of spectators left, he finally staggered through the finish line to a standing ovation louder than the one the gold medalist had received. Asked afterward why he didn't simply withdraw, he said his country hadn't sent him seven thousand kilometers to start a race — they had sent him to finish one.`,
      moral: 'Finishing last is a different category of achievement entirely from not finishing at all.',
      readTime: 1,
      titleRu: 'Бегун, пришедший последним',
      contentRu: `Марафонец повредил ногу в начале олимпийского забега, но отказался останавливаться, хромая оставшиеся тридцать километров в одиночестве на разорванной мышце, пока стадион пустел, а церемония награждения победителей проходила и завершалась.

Спустя часы, почти в темноте, при горстке оставшихся зрителей, он наконец, пошатываясь, пересёк финишную черту под овацию громче той, что досталась золотому медалисту. На вопрос, почему он просто не сошёл с дистанции, он ответил, что его страна отправила его за семь тысяч километров не для того, чтобы начать забег, а для того, чтобы его закончить.`,
      moralRu: 'Прийти последним — это совсем другая категория достижения, нежели вовсе не финишировать.',
    },
    {
      title: 'Cut From the Team',
      content: `As a sophomore, a lanky teenager was cut from his high school varsity basketball team, informed by the coach that he simply wasn't tall enough or good enough to make the roster that year. Instead of quitting the sport, he spent the following months waking before dawn to practice alone on an empty court, telling anyone who would listen later that he pictured that exact moment of being cut every time he was tempted to stop trying.

He went on to become one of the greatest basketball players in the sport's history, and kept a photograph of that year's team roster — his name absent from it — where he could see it before every game he played for the rest of his career.`,
      moral: "The moment someone tells you that you're not good enough can become either the end of the story or the reason you remember it.",
      readTime: 1,
      titleRu: 'Отчисленный из команды',
      contentRu: `На втором году школы долговязого подростка отчислили из основной баскетбольной команды — тренер сообщил, что тот попросту недостаточно высок и недостаточно хорош для состава в этом году. Вместо того чтобы бросить спорт, следующие месяцы он вставал до рассвета, чтобы тренироваться в одиночку на пустой площадке, и позже рассказывал всем, кто готов был слушать, что представлял себе именно тот момент отчисления каждый раз, когда хотел сдаться.

Он стал одним из величайших баскетболистов в истории этого спорта и хранил фотографию состава той команды — без своего имени в списке — там, где мог видеть её перед каждой игрой до конца карьеры.`,
      moralRu: 'Момент, когда тебе говорят, что ты недостаточно хорош, может стать либо концом истории, либо причиной, по которой ты её запомнишь.',
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
    {
      title: 'The North Wind and the Sun',
      content: `The North Wind and the Sun argued over which of them was stronger. Spotting a traveler wrapped in a heavy cloak, they agreed: whoever could make him remove it would win.

The Wind went first, howling with all its force. But the harder it blew, the tighter the traveler clutched his cloak around him. Exhausted, the Wind gave up.

Then the Sun simply shone, warm and steady. Within minutes, the traveler loosened his cloak, and soon took it off entirely to walk in comfort. The Sun had never raised its voice.`,
      moral: 'Warmth moves people where force only makes them hold on tighter.',
      readTime: 1,
      titleRu: 'Северный ветер и Солнце',
      contentRu: `Северный Ветер и Солнце спорили, кто из них сильнее. Заметив путника в тёплом плаще, они решили: кто заставит его снять плащ, тот и победил.

Первым взялся Ветер и подул изо всех сил. Но чем сильнее он дул, тем крепче путник кутался в свой плащ. Обессилев, Ветер сдался.

Тогда Солнце просто засияло — тепло и ровно. Через несколько минут путник ослабил плащ, а вскоре и вовсе снял его, чтобы идти налегке. Солнце ни разу не повысило голос.`,
      moralRu: 'Тепло ведёт людей вперёд, тогда как сила лишь заставляет их держаться крепче.',
    },
    {
      title: 'The Farmer Who Ruled Rome',
      content: `Rome's army was surrounded and near collapse, and the Senate needed a dictator to save the city. They sent messengers to find Cincinnatus, a retired statesman, and found him plowing his own small field, dressed as any farmer.

He put down his plow, took command, crushed the enemy in sixteen days, and then did something no one expected: he resigned the near-total power he'd been given and walked back to his farm to finish the plowing he'd left unfinished.`,
      moral: "The clearest sign of a leader's character is how quickly they hand power back.",
      readTime: 1,
      titleRu: 'Земледелец, который правил Римом',
      contentRu: `Римская армия попала в окружение и была на грани разгрома, и Сенату требовался диктатор, способный спасти город. Гонцов отправили за Цинциннатом, отошедшим от дел государственным мужем, — и нашли его пашущим собственное небольшое поле, одетым как простой земледелец.

Он оставил плуг, принял командование, разгромил врага за шестнадцать дней, а затем сделал то, чего никто не ожидал: сложил с себя почти неограниченную власть, которую ему вручили, и вернулся на поле — доканчивать вспашку, которую оставил незавершённой.`,
      moralRu: 'Самый ясный признак характера лидера — то, как быстро он возвращает власть.',
    },
    {
      title: 'The Captain Who Lost His Ship and Saved His Crew',
      content: `An explorer's ship became trapped in Antarctic ice, was slowly crushed over months, and finally sank, stranding twenty-eight men on the frozen sea with no ship, no radio, and no hope of rescue. The captain's original goal — to be first across the continent — was now impossible, so he quietly set a new one: bring every single man home alive.

Over the next year and a half, through open-boat voyages across brutal seas and a trek over mountains no one had crossed, he did exactly that. Every man survived.`,
      moral: 'When the goal you set out for becomes impossible, the measure of your character is which goal you replace it with.',
      readTime: 1,
      titleRu: 'Капитан, который потерял корабль и спас команду',
      contentRu: `Корабль исследователя застрял во льдах Антарктики, месяцами медленно раздавливался льдами и в итоге затонул, оставив двадцать восемь человек на замёрзшем море без корабля, без радиосвязи и без надежды на спасение. Первоначальная цель капитана — первым пересечь континент — стала невозможной, и он молча поставил себе новую: привести домой живыми всех до единого.

В течение следующих полутора лет, через плавания на открытых шлюпках по жестоким морям и переход через горы, которые прежде никто не пересекал, он добился именно этого. Выжили все.`,
      moralRu: 'Когда цель, к которой ты шёл, становится недостижимой, мерилом характера служит то, какой целью ты её заменишь.',
    },
    {
      title: "The Emperor's New Clothes",
      content: `Two swindlers told a vain emperor they could weave him a magnificent suit invisible to anyone stupid or unfit for their position. The emperor paid handsomely for cloth that didn't exist, and every minister, terrified of appearing incompetent, praised the imaginary garment along with him.

The emperor paraded through the city in nothing at all, and every adult in the crowd, afraid of seeming foolish, cheered the splendor of his invisible robes. It took one small child, with nothing yet to lose by speaking honestly, to shout what everyone could already see: "But he isn't wearing anything at all!"`,
      moral: 'An obvious truth can be suppressed by an entire crowd of adults with something to lose, and revealed by the one person who has nothing to protect.',
      readTime: 1,
      titleRu: 'Новое платье короля',
      contentRu: `Два мошенника сказали тщеславному королю, что могут соткать для него роскошный наряд, невидимый для всякого глупца или человека, не соответствующего своей должности. Король щедро заплатил за несуществующую ткань, и каждый министр, боясь показаться некомпетентным, восхищался вымышленным нарядом вместе с ним.

Король прошествовал по городу совершенно голым, и каждый взрослый в толпе, боясь показаться глупым, восхвалял великолепие его невидимых одежд. Понадобился один-единственный маленький ребёнок, которому нечего было терять от честных слов, чтобы выкрикнуть то, что все и так уже видели: — Да он вообще ничего не надел!`,
      moralRu: 'Очевидную правду способна скрывать целая толпа взрослых, которым есть что терять, и раскрыть её способен лишь тот, кому нечего защищать.',
    },
    {
      title: 'The King Who Commanded the Tide',
      content: `Tired of courtiers endlessly flattering him as though his power had no limits, King Canute ordered his throne carried to the seashore at low tide and sat facing the incoming water. "Sea," he commanded, "you are mine to rule, and I forbid you to rise onto my land, or to wet the feet of your lord."

The tide rose exactly as it always had, soaking his robes and his throne, forcing him to leap back to dry ground. Canute turned to his stunned courtiers and said, "Let all men know how empty and worthless is the power of kings, for there is none worthy of the name save He whom heaven, earth, and sea obey."`,
      moral: 'The clearest way to correct people who flatter your power is to let reality demonstrate its limits in front of them.',
      readTime: 1,
      titleRu: 'Король, повелевший приливу',
      contentRu: `Устав от бесконечной лести придворных, будто его власть не знает границ, король Кнут велел вынести свой трон к морскому берегу во время отлива и сел лицом к наступающей воде. — Море, — произнёс он, — ты подвластно мне, и я запрещаю тебе подниматься на мою землю или мочить ноги твоему господину.

Прилив поднялся точно так же, как всегда, промочив его одежды и трон, и король был вынужден отскочить на сушу. Кнут повернулся к ошеломлённым придворным и сказал: — Пусть все знают, сколь пуста и ничтожна власть королей, ибо нет никого достойного этого имени, кроме Того, кому подчиняются небо, земля и море.`,
      moralRu: 'Самый ясный способ поправить тех, кто льстит твоей власти — позволить реальности прямо у них на глазах показать её пределы.',
    },
    {
      title: 'The General Who Ate Last',
      content: `A famous ancient general, celebrated for the loyalty of his troops, had a habit that puzzled visiting officials: whenever supplies of food or wine ran short during a campaign, he insisted his own portion be given to the wounded and the ordinary soldiers first, eating only what remained after everyone else had been fed, and sometimes not eating at all.

When asked why he risked his own strength this way, he said that a soldier who has watched his commander go hungry so that he could eat will follow that commander into any battle without needing to be ordered.`,
      moral: 'Loyalty that can survive real danger is built in the small, unwitnessed moments of unequal sacrifice, not in speeches.',
      readTime: 1,
      titleRu: 'Полководец, который ел последним',
      contentRu: `У знаменитого древнего полководца, прославленного преданностью своих войск, была привычка, озадачивавшая заезжих чиновников: всякий раз, когда во время похода не хватало еды или вина, он требовал, чтобы его порцию отдавали раненым и рядовым солдатам, а сам ел лишь то, что оставалось после того, как накормили всех остальных, порой не ев вовсе.

Когда его спросили, зачем он так рискует собственными силами, он ответил, что солдат, видевший, как его командир голодал, чтобы поесть мог он, пойдёт за этим командиром в любой бой без всякого приказа.`,
      moralRu: 'Верность, способная выдержать настоящую опасность, строится в маленьких, никем не увиденных моментах неравной жертвы, а не в речах.',
    },
    {
      title: 'The Bridge of the Ten Thousand',
      content: `Deep inside hostile territory, a Greek army's generals were killed by treachery during a false truce, leaving ten thousand soldiers stranded thousands of miles from home with no leadership and enemies on every side. Rather than surrender, the soldiers elected new commanders from among their own ranks that same night and began an organized march back toward the sea, fighting through hostile territory, crossing mountains and rivers, for months.

When the survivors finally saw the sea from a mountaintop, they are said to have wept and embraced each other, shouting the same word over and over: the sea, the sea.`,
      moral: 'Losing your leadership is not the same as losing your ability to lead yourselves.',
      readTime: 1,
      titleRu: 'Поход десяти тысяч',
      contentRu: `Глубоко на вражеской территории военачальников греческого войска предательски убили во время ложного перемирия, оставив десять тысяч солдат за тысячи миль от дома без командования и с врагами со всех сторон. Вместо того чтобы сдаться, солдаты в ту же ночь избрали новых командиров из собственных рядов и начали организованный марш обратно к морю, месяцами пробиваясь через враждебные земли, пересекая горы и реки.

Когда уцелевшие наконец увидели море с вершины горы, они, как гласит предание, плакали и обнимали друг друга, снова и снова выкрикивая одно и то же слово: море, море.`,
      moralRu: 'Потерять командование — не то же самое, что потерять способность вести себя самим.',
    },
    {
      title: 'The Reluctant King Who Hid Among the Baggage',
      content: `When the elders demanded a king, and the prophet Samuel finally presented the man God had chosen — tall, striking, exactly what a crowd wants to see — no one could find him anywhere in the gathered assembly.

Someone finally thought to search among the supply carts and baggage at the edge of camp, and there he was found: hiding, of all places, among the equipment, unwilling to step forward into the role everyone else was certain he was destined for.`,
      moral: "Being obviously suited for something, in everyone else's eyes, is no guarantee you'll feel ready to walk toward it yourself.",
      readTime: 1,
      titleRu: 'Неохотный царь, спрятавшийся среди обоза',
      contentRu: `Когда старейшины потребовали царя, и пророк Самуил наконец представил человека, избранного Богом — высокого, статного, именно такого, какого хочет видеть толпа, — его нигде не могли найти среди собравшихся.

Наконец кому-то пришло в голову поискать среди повозок с припасами и обоза на краю лагеря, и там его и нашли: он прятался, из всех мест именно среди снаряжения, не желая выходить навстречу роли, к которой, как все были уверены, он предназначен.`,
      moralRu: 'То, что все вокруг считают тебя явно подходящим для чего-то, вовсе не гарантирует, что ты сам почувствуешь готовность шагнуть навстречу этому.',
    },
    {
      title: 'The Three Hundred at the Narrow Pass',
      content: `Facing an invading army so vast that, according to legend, their arrows would block out the sun, a Spartan king chose a narrow mountain pass where the enemy's overwhelming numbers couldn't be brought fully to bear at once, and held the line there with a small force for three days.

When warned about the enemy's arrows darkening the sky, one of his soldiers reportedly replied that they would simply fight in the shade. The defenders were eventually surrounded and killed to the last man, but the delay they bought gave the rest of Greece the time it needed to prepare its own defense.`,
      moral: "A leader's job is sometimes not to win the battle in front of them, but to buy time for the battle that actually decides everything.",
      readTime: 1,
      titleRu: 'Триста воинов в узком ущелье',
      contentRu: `Столкнувшись с армией вторжения настолько огромной, что, по преданию, её стрелы должны были закрыть солнце, спартанский царь выбрал узкий горный проход, где подавляющая численность врага не могла быть полностью развёрнута, и удерживал этот рубеж малыми силами три дня.

Когда его предупредили, что вражеские стрелы затмят небо, один из воинов, по преданию, ответил, что тогда они будут сражаться в тени. Защитники в итоге были окружены и перебиты все до единого, но выигранная отсрочка дала остальной Греции время, необходимое для подготовки собственной обороны.`,
      moralRu: 'Задача лидера порой не в том, чтобы выиграть бой, что перед ним, а в том, чтобы выиграть время для боя, который на самом деле решает всё.',
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
    {
      title: "The Farmer's Lost Horse",
      content: `An old farmer's horse ran away. His neighbors came to console him over his bad luck. "Maybe," the farmer said.

The next week, the horse returned, bringing three wild horses with it. The neighbors came to celebrate his good luck. "Maybe," the farmer said.

While taming one of the wild horses, his son fell and broke his leg. The neighbors came to console him again. "Maybe," the farmer said.

Soon after, the army came through the village, conscripting every able-bodied young man for war — except the farmer's son, whose broken leg spared him. The neighbors called it wonderful luck. The farmer only said, "Maybe."`,
      moral: "What looks like the end of the road may only be a bend you can't see around yet.",
      readTime: 1,
      titleRu: 'Пропавший конь старика',
      contentRu: `У старого крестьянина убежал конь. Соседи пришли посочувствовать его несчастью. — Может быть, — сказал старик.

Через неделю конь вернулся, приведя с собой трёх диких лошадей. Соседи пришли порадоваться его удаче. — Может быть, — сказал старик.

Пытаясь приручить одну из диких лошадей, его сын упал и сломал ногу. Соседи снова пришли выразить сочувствие. — Может быть, — сказал старик.

Вскоре через деревню прошла армия, забирая всех крепких юношей на войну — кроме сына старика, которого спасла сломанная нога. Соседи назвали это великой удачей. Старик лишь повторил: — Может быть.`,
      moralRu: 'То, что кажется концом пути, порой оказывается лишь поворотом, которого пока не видно.',
    },
    {
      title: 'The Thread Through the Labyrinth',
      content: `Before Theseus entered the labyrinth to face the Minotaur, Ariadne gave him a single spool of thread. "Tie one end at the entrance," she said, "and let it unwind as you go deeper. It won't help you fight what's inside. It will only help you find your way back out."

Theseus fought the Minotaur in the dark, disoriented, uncertain which turn led forward and which led only deeper. But when it was over, he simply followed the thread, hand over hand, back to the light.`,
      moral: "You don't need a plan for the fight itself — you need a way back to who you were before it.",
      readTime: 1,
      titleRu: 'Нить сквозь лабиринт',
      contentRu: `Прежде чем Тесей вошёл в лабиринт, чтобы сразиться с Минотавром, Ариадна дала ему один-единственный клубок нити. — Привяжи один конец у входа, — сказала она, — и пусть она разматывается, пока ты идёшь вглубь. Она не поможет тебе одолеть то, что внутри. Она лишь поможет найти дорогу обратно.

Тесей сражался с Минотавром в темноте, теряя ориентиры, не зная, какой поворот ведёт вперёд, а какой — лишь глубже. Но когда всё закончилось, он просто пошёл вдоль нити, перебирая её руками, обратно к свету.`,
      moralRu: 'Тебе не нужен план на саму схватку — тебе нужен путь обратно к тому, кем ты был до неё.',
    },
    {
      title: 'Odysseus and the Sirens',
      content: `Odysseus knew his ship would pass the island of the Sirens, whose song drove sailors mad with longing and lured their ships onto the rocks. He didn't trust himself to resist it, so before they came near, he had his crew stuff their ears with wax and bind him tightly to the mast, ordering them not to release him no matter how he begged.

As the song rose, he strained against the ropes, weeping, screaming to be freed. His crew, deaf to the Sirens and following only his earlier orders, rowed on. When the island fell behind them, Odysseus was still alive to hear the silence.`,
      moral: "Knowing you'll be tempted is not weakness — refusing to plan for it is.",
      readTime: 1,
      titleRu: 'Одиссей и сирены',
      contentRu: `Одиссей знал, что его корабль пройдёт мимо острова сирен, чья песня сводила моряков с ума от тоски и заманивала их корабли на скалы. Он не доверял себе устоять перед ней, поэтому, прежде чем они приблизились, велел команде залепить уши воском, а самого себя крепко привязать к мачте, приказав не отпускать его, как бы он ни умолял.

Когда песня зазвучала, он рвался из верёвок, плача, крича, чтобы его освободили. Его команда, глухая к сиренам и подчинявшаяся лишь его прежнему приказу, продолжала грести. Когда остров остался позади, Одиссей был ещё жив, чтобы услышать тишину.`,
      moralRu: 'Знать, что тебя ждёт искушение — не слабость. Слабость — отказаться заранее к нему подготовиться.',
    },
    {
      title: 'The Merchant No One Recognized',
      content: `After twenty-four years traveling the length of Asia, a Venetian merchant finally returned to his home city, weathered, speaking with a foreign accent, dressed in worn Eastern robes. He knocked on his own family's door and had to argue at length before anyone would believe he was the boy who had left as a teenager decades earlier.

Even after they let him in, it took a dramatic gesture — ripping open the seams of his ragged coat to spill out hidden jewels — before his own relatives fully accepted that the stranger at their table was truly their own.`,
      moral: 'A long enough journey can change you so completely that coming home means having to prove who you are all over again.',
      readTime: 1,
      titleRu: 'Купец, которого никто не узнал',
      contentRu: `После двадцати четырёх лет странствий по всей Азии венецианский купец наконец вернулся в родной город — обветренный, говорящий с чужеземным акцентом, одетый в потрёпанные восточные одежды. Он постучал в дверь собственного дома, и ему пришлось долго доказывать, что он и есть тот мальчик, что ушёл подростком десятилетия назад.

Даже когда его впустили, потребовался эффектный жест — он распорол швы своего рваного плаща, и оттуда посыпались спрятанные драгоценности, — прежде чем родные до конца поверили, что незнакомец за их столом действительно свой.`,
      moralRu: 'Достаточно долгое путешествие может изменить тебя настолько, что вернуться домой — значит заново доказывать, кто ты такой.',
    },
    {
      title: 'The Prince and the Four Sights',
      content: `A young prince was raised entirely within his palace walls, deliberately shielded by his father from ever seeing suffering of any kind, so that he might grow up content and eventually rule in peace. Curious about the world beyond the gates, he finally rode out and saw, in a single day, four things he had never encountered before: a frail old man, a man wracked with sickness, a corpse being carried to its burial, and finally a wandering ascetic who had given up everything, and who alone among the four seemed at peace.

The prince returned to his palace that night, but he could no longer see it as home.`,
      moral: 'You cannot un-see suffering once it is real to you, and a sheltered peace rarely survives contact with the truth.',
      readTime: 1,
      titleRu: 'Принц и четыре встречи',
      contentRu: `Юного принца воспитывали целиком внутри дворцовых стен: отец намеренно ограждал его от любого вида страдания, чтобы он рос счастливым и однажды правил в мире. Любопытствуя о том, что лежит за воротами, принц наконец выехал наружу и увидел за один день четыре вещи, которых прежде никогда не встречал: дряхлого старика, человека, изнурённого болезнью, тело, которое несли к месту погребения, и, наконец, странствующего аскета, отказавшегося от всего, — единственного из четверых, кто выглядел умиротворённым.

В ту ночь принц вернулся во дворец, но больше не мог видеть в нём дом.`,
      moralRu: 'Однажды по-настоящему увидев страдание, ты уже не можешь его развидеть, а укрытый от правды покой редко переживает встречу с ней.',
    },
    {
      title: 'The Unfinished Shroud',
      content: `While Odysseus was lost at sea for twenty years, dozens of suitors pressed his wife Penelope to remarry, certain he was dead. She told them she would choose one once she finished weaving a burial shroud for her elderly father-in-law. Every day she wove visibly at her loom before the suitors' eyes.

Every night, alone, she quietly unraveled everything she had woven that day, undoing her own work so the shroud would never actually be finished. For three years this went on, buying time with no plan beyond one more day, until the day her husband finally returned.`,
      moral: "Sometimes faithfulness isn't one heroic act — it's the discipline of undoing your own progress every night rather than let a false ending arrive.",
      readTime: 1,
      titleRu: 'Неоконченный саван',
      contentRu: `Пока Одиссей двадцать лет пропадал в море, десятки женихов настаивали, чтобы его жена Пенелопа вышла замуж снова, уверенные, что он мёртв. Она сказала, что выберет одного из них, как только закончит ткать погребальный саван для своего престарелого свёкра. Каждый день она открыто ткала на глазах у женихов.

Каждую ночь, оставшись одна, она тихо распускала всё, что соткала за день, разрушая собственную работу, чтобы саван так никогда и не был закончен. Так продолжалось три года — она выигрывала время без всякого плана, кроме как продержаться ещё один день, — пока наконец не вернулся её муж.`,
      moralRu: 'Порой верность — это не один героический поступок, а дисциплина каждую ночь разрушать собственный прогресс, лишь бы не позволить наступить ложному финалу.',
    },
    {
      title: 'The Long Road to Ithaca',
      content: `A poet, writing centuries after Homer, imagined Odysseus's true reward was never the return to his island at all, but everything that happened on the twenty-year road there — the Cyclops, the Sirens, the storms, the strange ports and stranger temptations along the way.

He warned future travelers to pray for a long road full of adventure and knowledge rather than a short one, because Ithaca itself, once you finally arrived, would turn out to be humble and unremarkable, having given you already, through the sheer distance of the journey, everything worth having.`,
      moral: 'The destination is often just the excuse the journey needed in order to happen at all.',
      readTime: 1,
      titleRu: 'Долгая дорога на Итаку',
      contentRu: `Поэт, писавший спустя века после Гомера, представлял, что истинной наградой Одиссея была вовсе не сама Итака, а всё, что случилось на двадцатилетнем пути туда — циклоп, сирены, бури, чужие порты и ещё более чужие соблазны на этом пути.

Он призывал будущих путников молиться о долгой дороге, полной приключений и познания, а не о короткой, ведь сама Итака, когда до неё наконец доберёшься, окажется скромной и ничем не примечательной — она уже отдала тебе, самой протяжённостью пути, всё, что стоило получить.`,
      moralRu: 'Пункт назначения часто оказывается лишь поводом, который был нужен путешествию, чтобы вообще состояться.',
    },
    {
      title: 'The Sailor Who Would Not Look Back',
      content: `Told to lead his wife out of a doomed city, a man was warned by an angel that neither he nor anyone with him should look back at the destruction behind them, no matter what they heard.

As fire and ruin rained down and the sound of everything they'd known collapsing filled the air, his wife could not stop herself and turned to look one last time at the home she was leaving. She was turned to a pillar of salt on the spot, frozen forever at the exact moment of looking backward instead of forward.`,
      moral: "Some journeys only work if you refuse yourself even one glance at what you're actually leaving.",
      readTime: 1,
      titleRu: 'Путник, который не оглянулся',
      contentRu: `Человеку, которому велели вывести жену из обречённого города, ангел предупредил, что ни он, ни кто-либо из его спутников не должен оглядываться на разрушение позади, что бы они ни услышали.

Пока огонь и руины сыпались с неба, а звук рушащегося прошлого заполнял воздух, его жена не смогла сдержаться и обернулась в последний раз взглянуть на дом, который покидала. В тот же миг она превратилась в соляной столп, застыв навсегда в момент, когда обернулась назад вместо того, чтобы смотреть вперёд.`,
      moralRu: 'Некоторые путешествия срабатывают лишь тогда, когда ты отказываешь себе даже в одном взгляде на то, что на самом деле оставляешь.',
    },
    {
      title: 'The Man Who Sailed West Anyway',
      content: `Every mapmaker and scholar of his time agreed that sailing west across the open ocean to reach the East would mean running out of food and water long before land ever appeared, if the ships didn't simply fall off the edge of a flat world first. A stubborn navigator spent seven years being rejected by court after court before one queen finally agreed to fund three small ships.

His own crew nearly mutinied in the final week, certain they were sailing to their deaths in open water with no land in sight. Three days later, they sighted land that none of the world's mapmakers had known existed.`,
      moral: "Being wrong about why you're right doesn't stop you from actually finding what you were looking for.",
      readTime: 1,
      titleRu: 'Человек, который всё равно поплыл на запад',
      contentRu: `Все картографы и учёные его времени сходились на том, что плавание на запад через открытый океан ради достижения Востока обернётся нехваткой еды и воды задолго до появления земли — если корабли и вовсе не свалятся с края плоского мира. Упрямый мореплаватель семь лет получал отказ за отказом при разных дворах, пока одна королева наконец не согласилась снарядить три небольших корабля.

Его собственная команда чуть не подняла мятеж в последнюю неделю, уверенная, что они плывут навстречу гибели в открытом море без единого клочка земли на горизонте. Через три дня они увидели землю, о существовании которой не знал ни один картограф мира.`,
      moralRu: 'Ошибаться в том, почему ты прав, не мешает на самом деле найти то, что искал.',
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
    {
      title: 'The Borrowed Jewels',
      content: `A rabbi returned home to find his wife strangely composed, though her eyes were red. "A friend once lent us two precious jewels," she said carefully. "He asked me to keep them safe until he wished to reclaim them. Now he has come for them. Must I return them?"

"Of course," the rabbi answered. "A loan must be returned to its owner."

She led him to their sons' room, where both boys lay still, having died suddenly that afternoon. "The jewels I meant," she whispered, "were ours only to hold. The Lord has reclaimed what was always His."`,
      moral: 'What we love was never fully ours to keep — only ours to hold for a while.',
      readTime: 1,
      titleRu: 'Одолженные драгоценности',
      contentRu: `Раввин вернулся домой и застал жену странно спокойной, хотя глаза её были красны. — Один друг когда-то одолжил нам два драгоценных камня, — осторожно начала она, — и просил сохранить их, пока не придёт время их забрать. Теперь он пришёл за ними. Должна ли я их вернуть?

— Разумеется, — ответил раввин. — То, что дано взаймы, нужно вернуть владельцу.

Она провела его в комнату сыновей, где оба мальчика лежали неподвижно — они внезапно умерли тем днём. — Драгоценности, о которых я говорила, — прошептала она, — были даны нам лишь подержать. Господь забрал то, что всегда принадлежало Ему.`,
      moralRu: 'То, что мы любим, никогда не было нашим насовсем — лишь доверено нам на время.',
    },
    {
      title: "The Selkie's Return",
      content: `A fisherman found a sealskin on the shore and hid it, and the woman who had worn it — unable to return to the sea without it — became his wife. They lived together for years, and she loved their children fiercely, but he sometimes caught her staring at the waves with an ache he couldn't name.

One day their youngest child found the hidden sealskin in the rafters and brought it to her, not knowing what it was. She held it for a long moment, kissed each of her children, and walked into the sea without looking back.`,
      moral: 'Loving someone was never the same thing as owning what makes them whole.',
      readTime: 1,
      titleRu: 'Возвращение селки',
      contentRu: `Рыбак нашёл на берегу тюленью шкуру и спрятал её, и женщина, которая её носила, — не в силах вернуться в море без неё, — стала его женой. Они прожили вместе годы, и она яростно любила их детей, но иногда он замечал, как она смотрит на волны с тоской, которой не мог назвать.

Однажды их младший ребёнок нашёл спрятанную под крышей шкуру и принёс её матери, не зная, что это такое. Она долго держала её в руках, поцеловала каждого из детей и, не оглядываясь, ушла в море.`,
      moralRu: 'Любить кого-то — никогда не то же самое, что владеть тем, что делает его целым.',
    },
    {
      title: "Zhuangzi's Drum",
      content: `When Zhuangzi's wife died, his friend Hui Shi came to offer condolences and found him sitting on the floor, drumming on an upturned basin and singing. "You lived with her, raised children with her, grew old with her," Hui Shi said, appalled. "Not weeping is bad enough — but singing?"

Zhuangzi said, "When she first died, how could I not grieve? But then I looked back to before she was born, before she had a body, before she even had breath. She was a change in the vast flow of things, and now she has changed again, lying down to sleep in a great room. To follow her with wailing would be to misunderstand the flow entirely."`,
      moral: 'Grief and understanding can occupy the same body without either one canceling the other.',
      readTime: 1,
      titleRu: 'Барабан Чжуанцзы',
      contentRu: `Когда умерла жена Чжуанцзы, его друг Хуэй Ши пришёл выразить соболезнования и застал его сидящим на полу — тот отбивал ритм на перевёрнутом тазу и пел. — Ты прожил с ней жизнь, растил детей, состарился рядом с ней, — сказал потрясённый Хуэй Ши. — Не плакать — уже плохо, но петь?

Чжуанцзы ответил: — Когда она только умерла, как я мог не горевать? Но потом я заглянул назад — до её рождения, до того, как у неё было тело, до самого дыхания. Она была лишь переменой в великом потоке вещей, и теперь она снова изменилась, улёгшись спать в огромной комнате. Оплакивать её причитаниями — значит вовсе не понимать этот поток.`,
      moralRu: 'Горе и понимание могут уживаться в одном человеке, не отменяя друг друга.',
    },
    {
      title: "The Woodcutter's Wish",
      content: `A poor woodcutter, exhausted from years of cutting and hauling timber for wealthy merchants, sat under a great tree one evening and said aloud, half-joking, "I wish Death would just come for me already." To his shock, Death himself appeared immediately.

Terrified, the woodcutter stammered out an excuse: "I only called you because I needed help lifting this bundle of wood back onto my shoulders. My back has given out." Death, without a word, helped him hoist the bundle, and the woodcutter walked home alive, having learned not to say aloud what he did not actually mean.`,
      moral: 'Complaints spoken carelessly can be mistaken, by others and by yourself, for the truth of what you actually want.',
      readTime: 1,
      titleRu: 'Желание дровосека',
      contentRu: `Бедный дровосек, измотанный годами рубки и переноски дров для богатых торговцев, сел однажды вечером под большим деревом и сказал вслух, полушутя: — Хоть бы Смерть уже пришла за мной. К его ужасу, Смерть явилась немедленно.

В испуге дровосек пробормотал оправдание: — Я позвал тебя лишь потому, что мне нужна помощь взвалить эту вязанку дров обратно на плечи. Спина совсем не гнётся. Смерть молча помогла ему поднять вязанку, и дровосек пошёл домой живым, усвоив урок: не стоит вслух говорить то, чего на самом деле не хочешь.`,
      moralRu: 'Неосторожно сказанные жалобы можно принять — другими и тобой самим — за правду о том, чего ты на самом деле хочешь.',
    },
    {
      title: 'The God Every Living Thing Wept For',
      content: `Baldr, most beloved of all the gods, began having dreams of his own death, so his mother Frigg traveled across the world and made every single thing — fire, water, iron, stone, every disease, every beast and tree — swear an oath never to harm him. Believing him now invincible, the gods made a game of throwing weapons at him for sport, laughing as everything bounced harmlessly away.

Only the mistletoe, a plant so young and small that Frigg had thought it beneath the trouble of asking, had never taken the oath. Loki learned this, shaped it into a dart, and guided a blind god's throwing hand. Baldr fell dead, and the whole world — every creature, every stone, every river — wept for him, except for one giantess hiding in a cave, who alone refused to shed a single tear, sealing his fate to remain among the dead.`,
      moral: 'It only takes one thing you forgot to guard against, and one refusal to grieve, to make a loss permanent.',
      readTime: 1,
      titleRu: 'Бог, по которому плакало всё живое',
      contentRu: `Бальдру, самому любимому из богов, стали сниться сны о собственной смерти, и его мать Фригг обошла весь мир, взяв клятву с каждой вещи — огня, воды, железа, камня, каждой болезни, каждого зверя и дерева — никогда не причинять ему вреда. Уверовав в его неуязвимость, боги устроили забаву: метали в него оружие, смеясь, как всё безвредно отскакивает.

Лишь омела, столь юное и малое растение, что Фригг сочла хлопоты о её клятве излишними, никогда не давала обещания. Локи узнал об этом, сделал из неё дротик и направил руку слепого бога. Бальдр упал замертво, и весь мир — каждое существо, каждый камень, каждая река — оплакивал его, кроме одной великанши, укрывшейся в пещере, которая одна отказалась пролить хоть слезу, тем самым закрепив его судьбу навсегда остаться среди мёртвых.`,
      moralRu: 'Достаточно одной вещи, о которой забыли позаботиться, и одного отказа горевать, чтобы потеря стала окончательной.',
    },
    {
      title: 'The Weeping of Rachel',
      content: `An old story tells of a mother named Rachel, buried along the road her descendants would one day be marched down into exile, said to rise from her grave at the sound of their chains and weep for children she could no longer protect, refusing every comfort offered to her because they were simply gone.

Later generations retold her weeping not as a flaw to be corrected, but as the truest possible response — grief so complete it became its own form of loyalty to what had been lost.`,
      moral: 'Some griefs are not meant to be consoled away. They are meant to be witnessed.',
      readTime: 1,
      titleRu: 'Плач Рахили',
      contentRu: `Древнее предание рассказывает о матери по имени Рахиль, похороненной у дороги, по которой её потомкам однажды предстояло пройти в изгнание закованными в цепи. Говорят, она поднимается из могилы на звук их цепей и плачет о детях, которых больше не может защитить, отвергая всякое утешение, потому что их просто больше нет.

Позднейшие поколения пересказывали её плач не как изъян, который нужно исправить, а как самый истинный из возможных ответов — горе настолько полное, что оно само стало формой верности утраченному.`,
      moralRu: 'Некоторые горести не предназначены для того, чтобы их утешали. Они предназначены для того, чтобы их засвидетельствовали.',
    },
    {
      title: 'The Terracotta Army',
      content: `An emperor obsessed with conquering death itself ordered an entire underground army built in clay to accompany him into the afterlife — thousands of life-sized soldiers, each face carved individually, horses, chariots, generals, archers, an entire kingdom in miniature meant to keep ruling even after he was gone.

He also sent explorers across the sea searching for a literal elixir of immortality, and died anyway, at only forty-nine, likely poisoned by the mercury he'd been drinking in the belief that it would extend his life. His clay army sat sealed in the dark and utterly still for over two thousand years before anyone found it again.`,
      moral: 'No amount of preparation can buy you out of the ending — it can only decide what gets left behind after it happens.',
      readTime: 1,
      titleRu: 'Терракотовая армия',
      contentRu: `Император, одержимый идеей победить саму смерть, приказал создать под землёй целую армию из глины, чтобы она сопровождала его в загробной жизни — тысячи воинов в полный рост, у каждого своё лицо, кони, колесницы, полководцы, лучники — целое царство в миниатюре, призванное продолжать существовать даже после его ухода.

Он также отправлял через море исследователей на поиски настоящего эликсира бессмертия и всё равно умер, всего в сорок девять лет, вероятно отравленный ртутью, которую пил, веря, что она продлевает жизнь. Его глиняная армия пролежала в темноте и полной неподвижности более двух тысяч лет, прежде чем её снова нашли.`,
      moralRu: 'Никакая подготовка не способна откупиться от конца — она способна лишь решить, что останется после того, как он наступит.',
    },
    {
      title: 'The Death of Enkidu',
      content: `When his closest friend Enkidu died after the gods punished them for killing the Bull of Heaven, King Gilgamesh refused to leave the body for six days and nights, weeping and touching his friend's face, unable to accept that a man could simply stop.

Only when signs of decay finally appeared did he allow burial, and even then he tore off his royal robes, put on the skins of animals, and walked out into the wilderness alone, terrified for the first time in his life — not of any enemy, but of his own death, now made undeniably real by watching his friend's.`,
      moral: 'Someone else\'s death is often the moment we finally believe in our own.',
      readTime: 1,
      titleRu: 'Смерть Энкиду',
      contentRu: `Когда его ближайший друг Энкиду умер после того, как боги наказали их за убийство Небесного быка, царь Гильгамеш шесть дней и ночей отказывался покинуть тело, плача и касаясь лица друга, не в силах поверить, что человек может просто перестать быть.

Лишь когда наконец появились признаки тлена, он позволил похоронить его, и даже тогда он разорвал свои царские одежды, надел звериные шкуры и в одиночестве ушёл в пустыню, впервые в жизни испытывая страх — не перед каким-либо врагом, а перед собственной смертью, ставшей неоспоримо реальной после того, как он увидел смерть друга.`,
      moralRu: 'Чужая смерть часто становится моментом, когда мы наконец начинаем верить в собственную.',
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
    {
      title: 'The Gordian Knot',
      content: `In the city of Gordium stood an ancient wagon, its yoke bound to the pole by a knot so intricate that no one could find its ends. An old prophecy declared that whoever untied it would rule all of Asia.

For generations, kings and scholars picked at its coils and walked away defeated. When young Alexander arrived at the head of his army, he examined the knot briefly, then drew his sword and cut straight through it in a single stroke.

Some called it cheating. Alexander called it done. Within a decade, he had conquered the very lands the prophecy foretold.`,
      moral: "Sometimes the boldest move isn't solving the puzzle everyone else is stuck on — it's refusing to play by its rules.",
      readTime: 1,
      titleRu: 'Гордиев узел',
      contentRu: `В городе Гордий стояла древняя повозка, ярмо которой было привязано к дышлу узлом настолько запутанным, что никто не мог найти его концов. Древнее пророчество гласило: кто развяжет этот узел, будет править всей Азией.

Поколениями цари и мудрецы перебирали его петли и уходили ни с чем. Когда молодой Александр во главе своего войска прибыл в город, он недолго разглядывал узел, затем выхватил меч и одним ударом рассёк его.

Кто-то назвал это обманом. Александр назвал это решением. Не прошло и десяти лет, как он завоевал именно те земли, что предрекало пророчество.`,
      moralRu: 'Порой самый смелый шаг — не решить головоломку, над которой бьются все остальные, а отказаться играть по её правилам.',
    },
    {
      title: 'The Pearl at the Bottom of the Sea',
      content: `A young diver stood on the boat's edge, staring down at water so dark he couldn't see the seabed. An old pearl merchant beside him said, "The finest pearls are always at the depth that frightens you the most. Divers who only search the shallows come home with sand and small shells."

The young man asked how deep was too deep. The merchant shrugged. "You'll know when your lungs answer that question, not before. But no one has ever found a pearl by staying in the boat."`,
      moral: "What you're most afraid to go after is usually a fair description of what's actually worth finding.",
      readTime: 1,
      titleRu: 'Жемчужина на дне моря',
      contentRu: `Молодой ныряльщик стоял на краю лодки, вглядываясь в воду настолько тёмную, что не мог разглядеть дно. Старый торговец жемчугом рядом с ним сказал: — Лучший жемчуг всегда лежит на той глубине, которая пугает тебя больше всего. Ныряльщики, что ищут только на мелководье, возвращаются с песком и мелкими ракушками.

Юноша спросил, какая глубина уже слишком велика. Торговец пожал плечами. — Ты узнаешь это, когда тебе ответят твои лёгкие, не раньше. Но ещё никто не нашёл жемчужину, оставаясь в лодке.`,
      moralRu: 'То, чего ты боишься больше всего, обычно и есть довольно точное описание того, что действительно стоит найти.',
    },
    {
      title: "Hannibal's Elephants",
      content: `When Hannibal decided to invade Rome, every advisor told him the only sane route was by sea. Instead, he marched his army — and thirty-seven war elephants — directly into the Alps, through snow, ice, and mountain tribes who attacked from the cliffs above.

Thousands of his men and most of his elephants died in the crossing. When he finally descended into Italy, the Romans had no army waiting at the passes, because no one had believed anyone would attempt what he had just done.`,
      moral: "The route everyone agrees is impossible is often undefended precisely because everyone agrees it's impossible.",
      readTime: 1,
      titleRu: 'Слоны Ганнибала',
      contentRu: `Когда Ганнибал решил вторгнуться в Рим, все советники твердили, что единственный разумный путь — морем. Вместо этого он повёл своё войско — и тридцать семь боевых слонов — прямо через Альпы, сквозь снег, лёд и горные племена, нападавшие со скал сверху.

Тысячи его солдат и большинство слонов погибли при переходе. Когда он наконец спустился в Италию, римлян не оказалось на перевалах — никто не верил, что кто-то решится на подобное.`,
      moralRu: 'Путь, который все считают невозможным, часто остаётся незащищённым именно потому, что все считают его невозможным.',
    },
    {
      title: 'The Frog in the Slowly Warming Pot',
      content: `A cook wanted to boil a live frog for the evening's soup. Dropped straight into already-boiling water, the frog would instantly sense the danger and leap out to safety. So instead, the cook placed the frog into a pot of comfortably cool water and set it over a low flame.

As the water warmed by fractions of a degree, minute by minute, the frog adjusted to each small change and stayed exactly where it was, never once noticing the one moment when it should have jumped.`,
      moral: "Danger that arrives all at once gets fought. Danger that arrives one degree at a time gets adapted to, right up until it's fatal.",
      readTime: 1,
      titleRu: 'Лягушка в медленно нагревающейся кастрюле',
      contentRu: `Повар хотел сварить живую лягушку для вечернего супа. Брошенная сразу в уже кипящую воду, лягушка мгновенно почувствовала бы опасность и выпрыгнула бы в безопасное место. Поэтому вместо этого повар опустил лягушку в кастрюлю с приятно прохладной водой и поставил её на слабый огонь.

Пока вода нагревалась на доли градуса, минута за минутой, лягушка приспосабливалась к каждому небольшому изменению и оставалась на месте, так ни разу и не заметив тот единственный момент, когда стоило бы выпрыгнуть.`,
      moralRu: 'Опасность, которая приходит вся сразу, встречает сопротивление. Опасность, что приходит по градусу за раз, встречает лишь привыкание — вплоть до самого конца.',
    },
    {
      title: 'The Golden Bridge',
      content: `Sun Tzu warned his generals never to surround an enemy army completely, no matter how total the advantage. Instead, he taught them to always leave one visible route of retreat open — a "golden bridge" for the losing side to flee across. An enemy with no possible escape, he explained, believes he has nothing left to lose and will fight with the desperate ferocity of a cornered animal, inflicting far greater casualties than a normal battle would.

An enemy offered an open road to retreat, however, will very often take it, and a fleeing army is far easier and cheaper to defeat than a trapped one that has decided to die fighting.`,
      moral: 'Winning completely sometimes costs more than winning enough — leaving your opponent a way out can be the safer victory.',
      readTime: 1,
      titleRu: 'Золотой мост',
      contentRu: `Сунь-цзы предупреждал своих полководцев никогда не окружать вражеское войско полностью, каким бы подавляющим ни было преимущество. Вместо этого он учил всегда оставлять один заметный путь отступления — «золотой мост» — для проигрывающей стороны. Врагу, у которого нет пути к бегству, объяснял он, нечего больше терять, и он будет сражаться с отчаянной яростью загнанного зверя, нанося куда больший урон, чем в обычном бою.

Врагу же, которому предложена открытая дорога для отступления, он очень часто ею воспользуется, а отступающее войско разбить гораздо легче и дешевле, чем то, что окружено и решило умереть сражаясь.`,
      moralRu: 'Полная победа порой обходится дороже, чем победа достаточная — оставить противнику путь к отступлению иногда и есть более безопасная победа.',
    },
    {
      title: 'The One Unguarded Heel',
      content: `At his birth, a sea-nymph mother dipped her infant son into the river that was said to make any mortal flesh it touched unbreakable, holding him by one heel so she wouldn't lose her grip on him in the current. Every part of him the water touched became impossible to wound, and he grew into the greatest warrior of his generation, fearless in a way that seemed to prove he genuinely could not be killed.

He fought an entire war believing exactly that, until a single arrow, guided to the one small heel the river had never touched, found him and ended him instantly.`,
      moral: 'One overlooked spot is enough to undo an entire lifetime of being right about your own invincibility.',
      readTime: 1,
      titleRu: 'Единственная незащищённая пятка',
      contentRu: `При рождении мать-нимфа окунула младенца-сына в реку, которая, по преданию, делала неуязвимой любую смертную плоть, которой касалась, держа его за одну пятку, чтобы не потерять хватку в течении. Каждая часть тела, которой коснулась вода, стала неуязвима для ран, и он вырос величайшим воином своего поколения, бесстрашным настолько, что это как будто доказывало его подлинную неуязвимость.

Он прошёл целую войну, веря именно в это, пока одна-единственная стрела, направленная точно в ту маленькую пятку, которой река так и не коснулась, не настигла его и не убила мгновенно.`,
      moralRu: 'Одного упущенного места достаточно, чтобы свести на нет целую жизнь уверенности в собственной неуязвимости.',
    },
    {
      title: "The Oracle's Ambiguous Answer",
      content: `Before invading a powerful neighboring empire, a wealthy king sent envoys loaded with gifts to consult the most trusted oracle in the world, asking whether he should go to war. The oracle answered that if he attacked, he would destroy a great empire.

Delighted, the king took this as certain approval and marched his army across the border. He was catastrophically defeated, and within months his own kingdom, one of the greatest empires of its age, had been utterly destroyed. Only then did he understand which great empire the oracle had actually meant.`,
      moral: "Good news you haven't questioned closely enough may simply be bad news you didn't ask enough follow-up questions about.",
      readTime: 1,
      titleRu: 'Двусмысленный ответ оракула',
      contentRu: `Прежде чем вторгнуться в могущественную соседнюю империю, богатый царь отправил послов с богатыми дарами к самому надёжному оракулу в мире, чтобы спросить, стоит ли идти на войну. Оракул ответил: если он нападёт, то разрушит великую империю.

Обрадованный, царь принял это за верное одобрение и повёл войско через границу. Он потерпел сокрушительное поражение, и в считаные месяцы его собственное царство — одна из величайших империй своего времени — было полностью уничтожено. Лишь тогда он понял, какую именно великую империю имел в виду оракул.`,
      moralRu: 'Хорошая новость, которую ты недостаточно тщательно расспросил, может оказаться просто плохой новостью, которой не задали достаточно уточняющих вопросов.',
    },
    {
      title: 'The Wire Between the Towers',
      content: `For six years, a young tightrope walker planned in secret to string a wire illegally between the two tallest buildings in the world and walk across it, over a quarter mile above the ground, with no net and no permission.

On the morning of the walk, police waited on both rooftops to arrest him the moment he reached either side, so he simply stayed out on the wire, walking back and forth eight times over nearly an hour — kneeling, lying down, even dancing on the cable — because as long as he remained suspended between the two towers, no one could actually reach him.`,
      moral: 'Sometimes the safest place to be is the one place no one expects you to have the nerve to stay.',
      readTime: 1,
      titleRu: 'Трос между башнями',
      contentRu: `Шесть лет молодой канатоходец тайно готовился незаконно натянуть трос между двумя самыми высокими зданиями мира и пройти по нему на высоте четырёхсот метров без страховочной сетки и без разрешения.

Утром в день прохода полиция ждала на обеих крышах, готовая арестовать его в тот момент, как он достигнет любой из сторон, поэтому он просто остался на тросе, проходя туда и обратно восемь раз почти час — вставая на колени, ложась, даже танцуя на канате, — ведь пока он оставался подвешенным между башнями, никто не мог до него добраться.`,
      moralRu: 'Порой самое безопасное место — то единственное, где никто не ожидает, что у тебя хватит духа там оставаться.',
    },
    {
      title: 'The Aviator Who Flew Alone',
      content: `Dozens of pilots had already died trying to cross the ocean nonstop, and every aviation expert insisted the flight required a co-pilot, a navigator, and multiple engines for any real chance of survival.

A young airmail pilot instead stripped his single-engine plane of every unnecessary part — even the radio and parachute — to save weight for fuel, and flew the thirty-three-hour crossing entirely alone, fighting sleep deprivation so severe he later said he'd hallucinated ghostly passengers keeping him company in the cockpit.`,
      moral: 'Sometimes surviving the impossible version of a plan means stripping away everything except the one part that actually needs to work.',
      readTime: 1,
      titleRu: 'Лётчик, летевший в одиночку',
      contentRu: `Десятки пилотов уже погибли, пытаясь пересечь океан без посадки, и каждый авиационный эксперт настаивал, что для реального шанса выжить нужны второй пилот, штурман и несколько двигателей.

Молодой почтовый лётчик вместо этого снял с одномоторного самолёта всё лишнее — даже рацию и парашют, — чтобы выгадать вес под топливо, и пролетел тридцать три часа перелёта совершенно один, борясь с таким тяжёлым недосыпом, что позже рассказывал, как ему мерещились призрачные пассажиры, составлявшие ему компанию в кабине.`,
      moralRu: 'Иногда выжить в невозможной версии плана означает срезать всё, кроме той единственной части, которая действительно должна сработать.',
    },
    {
      title: 'The Flight That Never Landed',
      content: `Determined to become the first person to fly around the world at its widest point, an aviator pushed her twin-engine plane toward a series of increasingly remote refueling stops across open ocean, navigating by dead reckoning with equipment already at the edge of what the technology of her era could support.

On the final and most dangerous leg, searching for a speck of an island barely two miles wide in thousands of miles of open Pacific, her last confirmed radio transmission reported she was running low on fuel and could not locate the runway. Neither she nor her plane was ever found.`,
      moral: 'Attempting something because no one has done it yet means accepting that not finishing it is also a real possible ending.',
      readTime: 1,
      titleRu: 'Полёт, который не приземлился',
      contentRu: `Решив стать первой, кто облетит земной шар в его самой широкой части, лётчица вела свой двухмоторный самолёт через череду всё более отдалённых точек дозаправки над открытым океаном, ориентируясь счислением пути на технике, уже находившейся на пределе возможностей своей эпохи.

На последнем, самом опасном участке, разыскивая крошечный остров шириной едва в три километра среди тысяч миль открытого Тихого океана, она в последнем подтверждённом радиосообщении доложила, что топливо на исходе, а полосу найти не удаётся. Ни её, ни самолёт так и не нашли.`,
      moralRu: 'Пытаться сделать то, чего ещё никто не делал, значит принимать и то, что не завершить это — тоже вполне реальный исход.',
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
    {
      title: 'Tie Your Camel',
      content: `A traveler left his camel untied outside a mosque before going in to pray. "I have placed all my trust in God," he told a passerby who urged him to secure the animal. "He will watch over it."

When he came out, the camel was gone. Distressed, he sought out a wise teacher and told him what had happened, sure that his faith had failed him.

The teacher shook his head. "Trust in God," he said, "but first tie your camel."`,
      moral: 'Real trust does not replace responsibility — it is what makes carrying it bearable.',
      readTime: 1,
      titleRu: 'Привяжи своего верблюда',
      contentRu: `Путник оставил верблюда непривязанным у мечети и вошёл внутрь молиться. — Я вверил всё Богу, — сказал он прохожему, который посоветовал привязать животное. — Он присмотрит за ним.

Когда путник вышел, верблюда не было. Расстроенный, он пришёл к мудрому наставнику и рассказал о случившемся, уверенный, что его вера не помогла ему.

Наставник покачал головой. — Доверяй Богу, — сказал он, — но сперва привяжи своего верблюда.`,
      moralRu: 'Настоящее доверие не отменяет ответственность — оно делает её посильной.',
    },
    {
      title: 'The Elder Who Chased the Thief',
      content: `A thief broke into an old monk's hut one night and found nothing but a blanket and a cup. As he was slipping away, the monk woke, gathered his only remaining robe, and ran after him.

"You forgot this," he said, pressing it into the thief's hands. "Please, take it too."

The thief fled in confusion, unable to steal from a man who gave freely. Years later, he sought the monk out again — not to rob him this time, but to ask how a man learns to live that way.`,
      moral: 'Trusting someone with more than they tried to take can undo them more than punishment ever would.',
      readTime: 1,
      titleRu: 'Старец, догнавший вора',
      contentRu: `Однажды ночью вор забрался в хижину старого монаха и не нашёл там ничего, кроме одеяла и чашки. Когда он уже ускользал прочь, монах проснулся, взял свою последнюю оставшуюся рясу и побежал за ним.

— Ты забыл вот это, — сказал он, вкладывая рясу вору в руки. — Пожалуйста, возьми и её тоже.

Вор в замешательстве бросился бежать, не в силах красть у человека, который отдаёт всё сам. Годы спустя он снова разыскал монаха — на этот раз не чтобы ограбить его, а чтобы спросить, как человек учится жить так.`,
      moralRu: 'Довериться тому, кто пытался у тебя украсть, дав ему больше — иногда меняет человека сильнее, чем любое наказание.',
    },
    {
      title: 'The Father Who Ran',
      content: `A young man demanded his inheritance early, left home, and spent it all on reckless living until he was reduced to feeding pigs for a stranger, starving. He rehearsed an apology and turned back toward home, expecting nothing more than a servant's job if his father would even let him through the gate.

But his father, who had apparently been watching the road every single day, saw him while he was still far off, and ran to him before a single word of apology had been spoken.`,
      moral: "The welcome you're afraid to ask for is sometimes already running toward you before you finish rehearsing your excuse.",
      readTime: 1,
      titleRu: 'Отец, который побежал навстречу',
      contentRu: `Молодой человек потребовал свою долю наследства заранее, покинул дом и промотал всё на беспутную жизнь, пока не оказался пасти чужих свиней, голодая. Он репетировал слова извинения и повернул обратно к дому, не рассчитывая ни на что, кроме места слуги, если отец вообще впустит его за ворота.

Но отец, который, судя по всему, каждый день высматривал дорогу, увидел его ещё издалека и побежал ему навстречу, прежде чем тот успел произнести хоть слово извинения.`,
      moralRu: 'Приём, который ты боишься попросить, порой уже бежит тебе навстречу, пока ты ещё репетируешь свои оправдания.',
    },
    {
      title: 'The Camel in the Tent',
      content: `A merchant sleeping in his tent one cold desert night was woken by his camel, who asked if he could just poke his nose inside out of the wind. Feeling generous, the merchant agreed. A while later, the camel asked if his head could come in too, since the wind hadn't let up. The merchant agreed again.

Little by little — the neck, the front legs, the whole body — the camel kept asking for just one more small accommodation, until the merchant woke at dawn lying outside in the sand, having been pushed out of his own tent entirely by the animal he'd let in one polite request at a time.`,
      moral: "The boundary you don't defend on the first small request is rarely the one you get to defend on the last.",
      readTime: 1,
      titleRu: 'Верблюд в шатре',
      contentRu: `Купца, спавшего в своём шатре холодной пустынной ночью, разбудил верблюд, попросивший впустить хотя бы нос — укрыться от ветра. Расчувствовавшись, купец согласился. Немного погодя верблюд попросил впустить и голову, раз уж ветер не утих. Купец снова согласился.

Понемногу — шея, передние ноги, всё тело целиком — верблюд продолжал просить лишь ещё одну маленькую уступку, пока на рассвете купец не проснулся снаружи, на песке, полностью вытесненный из собственного шатра животным, которое он впускал вежливыми просьбами, шаг за шагом.`,
      moralRu: 'Границу, которую ты не отстоял при первой маленькой просьбе, редко удаётся отстоять при последней.',
    },
    {
      title: 'The Scorpion and the Frog',
      content: `A scorpion asked a frog to carry him across a river on his back. "Why would I do that?" the frog said. "You'll sting me and we'll both drown." The scorpion pointed out that this made no sense — if he stung the frog mid-river, he would drown too.

Convinced by the logic, the frog agreed and began swimming across with the scorpion on his back. Halfway across, the scorpion stung him anyway. As they both began to sink, the dying frog asked why. "I couldn't help it," the scorpion said. "It's my nature."`,
      moral: "A convincing argument for why someone won't hurt you is not the same thing as proof that they can't.",
      readTime: 1,
      titleRu: 'Скорпион и лягушка',
      contentRu: `Скорпион попросил лягушку перевезти его через реку на спине. — С чего бы мне это делать? — сказала лягушка. — Ты меня ужалишь, и мы оба утонем. Скорпион возразил, что в этом нет логики: если он ужалит её посреди реки, он тоже утонет.

Убеждённая этим доводом, лягушка согласилась и поплыла через реку со скорпионом на спине. На середине пути скорпион всё же её ужалил. Когда оба начали тонуть, умирающая лягушка спросила, зачем он это сделал. — Я не мог иначе, — ответил скорпион. — Такова моя природа.`,
      moralRu: 'Убедительный довод в пользу того, что тебя не тронут — это не то же самое, что доказательство того, что не смогут.',
    },
    {
      title: 'The Boy Who Cried Wolf',
      content: `A shepherd boy, bored watching his flock alone on the hillside, shouted "Wolf! Wolf!" and laughed as the whole village came running with weapons, only to find no wolf at all. He did it again the next week for the same thrill, and again the villagers came, and again found nothing.

The third time, a wolf actually appeared and began killing his sheep. He screamed for help as loudly as he could, but the villagers, certain it was another joke, stayed home, and he lost the entire flock alone.`,
      moral: "Every false alarm you raise spends down trust you'll eventually need for the real one.",
      readTime: 1,
      titleRu: 'Мальчик, который кричал «Волк!»',
      contentRu: `Пастушок, которому было скучно в одиночестве стеречь стадо на холме, закричал: «Волк! Волк!» — и рассмеялся, глядя, как вся деревня сбегается с оружием, не находя никакого волка. Через неделю он повторил это ради того же удовольствия, и жители снова прибежали, и снова ничего не нашли.

На третий раз волк действительно появился и начал резать овец. Мальчик закричал о помощи изо всех сил, но жители, уверенные, что это очередная шутка, остались дома, и он в одиночку потерял всё стадо.`,
      moralRu: 'Каждая ложная тревога тратит запас доверия, который однажды понадобится для настоящей.',
    },
    {
      title: 'The Long Spoons',
      content: `A traveler was shown two rooms by an angel to understand the difference between two realms. In the first room, a great feast was spread on the table, yet everyone sat gaunt and starving, holding spoons so long they couldn't bend them back to their own mouths, growing more desperate and bitter with every failed attempt to feed themselves.

In the second room, the same feast, the same impossibly long spoons — but here, everyone was well-fed and laughing, because each person was calmly using their spoon to feed the person sitting across from them.`,
      moral: 'The identical constraint can starve you or feed you, depending only on whether you turn toward yourself or toward the person across from you.',
      readTime: 1,
      titleRu: 'Длинные ложки',
      contentRu: `Ангел показал путнику две комнаты, чтобы объяснить разницу между двумя мирами. В первой комнате на столе был накрыт роскошный пир, но все сидели истощённые и голодные, держа ложки настолько длинные, что не могли донести их до собственного рта, — с каждой неудачной попыткой накормить себя они становились всё отчаяннее и озлобленнее.

Во второй комнате — тот же пир, те же невозможно длинные ложки, — но здесь все были сыты и смеялись, потому что каждый спокойно кормил своей ложкой того, кто сидел напротив.`,
      moralRu: 'Одно и то же ограничение способно уморить голодом или накормить — в зависимости лишь от того, обращён ты к себе самому или к тому, кто сидит напротив.',
    },
    {
      title: 'The Debtor Who Was Forgiven',
      content: `A servant owed his king an amount so large he could never possibly repay it in ten lifetimes, and when the king ordered him and his family sold to cover the debt, the servant begged for mercy and time. Moved to pity, the king didn't just grant more time — he cancelled the entire debt outright.

That same servant walked out of the palace, found a coworker who owed him a small sum, and had the man thrown into prison for failing to pay it back immediately. When the king heard what his forgiven servant had done to someone else, he had him summoned back and reinstated the original, crushing debt in full.`,
      moral: "Mercy you received but didn't pass on was never really understood as mercy at all.",
      readTime: 1,
      titleRu: 'Должник, которого простили',
      contentRu: `Слуга задолжал своему царю сумму настолько огромную, что не смог бы расплатиться и за десять жизней, и когда царь велел продать его вместе с семьёй в счёт долга, слуга взмолился о пощаде и отсрочке. Тронутый жалостью, царь не просто дал отсрочку — он простил весь долг целиком.

Выйдя из дворца, тот же слуга нашёл сослуживца, задолжавшего ему небольшую сумму, и бросил его в тюрьму за то, что тот не смог расплатиться немедленно. Когда царь узнал, что сделал прощённый им слуга с другим человеком, он призвал его обратно и восстановил прежний, непосильный долг в полном объёме.`,
      moralRu: 'Милость, которую ты получил, но не передал дальше, на самом деле никогда и не была по-настоящему понята как милость.',
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
    {
      title: "The King's Ring",
      content: `King Solomon summoned his court jeweler and gave him a strange task: to craft a ring that would make a happy man sad when he looked at it, and a sad man happy. The jeweler labored for weeks without success, until his young son suggested a simple engraving.

When the ring was finished, Solomon read the inscription and smiled. On days of triumph, the words humbled him. On days of grief, the same words lifted him. The ring read: "This too shall pass."`,
      moral: 'The same truth that steadies you in triumph is the one that carries you through grief.',
      readTime: 1,
      titleRu: 'Кольцо царя',
      contentRu: `Царь Соломон призвал придворного ювелира и дал ему странную задачу: изготовить кольцо, которое сделает счастливого человека печальным, когда он на него посмотрит, а печального — счастливым. Ювелир трудился неделями безуспешно, пока его юный сын не предложил простую гравировку.

Когда кольцо было готово, Соломон прочитал надпись и улыбнулся. В дни триумфа эти слова смиряли его. В дни горя те же слова поднимали его дух. На кольце было написано: «И это тоже пройдёт».`,
      moralRu: 'Та же истина, что удерживает тебя в триумфе, проносит тебя и через горе.',
    },
    {
      title: "Diogenes and the Emperor's Shadow",
      content: `Alexander the Great, having conquered half the known world, sought out the famous philosopher Diogenes, who lived in a barrel and owned almost nothing. He found him sitting outside, enjoying the morning sun.

"I am Alexander, the great king," he announced. "Ask me for anything you wish, and it is yours." Diogenes looked up at him and said, "Yes — could you move a little? You're blocking my sunlight."

Alexander's generals laughed, expecting their king's fury. Instead, Alexander said quietly, "If I were not Alexander, I would wish to be Diogenes."`,
      moral: 'The man with nothing to gain from you is the only one who can tell you the truth.',
      readTime: 1,
      titleRu: 'Диоген и тень императора',
      contentRu: `Александр Великий, покоривший половину известного мира, разыскал знаменитого философа Диогена, который жил в бочке и почти ничем не владел. Он нашёл его сидящим снаружи, наслаждающимся утренним солнцем.

— Я Александр, великий царь, — объявил он. — Попроси у меня всё, что пожелаешь, и это будет твоим. Диоген поднял на него взгляд и сказал: — Да, вот что: отойди немного в сторону. Ты загораживаешь мне солнце.

Полководцы Александра рассмеялись, ожидая гнева царя. Но Александр тихо произнёс: — Если бы я не был Александром, я хотел бы быть Диогеном.`,
      moralRu: 'Только тот, кому от тебя ничего не нужно, способен сказать тебе правду.',
    },
    {
      title: 'The Obituary Read Too Soon',
      content: `One morning, a wealthy inventor opened the newspaper and found his own obituary, printed by mistake after a brother's death was confused for his own. It called him "the merchant of death," crediting his fortune to explosives that had killed thousands in war.

He read every word, alive to see exactly how the world intended to remember him. Within weeks, he had rewritten his will, directing his entire fortune toward a prize honoring those who did the most good for humanity — the very prize that today bears his name for peace, not for war.`,
      moral: 'You rarely get to read your own obituary — but you can still choose to rewrite it while you are alive.',
      readTime: 1,
      titleRu: 'Некролог, прочитанный слишком рано',
      contentRu: `Однажды утром богатый изобретатель открыл газету и обнаружил собственный некролог, напечатанный по ошибке — смерть брата перепутали с его собственной. В некрологе его называли «торговцем смертью», приписывая его состояние взрывчатке, унёсшей тысячи жизней на войнах.

Он прочитал каждое слово, будучи живым свидетелем того, как именно мир собирался его запомнить. Через несколько недель он переписал завещание, направив всё своё состояние на премию в честь тех, кто принёс наибольшую пользу человечеству, — ту самую премию, что сегодня носит его имя за вклад в мир, а не в войну.`,
      moralRu: 'Собственный некролог редко удаётся прочитать при жизни — но переписать его, пока ты жив, ты всё ещё можешь.',
    },
    {
      title: 'Two Vast and Trunkless Legs of Stone',
      content: `A traveler returning from an ancient desert described what he had found there: two enormous stone legs standing alone with no body attached, and half-buried in the sand nearby, a shattered face still wearing an expression of cold command.

On the pedestal, still legible, were words the long-dead king had ordered carved: "My name is Ozymandias, king of kings — look on my works, ye Mighty, and despair." Around the ruin, the traveler said, nothing remained. Only the flat sand stretched away in every direction, empty to the horizon.`,
      moral: 'The more a monument insists on its own permanence, the more certain you can be that the sand is already winning.',
      readTime: 1,
      titleRu: 'Две исполинские каменные ноги без туловища',
      contentRu: `Путешественник, вернувшийся из древней пустыни, рассказывал о том, что нашёл там: две исполинские каменные ноги, стоящие сами по себе, без туловища, а рядом, наполовину занесённое песком, — разбитое лицо, всё ещё хранящее выражение холодной власти.

На постаменте, ещё различимые, были высечены слова, которые давно умерший царь велел вырезать: «Я Озимандия, царь царей — взгляните на мои деяния, о Владыки, и отчайтесь». Вокруг руин, по словам путешественника, не осталось ничего. Лишь ровный песок простирался во все стороны, пустой до самого горизонта.`,
      moralRu: 'Чем настойчивее памятник заявляет о своей вечности, тем увереннее можно сказать, что песок уже побеждает.',
    },
    {
      title: 'The Two Brothers and the Sheaves of Wheat',
      content: `Two brothers farmed a shared field and split the harvest evenly each year — one married with a large family, the other living alone. One night, the married brother thought, "My brother has no children to help him or care for him in old age; he needs more than I do," and secretly carried extra sheaves of wheat to his brother's side of the barn.

That same night, the unmarried brother thought, "My brother has many mouths to feed and I have only myself; he needs more than I do," and secretly carried extra sheaves the opposite way. Each morning, both were quietly puzzled to find their piles exactly the same size as before. This continued for years, neither ever learning what the other had been doing, until one night they finally met each other on the path between their houses, arms full of wheat meant for the other.`,
      moral: 'The most complete generosity is the kind that never gets to see itself being received.',
      readTime: 1,
      titleRu: 'Два брата и снопы пшеницы',
      contentRu: `Два брата обрабатывали общее поле и каждый год честно делили урожай пополам — один был женат и имел большую семью, другой жил один. Однажды ночью женатый брат подумал: «У моего брата нет детей, которые помогли бы ему и позаботились о нём в старости — ему нужно больше, чем мне», — и тайком перенёс лишние снопы пшеницы на сторону брата в амбаре.

В ту же ночь неженатый брат подумал: «У моего брата много ртов, которые нужно кормить, а у меня — только я сам, ему нужно больше, чем мне», — и тайком перенёс лишние снопы в обратную сторону. Каждое утро оба с тихим недоумением обнаруживали, что их доли остались точно такого же размера, как прежде. Так продолжалось годами, и ни один из них так и не узнал, что делает другой, — пока однажды ночью они наконец не встретились на тропе между своими домами, каждый с охапкой пшеницы, предназначенной для другого.`,
      moralRu: 'Самая полная щедрость — та, которая никогда не увидит, как её принимают.',
    },
    {
      title: 'The Man Condemned to Push the Stone',
      content: `For deceiving the gods of the underworld, a cunning king was sentenced to an eternity of pushing a massive boulder up a steep mountain. Each time he neared the summit, straining with everything he had, the stone would slip from his grasp and roll all the way back down, forcing him to descend and begin again.

This was to repeat forever, with no possible ending, no victory he could ever point to as finished. And yet, in the walk back down the mountain each time, in that brief stretch when the stone was behind him and the next climb hadn't yet begun, he was, in his own way, free.`,
      moral: "A task with no possible finish line doesn't have to be a punishment — it can simply be the shape your life takes, met with your own quiet defiance.",
      readTime: 1,
      titleRu: 'Человек, обречённый катить камень',
      contentRu: `За обман богов подземного царства хитрый царь был осуждён на вечность толкать огромный валун на крутую гору. Каждый раз, когда он, напрягая все силы, приближался к вершине, камень выскальзывал из рук и катился обратно вниз, вынуждая его спускаться и начинать заново.

Это должно было повторяться вечно, без какого-либо конца, без победы, на которую он мог бы когда-либо указать как на завершённую. И всё же, в этом спуске с горы каждый раз, в тот короткий промежуток, когда камень уже остался позади, а следующий подъём ещё не начался, он был — по-своему — свободен.`,
      moralRu: 'Задача без возможного финала не обязана быть наказанием — она может просто быть формой, которую принимает твоя жизнь, встреченная твоим же тихим вызовом.',
    },
    {
      title: "The Widow's Two Coins",
      content: `Sitting near the temple treasury, a teacher watched a stream of wealthy people ceremoniously drop large sums of money into the offering box, their generosity plain for everyone nearby to admire. Then a poor widow approached and quietly dropped in two small copper coins — together worth barely a fraction of a single wealthy man's donation.

The teacher called his students over and told them that the widow had actually given more than every rich donor that day combined. The wealthy had given only a surplus they wouldn't miss; she had given every coin she had left to live on.`,
      moral: 'The size of a gift means less than the size of the life left behind after giving it.',
      readTime: 1,
      titleRu: 'Две монеты вдовы',
      contentRu: `Сидя у храмовой сокровищницы, учитель наблюдал, как вереница богачей торжественно бросала в ящик для пожертвований крупные суммы, а их щедрость была у всех на виду. Затем подошла бедная вдова и тихо опустила две маленькие медные монеты — вместе едва составлявшие крошечную долю пожертвования одного богача.

Учитель подозвал учеников и сказал, что вдова на самом деле отдала больше, чем все богачи в тот день вместе взятые. Богатые отдали лишь избыток, которого не заметят; она отдала все монеты, что у неё оставались на жизнь.`,
      moralRu: 'Размер дара значит меньше, чем размер жизни, что остаётся после того, как его отдали.',
    },
    {
      title: 'The Fisherman and the Businessman',
      content: `A businessman on vacation watched a fisherman pull in a small catch and pack up early. "Why not fish longer and catch more?" he asked. The fisherman said he had enough for his family's needs that day.

The businessman explained that with more fish, he could sell the surplus, buy a bigger boat, hire a crew, eventually build a fleet and a company, and after twenty or thirty years of hard work, he could sell it all and retire to a quiet village, sleep late, fish a little each morning, and spend afternoons with his family and friends. The fisherman looked at him and said, "That's exactly what I'm doing right now."`,
      moral: 'The destination some people spend their whole lives grinding toward is one that others simply decided to already live in.',
      readTime: 1,
      titleRu: 'Рыбак и бизнесмен',
      contentRu: `Бизнесмен на отдыхе наблюдал, как рыбак вытащил небольшой улов и рано собрался домой. — Почему бы не порыбачить подольше и не поймать больше? — спросил он. Рыбак ответил, что этого достаточно для нужд его семьи на сегодня.

Бизнесмен объяснил, что, поймав больше рыбы, можно продать излишек, купить лодку побольше, нанять команду, со временем построить целый флот и компанию, а через двадцать-тридцать лет тяжёлого труда продать всё это и удалиться на покой в тихую деревню, спать подольше, немного рыбачить по утрам и проводить дни с семьёй и друзьями. Рыбак посмотрел на него и сказал: — Именно это я сейчас и делаю.`,
      moralRu: 'То, к чему некоторые люди всю жизнь пробиваются на износ, другие просто с самого начала выбрали уже жить в этом.',
    },
  ],
};

async function main() {
  console.log('Seeding database...');

  for (const categoryData of CATEGORIES) {
    const parables = PARABLES[categoryData.slug];

    const category = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: { parablesCount: parables.length, nameRu: categoryData.nameRu },
      create: {
        name: categoryData.name,
        nameRu: categoryData.nameRu,
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
