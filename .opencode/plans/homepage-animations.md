# Homepage Animations — Fade In & Slide In

## Files to Edit

### 1. `src/components/HeroSection.module.css`

Add at the bottom (before the `@media (max-width: 640px)` block):

```css
@keyframes heroFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero,
  .title,
  .subtitle,
  .cta {
    animation: none;
  }
}
```

Modify `.hero` — add `animation: heroFadeIn 0.8s ease-out both;`

Modify `.title` — add `animation: fadeInUp 0.6s ease-out 0s both;`

Modify `.subtitle` — add `animation: fadeInUp 0.6s ease-out 0.2s both;`

Modify `.cta` — add `animation: fadeInUp 0.6s ease-out 0.4s both;`

### 2. `src/components/NewsCard.module.css`

Add at the bottom:

```css
@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    animation: none;
  }
}
```

Modify `.card` — add:
```
animation: cardFadeIn 0.5s ease-out both;
animation-delay: var(--delay, 0s);
```

### 3. `src/components/NewsList.tsx`

Pass a `style` prop to each wrapping `<div role="listitem">` to stagger card animations.

**Change:**
```tsx
<div role="listitem" key={article.id}>
  <NewsCard article={article} />
</div>
```

**To:**
```tsx
<div
  role="listitem"
  key={article.id}
  style={{ '--delay': `${index * 0.15}s` } as React.CSSProperties}
>
  <NewsCard article={article} />
</div>
```

### 4. `src/app/page.module.css`

Add a subtle fade-in to the teaser heading:

Add at the bottom (before `@media`):
```css
@keyframes headingFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .heading {
    animation: none;
  }
}
```

Modify `.heading` — add `animation: headingFadeIn 0.5s ease-out 0.3s both;`

## Summary

| Element | Animation | Delay |
|---|---|---|
| Hero background | Hero fades in (opacity) | 0s |
| Hero title | Slides up + fades in | 0s |
| Hero subtitle | Slides up + fades in | 0.2s |
| Hero CTA button | Slides up + fades in | 0.4s |
| "Latest News" heading | Slides up + fades in | 0.3s |
| News cards | Slides up + fades in | 0s, 0.15s, 0.3s |

All animations respect `prefers-reduced-motion: reduce` for accessibility.
