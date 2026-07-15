# MOE Corporate Website (Prototype)

A prototype corporate website for the Ministry of Education, built with Next.js 15.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **react-markdown** (rich content rendering)
- **Vitest** + Testing Library (unit & component tests)

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build
npm test          # Run tests
```

## Project Structure

```
src/
├── app/          # Pages (Server Components)
├── components/   # Reusable UI components
├── data/         # Mock JSON data files
├── lib/          # API layer, types
└── test/         # Test setup & factories
```

## Architecture

See [architecture.md](./architecture.md) for detailed architecture notes, including data fetching strategy, schema design, trade-offs, and scaling considerations.
