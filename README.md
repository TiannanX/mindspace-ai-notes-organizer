# MindSpace — AI Notes Organizer

A warm, intimate digital space for capturing fleeting thoughts and watching them transform into organized, meaningful notes. Think of it as a private study companion — not a productivity tool, but a thinking partner that helps you make sense of what's on your mind.

## Features

- **Smart Classification**: Write anything on your mind and watch it automatically organize into meaningful categories
- **7 Life Categories**: Travel, Investment Journal, Inspiration, Tasks/Plans, Reflection, Study/Growth, and Memory
- **Auto-Generated Summaries**: Each note gets a thoughtful, context-aware summary
- **Suggested Tags**: Automatic tag suggestions based on content
- **Search & Filter**: Find notes quickly with full-text search and category filters
- **Persistent Storage**: All notes saved to localStorage — no backend needed
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Demo Mode**: Quickly populate with sample notes to show the experience

## Categories

| Category | Color | Examples |
|----------|-------|----------|
| Travel | Dusty Teal | trip planning, destinations, adventures |
| Investment Journal | Olive | savings, portfolio, financial thoughts |
| Inspiration | Golden | creative ideas, epiphanies, dreams |
| Tasks / Plans | Muted Lavender | todos, schedules, deadlines |
| Reflection | Taupe | feelings, mindfulness, gratitude |
| Study / Growth | Slate Blue | learning, books, skill development |
| Memory | Warm Stone | nostalgia, family, cherished moments |

## Tech Stack

- React 18 + Vite
- Plain CSS with CSS Modules
- localStorage for persistence
- No backend, no database, no paid APIs

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone or navigate to the project
cd ai-notes-organizer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deploying to Vercel

### Option 1: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: Via GitHub

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and configure everything
6. Click "Deploy"

### Option 3: Via Drag & Drop

1. Run `npm run build`
2. Go to [vercel.com/drop](https://vercel.com/drop)
3. Drag the `dist` folder directly to the page

## Project Structure

```
src/
├── components/
│   ├── Header/          # App header with logo
│   ├── Hero/            # Hero section with tagline
│   ├── NoteInput/       # Textarea and submit button
│   ├── ResultCard/      # Classification results modal
│   ├── NotesWall/       # All notes display with filters
│   ├── NoteCard/        # Individual note card
│   ├── CategoryFilter/  # Search and category pills
│   └── EmptyState/      # Empty/no-results states
├── hooks/
│   ├── useNotes.js      # Notes state + localStorage sync
│   └── useClassifier.js # Mock classification hook
├── utils/
│   ├── classifier.js    # Keyword-based classifier
│   ├── storage.js       # localStorage helpers
│   └── formatters.js    # Date/text utilities
├── styles/
│   ├── variables.css    # CSS custom properties
│   └── global.css       # Reset and base styles
├── App.jsx
└── main.jsx
```

## How the Classifier Works

The classifier uses keyword matching to categorize notes:

1. Each category has a set of associated keywords
2. When you submit a note, it counts keyword matches per category
3. The category with the most matches wins
4. If no keywords match, it defaults to "Reflection"
5. Summaries and tags are generated using template-based generation

This is a mock classifier for demo purposes. For production, you would integrate with an AI API like OpenAI's GPT or Anthropic's Claude.

## Future Upgrade Ideas

- **Real AI Classification**: Integrate OpenAI or Claude API for intelligent categorization
- **Note Editing**: Allow editing of saved notes
- **Categories**: Add/remove/rename categories
- **Export/Import**: JSON export for backup
- **Tags Management**: Custom tag creation
- **Note Pinning**: Pin important notes
- **Dark Mode**: Alternative warm dark theme
- **Multiple Notes**: Submit multiple notes at once
- **Collaborative Features**: Share notes with friends
- **Voice Input**: Capture thoughts via speech-to-text

## License

MIT — free to use for personal or commercial projects.