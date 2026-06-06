import styles from './NoteInput.module.css';

export function NoteInput({ content, onContentChange, onSubmit, isProcessing }) {
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
        <div className={styles.inputIntro}>
          <span className={styles.stepLabel}>Start here</span>
          <h2 className={styles.title}>Drop in one thought. MindSpace will shape it.</h2>
          <p className={styles.helper}>
            Paste a reflection, plan, memory, idea, or study note. The classifier will suggest a category, summary, tags, and next step.
          </p>
        </div>
        <div className={styles.inputContainer}>
          <textarea
            id="note-content"
            className={styles.textarea}
            placeholder=" "
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
          />
          <label className={styles.label} htmlFor="note-content">Write anything on your mind...</label>
        </div>
        <p className={styles.promptHint}>
          Try: "I keep thinking about starting a small reading ritual before bed..."
        </p>
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
          {isProcessing ? 'Organizing your thought...' : 'Organize this thought'}
        </button>
      </div>
    </section>
  );
}
