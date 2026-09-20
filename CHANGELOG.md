# Changelog

All notable changes to this project will be documented in this file.

---

## [1.0.0] — 2026-09-17 — Initial public release

### ADR Transport Tool — v1.0
- UN substance database (155 entries) with ADR point calculation (1.1.3.6)
- PDF generation: ADR Transport Document + Driver Preparation Checklist
- Address book for senders, consignees and carriers (LocalStorage)
- Custom UN database with add / edit / delete
- Default unit per UN substance (L / kg / -) set when saving
- Packaging autocomplete with prefix-matching (position: fixed, no clipping)
- Reference / AWB field — free text, no auto-formatting
- ⚡ Quick Check panel — fast ADR point calculation without filling full document
  - Real-time points per row, total counter, EXEMPT / FULL ADR status
  - "Transfer to main form" copies Quick Check values to the cargo table
- Search UN by number OR by name (e.g. type "petrol" to find UN1203)
- Bilingual interface: English / German
- Dark / Light mode with localStorage persistence
- Export and import all data as JSON backup
- Responsive design (mobile + desktop), touch-friendly
- PWA: installable as app, works 100% offline after first load
- Favicon: 📋

### CMR Smart Issuer — v1.0
- CMR International Consignment Note generator
- 7-row cargo table (Marks & Nos, Packages, Packing, Nature, Weight)
- Address book for senders, consignees, carriers and references
- Digital signature pad with touch support
- PDF export — 4 official copies (sender, consignee, carrier, driver)
- 📋 "New from Last" button — loads previous CMR, clears cargo, updates date
- Standard packing types (18 options) and nature of goods suggestions (15 options)
- Address Book & References panel starts minimised by default
- English only interface (no language toggle)
- Dark / Light mode
- Export and import data as JSON backup
- Responsive design (mobile + desktop)
- PWA: installable as app, works 100% offline
- Favicon: 🚛

### DGR Acceptance Tool — v1.0
- IATA DGR acceptance checklist filler (With DGD / Without DGD)
- Rejection notice generator with photo evidence (up to 2 per page)
- Shipper database with quick-select and save button
- Rejection section fully translated (EN/DE) — checkboxes no longer show German in EN mode
- Bilingual interface: English / German
- Dark / Light mode with localStorage persistence
- Export and import data as JSON backup
- Responsive design (mobile + desktop), touch-friendly canvas
- PWA: installable as app, works 100% offline
- Favicon: ✈️

### Repository
- index.html portal with tool cards and prominent disclaimer
- README.md with disclaimer, instructions and file structure
- get_pdf_lib.sh — one-time script to download pdf-lib for full offline use
- Service workers (sw_adr.js, sw_cmr.js, sw_dgr.js) for offline caching
- PWA manifests (manifest_adr.json, manifest_cmr.json, manifest_dgr.json)

---

## How to update version numbers when releasing a new version

1. Update the version in the HTML footer of each tool
2. Update `CACHE_NAME` in the relevant `sw_*.js` service worker
3. Add an entry to this CHANGELOG
