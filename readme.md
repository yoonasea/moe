# MOE Corporate Website (Prototype)

A prototype corporate website for the Ministry of Education, built with Next.js 15 and Directus CMS.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **react-markdown** (rich content rendering)
- **Directus** (Headless CMS — optional, can use mock data)
- **Vitest** + Testing Library (unit & component tests)

## Getting Started

### Using Mock Data (default)

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build
npm test          # Run tests
```

### Using Directus CMS

1. Start Directus via Docker:

```bash
docker compose up -d
```

2. Open Directus admin at http://localhost:8055 and log in with:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`

3. **Create the Directus schema (collections) via the Data Studio UI** — this is required before seeding:

   ### hero (singleton)
   Toggle "Singleton" when creating this collection.
   | Field | Type | Notes |
   |---|---|---|
   | `title` | Input | |
   | `subtitle` | Input | |
   | `ctaText` | Input | |
   | `ctaLink` | Input | |
   | `backgroundImage` | Input | Text field for image URL |

   ### categories (regular)
   | Field | Type | Notes |
   |---|---|---|
   | `name` | Input | |
   | `slug` | Input | Check "Use as slug" in Advanced tab |

   ### news (regular)
   | Field | Type | Notes |
   |---|---|---|
   | `title` | Input | |
   | `slug` | Input | Check "Use as slug" in Advanced tab |
   | `excerpt` | Textarea | |
   | `body` | WYSIWYG | |
   | `publishDate` | Date | |
   | `category` | Many-to-One | Related collection: **categories** |
   | `image` | Input | Text field for image URL |
   | `alt` | Input | |

   ### pages (regular)
   | Field | Type | Notes |
   |---|---|---|
   | `title` | Input | |
   | `slug` | Input | Check "Use as slug" in Advanced tab |
   | `body` | WYSIWYG | |

   > **Important:** The collections must be created in Directus before running the seed script. The seed script only populates data — it does not create the schema.

4. **Generate an admin access token:**
   - Click your **avatar icon** in the bottom-left corner of the sidebar
   - Select **Access Token**
   - Enter a token value (e.g. `moe-admin-token`) and click **Save**
   - Copy the token

5. Create `.env.local` in the project root:

```
DATA_SOURCE=directus
DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=<your-admin-token>
```

6. **Seed the database with mock data:**

   ```bash
   npx tsx scripts/seed.ts
   ```

   You should see:
   ```
   Clearing existing data...
   Seeding categories...
   Seeding news articles...
   Seeding pages...
   Seeding hero...
   Seed complete!
   ```

7. Run the app:

   ```bash
   npm run dev
   ```

To switch back to mock data, set `DATA_SOURCE=mock` in `.env.local`.

## Project Structure

```
src/
├── app/          # Pages (Server Components)
├── components/   # Reusable UI components
├── data/         # Mock JSON data files (used when DATA_SOURCE=mock)
├── lib/          # API layer, types, Directus client
├── scripts/      # Utility scripts (seed.ts)
└── test/         # Test setup & factories
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DATA_SOURCE` | `mock` | `"mock"` for local JSON, `"directus"` for Directus CMS |
| `DIRECTUS_URL` | `http://localhost:8055` | Directus instance URL |
| `DIRECTUS_TOKEN` | — | Static access token for Directus API |

See `.env.example` for a template.

## Architecture

See [architecture.md](./architecture.md) for detailed architecture notes, including data fetching strategy, schema design, trade-offs, and scaling considerations.
