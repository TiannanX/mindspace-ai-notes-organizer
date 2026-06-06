import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Your thoughts, <span className={styles.heroTitleAccent}>beautifully organized</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Write anything on your mind. Watch it transform into organized insights,
          neatly sorted into meaningful categories. Your private thinking space.
        </p>
      </div>
    </section>
  );
}