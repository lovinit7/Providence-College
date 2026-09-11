/**
 * picker.js — Native-feeling CSS scroll snap picker component
 */

export class ScrollPicker {
  /**
   * @param {HTMLElement} container - The wrapper element
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @param {number} defaultVal - Initial selected value
   */
  constructor(container, min, max, defaultVal) {
    this.container = container;
    this.min = min;
    this.max = max;
    this.currentValue = defaultVal || min;
    this.itemHeight = 48; // px - matches CSS height of item
    
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="scroll-picker-window"></div>
      <div class="scroll-picker-overlay scroll-picker-overlay-top"></div>
      <div class="scroll-picker-overlay scroll-picker-overlay-bottom"></div>
      <ul class="scroll-picker-list">
        <!-- Spacers to allow scrolling to first/last items -->
        <li class="scroll-picker-spacer"></li>
        <li class="scroll-picker-spacer"></li>
        ${this.generateItems()}
        <li class="scroll-picker-spacer"></li>
        <li class="scroll-picker-spacer"></li>
      </ul>
    `;

    this.list = this.container.querySelector('.scroll-picker-list');
    this.items = Array.from(this.list.querySelectorAll('.scroll-picker-item'));

    // Intersection Observer to highlight the active item
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove active class from all
          this.items.forEach(el => el.classList.remove('active'));
          // Add to intersecting
          entry.target.classList.add('active');
          this.currentValue = parseFloat(entry.target.dataset.value);
        }
      });
    }, {
      root: this.container,
      rootMargin: '-50% 0px -50% 0px', // Center pixel triggers it
      threshold: 0
    });

    this.items.forEach(item => this.observer.observe(item));

    // Wait a tick for layout, then scroll to default
    setTimeout(() => {
      this.scrollToValue(this.currentValue, false);
    }, 10);
  }

  generateItems() {
    let html = '';
    for (let i = this.min; i <= this.max; i++) {
      html += `<li class="scroll-picker-item" data-value="${i}">${i}</li>`;
    }
    return html;
  }

  scrollToValue(val, smooth = true) {
    const targetEl = this.items.find(el => parseFloat(el.dataset.value) === val);
    if (!targetEl) return;
    
    // The spacer elements offset the list by 2 items (96px).
    // So the item at index N needs to scroll to index N * itemHeight.
    const index = this.items.indexOf(targetEl);
    this.list.scrollTo({
      top: index * this.itemHeight,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  getValue() {
    return this.currentValue;
  }
}
