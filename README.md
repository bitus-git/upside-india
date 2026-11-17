# Upside India: website draft

Draft website for Upside India, an independent consumer organisation working on growth, a lower cost of living and more freedom for consumers in India. This version is for partner review, not launch.

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The homepage: one self-contained page with its own styles and animation script |
| `about/index.html` | About us: mission, what we do, the five rules we follow, and FAQ (who funds us is the last question) |
| `contact/index.html` | Contact: one form, with a dropdown for the reason (general question, press and media, and so on) |
| `assets/css/pages.css`, `assets/js/pages.js` | Shared styles and script for the About and Contact pages (no libraries) |
| `assets/css/` | Brand tokens (`tokens.css`) and components (`components.css`) from the Upside India brand kit |
| `assets/fonts/` | Mukta Light, Regular, SemiBold and ExtraBold (Latin, WOFF2), with the SIL Open Font License |
| `assets/logos/` | Logo files from the brand kit (SVG) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

The page loads two animation libraries from the cdnjs and jsDelivr CDNs: GSAP 3.12.5 (with ScrollTrigger) and Lenis 1.1.13. Everything else is in this folder. There is no build step.

## Page structure

1. **Opening:** "Look on the upside". The logo builds itself, then the sun rises and grows to fill the screen.
2. **Reporting the good news. Arguing for the upside.** The mission statement, lit word by word as you scroll.
3. **What we do:** three pillars (good news, smarter rules, your voice).
4. **Some of India's upside:** a sideways scroll from 6:00 to 21:00 while the sun crosses the sky. Six sourced wins: UPI, metro and ride apps, mobile data, GST, Karnataka excise, rooftop solar.
5. **The upside so far:** a carousel of four rule changes (income tax, insurance, medicines, Karnataka excise), each linking to Instagram.
6. **Scrolling band** of everyday costs.
7. **Upside India Poll:** a carousel of three questions (cost of living, excise tax, bike taxis). Answering moves to the next question. Front end only for now.
8. **On Instagram:** a grid of the latest six posts, since Instagram is the campaign's blog. Shows example posts until a feed is connected (see below).
9. **Follow the upside:** channels, then the logo sign-off and the footer.

Instagram is the blog. Story links point to Instagram posts, not to pages on this site.

## Connect the Instagram feed

A static site can't call Instagram directly without exposing an access token, so the page reads a JSON feed from a feed service instead. [Behold](https://behold.so) works well and has a free plan.

1. Connect the Upside India Instagram account to Behold (it needs to be a Business or Creator account) and create a JSON feed.
2. In `index.html`, find `<section class="insta" id="insta"` and fill in two attributes:
   - `data-feed-url="https://feeds.behold.so/<your-feed-id>"`
   - `data-profile-url="https://www.instagram.com/<handle>/"`
3. Publish. The six newest posts replace the example tiles, each linking to its post on Instagram. If the feed ever fails to load, the example tiles stay.

## Connect the contact form

The form checks its fields in the browser, but it needs a form service to deliver messages. [Formspree](https://formspree.io) has a free plan.

1. Create a form in Formspree and copy its endpoint, for example `https://formspree.io/f/abcdwxyz`.
2. In `contact/index.html`, set it on the form: `<form class="form reveal" id="contactForm" data-endpoint="https://formspree.io/f/abcdwxyz" novalidate>`.
3. Until it is set, the form says the message was not sent and asks people to email instead.

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `upside-india-site`. Make it private if you only want the partner to see the code. On a free plan, GitHub Pages needs a public repository, so use a paid plan or another host to keep the site private.
2. Upload the contents of this folder (not the folder itself) to the repository root, including the hidden `.nojekyll` file. With the GitHub web uploader, drag in `index.html`, `README.md` and the `assets` folder, then add an empty file named `.nojekyll`.
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute or two, the site is live at `https://<your-account>.github.io/upside-india-site/`. Share that link with the partner.

Or, from a terminal inside this folder:

```bash
git init -b main
git add .
git commit -m "Upside India homepage draft"
gh repo create upside-india-site --public --source=. --push
```

Then turn on Pages as in step 3.

To preview locally first, run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Draft status

This page carries `<meta name="robots" content="noindex, nofollow">`, so search engines won't list the draft. Remove that line from `index.html` at launch.

**Placeholders to fill before launch**

- [ ] Links for Instagram, YouTube, Facebook, X and LinkedIn (all `href="#"` for now), plus the "About us", "How we work", "Contact" and "Privacy" pages
- [ ] Instagram post links for each "Read on Instagram" card and the "More on Instagram" button
- [ ] A form service for the three poll questions, with a privacy notice. Today the answer buttons only show a thank-you message and nothing is saved.
- [ ] The Instagram feed URL and profile link (see "Connect the Instagram feed")
- [ ] The contact form endpoint (see "Connect the contact form")
- [ ] About page: the "We speak your language" promise (Hindi, Kannada, Marathi) marked "to confirm", and the privacy notice link in the FAQ
- [ ] Contact page: the privacy notice link under the form
- [ ] Remove the `noindex` line from all three pages at launch
- [ ] "See our first issue" points to the stories section until the tax-by-strength explainer exists (planned for 14 December)
- [ ] Live source links next to each figure
- [ ] Real, licensed photography or final illustrations in place of the placeholder drawings
- [ ] Domain (upsideindia.com, with upsideindia.in redirecting)

**Facts to re-check before launch**

| Figure | Source used | Note |
| --- | --- | --- |
| 25.47 billion UPI payments in a month (Oct 2026) | NPCI data, via Entrepreneur India | Confirm on NPCI's statistics page |
| 3rd-largest metro network; about 1,100 km across 26 cities | PIB, March 2026 | Reported totals vary by source and date |
| $0.16 per GB in India vs $6.00 in the US | Cable.co.uk worldwide data pricing | 2023 data; Indian prices rose in 2024. Refresh if newer data exists. |
| GST at 5% and 18% for most goods; staples exempt (from 22 Sep 2025) | WION; Business Standard | |
| Karnataka excise slabs 16 → 8, tax by strength (from 11 May 2026) | Dynamite News, 9 Oct 2026 | Never show drinks; never call any drink healthy |
| 50 lakh+ homes on rooftop solar; bills cut 71% on average | pv magazine, Aug 2026; CEEW survey | Survey average, not a guarantee |
| No income tax up to ₹12 lakh (new regime, from April 2025); ₹80,000 saved at ₹12 lakh | Union Budget 2025-26, via Scroll | Keep the wording about the rule, not about a party |
| GST on individual health and life insurance 18% → 0% (from 22 Sep 2025) | Ministry of Finance, Department of Financial Services | |
| 33 lifesaving medicines 12% GST → 0% (from 22 Sep 2025) | GST Council, via The News Minute | |

## Brand

Colours, type (Mukta), logo rules and voice come from the Upside India brand kit and design system. The logo is never recoloured. On marigold, the header switches to the mono-ink logo.
