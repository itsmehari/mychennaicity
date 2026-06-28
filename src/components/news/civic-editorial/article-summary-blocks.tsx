import type { KeyDetailItem } from "@/lib/article-content-extract";

export function ArticleQuickSummary({ bullets }: { bullets: string[] }) {
  if (bullets.length === 0) return null;

  const items = bullets.slice(0, 5);

  return (
    <aside className="civic-quick-summary" aria-label="Quick summary">
      <h2 className="civic-quick-summary__title">Quick Summary</h2>
      <ul className="civic-quick-summary__list">
        {items.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </aside>
  );
}

export function ArticleKeyDetailsStrip({ items }: { items: KeyDetailItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="civic-key-details" aria-label="Key details">
      <div className="civic-key-details__grid">
        {items.map((item) => (
          <div key={item.label} className="civic-key-details__item">
            <p className="civic-key-details__label">{item.label}</p>
            <p className="civic-key-details__value">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
