# Frequently Asked Questions

---

## File Upload and Format Issues

### What file formats does NutriGene accept?

The app accepts `.txt` and `.csv` files. It supports raw data exports from:
- **23andMe** (v3, v4, and v5 chip formats)
- **AncestryDNA**
- **MyHeritage**
- **Generic** tab-separated or comma-separated SNP files with rsID, chromosome, position, and genotype columns

If your file came from a different service but follows a standard SNP format, it will likely work. If you receive an error, see the troubleshooting questions below.

---

### My file upload failed. What could be wrong?

There are several reasons a file might be rejected:

**File type is not supported**
Only `.txt` and `.csv` files are accepted. If your testing provider gave you a `.zip` archive, unzip it first and upload the extracted file inside.

**File is too large**
The maximum file size is 50 MB. Raw genome files are typically well under this limit (most are 10–30 MB), but if your file exceeds 50 MB, you may need to check that you downloaded the correct file and not a full genome sequencing output.

**File appears to be binary**
NutriGene detects binary files and rejects them for safety. If you downloaded a `.zip` and the extraction produced a non-text file, try the download again. Raw DNA data from consumer testing providers is always plain text.

**File does not contain recognizable SNP data**
If the file does not contain the expected pattern of rsIDs and genotypes, the parser will reject it. Make sure you downloaded the "raw data" or "DNA data" export — not a health report PDF or account export.

---

### My file from 23andMe / AncestryDNA is a .zip — what do I do?

Consumer DNA providers deliver your raw data as a compressed archive. You need to extract it first:
- On **Windows**: Right-click the `.zip` file and choose "Extract All"
- On **Mac**: Double-click the `.zip` file
- On **Linux**: Run `unzip filename.zip` in a terminal

Inside the archive you will find one or more `.txt` or `.csv` files. Upload the raw data file (it will have a name like `genome_FirstName_LastName_v5_Full_...txt`).

---

### Can I use a file from a whole-genome sequencing (WGS) service like Nebula Genomics?

Possibly, but with limitations. Whole-genome sequencing files (especially VCF format) are not the same as the array-based raw data files from consumer SNP testing. If your WGS provider can export a tab-separated or comma-separated SNP file in the standard format (rsID, chromosome, position, genotype columns), that will work. VCF files and FASTQ/BAM files are not currently supported.

---

### The app says my file has an unrecognized format even though it's from 23andMe. Why?

23andMe has released several chip versions over the years (v3, v4, v5). All are supported. However, there are a few things to check:

1. Make sure the file is fully downloaded — a partial download produces a corrupt file
2. Make sure you extracted the `.txt` file from inside the `.zip` archive, and are not uploading the `.zip` itself
3. Make sure you are uploading the raw DNA data file and not a 23andMe health report export (which is a PDF)

If the issue persists, try re-requesting a fresh download from your 23andMe account.

---

## Missing or Unexpected Results

### Why were only some of my markers found? I expected more results.

NutriGene looks for 11 specific SNP positions (rsIDs). Whether these positions appear in your file depends on your testing provider and the chip version they used.

Different chip versions cover different sets of SNP positions. If a marker's rsID is not present in your file, the app simply has no data on that position — it cannot report a result that was never measured. This is normal and expected. You may see results for 6 of the 11 markers, or all 11, depending on your file.

To maximize coverage, 23andMe v5 and AncestryDNA typically have the broadest SNP panels among consumer providers.

---

### A variant I know I have from a previous report isn't showing up. Why?

There are two common explanations:

1. **The rsID is not in your file.** Your DNA testing provider did not include that position on their chip. Different providers cover different sets of SNPs.
2. **The variant is not in the NutriGene database.** NutriGene covers 11 specific targets. It does not analyze all SNPs in your genome. If the variant you are looking for is not one of those 11, it will not appear in your results.

---

### I have no "Actionable Alerts" and a 100% Optimization Index. Is that good?

Yes, it is good news. It means that for the 11 genetic targets NutriGene tested, your variants all came back at the typical ("low impact") level. Your pathways are functioning well based on available data.

However, keep in mind:
- This does not mean your entire genome has no variants of interest — only the 11 targets covered by this app were checked
- Low-impact results for these markers is still useful information (you know you do not carry, for example, APOE4 or the homozygous MTHFR TT genotype)
- Lifestyle, diet, and environment still matter regardless of genetic results

---

## Understanding Carrier Status

### What does the "Carrier" badge mean?

The amber "Carrier" badge appears when you are **heterozygous** for a risk allele — meaning you have one copy of the variant allele and one typical allele.

Being a carrier means:
- **You may not fully express the trait** associated with that variant. Many genetic effects are dose-dependent: two copies (homozygous) typically produce a stronger effect than one copy (heterozygous).
- **You could pass the allele to your children.** Each child has a 50% chance of inheriting your copy of that allele.
- **You may have mild sub-clinical effects** that are worth monitoring, even if the full trait is not expressed.
- **It is relevant for family planning.** If both parents carry the same recessive risk allele, their children have a 25% chance of being homozygous for it.

---

### I have the Carrier badge on a High-impact card. Does that mean I have the high-impact trait?

