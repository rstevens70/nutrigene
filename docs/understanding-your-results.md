# Understanding Your Results

This guide explains every section of the NutriGene dashboard so you can interpret your results with confidence. You do not need a background in genetics to use this guide.

---

## The Dashboard at a Glance

After your file is analyzed, the dashboard is divided into four main areas:

1. **Metric Cards** — four summary numbers at the top
2. **Pathway Cards** — five biological systems shown as gauge scores
3. **SNP Cards** — detailed information on each matched genetic variant
4. **Nutritional Roadmap** — your personalized supplement and dietary plan (separate tab)

---

## Metric Cards

The four cards across the top give you an immediate snapshot of your overall results.

### Markers Analyzed

This is the count of genetic targets from the NutriGene research database that were **found in your uploaded file**. The app looks for 11 specific markers (across 10 genes plus the compound APOE test). If a marker is not present in your file — because your testing provider did not include that position on their chip — it simply does not appear in your results.

A higher number means more of your genome was covered by your testing provider.

### Actionable Alerts

This is the total number of variants found in your genome that are rated **Moderate** or **High** impact. These are the variants most likely to benefit from nutritional intervention.

- A count of **0** means all your tested markers came back at the low/typical level — no intervention is flagged
- Higher counts mean more areas where targeted nutrition may be beneficial

### Optimization Index

The Optimization Index is a single percentage that represents the overall efficiency of the biological pathways covered by the app. It starts at **100%** and is reduced based on what is found in your genome:

| Variant impact | Deduction |
|---|---|
| Moderate | -8% per variant |
| High | -18% per variant |

Low-impact variants do not reduce the score.

**Example:** If you have two moderate variants and one high-impact variant, your score would be:
100% - (2 × 8%) - (1 × 18%) = **66%**

This number is a relative indicator, not a medical measurement. It helps you see at a glance how many pathways may need nutritional support. A lower score does not mean you are unhealthy — it means there are more opportunities for targeted nutritional optimization.

### Primary Assessment

This is a plain-language summary of your overall finding, based on what variants were detected:

| Status | Meaning |
|---|---|
| **Fully Optimal** | No moderate or high-impact variants were found in the tested markers |
| **Moderate Support** | At least one moderate-impact variant was detected |
| **High Priority** | At least one high-impact variant was detected |

If you have both moderate and high-impact variants, the status reflects the highest level found ("High Priority").

---

## Pathway Cards

Your results are grouped into five biological pathways. Each pathway card shows a circular gauge score and a summary of findings for that system.

The five pathways are:

| Pathway | What it covers |
|---|---|
| **Methylation & B-Vitamins** | How efficiently your body converts folate, regulates homocysteine, and supports neurotransmitter production |
| **Vitamin D & Bone Density** | How well your vitamin D receptors function and how efficiently you absorb and use vitamin D |
| **Lipid & Heart Integrity (APOE)** | Your lipid metabolism profile and associated cardiovascular and cognitive risk factors |
| **Dietary Tolerances & Caffeine** | Lactose tolerance and how fast your body processes caffeine |
| **Vitamin A/B12 Gut Absorption** | Your ability to convert plant-based vitamin A (beta-carotene) and absorb vitamin B12 from the gut |

### Reading a Pathway Card

Each card displays:

- **Pathway score** — a percentage gauge reflecting variant findings within that pathway (calculated the same way as the Optimization Index, but scoped to only the genes in that pathway)
- **Variant count** — how many variants from this pathway were found in your genome
- **Summary text** — a plain-language interpretation of the findings
- **Status indicator** — one of three labels:
  - **Optimal** — no moderate or high-impact variants in this pathway
  - **Moderate Support** — at least one moderate-impact variant
  - **Critical Support** — at least one high-impact variant
- **Details link** — clicking "Details →" filters the SNP cards below to show only variants from that pathway

---

## Detailed SNP Cards

Below the pathway cards is a searchable grid of every genetic variant that was matched in your genome. Each card contains the following elements.

### Gene Name Badge

The gene symbol (e.g., MTHFR, APOE, VDR) displayed as a colored badge. The color corresponds to the impact level of that particular variant.

### rsID

The rsID is the standardized identifier for a specific position in the genome (e.g., rs1801133). This is the same identifier used in scientific literature and public databases like dbSNP. If you want to look up independent research on a variant, the rsID is what you search for.

### Pathway Tag

A small label showing which of the five biological pathways this variant belongs to.

### Your Genotype

This shows the two alleles you carry at this position — for example, `CT`, `GG`, or `AG`. Humans have two copies of most genes (one from each parent), so most genotypes show two letters.

