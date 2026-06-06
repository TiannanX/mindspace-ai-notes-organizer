import { useState, useMemo, useEffect, useRef } from 'react';
import styles from './NotesWall.module.css';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import { NoteCard } from '../NoteCard/NoteCard';
import { EmptyState } from '../EmptyState/EmptyState';

const CATEGORY_COLORS = {
  'Travel': 'var(--color-travel)',
  'Investment Journal': 'var(--color-investment)',
  'Inspiration': 'var(--color-inspiration)',
  'Tasks / Plans': 'var(--color-tasks)',
  'Reflection': 'var(--color-reflection)',
  'Study / Growth': 'var(--color-study)',
  'Memory': 'var(--color-memory)',
};

const CATEGORY_ORDER = [
  'Travel',
  'Investment Journal',
  'Inspiration',
  'Tasks / Plans',
  'Reflection',
  'Study / Growth',
  'Memory',
];

const DEMO_NOTES = [
  {
    content: "I want to visit Japan next spring. The cherry blossoms and temples look amazing. Maybe plan a two-week trip starting in Tokyo and working my way to Kyoto.",
    category: 'Travel',
    summary: "A wanderlust-filled thought about Japan — your next adventure awaits.",
    tags: ['wanderlust', 'adventure', 'planning'],
    nextAction: 'Start researching flights and accommodations?',
  },
  {
    content: "Just read about compound interest. If I invest $500/month starting now at 7% annual return, I could have over $500k in 30 years. The power of consistent investing is incredible.",
    category: 'Investment Journal',
    summary: "A financial reflection on compound interest. Smart moves start with awareness.",
    tags: ['finance', 'wealth', 'strategy'],
    nextAction: 'Research this topic further?',
  },
  {
    content: "What if instead of a traditional office, we created a network of small co-working spaces in residential neighborhoods? People could walk to work, local shops would thrive, and communities would reconnect.",
    category: 'Inspiration',
    summary: "A creative spark around neighborhood workspaces. Let this idea breathe and grow.",
    tags: ['creativity', 'vision', 'community'],
    nextAction: 'Start a creative project around this?',
  },
  {
    content: "Need to finish the project proposal by Friday, schedule dentist appointment, pick up groceries, and call mom on Sunday. Also want to start that Spanish course this month.",
    category: 'Tasks / Plans',
    summary: "A task to remember: project proposal, dentist, groceries, mom. Small steps lead to big accomplishments.",
    tags: ['action item', 'planning', 'productivity'],
    nextAction: 'Break this into smaller steps?',
  },
  {
    content: "I realized today that I've been avoiding difficult conversations because I'm afraid of conflict. But avoiding them only makes things worse. I want to practice being more direct and compassionate at the same time.",
    category: 'Reflection',
    summary: "A moment of introspection about conflict. Self-awareness is a superpower.",
    tags: ['mindfulness', 'growth', 'relationships'],
    nextAction: 'Journal more about this?',
  },
  {
    content: "Finished the first three chapters of 'Atomic Habits'. The concept of habit stacking is fascinating — link new habits to existing ones. Also want to try the two-minute rule for overcoming procrastination.",
    category: 'Study / Growth',
    summary: "A learning note about Atomic Habits. Growth happens one insight at a time.",
    tags: ['learning', 'books', 'habits'],
    nextAction: 'Find resources to learn more?',
  },
  {
    content: "Remember when we used to have Sunday brunches at grandma's house? The smell of her pancakes, everyone gathered around the big wooden table, my cousins fighting over the last piece of bacon. Those were the days.",
    category: 'Memory',
    summary: "A precious memory surfaced: grandma's Sunday brunches. Treasured moments deserve to be captured.",
    tags: ['nostalgia', 'family', 'moments'],
    nextAction: 'Share this story with someone?',
  },
  {
    content: "The sunset from the rooftop bar was absolutely stunning tonight. Sometimes you just need to stop and appreciate the simple beauty around us. Grateful for this moment of peace.",
    category: 'Reflection',
    summary: "A moment of appreciation for a beautiful sunset. These insights are worth holding onto.",
    tags: ['gratitude', 'mindfulness', 'appreciation'],
    nextAction: 'Journal more about this?',
  },
];

export function NotesWall({ notes, onDelete, onAddDemo }) {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(searchTimeoutRef.current);
  }, [search]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearAll = () => {
    setSearch('');
    setSelectedCategories([]);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        !debouncedSearch ||
        note.content.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        note.summary.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (note.tags && note.tags.some((tag) =>
          tag.toLowerCase().includes(debouncedSearch.toLowerCase())
        ));

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(note.category);

      return matchesSearch && matchesCategory;
    });
  }, [notes, debouncedSearch, selectedCategories]);

  const groupedNotes = useMemo(() => {
    const grouped = {};
    filteredNotes.forEach((note) => {
      if (!grouped[note.category]) {
        grouped[note.category] = [];
      }
      grouped[note.category].push(note);
    });
    return grouped;
  }, [filteredNotes]);

  const sortedCategories = useMemo(() => {
    return Object.keys(groupedNotes).sort((a, b) => {
      const indexA = CATEGORY_ORDER.indexOf(a);
      const indexB = CATEGORY_ORDER.indexOf(b);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [groupedNotes]);

  if (notes.length === 0) {
    return (
      <section className={styles.section}>
        <div className="container">
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Your Notes</h2>
            <span className={styles.noteCount}>{notes.length} total</span>
          </div>
          <button className={styles.demoButton} onClick={onAddDemo}>
            <svg
              className={styles.demoIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Add demo notes
          </button>
        </div>

        <CategoryFilter
          search={search}
          onSearchChange={setSearch}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          onClearAll={handleClearAll}
        />

        {filteredNotes.length === 0 ? (
          <EmptyState isSearchEmpty />
        ) : (
          <div className={styles.grid}>
            {sortedCategories.map((category) => (
              <div key={category} className={styles.categoryGroup}>
                <h3 className={styles.categoryHeader}>
                  <span
                    className={styles.categoryDot}
                    style={{ backgroundColor: CATEGORY_COLORS[category] }}
                  />
                  {category}
                </h3>
                <div className={styles.categoryNotes}>
                  {groupedNotes[category].map((note, index) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDelete={onDelete}
                      style={{ animationDelay: `${index * 50}ms` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}