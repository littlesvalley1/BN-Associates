# B.N. Associates — Property Dealer Website

Static marketing + lead-generation website for **B.N. Associates (Prop. Preetpal Singh)**, property dealer in Nilothi Extn., New Delhi – 110041. Fully static — no server, no database — perfect for free hosting on GitHub Pages / Cloudflare Pages.

## Features

- Day/night mode toggle that remembers the choice in the current browser, with high-contrast brand styling (black / yellow #FFD400 / red #D92B2B)
- Sticky header with tap-to-call + mobile menu
- Hero with breathing WhatsApp CTA, trust stats, scrolling service ticker
- Services: Sale & Purchase, Renting, Collaboration/JV
- Listings with filter chips — every card has a one-tap WhatsApp enquiry (pre-filled message) + call button
- Neighborhood photo gallery featuring local homes, plots and the B.N. Associates office
- Password-only admin at `/admin` for managing classifieds, property photos and business contact details
- GrowthMachine Studio footer credit with a direct link to its website
- Buyer tools: **Home-loan EMI calculator** + **Area converter** (Gaj ↔ Sq Ft ↔ Sq M ↔ Marla ↔ Kanal)
- Areas-served strip, trust points, 3-step deal process, testimonials, FAQ accordion
- Enquiry form that opens WhatsApp with the message pre-filled (no backend needed)
- Floating WhatsApp button, back-to-top, mobile sticky Call/WhatsApp bar
- Fully responsive (mobile-first), reduced-motion friendly, accessible focus states

## Tech

React + TypeScript + Vite + Tailwind CSS. No runtime secrets or API keys.

## Develop / Build

```bash
npm install
npm run dev      # local dev
npm run build    # outputs static site to dist/
```

## Deploy on Cloudflare Pages (recommended)

1. Push this folder to a GitHub repo.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset: **Vite** · Build command: `npm run build` · Output directory: `dist`.
4. Deploy — done. Every git push auto-redeploys.

## Deploy on GitHub Pages

Build locally, then publish the `dist/` folder contents to a `gh-pages` branch (or use the `vitejs.dev` GitHub Actions workflow). Note: if serving from `https://<user>.github.io/<repo>/`, set `base: '/<repo>/'` in `vite.config.ts` before building.

## Admin and updating content

Visit `/admin` and create an admin password (8 or more characters) the first time. There is no username or email field. Use the panel to add, edit and remove property classifieds, upload a photo, and update the business name, contact numbers, WhatsApp, address, map and hours.

This is a static site without a backend. Admin changes and the password are stored in the current browser only; they do not sync to other devices or publish updates to other visitors. The password is a browser-level convenience lock, not server-side authentication. To publish shared content changes, edit the defaults in **`src/lib/site.ts`** and redeploy, or connect a CMS/backend.
