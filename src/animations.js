/**
 * animations.js — Result reveal sequence and visual effects
 */

/**
 * Animate a number counting up from 0 to target over duration ms
 * @param {HTMLElement} el
 * @param {number} target
 * @param {number} duration  ms
 * @param {number} decimals  decimal places
 */
export function countUp(el, target, duration = 1200, decimals = 1) {
  const start = performance.now();
  const startVal = 0;

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (target - startVal) * eased;
    el.textContent = current.toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toFixed(decimals);
  }
  requestAnimationFrame(step);
}

/**
 * Animate progress bar fill from 0 to 100% over duration ms
 * @param {HTMLElement} bar
 * @param {number} duration ms
 * @returns {Promise} resolves when done
 */
export function animateProgressBar(bar, duration = 1400) {
  return new Promise((resolve) => {
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      bar.style.width = (progress * 100) + '%';
      if (progress < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}

/**
 * Add visible class after a delay
 */
export function revealAfter(el, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      el.classList.add('visible');
      resolve();
    }, delayMs);
  });
}

/**
 * Shake the screen briefly
 */
export function shakeScreen() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  document.body.classList.remove('shake');
  // Force reflow
  void document.body.offsetHeight;
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 700);
}

/**
 * Flash the Easter egg overlay, show content, then auto-dismiss
 * @param {object} egg  Easter egg data
 * @param {HTMLElement} overlay
 * @param {function} onDone  callback after overlay dismissed
 */
export function playEasterEggOverlay(egg, overlay, onDone) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const titleEl    = overlay.querySelector('.easter-egg-title');
  const subtitleEl = overlay.querySelector('.easter-egg-subtitle');

  // Format multi-line title
  titleEl.innerHTML = egg.title.replace(/\n/g, '<br>');
  subtitleEl.textContent = egg.subtitle || '';

  // Apply effect variant
  overlay.setAttribute('data-effect', egg.effect || 'flash');

  // Show overlay
  overlay.classList.add('active');

  // Effect-specific extras
  if (egg.effect === 'confetti') {
    launchConfetti();
  }

  if (!prefersReduced && (egg.effect === 'flash-blue' || egg.effect === 'flash')) {
    shakeScreen();
  }

  // Auto dismiss after 3.5 seconds
  setTimeout(() => {
    overlay.classList.remove('active');
    if (onDone) onDone();
  }, 3500);
}

/** ============================================
 *  Confetti engine (canvas-based, no library)
 *  ============================================ */
export function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#3b82f6','#7c3aed','#22c55e','#f59e0b','#ef4444','#ec4899','#06b6d4'];
  const PARTICLE_COUNT = 180;

  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: Math.random() * 10 + 5,
    h: Math.random() * 5 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: Math.random() * 3 + 2,
    angle: Math.random() * Math.PI * 2,
    spin:  (Math.random() - 0.5) * 0.2,
    drift: (Math.random() - 0.5) * 1.5,
    opacity: Math.random() * 0.5 + 0.5,
  }));

  let running = true;
  let frame = 0;

  function draw() {
    if (!running) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.y    += p.speed;
      p.x    += p.drift;
      p.angle += p.spin;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    frame++;
    if (frame < 240) { // ~4 seconds at 60fps
      requestAnimationFrame(draw);
    } else {
      running = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(draw);
}
