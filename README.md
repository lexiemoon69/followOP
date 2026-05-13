# FollowOp — Follow Up. On Point.

> CEO networking intelligence app. Because the room is everywhere.

**FollowOp** is a progressive web app (PWA) for networking professionals, event strategists, and CEO service providers. Capture contacts in real-time, manage clients/referrals, log events, and generate AI-powered reports — all from your phone.

Built by [Ashé & Ember Co.](https://asheco.now.site/ceo)

---

## Features

### Contact Management
- ⚡ **Quick Capture** — Name + phone/email in 10 seconds
- ⚡ **Hot Intro** — Full contact capture with AI business card scanning
- 📷 **Photo Upload** — Attach profile photos or business card images to contacts
- 🔗 **Social Links** — Add LinkedIn, Instagram, Twitter/X, and Facebook URLs to contacts
- 4 contact types: Hot Intro, Follow Up, Recommend, Intel
- Flag contacts for follow-up
- Save contacts to phone as vCard
- Edit and delete contacts with full detail management

### Clients/Referrals (Pro)
- Add and manage CEO service clients and referral partners
- 📝 **Edit & Delete** — Full CRUD operations on client/referral profiles
- 📷 **Photo Upload** — Attach photos to client/referral profiles
- 🔗 **Social Links** — LinkedIn, Instagram, Twitter/X, Facebook for quick access
- Service tiers: 30-Day Pilot, In The Room, Maximum Presence, Government
- Automatic color coding for visual client/referral identification
- Link contacts to clients/referrals for organized reporting

### Events
- Log events with venue, date, client/referral represented, and activity metrics
- 📅 **Calendar View** — Monthly grid showing all logged events with navigation
- 📝 **Edit & Delete** — Update or remove event logs directly from the Events tab
- Tag contacts to events for Special Event Reports
- ROI score calculated automatically
- Save Vibe The Room intelligence to events

### AI-Powered Intelligence
- 🔍 **Read The Room** — Culturally intelligent communication analysis
- 🌐 **Vibe The Room** — Room/crowd energy assessment from photos
- 🔬 **Research This Contact** — AI web research with cultural awareness
- Research directly from contact detail view with auto-loaded data
- 4 communication types: Results Driver, Relationship Builder, Detail Architect, Vision Seeker

### Reports (Pro)
- ⚡ **Special Event Report** — Immediate post-event report for clients
- 📋 **Weekly Report** — Weekly activity summary
- 📊 **Monthly Summary** — End-of-month comprehensive report
- 📄 **PDF Contact Brief** — One-pager export for VAs
- 📤 **Brief Export Options** — Download, copy, or email reports via Brief Export modal

### Data Management
- 📥 **Enhanced CSV Import** — BOM handling, line ending normalization, 20+ field mapping including social links
- 📤 **CSV Export** — Full contact data with social links and client/referral associations
- Data stored locally on device (localStorage)
- Automatic export reminders every 10 contacts
- Duplicate detection on import

### Settings & Customization
- Dark mode toggle
- Free / Standard / Pro tier management
- Stripe integration for upgrades
- Coupon code activation
- In-app help guide

---

## Tech Stack

- **Frontend**: Single-page HTML/CSS/JS (no framework)
- **AI**: Claude API via serverless functions
- **Hosting**: Vercel
- **Storage**: localStorage (client-side)
- **PWA**: Service worker + manifest for offline support

---

## File Structure

```
├── index.html            # Main app (single-page application)
├── guide.html            # Getting Started guide (loads guide-content.json)
├── guide-content.json    # Guide content data (JSON)
├── manifest.json         # PWA manifest
├── sw.js                 # Service worker (v1.3.0)
├── icon-192.png          # App icon 192x192
├── icon-512.png          # App icon 512x512
├── vercel.json           # Vercel deployment config
├── api/
│   └── claude.js         # Serverless AI endpoint
└── README.md             # This file
```

---

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` branch to deploy.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables

Set in Vercel dashboard:
- `ANTHROPIC_API_KEY` — Claude API key for AI features

---

## Version History

### v1.3 (May 2026)
- **Clients → Clients/Referrals** rebranding throughout entire app
- **Calendar view** for events — monthly grid with navigation
- **Photo upload** for contacts and clients/referrals
- **Social links** (LinkedIn, Instagram, Twitter/X, Facebook) on contacts and clients/referrals
- **Editable event logs** — edit and delete from Events tab
- **Editable clients/referrals** — edit and delete from Clients/Referrals tab
- **Enhanced CSV import** — BOM handling, 20+ field mapping, social links support
- **Brief export options** — download, copy, or email reports
- **Back buttons** on all modal dialogs
- **Research from contact detail** — auto-loads contact data into research

### v1.2
- Cultural intelligence for Read The Room and Research
- Vibe The Room — crowd/room energy assessment
- Research This Contact — AI web research
- Dark mode
- Business card scanning improvements

### v1.1
- Read The Room communication analysis
- Special Event Report
- Client management (Pro)
- PDF Contact Brief export

### v1.0
- Initial release
- Contact capture and management
- Event logging
- Weekly and Monthly reports

---

## Support

- Email: [lexie@asheemberco.com](mailto:lexie@asheemberco.com)
- Website: [asheco.now.site/ceo](https://asheco.now.site/ceo)
- App: [followop.app](https://followop.app)

---

© 2026 Ashé & Ember Co. All rights reserved.
