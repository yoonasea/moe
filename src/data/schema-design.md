# Directus Schema Design (Reference)

This document describes the Directus schema that the mock data layer represents.

## Collections

### `hero` (Singleton)

| Field             | Type       | Notes                        |
| ----------------- | ---------- | ---------------------------- |
| `title`           | String     | Hero heading text            |
| `subtitle`        | String     | Hero subheading              |
| `ctaText`         | String     | Call-to-action button label  |
| `ctaLink`         | String     | Internal route path          |
| `backgroundImage` | String (URL)| Full-width background image |

### `pages`

| Field  | Type         | Notes                        |
| ------ | ------------ | ---------------------------- |
| `id`   | UUID         | Primary key                  |
| `title`| String       | Page title                   |
| `slug` | String (Slug)| URL-friendly identifier      |
| `body` | WYSIWYG      | Rich text content            |

### `categories`

| Field   | Type        | Notes                        |
| ------- | ----------- | ---------------------------- |
| `id`    | UUID        | Primary key                  |
| `name`  | String      | Display name                 |
| `slug`  | String (Slug)| URL-friendly identifier     |

### `news`

| Field        | Type        | Notes                        |
| ------------ | ----------- | ---------------------------- |
| `id`         | UUID        | Primary key                  |
| `title`      | String      | Article headline             |
| `slug`       | String (Slug)| URL-friendly identifier     |
| `excerpt`    | String      | Short summary (teaser text)  |
| `body`       | WYSIWYG     | Full article content         |
| `publishDate`| Datetime    | Publication date             |
| `category`   | Many-to-One | FK → `categories.id`         |
| `image`      | String (URL)| Hero/thumbnail image         |
| `alt`        | String      | Alt text for image           |

## Key Relationships

- **news → categories**: Many-to-One. Each article belongs to one category.
- **pages**: Standalone collection. No direct relationships.

## Rationale

- The singleton `hero` collection simplifies managing a single homepage hero.
- `categories` is a separate collection so it can be reused for filtering in the API and future features (e.g., category landing pages).
- Using `slug` fields (rather than raw IDs) for URL-based lookups keeps routes clean and user-friendly.
- `WYSIWYG` for body fields allows content editors to format rich content without HTML knowledge.
