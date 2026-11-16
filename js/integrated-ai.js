(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');
  const closeMenu = () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = 'Menu +';
    document.body.classList.remove('menu-open');
    document.querySelectorAll('.domain-menu[open]').forEach(item => { item.open = false; });
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close −' : 'Menu +';
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const wasOpen = menuButton?.getAttribute('aria-expanded') === 'true';
      const openDisclosure = document.querySelector('.domain-menu[open]');
      closeMenu();
      if (wasOpen) menuButton.focus();
      else openDisclosure?.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    document.querySelectorAll('.domain-menu[open]').forEach(item => {
      if (!item.contains(event.target)) item.open = false;
    });
  });
  document.querySelectorAll('.domain-menu').forEach(item => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.domain-menu[open]').forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  document.querySelectorAll('[data-js-controls]').forEach(item => { item.hidden = false; });
  const scenes = {"fluid": {"image": "images/physics/fluid-dynamics.jpg?v=13573cdd884f", "alt": "Representative illustration of cyan fluid streamlines around a curved body", "label": "Fluid Dynamics"}, "plasma": {"image": "images/physics/plasma-dynamics.jpg?v=a26b5a8a0c38", "alt": "Representative illustration of violet toroidal plasma field lines", "label": "Plasma Dynamics"}, "matter": {"image": "images/physics/quantum-matter.jpg?v=6a05c0155b4b", "alt": "Representative illustration of an amber crystalline atomic lattice", "label": "Quantum Matter"}, "omics": {"image": "images/quantum/quantum-omics.jpg?v=425c18b72078", "alt": "Violet translucent cellular model with a luminous nucleus and molecular pathways", "label": "Quantum Virtual Omics"}, "mind": {"image": "images/quantum/quantum-mind.jpg?v=a2c933f6e285", "alt": "Blue and silver brain-shaped network of fine connections and illuminated nodes", "label": "Quantum Virtual Mind"}, "finance": {"image": "images/quantum/quantum-finance.jpg?v=8c8f5c9b6318", "alt": "Teal market-state landscape with interconnected trajectories and nodes", "label": "Quantum Virtual Finance"}};
  const workflows = {"fluid": ["Geometry, boundary conditions, fluid properties, and reference flow or thermal data.", "Flow reference modeling and classical\u2013quantum HPC, with PhysicsNeMo and PINN surrogate research.", "Compare velocity, pressure, and thermal quantities with reference solutions in a defined operating range."], "plasma": ["Geometry, operating conditions, field configurations, and diagnostic or simulation data.", "Plasma reference modeling and classical\u2013quantum HPC, with PhysicsNeMo and PINN surrogate research.", "Compare fields and transport quantities against a reference under defined boundary conditions."], "matter": ["Molecular structures, material configurations, reference calculations, and experimental observations.", "Electronic structure and material modeling in classical\u2013quantum HPC workflows, with physics-informed surrogate research.", "Evaluate predicted properties against reference calculations or measurements on held-out systems."], "omics": ["Genomics, proteomics, metabolomics, molecular features, and annotated research datasets.", "Multi-omics Hamiltonian construction, cellular state tensors, variational quantum methods, and tensor network compression.", "Held-out biological datasets, classical model comparisons, uncertainty analysis, and independent experimental follow-up where appropriate."], "mind": ["EEG, fMRI, MEG, spiking data, biosensor measurements, and annotated neural research sessions.", "Neural Hamiltonian construction, MPS / PEPS tensor networks, multimodal signal fusion, and hybrid state-evolution experiments.", "Held-out sessions and participants, classical decoding baselines, signal-quality checks, and explicit uncertainty and latency measurements."], "finance": ["Time-series prices, financial indicators, asset relationships, and defined portfolio constraints.", "Market Hamiltonian construction, tensor representations, and hybrid optimization experiments using QAOA, VQE, or quantum annealing.", "Time-ordered backtesting, classical optimization baselines, transaction-cost assumptions, and out-of-sample risk measures."]};
  document.querySelectorAll('[data-scene]').forEach(button => {
    button.addEventListener('click', () => {
      const scene = scenes[button.dataset.scene];
      const picture = document.getElementById('hero-image');
      if (!picture || !scene) return;
      picture.src = scene.image; picture.alt = scene.alt;
      document.querySelectorAll('[data-scene]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.getElementById('scene-caption').textContent = `${scene.label} · Representative illustration`;
    });
  });
  document.querySelectorAll('[data-workflow]').forEach(button => {
    button.addEventListener('click', () => {
      const workflow = workflows[button.dataset.workflow];
      if (!workflow) return;
      document.querySelectorAll('[data-workflow]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      workflow.forEach((text, index) => { document.getElementById(`workflow-${index}`).textContent = text; });
    });
  });
  const imagePreview = document.getElementById('usecase-image-preview');
  if (imagePreview && typeof imagePreview.showModal === 'function') {
    const previewMedia = document.getElementById('image-preview-media');
    let previewTrigger = null;
    document.querySelectorAll('.usecase-art-link').forEach(link => {
      link.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
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
    imagePreview.querySelector('.image-preview-close').addEventListener('click', () => imagePreview.close());
    imagePreview.addEventListener('click', event => {
      if (event.target !== imagePreview) return;
      const bounds = imagePreview.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) imagePreview.close();
    });
    imagePreview.addEventListener('close', () => {
      previewMedia.replaceChildren();
      document.body.classList.remove('image-open');
      previewTrigger?.focus();
    });
  }

  const form = document.getElementById('application-form');
  if (form) {
    const contactReady = window.MindverseContactService?.configured === true;
    form.querySelector('fieldset').disabled = !contactReady;
    const params = new URLSearchParams(location.search);
    const domainField = form.elements.namedItem('domain');
    const intentField = form.elements.namedItem('intent');
    const aliases = {'Matter':'Quantum Matter','Shared Integrated AI methods':'Shared modeling methods','Shared Quantum AI methods':'Shared modeling methods'};
    const requestedDomain = aliases[params.get('domain')] || params.get('domain');
    if ([...domainField.options].some(o => o.value === requestedDomain)) domainField.value = requestedDomain;
    if ([...intentField.options].some(o => o.value === params.get('intent'))) intentField.value = params.get('intent');
    const contexts = {"battery-materials": {"name": "battery materials", "domain": "Quantum Matter"}, "semiconductor-materials": {"name": "semiconductors and thin films", "domain": "Quantum Matter"}, "catalysts-synthesis": {"name": "catalysts and material synthesis", "domain": "Quantum Matter"}, "tokamak-plasma": {"name": "tokamak plasma", "domain": "Plasma Dynamics"}, "frc-compression": {"name": "pulsed FRC compression", "domain": "Plasma Dynamics"}, "plasma-processing": {"name": "plasma processing", "domain": "Plasma Dynamics"}, "aircraft-aerodynamics": {"name": "aircraft aerodynamics", "domain": "Fluid Dynamics"}, "automotive-aerodynamics": {"name": "automotive aerodynamics", "domain": "Fluid Dynamics"}, "high-speed-aerospace": {"name": "high-speed aerospace flow", "domain": "Fluid Dynamics"}, "finance-case-1": {"name": "Market regimes & risk", "domain": "Quantum Virtual Finance"}, "finance-case-2": {"name": "Portfolio optimization", "domain": "Quantum Virtual Finance"}, "finance-case-3": {"name": "Strategy evaluation", "domain": "Quantum Virtual Finance"}, "omics-case-1": {"name": "Cellular response models", "domain": "Quantum Virtual Omics"}, "omics-case-2": {"name": "Compound screening", "domain": "Quantum Virtual Omics"}, "omics-case-3": {"name": "Biomarkers & disease mechanisms", "domain": "Quantum Virtual Omics"}, "mind-case-1": {"name": "Neural & cognitive states", "domain": "Quantum Virtual Mind"}, "mind-case-2": {"name": "Adaptive neurofeedback", "domain": "Quantum Virtual Mind"}, "mind-case-3": {"name": "Neural interface research", "domain": "Quantum Virtual Mind"}};
    const selected = Object.hasOwn(contexts,params.get('case')) ? contexts[params.get('case')] : null;
    if (selected) {
      domainField.value = selected.domain;
      form.elements.namedItem('message').value = `I would like to discuss the ${selected.name} research application.\n\nMy research question and desired outcome:\n`;
    } else if (params.get('topic') && params.get('topic').length <= 250) {
      form.elements.namedItem('message').value = `I would like to discuss: ${params.get('topic')}\n\nMy question:\n`;
      if (!domainField.value) domainField.value = 'Shared modeling methods';
    }
    let pending = false;
    let preservedMessage = '';
    const fieldset = form.querySelector('fieldset');
    const button = form.querySelector('button[type="submit"]');
    const buttonMarkup = button.innerHTML;
    const status = document.getElementById('contact-status');
    const copyButton = document.getElementById('copy-inquiry');
    if (!contactReady) {
      status.textContent = 'The inquiry form is temporarily unavailable. Please check back soon.';
      status.dataset.state = 'unavailable';
    }
    const clearStatus = () => {
      if (pending || !contactReady) return;
      status.textContent = ''; status.removeAttribute('data-state');
      copyButton.hidden = true; copyButton.textContent = 'Copy your message';
    };
    form.addEventListener('input', clearStatus);
    form.addEventListener('change', clearStatus);
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!contactReady || pending || !form.reportValidity()) return;
      const data = new FormData(form);
      const value = key => String(data.get(key) || '').trim();
      const subject = `${intentField.selectedOptions[0].textContent} — ${value('domain')}`;
      const message = `Organization: ${value('organization') || 'Not provided'}\nDomain: ${value('domain')}\nInquiry: ${intentField.selectedOptions[0].textContent}\n\n${value('message')}`;
      const fields = {name: value('name'), email: value('email'), subject, message};
      preservedMessage = `Name: ${fields.name}\nReply address: ${fields.email}\nSubject: ${subject}\n\n${message}`;
      pending = true; fieldset.disabled = true; button.disabled = true;
      form.setAttribute('aria-busy', 'true'); button.textContent = 'Sending…';
      status.textContent = 'Sending your inquiry…'; status.dataset.state = 'pending';
      copyButton.hidden = true;
      try {
        await window.MindverseContactService.send(fields);
        status.textContent = 'Thank you. Your inquiry has been sent to our team.';
        status.dataset.state = 'success'; form.reset(); preservedMessage = '';
      } catch {
        status.textContent = 'We couldn’t confirm your inquiry. Your message has been kept. Please try again later, or copy it for your records.';
        status.dataset.state = 'error'; copyButton.hidden = false;
      } finally {
        pending = false; fieldset.disabled = false; button.disabled = false;
        button.innerHTML = buttonMarkup; form.removeAttribute('aria-busy'); status.focus();
      }
    });
    copyButton.addEventListener('click', async () => {
      try {await navigator.clipboard.writeText(preservedMessage); copyButton.textContent = 'Copied';}
      catch {copyButton.textContent = 'Your message remains in the form above';}
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
    if (!ready) note.textContent='Subscriptions are temporarily unavailable.';
    newsletter.addEventListener('input', () => {if (!pending && ready) {note.textContent='';delete note.dataset.state;}});
    newsletter.addEventListener('submit', async event => {
      event.preventDefault();
      if (!ready || pending || !newsletter.reportValidity()) return;
      const email = newsletter.elements.namedItem('email').value.trim();
      pending=true;fields.disabled=true;button.disabled=true;button.textContent='Submitting…';newsletter.setAttribute('aria-busy','true');note.textContent='Submitting your subscription request…';note.dataset.state='pending';
      try {
        await window.MindverseSubscriptionService.send(email);
        note.textContent='Thank you. Your subscription request has been submitted.';note.dataset.state='success';newsletter.reset();
      } catch {
        note.textContent='We couldn’t confirm your subscription request. Your email has been kept. Please try again later.';note.dataset.state='error';
      } finally {
        pending=false;fields.disabled=false;button.disabled=false;button.innerHTML=markup;newsletter.removeAttribute('aria-busy');
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach(item => item.textContent = new Date().getFullYear());
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
    document.documentElement.classList.add('js');
  }
})();
