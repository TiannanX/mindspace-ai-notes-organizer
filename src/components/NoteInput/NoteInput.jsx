import { useState } from 'react';
import styles from './NoteInput.module.css';

export function NoteInput({ onSubmit, isProcessing }) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim() || isProcessing) return;
    onSubmit(content);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inputWrapper}`}>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            placeholder=" "
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
          />
          <label className={styles.label}>Write anything on your mind...</label>
        </div>
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={!content.trim() || isProcessing}
        >
          <svg
            className={styles.buttonIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a10 10 0 1 0 10 10" />
            <path d="M12 12 12 6" />
            <path d="M12 6 A4 4 0 1 1 8 6" />
            <path d="M8 6 L12 2 L16 6" />
          </svg>
          Organize this thought
        </button>
      </div>
    </section>
  );
}