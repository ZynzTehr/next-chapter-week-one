/**
 * Rest Easy Cleaning Co. - Main Application Logic
 * Accessible form interactions, tab handling, live pricing updates, and modal feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const homeTab = document.getElementById('tab-home');
  const officeTab = document.getElementById('tab-office');
  const homePanel = document.getElementById('panel-home');
  const officePanel = document.getElementById('panel-office');
  const cleaningForm = document.getElementById('cleaning-estimate-form');
  const submitButton = document.getElementById('btn-get-estimate');
  const estimateDialog = document.getElementById('estimate-modal');
  const dialogCloseBtn = document.getElementById('btn-close-dialog');
  const dialogDoneBtn = document.getElementById('btn-dialog-done');
  const announcer = document.getElementById('a11y-announcer');

  // Mobile Phone Action Dialog Elements
  const headerPhoneBadge = document.getElementById('header-phone-badge');
  const phoneModal = document.getElementById('phone-modal');
  const closePhoneDialogBtn = document.getElementById('btn-close-phone-dialog');
  const phoneContinueBtn = document.getElementById('btn-phone-continue');
  const phoneCallDirectBtn = document.getElementById('btn-phone-call-direct');

  // Estimate display elements
  const estimateRangeEl = document.getElementById('live-estimate-range');
  const estimateFreqEl = document.getElementById('live-frequency-note');
  const estimateBadgeEl = document.getElementById('live-discount-badge');

  // Accessibility Toolbar Buttons
  const toggleContrastBtn = document.getElementById('btn-toggle-contrast');
  const toggleTextSizeBtn = document.getElementById('btn-toggle-text-size');

  let activeMode = 'home'; // 'home' or 'office'

  /**
   * Helper: Screen Reader Announcement
   */
  function announce(message) {
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = message;
      }, 50);
    }
  }

  /**
   * 1. Accessible Tab Switching (Home vs Office)
   */
  function switchTab(mode) {
    activeMode = mode;
    const isHome = mode === 'home';

    homeTab.setAttribute('aria-selected', isHome ? 'true' : 'false');
    homeTab.tabIndex = isHome ? 0 : -1;
    homePanel.hidden = !isHome;

    officeTab.setAttribute('aria-selected', !isHome ? 'true' : 'false');
    officeTab.tabIndex = !isHome ? 0 : -1;
    officePanel.hidden = isHome;

    // Enable/disable inputs in hidden panel so standard form validation only applies to active mode
    homePanel.querySelectorAll('input, select, textarea').forEach(el => el.disabled = !isHome);
    officePanel.querySelectorAll('input, select, textarea').forEach(el => el.disabled = isHome);

    // Clear any previous validation errors when switching modes
    document.querySelectorAll('.form-group.has-error').forEach(el => el.classList.remove('has-error'));
    document.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));

    announce(`Switched to ${isHome ? 'Home' : 'Office'} cleaning estimate form.`);
    updateEstimate();
  }

  if (homeTab && officeTab) {
    homeTab.addEventListener('click', () => switchTab('home'));
    officeTab.addEventListener('click', () => switchTab('office'));

    // Keyboard navigation between tabs (WAI-ARIA pattern)
    [homeTab, officeTab].forEach((tab) => {
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const target = tab === homeTab ? officeTab : homeTab;
          target.focus();
          target.click();
        }
      });
    });
  }

  /**
   * 2. Live Estimate Calculation
   */
  function updateEstimate() {
    if (typeof EstimateCalculator === 'undefined') return;

    if (activeMode === 'home') {
      const bedrooms = document.getElementById('home-bedrooms')?.value || '2';
      const bathrooms = document.getElementById('home-bathrooms')?.value || '2';
      const serviceType = document.querySelector('input[name="home-service"]:checked')?.value || 'standard';
      const frequency = document.querySelector('input[name="home-frequency"]:checked')?.value || 'biweekly';

      const est = EstimateCalculator.calculateHome(bedrooms, bathrooms, serviceType, frequency);
      renderEstimateUI(est);
    } else {
      const sqftTier = document.getElementById('office-size')?.value || 'small';
      const restrooms = document.getElementById('office-restrooms')?.value || '2';
      const serviceType = document.querySelector('input[name="office-service"]:checked')?.value || 'standard';
      const frequency = document.querySelector('input[name="office-frequency"]:checked')?.value || 'biweekly';

      const est = EstimateCalculator.calculateOffice(sqftTier, restrooms, serviceType, frequency);
      renderEstimateUI(est);
    }
  }

  function renderEstimateUI(est) {
    if (estimateRangeEl) {
      estimateRangeEl.textContent = `$${est.minPrice} – $${est.maxPrice}`;
    }
    if (estimateFreqEl) {
      estimateFreqEl.textContent = `per visit • ${est.frequencyLabel}`;
    }
    if (estimateBadgeEl) {
      if (est.discountPercent > 0) {
        estimateBadgeEl.style.display = 'inline-flex';
        estimateBadgeEl.textContent = `${est.discountPercent}% recurring discount applied`;
      } else {
        estimateBadgeEl.style.display = 'none';
      }
    }
  }

  // Attach listeners to all inputs in both panels for live recalculation & dynamic error clearing
  if (cleaningForm) {
    cleaningForm.addEventListener('input', (e) => {
      updateEstimate();

      // Clear error state dynamically as the user fixes an invalid field
      const input = e.target;
      const group = input.closest('.form-group');
      if (group && group.classList.contains('has-error')) {
        let isNowValid = input.checkValidity() && (!input.required || input.value.trim().length > 0);
        if (input.name.includes('zip')) {
          isNowValid = /^\d{5}$/.test(input.value.trim());
        } else if (input.type === 'tel' || input.name.includes('phone')) {
          isNowValid = isValidPhoneNumber(input.value);
        }
        if (isNowValid) {
          group.classList.remove('has-error');
          input.removeAttribute('aria-invalid');
        }
      }
    });
    cleaningForm.addEventListener('change', updateEstimate);

    // Synchronize live price card back to default values whenever form resets
    cleaningForm.addEventListener('reset', () => {
      setTimeout(updateEstimate, 0);
    });
  }

  // Auto-format phone numbers on blur
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((phoneInput) => {
    phoneInput.addEventListener('blur', () => {
      if (isValidPhoneNumber(phoneInput.value)) {
        phoneInput.value = formatPhoneNumber(phoneInput.value);
      }
    });
  });

  /**
   * 3. Form Submission & Validation (Single Primary Action)
   */
  if (cleaningForm) {
    cleaningForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear existing errors
      document.querySelectorAll('.form-group.has-error').forEach(el => {
        el.classList.remove('has-error');
      });

      const activePanel = activeMode === 'home' ? homePanel : officePanel;
      const requiredInputs = activePanel.querySelectorAll('input[required], select[required]');
      let firstInvalid = null;

      requiredInputs.forEach((input) => {
        const group = input.closest('.form-group');
        let isValid = input.checkValidity();

        // Reject inputs containing only whitespace
        if (input.required && !input.value.trim()) {
          isValid = false;
        }

        // ZIP Code extra validation (5 digits)
        if (input.name.includes('zip')) {
          const zipRegex = /^\d{5}$/;
          if (!zipRegex.test(input.value.trim())) {
            isValid = false;
          }
        }

        // Phone Number validation (permissive US digit check)
        if (input.type === 'tel' || input.name.includes('phone')) {
          if (!isValidPhoneNumber(input.value)) {
            isValid = false;
          }
        }

        if (!isValid) {
          if (group) group.classList.add('has-error');
          input.setAttribute('aria-invalid', 'true');
          if (!firstInvalid) firstInvalid = input;
        } else {
          input.removeAttribute('aria-invalid');
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        announce('Please check the required fields highlighted in the form.');
        return;
      }

      // Valid: Show Estimate Summary Modal and clear input fields
      showEstimateSummary();
      cleaningForm.reset();
    });
  }

  /**
   * 4. Estimate Summary Modal
   */
  function showEstimateSummary() {
    const isHome = activeMode === 'home';
    const zipVal = isHome 
      ? document.getElementById('home-zip').value 
      : document.getElementById('office-zip').value;
    const nameVal = isHome 
      ? document.getElementById('home-name').value 
      : document.getElementById('office-name').value;
    const emailVal = isHome 
      ? document.getElementById('home-email').value 
      : document.getElementById('office-email').value;
    const phoneVal = isHome 
      ? document.getElementById('home-phone').value 
      : document.getElementById('office-phone').value;
    const notesVal = isHome 
      ? document.getElementById('home-notes').value 
      : document.getElementById('office-notes').value;

    const modalTitle = document.getElementById('modal-title');
    const modalDetailsList = document.getElementById('modal-summary-details');

    if (modalTitle) {
      modalTitle.textContent = `Your ${isHome ? 'Home' : 'Office'} Cleaning Estimate`;
    }

    if (modalDetailsList) {
      const formattedPhone = formatPhoneNumber(phoneVal);
      const rawContact = emailVal && formattedPhone 
        ? `${emailVal} • ${formattedPhone}` 
        : (formattedPhone || emailVal);

      const safeCategory = isHome ? 'Residential Home' : 'Commercial Office';
      const safeZip = escapeHTML(zipVal.trim());
      const safeRate = escapeHTML(`${estimateRangeEl.textContent} ${estimateFreqEl.textContent}`);
      const safeName = escapeHTML(nameVal.trim());
      const safeContact = escapeHTML(rawContact);

      let detailsHTML = `
        <li><span>Service Category:</span> <strong class="item-bold">${safeCategory}</strong></li>
        <li><span>Location:</span> <strong>ZIP ${safeZip}</strong></li>
        <li><span>Estimated Rate:</span> <strong class="item-bold">${safeRate}</strong></li>
        <li><span>Contact:</span> <strong>${safeName} (${safeContact})</strong></li>
      `;

      if (notesVal.trim()) {
        detailsHTML += `<li><span>Accessibility / Care Notes:</span> <em>"${escapeHTML(notesVal.trim())}"</em></li>`;
      }

      modalDetailsList.innerHTML = detailsHTML;
    }

    if (estimateDialog) {
      if (typeof estimateDialog.showModal === 'function') {
        estimateDialog.showModal();
      } else {
        estimateDialog.setAttribute('open', '');
      }
      announce('Estimate generated successfully. Modal window opened.');
      dialogCloseBtn?.focus();
    }
  }

  // Close modal via close button or Done button
  [dialogCloseBtn, dialogDoneBtn].forEach((btn) => {
    btn?.addEventListener('click', () => {
      if (typeof estimateDialog?.close === 'function') {
        estimateDialog.close();
      } else {
        estimateDialog?.removeAttribute('open');
      }
    });
  });

  // Centralized dialog 'close' event: guarantees focus return & announcement regardless of close method
  if (estimateDialog) {
    estimateDialog.addEventListener('close', () => {
      submitButton?.focus();
      announce('Estimate modal closed.');
    });

    // Close on backdrop click
    estimateDialog.addEventListener('click', (e) => {
      const rect = estimateDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        estimateDialog.close();
      }
    });
  }

  // 4b. Mobile Phone Action Modal Handler (<425px)
  if (headerPhoneBadge && phoneModal) {
    headerPhoneBadge.addEventListener('click', (e) => {
      // Intercept phone click on mobile viewports (<= 425px) to show call / continue options
      if (window.innerWidth <= 425) {
        e.preventDefault();
        if (typeof phoneModal.showModal === 'function') {
          phoneModal.showModal();
        } else {
          phoneModal.setAttribute('open', '');
        }
        announce('Call options dialog opened. Press Escape to close.');
        closePhoneDialogBtn?.focus();
      }
      // On screens > 425px, normal link navigation (tel:5553279256) is preserved
    });

    [closePhoneDialogBtn, phoneContinueBtn].forEach((btn) => {
      btn?.addEventListener('click', () => {
        if (typeof phoneModal.close === 'function') {
          phoneModal.close();
        } else {
          phoneModal.removeAttribute('open');
        }
      });
    });

    if (phoneCallDirectBtn) {
      phoneCallDirectBtn.addEventListener('click', () => {
        setTimeout(() => {
          if (typeof phoneModal.close === 'function') {
            phoneModal.close();
          }
        }, 400);
      });
    }

    phoneModal.addEventListener('close', () => {
      headerPhoneBadge?.focus();
      announce('Call options dialog closed.');
    });

    phoneModal.addEventListener('click', (e) => {
      const rect = phoneModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        if (typeof phoneModal.close === 'function') {
          phoneModal.close();
        } else {
          phoneModal.removeAttribute('open');
        }
      }
    });
  }

  /**
   * 5. Accessibility Toolbar Controls
   */
  if (toggleContrastBtn) {
    toggleContrastBtn.addEventListener('click', () => {
      const isHighContrast = document.body.classList.toggle('high-contrast');
      toggleContrastBtn.setAttribute('aria-pressed', isHighContrast ? 'true' : 'false');
      announce(`High contrast mode ${isHighContrast ? 'enabled' : 'disabled'}.`);
    });
  }

  if (toggleTextSizeBtn) {
    toggleTextSizeBtn.addEventListener('click', () => {
      const isLargeText = document.documentElement.classList.toggle('text-large');
      document.body.classList.toggle('text-large', isLargeText);
      toggleTextSizeBtn.setAttribute('aria-pressed', isLargeText ? 'true' : 'false');
      announce(`Large text mode ${isLargeText ? 'enabled' : 'disabled'}.`);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  /**
   * Helper: Validate phone number
   * Accepts standard US phone numbers: 10 digits, or 11 digits starting with 1
   * Allows optional business extensions (e.g. ext. 123, x45)
   */
  function isValidPhoneNumber(phoneStr) {
    if (!phoneStr) return false;
    const trimmed = phoneStr.trim();
    const extMatch = trimmed.match(/(?:ext\.?|x)\s*(\d+)/i);
    const mainPart = extMatch ? trimmed.slice(0, extMatch.index) : trimmed;
    const digits = mainPart.replace(/\D/g, '');

    if (digits.length === 10) {
      return digits[0] >= '2'; // North American area codes start with 2-9
    }
    if (digits.length === 11 && digits.startsWith('1')) {
      return digits[1] >= '2';
    }
    return false;
  }

  /**
   * Helper: Format phone number into (XXX) XXX-XXXX
   */
  function formatPhoneNumber(phoneStr) {
    if (!phoneStr) return '';
    const trimmed = phoneStr.trim();
    const extMatch = trimmed.match(/(?:ext\.?|x)\s*(\d+)/i);
    const mainPart = extMatch ? trimmed.slice(0, extMatch.index) : trimmed;
    let digits = mainPart.replace(/\D/g, '');

    if (digits.length === 11 && digits.startsWith('1')) {
      digits = digits.slice(1);
    }

    if (digits.length === 10) {
      const formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      return extMatch ? `${formatted} ext. ${extMatch[1]}` : formatted;
    }

    return phoneStr;
  }

  /**
   * 6. Scroll-Driven IntersectionObserver Animations
   * Animates containers into and out of view on scroll:
   * - Hero section fades in with opposing slide-ins
   * - Flex containers alternate child stagger (left / right)
   * - Column containers stagger children downward
   */
  function initScrollAnimations() {
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (motionMediaQuery.matches) {
      // Reduced motion preferred: keep static
      return;
    }

    // Enable CSS animation styles progressively
    document.documentElement.classList.add('js-ready');

    // Index children of staggered containers to compute CSS transition-delay dynamically
    const staggeredContainers = document.querySelectorAll('.io-flex-stagger, .io-col-stagger');
    staggeredContainers.forEach((container) => {
      Array.from(container.children).forEach((child, index) => {
        child.style.setProperty('--stagger-idx', index);
      });
    });

    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -400px 400px'
      };

      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // Toggle in-view class when entering or leaving viewport
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      }, observerOptions);

      const animTargets = document.querySelectorAll('.io-hero, .io-flex-stagger, .io-col-stagger');
      animTargets.forEach((target) => animationObserver.observe(target));

      // Listen for runtime changes to motion preference
      motionMediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
          animTargets.forEach((target) => {
            animationObserver.unobserve(target);
            target.classList.add('in-view');
          });
          document.documentElement.classList.remove('js-ready');
        } else {
          document.documentElement.classList.add('js-ready');
          animTargets.forEach((target) => animationObserver.observe(target));
        }
      });
    } else {
      // Fallback for environments without IntersectionObserver
      document.querySelectorAll('.io-hero, .io-flex-stagger, .io-col-stagger').forEach((el) => {
        el.classList.add('in-view');
      });
    }
  }

  // Initialize
  switchTab('home');
  initScrollAnimations();
});

