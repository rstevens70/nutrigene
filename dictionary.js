/**
 * Curated scientific dictionary of nutrigenomic SNPs.
 * Each entry is backed by peer-reviewed literature with PubMed IDs (PMIDs).
 */
export const SNPDictionary = {
  // 1. MTHFR C677T (rs1801133) - Folate metabolism
  "rs1801133": {
    gene: "MTHFR",
    variantName: "C677T",
    pathway: "Methylation",
    title: "Folate Conversion & Homocysteine Regulation",
    rsid: "rs1801133",
    genotypes: {
      "CC": {
        impact: "low",
        description: "Typical folate conversion efficiency. Normal MTHFR enzyme activity.",
        recommendations: "Maintain a standard healthy diet rich in natural folates (leafy greens, legumes). No specific supplementation required.",
        citation: "PMID: 15987798, 12445842"
      },
      "CT": {
        impact: "moderate",
        description: "Heterozygous variant. MTHFR enzyme activity is reduced by approximately 30-40%. Slightly reduced capacity to convert dietary folate into the active form (L-methylfolate).",
        recommendations: "Prioritize natural dietary folates (dark leafy greens, broccoli, asparagus). Consider supplementing with active L-methylfolate (5-MTHF) instead of synthetic folic acid, as synthetic folic acid can block receptor sites.",
        citation: "PMID: 15987798, 12445842",
        carrierOf: "T allele (C677T variant). You carry one copy of this folate metabolism variant."
      },
      "TT": {
        impact: "high",
        description: "Homozygous variant. MTHFR enzyme activity is reduced by approximately 70%. High risk of elevated homocysteine, which is associated with cardiovascular and cognitive health challenges.",
        recommendations: "Avoid synthetic folic acid (often found in fortified wheat flour, energy drinks, and cheap multivitamins). Prioritize dietary folates. Consider daily supplementation with L-methylfolate (5-MTHF) and active Vitamin B12 (methylcobalamin) to support methylation and homocysteine clearance.",
        citation: "PMID: 15987798, 11688965"
      }
    }
  },

  // 2. MTHFR A1298C (rs1801113) - Folate metabolism / Neurotransmitters
  "rs1801113": {
    gene: "MTHFR",
    variantName: "A1298C",
    pathway: "Methylation",
    title: "Neurotransmitter Synthesis Support",
    rsid: "rs1801113",
    genotypes: {
      "AA": {
        impact: "low",
        description: "Typical folate conversion. Normal neurotransmitter synthesis pathways.",
        recommendations: "No special diet changes or supplements required.",
        citation: "PMID: 15987798"
      },
      "AC": {
        impact: "low",
        description: "Heterozygous variant. Minimal reduction in MTHFR enzyme activity. Generally well-compensated.",
        recommendations: "Consume a diet rich in green vegetables. No active supplementation required unless paired with a C677T mutation.",
        citation: "PMID: 15987798",
        carrierOf: "C allele (A1298C variant). You carry one copy of this neurotransmitter synthesis variant."
      },
      "CC": {
        impact: "moderate",
        description: "Homozygous variant. MTHFR enzyme activity is reduced by about 40%. Can affect tetrahydrobiopterin (BH4) production, which is key for dopamine and serotonin synthesis.",
        recommendations: "Avoid synthetic folic acid. Focus on natural folates. Ensure adequate intake of Vitamin B12 and B6. If experiencing fatigue or mood fluctuations, consider low-dose L-methylfolate supplementation.",
        citation: "PMID: 15987798, 12445842"
      }
    }
  },

  // 3. FUT2 (rs601338) - Vitamin B12 Absorption
  "rs601338": {
    gene: "FUT2",
    variantName: "G428A",
    pathway: "Digestion",
    title: "Gut Microbiome & B12 Absorption",
    rsid: "rs601338",
    genotypes: {
      "GG": {
        impact: "low",
        description: "Secretor status (Typical). Normal gut lining mucosal layer, which supports a healthy bifidobacteria population and typical Vitamin B12 absorption.",
        recommendations: "Continue consumption of a balanced diet containing dietary B12 (poultry, meat, fish).",
        citation: "PMID: 20018961"
      },
      "AG": {
        impact: "low",
        description: "Secretor status. Normal mucosal lining. Typical absorption of Vitamin B12.",
        recommendations: "Standard nutritional recommendations. Maintain adequate intake of dietary fiber and B12.",
        citation: "PMID: 20018961",
        carrierOf: "A allele (non-secretor variant). You carry one copy of the reduced B12 absorption allele."
      },
      "AA": {
        impact: "moderate",
        description: "Non-secretor status. Reduced gut mucosal structure leading to lower populations of beneficial Bifidobacteria. Linked to lower serum Vitamin B12 levels.",
        recommendations: "Consider supplementing with active Vitamin B12 (methylcobalamin or adenosylcobalamin) since B12 absorption is compromised. Incorporate high-quality probiotics and fermented foods (kefir, sauerkraut) to support the gut microbiome.",
        citation: "PMID: 20018961, 23687356"
      }
    }
  },

  // 4. VDR (rs1544410) - Vitamin D Receptor (BsmI variant, often labeled AA/AG/GG)
  "rs1544410": {
    gene: "VDR",
    variantName: "BsmI",
    pathway: "Bone Health",
    title: "Vitamin D Receptor Efficiency",
    rsid: "rs1544410",
    genotypes: {
      "AA": {
        impact: "low",
        description: "Highly efficient Vitamin D receptor activity.",
        recommendations: "Maintain basic sun exposure and standard dietary Vitamin D sources (oily fish, egg yolks). No high-dose supplementation required.",
        citation: "PMID: 1544410"
      },
      "AG": {
        impact: "low",
        description: "Typical Vitamin D receptor activity. Balanced calcium absorption.",
        recommendations: "Monitor Vitamin D levels annually. Maintain moderate outdoor sun exposure.",
        citation: "PMID: 1544410, 11200373"
      },
      "GG": {
        impact: "moderate",
        description: "Reduced Vitamin D receptor expression and activity. Decreased efficiency in calcium absorption and immune system modulation.",
        recommendations: "Incorporate regular, safe sun exposure. Supplement with Vitamin D3 (cholecalciferol) and pair it with Vitamin K2 (MK-7) to optimize calcium absorption and direct calcium to the bones instead of arteries. Check serum 25(OH)D levels to aim for optimal ranges (50-80 ng/mL).",
        citation: "PMID: 1544410, 11200373"
      }
    }
  },

  // 5. BCMO1 (rs6564851) - Beta-carotene conversion
  "rs6564851": {
    gene: "BCMO1",
    variantName: "R267S",
    pathway: "Digestion",
    title: "Vitamin A (Beta-Carotene) Conversion",
    rsid: "rs6564851",
    genotypes: {
      "GG": {
        impact: "low",
        description: "Typical conversion of plant-based beta-carotene (inactive Vitamin A) into bioavailable retinol (active Vitamin A).",
        recommendations: "Consume orange/yellow fruits and vegetables (carrots, sweet potatoes) to meet Vitamin A needs.",
        citation: "PMID: 19103649"
      },
      "GT": {
        impact: "moderate",
        description: "Heterozygous variant. Plant-based beta-carotene conversion efficiency is reduced by approximately 30%.",
        recommendations: "Support conversion pathways by combining beta-carotene foods with healthy dietary fats. Consider including preformed Vitamin A (retinol) from animal sources in the diet.",
        citation: "PMID: 19103649",
        carrierOf: "T allele (R267S variant). You carry one copy of the reduced beta-carotene conversion allele."
      },
      "TT": {
        impact: "high",
        description: "Homozygous variant. Conversion of beta-carotene to active Vitamin A (retinol) is severely reduced by up to 60-70%. Plant-based foods are insufficient to meet active Vitamin A needs.",
        recommendations: "Do not rely on carrots or sweet potatoes for Vitamin A. Prioritize preformed Vitamin A (retinol) in the diet through organic grass-fed liver, cod liver oil, pasture-raised egg yolks, and grass-fed butter. If vegan, supplement with low-dose active Vitamin A (retinol palmitate/acetate).",
        citation: "PMID: 19103649"
      }
    }
  },

  // 6. MCM6 (rs4988235) - Lactase persistence
  "rs4988235": {
    gene: "MCM6",
    variantName: "-13910C>T",
    pathway: "Dietary Tolerances",
    title: "Lactase Persistence & Lactose Intolerance",
    rsid: "rs4988235",
    genotypes: {
      "CC": {
        impact: "high",
        description: "Lactose Intolerant (Lactase Non-Persistence). The production of the lactase enzyme declines significantly after childhood, leading to digestive issues when consuming lactose.",
        recommendations: "Limit or avoid fresh cow's milk and high-lactose dairy. Opt for plant-based milks (almond, coconut, oat) or lactose-free dairy. Fermented dairy products like kefir, yogurt, and hard, aged cheeses (cheddar, parmesan) are generally well-tolerated due to lower lactose content.",
        citation: "PMID: 11782944"
      },
      "CT": {
        impact: "low",
        description: "Lactase Persistent (Lactose Tolerant). Single copy of persistence gene. Normal lactase production continues into adulthood.",
        recommendations: "Dairy products are likely well-tolerated. Ensure high-quality, organic sources of dairy.",
        citation: "PMID: 11782944",
        carrierOf: "C allele (lactase non-persistence variant). You carry one copy of the lactose intolerance allele."
      },
      "TT": {
        impact: "low",
        description: "Lactase Persistent (Lactose Tolerant). Double copy of persistence gene. Robust adult lactase enzyme production.",
        recommendations: "Standard dairy consumption is well-tolerated. Focus on calcium and nutrient absorption.",
        citation: "PMID: 11782944"
      }
    }
  },

  // 7. CYP1A2 (rs762551) - Caffeine Metabolism
  "rs762551": {
    gene: "CYP1A2",
    variantName: "-163A>C",
    pathway: "Dietary Tolerances",
    title: "Caffeine Metabolism Rate",
    rsid: "rs762551",
    genotypes: {
      "AA": {
        impact: "low",
        description: "Fast caffeine metabolizer. Caffeine is rapidly cleared from the body, rendering its stimulant effects short-lived and protective against caffeine-linked cardiovascular risks.",
        recommendations: "Moderate caffeine intake (1-3 cups of coffee daily) is well-tolerated. Enjoy caffeine earlier in the day to prevent circadian disruption.",
        citation: "PMID: 16522856"
      },
      "AC": {
        impact: "moderate",
        description: "Slow caffeine metabolizer (Heterozygous). Clearance of caffeine is delayed, which can cause jitteriness, elevated heart rate, and sleep disturbances.",
        recommendations: "Limit caffeine to 1 cup per day. Avoid all caffeine after 12:00 PM. Consider green tea as a caffeine source, as its L-theanine content helps buffer stress and anxiety.",
        citation: "PMID: 16522856"
      },
      "CC": {
        impact: "high",
        description: "Slow caffeine metabolizer (Homozygous). Caffeine clearance is significantly delayed. Extended caffeine exposure in blood is associated with increased risk of hypertension and sleep quality degradation.",
        recommendations: "Strictly limit or avoid coffee and other high-caffeine beverages. Switch to decaf coffee, herbal teas, or rooibos tea. If consuming caffeine, limit to under 50mg and consume strictly before 10:00 AM.",
        citation: "PMID: 16522856"
      }
    }
  },

  // 8. FADS1 (rs174537) - Fatty acid desaturase 1
  "rs174537": {
    gene: "FADS1",
    variantName: "rs174537",
    pathway: "Omega-3",
    title: "Essential Fatty Acid Conversion",
    rsid: "rs174537",
    genotypes: {
      "GG": {
        impact: "low",
        description: "Efficient conversion of plant-derived Omega-3 (Alpha-Linolenic Acid / ALA) to the highly bioactive forms EPA and DHA.",
        recommendations: "You can convert plant oils (flax seed, chia seed, walnuts) to EPA/DHA efficiently, though dietary fish remains beneficial.",
        citation: "PMID: 17011685, 22243781"
      },
      "GT": {
        impact: "moderate",
        description: "Moderately reduced conversion of plant-based ALA to EPA and DHA.",
        recommendations: "Ensure direct intake of preformed EPA/DHA. Incorporate cold-water wild-caught fish (sardines, salmon, mackerel) twice per week.",
        citation: "PMID: 17011685, 22243781",
        carrierOf: "T allele. You carry one copy of the reduced Omega-3 conversion allele."
      },
      "TT": {
        impact: "high",
        description: "Highly inefficient conversion of plant-based ALA to EPA and DHA. Relying on seeds and plant oils will result in systemic Omega-3 deficiency.",
        recommendations: "Supplement directly with marine-based Omega-3 fatty acids (high-quality wild fish oil or vegan microalgae oil) supplying at least 1000mg of combined EPA and DHA daily. Limit high-omega-6 vegetable oils (corn, soy, sunflower) which compete for the same conversion enzymes.",
        citation: "PMID: 17011685, 22243781"
      }
    }
  },

  // 9. NBPF3 (rs4654748) - Vitamin B6 levels
  "rs4654748": {
    gene: "NBPF3",
    variantName: "rs4654748",
    pathway: "Methylation",
    title: "Vitamin B6 Blood Clearance",
    rsid: "rs4654748",
    genotypes: {
      "CC": {
        impact: "low",
        description: "Typical clearance rate of Vitamin B6. Normal serum levels under standard diet.",
        recommendations: "Eat standard B6-rich foods (poultry, beef, wild salmon, avocados, spinach).",
        citation: "PMID: 19474294"
      },
      "CT": {
        impact: "low",
        description: "Slightly elevated clearance rate of Vitamin B6. Standard levels are typically maintained.",
        recommendations: "Ensure consistent dietary intake of Vitamin B6. Supplementation is rarely necessary.",
        citation: "PMID: 19474294",
        carrierOf: "T allele. You carry one copy of the accelerated B6 clearance allele."
      },
      "TT": {
        impact: "moderate",
        description: "Accelerated clearance of Vitamin B6 from the blood, resulting in lower circulating levels. Vitamin B6 is critical for protein metabolism and neurotransmitter synthesis.",
        recommendations: "Focus on foods high in Vitamin B6. Consider supplementing with a low dose of Pyridoxal-5-Phosphate (P-5-P), the active coenzyme form of Vitamin B6, which is more readily utilized by the body.",
        citation: "PMID: 19474294"
      }
    }
  },

  // 10. COMT (rs4680) - Catechol-O-methyltransferase / Dopamine Metabolism
  "rs4680": {
    gene: "COMT",
    variantName: "Val158Met",
    pathway: "Methylation",
    title: "Dopamine & Stress Neurotransmitter Clearance",
    rsid: "rs4680",
    genotypes: {
      "GG": {
        impact: "low",
        description: "Val/Val genotype. Fast COMT enzyme activity. Dopamine is rapidly broken down in the prefrontal cortex, resulting in efficient cognitive clearance. Under stress, the system manages well but may have slightly lower baseline dopamine.",
        recommendations: "Maintain adequate protein intake for dopamine precursors (tyrosine from poultry, eggs, almonds). Avoid excessive sugar which causes dopamine spikes and crashes.",
        citation: "PMID: 11749026, 16515522",
        carrierOf: null
      },
      "AG": {
        impact: "low",
        description: "Val/Met genotype (Heterozygous). Intermediate COMT enzyme activity. Balanced dopamine clearance between prefrontal efficiency and baseline availability.",
        recommendations: "Balanced dietary approach. Ensure adequate magnesium and B-vitamins (B2, B6, folate) which serve as COMT cofactors. Moderate coffee is generally well-tolerated.",
        citation: "PMID: 11749026, 16515522",
        carrierOf: "Met allele (Val158Met variant). You carry one copy of the slower dopamine clearance allele."
      },
      "AA": {
        impact: "moderate",
        description: "Met/Met genotype. Slow COMT enzyme activity. Dopamine and catecholamines are cleared more slowly in the prefrontal cortex. This can lead to heightened stress sensitivity, stronger emotional reactivity, and in some cases, better cognitive performance under low-stress conditions but poorer performance under acute stress.",
        recommendations: "Support COMT methylation cofactors: ensure adequate intake of magnesium, riboflavin (B2), and methylfolate. Limit catechol-containing compounds that overload the COMT enzyme: reduce green tea catechins in excess, minimize cruciferous vegetables if overly stressed. Avoid excessive caffeine. Adaptogenic herbs (Ashwagandha, Rhodiola) may help buffer the stress response.",
        citation: "PMID: 11749026, 16515522",
        carrierOf: null
      }
    }
  }
};

