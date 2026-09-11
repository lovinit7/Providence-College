/**
 * easter-eggs.js — Special weight-based Easter egg detection
 *
 * Triggers are based on weight in kilograms.
 * Imperial values are converted before checking.
 * Tolerance: ±0.5 kg for converted imperial values.
 */

const TOLERANCE = 0.5; // kg

const EGGS = [
  {
    weight: 42,
    title: 'THE ANSWER TO\nEVERYTHING',
    subtitle: 'You found the answer to life, the universe, and this unnecessary website.',
    sound: 'suspense',
    effect: 'glitch',
  },
  {
    weight: 50,
    title: 'HALF CENTURY',
    subtitle: '🏏 The crowd goes wild.',
    sound: 'santa',
    effect: 'flash',
  },
  {
    weight: 67,
    title: 'SIX SEVEN',
    subtitle: null,
    sound: '67',
    effect: 'flash-blue',
  },
  {
    weight: 73,
    title: 'SEVENTY THREE',
    subtitle: 'The best number. Sheldon would approve.',
    sound: 'hmm',
    effect: 'glitch',
  },
  {
    weight: 77,
    title: 'LUCKY SEVENS',
    subtitle: '🎰 Double the luck. Double the nothing.',
    sound: 'santa',
    effect: 'flash',
  },
  {
    weight: 88,
    title: 'DOUBLE EIGHT',
    subtitle: '♾️ An infinite amount of zeros on the BMI chart.',
    sound: 'sneeze',
    effect: 'flash',
  },
  {
    weight: 99,
    title: 'ONE MORE.',
    subtitle: 'You were so close. One more kilogram and you\'d have a story.',
    sound: 'suspense',
    effect: 'suspense',
  },
  {
    weight: 100,
    title: 'CENTURY',
    subtitle: '💯 Magnificent.',
    sound: 'santa',
    effect: 'confetti',
  },
];

/**
 * Check if a given weight triggers an Easter egg
 * @param {number} weightKg  Weight in kilograms (may be decimal for imperial conversions)
 * @param {boolean} isExact  True if user typed exact metric kg (no tolerance)
 * @returns {object|null}    Easter egg data or null
 */
export function detectEasterEgg(weightKg, isExact = true) {
  const tol = isExact ? 0 : TOLERANCE;

  for (const egg of EGGS) {
    if (Math.abs(weightKg - egg.weight) <= tol) {
      return egg;
    }
  }
  return null;
}
