import { validateFileMetadata, detectFormatAndSanitize, parseGenomicData } from './parser.js';
import { SNPDictionary, getAPOEProfile } from './dictionary.js';

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Application State
let appState = {
  rawContent: null,
  format: null,
  totalParsedSnps: 0,
  snpMap: null,
  matchedVariants: [],
  activeTab: 'dashboard', // 'dashboard' or 'roadmap'
  activeFilter: 'all', // 'all', 'high', 'moderate', 'low'
  searchQuery: ''
};

// Initialize app on load
window.addEventListener('DOMContentLoaded', () => {
  initParticleSystem();
  setupEventListeners();
});

// ==========================================
// 1. Interactive Canvas Particle Background
// ==========================================
function initParticleSystem() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.15)' : 'rgba(6, 182, 212, 0.12)';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Create particles
  const particleCount = Math.min(Math.floor((width * height) / 12000), 100);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Mouse interactivity
  let mouse = { x: null, y: null, radius: 120 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update();
      p1.draw();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        
        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.08;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Interactivity with mouse
      if (mouse.x !== null) {
        const mouseDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
        if (mouseDist < mouse.radius) {
          const alpha = (1 - mouseDist / mouse.radius) * 0.15;
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 2. Events & Interactions
// ==========================================
function setupEventListeners() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const tabDashboard = document.getElementById('tab-dashboard');
  const tabRoadmap = document.getElementById('tab-roadmap');
  const searchInput = document.getElementById('search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const resetBtn = document.getElementById('reset-btn');

  // Drag and drop triggers
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    handleFileSelection(file);
  });

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFileSelection(file);
  });

  // Tab switching
  tabDashboard.addEventListener('click', () => switchTab('dashboard'));
  tabRoadmap.addEventListener('click', () => switchTab('roadmap'));

  // Detailed SNP searching & filters
  searchInput.addEventListener('input', (e) => {
    appState.searchQuery = e.target.value.toLowerCase().trim();
    renderDetailedSnpCards();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      appState.activeFilter = e.target.dataset.filter;
      renderDetailedSnpCards();
    });
  });

  // Export buttons
  document.getElementById('export-csv-btn').addEventListener('click', exportCSV);
  document.getElementById('export-text-btn').addEventListener('click', exportText);

  // Clear memory & return
  resetBtn.addEventListener('click', () => {
    resetAppState();
    switchView('landing-view');
  });
}

