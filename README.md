# ✈️ Cargo Transport Tools

A collection of offline browser-based tools for air cargo and road transport professionals.
Built by a Handling Agent with daily hands-on experience in dangerous goods acceptance,
ADR transport and CMR documentation — assisted by AI.

> **All tools run 100% offline.** Open the HTML file in any modern browser.
> No installation, no account, no internet connection required.

---

## ⚠️ DISCLAIMER — Please read before use

**This software is provided for informational and productivity purposes only.**

- These tools were **built with AI assistance** and are **not official regulatory software**.
- They are **not certified** by any authority (IATA, ADR/ECE, IRU or any government body).
- The ADR point calculations, UN substance data and checklist questions are based on publicly available regulations, but **may contain errors or be outdated**.
- **Always verify** all data — especially UN numbers, transport categories and ADR point calculations — against the **current official edition** of the relevant regulation before use.
- The author accepts **no liability** for any errors, omissions or consequences arising from the use of these tools in real transport operations.
- These tools **do not replace** official training, certified software or professional advice.
- Use at your own risk.

---

## 🛠️ Tools

### 📋 ADR Transport Tool
Calculates ADR exemption points (regulation 1.1.3.6) and generates two PDF documents:
the ADR Dangerous Goods Transport Document and the ADR Preparation Checklist for drivers.

**Required templates:** `template_adr_form.pdf` · `template_adr_checklist.pdf`

---

### 🚛 CMR Smart Issuer
Fills and generates CMR International Consignment Notes (road waybills) with
a digital signature and exports 4 official copies as a single PDF.

**Required template:** `template_cmr.pdf`

---

### ✈️ DGR Acceptance Tool
Fills IATA DGR acceptance PDF checklists with shipment data and generates
a rejection notice when a shipment does not meet requirements.

**Required templates:**
- IATA checklist PDF from your airline or employer *(not included — subject to airline copyright)*
- `template_rejection_document.pdf` — included ✅

---

## 📂 Repository structure

```
cargo-transport-tools/
│
├── ADR_Generator_v4.html
├── CMR_Generator_v3.html
├── DGR_Checksheet_Generator_v4.html
├── index.html
│
├── templates/
│   ├── template_adr_form.pdf
│   ├── template_adr_checklist.pdf
│   ├── template_cmr.pdf
│   ├── template_rejection_document.pdf
│   ├── template_check_NEUTRAL_with_DGD.pdf
│   └── template_check_NEUTRAL_without_DGD.pdf
│
├── pdf-lib.min.js           ← download once with get_pdf_lib.sh
├── manifest_adr.json
├── manifest_cmr.json
├── manifest_dgr.json
├── sw_adr.js
├── sw_cmr.js
├── sw_dgr.js
├── get_pdf_lib.sh
├── CHANGELOG.md
└── README.md
```

---

## ⚙️ How to use

### Option A — Quick start (online fallback)
1. Download or clone this repository
2. Open any `.html` file directly in your browser
3. Upload the required PDF template when prompted
4. Fill in the shipment details and generate your PDF

### Option B — Full offline setup (recommended)
1. Download or clone this repository
2. Run `bash get_pdf_lib.sh` once to download pdf-lib locally
3. Open any `.html` file in your browser
4. The tool will now work with zero internet dependency

---

## 🧰 Technology

| Technology | Purpose |
|------------|---------|
| HTML + CSS + JavaScript | Interface and logic |
| pdf-lib.js | PDF field injection and generation |
| LocalStorage | Persistent address books and preferences |
| Service Worker | Offline caching (PWA) |

---

## 📋 Regulations referenced

- **ADR 2025** — European Agreement on the International Carriage of Dangerous Goods by Road
- **CMR Convention** — Convention on the Contract for the International Carriage of Goods by Road (Geneva, 1956)
- **IATA DGR** — IATA Dangerous Goods Regulations (current edition)

> ⚠️ Always use the current official edition of each regulation.
> Regulations are updated periodically. This tool may not reflect the latest amendments.

---

## 👤 About

Built by a Handling Agent based in Germany, out of a real need:
speeding up repetitive but high-responsibility tasks in air cargo operations
without relying on expensive software or internet connectivity.

Developed with AI assistance (Claude by Anthropic).

---

## 📄 License

MIT License — free to use, modify and share. See `LICENSE` for details.

**Important:** The MIT license covers the code only, not the regulatory content.
Always verify regulatory data against official sources.
