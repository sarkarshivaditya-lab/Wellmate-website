# WellMate

WellMate is a connected health and emergency care platform designed to bring everyday wellbeing and emergency response into one system. The product combines nutrition, movement, sleep, habits, mental wellbeing, personal context, and emergency information into a single experience.

The WellMate website presents the product vision through a premium, product focused interface with a particular emphasis on the Golden Hour emergency care workflow.

## The Golden Hour

The Golden Hour is the central emergency care concept behind WellMate.

In an emergency, critical minutes can be lost between an accident occurring and responders receiving the information they need to act effectively. WellMate is designed to help close this gap by connecting emergency detection, escalation, and critical personal context.

The emergency workflow is designed around three stages:

1. Detect

WellMate can use phone motion sensors to identify patterns associated with an abrupt movement followed by an unusually stable state.

2. Confirm

The system evaluates the detected pattern against configured emergency criteria before escalating the event.

3. Escalate

When an emergency condition is met, the workflow can contact configured emergency contacts and initiate ambulance support while making relevant emergency context available to responders.

WellMate can also maintain important emergency information such as blood group, allergies, and other critical details. When an emergency workflow is activated, this information can be shared with the responding paramedical team so that critical context can arrive with the alert.

The Golden Hour experience is intended to reduce the information gap between accident and informed action. It is designed as an emergency escalation workflow and is not a substitute for emergency services, medical professionals, or clinical assessment.

## Product Features

### Emergency Care

The emergency layer is designed around rapid detection, escalation, and delivery of critical context during time sensitive situations.

### Emergency Profile

Important information such as blood group, allergies, emergency contacts, and responder notes can form part of a user's emergency context.

### Connected Wellbeing

WellMate brings multiple areas of personal wellbeing into one connected system rather than treating each metric as an isolated data point.

### Nutrition

Meal logging and nutrient tracking provide context around calories, protein, fats, carbohydrates, and broader eating patterns.

### Movement

Workout and activity information can be considered alongside recovery, habits, and the way a person feels.

### Sleep and Recovery

Sleep and recovery are treated as important parts of overall wellbeing rather than independent metrics.

### Habits

WellMate is designed to make everyday consistency visible and easier to understand over time.

### Mental Wellbeing

The product includes mood, reflection, and a conversational space intended to support users during difficult moments.

### Personal AI Context

WellMate is designed as a personal wellbeing companion that can provide guidance across activity, nutrition, and mental wellbeing using the personal context built through the product.

## Website Experience

The public website includes:

- A cinematic introduction focused on the Golden Hour problem
- An explanation of the emergency detection and escalation concept
- Emergency context and responder information visualizations
- Interactive WellMate product screens
- Nutrition, movement, sleep, habits, and mental wellbeing sections
- A dedicated personal AI section
- A conversational WellMate demonstration
- A connected personal context and intelligence narrative
- Smartwatch and wearable integration concepts
- Responsive layouts for desktop, tablet, and mobile devices
- Reduced motion support and accessible interactive controls
- SEO metadata, sitemap, robots policy, and web manifest
- Optional Auth0 signup integration

## Technology

WellMate Website is built with:

- React
- TypeScript
- Vite
- Motion
- Lucide React
- Auth0 React SDK

The project is a frontend application. Backend services, databases, emergency dispatch infrastructure, and production APIs are not contained in this repository.

## Authentication

The website supports optional Auth0 integration for production deployments.

Configure the following environment variables when Auth0 is required:

```text
VITE_AUTH0_DOMAIN
VITE_AUTH0_CLIENT_ID
VITE_AUTH0_AUDIENCE
VITE_AUTH0_REDIRECT_URI
```

These values should be supplied through the deployment platform's environment variable configuration and should not be committed to the repository.

When Auth0 is not configured, the website falls back to its standard access experience.

## Local Development

Install dependencies using the lockfile:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Security

The repository is configured to keep environment files and generated build artifacts out of version control.

The website includes a baseline Content Security Policy and other browser security controls. The GitHub Actions build workflow uses the committed dependency lockfile and has read only repository permissions.

Production deployments should also configure HTTP security headers such as Strict Transport Security, X Content Type Options, Referrer Policy, and Permissions Policy at the hosting or CDN layer.

## Project Structure

```text
Wellmate-website/
├── public/
│   ├── screens/
│   ├── smartwatch-apple.svg
│   ├── smartwatch-samsung.svg
│   ├── smartwatch-whoop.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── boot/
│   ├── App.tsx
│   ├── auth.tsx
│   ├── emergency.css
│   ├── styles.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Status

WellMate Website is the public facing product experience for the WellMate platform. The website communicates the product direction and emergency care concept while the underlying production health, emergency, and backend infrastructure can be developed independently.