// Show Toast error message
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast toast-error';
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close">&times;</button>
  `;
  container.appendChild(toast);

  // Close handler
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.remove();
  });

  // Auto remove
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 6000);
}

// File loading pipeline
function handleFileSelection(file) {
  if (!file) return;

  try {
    validateFileMetadata(file);
    
    const reader = new FileReader();
    
    // Read the first 50KB for format checks and safety validation
    reader.onload = function(e) {
      const textPreview = e.target.result;
      
      try {
        const detectedFormat = detectFormatAndSanitize(textPreview);
        appState.format = detectedFormat;
        
        // Success check: read the rest of the file
        readFullFile(file);
      } catch (err) {
        showToast(err.message);
      }
    };
    
    reader.readAsText(file.slice(0, 50000));
  } catch (err) {
    showToast(err.message);
  }
}

function readFullFile(file) {
  const reader = new FileReader();
  
  reader.onload = function(e) {
    appState.rawContent = e.target.result;
    
    // Switch to Loader View and start sequenced analysis animation
    switchView('loading-view');
    runSequencedAnalysis();
  };

  reader.onerror = function() {
    showToast("An error occurred while reading the file.");
    switchView('landing-view');
  };

  reader.readAsText(file);
}

function switchView(viewId) {
  document.querySelectorAll('.view-section').forEach(view => {
    view.classList.remove('active');
  });
  document.getElementById(viewId).classList.add('active');
}

// ==========================================
// 3. Sequenced Chromosome Processing Loader
// ==========================================
function runSequencedAnalysis() {
  const fill = document.querySelector('.progress-bar-fill');
  const percentageText = document.querySelector('.progress-percentage');
  const statusText = document.querySelector('.loading-status-text');

  let currentPercent = 0;
  
  const statusSteps = [
    { threshold: 5, text: "Sanitizing input vectors and headers..." },
    { threshold: 15, text: "Parsing genomic entries (Autosomes 1-5)..." },
    { threshold: 30, text: "Scanning chromosome nodes (Autosomes 6-12)..." },
    { threshold: 50, text: "Analyzing regulatory elements (Autosomes 13-22)..." },
    { threshold: 70, text: "Resolving sexual determination markers (Allosomes X-Y)..." },
    { threshold: 85, text: "Parsing mitochondrial sequence structure (MT)..." },
    { threshold: 95, text: "Cross-referencing mutation database targets..." },
    { threshold: 100, text: "Compiling nutritional recommendation protocols..." }
  ];

  // Perform processing in background synchronously right before completing to prevent lag
  let parseResult = null;
  let parsingError = null;

  try {
    parseResult = parseGenomicData(appState.rawContent, appState.format);
  } catch (err) {
    parsingError = err;
  }

  const interval = setInterval(() => {
    if (parsingError) {
      clearInterval(interval);
      showToast(parsingError.message);
      switchView('landing-view');
      return;
    }

    currentPercent += Math.floor(Math.random() * 5) + 3;
    if (currentPercent >= 100) {
      currentPercent = 100;
      fill.style.width = '100%';
      percentageText.textContent = '100%';
      statusText.textContent = "Analysis Complete.";
      
      clearInterval(interval);

      // Store results
      appState.snpMap = parseResult.snps;
      appState.totalParsedSnps = parseResult.count;
      
      // Perform database checks
      analyzeGenomeMatches();
      
      // Show Dashboard
      setTimeout(() => {
        switchView('dashboard-view');
        renderDashboard();
      }, 500);
    } else {
      fill.style.width = `${currentPercent}%`;
      percentageText.textContent = `${currentPercent}%`;
      
      // Update loading status message based on milestones
      const step = statusSteps.find(s => currentPercent <= s.threshold);
      if (step) {
        statusText.textContent = step.text;
      }
    }
  }, 100);
}

/**
 * Normalizes a genotype string and matches it against the dictionary genotypes.
 * Handles:
 * 1. Direct matches (e.g. CC -> CC)
 * 2. Reversed matches (e.g. CT -> TC -> CT)
 * 3. Complementary base flips (e.g. AA -> TT, since A is the complement of T)
 * 4. Reversed complementary base flips (e.g. AG -> TC -> CT)
 */
function normalizeAndMatchGenotype(userGenotype, dictGenotypes) {
  if (!userGenotype) return null;
  const g = userGenotype.toUpperCase().trim();
  
  // 1. Direct match
  if (dictGenotypes[g]) return { matchedKey: g, matchedVal: dictGenotypes[g] };
  
  // 2. Reversed match
  const reversed = g.split('').reverse().join('');
  if (dictGenotypes[reversed]) return { matchedKey: reversed, matchedVal: dictGenotypes[reversed] };
  
  // 3. Complement match
  const complementMap = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };
  const comp = g.split('').map(c => complementMap[c] || c).join('');
  if (dictGenotypes[comp]) return { matchedKey: comp, matchedVal: dictGenotypes[comp] };
  
  // 4. Reversed complement match
  const compReversed = comp.split('').reverse().join('');
  if (dictGenotypes[compReversed]) return { matchedKey: compReversed, matchedVal: dictGenotypes[compReversed] };
  
  return null;
}

// ==========================================
// 4. Genome Analysis & SNP Mapping
// ==========================================
function analyzeGenomeMatches() {
  appState.matchedVariants = [];
  const map = appState.snpMap;

  // 1. Analyze single SNP entries from dictionary
  for (const [rsid, dictEntry] of Object.entries(SNPDictionary)) {
    // Normalise key checks (rsid is lowercase in appState.snpMap)
    const userGenotype = map.get(rsid.toLowerCase());
    
    if (userGenotype) {
      // Find matching genotype entry using our multi-strand normalizer
      const matchResult = normalizeAndMatchGenotype(userGenotype, dictEntry.genotypes);
      
      if (matchResult) {
        const matchedGenotype = matchResult.matchedVal;
        appState.matchedVariants.push({
          gene: dictEntry.gene,
          variantName: dictEntry.variantName,
          pathway: dictEntry.pathway,
          title: dictEntry.title,
          rsid: dictEntry.rsid,
          userGenotype: userGenotype, // raw genotype in file
          matchedGenotypeKey: matchResult.matchedKey, // normalized key that matched the dictionary
          impact: matchedGenotype.impact,
          description: matchedGenotype.description,
          recommendations: matchedGenotype.recommendations,
          citation: matchedGenotype.citation,
          carrierOf: matchedGenotype.carrierOf || null
        });
      }
    }
  }

  // 2. Compound check: APOE profile
  // APOE requires rs429358 and rs7412
  const apoeSnp1 = map.get("rs429358");
  const apoeSnp2 = map.get("rs7412");
  
  if (apoeSnp1 && apoeSnp2) {
    const apoeProfile = getAPOEProfile(apoeSnp1, apoeSnp2);
    if (apoeProfile) {
      appState.matchedVariants.push(apoeProfile);
    }
  }
}

// ==========================================
// 5. Renderers & UI Generators
// ==========================================
function renderDashboard() {
  // 1. Meta information
  document.getElementById('meta-snp-count').textContent = appState.totalParsedSnps.toLocaleString();
  document.getElementById('meta-format').textContent = appState.format.toUpperCase();

  // 2. Summary Metric Cards
  renderSummaryMetrics();

  // 3. Pathway Bento Grid
  renderPathwaysBentoGrid();

  // 4. Detailed SNP Cards List
  renderDetailedSnpCards();

  // 5. Nutritional Roadmap List
  renderNutritionalRoadmap();
}

function renderSummaryMetrics() {
  const variants = appState.matchedVariants;
  
  // Total analyzed SNP targets matched from dictionary
  const matchedCount = variants.length;
  document.getElementById('metric-variants-analyzed').textContent = `${matchedCount} Targets`;
  
  // Count variants with moderate or high impact
  const moderateCount = variants.filter(v => v.impact === 'moderate').length;
  const highCount = variants.filter(v => v.impact === 'high').length;
  const criticalCount = moderateCount + highCount;
  
  document.getElementById('metric-critical-alerts').textContent = criticalCount;
  
  // Calculate a general "Genomics Pathway Optimization Score"
  // Start with 100, deduct 10 for moderate, 25 for high impact
  let score = 100;
  variants.forEach(v => {
    if (v.impact === 'moderate') score -= 8;
    if (v.impact === 'high') score -= 18;
  });
  score = Math.max(Math.min(Math.round(score), 100), 20);
  
  document.getElementById('metric-optimization-score').textContent = `${score}%`;

  // Dynamic alert warning
  const coreAlertCard = document.getElementById('metric-alert-status');
  if (highCount > 0) {
    coreAlertCard.textContent = "High Priority";
    coreAlertCard.parentElement.style.borderLeft = "3px solid var(--color-danger)";
  } else if (moderateCount > 0) {
    coreAlertCard.textContent = "Moderate Support";
    coreAlertCard.parentElement.style.borderLeft = "3px solid var(--color-warning)";
  } else {
    coreAlertCard.textContent = "Fully Optimal";
    coreAlertCard.parentElement.style.borderLeft = "3px solid var(--color-success)";
  }
}

function renderPathwaysBentoGrid() {
  const pathways = [
    { id: 'Methylation', title: 'Methylation & B-Vitamins', icon: '🧬' },
    { id: 'Bone Health', title: 'Vitamin D & Bone Density', icon: '🦴' },
    { id: 'Cardiovascular', title: 'Lipid & Heart Integrity', icon: '❤️' },
    { id: 'Dietary Tolerances', title: 'Dietary Tolerances & Caffeine', icon: '🍽️' },
    { id: 'Digestion', title: 'Vitamin A/B12 Gut Absorption', icon: '🧼' }
  ];

  const container = document.getElementById('pathways-bento-container');
  container.innerHTML = '';

  pathways.forEach(pathway => {
    const matched = appState.matchedVariants.filter(v => v.pathway === pathway.id);
    
    // Score calculation for this pathway
    let pathwayScore = 100;
    let highAlerts = 0;
    let moderateAlerts = 0;

    matched.forEach(v => {
      if (v.impact === 'high') {
        pathwayScore -= 30;
        highAlerts++;
      } else if (v.impact === 'moderate') {
        pathwayScore -= 15;
        moderateAlerts++;
      }
    });

    pathwayScore = Math.max(Math.min(pathwayScore, 100), 0);

    // Determine status class
    let statusClass = 'low';
    let statusLabel = 'Optimal';

    if (highAlerts > 0) {
      statusClass = 'high';
      statusLabel = 'Critical Support';
    } else if (moderateAlerts > 0) {
      statusClass = 'moderate';
      statusLabel = 'Moderate Support';
    }

    // Circular gauge properties
    const circumference = 2 * Math.PI * 27; // radius=27
    const strokeDashoffset = circumference - (pathwayScore / 100) * circumference;

    let gaugeColor = 'var(--color-success)';
    if (statusClass === 'moderate') gaugeColor = 'var(--color-warning)';
    if (statusClass === 'high') gaugeColor = 'var(--color-danger)';

    const card = document.createElement('div');
    card.className = 'glass-panel pathway-card';
    card.innerHTML = `
      <div class="pathway-card-header">
        <div class="pathway-info">
          <h3>${pathway.title}</h3>
          <span class="variant-count">${matched.length} Variant Markers Checked</span>
        </div>
        <div class="gauge-wrapper">
          <svg class="gauge-svg">
            <circle class="gauge-track" cx="30" cy="30" r="27"></circle>
            <circle class="gauge-value" cx="30" cy="30" r="27" 
              style="stroke: ${gaugeColor}; stroke-dashoffset: ${strokeDashoffset};">
            </circle>
          </svg>
          <div class="gauge-text" style="color: ${gaugeColor};">${pathwayScore}%</div>
        </div>
      </div>
      <div class="pathway-body">
        ${getPathwaySummaryText(pathway.id, statusLabel, matched)}
      </div>
      <div class="pathway-footer">
        <span class="status-indicator ${statusClass}">${statusLabel}</span>
        <a href="#detailed-snps-section" class="explore-details-link" data-pathway="${pathway.id}">
          Details &rarr;
        </a>
      </div>
    `;

    // Add click handler for details anchor link to set search filters
    card.querySelector('.explore-details-link').addEventListener('click', (e) => {
      e.preventDefault();
      
      const filterSection = document.getElementById('detailed-snps-section');
      filterSection.scrollIntoView({ behavior: 'smooth' });

      // Simulate search query filter
      const searchInput = document.getElementById('search-input');
      searchInput.value = pathway.id;
      appState.searchQuery = pathway.id.toLowerCase();
      renderDetailedSnpCards();
    });

    container.appendChild(card);
  });
}

function getPathwaySummaryText(pathwayId, statusLabel, matched) {
  if (matched.length === 0) {
    return "No target markers for this pathway were identified in your genomic raw dataset.";
  }

  if (statusLabel === 'Optimal') {
    return `Analysis of markers like ${matched.map(m=>m.gene).filter((v,i,a)=>a.indexOf(v)===i).join(', ')} indicates efficient biological function. No functional dietary supplements are strictly required for pathway balance.`;
  }

  const riskGenes = matched.filter(m => m.impact !== 'low').map(m => m.gene);
  const uniqueRiskGenes = [...new Set(riskGenes)];

  if (pathwayId === 'Methylation') {
    return `Variants identified in the <strong>${uniqueRiskGenes.join(' & ')}</strong> genes. Folate and B-vitamin conversion efficiency is compromised, which may lead to suboptimal methylation pathways.`;
  } else if (pathwayId === 'Bone Health') {
    return `Reduced receptor capability detected in <strong>VDR</strong>. This decreases the cellular utilization rate of Vitamin D, which is essential for bone density and immune modulation.`;
  } else if (pathwayId === 'Cardiovascular') {
    return `Elevated sensitivity to dietary saturated fats detected due to your <strong>APOE</strong> profile. Clearance rates of circulating lipids are compromised.`;
  } else if (pathwayId === 'Dietary Tolerances') {
    return `Genetic markers show variants linked to caffeine clearance speed or lactase persistence. Adjusting coffee and fresh dairy intake is highly recommended.`;
  } else if (pathwayId === 'Digestion') {
    return `Reduced capacity to absorb vitamin B12 or convert plant-based beta-carotene into active Vitamin A retinol. Dietary modifications are advised.`;
  }

  return "Multiple mutation indicators identified. Functional dietary modifications or targeted supplementation will help balance this metabolic pathway.";
}

function renderDetailedSnpCards() {
  const container = document.getElementById('snp-cards-container');
  container.innerHTML = '';

  const query = appState.searchQuery;
  const filter = appState.activeFilter;

  // Filter matched list
  let filtered = appState.matchedVariants.filter(variant => {
    // 1. Text filter (rsid, gene, pathway, or explanation)
    const matchesSearch = 
      variant.rsid.toLowerCase().includes(query) ||
      variant.gene.toLowerCase().includes(query) ||
      variant.pathway.toLowerCase().includes(query) ||
      variant.title.toLowerCase().includes(query) ||
      variant.description.toLowerCase().includes(query) ||
      variant.recommendations.toLowerCase().includes(query);

    // 2. Impact Filter
    const matchesFilter = (filter === 'all' || variant.impact === filter);

    return matchesSearch && matchesFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-panel" style="text-align: center; padding: 3rem 1rem; color: var(--color-text-dim);">
        No matching SNP markers found for search query: "${escHtml(query)}"
      </div>
    `;
    return;
  }

  filtered.forEach(v => {
    // Format PubMed IDs into links
    const citations = v.citation.split(',').map(cit => {
      const pmid = cit.replace(/PMID:/i, '').trim();
      const safePmid = /^\d+$/.test(pmid) ? pmid : '';
      if (!safePmid) return `<span class="citation-link">${escHtml(pmid)}</span>`;
      return `<a href="https://pubmed.ncbi.nlm.nih.gov/${safePmid}/" target="_blank" rel="noopener noreferrer" class="citation-link">PMID ${safePmid} &nearr;</a>`;
    }).join(' ');

    let glowClass = 'badge-violet';
    if (v.impact === 'moderate') glowClass = 'badge-orange'; // CSS handles colors via border
    if (v.impact === 'high') glowClass = 'badge-red';

    // Style borders and shadows according to impact
    let glowStyle = '';
    if (v.impact === 'high') {
      glowStyle = 'border-color: rgba(239, 68, 68, 0.25); box-shadow: 0 4px 20px rgba(239, 68, 68, 0.03);';
    } else if (v.impact === 'moderate') {
      glowStyle = 'border-color: rgba(245, 158, 11, 0.25); box-shadow: 0 4px 20px rgba(245, 158, 11, 0.03);';
    } else {
      glowStyle = 'border-color: rgba(16, 185, 129, 0.25);';
    }

    const card = document.createElement('div');
    card.className = `glass-panel snp-card`;
    card.setAttribute('style', glowStyle);
    card.innerHTML = `
      <div class="snp-card-top">
        <div class="snp-identifiers">
          <span class="snp-gene-badge" style="background: ${getImpactGradient(v.impact)}">${v.gene}</span>
          <span class="snp-rsid">${v.rsid.toUpperCase()}</span>
          <span class="snp-pathway-tag">${v.pathway}</span>
          ${v.carrierOf ? `<span class="carrier-badge" title="${escHtml(v.carrierOf)}">⚡ Carrier</span>` : ''}
        </div>
        <div class="snp-genotype-badge">
          ${v.profile ? escHtml(v.profile) : escHtml(v.userGenotype)}
        </div>
      </div>
      <h4 class="snp-title">${v.title}</h4>
      <p class="snp-explanation">${v.description}</p>
      <div class="snp-recommendations" style="border-left-color: ${getImpactColor(v.impact)}">
        <strong>Nutritional Guidance:</strong>
        ${v.recommendations}
      </div>
      <div class="snp-card-footer">
        <span class="status-indicator ${v.impact}">${v.impact} impact</span>
        <div class="snp-citations">
          Evidence: ${citations}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function getImpactColor(impact) {
  if (impact === 'high') return 'var(--color-danger)';
  if (impact === 'moderate') return 'var(--color-warning)';
  return 'var(--color-success)';
}

function getImpactGradient(impact) {
  if (impact === 'high') return 'linear-gradient(135deg, #f43f5e, #be123c)';
  if (impact === 'moderate') return 'linear-gradient(135deg, #f59e0b, #b45309)';
  return 'linear-gradient(135deg, #10b981, #047857)';
}

function getSupplementReason(v) {
  if (v.gene === 'MTHFR' && v.variantName === 'C677T') {
    return `Your ${escHtml(v.userGenotype)} genotype at ${escHtml(v.rsid.toUpperCase())} reduces MTHFR enzyme activity by ~${v.impact === 'high' ? '70%' : '35%'}. Synthetic folic acid cannot be processed efficiently — L-Methylfolate bypasses this conversion step entirely.`;
  } else if (v.gene === 'MTHFR' && v.variantName === 'A1298C') {
    return `Your ${escHtml(v.userGenotype)} genotype at ${escHtml(v.rsid.toUpperCase())} reduces BH4 (tetrahydrobiopterin) production, impacting dopamine and serotonin synthesis. Active B-complex supports neurotransmitter pathway balance.`;
  } else if (v.gene === 'VDR') {
    return `Your ${escHtml(v.userGenotype)} genotype at ${escHtml(v.rsid.toUpperCase())} reduces Vitamin D receptor efficiency. Even adequate sun exposure may result in suboptimal intracellular Vitamin D activity without direct D3 supplementation.`;
  } else if (v.gene === 'FUT2') {
    return `Your ${escHtml(v.userGenotype)} genotype at ${escHtml(v.rsid.toUpperCase())} indicates non-secretor status, reducing gut mucosal integrity and lowering Bifidobacteria populations, which directly impairs B12 absorption from food sources.`;
  } else if (v.gene === 'BCMO1') {
    return `Your ${escHtml(v.userGenotype)} genotype at ${escHtml(v.rsid.toUpperCase())} reduces conversion of plant-based beta-carotene to retinol by ~${v.impact === 'high' ? '60-70%' : '30%'}. Carrots and sweet potatoes are insufficient — preformed Vitamin A is required.`;
  } else if (v.gene === 'FADS1') {
    return `Your ${escHtml(v.userGenotype)} genotype at ${escHtml(v.rsid.toUpperCase())} reduces desaturase enzyme efficiency for converting plant ALA to EPA/DHA. Marine-source Omega-3 provides these fatty acids in their final bioavailable form.`;
  } else if (v.gene === 'NBPF3') {
    return `Your ${escHtml(v.userGenotype)} genotype at ${escHtml(v.rsid.toUpperCase())} accelerates B6 clearance from the bloodstream, leading to chronically lower circulating levels. P-5-P is the active coenzyme form that does not require hepatic conversion.`;
  }
  return `Due to variant in ${escHtml(v.gene)} (${escHtml(v.rsid.toUpperCase())}) affecting ${escHtml(v.pathway.toLowerCase())}.`;
}

function renderNutritionalRoadmap() {
  const supplementsContainer = document.getElementById('supplements-list');
  const foodsToIncludeContainer = document.getElementById('foods-include-list');
  const foodsToAvoidContainer = document.getElementById('foods-avoid-list');

  supplementsContainer.innerHTML = '';
  foodsToIncludeContainer.innerHTML = '';
  foodsToAvoidContainer.innerHTML = '';

  const supplements = [];
  const foodsInclude = [];
  const foodsAvoid = [];

  // Parse recommendations to construct lists
  appState.matchedVariants.forEach(v => {
    // Only compile recommendations for moderate/high impact to avoid cluttering with basic advice
    if (v.impact === 'low') return;

    const recs = v.recommendations.toLowerCase();
    
    // 1. Compile targeted supplements
    if (recs.includes('supplement') || recs.includes('active') || recs.includes('5-mthf') || recs.includes('vitamin')) {
      let suppName = "";
      let detail = v.recommendations;

      if (v.gene === 'MTHFR' && v.variantName === 'C677T') {
        suppName = "L-Methylfolate (5-MTHF) & Active B12 (Methylcobalamin)";
      } else if (v.gene === 'MTHFR' && v.variantName === 'A1298C') {
        suppName = "Active B-Complex (B6, B12, Methylfolate)";
      } else if (v.gene === 'VDR') {
        suppName = "Vitamin D3 + Vitamin K2 (MK-7)";
      } else if (v.gene === 'FUT2') {
        suppName = "Active Vitamin B12 & High-Quality Probiotics";
      } else if (v.gene === 'BCMO1') {
        suppName = "Preformed Vitamin A (Retinol Palmitate or Cod Liver Oil)";
      } else if (v.gene === 'FADS1') {
        suppName = "Marine-based Omega-3 (Fish Oil or Concentrated Algae Oil)";
      } else if (v.gene === 'NBPF3') {
        suppName = "Active Vitamin B6 (Pyridoxal-5-Phosphate / P-5-P)";
      }

      if (suppName) {
        supplements.push({
          name: suppName,
          reason: getSupplementReason(v),
          pmid: v.citation
        });
      }
    }

    // 2. Compile foods to include
    if (v.gene === 'MTHFR') {
      foodsInclude.push({
        food: "Natural folate-rich foods",
        details: "Dark leafy greens (spinach, kale), broccoli, asparagus, and lentils.",
        reason: `Your ${escHtml(v.userGenotype)} genotype in ${escHtml(v.gene)} (${escHtml(v.rsid.toUpperCase())}) reduces conversion of synthetic folic acid. Natural food folates bypass this impaired step and are utilized directly.`
      });
    } else if (v.gene === 'BCMO1') {
      foodsInclude.push({
        food: "Preformed Vitamin A sources",
        details: "Pasture-raised egg yolks, organic grass-fed beef liver, and grass-fed butter.",
        reason: `Your ${escHtml(v.userGenotype)} genotype in BCMO1 (${escHtml(v.rsid.toUpperCase())}) impairs conversion of plant beta-carotene to retinol by up to ${v.impact === 'high' ? '60–70%' : '30%'}. Only animal-source preformed Vitamin A provides retinol directly.`
      });
    } else if (v.gene === 'FADS1') {
      foodsInclude.push({
        food: "Cold-water wild-caught fish",
        details: "Salmon, sardines, mackerel, and anchovies to obtain preformed DHA/EPA.",
        reason: `Your ${escHtml(v.userGenotype)} genotype in FADS1 (${escHtml(v.rsid.toUpperCase())}) reduces the desaturase enzymes that convert plant ALA into EPA and DHA. Fish deliver these omega-3s in their final bioavailable form, bypassing the impaired conversion.`
      });
    } else if (v.gene === 'FUT2') {
      foodsInclude.push({
        food: "Fermented foods & prebiotic fibers",
        details: "Kefir, yogurt, kimchi, sauerkraut, and onions to support Bifidobacteria population.",
        reason: `Your ${escHtml(v.userGenotype)} genotype in FUT2 (${escHtml(v.rsid.toUpperCase())}) indicates non-secretor status, which reduces gut mucosal integrity and Bifidobacteria populations. Fermented foods and prebiotic fibers directly reseed and sustain these beneficial bacteria.`
      });
    } else if (v.gene === 'MCM6' && v.userGenotype === 'CC') {
      foodsInclude.push({
        food: "Lactose-free & fermented dairy alternatives",
        details: "Almond milk, coconut yogurt, kefir, and hard aged cheeses (Parmesan, Cheddar).",
        reason: `Your CC genotype in MCM6 (${escHtml(v.rsid.toUpperCase())}) causes lactase non-persistence — the enzyme that digests lactose declines after childhood. Fermented dairy and lactose-free options provide calcium and nutrients without triggering digestive symptoms.`
      });
    }

    // 3. Compile foods to avoid
    if (v.gene === 'MTHFR') {
      foodsAvoid.push({
        food: "Synthetic Folic Acid",
        details: "Processed wheat flour, fortified bread, cereals, energy drinks, and standard cheap multivitamins containing folic acid.",
        reason: `Your ${escHtml(v.userGenotype)} genotype in ${escHtml(v.gene)} (${escHtml(v.rsid.toUpperCase())}) means your MTHFR enzyme cannot efficiently convert synthetic folic acid into usable L-methylfolate. Unmetabolized folic acid can accumulate and block folate receptors, worsening the deficit.`
      });
    } else if (v.gene === 'CYP1A2' && v.impact !== 'low') {
      foodsAvoid.push({
        food: "Excessive Caffeine / Afternoon Coffee",
        details: "Limit coffee to 1 cup daily before 10:00 AM. Avoid energy drinks and caffeine tablets.",
        reason: `Your ${escHtml(v.userGenotype)} genotype in CYP1A2 (${escHtml(v.rsid.toUpperCase())}) significantly slows caffeine clearance. Caffeine remains active in your bloodstream far longer, raising the risk of elevated blood pressure, sleep disruption, and cardiovascular stress.`
      });
    } else if (v.gene === 'APOE' && v.impact !== 'low') {
      foodsAvoid.push({
        food: "High-Saturated Fats & Refined Sugars",
        details: "Limit butter, coconut oil, fatty meats, palm oil, and high-fat dairy. Avoid keto diets.",
        reason: `Your ${escHtml(v.profile || v.userGenotype)} APOE profile (${escHtml(v.rsid.toUpperCase())}) makes you hyper-responsive to dietary saturated fat — it drives up LDL and VLDL cholesterol more sharply than in people with typical APOE profiles, elevating cardiovascular and cognitive risk.`
      });
    } else if (v.gene === 'MCM6' && v.userGenotype === 'CC') {
      foodsAvoid.push({
        food: "High-lactose dairy",
        details: "Fresh cow's milk, ice cream, soft cheese, and whey protein concentrate.",
        reason: `Your CC genotype in MCM6 (${escHtml(v.rsid.toUpperCase())}) causes lactase enzyme decline after childhood. High-lactose foods reach the colon undigested, where bacterial fermentation causes bloating, cramps, and diarrhea.`
      });
    } else if (v.gene === 'FADS1') {
      foodsAvoid.push({
        food: "Industrial Seed Oils (Omega-6)",
        details: "Corn oil, soybean oil, safflower oil, and sunflower oil, which compete for Omega-3 synthesis enzymes.",
        reason: `Your ${escHtml(v.userGenotype)} genotype in FADS1 (${escHtml(v.rsid.toUpperCase())}) already limits your omega-3 conversion capacity. High-omega-6 seed oils compete directly for the same FADS1 desaturase enzymes, further crowding out whatever EPA/DHA production remains.`
      });
    }
  });

  // Filter lists to make them unique
  const uniqueSupplements = supplements.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);
  const uniqueFoodsInclude = foodsInclude.filter((v, i, a) => a.findIndex(t => t.food === v.food) === i);
  const uniqueFoodsAvoid = foodsAvoid.filter((v, i, a) => a.findIndex(t => t.food === v.food) === i);

  // Render Supplements
  if (uniqueSupplements.length === 0) {
    supplementsContainer.innerHTML = `<li class="roadmap-item"><div class="roadmap-item-content"><p>No high-priority supplements identified. Your genetic markers indicate balanced pathway conversions.</p></div></li>`;
  } else {
    uniqueSupplements.forEach(supp => {
      const pmids = supp.pmid.split(',')[0].trim();
      const li = document.createElement('li');
      li.className = 'roadmap-item badge-violet';
      li.innerHTML = `
        <div class="roadmap-item-icon">💊</div>
        <div class="roadmap-item-content">
          <h4>${supp.name}</h4>
          <p><strong>Why:</strong> ${supp.reason}</p>
          <span class="item-evidence">Scientific Evidence: ${pmids}</span>
        </div>
      `;
      supplementsContainer.appendChild(li);
    });
  }

  // Render Foods to Include
  if (uniqueFoodsInclude.length === 0) {
    foodsToIncludeContainer.innerHTML = `<li class="roadmap-item"><div class="roadmap-item-content"><p>Maintain a diverse, whole-food diet rich in dietary fibers.</p></div></li>`;
  } else {
    uniqueFoodsInclude.forEach(food => {
      const li = document.createElement('li');
      li.className = 'roadmap-item badge-green';
      li.innerHTML = `
        <div class="roadmap-item-icon">🥗</div>
        <div class="roadmap-item-content">
          <h4>${food.food}</h4>
          <p><strong>Why:</strong> ${food.reason}</p>
          <p>${food.details}</p>
        </div>
      `;
      foodsToIncludeContainer.appendChild(li);
    });
  }

  // Render Foods to Avoid
  if (uniqueFoodsAvoid.length === 0) {
    foodsToAvoidContainer.innerHTML = `<li class="roadmap-item"><div class="roadmap-item-content"><p>No strict genetic dietary intolerances identified.</p></div></li>`;
  } else {
    uniqueFoodsAvoid.forEach(food => {
      const li = document.createElement('li');
      li.className = 'roadmap-item badge-red';
      li.innerHTML = `
        <div class="roadmap-item-icon">⚠️</div>
        <div class="roadmap-item-content">
          <h4>${food.food}</h4>
          <p><strong>Why:</strong> ${food.reason}</p>
          <p>${food.details}</p>
        </div>
      `;
      foodsToAvoidContainer.appendChild(li);
    });
  }
}

function exportCSV() {
  if (appState.matchedVariants.length === 0) {
    showToast("No analysis data to export. Please upload a genome file first.");
    return;
  }

  const headers = ['Gene', 'RSID', 'Variant', 'Pathway', 'Your Genotype', 'Impact', 'Description', 'Recommendations', 'Evidence'];

  const escape = (str) => {
    if (str === null || str === undefined) return '';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = appState.matchedVariants.map(v => [
    escape(v.gene),
    escape(v.rsid),
    escape(v.variantName),
    escape(v.pathway),
    escape(v.profile ? v.profile : v.userGenotype),
    escape(v.impact),
    escape(v.description),
    escape(v.recommendations),
    escape(v.citation)
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nutrigene-report-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportText() {
  if (appState.matchedVariants.length === 0) {
    showToast("No analysis data to export. Please upload a genome file first.");
    return;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const variants = appState.matchedVariants;
  const moderateCount = variants.filter(v => v.impact === 'moderate').length;
  const highCount = variants.filter(v => v.impact === 'high').length;
  const criticalCount = moderateCount + highCount;

  let score = 100;
  variants.forEach(v => {
    if (v.impact === 'moderate') score -= 8;
    if (v.impact === 'high') score -= 18;
  });
  score = Math.max(Math.min(Math.round(score), 100), 20);

  let primaryAssessment = 'Fully Optimal';
  if (highCount > 0) primaryAssessment = 'High Priority';
  else if (moderateCount > 0) primaryAssessment = 'Moderate Support';

  const divider = '='.repeat(60);
  const thin = '-'.repeat(60);

  let lines = [];
  lines.push(divider);
  lines.push('  NUTRIGENE — NUTRIGENOMIC ANALYSIS REPORT');
  lines.push(divider);
  lines.push(`  Generated: ${dateStr}`);
  lines.push(`  Format: ${appState.format ? appState.format.toUpperCase() : 'RAW'}  |  SNPs Scanned: ${appState.totalParsedSnps.toLocaleString()}`);
  lines.push('');
  lines.push('  SUMMARY METRICS');
  lines.push(thin);
  lines.push(`  Total Markers Matched : ${variants.length}`);
  lines.push(`  Actionable Alerts     : ${criticalCount}`);
  lines.push(`  Optimization Index    : ${score}%`);
  lines.push(`  Primary Assessment    : ${primaryAssessment}`);
  lines.push('');
  lines.push(divider);
  lines.push('  VARIANT DETAILS');
  lines.push(divider);

  variants.forEach((v, i) => {
    lines.push('');
    lines.push(`[${i + 1}] ${v.gene} — ${v.rsid.toUpperCase()} (${v.variantName})`);
    lines.push(`    Pathway   : ${v.pathway}`);
    lines.push(`    Genotype  : ${v.profile ? v.profile : v.userGenotype}`);
    lines.push(`    Impact    : ${v.impact.toUpperCase()}`);
    if (v.carrierOf) lines.push(`    Carrier   : ${v.carrierOf}`);
    lines.push(`    Title     : ${v.title}`);
    lines.push('');
    lines.push('    Description:');
    lines.push(`    ${v.description}`);
    lines.push('');
    lines.push('    Recommendations:');
    lines.push(`    ${v.recommendations}`);
    lines.push('');
    lines.push(`    Evidence  : ${v.citation}`);
    lines.push(thin);
  });

  // Supplements
  const supplements = [];
  const foodsInclude = [];
  const foodsAvoid = [];

  variants.forEach(v => {
    if (v.impact === 'low') return;
    const recs = v.recommendations.toLowerCase();
    if (recs.includes('supplement') || recs.includes('active') || recs.includes('5-mthf') || recs.includes('vitamin')) {
      let suppName = '';
      if (v.gene === 'MTHFR' && v.variantName === 'C677T') suppName = 'L-Methylfolate (5-MTHF) & Active B12 (Methylcobalamin)';
      else if (v.gene === 'MTHFR' && v.variantName === 'A1298C') suppName = 'Active B-Complex (B6, B12, Methylfolate)';
      else if (v.gene === 'VDR') suppName = 'Vitamin D3 + Vitamin K2 (MK-7)';
      else if (v.gene === 'FUT2') suppName = 'Active Vitamin B12 & High-Quality Probiotics';
      else if (v.gene === 'BCMO1') suppName = 'Preformed Vitamin A (Retinol Palmitate or Cod Liver Oil)';
      else if (v.gene === 'FADS1') suppName = 'Marine-based Omega-3 (Fish Oil or Concentrated Algae Oil)';
      else if (v.gene === 'NBPF3') suppName = 'Active Vitamin B6 (Pyridoxal-5-Phosphate / P-5-P)';
      if (suppName) supplements.push(suppName);
    }
    if (v.gene === 'MTHFR') foodsInclude.push('Natural folate-rich foods: dark leafy greens, broccoli, asparagus, lentils.');
    else if (v.gene === 'BCMO1') foodsInclude.push('Preformed Vitamin A sources: pasture-raised egg yolks, grass-fed liver, grass-fed butter.');
    else if (v.gene === 'FADS1') foodsInclude.push('Cold-water wild-caught fish: salmon, sardines, mackerel, anchovies.');
    else if (v.gene === 'FUT2') foodsInclude.push('Fermented foods & prebiotic fibers: kefir, kimchi, sauerkraut, onions.');

    if (v.gene === 'MTHFR') foodsAvoid.push('Synthetic folic acid: fortified bread, cereals, energy drinks, cheap multivitamins.');
    else if (v.gene === 'CYP1A2') foodsAvoid.push('Excessive caffeine: limit coffee, avoid energy drinks and caffeine tablets.');
    else if (v.gene === 'APOE' && v.impact !== 'low') foodsAvoid.push('High saturated fats & refined sugars: butter, coconut oil, fatty meats, keto diets.');
    else if (v.gene === 'FADS1') foodsAvoid.push('Industrial seed oils (Omega-6): corn, soybean, safflower, and sunflower oil.');
  });

  const unique = (arr) => [...new Set(arr)];

  lines.push('');
  lines.push(divider);
  lines.push('  TARGETED SUPPLEMENT PROTOCOL');
  lines.push(divider);
  if (unique(supplements).length === 0) {
    lines.push('  No high-priority supplements identified.');
  } else {
    unique(supplements).forEach((s, i) => lines.push(`  ${i + 1}. ${s}`));
  }

  lines.push('');
  lines.push(divider);
  lines.push('  RECOMMENDED FOODS (SUPPORTIVE)');
  lines.push(divider);
  if (unique(foodsInclude).length === 0) {
    lines.push('  Maintain a diverse, whole-food diet rich in dietary fibers.');
  } else {
    unique(foodsInclude).forEach((f, i) => lines.push(`  ${i + 1}. ${f}`));
  }

  lines.push('');
  lines.push(divider);
  lines.push('  FOODS & INGREDIENTS TO AVOID');
  lines.push(divider);
  if (unique(foodsAvoid).length === 0) {
    lines.push('  No strict genetic dietary intolerances identified.');
  } else {
    unique(foodsAvoid).forEach((f, i) => lines.push(`  ${i + 1}. ${f}`));
  }

  lines.push('');
  lines.push(divider);
  lines.push('  DISCLAIMER: For educational purposes only. Not medical advice.');
  lines.push('  Consult a qualified physician before starting any supplement program.');
  lines.push(divider);

  const textContent = lines.join('\n');
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nutrigene-report-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function switchTab(tabId) {
  appState.activeTab = tabId;
  
  // Update buttons
  document.getElementById('tab-dashboard').classList.toggle('active', tabId === 'dashboard');
  document.getElementById('tab-roadmap').classList.toggle('active', tabId === 'roadmap');

  // Toggle views
  document.getElementById('dashboard-main-sections').style.display = tabId === 'dashboard' ? 'block' : 'none';
  document.getElementById('roadmap-main-sections').style.display = tabId === 'roadmap' ? 'block' : 'none';
}

function resetAppState() {
  appState = {
    rawContent: null,
    format: null,
    totalParsedSnps: 0,
    snpMap: null,
    matchedVariants: [],
    activeTab: 'dashboard',
    activeFilter: 'all',
    searchQuery: ''
  };

  // Reset file inputs
  document.getElementById('file-input').value = '';
  document.getElementById('search-input').value = '';
  
  // Reset tabs
  switchTab('dashboard');
  
  // Reset filters active state
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === 'all');
  });
}
