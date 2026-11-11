# Samruddhi Jeevan public website

A developer-managed Next.js App Router and TypeScript website with responsive CSS, Lucide icons, English and Kannada content. No database, authentication, payment processing or environment secrets are required.

## Run locally

Use Node.js 22.18 or newer; verified with Node.js 24.15.

```sh
npm ci
npm run dev
```

Visit http://localhost:3000. Routes: `/en`, `/kn`, `/en/blog`, `/kn/blog`. The root redirects to English. Unsupported languages return 404. The blog language switch stays on the blog.

## Content and assets

- `lib/society.ts`: contacts, registration, office hours, membership amount, minimum deposits and rates. Registration: DRZ/RSR/RGN/7296/2026-27.
- `lib/content.ts`: core English and Kannada copy.
- `lib/enhancements.ts`: membership, comparison, MIS, insurance services and structured inauguration copy in both languages.
- `lib/news.ts`: Founder President name and role, photo captions, media paths and video durations.
- `components/website.tsx`: homepage sections and deposit-to-calculator selection.
- `components/calculator.tsx`: FD/RD calculator and print-only estimate layout.
- `components/mis-plan.tsx`: monthly income and optional RD illustration.
- `components/community-services.tsx`: membership, comparison table, insurance services, Google Map and mobile contact bar.
- `components/site-chrome.tsx`: shared navigation and footer.
- `components/photo-gallery.tsx`: accessible native-dialog gallery. Escape closes; left/right arrows navigate; focus returns to the opener.
- `components/press-gallery.tsx`: invitation, event highlights and press images linking to the full originals.
- `components/experience.tsx`: small progressive enhancement for scroll reveals and a reading-progress bar. Cleans up observers and animation frames on route changes; respects reduced motion at load and when the preference changes.
- `components/faq.tsx` and `lib/faq.ts`: bilingual native-details FAQ based on confirmed scheme and contact information. Keyboard accessible and usable without JavaScript.
- `app/globals.css`: responsive design, mobile safe-area support and A4 print styles.
- `public/`: society logo, latest brochure photograph, Founder President photo, event media and press assets.

FD minimum: ₹50,000. RD minimum: ₹1,000 per month. Share membership: ₹2,500 with an SB account. This wording does not assert an included opening balance or specify unconfirmed fees. Office hours: 10 am to 6 pm; working days have not been supplied. Phone numbers: 08363145422, 7625083086, 9448273803 and 8310964082. WhatsApp uses the originally supplied mobile number, 7625083086, following the owner's confirmation that WhatsApp is available.

The latest brochure photograph is authoritative: the 24-month RD rate is 8.00%, replacing 8.50% in the older PDF. No unconfirmed rate-effective date is published. Rates, minimums and translated rate descriptions derive from shared settings; review narrative text when scheme terms change. The owner-approved Founder President biography is published in English and Kannada, including his start as an accountant, three decades in life insurance, 25 years as LIAFI President, Chairman’s Club life membership, MDRT, COT and former Bunts Sangha presidency. Professional highlights repeat the approved facts without adding a title or personal quotation.

The homepage now uses a real inauguration photograph, a prominent navy-and-gold loan section, insurance/policy services below loans, membership information, deposit comparison and a dedicated MIS section. The insurance copy does not assert an unverified agency appointment or guaranteed policy-loan approval.

## Interactive experience

The homepage includes subtle entry and scroll animations, hover feedback on links/cards, a sticky header with active-section navigation and a reading-progress indicator. Animations use CSS and browser APIs; no animation library was added. The page content is rendered on the server and stays visible without JavaScript. Reduced-motion users see fully visible content without animation. The FAQ uses native details/summary controls and opens one answer at a time in browsers supporting the name attribute.

The founder section displays the approved biography, two experience highlights and professional distinctions, with responsive stacking on smaller devices.

## Calculations

All rates below are annual percentages. FD and standalone RD results display rounded to whole rupees; MIS illustrations show paise. Calculations retain precision except the explicitly rounded MIS-funded RD instalment.

