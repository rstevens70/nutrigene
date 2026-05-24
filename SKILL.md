---
name: nutrigene-analyzer
description: "Use when user provides raw DNA file (23andMe/Ancestry/etc) for exact local nutrigenomic analysis: parse, 11-SNP match, pathway scores, supplements/foods with citations (replicates NutriGene)."
version: 1.0.0
author: Hermes Agent (from NutriGene)
license: MIT
metadata:
  hermes:
    tags: [genomics, nutrigenomics, privacy, dna-analysis]
    related_skills: [hermes-agent-skill-authoring]
---

# NutriGene Analyzer

## Overview
Replicates the exact client-side analysis pipeline from the NutriGene codebase (README + codegraph-indexed app.js/parser.js/dictionary.js). Performs 100% local, in-memory analysis of raw DNA files for 11 genetic targets across 10 genes + APOE compound. Produces pathway scores (Methylation, Bone Health, Cardiovascular, Dietary Tolerances, Digestion), carrier status, personalized supplement protocol, food recommendations, and exports — never transmitting data.

## When to Use
- User uploads or points to a raw genome .txt/.csv file and requests nutrigenomic insights.
- Need to generate reports identical to the browser app (dashboard metrics, SNP cards, nutritional roadmap).
- Don't use for: medical diagnosis, non-supported formats, or when cloud services are acceptable.

## Prerequisites
- Raw DNA file from supported provider (<50MB, .txt or .csv).
- Access to the SNPDictionary (embed or load from original dictionary.js for exact match).

## Exact Analysis Workflow (replicates app.js + parser.js + dictionary.js)

1. **Validate & Detect (validateFileMetadata + detectFormatAndSanitize)**
   - Reject if >50MB, not .txt/.csv, contains <script>/binary zeros/HTML, <5 lines, or >40% malformed lines.
   - Detect format by header scan: 23andme (rsid\t...\tgenotype or "23andMe"), ancestry (allele1/allele2), myheritage (RESULT), else generic.
   - Throw precise error messages matching original.

2. **Parse (parseGenomicData)**
   - Skip # comments and header row.
   - For each format, split by \t or ,, extract rsid (lower) -> genotype (upper).
   - Ignore missing: --, 00, ?, - .
   - Return {snps: Map, count, format}. Reject if 0 valid SNPs.

3. **Match Variants (analyzeGenomeMatches + normalizeAndMatchGenotype)**
   - For each entry in SNPDictionary:
     - Lookup userGenotype = snpMap.get(rsid.toLowerCase())
     - Use multi-strand normalizer (handles CT/TC, GG, etc. order) to find matching key in dictEntry.genotypes.
     - Store matched: gene, variantName, pathway, title, rsid, userGenotype, matchedKey, impact, description, recommendations, citation, carrierOf.
   - Special compound: APOE (rs429358 + rs7412) via getAPOEProfile — determines E2/E3/E4 status and lipid risk.

4. **Pathway Scoring & Summaries (renderPathwaysBentoGrid + getPathwaySummaryText)**
   - Group matched by pathway (5 systems).
   - Compute status: Optimal (all low impact), Moderate/High risk based on non-low impacts.
   - Generate gene-specific summary text for each pathway (Methylation: MTHFR/COMT/NBPF3; Bone: VDR; etc.).

5. **Supplement & Food Recommendations (renderNutritionalRoadmap + getSupplementReason)**
   - For each high/moderate variant, produce gene-specific reason (e.g. MTHFR C677T TT -> avoid synthetic folic acid, use 5-MTHF + methylB12; FUT2 -> B12 absorption issues).
   - Aggregate into supplements list, foods-to-include, foods-to-avoid with full genetic justification.
   - Include carrier status notes.

6. **Output & Export**
   - Summary metrics: total SNPs parsed, format, pathway overview cards.
   - Detailed SNP cards with impact/desc/rec/citation.
   - CSV export of matched variants or formatted text report.
   - Clear all data after session (in-memory only).

## SNPDictionary Usage
Use the exact entries from dictionary.js (11 rsIDs: rs1801133, rs1801113, rs601338, rs1544410, rs6564851, rs4988235, rs762551, rs174537, rs4654748, rs4680, rs429358+rs7412). All claims have PMIDs. Do not invent entries.

## Gotchas
- Assuming genotype order without normalizeAndMatchGenotype (CT vs TC must both match — the normalizer handles both).
- Skipping the APOE compound logic (rs429358 + rs7412) — it is required for Cardiovascular pathway and E2/E3/E4 status.
- Reporting without citations or carrierOf notes — every recommendation must include the PMID.
- Processing files with binary/JS content — always run the full sanitize first; the 40% malformed threshold is strict.
- Treating output as medical advice — the disclaimer must always be included verbatim.

## Verification Checklist
- [ ] File passes all 5 validation checks with original error strings.
- [ ] Exactly matches original matchedVariants structure and counts.
- [ ] Pathway summaries and supplement reasons are gene-specific and identical to get* functions.
- [ ] No data leaves memory; output includes disclaimer.
- [ ] Exports match documented CSV/text formats from docs/export-and-data.md.

This skill enables an agent to execute the identical analysis the NutriGene web app performs, using the same curated peer-reviewed knowledge base and logic paths discovered via codegraph.
