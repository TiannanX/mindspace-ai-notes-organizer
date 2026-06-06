import styles from './EmptyState.module.css';

export function EmptyState({ isSearchEmpty = false }) {
  if (isSearchEmpty) {
    return (
      <div className={`${styles.emptyState} ${styles.searchEmpty}`}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
        <h3 className={styles.title}>No thoughts found</h3>
        <p className={styles.description}>
          Nothing in your library matches this view. Try a softer keyword or clear the active filters.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.emptyState}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
      <h3 className={styles.title}>Your thoughts await</h3>
      <p className={styles.description}>
        Start with one honest thought above, or add the demo notes to see how the organized library feels.
      </p>
    </div>
  );
}
