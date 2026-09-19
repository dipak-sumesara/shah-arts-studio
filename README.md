# Shah Art Studio & Academy

Client website for an art studio offering 3D hand casting, resin art, and workshops — a browsable catalogue, city-level service availability, appointment booking with date and slot selection, and a booking-fee payment step with WhatsApp confirmation.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Base UI / shadcn · Cashfree Checkout · Vercel Analytics

---

## How it is put together

The site itself is a **single self-contained HTML document** (`public/index.html`, ~58 KB) that implements its own view switching, catalogue rendering, booking calendar, and modals in vanilla JS. Next.js wraps it: `app/page.tsx` mounts it full-viewport, and `app/layout.tsx` supplies fonts, theming, icons, and analytics.

```
app/
  layout.tsx                    fonts, metadata, theme, analytics
  page.tsx                      mounts the studio site
  globals.css
public/
  index.html                    the site — views, catalogue, booking flow, modals
components/
  cashfree-checkout.tsx         Cashfree SDK loader + checkout, with an error boundary
  share-whatsapp-button.tsx     opens WhatsApp with a formatted booking summary
  ui/                           shared primitives
lib/
  whatsapp.ts                   booking-message builder and wa.me link construction
```

This shape was chosen deliberately: the studio's content is edited as one file, while the React layer carries the pieces that genuinely need it — the payment SDK lifecycle and the share flow.

---

## Features

**Catalogue and content**

- Views for home, 3D hand casting, resin art, courses & workshops, and service availability, plus a generic category view driven by the selected category
- New arrivals and category grids, with a customisation modal for made-to-order pieces
- Responsive, serif-led layout with light and dark colour schemes

**Booking**

- Month calendar with slot selection
- Booking form capturing parent name, contact number, child's age, city, and address
- City-level service availability across Indian metros (Ahmedabad, Mumbai, Delhi, Surat, Vadodara, Rajkot)
- Payment modal for the booking fee, with connecting and confirmation states

**Payments**

`components/cashfree-checkout.tsx` handles the parts of a third-party checkout that usually break:

- The SDK is loaded once through a **singleton promise**, so concurrent mounts share a single `<script>` rather than racing
- A pre-existing script tag is reused instead of re-injected
- A failed load clears the cached promise so a retry can actually retry
- The whole checkout is wrapped in an **error boundary**, so an SDK failure degrades the modal instead of taking down the page

**Confirmation**

`lib/whatsapp.ts` builds a formatted booking summary — name, phone, child's age, date, slot, city, address, amount — and encodes it into a `wa.me` deep link, so a confirmed booking reaches the studio's WhatsApp without any messaging infrastructure.

---

## Running locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

```bash
pnpm build && pnpm start   # production build
pnpm lint
```

---

## Status and limitations

This is a client-facing marketing and booking site, not a commerce backend. Specifically:

- **Cashfree runs against sandbox placeholders.** Real credentials are not committed, and going live requires creating the order **server-side** — the secret key must never reach client code.
- **There is no backend.** Bookings are not persisted; WhatsApp is the delivery mechanism, and there is no admin view of past bookings.
- **Availability is static.** Slot availability is defined in the page rather than checked against a calendar, so double-booking is prevented only within a single session.
- **WhatsApp confirmation is a deep link**, not an automated message. Automating it needs the WhatsApp Business API (Meta, Twilio, or similar).

## Possible next steps

- A small API for order creation and booking persistence, with Cashfree order creation moved server-side and webhook-based payment verification
- Real slot availability backed by the studio's calendar
- Admin view for upcoming bookings
- WhatsApp Business API for automated confirmations and reminders

---

## License

MIT
