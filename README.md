# MindSpace — Local-first AI Notes Organizer

MindSpace is a warm, private study-room prototype for capturing raw thoughts and turning them into organized personal notes. It is built as a freelance portfolio demo: simple enough to understand in one screen, polished enough to show product thinking, interaction design, frontend craft, and local-first privacy.

## Project Overview

The app helps someone write whatever is on their mind, classify the thought into a meaningful life category, preview a summary/tags/next action, and save it into a searchable notes wall.

The experience is intentionally calm and consumer-grade rather than corporate. It avoids accounts, dashboards, and heavy workflows so the central product moment stays clear: write one thought, understand it, keep it.

## Key Features

- **Thought classification**: Categorizes notes into Travel, Investment Journal, Inspiration, Tasks / Plans, Reflection, Study / Growth, and Memory.
- **Organized preview**: Generates a category, summary, tags, and suggested next step before saving.
- **Search and filtering**: Lets users browse by category or search note content, summaries, and tags.
- **Demo notes**: Adds portfolio-friendly sample data without replacing existing notes or duplicating entries.
- **Accessible interactions**: Includes labeled inputs, pressed states, named icon buttons, dialog semantics, Escape-to-close, and reduced-motion support.
- **Responsive UI**: Designed for desktop, tablet, and mobile with a warm private study-room visual direction.

## Local-first Privacy Note

MindSpace stores notes in the browser's `localStorage`. It does not use a backend, database, login system, or paid API, and note content is not sent to a remote service. Clearing browser storage or switching devices/browsers changes which notes are available.

## Tech Stack

- React 19
- Vite 8
- Plain CSS with CSS Modules
- Browser `localStorage`
- ESLint

## Demo Story

This is a portfolio prototype for a solo founder, coach, student, or knowledge worker who wants a softer way to make sense of scattered thoughts. In a walkthrough, start with the hero, write a reflective note, show the classification result, save it, then add demo notes to reveal the organized library.

The project demonstrates product storytelling, accessible UI details, local-first behavior, component composition, responsive styling, and deployment-ready frontend delivery without unnecessary infrastructure.

## Mini Case Study

**Problem:** Personal notes often become a flat pile of text, making it hard to see whether a thought is a task, memory, reflection, idea, or learning moment.

**Approach:** Keep the capture flow lightweight, then add just enough classification and structure to make each note useful. The app preserves user control by previewing the result before save.

**Outcome:** A polished frontend prototype that feels like a calm thinking companion and can be shown publicly without needing accounts, APIs, or sensitive data.

## Suggested Screenshots

- Hero and central note input with the empty library visible below.
- Classification result card after submitting a thoughtful note.
- Notes wall populated with demo data and category filters.
- Mobile view showing the input card and saved notes layout.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd ai-notes-organizer
npm install
npm run dev
```

The local dev server runs at `http://localhost:5173` by default.

## Build For Production

```bash
npm run lint
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment Instructions

### Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Keep the default Vite settings.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.

### Drag-and-drop

1. Run `npm run build`.
2. Upload the generated `dist` folder to a static hosting provider that supports Vite builds.

## Project Structure

```text
src/
├── components/
│   ├── CategoryFilter/
│   ├── EmptyState/
│   ├── Header/
│   ├── Hero/
│   ├── NoteCard/
│   ├── NoteInput/
│   ├── NotesWall/
│   └── ResultCard/
├── hooks/
│   ├── useClassifier.js
│   └── useNotes.js
├── styles/
│   ├── global.css
│   └── variables.css
├── utils/
│   ├── classifier.js
│   ├── formatters.js
│   └── storage.js
├── App.jsx
└── main.jsx
```

## Classifier Notes

The current classifier is intentionally frontend-only and keyword/template based. It is suitable for a portfolio prototype because it demonstrates the intended product behavior without requiring a paid API or exposing private note content.

## License

MIT — free to use for personal or commercial projects.
