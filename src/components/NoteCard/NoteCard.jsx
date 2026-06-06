import { useState } from 'react';
import styles from './NoteCard.module.css';
import { formatRelativeTime, truncateText } from '../../utils/formatters';

const CATEGORY_ICONS = {
  'Travel': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
    </svg>
  ),
  'Investment Journal': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  'Inspiration': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  ),
  'Tasks / Plans': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  'Reflection': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  'Study / Growth': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  'Memory': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

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

export function NoteCard({ note, onDelete, style }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const categoryClass = getCategoryClass(note.category);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(note.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <article className={styles.card} style={style}>
      <div className={styles.header}>
        <span className={`${styles.categoryBadge} ${styles[categoryClass]}`}>
          <span className={styles.categoryIcon}>
            {CATEGORY_ICONS[note.category]}
          </span>
          {note.category}
        </span>
        <button
          className={`${styles.deleteButton} ${confirmDelete ? styles.deleteConfirm : ''}`}
          onClick={handleDelete}
          title={confirmDelete ? 'Click again to confirm' : 'Delete note'}
        >
          {confirmDelete ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          )}
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.noteContent}>{truncateText(note.content, 150)}</p>
        <p className={styles.summary}>{note.summary}</p>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className={styles.tags}>
          {note.tags.map((tag, i) => (
            <span key={i} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.timestamp}>{formatRelativeTime(note.createdAt)}</span>
        {note.nextAction && (
          <span className={styles.nextAction}>{note.nextAction}</span>
        )}
      </div>
    </article>
  );
}