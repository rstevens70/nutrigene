# Export and Data Handling

This page explains how to save your analysis results, what is included in each export format, and how NutriGene handles your genetic data.

---

## Exporting Your Results

After your analysis is complete, two export options are available in the action bar at the bottom of the dashboard.

---

### Export CSV

Clicking **Export CSV** downloads a spreadsheet-compatible file (`.csv`) containing every genetic variant that was matched in your genome.

**What is included in the CSV:**

| Column | Description |
|---|---|
| Gene | The gene name (e.g., MTHFR, APOE, VDR) |
| rsID | The SNP identifier (e.g., rs1801133) |
| Genotype | Your specific allele combination (e.g., CT, GG) |
| Impact | The impact level: low, moderate, or high |
| Pathway | The biological pathway this variant belongs to |
| Description | Scientific explanation of what this variant does |
| Recommendations | Nutritional guidance specific to your genotype |

**How to use the CSV:**
- Open it in Microsoft Excel, Google Sheets, Apple Numbers, or any spreadsheet app
- Share it with a healthcare provider, dietitian, or genetic counselor who wants the raw findings
- Use it for personal record-keeping
- Sort or filter by impact level to prioritize your most actionable findings

**File name format:** The file is named with the current date for easy reference (e.g., `nutrigene-results-2026-05-23.csv`).

---

### Export Report

Clicking **Export Report** downloads a formatted plain-text file (`.txt`) that reads like a complete written report rather than raw data.

**What is included in the report:**

1. **Analysis Summary** — Your four metric card values: markers analyzed, actionable alerts, optimization index, and primary assessment
2. **Pathway Scores** — The score and status for each of the five biological pathways
3. **All Variant Details** — For each matched SNP: gene, rsID, genotype, impact level, carrier status (if applicable), full scientific description, and nutritional guidance
4. **Complete Nutritional Roadmap** — All three roadmap sections in full:
   - Targeted Supplement Protocol (with reasoning tied to your genotype)
   - Recommended Foods
   - Foods and Ingredients to Avoid

**How to use the report:**
- Print it or save it as a PDF for your personal health records
- Share it with a doctor or nutritionist as a starting point for a conversation
- Keep it for reference while shopping for supplements or planning meals
- Unlike the CSV, the report is designed to be read as a document, not imported into software

**File name format:** Named similarly to the CSV with the current date (e.g., `nutrigene-report-2026-05-23.txt`).

---

## What Happens to Your Data

Understanding how NutriGene treats your genetic data is important. Your genome is among the most personal data that exists about you. Here is an honest, plain-language explanation of what happens at every stage.

### While You Upload

Your file is selected from your local device. It is read directly into your browser's memory using the standard browser File API. **It is not uploaded to any server.** There is no network request during this step. The file travels from your hard drive to your browser's working memory — and nowhere else.

### During Analysis

The app parses your file line by line in memory, looking for the 11 target rsIDs. When a match is found, the genotype is noted. When the scan is complete, the raw file data is no longer needed and the browser can garbage-collect it. Only the matched variant results are retained in memory to display the dashboard.

### While You View Results

Your results exist only in your browser's active memory (JavaScript variables). They are not written to:
- `localStorage` or `sessionStorage` (browser storage that persists)
- Cookies
- IndexedDB
- Any cache

If you close the tab or navigate away, the data is gone. If you want to keep your results, export them before closing.

### When You Export

When you click Export CSV or Export Report, your browser generates the file entirely in memory using a Blob URL, then triggers a download to your local device. The file goes from browser memory to your hard drive — no server is involved.

### When You Reset

Clicking **"Clear Data & Analyze Another File"** explicitly wipes all result data from JavaScript memory and returns you to the upload screen. After this action, the results cannot be recovered unless you re-upload your genome file and run the analysis again.

### Privacy Summary

| Data handling question | Answer |
|---|---|
| Is my genome file uploaded to a server? | No — never |
| Does NutriGene store my results? | No — results exist only in browser memory |
| Are cookies or tracking technologies used? | No |
| Is my data shared with third parties? | No — zero network communication |
| What happens when I close the browser tab? | All data is cleared automatically |
| Can NutriGene access my results later? | No — there is no database or account system |
| Is an internet connection required? | Only to initially load the page; analysis works offline |

---

## Recommendations for Safe Handling of Your Export Files

Because your exported files will contain genetic information, treat them as you would any sensitive personal health data:

- **Store exports in a secure location** — consider an encrypted folder or drive
- **Use a strong password** if you store exports in a cloud service (Google Drive, Dropbox, etc.)
- **Be thoughtful about sharing** — only share your results with healthcare providers you trust
- **Delete exports you no longer need** — there is no reason to keep multiple copies
- **Be cautious with email** — plain email is not encrypted; if you share your report with a provider, consider secure messaging or an encrypted file

---

## A Note on the Exported Data and Medical Use

NutriGene export files are designed for personal reference and to facilitate conversations with healthcare providers. They are not:
- Clinical diagnostic reports
- Medical records in the formal sense
- A substitute for genetic counseling

If a healthcare provider wants to act on genetic information for medical decision-making, they should order clinical-grade genetic tests through accredited laboratories, which include quality controls, interpretation by certified genetic counselors, and formal report formats.

Your exported files are a useful starting point — not a clinical endpoint.

---

*See also: [Getting Started](getting-started.md) | [Understanding Your Results](understanding-your-results.md) | [FAQ](faq.md)*
