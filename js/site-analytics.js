(() => {
  'use strict';

  const bootstrap = document.getElementById('site-tag-bootstrap');
  const production = ['mindversecomputing.com', 'www.mindversecomputing.com'].includes(
    location.hostname
  );
  const domains = new Set(['fluid', 'plasma', 'matter', 'omics', 'mind', 'finance']);
  const networks = {
    'x.com': 'x',
    'www.linkedin.com': 'linkedin',
    'www.youtube.com': 'youtube',
    'www.facebook.com': 'facebook',
  };

  // Only fixed event fields are accepted. Never include form values or query strings.
  function track(event, details = {}) {
    if (!production || !bootstrap || typeof window.gtag !== 'function') return;
    const parameters = { send_to: bootstrap.dataset.googleTag };

    if (event === 'generate_lead') {
      if (!['research_inquiry', 'newsletter'].includes(details.lead_type)) return;
      parameters.lead_type = details.lead_type;
      parameters.method = 'website';
    } else if (event === 'select_content') {
      if (!domains.has(details.item_id)) return;
      if (!['hero_domain', 'modeling_workflow'].includes(details.content_type)) return;
      parameters.item_id = details.item_id;
      parameters.content_type = details.content_type;
    } else if (event === 'application_preview') {
      if (!/^usecase-[a-z0-9-]+\.jpg$/.test(details.application_id || '')) return;
      parameters.application_id = details.application_id;
    } else if (event === 'social_click') {
      if (!Object.values(networks).includes(details.network)) return;
      parameters.network = details.network;
    } else {
      return;
    }

    // A blocked or failed analytics integration must not interrupt the website.
    try {
      window.gtag('event', event, parameters);
    } catch {}
  }

  window.MindverseAnalytics = Object.freeze({ track });

  document.querySelectorAll('.footer-social a').forEach((link) => {
    link.addEventListener('click', () => {
      const network = networks[new URL(link.href).hostname];
      if (network) track('social_click', { network });
    });
  });
})();
