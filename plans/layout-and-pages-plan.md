# Layout and Pages Implementation Plan

## Overview
Add navbar, footer, and additional pages (Terms, Privacy, Contact, Error, 404) with consistent theme aesthetics.

## Theme Aesthetics Reference
- **Light Mode**: slate-50/gray-100 gradient backgrounds, white cards with slate-200 borders, slate-900 text
- **Dark Mode**: slate-900/slate-800 gradient backgrounds, slate-800 cards with slate-700 borders, slate-50 text
- **Accent**: indigo-600 (light) / indigo-400 (dark)
- **Styling**: rounded-lg corners, subtle shadows, animated blob shapes
- **Typography**: Clean, modern with proper hierarchy

## Components to Create

### 1. Navbar Component (`components/layout/Navbar.tsx`)
**Features:**
- Logo/branding with ⌨️ icon and "Markdown Typing SVG" text
- Navigation links: Home, Demo, Terms, Privacy, Contact
- GitHub link (external icon)
- Theme toggle button (Sun/Moon icons)
- Responsive design with mobile hamburger menu
- Sticky positioning with backdrop blur effect
- Active link highlighting

**Styling:**
- Background: white/90 with backdrop blur (light), slate-800/90 (dark)
- Border: bottom border slate-200/50 (light), slate-700/50 (dark)
- Height: 64px
- z-index: 50

**Icons needed:**
- GitHub (from lucide-react)
- Menu, X (for mobile toggle)
- Sun, Moon (theme toggle)

---

### 2. Footer Component (`components/layout/Footer.tsx`)
**Features:**
- Logo/branding section
- Quick links: Home, Demo, Terms, Privacy, Contact
- Social media links: GitHub, Twitter/X, LinkedIn, Discord
- Copyright notice
- Theme-consistent styling

**Styling:**
- Background: white/95 (light), slate-800/95 (dark)
- Border: top border slate-200/50 (light), slate-700/50 (dark)
- Padding: py-8
- Grid layout for responsive design

**Social Media Icons:**
- GitHub (lucide-react)
- Twitter/X (lucide-react)
- LinkedIn (lucide-react)
- MessageCircle (for Discord)

---

### 3. Root Layout Update (`app/layout.tsx`)
**Changes:**
- Wrap children with Navbar and Footer
- Add proper spacing (pt-16 for navbar offset)
- Ensure BackgroundShapes component is included
- Maintain theme provider functionality

---

### 4. Terms of Service Page (`app/terms/page.tsx`)
**Content:**
- Page title and introduction
- Terms sections: Acceptance, User Content, Disclaimer, Limitation of Liability
- Card-based layout for readability
- "Last Updated" date

**Structure:**
- Hero section with title
- Main content with card sections
- Footer navigation

---

### 5. Privacy Policy Page (`app/privacy/page.tsx`)
**Content:**
- Page title and introduction
- Privacy sections: Information Collection, Use of Information, Cookies, Third-Party Services, User Rights
- Card-based layout
- "Last Updated" date

**Structure:**
- Hero section with title
- Main content with card sections
- Footer navigation

---

### 6. Contact Page (`app/contact/page.tsx`)
**Content:**
- Hero section with title and description
- Contact form: Name, Email, Subject, Message
- Alternative contact methods: Email, GitHub Issues
- Submit button with loading state

**Form Fields:**
- Name (text input)
- Email (email input)
- Subject (text input)
- Message (textarea)
- Submit button

**Styling:**
- Card-based form layout
- Validation feedback
- Success/error state handling

---

### 7. Error Page (`app/error.tsx`)
**Content:**
- Error message display
- "Something went wrong" heading
- Friendly description
- Return to Home button
- Report issue link

**Styling:**
- Centered layout
- Large error icon
- Clear action buttons

---

### 8. 404 Not Found Page (`app/not-found.tsx`)
**Content:**
- "Page Not Found" heading
- Friendly description
- Return to Home button
- Link to Demo page

**Styling:**
- Centered layout
- 404 large text display
- Clear navigation options

---

## Implementation Order

1. **Create Navbar component** - With GitHub link and theme toggle
2. **Create Footer component** - With social media links
3. **Update root layout** - Integrate Navbar and Footer
4. **Create Terms page** - Card-based content layout
5. **Create Privacy page** - Similar structure to Terms
6. **Create Contact page** - With form and validation
7. **Create Error page** - Generic error handling
8. **Create 404 page** - Next.js not-found page

---

## File Structure

```
components/
  layout/
    BackgroundShapes.tsx (existing)
    Navbar.tsx (new)
    Footer.tsx (new)

app/
  layout.tsx (update)
  page.tsx (existing - may need minor adjustments)
  demo/page.tsx (existing - may need minor adjustments)
  terms/page.tsx (new)
  privacy/page.tsx (new)
  contact/page.tsx (new)
  error.tsx (new)
  not-found.tsx (new)
```

---

## Design Consistency Checklist

- [ ] All pages use gradient backgrounds (slate-50/gray-100 to slate-100 light, slate-900/slate-800 to slate-900 dark)
- [ ] Cards use white/dark-slate backgrounds with borders
- [ ] Typography hierarchy consistent (h1, h2, h3, p)
- [ ] Rounded corners (rounded-lg) on all cards
- [ ] Subtle shadows on interactive elements
- [ ] Accent colors (indigo-600/indigo-400) for CTAs
- [ ] Proper spacing (margins, padding)
- [ ] Mobile-responsive design
- [ ] Dark mode support throughout
- [ ] BackgroundShapes component included on all pages

---

## Notes

- The project uses Next.js App Router
- Theme management via `useTheme` hook
- UI components from `components/ui/` (shadcn/ui style)
- Icons from `lucide-react`
- Tailwind CSS for styling
- All new pages should be server components unless client interactivity is needed (e.g., Contact form)
