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
          <button className={styles.emptyDemoButton} onClick={onAddDemo}>
            Add demo notes
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Saved library</span>
            <h2 className={styles.title}>Your organized notes</h2>
            <p className={styles.description}>
              Search across your saved thoughts or browse by the life category MindSpace assigned.
            </p>
          </div>
          <span className={styles.noteCount}>{notes.length} notes saved</span>
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
            Add missing demo notes
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
                  <span className={styles.categoryTitle}>
                    <span
                      className={styles.categoryDot}
                      style={{ backgroundColor: CATEGORY_COLORS[category] }}
                    />
                    {category}
                  </span>
                  <span className={styles.categoryCount}>
                    {groupedNotes[category].length}
                  </span>
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
