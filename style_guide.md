# Project Salus - Style Guide
> **Design Theme:** Natural Scientific / Organic Modernism
> **Reference:** [Pinterest Inspiration](https://i.pinimg.com/1200x/d9/8f/2b/d98f2b8f173b1ba02459d18f4776b10f.jpg)

## 1. Visual Identity
Organic, Grounded, Professional.
- **Vibe:** "Old World Apothecary" meets "Modern Data Science".
- **Texture:** Paper-like backgrounds, matte finishes, crisp dark typography.

### Color Palette
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Background** | Canvas Beige | `#F2F0E9` | Main page background (Paper feel) |
| **Surface** | White Sage | `#FCFBF9` | Cards, input fields, panels |
| **Primary Text** | Forest Black | `#122420` | Headings, primary copy |
| **Secondary Text**| Moss Grey | `#5C6B66` | Meta data, extensive reading |
| **Accent A** | Deep Emerald | `#1A4D2E` | Primary buttons, active states, borders |
| **Accent B** | Burnt Clay | `#D97706` | Warning states, highlights |
| **Accent C** | Soft Sage | `#E8EFE9` | Secondary backgrounds, subtle badges |

---

## 2. Typography
**Headings (Serif):** *Playfair Display* or *Lora*.
- Elegant, editorial, high-contrast.
- **Color:** Forest Black (`#122420`).

**Body (Sans):** *Inter* or *Satoshi*.
- Clean, highly legible, modern.
- **Color:** Forest Black (`#122420`) or Moss Grey.

**Data (Mono):** *JetBrains Mono*.
- **Color:** Deep Emerald (`#1A4D2E`) for emphasis.

---

## 3. UI Patterns & Components

### Layout Strategy
- **Background:** Full `Canvas Beige` texture.
- **Cards:** `White Sage` backgrounds with delicate borders (`#1A4D2E` at 10% opacity).
- **Shadows:** Very soft, diffuse shadows (`shadow-sm`) or flat designs.

### Core Elements (shadcn/ui adapted)
- **Buttons:** Solid `Deep Emerald` with White text. Rounded corners (`rounded-lg`).
- **Inputs:** `White Sage` background, `Deep Emerald` border on focus.
- **Badges:** `Soft Sage` background with `Deep Emerald` text (Pill shape).

---

## 4. CSS Variables (Tailwind Theme)
```css
:root {
  /* Natural / Organic Theme */
  --background: 40 18% 93%; /* #F2F0E9 Canvas Beige */
  --foreground: 165 33% 11%; /* #122420 Forest Black */
  
  --card: 40 20% 98%; /* #FCFBF9 White Sage */
  --card-foreground: 165 33% 11%;
  
  --popover: 40 20% 98%;
  --popover-foreground: 165 33% 11%;
  
  /* Emerald Green Accents */
  --primary: 144 50% 20%; /* #1A4D2E Deep Emerald */
  --primary-foreground: 40 20% 98%;
  
  --secondary: 135 15% 92%; /* #E8EFE9 Soft Sage */
  --secondary-foreground: 144 50% 20%;
  
  --muted: 150 5% 90%;
  --muted-foreground: 165 10% 40%;
  
  --accent: 144 50% 20%;
  --accent-foreground: 40 20% 98%;
  
  --destructive: 0 84% 60%;
  --destructive-foreground: 40 20% 98%;
  
  --border: 144 50% 20%; /* Using Primary color at low opacity usually */
  --input: 144 50% 20%;
  --ring: 144 50% 20%;
  
  --radius: 0.75rem;
}
```