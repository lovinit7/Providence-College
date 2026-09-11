/**
 * main.js — App orchestrator
 * Wires together: form, BMI logic, Easter eggs, roasts, audio, animations, AI
 */

import {
  calculateBMI,
  classifyBMI,
  parseMetricInputs,
  parseImperialInputs,
  validateAge,
} from './bmi.js';
import { detectEasterEgg }                      from './easter-eggs.js';
import { getRoast }                             from './roasts.js';
import { playSound, toggleMute, isMuted, CATEGORY_SOUNDS } from './audio.js';
import { countUp, animateProgressBar, revealAfter, playEasterEggOverlay, shakeScreen } from './animations.js';
import { getAIRoast }                           from './ai.js';
import { ScrollPicker }                         from './picker.js';

// ─── State ──────────────────────────────────────────────────────────────────
let currentUnit = 'metric';   // 'metric' | 'imperial'
let currentSex  = 'prefer';   // 'male' | 'female' | 'prefer'
let lastResult  = null;       // stored for recalculate

// ─── DOM refs ────────────────────────────────────────────────────────────────
const screenLanding = document.getElementById('screen-landing');
const screenResult  = document.getElementById('screen-result');

const formEl        = document.getElementById('bmi-form');
const agePickerEl      = document.getElementById('picker-age');
const heightCmPickerEl = document.getElementById('picker-height-cm');
const heightFtPickerEl = document.getElementById('picker-height-ft');
const heightInPickerEl = document.getElementById('picker-height-in');
const weightKgPickerEl = document.getElementById('picker-weight-kg');
const weightLbPickerEl = document.getElementById('picker-weight-lb');

const agePicker      = new ScrollPicker(agePickerEl, 18, 120, 25);
const heightCmPicker = new ScrollPicker(heightCmPickerEl, 50, 272, 175);
const heightFtPicker = new ScrollPicker(heightFtPickerEl, 1, 8, 5);
const heightInPicker = new ScrollPicker(heightInPickerEl, 0, 11, 9);
const weightKgPicker = new ScrollPicker(weightKgPickerEl, 10, 500, 70);
const weightLbPicker = new ScrollPicker(weightLbPickerEl, 22, 1100, 154);
const calcBtn       = document.getElementById('btn-calculate');

// Unit toggle buttons
const unitBtns = document.querySelectorAll('[data-unit]');
// Sex toggle buttons
const sexBtns  = document.querySelectorAll('[data-sex]');

// Height row containers
const heightMetricRow   = document.getElementById('height-metric-row');
const heightImperialRow = document.getElementById('height-imperial-row');
const weightMetricRow   = document.getElementById('weight-metric-row');
const weightImperialRow = document.getElementById('weight-imperial-row');

// Result elements
const analyzingCard   = document.getElementById('analyzing-card');
const resultContainer = document.getElementById('result-container');
const progressBarFill = document.getElementById('progress-bar-fill');
const bmiNumberEl     = document.getElementById('bmi-number');
const categoryBadgeEl = document.getElementById('category-badge');
const categoryTextEl  = document.getElementById('category-text');
const roastCardEl     = document.getElementById('roast-card');
const roastTextEl     = document.getElementById('roast-text');
const resultActionsEl = document.getElementById('result-actions');
const recalcBtn       = document.getElementById('btn-recalculate');
const easterEggOverlay = document.getElementById('easter-egg-overlay');
const aiRoastCard     = document.getElementById('ai-roast-card');
const aiRoastTextEl   = document.getElementById('ai-roast-text');

// Mute button
const muteBtn = document.getElementById('btn-mute');

// ─── Unit Toggle ─────────────────────────────────────────────────────────────
unitBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const unit = btn.dataset.unit;
    if (unit === currentUnit) return;
    currentUnit = unit;

    unitBtns.forEach((b) => {
      const isActive = b.dataset.unit === unit;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });

    // Show/hide height inputs
    heightMetricRow.hidden   = unit !== 'metric';
    heightImperialRow.hidden = unit !== 'imperial';
    weightMetricRow.hidden   = unit !== 'metric';
    weightImperialRow.hidden = unit !== 'imperial';

    clearErrors();
  });
});

// ─── Sex Toggle ──────────────────────────────────────────────────────────────
sexBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentSex = btn.dataset.sex;
    sexBtns.forEach((b) => {
      const isActive = b.dataset.sex === currentSex;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });
  });
});

// ─── Mute Button ─────────────────────────────────────────────────────────────
muteBtn.addEventListener('click', () => {
  const nowMuted = toggleMute();
  muteBtn.setAttribute('aria-pressed', String(!nowMuted));
  muteBtn.title = nowMuted ? 'Unmute' : 'Mute';
});

