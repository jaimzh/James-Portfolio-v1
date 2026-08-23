<template>
  <section class="section quote-section" aria-label="Favorite quote">
    <div class="quote-mark" aria-hidden="true">”</div>
    <blockquote>
      <p>“Simplicity is the ultimate sophistication.”</p>
      <footer>
        <span aria-hidden="true"></span>
        Leonardo da Vinci
        <span aria-hidden="true"></span>
      </footer>
    </blockquote>
  </section>
</template>

<style scoped>
.quote-section {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: var(--space-3xl);
  padding-bottom: var(--space-3xl);
  text-align: center;
}

.quote-mark {
  color: var(--text-secondary);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(3rem, 8vw, 4.75rem);
  font-weight: 700;
  line-height: 0.7;
}

blockquote {
  max-width: 760px;
}

blockquote p {
  margin-top: var(--space-md);
  color: var(--text-primary);
  font-size: clamp(1.35rem, 4vw, 2.2rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.25;
}

blockquote footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
  color: var(--text-secondary);
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
}

blockquote footer span {
  width: clamp(2rem, 8vw, 4rem);
  height: 1px;
  background: currentColor;
}
</style>