- **Homozygous reference** (e.g., `CC` when `C` is the typical allele): You carry the common, typical variant on both chromosomes
- **Heterozygous** (e.g., `CT`): You carry one typical allele and one variant allele
- **Homozygous variant** (e.g., `TT`): You carry the variant allele on both chromosomes — this typically produces the strongest effect

### Carrier Badge

If you see an amber **Carrier** badge on a card, it means you are **heterozygous** for a risk allele — you have one copy of the variant and one typical copy.

Being a carrier means:
- You may not fully express the trait associated with that variant
- You could pass the risk allele to your children (each child has a 50% chance of inheriting it)
- You may experience subtle, sub-clinical effects that are worth monitoring
- It is useful information for family planning discussions with a genetic counselor

The absence of a Carrier badge means you are either homozygous for the typical allele (no risk copies) or homozygous for the variant (two copies — the full effect, which is reflected in the impact level instead).

### Variant Title and Scientific Description

A plain-language name for the variant (e.g., "Reduced Folate Methylation Capacity") followed by a scientific explanation of what this SNP does at the biological level — what enzyme or process is affected and to what degree.

### Nutritional Guidance

Specific, evidence-based dietary or supplement suggestions that correspond to this variant. This is the most immediately actionable part of the card.

### Impact Level Badge

Every SNP card carries one of three impact ratings:

| Level | Meaning | What to do |
|---|---|---|
| **Low** | Your variant is typical or has minimal effect on this pathway | No intervention needed; good baseline information |
| **Moderate** | The gene or enzyme is functioning at reduced capacity | Dietary modification or supplementation is recommended |
| **High** | The gene or enzyme has significantly impaired function | Targeted nutritional intervention is strongly advised |

### PubMed Evidence Links

Each card includes links to published research (identified by PMID numbers) supporting the described variant effect and nutritional recommendations. These link directly to abstracts on PubMed.

---

## Searching and Filtering SNP Cards

You can narrow down the SNP card grid using:

- **Text search** — type an rsID (e.g., `rs1801133`), gene name (e.g., `MTHFR`), pathway name (e.g., `methylation`), or any keyword from a card's description
- **Impact filter buttons** — click to show only cards at a specific impact level:
  - All Targets
  - High Impact
  - Moderate
  - Low Impact
- **Pathway Details link** — clicking "Details →" on any pathway card automatically filters the SNP grid to that pathway

---

## The Nutritional Roadmap Tab

Clicking the **Nutritional Roadmap** tab switches the view from the variant-by-variant breakdown to a consolidated recommendation plan. This tab has three sections.

### Targeted Supplement Protocol

A list of specific supplements recommended based on your genetic findings. Each entry includes:
- The supplement name and form (e.g., "Methylfolate (5-MTHF)" rather than generic "folic acid")
- The reason it is recommended, tied directly to your genotype (e.g., "Your MTHFR C677T TT genotype significantly reduces MTHF reductase enzyme activity")
- PMID references linking to the supporting research

The recommendations in this section are specific to what was found in your genome — you will not see a generic supplement list. If a pathway came back fully optimal, no supplement will be listed for it.

### Recommended Foods (Supportive)

A list of foods that work with your genetic profile — ingredients that provide nutrients in forms your body can use most effectively given your variants. For example, someone with impaired beta-carotene conversion might see pre-formed vitamin A sources (eggs, liver) listed here instead of carrots.

### Foods and Ingredients to Avoid

Foods or ingredients that may be problematic given your specific genetics. For example, someone with a slow caffeine metabolism variant might see high-caffeine beverages listed here. Someone with a high APOE risk profile might see guidance about saturated fat intake.

---

## A Note on Interpreting Results

NutriGene provides nutritional guidance based on established nutrigenomic research. A few important reminders:

- **Genetics is not destiny.** Having a high-impact variant means a pathway is less efficient — not that a disease is certain or inevitable. Lifestyle, diet, and environment all interact with your genes.
- **Results reflect tested markers only.** The app covers 11 specific targets. There are thousands of other SNPs in your genome that are not analyzed here.
- **This is not medical advice.** The recommendations are nutritional in nature. Always discuss significant findings with a qualified healthcare provider before making major changes to supplements or diet.
- **Family implications.** If you carry risk alleles, family members — especially children — may benefit from knowing, particularly for planning purposes. A genetic counselor can help with this.

---

*See also: [Genetic Markers Reference](genetic-markers-reference.md) | [Export and Data Handling](export-and-data.md) | [FAQ](faq.md)*