// ─── Recalculate ─────────────────────────────────────────────────────────────
recalcBtn.addEventListener('click', () => {
  screenResult.classList.remove('visible');
  screenLanding.style.display = '';
  // Reset result elements for next run
  resultContainer.classList.remove('visible');
  categoryBadgeEl.classList.remove('visible');
  roastCardEl.classList.remove('visible');
  resultActionsEl.classList.remove('visible');
  aiRoastCard.classList.remove('visible');
  bmiNumberEl.textContent = '0.0';
  progressBarFill.style.width = '0%';
  clearErrors();
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Form submission ──────────────────────────────────────────────────────────
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  // Validate age
  const age = agePicker.getValue();
  const ageError = validateAge(age);
  if (ageError) {
    showError('age', ageError);
    return;
  }

  // Validate inputs based on unit
  let parsed;
  if (currentUnit === 'metric') {
    parsed = parseMetricInputs({
      height: heightCmPicker.getValue(),
      weight: weightKgPicker.getValue(),
    });

    if (!parsed.valid) {
      if (parsed.errors.height) {
        showError('height-cm', parsed.errors.height);
      }
      if (parsed.errors.weight) {
        showError('weight-kg', parsed.errors.weight);
      }
      return;
    }
  } else {
    parsed = parseImperialInputs({
      feet:   heightFtPicker.getValue(),
      inches: heightInPicker.getValue(),
      pounds: weightLbPicker.getValue(),
    });

    if (!parsed.valid) {
      if (parsed.errors.height) {
        showError('height-ft', parsed.errors.height);
      }
      if (parsed.errors.weight) {
        showError('weight-lb', parsed.errors.weight);
      }
      return;
    }
  }

  const { weightKg, heightCm } = parsed;
  const isExactMetric = currentUnit === 'metric';

  // Calculate
  const bmi      = calculateBMI(weightKg, heightCm);
  const category = classifyBMI(bmi);
  const egg      = detectEasterEgg(weightKg, isExactMetric);

  lastResult = { bmi, category, egg, weightKg, heightCm, age };

  // Disable button during reveal
  calcBtn.disabled = true;

  // Switch screens
  screenLanding.style.display = 'none';
  screenResult.classList.add('visible');
  analyzingCard.hidden  = false;
  resultContainer.classList.remove('visible');

  // ── Phase 1: Suspense sound + progress bar ──
  playSound('suspense');
  await animateProgressBar(progressBarFill, 1400);
  await sleep(200);

  // ── Phase 2: Hide analyzing, show result container ──
  analyzingCard.hidden = true;
  resultContainer.classList.add('visible');

  // ── Phase 2: Count up BMI ──
  countUp(bmiNumberEl, bmi, 1000, 1);
  await sleep(1100);

  // ── Phase 3: Category badge ──
  categoryBadgeEl.setAttribute('data-category', category.key);
  categoryTextEl.textContent = category.label;
  categoryBadgeEl.classList.add('visible');
  await sleep(600);

  // ── Phase 4 or 5: Easter egg OR roast ──
  if (egg) {
    // Play Easter egg sound (key maps directly to audio controller)
    playSound(egg.sound);

    await sleep(300);

    await new Promise((resolve) => {
      playEasterEggOverlay(egg, easterEggOverlay, resolve);
    });

    // Shake for heavy weights
    if (category.key === 'obese' || category.key === 'overweight') {
      shakeScreen();
    }
  } else {
    // Play category sound
    playSound(CATEGORY_SOUNDS[category.key]);
  }

  // ── Phase 4: Roast ──
  const roastText = getRoast(category.key);
  roastTextEl.textContent = roastText;
  roastCardEl.classList.add('visible');

  if (category.key === 'obese') shakeScreen();

  await sleep(800);

  // ── Phase 5: Actions ──
  resultActionsEl.classList.add('visible');
  calcBtn.disabled = false;

  // ── Phase 6 (optional): AI roast ──
  const apiKey = window.GEMINI_API_KEY || null;
  if (apiKey) {
    const { text, source } = await getAIRoast(
      { bmi, categoryKey: category.key, categoryLabel: category.label, age },
      apiKey
    );
    if (source === 'ai') {
      aiRoastTextEl.textContent = text;
      await sleep(400);
      aiRoastCard.classList.add('visible');
    }
  }
});

// ─── Live validation clear is no longer needed since pickers guarantee numbers ───

// ─── Helpers ──────────────────────────────────────────────────────────────────
function showError(fieldId, message) {
  const el = document.getElementById(`error-${fieldId}`);
  if (!el) return;
  el.textContent = message;
  el.classList.add('visible');
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach((el) => {
    el.classList.remove('visible');
    el.textContent = '';
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
