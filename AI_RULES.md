# AI_RULES.md

## Tech Stack Overview

- **Framework:** React 18 (with TypeScript)
- **Build Tool:** Vite
- **Component Library:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS (with custom design tokens in HSL)
- **Routing:** React Router DOM (v6)
- **State/Server Data:** React Query (@tanstack/react-query)
- **Icons:** lucide-react
- **Forms:** react-hook-form (with zod for validation)
- **Charts:** recharts
- **Toasts/Notifications:** shadcn/ui toast and sonner
- **Other Utilities:** clsx, tailwind-merge, date-fns

---

## Library Usage Rules

1. **UI Components:**  
   - Always use shadcn/ui components for all UI elements (buttons, cards, dialogs, etc.).
   - If a component is not available in shadcn/ui, use Radix UI primitives directly.

2. **Styling:**  
   - Use Tailwind CSS utility classes for all custom styling.
   - Do not use CSS-in-JS or styled-components.
   - All color values must use HSL and be defined in the design tokens.

3. **Routing:**  
   - Use React Router DOM for all client-side routing.
   - Keep all route definitions in `src/App.tsx`.

4. **State Management:**  
   - Use React Query for all server data fetching, caching, and mutations.
   - Use React's built-in state/hooks for local UI state.

5. **Forms & Validation:**  
   - Use react-hook-form for form state management.
   - Use zod for schema validation with forms.

6. **Icons:**  
   - Use lucide-react for all icons.

7. **Charts & Data Visualization:**  
   - Use recharts for all charting needs.

8. **Toasts/Notifications:**  
   - Use shadcn/ui's toast or sonner for all notifications and alerts.

9. **Utilities:**  
   - Use clsx and tailwind-merge for conditional className logic.
   - Use date-fns for date formatting and manipulation.

10. **File/Folder Structure:**  
    - Place all source code in the `src` directory.
    - Pages go in `src/pages/`, components in `src/components/`, and hooks in `src/hooks/`.

---

**Note:**  
Do not introduce new libraries unless absolutely necessary and only after confirming they are not already covered by the above stack.