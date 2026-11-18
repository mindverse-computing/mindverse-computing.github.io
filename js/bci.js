(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');
  const closeMenu = () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = 'Menu +';
    document.body.classList.remove('menu-open');
    document.querySelectorAll('.domain-menu[open]').forEach((item) => {
      item.open = false;
    });
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close −' : 'Menu +';
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const wasOpen = menuButton?.getAttribute('aria-expanded') === 'true';
      const openDisclosure = document.querySelector('.domain-menu[open]');
      closeMenu();
      if (wasOpen) menuButton.focus();
      else openDisclosure?.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', (event) => {
    document.querySelectorAll('.domain-menu[open]').forEach((item) => {
      if (!item.contains(event.target)) item.open = false;
    });
  });
  document.querySelectorAll('.domain-menu').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.domain-menu[open]').forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  const architectureMap = document.getElementById('agentome-architecture');
  architectureMap?.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    const link = event.target.closest('[data-agent-target]');
    if (!link || !architectureMap.contains(link)) return;
    const role = document.getElementById(link.dataset.agentTarget);
    if (!role || role.tagName !== 'DETAILS') return;
    event.preventDefault();
    role.open = true;
    role.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    role.querySelector('summary').focus({ preventScroll: true });
  });

  const imagePreview = document.getElementById('usecase-image-preview');
  if (imagePreview && typeof imagePreview.showModal === 'function') {
    const previewMedia = document.getElementById('image-preview-media');
    let previewTrigger = null;
    document.querySelectorAll('.usecase-art-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        event.preventDefault();
        previewTrigger = link;
        const picture = new Image();
        picture.src = link.href;
        picture.alt = link.querySelector('img').alt;
        previewMedia.replaceChildren(picture);
        document.getElementById('image-preview-title').textContent = link.dataset.previewTitle;
        document.body.classList.add('image-open');
        imagePreview.showModal();
        imagePreview.querySelector('.image-preview-close').focus();
      });
    });
    imagePreview
      .querySelector('.image-preview-close')
      .addEventListener('click', () => imagePreview.close());
    imagePreview.addEventListener('click', (event) => {
      if (event.target !== imagePreview) return;
      const bounds = imagePreview.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        imagePreview.close();
    });
    imagePreview.addEventListener('close', () => {
      previewMedia.replaceChildren();
      document.body.classList.remove('image-open');
      previewTrigger?.focus();
    });
  }

  const applicationContexts = {
    'mind-atlas': {
      title: 'Superlearning Mind Atlas',
      subject: 'Education pilot',
    },
    'learning-track': {
      title: 'Learning Track Designer',
      subject: 'Education pilot',
    },
    'state-library': {
      title: 'Cortical State Library',
      subject: 'Education pilot',
    },
    'adaptive-session': {
      title: 'Adaptive Session Engine',
      subject: 'Wellbeing product',
    },
    'sleep-guidance': {
      title: 'Sleep-Onset Guidance',
      subject: 'Wellbeing product',
    },
    'stress-tracking': {
      title: 'Stress Regulation Tracking',
      subject: 'Wellbeing product',
    },
    'longitudinal-record': {
      title: 'Longitudinal State Record',
      subject: 'Clinical research',
    },
    'perturbation-atlas': {
      title: 'Perturbation Atlas',
      subject: 'Clinical research',
    },
    'neuromodulation-planning': {
      title: 'Neuromodulation Planning',
      subject: 'Clinical research',
    },
    'focus-guide': {
      title: 'Focus Guide',
      subject: 'Education pilot',
    },
    'personalized-music': {
      title: 'Personalized Music Guide',
      subject: 'Wellbeing product',
    },
    'creative-art': {
      title: 'Creative Art Companion',
      subject: 'Wellbeing product',
    },
  };
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const ready = window.MindverseContactService?.configured === true;
    const fieldset = contactForm.querySelector('fieldset');
    fieldset.disabled = !ready;
    const parameters = new URLSearchParams(location.search);
    const subject = contactForm.elements.namedItem('subject');
    const requestedSubject = parameters.get('subject');
    if ([...subject.options].some((option) => option.value === requestedSubject))
      subject.value = requestedSubject;
    const key = parameters.get('case');
    const context = Object.hasOwn(applicationContexts, key) ? applicationContexts[key] : null;
    if (context) {
      subject.value = context.subject;
      contactForm.elements.namedItem('message').value =
        `I would like to discuss ${context.title}.\n\nMy research question and context:\n`;
    } else {
      const topic = parameters.get('topic');
      if (topic && topic.length <= 160)
        contactForm.elements.namedItem('message').value =
          `I would like to request or discuss: ${topic}\n\nMy context:\n`;
    }
    const note = document.getElementById('form-message');
    const button = contactForm.querySelector('button[type="submit"]');
    const buttonMarkup = button.innerHTML;
    const copy = document.getElementById('copy-inquiry');
    let pending = false;
    let preserved = '';
    if (!ready) {
      note.textContent = 'The inquiry form is temporarily unavailable. Please check back soon.';
      note.dataset.state = 'unavailable';
    }
    const clearStatus = () => {
      if (pending || !ready) return;
      note.textContent = '';
      delete note.dataset.state;
      copy.hidden = true;
      copy.textContent = 'Copy your message';
    };
    contactForm.addEventListener('input', clearStatus);
    contactForm.addEventListener('change', clearStatus);
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!ready || pending || !contactForm.reportValidity()) return;
      const values = new FormData(contactForm);
      const value = (key) => String(values.get(key) || '').trim();
      const fields = {
        name: value('name'),
        email: value('email'),
        subject: 'BCI — ' + value('subject'),
        message:
          'Website: Mindverse BCI\nOrganization: ' +
          (value('organization') || 'Not provided') +
          '\nInquiry: ' +
          value('subject') +
          '\n\n' +
          value('message'),
      };
      preserved =
        'Name: ' +
        fields.name +
        '\nReply address: ' +
        fields.email +
        '\nSubject: ' +
        fields.subject +
        '\n\n' +
        fields.message;
      pending = true;
      fieldset.disabled = true;
      button.disabled = true;
      button.textContent = 'Sending…';
      contactForm.setAttribute('aria-busy', 'true');
      note.textContent = 'Sending your inquiry…';
      note.dataset.state = 'pending';
      copy.hidden = true;
      try {
        await window.MindverseContactService.send(fields);
        note.textContent = 'Thank you. Your BCI inquiry has been sent to our team.';
        note.dataset.state = 'success';
        contactForm.reset();
        preserved = '';
      } catch {
        note.textContent =
          'We couldn’t confirm your inquiry. Your message has been kept. Please try again later, or copy it for your records.';
        note.dataset.state = 'error';
        copy.hidden = false;
      } finally {
        pending = false;
        fieldset.disabled = false;
        button.disabled = false;
        button.innerHTML = buttonMarkup;
        contactForm.removeAttribute('aria-busy');
        note.focus();
      }
    });
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(preserved);
        copy.textContent = 'Copied';
      } catch {
        copy.textContent = 'Your message remains in the form above';
      }
    });
  }
  const newsletter = document.getElementById('footer-subscribe-form');
  if (newsletter) {
    const ready = window.MindverseSubscriptionService?.configured === true;
    const fields = newsletter.querySelector('fieldset');
    const button = newsletter.querySelector('button[type="submit"]');
    const note = document.getElementById('subscribe-message');
    const markup = button.innerHTML;
    let pending = false;
    fields.disabled = !ready;
    if (!ready) note.textContent = 'Subscriptions are temporarily unavailable.';
    newsletter.addEventListener('input', () => {
      if (!pending && ready) {
        note.textContent = '';
        delete note.dataset.state;
      }
    });
    newsletter.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!ready || pending || !newsletter.reportValidity()) return;
      const email = newsletter.elements.namedItem('email').value.trim();
      pending = true;
      fields.disabled = true;
      button.disabled = true;
      button.textContent = 'Submitting…';
      newsletter.setAttribute('aria-busy', 'true');
      note.textContent = 'Submitting your subscription request…';
      note.dataset.state = 'pending';
      try {
        await window.MindverseSubscriptionService.send(email);
        note.textContent = 'Thank you. Your subscription request has been submitted.';
        note.dataset.state = 'success';
        newsletter.reset();
      } catch {
        note.textContent =
          'We couldn’t confirm your subscription request. Your email has been kept. Please try again later.';
        note.dataset.state = 'error';
      } finally {
        pending = false;
        fields.disabled = false;
        button.disabled = false;
        button.innerHTML = markup;
        newsletter.removeAttribute('aria-busy');
      }
    });
  }
  document
    .querySelectorAll('[data-year]')
    .forEach((item) => (item.textContent = new Date().getFullYear()));
  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
    document.documentElement.classList.add('js');
  }
})();
