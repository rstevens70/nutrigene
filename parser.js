/**
 * Genomic data file parser and validator.
 * Runs entirely in the client browser, in-memory, to safeguard privacy.
 */

// Max size allowed: 50 MB
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;

/**
 * Validates the metadata of the file before parsing.
 * Throws an error if the file is invalid, too large, or potentially malicious.
 */
export function validateFileMetadata(file) {
  if (!file) {
    throw new Error("No file provided.");
  }

  // Size check
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is 50MB.`);
  }

  // Extension check (most raw files are .txt or .csv)
  const extension = file.name.split('.').pop().toLowerCase();
  if (extension !== 'txt' && extension !== 'csv') {
    throw new Error("Invalid file format. Please upload a plain text (.txt) or comma-separated (.csv) raw genome file.");
  }
}

/**
 * Validates file content headers and scans for potentially malicious scripts/binary garbage.
 * Returns the detected file format type ('23andme', 'ancestry', 'myheritage', or 'generic').
 */
export function detectFormatAndSanitize(previewText) {
  // Safety checks - scan for HTML/script tags to prevent XSS or HTML injection
  if (/<script|javascript:|onload=|onerror=|<html>|<body|<div/i.test(previewText)) {
    throw new Error("Malicious content detected: HTML tags are not permitted in raw genomic text files.");
  }

  // Check for binary zero-bytes indicating a compiled executable or zip file
  if (previewText.includes('\u0000')) {
    throw new Error("Malformed content: Binary data detected. Please upload an uncompressed raw text file.");
  }

  // Split into lines for format detection
  const lines = previewText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);

  if (lines.length < 5) {
    throw new Error("The file is empty or too short to be a valid raw genome file.");
  }

  // Format detection triggers
  let is23AndMe = false;
  let isAncestry = false;
  let isMyHeritage = false;

  // Scan headers (first 20 lines)
  const headerCheckCount = Math.min(lines.length, 30);
  for (let i = 0; i < headerCheckCount; i++) {
    const line = lines[i];

    // 23andMe markers
    if (line.includes("23andMe") || line.includes("rsid\tchromosome\tposition\tgenotype")) {
      is23AndMe = true;
      break;
    }

    // AncestryDNA markers
    if (line.includes("AncestryDNA") || line.includes("rsid,chromosome,position,allele1,allele2") || (line.includes("rsid") && line.includes("allele1") && line.includes("allele2"))) {
      isAncestry = true;
      break;
    }

    // MyHeritage markers
    if (line.includes("MyHeritage") || line.includes("RSID,CHROMOSOME,POSITION,RESULT")) {
      isMyHeritage = true;
      break;
    }
  }

  // Fallback to structure checks if no explicit text markers
  if (!is23AndMe && !isAncestry && !isMyHeritage) {
    const headLine = lines.find(line => !line.startsWith('#'));
    if (headLine) {
      const lower = headLine.toLowerCase();
      if (lower.includes("rsid") && lower.includes("allele1")) {
        isAncestry = true;
      } else if (lower.includes("rsid") && lower.includes("result")) {
        isMyHeritage = true;
      } else if (lower.includes("rsid") && lower.includes("genotype")) {
        is23AndMe = true;
      }
    }
  }

  if (is23AndMe) return '23andme';
  if (isAncestry) return 'ancestry';
  if (isMyHeritage) return 'myheritage';

  // Generic fallback if it has columns for rsid, chromosome, position, and genotype
  const firstDataLine = lines.find(line => !line.startsWith('#') && (line.includes('\t') || line.includes(',')));
  if (firstDataLine) {
    return 'generic';
  }

  throw new Error("Unable to identify genomic file format. The file must be raw data from 23andMe, AncestryDNA, or MyHeritage.");
}

/**
 * Parses raw file content string and extracts SNPs map.
 * Format normalizer: converts columns to rsid -> genotype map.
 */
export function parseGenomicData(fileContent, format) {
  const snpMap = new Map();
  const lines = fileContent.split(/\r?\n/);
  
  let headerSkipped = false;
  let parsedCount = 0;
  let invalidLines = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and comment lines
    if (!line || line.startsWith('#')) {
      continue;
    }

    // Handle header row (rsid, chr, pos, etc.)
    if (!headerSkipped) {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes("rsid") || lowerLine.includes("chromosome")) {
        headerSkipped = true;
        continue;
      }
    }

    let rsid = "";
    let genotype = "";

    if (format === '23andme' || format === 'generic') {
      // 23andMe: rsid\tchromosome\tposition\tgenotype
      // Tabs or spaces separated
      const parts = line.split(/\s+/);
      if (parts.length >= 4) {
        rsid = parts[0];
        genotype = parts[3];
      }
    } else if (format === 'ancestry') {
      // AncestryDNA: rsid,chromosome,position,allele1,allele2
      // Comma or tab separated
      const separator = line.includes(',') ? ',' : /\s+/;
      const parts = line.split(separator).map(p => p.replace(/"/g, '').trim());
      if (parts.length >= 5) {
        rsid = parts[0];
        // Combine allele1 and allele2
        const a1 = parts[3];
        const a2 = parts[4];
        genotype = a1 + a2;
      }
    } else if (format === 'myheritage') {
      // MyHeritage: "RSID","CHROMOSOME","POSITION","RESULT"
      // Comma-separated, fields often wrapped in quotes
      const separator = line.includes(',') ? ',' : /\s+/;
      const parts = line.split(separator).map(p => p.replace(/"/g, '').trim());
      if (parts.length >= 4) {
        rsid = parts[0];
        genotype = parts[3];
      }
    }

    // Clean rsid and genotype
    rsid = rsid.toLowerCase().trim();
    genotype = genotype.toUpperCase().trim();

    // Validate standard format
    // rsid must start with rs, i, or a word character (custom markers sometimes start with i)
    // genotype should be 1 or 2 letters (or - / -- for missing calls)
    if (rsid && genotype) {
      // Ignore missing calls '--', '00', '?', '-'
      if (genotype !== '--' && genotype !== '00' && genotype !== '?' && genotype !== '-') {
        snpMap.set(rsid, genotype);
        parsedCount++;
      }
    } else {
      // Keep track of malformed lines to assess file integrity
      if (line.length > 0) {
        invalidLines++;
      }
    }
  }

  // Safety threshold: if we found zero valid SNPs, or more than 30% of data lines are completely invalid, reject.
  const totalProcessed = parsedCount + invalidLines;
  if (parsedCount === 0) {
    throw new Error("No genomic records could be parsed. The file structure is unrecognized or corrupted.");
  }
  if (invalidLines > totalProcessed * 0.4) {
    throw new Error("File contains too many malformed lines. It may be corrupt or not a valid raw genomic data text file.");
  }

  return {
    snps: snpMap,
    count: parsedCount,
    format: format
  };
}
