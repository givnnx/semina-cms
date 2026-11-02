# Semina CMS Design System & Anti-Slop Documentation

## Design Read & Personality
- **Dial Setting**: ENERGY 1 / RHYTHM 1 / MOTION 1
- **Domain**: Event management administration dashboard
- **Visual Stance**: Clean, functional, accessible administrative UI without generic AI gradients, raw palette steps, or nested interactive elements.

## Semantic Token Layer
All interface colors map to semantic CSS custom properties in `globals.css`:

| Token | Hex | Role | Contrast Ratio on Surface | WCAG 2.2 Status |
|-------|-----|------|---------------------------|-----------------|
| `--background` | `#f8fafc` | Main application canvas | N/A | Base |
| `--surface` | `#ffffff` | Card, table, and modal containers | 1.05:1 on background | Base |
| `--foreground` | `#0f172a` | Primary text and headings | 17.8:1 on surface | PASS (AAA) |
| `--muted-foreground` | `#475569` | Secondary text, placeholders, table headers | 7.58:1 on surface | PASS (AAA) |
| `--primary` | `#1d4ed8` | Primary CTA and active interactive accents | 6.70:1 with white | PASS (AA) |
| `--success` | `#166534` | Edit links, success badges, confirmation | 7.13:1 with white | PASS (AAA) |
| `--destructive` | `#b91c1c` | Delete buttons, error badges, destructive alerts | 6.47:1 with white | PASS (AA) |
| `--border` | `#cbd5e1` | Card and table boundary dividers | 1.63:1 | Non-text decorative |
| `--input-border` | `#6b7280` | Form control input borders | 4.83:1 on surface | PASS (>= 3:1 non-text) |

## Navigation Dark Surface Tokens
- `--nav-bg`: `#0f172a`
- `--nav-border`: `#1e293b`
- `--nav-active`: `#1e293b`
- `--nav-text`: `#f8fafc` (17.5:1 on nav-bg)
- `--nav-muted`: `#94a3b8` (8.04:1 on nav-bg)

## Typography & Radius Scale
- **Primary Typeface**: `Geist Sans` via `next/font/google`
- **Mono Typeface**: `Geist Mono`
- **Radii**:
  - `rounded-md` (`6px`): Input fields, select dropdowns, alert banners
  - `rounded-lg` (`8px`): Card panels, data table wrappers
  - `rounded-full`: Circular avatar previews
