const CATEGORIES = {
  TRAVEL: 'Travel',
  INVESTMENT: 'Investment Journal',
  INSPIRATION: 'Inspiration',
  TASKS: 'Tasks / Plans',
  REFLECTION: 'Reflection',
  STUDY: 'Study / Growth',
  MEMORY: 'Memory',
};

const KEYWORD_MAP = {
  [CATEGORIES.TRAVEL]: [
    'flight', 'hotel', 'trip', 'vacation', 'travel', 'airport', 'train',
    'beach', 'city', 'country', 'journey', 'explore', 'adventure', 'passport',
    'luggage', 'ticket', 'booking', 'resort', 'abroad', 'itinerary', 'tourism',
    'destination', 'cruise', 'backpacking', 'road trip', 'weekend getaway'
  ],
  [CATEGORIES.INVESTMENT]: [
    'stock', 'investment', 'portfolio', 'dividend', 'market', 'trading',
    'crypto', 'bitcoin', 'ethereum', 'save', 'budget', 'expense', 'financial',
    'money', 'wealth', 'asset', 'fund', 'bond', 'retirement', '401k', ' IRA',
    'stock market', 'shares', 'equity', 'passive income', 'interest', 'compound',
    's&P', 'nasdaq', 'portfolio', 'diversify', 'risk'
  ],
  [CATEGORIES.INSPIRATION]: [
    'idea', 'inspired', 'dream', 'vision', 'creative', 'art', 'music', 'quote',
    'epiphany', 'breakthrough', 'passion', 'purpose', 'creative', 'imagine',
    'possibility', 'potential', 'visionary', 'muse', 'motivation', 'inspire'
  ],
  [CATEGORIES.TASKS]: [
    'todo', 'task', 'plan', 'schedule', 'meeting', 'deadline', 'project',
    'finish', 'complete', 'accomplish', 'start', 'need to', 'must', 'should',
    'appointment', 'call', 'email', 'respond', 'follow up', 'reminder',
    'tomorrow', 'next week', 'goal', 'objective', 'milestone', 'deliverable'
  ],
  [CATEGORIES.REFLECTION]: [
    'feel', 'felt', 'realized', 'learned', 'understood', 'journal', 'mood',
    'emotion', 'mindful', 'grateful', 'appreciate', 'think', 'thoughts',
    'believe', 'feeling', 'experience', 'perspective', 'wonder', 'curious',
    '内省', '反思', '觉察', '感悟', '体会'
  ],
  [CATEGORIES.STUDY]: [
    'book', 'read', 'learn', 'course', 'class', 'tutorial', 'skill', 'practice',
    'teach', 'student', 'education', 'knowledge', 'research', 'study', 'exam',
    'lecture', 'workshop', 'certification', 'training', 'develop', 'master',
    'understand', 'concept', 'theory', 'principle', 'framework'
  ],
  [CATEGORIES.MEMORY]: [
    'remember', 'memory', 'childhood', 'family', 'friend', 'birthday', 'wedding',
    'moment', 'time when', 'past', 'nostalgia', 'reminisce', 'story', 'memory',
    'first time', 'remember when', 'used to', 'back then', 'grandma', 'grandpa',
    'mom', 'dad', 'sister', 'brother', 'cousin', 'anniversary', 'holiday'
  ],
};

const SUMMARY_TEMPLATES = {
  [CATEGORIES.TRAVEL]: [
    "A wanderlust-filled thought about {topic} — your next adventure awaits.",
    "Your mind drifted to {topic}. Time to start planning that trip.",
    "Notes on {topic} — because life's too short not to explore.",
  ],
  [CATEGORIES.INVESTMENT]: [
    "A financial reflection on {topic}. Smart moves start with awareness.",
    "You've been thinking about {topic}. Keep that wealth-building mindset.",
    "Notes on {topic} — your future self will thank you for this.",
  ],
  [CATEGORIES.INSPIRATION]: [
    "A creative spark around {topic}. Let this idea breathe and grow.",
    "Your imagination touched on {topic}. Beautiful things may come from this.",
    "An inspired thought about {topic}. Stay open to where it leads.",
  ],
  [CATEGORIES.TASKS]: [
    "A task to remember: {topic}. Small steps lead to big accomplishments.",
    "You've noted {topic}. The journey of a thousand miles begins with one step.",
    "On your mind: {topic}. Time to turn thought into action.",
  ],
  [CATEGORIES.REFLECTION]: [
    "A moment of introspection about {topic}. Self-awareness is a superpower.",
    "You've reflected on {topic}. These insights are worth holding onto.",
    "Your thoughts on {topic} reveal something meaningful. Keep reflecting.",
  ],
  [CATEGORIES.STUDY]: [
    "A learning note about {topic}. Growth happens one insight at a time.",
    "You've been pondering {topic}. Knowledge compounds when you revisit it.",
    "A study note on {topic}. Keep feeding your curious mind.",
  ],
  [CATEGORIES.MEMORY]: [
    "A precious memory surfaced: {topic}. Treasured moments deserve to be captured.",
    "You've reminisced about {topic}. These memories make us who we are.",
    "A nostalgic thought about {topic}. Savoring the moments that matter.",
  ],
};

