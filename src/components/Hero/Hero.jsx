import styles from './Hero.module.css';

const HIGHLIGHTS = [
  'Local-first notes',
  'Thought classification',
  'Personal growth categories',
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>Private AI notes organizer</p>
        <h1 className={styles.heroTitle}>
          Turn scattered thoughts into a <span className={styles.heroTitleAccent}>quiet personal library</span>
        </h1>
        <p className={styles.heroSubtitle}>
          MindSpace helps you capture a raw thought, understand what kind of note it is,
          and save it into meaningful life categories without accounts, feeds, or clutter.
        </p>
        <div className={styles.highlights} aria-label="MindSpace highlights">
          {HIGHLIGHTS.map((highlight) => (
            <span key={highlight} className={styles.highlight}>
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