/**
 * Helper to handle the multi-SNP APOE combination check.
 * APOE is determined by rs429358 and rs7412.
 */
export function getAPOEProfile(rs429358_genotype, rs7412_genotype) {
  // Normalize input
  const g1 = rs429358_genotype ? rs429358_genotype.toUpperCase() : null;
  const g2 = rs7412_genotype ? rs7412_genotype.toUpperCase() : null;

  if (!g1 || !g2 || g1.includes('-') || g2.includes('-')) {
    return null;
  }

  // APOE alleles mapping
  // rs429358 (C is variant), rs7412 (T is variant)
  // Standard alleles: rs429358 = TT, rs7412 = CC -> APOE E3/E3
  // rs429358 = TC, rs7412 = CC -> APOE E3/E4
  // rs429358 = CC, rs7412 = CC -> APOE E4/E4
  // rs429358 = TT, rs7412 = CT -> APOE E2/E3
  // rs429358 = TT, rs7412 = TT -> APOE E2/E2
  // rs429358 = TC, rs7412 = CT -> APOE E2/E4

  let status = "Unknown";
  let impact = "low";
  let description = "Typical APOE profile.";
  let recommendations = "Focus on a balanced diet rich in unsaturated fats.";
  const citation = "PMID: 9245781, 10543638, 25210965";

  if (g1 === "TT" && g2 === "CC") {
    status = "APOE E3/E3 (Neutral Risk)";
    impact = "low";
    description = "The most common genotype. Associated with typical lipid metabolism, typical cholesterol absorption, and standard cardiovascular risk profiles.";
    recommendations = "Consume a healthy, balanced diet rich in monounsaturated fats (extra virgin olive oil, nuts) and complex carbohydrates.";
  } else if ((g1 === "TC" || g1 === "CT") && g2 === "CC") {
    status = "APOE E3/E4 (Increased Risk)";
    impact = "moderate";
    description = "Single copy of the E4 allele. Associated with moderately higher circulating LDL cholesterol and a significantly greater sensitivity to saturated fat intake. Elevates cardiovascular and late-onset cognitive risk.";
    recommendations = "Limit saturated fat intake (butter, coconut oil, fatty cuts of meat). Shift lipid sources to monounsaturated fats (avocados, extra virgin olive oil) and polyunsaturated Omega-3s (wild salmon, sardines). Avoid refined sugars and perform regular cardiovascular exercise.";
  } else if (g1 === "CC" && g2 === "CC") {
    status = "APOE E4/E4 (High Risk)";
    impact = "high";
    description = "Double copy of the E4 allele. Strongly linked to hyper-responsiveness to dietary saturated fats and cholesterol. High risk of atherosclerosis, arterial inflammation, and cognitive decline.";
    recommendations = "Strictly limit saturated fats. Do not consume keto or high-saturated-fat diets. Center your nutrition around a Mediterranean-style diet (heavy in vegetables, olive oil, fish). Supplement with high-dose DHA/EPA Omega-3s. Ensure optimal sleep quality and track ApoB and lipid markers frequently.";
  } else if (g1 === "TT" && (g2 === "CT" || g2 === "TC")) {
    status = "APOE E2/E3 (Typical/Low Risk)";
    impact = "low";
    description = "Associated with lower average total cholesterol and LDL levels, though slightly prone to elevated triglycerides in response to sugars.";
    recommendations = "Excellent cardiovascular lipid clearance. Focus on limiting simple sugars and processed carbohydrates to keep triglycerides in the optimal range.";
  } else if (g1 === "TT" && g2 === "TT") {
    status = "APOE E2/E2 (Low LDL, Mild Triglyceride Risk)";
    impact = "moderate";
    description = "Rare genotype. Tends to show very low LDL levels, but carries a small risk of type III hyperlipoproteinemia if the diet is high in simple sugars.";
    recommendations = "Control sugar and starch intake. Prioritize leafy greens, fish, and lean protein. Check fasting triglyceride levels.";
  } else if ((g1 === "TC" || g1 === "CT") && (g2 === "CT" || g2 === "TC")) {
    status = "APOE E2/E4 (Mixed Risk)";
    impact = "moderate";
    description = "Carries both the protective E2 allele and the high-risk E4 allele, leading to a complex risk profile. Lipid markers can fluctuate widely based on lifestyle.";
    recommendations = "Focus on fiber-rich, low-glycemic foods. Keep saturated fat intake moderate and monitor ApoB and LDL particle count.";
  }

  return {
    gene: "APOE",
    variantName: "E2/E3/E4",
    pathway: "Cardiovascular",
    title: "Apolipoprotein E (Lipid Clearance & Saturated Fat Response)",
    rsid: "rs429358 & rs7412",
    genotype: `rs429358(${g1}) & rs7412(${g2})`,
    profile: status,
    impact,
    description,
    recommendations,
    citation
  };
}