- FD simple interest: `P × rate × months / 1200`.
- FD rate tiers: 6 months 7.50%, 12 months 8.50%, 24 months and above 9.50%. Senior bonus: 0.50 percentage points. Offered calculator tenures: 6, 12, 24, 36, 48 and 60 months.
- Standalone RD simple interest: `instalment × rate × n × (n + 1) / 2400`. Assumes instalments at the **start of each month**, accruing for n, n-1, ... 1 months. This assumption appears next to the result.
- RD terms: 12 months 7.50%, 24 months 8.00%, 36 months 9.00%. No senior RD bonus is assumed.
- MIS has a separate 8.00% rate and 8.50% senior rate, not the regular FD tenure-tier rate. Monthly income: `P × MIS_rate / 1200`.
- Optional MIS-funded RD uses the whole-rupee floor of the monthly payout. If that amount is below ₹1,000, the RD illustration is marked ineligible and no additional RD interest is shown.
- MIS-funded RD assumes **month-end** payouts deposited immediately into the RD, accruing for n-1, ... 0 months. Additional interest: `whole_rupee_instalment × RD_rate × n × (n - 1) / 2400`.
- Combined value = original MIS principal + total MIS interest + additional RD interest. MIS income is counted once, and fractional payout balances remain in the account. Confirm that the actual MIS term matches the selected illustrative RD period.
- All results exclude applicable tax/deductions and are estimates. The brochure's Double Scheme uses compounding and is intentionally separate from these simple-interest calculators.

Examples: a ₹1,00,000 regular 12-month FD estimates ₹1,08,500. A standalone ₹5,000/month 24-month RD estimates ₹1,30,000. A ₹1,50,000 MIS at 8% pays ₹1,000/month; reinvested at month-end for 24 months at 8% RD, the illustration gives ₹1,840 additional RD interest and ₹1,75,840 combined value.

Deposit-card actions select the matching calculator. The Print / save estimate button opens the browser print dialogue; choose Save as PDF where supported. The estimate contains amount, rate, tenure, assumptions, society details and preparation date in Asia/Kolkata time.

## Inauguration blog

The supplied invitation confirms 3 July 2026, 5 pm, R N Shetty Kalyan Mantap near Indira Glass House, Hubballi, and chief guest Shri Anand Guruswamy. The blog transparently notes that a supplied Kannada press notice instead lists 6 pm. It does not confuse the Sanje Darpana publication date (5 July 2026, page 4) with the event date.

The article has anchored sections for overview, invitation/highlights, five event photographs, two video recordings and three press clippings. All five newly supplied images are included. Event videos are compressed H.264/AAC MP4s with fast-start metadata, 720px width, native controls, inline playback and no autoplay. Combined size decreased from 68,323,182 to 21,401,723 bytes (about 69% smaller), retaining full duration and audio. Original recordings remain in the owner's source ZIP. Speech subtitles/transcripts are unavailable; no transcription has been fabricated. Add a verified transcript and WebVTT tracks when available.

## Contact and privacy

The enquiry form prepares a `mailto:` draft. It does not send or store information, and requires the visitor's email app. Call and direct email links are alternatives. WhatsApp opens a chat without automatically sending a message. An embedded Google Map searches the supplied address; a verified Google Business pin can replace it later. The map is lazy-loaded. Google Fonts supplies DM Sans, Manrope and Noto Sans Kannada, with system fallbacks. External map, font, WhatsApp and email providers have their own policies. The footer Privacy section and the latest-brochure link were removed at the owner’s request.

No office days, lending rates, staff biographies, agent licence numbers, testimonials or mandatory-document lists are invented. Confirm these details before adding them. A fluent Kannada review before public launch is recommended.

## Validation

```sh
npm test
npm run typecheck
npm run build
npm start
```

Seven automated calculation tests cover rate tiers, senior bonus, standalone RD instalments, invalid values, minimum boundaries, MIS eligibility and combined-plan accounting. Browser checks cover both languages on home/blog routes, responsive widths 320–1920px and landscape, menu access, contacts, map configuration, calculator selection, invalid/valid values, print styling, MIS senior results, gallery keyboard handling, all press images and actual playback of both compressed clips in Chrome. Physical-device testing remains useful for platform-specific behaviour.

Additional browser checks for the biography and interaction update passed on all four locale routes at 320–1920px widths and landscape. Checks covered exact biography/highlight content, section-aware navigation, reading progress, mobile FAQ navigation, keyboard accordion use, reduced motion at load and on live preference changes, content visibility without JavaScript and no browser exceptions.

## Deploy to Vercel

1. Push this folder's contents to a GitHub repository, including `public/` media and `package-lock.json`.
2. Import the repository in Vercel under Add New → Project.
3. Choose the Next.js preset. If using a parent repository, set Root Directory to `samruddhi-jeevan`.
4. Keep the default build command (`npm run build`). No environment variables are needed.
5. Deploy and review all four locale routes on the preview URL.
6. Add your custom domain later in Project Settings → Domains, following the displayed DNS instructions.

Use a Vercel plan appropriate for the society's organisational/commercial use and check current terms. Official documentation: https://vercel.com/docs/frameworks/full-stack/nextjs

This local project has not been published to Vercel.
