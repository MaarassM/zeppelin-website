<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UI Changes — Responsive Design Required

Any change to UI or frontend code must work correctly on all three breakpoints:
- **Mobile** (< 768px) — single column, touch-friendly tap targets, no horizontal scroll
- **Tablet** (768px–1024px) — two-column layouts where applicable, comfortable spacing
- **Desktop** (> 1024px) — full layout as designed

Use Tailwind's `sm:`, `md:`, and `lg:` prefixes. Test every UI change mentally across all three sizes before considering it done. If a layout only works on desktop, it is not done.
