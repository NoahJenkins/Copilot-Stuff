---
description: Frontend component conventions and UI-layer patterns.
applyTo: 'src/components/**, src/app/**'
---

## Component Authoring
- **Naming**: PascalCase for component files and exports (e.g., `UserCard.tsx`).
- **Structure**: one component per file; co-locate styles and tests.
- **Props**: define explicit prop types/interfaces; avoid `any`.

## Styling
- Approach: [e.g., Tailwind utility classes, CSS Modules, styled-components — fill in for your project]
- [Tailwind]: prefer utility classes over custom CSS; extract repeated patterns to components, not custom classes.
- Avoid inline styles except for dynamic values that cannot be expressed with utilities.

## Framework-Specific Conventions
- [Fill in based on your framework, for example:]
  - **Next.js**: route files must be named `page.tsx` / `layout.tsx` / `route.ts`; use Server Components by default, add `"use client"` only when necessary.
  - **React**: prefer function components and hooks; avoid class components.
- Accessibility: include ARIA labels on interactive elements; ensure keyboard navigability.
