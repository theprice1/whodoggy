// WhoDoggy Utility Functions

import { MICROCHIP_PATTERNS } from '../constants';

/**
 * Validate microchip ID format
 */
export function validateMicrochipId(microchipId: string): boolean {
  if (!microchipId || typeof microchipId !== 'string') {
    return false;
  }

  const cleaned = microchipId.replace(/\s/g, '');
  
  return Object.values(MICROCHIP_PATTERNS).some(pattern => 
    pattern.test(cleaned)
  );
}

/**
 * Format microchip ID for display
 */
export function formatMicrochipId(microchipId: string): string {
  const cleaned = microchipId.replace(/\s/g, '');
  
  if (MICROCHIP_PATTERNS.ISO_11784_11785.test(cleaned)) {
    // Format as 123 456 789 012 345
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4 $5');
  }
  
  return cleaned;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Delay function for rate limiting
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sanitize string for safe display
 */
export function sanitizeString(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
