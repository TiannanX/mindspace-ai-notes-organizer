# AI Notes Organizer — Specification

## 1. Concept & Vision

A warm, intimate digital space for capturing fleeting thoughts and watching them transform into organized, meaningful notes. Think of it as a private study companion — not a productivity tool, but a thinking partner that helps you make sense of what's on your mind. The experience should feel like writing in a beautiful leather journal that magically organizes itself.

## 2. Design Language

### Aesthetic Direction
Inspired by a cozy private study: warm lamplight on aged paper, the feeling of a well-loved notebook. Premium but approachable — like a high-end stationery brand.

### Color Palette
- **Background**: `#FAF7F2` (warm cream)
- **Surface**: `#FFFFFF` (cards)
- **Surface Hover**: `#FDF9F4`
- **Primary**: `#8B7355` (warm brown)
- **Primary Dark**: `#6B5A47`
- **Accent**: `#C4A77D` (golden wheat)
- **Text Primary**: `#2C2416` (rich brown-black)
- **Text Secondary**: `#6B5D4D` (muted brown)
- **Text Muted**: `#9A8B7A` (light brown)
- **Border**: `#E8E0D5` (warm gray)
- **Success**: `#7A9B76` (sage green)
- **Category Colors**:
  - Travel: `#7BA3A8` (dusty teal)
  - Investment Journal: `#8B9A7C` (olive)
  - Inspiration: `#C4A77D` (golden)
  - Tasks / Plans: `#9B8AA0` (muted lavender)
  - Reflection: `#A89080` (taupe)
  - Study / Growth: `#7A8B9B` (slate blue)
  - Memory: `#B8A090` (warm stone)

### Typography
- **Headings**: `'Playfair Display', Georgia, serif` — elegant, editorial
- **Body**: `'Source Sans 3', system-ui, sans-serif` — readable, warm
- **Monospace accent**: `'JetBrains Mono', monospace` — for tags

### Spatial System
- Base unit: 8px
- Card padding: 24px
- Section spacing: 64px
- Border radius: 12px (cards), 8px (inputs), 24px (buttons)

### Motion Philosophy
- Subtle, purposeful animations that feel like gentle paper movements
- Card appearances: fade-in + slight upward slide, 300ms ease-out
- Button interactions: gentle scale (1.02) on hover, 150ms
- Staggered list animations: 50ms delay between items
- Category badge pulse on classification result

### Visual Assets
- Lucide icons (inline SVG)
- No images needed — typography and color carry the aesthetic
- Decorative: subtle grain texture overlay on hero (CSS noise)

## 3. Layout & Structure

### Page Structure
1. **Header** — Minimal: logo wordmark left
2. **Hero Section** — Generous whitespace, warm headline, input area prominent
3. **Input Zone** — Large textarea with floating label, organize button
4. **Result Card** — Slides in after classification, shows category/summary/tags/action
5. **Notes Wall** — Grid of saved notes grouped by category with search/filter bar
6. **Footer** — Minimal, just a quiet signature

### Responsive Strategy
- Desktop (>1024px): Two-column notes grid, spacious hero
- Tablet (768-1024px): Two-column notes, compressed hero
- Mobile (<768px): Single column, stacked layout, touch-friendly targets

## 4. Features & Interactions

### Core Flow
1. User types a thought in the textarea
2. Clicks "Organize this thought"
3. Mock classifier analyzes keywords → assigns category
4. Result card appears with:
   - Category badge (color-coded)
   - Auto-generated 1-sentence summary
   - 3 suggested tags
   - Optional next action (e.g., "Add to your travel bucket list?")
5. User clicks "Save Note" → stored to localStorage
6. Note appears in Notes Wall under its category

### Mock Classifier Logic
Based on keyword matching across categories. Default to "Reflection" if no match.

### Summary Generation
Template-based with variations for variety.

### Search & Filter
- Search bar filters notes by text content and tags
- Category pills act as toggle filters (multi-select)
- Clear all button when filters active

### Delete Note
- Trash icon on each note card
- Single click delete with animation

### Demo Data Button
- Adds 8 pre-written sample notes across different categories

## 5. Component Inventory

- Header, Hero, NoteInput, ResultCard, NotesWall, NoteCard, EmptyState, CategoryFilter

## 6. Technical Approach

- React 18 + Vite
- CSS Modules
- localStorage for persistence
- No external state management