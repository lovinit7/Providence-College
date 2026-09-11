/**
 * audio.js — Sound controller with mute support
 *
 * Sound map:
 *   '67'       → public/sounds/meme-67.mp3      (SIX SEVEN Easter egg)
 *   'fahh'     → public/sounds/meme-fahh.mp3    (Obesity category)
 *   'hmm'      → public/sounds/meme-hmm.mp3     (Normal category / 73 egg)
 *   'santa'    → public/sounds/meme-santa.mp3   (Milestone celebrations)
 *   'sneeze'   → public/sounds/meme-sneeze.mp3  (Overweight category / 88 egg)
 *   'suspense' → public/sounds/meme-suspense.mp3 (Analyzing / 42/99 eggs)
 */

const SOUND_MAP = {
  '67':       './public/sounds/meme-67.mp3',
  'fahh':     './public/sounds/meme-fahh.mp3',
  'hmm':      './public/sounds/meme-hmm.mp3',
  'santa':    './public/sounds/meme-santa.mp3',
  'sneeze':   './public/sounds/meme-sneeze.mp3',
  'suspense': './public/sounds/meme-suspense.mp3',
};

/** Category → sound mapping */
export const CATEGORY_SOUNDS = {
  underweight: 'hmm',
  normal:      'hmm',
  overweight:  'sneeze',
  obese:       'fahh',
};

let _muted = false;
let _currentAudio = null;

// Preload cache
const _cache = {};

function getAudio(key) {
  if (!_cache[key]) {
    const path = SOUND_MAP[key];
    if (!path) return null;
    const audio = new Audio(path);
    audio.preload = 'auto';
    _cache[key] = audio;
  }
  return _cache[key];
}

/**
 * Play a sound by key. Silently fails if audio unavailable or muted.
 * @param {string} key  Sound key from SOUND_MAP
 */
export function playSound(key) {
  if (_muted) return;

  try {
    // Stop any currently playing audio
    if (_currentAudio) {
      _currentAudio.pause();
      _currentAudio.currentTime = 0;
    }

    const audio = getAudio(key);
    if (!audio) return;

    audio.currentTime = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => { _currentAudio = audio; })
        .catch(() => { /* browser autoplay policy — silently ignore */ });
    }
  } catch {
    // Audio failed entirely — continue without sound
  }
}

/**
 * Stop all audio
 */
export function stopSound() {
  if (_currentAudio) {
    _currentAudio.pause();
    _currentAudio.currentTime = 0;
    _currentAudio = null;
  }
}

/**
 * Toggle mute
 * @returns {boolean} new muted state
 */
export function toggleMute() {
  _muted = !_muted;
  if (_muted) stopSound();
  return _muted;
}

/**
 * Get current mute state
 */
export function isMuted() {
  return _muted;
}
