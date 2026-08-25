# WellMate Website

A premium consumer product site for WellMate — designed as the real public-facing product experience, not a hackathon showcase.

## Product story

WellMate brings nutrition, movement, sleep, habits and mental wellbeing into one connected system. The website introduces the product through real product surfaces, then explains the intelligence layer: WellMate, the personal AI companion that can act as a personal trainer, nutrition companion and mental wellbeing advisor using the context a user builds through the product.

## Experience

- Cinematic, editorial hero with responsive motion
- Real WellMate product surfaces represented in the product story
- Interactive product-screen selector
- Dedicated WellMate AI section and conversational demo
- Nutrition, movement, sleep, habits and mental wellbeing storytelling
- Product-context approach section
- Premium signup / access conversion surface
- Optional Auth0 signup integration for production deployments
- Responsive desktop/tablet/mobile layouts
- Semantic controls, focus states and reduced-motion support
- SEO metadata, robots policy, sitemap and web manifest

## Authentication

If the same Auth0 application used by the WellMate product is available to the website, configure `.env` from `.env.example`:

- `VITE_AUTH0_DOMAIN`
- `VITE_AUTH0_CLIENT_ID`
- `VITE_AUTH0_AUDIENCE` (optional)
- `VITE_AUTH0_REDIRECT_URI`

With those values present, the primary signup CTAs launch Auth0's signup flow. Without them, the site gracefully falls back to the email access form.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```
