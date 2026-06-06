import styles from './CategoryFilter.module.css';

const CATEGORIES = [
  'Travel',
  'Investment Journal',
  'Inspiration',
  'Tasks / Plans',
  'Reflection',
  'Study / Growth',
  'Memory',
];

function getCategoryClass(category) {
  const map = {
    'Travel': 'travel',
    'Investment Journal': 'investment',
    'Inspiration': 'inspiration',
    'Tasks / Plans': 'tasks',
    'Reflection': 'reflection',
    'Study / Growth': 'study',
    'Memory': 'memory',
  };
  return map[category] || 'reflection';
}

export function CategoryFilter({ search, onSearchChange, selectedCategories, onCategoryToggle, onClearAll }) {
  const hasFilters = search || selectedCategories.length > 0;

  return (
    <div className={styles.filterBar}>
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search your thoughts..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.categories}>
        {CATEGORIES.map((category) => {
          const isActive = selectedCategories.includes(category);
          const categoryClass = getCategoryClass(category);
          return (
            <button
              key={category}
              className={`${styles.categoryPill} ${styles[categoryClass]} ${isActive ? styles.categoryPillActive : ''}`}
              onClick={() => onCategoryToggle(category)}
            >
              {category}
            </button>
          );
        })}
        {hasFilters && (
          <button className={styles.clearButton} onClick={onClearAll}>
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}