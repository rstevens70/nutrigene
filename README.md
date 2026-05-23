# NutriGene

**A privacy-first, in-browser nutrigenomic analyzer powered by peer-reviewed research.**

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)
![100% client-side](https://img.shields.io/badge/client--side-100%25-blue.svg)

---

## Overview

NutriGene analyses your raw DNA file entirely within your browser, cross-referencing your genetic variants against a curated, peer-reviewed SNP database to produce a personalized supplement protocol and dietary roadmap. Because every computation happens locally on your device, your genome data never touches a server, a database, or a third-party service. NutriGene is designed for health-conscious individuals, biohackers, and practitioners who want actionable nutrigenomic insights without surrendering sensitive genetic data to the cloud.

---

## Features

- Supports **23andMe** (v3/v4/v5), **AncestryDNA**, **MyHeritage**, and generic SNP formats
- Analyses **11 genetic targets** across **10 genes + compound APOE** (MTHFR C677T, MTHFR A1298C, FUT2, VDR, BCMO1, MCM6, CYP1A2, FADS1, NBPF3, COMT, APOE)
- **Pathway scoring** across 5 biological systems: Methylation, Bone Health, Cardiovascular, Dietary Tolerances, and Digestion
- **Carrier status detection** for heterozygous risk variants
- **Personalized supplement protocol** with gene-specific reasoning for each recommendation
- **Personalized food recommendations and foods-to-avoid** with full genetic justification
- **Export results** as CSV or a formatted text report
- **Zero server communication** — 100% in-memory; all data is cleared on page close
- No accounts, no tracking, no cookies

---

## Screenshots

> Screenshots coming soon.

---

## Getting Started

### Prerequisites

- A modern browser: **Chrome 90+**, **Firefox 88+**, **Edge 90+**, or **Safari 14+**
- **Python 3** for the local development server — pre-installed on macOS and Linux; Windows users can use the `npx` alternative shown below

### Running locally

ES6 module imports require files to be served over HTTP. You cannot open `index.html` directly from the filesystem (`file://`).

```bash
# Clone the repository
git clone https://github.com/rstevens70/nutrigene.git
cd nutrigene

# Start the local server
npm start
# or, if you don't have Python 3:
npm run start:npx

# Open in your browser
open http://localhost:8080
```

> **Note:** The `file://` protocol will not work — ES module imports require an HTTP server. Use one of the `npm` commands above.

### Getting your raw DNA file

See **[docs/getting-started.md](docs/getting-started.md)** for complete, provider-specific instructions.

**Quick reference:**

| Provider | Steps |
|----------|-------|
| 23andMe | Account → Settings → 23andMe Data → Download |
| AncestryDNA | DNA tab → Settings → Download Raw DNA Data |
| MyHeritage | DNA tab → Manage DNA kits → Download |

---

## Project Structure

```
nutrigene/
├── index.html          # App shell & markup
├── app.js              # Main application logic & UI rendering
├── parser.js           # File parsing & security validation
├── dictionary.js       # Curated SNP knowledge base (peer-reviewed)
├── styles.css          # Styling
├── favicon.ico         # Site icon
├── docs/               # User documentation
│   ├── getting-started.md
│   ├── understanding-your-results.md
│   ├── genetic-markers-reference.md
│   ├── export-and-data.md
│   └── faq.md
└── package.json
```

> **Important:** The `rawdata/` directory is excluded from version control via `.gitignore`. Never commit personal genome files to a repository.

---

## Documentation

| File | Description |
|------|-------------|
| [docs/getting-started.md](docs/getting-started.md) | How to download your raw DNA file from each supported provider and run your first analysis |
| [docs/understanding-your-results.md](docs/understanding-your-results.md) | How to interpret pathway scores, variant calls, carrier status, and supplement recommendations |
| [docs/genetic-markers-reference.md](docs/genetic-markers-reference.md) | Deep-dive into each analysed SNP, including effect sizes, allele frequencies, and source citations |
| [docs/export-and-data.md](docs/export-and-data.md) | Details on the CSV and text export formats and what each field contains |
| [docs/faq.md](docs/faq.md) | Frequently asked questions about accuracy, supported file formats, and privacy |

---

## Privacy & Security

NutriGene is designed from the ground up to handle sensitive genetic data responsibly.

- **No data transmission** — all analysis runs entirely in the browser; no data leaves your device
- **No backend** — there is no server, no database, no analytics pipeline, and no third-party tracking
- **In-memory only** — your raw DNA file is read into memory solely for the duration of the analysis session
- **Automatic data clearance** — all data is cleared when the tab is closed or when you click "Clear Data"
- **Input validation** — the file parser enforces a 50 MB size limit, `.txt`/`.csv` extension checks, binary data detection, and XSS prevention on all parsed fields
- **Version control hygiene** — `rawdata/` is listed in `.gitignore`; never commit genome files to any repository

---

## Supported Genetic Markers

| Gene | rsID | Pathway | What it covers |
|------|------|---------|----------------|
| MTHFR C677T | rs1801133 | Methylation | Folate conversion & homocysteine metabolism |
| MTHFR A1298C | rs1801113 | Methylation | Neurotransmitter synthesis |
| FUT2 | rs601338 | Digestion | B12 absorption & gut microbiome diversity |
| VDR | rs1544410 | Bone Health | Vitamin D receptor efficiency |
| BCMO1 | rs6564851 | Digestion | Beta-carotene → Vitamin A conversion |
| MCM6 | rs4988235 | Dietary Tolerances | Lactase persistence / lactose tolerance |
| CYP1A2 | rs762551 | Dietary Tolerances | Caffeine metabolism speed |
| FADS1 | rs174537 | Omega-3 | ALA → EPA/DHA conversion efficiency |
| NBPF3 | rs4654748 | Methylation | Vitamin B6 clearance rate |
| COMT | rs4680 | Methylation | Dopamine & stress neurotransmitter clearance |
| APOE | rs429358 + rs7412 | Cardiovascular | Lipid metabolism & cardiovascular risk |

---

## Contributing

Contributions are welcome. To keep the process smooth:

1. **Open an issue first** for any significant change so the approach can be discussed before work begins.
2. **Fork the repository**, make your changes on a feature branch, and submit a pull request with a clear description.
3. **Adding new SNP entries** to `dictionary.js` must include PubMed citations for all effect claims. Unsourced entries will not be merged.
4. **Security fixes** — please disclose privately via the repository's security advisory feature before opening a public issue.

---

## Disclaimer

> NutriGene is for educational and informational purposes only. It is not a medical diagnostic tool and does not provide medical advice. Always consult a qualified physician or registered dietitian before making changes to your diet or supplement regimen based on genetic data.

---

## License

This project is licensed under the [MIT License](LICENSE).
