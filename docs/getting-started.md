# Getting Started with NutriGene

Welcome to NutriGene — a private, browser-based tool that analyzes your raw DNA data to generate personalized nutritional and supplement recommendations. Everything runs locally on your device. Your genetic data is never uploaded to any server.

This guide walks you through getting your raw genome file and running your first analysis.

---

## Before You Begin

You will need:

- A raw DNA data file from one of the supported testing services (see below)
- A modern web browser (Chrome, Firefox, Edge, or Safari — see [FAQ](faq.md) for version details)
- The file must be in `.txt` or `.csv` format and no larger than **50 MB**

NutriGene does **not** require an account, login, or internet connection once the page has loaded.

---

## Step 1: Download Your Raw DNA Data

NutriGene supports raw exports from four providers. Follow the instructions for the service you used.

### 23andMe

1. Sign in at [23andme.com](https://www.23andme.com)
2. Click your name in the top-right corner, then select **Settings**
3. Scroll to the **23andMe Data** section
4. Click **View** next to "Download Your Data"
5. Check the box for **All DNA Raw Data** and click **Request Download**
6. 23andMe will email you a link when the file is ready (usually within a few minutes)
7. Download and unzip the archive — your raw data file ends in `.txt`

NutriGene supports 23andMe **v3, v4, and v5** chip formats.

### AncestryDNA

1. Sign in at [ancestry.com](https://www.ancestry.com)
2. Go to **DNA** in the top navigation, then click **Your DNA Results Summary**
3. Click **Settings** (top-right of the DNA page)
4. Under **AncestryDNA Data**, click **Download Raw DNA Data**
5. Enter your password to confirm, then click **Download**
6. Unzip the downloaded file — your raw data file ends in `.txt`

### MyHeritage

1. Sign in at [myheritage.com](https://www.myheritage.com)
2. Click **DNA** in the top menu, then **Manage DNA Kits**
3. Click the three-dot menu next to your kit and select **Download DNA data**
4. Confirm via the email MyHeritage sends you
5. Download and unzip the archive — your raw data file ends in `.csv`

### Generic / Other Format

If your DNA data comes from another source or a third-party chip, NutriGene can read any **tab-separated or comma-separated** SNP file that includes rsID, chromosome, position, and genotype columns. No special header is required as long as the data is consistently formatted.

---

## Step 2: Upload Your File

1. Open NutriGene in your browser
2. On the upload screen, either:
   - **Drag and drop** your `.txt` or `.csv` file onto the upload area, or
   - **Click the upload area** to open a file picker and select your file
3. The app validates the file before processing:
   - File must be `.txt` or `.csv`
   - File must be 50 MB or smaller
   - File must contain readable text (binary files are rejected)
   - File is scanned to ensure it contains SNP data in a recognizable format

If your file fails validation, an error message will explain why. Common fixes are listed in the [FAQ](faq.md).

---

## Step 3: Wait for Analysis

Once your file is accepted, an animated loading screen appears while the app:

1. Parses every SNP entry in your file
2. Looks up each of the 11 target genetic markers in your data
3. Determines your genotype at each position
4. Calculates impact levels and pathway scores
5. Generates your personalized nutritional recommendations

This typically takes a few seconds, depending on your file size and device speed. Everything happens in your browser — nothing is sent anywhere.

---

## Step 4: Explore Your Dashboard

When analysis is complete, you are taken to your personal dashboard. It contains:

- **Four summary metric cards** across the top — a quick snapshot of your results
- **Five pathway cards** in a bento-grid layout — your results organized by biological system
- **Detailed SNP cards** — one card per matched genetic variant, with full scientific context
- **Nutritional Roadmap tab** — your personalized supplement and dietary recommendations
- **Export buttons** — save your results as a CSV spreadsheet or a formatted text report

For a full explanation of every section, see [Understanding Your Results](understanding-your-results.md).

---

## Privacy Reminder

Your genetic data is sensitive. Here is what NutriGene does — and does not do — with it:

| What happens | Details |
|---|---|
| File is read into memory | Only while the analysis runs |
| Data is analyzed locally | 100% in your browser, no server involved |
| Data is stored | It is NOT stored — no cookies, no localStorage |
| Data is shared | It is NOT shared — zero network requests |
| Data after closing | Cleared automatically when you close the tab or click "Clear Data" |

For complete privacy and export details, see [Export and Data Handling](export-and-data.md).

---

## What to Do After Your Analysis

- Read through your pathway scores to understand which biological systems may need support
- Review your SNP cards for specific variants — pay attention to **Moderate** and **High** impact findings
- Switch to the **Nutritional Roadmap** tab for concrete supplement and dietary recommendations
- Export your results if you want to save them or share them with a healthcare provider
- Remember: NutriGene provides nutritional guidance only — always consult a qualified clinician before making health decisions based on genetic data

---

*Next: [Understanding Your Results](understanding-your-results.md)*
