# SocialServe Design System & Style Guide

## Color Palette

### Primary Colors
- **Primary Green:** `#10b981` - Used for main CTAs, success states, focus indicators
- **Secondary Blue:** `#3b82f6` - Used for accents, secondary actions
- **Dark Background:** `#0f172a` - Dark mode primary background
- **Light Background:** `#ffffff` - Light mode primary background

### Semantic Colors
- **Success:** `#10b981` (Green - matches primary)
- **Error:** `#ef4444` (Red - for errors, destructive actions)
- **Warning:** `#f59e0b` (Amber - for warnings)
- **Info:** `#3b82f6` (Blue - for information)

### Neutral Colors
- **Dark Text:** `#111827` (Gray-900)
- **Light Text:** `#f3f4f6` (Gray-50)
- **Border Light:** `#e5e7eb` (Gray-200)
- **Border Dark:** `#475569` (Slate-600)

---

## Typography

### Font Family
- Primary: **Inter** (Google Fonts)
  - Regular: 400
  - Medium: 500
  - Semibold: 600
  - Bold: 700
  - Extra Bold: 800

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.25rem (36px) | 700 | 1.4 |
| H2 | 1.875rem (30px) | 700 | 1.4 |
| H3 | 1.5rem (24px) | 600 | 1.5 |
| Body Large | 1.125rem (18px) | 400 | 1.75 |
| Body | 1rem (16px) | 400 | 1.5 |
| Body Small | 0.875rem (14px) | 400 | 1.5 |
| Label | 0.875rem (14px) | 600 | 1.25 |
| Caption | 0.75rem (12px) | 500 | 1.25 |

---

## Spacing Scale

Based on 0.25rem (4px) unit:

```
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 2.5rem (40px)
- 3xl: 3rem (48px)
```

---

## Components

### Buttons

#### Primary Button
```jsx
<button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
  Click Me
</button>
```
- Background: Green gradient
- Text: White
- Padding: 0.75rem 1.5rem
- Border Radius: 0.5rem
- Font Weight: 600
- Hover: Shadow effect

#### Secondary Button
```jsx
<button className="border-2 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
  Secondary
</button>
```
- Background: Transparent
- Border: 2px gray
- Hover: Light background

#### Danger Button
```jsx
<button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
  Delete
</button>
```
- Background: Red
- Text: White
- Usage: Destructive actions

---

### Input Fields

#### Text Input
```jsx
<input
  type="text"
  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
  placeholder="Enter text"
/>
```

#### Textarea
```jsx
<textarea
  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
  rows="5"
  placeholder="Enter description"
/>
```

#### Select
```jsx
<select className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 focus:outline-none focus:border-primary">
  <option>Option 1</option>
</select>
```

---

### Cards

#### Event Card
```jsx
<div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
  <img src="..." alt="..." className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
</div>
```

#### Badge
```jsx
<span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
  Label
</span>
```

---

### Forms

#### Form Group
```jsx
<div>
  <label className="block text-sm font-semibold mb-3">
    Label <span className="text-red-500">*</span>
  </label>
  <input type="text" className="w-full..." />
  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
</div>
```

---

## Shadows

### Shadow Scale

```css
/* Small shadow (subtle) */
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Medium shadow (cards) */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Large shadow (elevated elements) */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Extra large (modals, dropdowns) */
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

---

## Border Radius

```
- sm: 0.375rem (6px)
- md: 0.5rem (8px)
- lg: 0.75rem (12px)
- xl: 1rem (16px)
- 2xl: 1.5rem (24px)
- full: 9999px (circles/pills)
```

---

## Animations

### Entrance Animation
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Hover Animation
```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Loading Animation
```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

---

## Responsive Breakpoints

```
- Mobile: 320px - 640px (sm)
- Tablet: 768px - 1024px (md)
- Desktop: 1280px+ (lg)
```

### Responsive Classes

```html
<!-- Mobile first -->
<div class="text-lg md:text-2xl lg:text-4xl">
  Responsive heading
</div>

<!-- Hidden on mobile -->
<div class="hidden md:block">
  Desktop only
</div>

<!-- Mobile grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Items -->
</div>
```

---

## Dark Mode

All components should support dark mode:

```jsx
// Light mode
className="bg-white text-gray-900"

// Dark mode equivalent
className="dark:bg-slate-900 dark:text-white"
```

### Dark Mode Colors

```
Dark Background: #1e293b (slate-900)
Dark Surface: #0f172a (slate-950)
Dark Text Primary: #f1f5f9 (slate-100)
Dark Text Secondary: #cbd5e1 (slate-300)
Dark Border: #475569 (slate-600)
```

---

## States

### Hover State
- Scale: 1.05
- Shadow: Increase by 1 level
- Color: Slightly darker/lighter
- Cursor: pointer

### Focus State
- Outline: 2px solid primary color
- Outline Offset: 2px

### Disabled State
- Opacity: 60%
- Cursor: not-allowed
- No hover effect

### Loading State
- Show spinner
- Disable interactions
- Maintain layout space

### Error State
- Border: 2px red
- Error message below
- Red text color

---

## Accessibility

### Color Contrast
- Normal text: 4.5:1 ratio
- Large text: 3:1 ratio
- Non-text: 3:1 ratio

### Focus Indicators
- Always visible
- High contrast
- At least 3px visible

### Images
- Always include alt text
- Descriptive alt text

### Forms
- Label associated with input
- Required fields marked
- Error messages linked to field

---

## Best Practices

1. **Consistency:** Use the same components across the app
2. **Spacing:** Use the defined spacing scale
3. **Typography:** Stick to the defined type scale
4. **Colors:** Use the defined color palette
5. **Animations:** Keep animations under 300ms
6. **Dark Mode:** Always provide dark mode support
7. **Accessibility:** Test with keyboard and screen readers
8. **Performance:** Optimize images and animations

---

## Component Library

Ready-to-use components in your app:

- `LoadingSpinner` - Loading indicator
- `Navbar` - Navigation bar
- `Footer` - Page footer
- Form components - Input, Select, Textarea
- Card components - Event cards, feature cards
- Badge components - Tags and labels
- Button components - Various button styles

---

## File Structure for Styles

```
src/
├── index.css (global styles)
├── styles/
│   └── custom.css (DatePicker & additional)
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── LoadingSpinner.jsx
└── pages/
    ├── Home.jsx
    ├── Login.jsx
    ├── Register.jsx
    └── ... (other pages)
```

---

## Quick Reference

### Adding a new styled component:

```jsx
import { motion } from 'framer-motion';

export const StyledComponent = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6"
  >
    {/* Content */}
  </motion.div>
);
```

### Color usage:

```jsx
// Primary action
className="bg-primary text-white"

// Danger action
className="bg-red-500 text-white"

// Secondary action
className="bg-secondary text-white"

// Disabled
className="opacity-50 cursor-not-allowed"
```

---

**For more details, see IMPROVEMENTS_SUMMARY.md and DEPLOYMENT_CHECKLIST.md**