const NEXT_ACTIONS = {
  [CATEGORIES.TRAVEL]: "Add this to your travel bucket list?",
  [CATEGORIES.INVESTMENT]: "Research this topic further?",
  [CATEGORIES.INSPIRATION]: "Start a creative project around this?",
  [CATEGORIES.TASKS]: "Break this into smaller steps?",
  [CATEGORIES.REFLECTION]: "Journal more about this?",
  [CATEGORIES.STUDY]: "Find resources to learn more?",
  [CATEGORIES.MEMORY]: "Share this story with someone?",
};

const TAG_SUGGESTIONS = {
  [CATEGORIES.TRAVEL]: ['wanderlust', 'adventure', 'exploration'],
  [CATEGORIES.INVESTMENT]: ['finance', 'wealth', 'strategy'],
  [CATEGORIES.INSPIRATION]: ['creativity', 'passion', 'vision'],
  [CATEGORIES.TASKS]: ['action item', 'planning', 'productivity'],
  [CATEGORIES.REFLECTION]: ['mindfulness', 'gratitude', 'growth'],
  [CATEGORIES.STUDY]: ['learning', 'knowledge', 'development'],
  [CATEGORIES.MEMORY]: ['nostalgia', 'family', 'moments'],
};

function extractTopic(content) {
  const cleaned = content
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .trim();

  const words = cleaned.split(/\s+/);

  const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought',
    'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as',
    'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between',
    'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where',
    'why', 'how', 'all', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
    'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just',
    'and', 'but', 'if', 'or', 'because', 'until', 'while', 'about', 'against',
    'this', 'that', 'these', 'those', 'i', 'me', 'my', 'myself', 'we', 'our',
    'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he',
    'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself',
    'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom',
    'think', 'thought', 'feel', 'feeling', 'want', 'like', 'know', 'remember'];

  const meaningful = words.filter(w => w.length > 3 && !stopWords.includes(w));

  if (meaningful.length === 0) {
    return 'this thought';
  }

  const topic = meaningful.slice(0, 3).join(' ');
  return topic.length > 30 ? meaningful[0] : topic;
}

function countKeywordMatches(content, keywords) {
  const lowerContent = content.toLowerCase();
  let count = 0;
  for (const keyword of keywords) {
    if (lowerContent.includes(keyword.toLowerCase())) {
      count++;
    }
  }
  return count;
}

export function classifyNote(content) {
  if (!content || !content.trim()) {
    return null;
  }

  const scores = {};

  for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
    scores[category] = countKeywordMatches(content, keywords);
  }

  let maxCategory = CATEGORIES.REFLECTION;
  let maxScore = 0;

  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxCategory = category;
    }
  }

  return maxCategory;
}

export function generateSummary(content, category) {
  const topic = extractTopic(content);
  const templates = SUMMARY_TEMPLATES[category] || SUMMARY_TEMPLATES[CATEGORIES.REFLECTION];
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template.replace('{topic}', topic);
}

export function getSuggestedTags(category) {
  return TAG_SUGGESTIONS[category] || ['note', 'thought', 'idea'];
}

export function getNextAction(category) {
  return NEXT_ACTIONS[category] || null;
}

export function classifyAndProcessNote(content) {
  const category = classifyNote(content);

  if (!category) {
    return null;
  }

  return {
    category,
    summary: generateSummary(content, category),
    tags: getSuggestedTags(category),
    nextAction: getNextAction(category),
  };
}

export { CATEGORIES };