Not necessarily — the "High" impact label on a card reflects the potential severity of the variant if fully expressed. If you are a carrier (heterozygous), you carry one copy of that high-impact allele, but your second allele is typical. The effect is usually partial rather than full.

For example: If the fully expressed (homozygous) variant causes 70% reduction in enzyme activity, the carrier (heterozygous) state might cause 35% reduction. Both are worth knowing about, but they call for different levels of intervention. Read the nutritional guidance on the specific card for carrier-specific recommendations.

---

### Should I tell my family members about my carrier status?

That is a personal decision. In general, carrier status information is most relevant for family planning — particularly if you and a partner are planning to have children and one or both of you carry recessive risk alleles. A genetic counselor can help you understand the inheritance implications and decide how to communicate this information to family members.

---

## Optimization Index vs. Primary Assessment

### What is the difference between the Optimization Index and the Primary Assessment?

These two metrics measure similar things but in different ways:

**Optimization Index** is a **numerical score** (a percentage) that reflects the cumulative impact of all variants found:
- Starts at 100%
- Deducted 8% for each moderate-impact variant
- Deducted 18% for each high-impact variant
- Gives you a sense of scale — someone with five moderate variants and one high variant has a lower score than someone with one moderate variant

**Primary Assessment** is a **categorical label** that reflects the highest level of concern found:
- "Fully Optimal" — no moderate or high-impact variants
- "Moderate Support" — at least one moderate-impact variant found
- "High Priority" — at least one high-impact variant found

In short: the Optimization Index tells you **how much** intervention may be beneficial; the Primary Assessment tells you **how urgently** to pay attention.

**Example:** Two people could both have a Primary Assessment of "Moderate Support," but one has an Optimization Index of 84% (one moderate variant) and another has 60% (five moderate variants). The category is the same; the scale is different.

---

## Medical Advice and Disclaimers

### Is NutriGene a medical diagnostic tool?

No. NutriGene is a **nutritional information tool**, not a medical diagnostic or clinical instrument. It provides guidance about nutrient needs and dietary patterns based on published nutrigenomic research.

The app does not:
- Diagnose diseases or medical conditions
- Prescribe medications
- Replace genetic counseling
- Constitute a clinical laboratory test

The results are educational and should be used as a starting point for conversations with qualified healthcare providers — not as the basis for self-diagnosis or treatment.

---

### Should I change my supplements or diet based on these results alone?

Use the results as a guide, not a prescription. Here is a reasonable approach:

1. **Review the findings** to understand which pathways may benefit from nutritional support
2. **Discuss significant findings** (especially High-impact variants or APOE4 status) with your doctor, dietitian, or a registered nutritional therapist
3. **Consider basic dietary changes** listed in the Nutritional Roadmap — most food-based recommendations are safe for general populations
4. **Be cautious with supplements** — some (like high-dose vitamin A as retinol, or methylfolate) can interact with medications or have upper intake limits. Confirm with a healthcare provider before starting a new supplement protocol

---

### The results say I have an APOE4 allele. Should I be worried?

Having one or two copies of the APOE4 allele is associated with elevated (not certain) risk for certain cardiovascular and cognitive outcomes. It is not a diagnosis of anything. Many APOE4 carriers live long, healthy lives, especially when they adopt lifestyle and dietary patterns that mitigate the associated risks.

If your results show APOE4, the most important steps are:
1. Discuss it with your doctor, especially regarding cardiovascular monitoring
2. Consider a Mediterranean-style diet (the best-studied dietary pattern for APOE4 carriers)
3. Prioritize omega-3 DHA intake, sleep, exercise, and stress management
4. Do not panic — this is information, not a verdict

---

## Privacy and Browser

### Does NutriGene upload my DNA to a server?

No. The app is entirely client-side. Your genome file is read directly into your browser's memory and never leaves your device. There are no network requests during analysis. See [Export and Data Handling](export-and-data.md) for a full breakdown.

---

### What browsers are supported?

NutriGene works in any modern browser that supports HTML5 File API and ES6 JavaScript:

| Browser | Minimum version |
|---|---|
| Google Chrome | 80 or later |
| Mozilla Firefox | 75 or later |
| Microsoft Edge | 80 or later |
| Apple Safari | 13.1 or later |

Internet Explorer is not supported. If you are using an outdated browser, update it before using the app.

---

### Can I use NutriGene on a mobile phone or tablet?

The app will load on modern mobile browsers (Chrome for Android, Safari for iOS), but the upload workflow depends on whether your mobile browser supports file access. The dashboard is designed for desktop-sized screens; on smaller screens, some layout adjustments may occur.

For the best experience, use a desktop or laptop computer with an up-to-date browser.

---

### What happens to my results if I close the browser tab?

Your results are held only in browser memory and are cleared automatically when the tab is closed. There is no account, no database, and no persistent storage. If you want to keep your results, export them before closing. See [Export and Data Handling](export-and-data.md).

---

### Can I run NutriGene offline?

Once the page has loaded in your browser, analysis runs entirely offline. No internet connection is needed for the upload, analysis, or export steps. An internet connection is only required to initially load the application.

---

*See also: [Getting Started](getting-started.md) | [Understanding Your Results](understanding-your-results.md) | [Genetic Markers Reference](genetic-markers-reference.md) | [Export and Data Handling](export-and-data.md)*
