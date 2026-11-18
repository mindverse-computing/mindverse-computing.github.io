(() => {
  'use strict';
  const root = document.getElementById('agentome-architecture');
  if (!root) return;
  const svg = root.querySelector('[data-agentome-canvas]');
  const selector = root.querySelector('[data-agentome-selector]');
  const title = root.querySelector('[data-agentome-title]');
  const description = root.querySelector('[data-agentome-description]');
  const badge = root.querySelector('[data-agentome-badge]');
  const detailLink = root.querySelector('[data-agentome-detail]');
  const expandButton = root.querySelector('[data-agentome-expand]');
  const viewport = root.querySelector('[data-agentome-viewport]');
  const layerButtons = [...root.querySelectorAll('[data-agentome-layer]')];
  const NS = 'http://www.w3.org/2000/svg';
  const C = { core: '#82d9ed', backend: '#94baff', frontend: '#a2e1c5', users: '#a2e1c5' };
  const nodes = [
    {
      id: 'core',
      title: 'Large Physics Model core',
      lines: ['LPMs'],
      layer: 'core',
      x: 450,
      y: 355,
      target: 'core',
      description:
        'Structure-preserving models track neural states, forecast neural-field dynamics, and continually personalize from incoming recordings.',
    },
    {
      id: 'data-steward',
      title: 'Data steward',
      lines: ['Data', 'steward'],
      layer: 'backend',
      x: 515,
      y: 198,
      tx: 515,
      ty: 225,
      anchor: 'middle',
      description:
        'Keep recording provenance, permitted uses, and subject/session identity attached to the data.',
    },
    {
      id: 'record-keeper',
      title: 'Record keeper',
      lines: ['Record', 'keeper'],
      layer: 'backend',
      x: 607,
      y: 290,
      tx: 635,
      ty: 275,
      anchor: 'start',
      description:
        'Organize datasets, experiments, model versions, evaluation reports, and review decisions.',
    },
    {
      id: 'model-builder',
      title: 'Model builder',
      lines: ['Model', 'builder'],
      layer: 'backend',
      x: 607,
      y: 420,
      tx: 635,
      ty: 405,
      anchor: 'start',
      description:
        'Train and continually adapt candidate personal models from eligible recordings.',
    },
    {
      id: 'signal-engineer',
      title: 'Signal engineer',
      lines: ['Signal', 'engineer'],
      layer: 'backend',
      x: 515,
      y: 512,
      tx: 515,
      ty: 545,
      anchor: 'middle',
      description:
        'Prepare recordings, harmonize acquisition metadata, and flag artifacts or missing data.',
    },
    {
      id: 'monitoring-agent',
      title: 'Monitoring agent',
      lines: ['Monitoring', 'agent'],
      layer: 'backend',
      x: 385,
      y: 512,
      tx: 385,
      ty: 545,
      anchor: 'middle',
      description:
        'Watch recording quality, acquisition drift, model performance, and deployment health.',
    },
    {
      id: 'deployment-coordinator',
      title: 'Deployment coordinator',
      lines: ['Deployment', 'coordinator'],
      layer: 'backend',
      x: 293,
      y: 420,
      tx: 265,
      ty: 405,
      anchor: 'end',
      description:
        'Promote accepted versions, organize serving configurations, and retain rollback paths.',
    },
    {
      id: 'perturbation-analyst',
      title: 'Perturbation analyst',
      lines: ['Perturbation', 'analyst'],
      layer: 'backend',
      x: 293,
      y: 290,
      tx: 265,
      ty: 275,
      anchor: 'end',
      description:
        'Compare trajectories, personal references, and parameter sensitivity with assumptions retained.',
    },
    {
      id: 'consistency-checker',
      title: 'Consistency checker',
      lines: ['Consistency', 'checker'],
      layer: 'backend',
      x: 385,
      y: 198,
      tx: 385,
      ty: 225,
      anchor: 'middle',
      description:
        'Check evaluation criteria, regressions, competing interpretations, and unsupported conclusions.',
    },
    {
      id: 'user-support-guide',
      title: 'User support guide',
      lines: ['User support', 'guide'],
      layer: 'frontend',
      x: 669,
      y: 136,
      tx: 696,
      ty: 122,
      anchor: 'start',
      description:
        'Help users get started, explain outputs, answer questions, and collect goals and preferences.',
    },
    {
      id: 'track-designer',
      title: 'Track designer',
      lines: ['Track', 'designer'],
      layer: 'frontend',
      x: 669,
      y: 574,
      tx: 696,
      ty: 560,
      anchor: 'start',
      description:
        'Guide learning and focus sessions, explaining pacing and break choices using task history and evaluated outputs.',
    },
    {
      id: 'creative-restoration-guide',
      title: 'Creative & restoration guide',
      lines: ['Creative &', 'restoration guide'],
      layer: 'frontend',
      x: 231,
      y: 574,
      tx: 204,
      ty: 560,
      anchor: 'end',
      description:
        'Support meditation, personalized music, art, and restorative sessions with user preferences and feedback.',
    },
    {
      id: 'intervention-planner',
      title: 'Intervention planner',
      lines: ['Intervention', 'planner'],
      layer: 'frontend',
      x: 231,
      y: 136,
      tx: 204,
      ty: 122,
      anchor: 'end',
      description:
        'Help investigators organize mental-health and neurological research comparisons and evidence-linked proposals.',
    },
  ];
  nodes.push({
    id: 'users',
    title: 'Users & investigators',
    lines: ['Users & investigators'],
    layer: 'users',
    x: 450,
    y: 735,
    tx: 450,
    ty: 773,
    anchor: 'middle',
    target: 'frontend-agents',
    description:
      'Users and investigators share goals, preferences, recordings, and feedback with all four frontend agents. Those agents explain outputs, guide experiences, and support investigator-led research.',
  });
  nodes.forEach((node) => {
    if (!node.target) node.target = 'agent-' + node.id;
  });
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const coreRoutes = {
    'data-steward': [
      [515, 198],
      [515, 240],
      [474, 240],
      [474, 274],
    ],
    'record-keeper': [
      [607, 290],
      [565, 290],
      [565, 332],
      [532, 332],
    ],
    'model-builder': [
      [607, 420],
      [565, 420],
      [565, 378],
      [532, 378],
    ],
    'signal-engineer': [
      [515, 512],
      [515, 470],
      [474, 470],
      [474, 436],
    ],
    'monitoring-agent': [
      [385, 512],
      [385, 470],
      [426, 470],
      [426, 436],
    ],
    'deployment-coordinator': [
      [293, 420],
      [335, 420],
      [335, 378],
      [368, 378],
    ],
    'perturbation-analyst': [
      [293, 290],
      [335, 290],
      [335, 332],
      [368, 332],
    ],
    'consistency-checker': [
      [385, 198],
      [385, 240],
      [426, 240],
      [426, 274],
    ],
  };
  const edges = Object.entries(coreRoutes).map(([id, points]) => ({
    from: id,
    to: 'core',
    points,
  }));
  edges.push(
    {
      from: 'user-support-guide',
      to: 'data-steward',
      points: [
        [669, 136],
        [669, 165],
        [560, 165],
        [560, 198],
        [515, 198],
      ],
    },
    {
      from: 'user-support-guide',
      to: 'record-keeper',
      points: [
        [669, 136],
        [690, 136],
        [690, 253],
        [607, 253],
        [607, 290],
      ],
    },
    {
      from: 'track-designer',
      to: 'model-builder',
      points: [
        [669, 574],
        [690, 574],
        [690, 457],
        [607, 457],
        [607, 420],
      ],
    },
    {
      from: 'track-designer',
      to: 'signal-engineer',
      points: [
        [669, 574],
        [669, 545],
        [560, 545],
        [560, 512],
        [515, 512],
      ],
    },
    {
      from: 'creative-restoration-guide',
      to: 'monitoring-agent',
      points: [
        [231, 574],
        [231, 545],
        [340, 545],
        [340, 512],
        [385, 512],
      ],
    },
    {
      from: 'creative-restoration-guide',
      to: 'deployment-coordinator',
      points: [
        [231, 574],
        [210, 574],
        [210, 457],
        [293, 457],
        [293, 420],
      ],
    },
    {
      from: 'intervention-planner',
      to: 'perturbation-analyst',
      points: [
        [231, 136],
        [210, 136],
        [210, 253],
        [293, 253],
        [293, 290],
      ],
    },
    {
      from: 'intervention-planner',
      to: 'consistency-checker',
      points: [
        [231, 136],
        [231, 165],
        [340, 165],
        [340, 198],
        [385, 198],
      ],
    },
    {
      from: 'creative-restoration-guide',
      to: 'users',
      points: [
        [231, 574],
        [231, 660],
        [395, 660],
        [395, 735],
        [450, 735],
      ],
    },
    {
      from: 'track-designer',
      to: 'users',
      points: [
        [669, 574],
        [669, 660],
        [505, 660],
        [505, 735],
        [450, 735],
      ],
    }
  );
  // Both upper frontend agents also reach the users through dedicated outer buses.
  edges.push(
    {
      from: 'user-support-guide',
      to: 'users',
      points: [
        [669, 136],
        [890, 136],
        [890, 706],
        [562, 706],
        [562, 735],
        [450, 735],
      ],
    },
    {
      from: 'intervention-planner',
      to: 'users',
      points: [
        [231, 136],
        [10, 136],
        [10, 706],
        [338, 706],
        [338, 735],
        [450, 735],
      ],
    }
  );
  const layerCopy = {
    all: [
      'Agentome',
      'A personal LPM core, autonomous backend operations, and frontend agents supporting users. Select a dot or name to explore its role.',
      'The integrated stack',
      'agents',
    ],
    core: ['Large Physics Model core', nodes[0].description, 'Model core', 'core'],
    backend: [
      'Backend agents',
      'Manage data, signals, model training, evaluation, records, deployment, and monitoring behind the scenes.',
      'Autonomous operations',
      'backend-agents',
    ],
    frontend: [
      'Frontend agents',
      'Support users and guide learning, focus, creative restoration, and investigator-led research.',
      'Supportive experiences',
      'frontend-agents',
    ],
  };
  let selected = null;
  let hovered = null;
  let layer = 'all';
  const nodeElements = new Map();
  const edgeElements = [];
  function element(tag, attributes = {}, text) {
    const item = document.createElementNS(NS, tag);
    Object.entries(attributes).forEach(([key, value]) => item.setAttribute(key, String(value)));
    if (text !== undefined) item.textContent = text;
    return item;
  }
  function label(parent, x, y, lines, attributes = {}) {
    const text = element('text', { x, y, 'text-anchor': 'middle', ...attributes });
    lines.forEach((line, index) =>
      text.appendChild(element('tspan', { x, dy: index ? 23 : 0 }, line))
    );
    parent.appendChild(text);
  }
  function redrawState() {
    const emphasis = hovered || selected;
    nodeElements.forEach((item, id) => {
      item.classList.toggle('is-selected', id === selected);
      item.classList.toggle('is-highlighted', id === emphasis);
      const nodeLayer = byId.get(id).layer;
      const visibleInLayer =
        layer === 'all' || nodeLayer === layer || (layer === 'frontend' && nodeLayer === 'users');
      item.classList.toggle('is-muted', !visibleInLayer);
      item.setAttribute('aria-pressed', String(id === selected));
    });
    edgeElements.forEach(({ item, edge }) => {
      const related = emphasis && (edge.from === emphasis || edge.to === emphasis);
      const inLayer =
        layer === 'all' || [edge.from, edge.to].some((id) => byId.get(id)?.layer === layer);
      item.classList.toggle('is-related', Boolean(related));
      item.classList.toggle('is-muted', !inLayer || Boolean(emphasis && !related));
    });
  }
  function showLayer(next) {
    layer = next;
    selected = null;
    hovered = null;
    selector.value = '';
    layerButtons.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.agentomeLayer === next))
    );
    const copy = layerCopy[next];
    title.textContent = copy[0];
    description.textContent = copy[1];
    badge.textContent = copy[2];
    detailLink.setAttribute('href', '#' + copy[3]);
    detailLink.removeAttribute('data-agent-target');
    detailLink.textContent = next === 'all' ? 'Explore the roles below ↘' : 'Read more below ↘';
    redrawState();
  }
  function selectNode(id) {
    const node = byId.get(id);
    if (!node) return;
    selected = id;
    hovered = null;
    layer = 'all';
    selector.value = id;
    layerButtons.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.agentomeLayer === 'all'))
    );
    title.textContent = node.title;
    description.textContent = node.description;
    badge.textContent =
      node.layer === 'core'
        ? 'Model core'
        : node.layer === 'backend'
          ? 'Backend agent'
          : node.layer === 'users'
            ? 'People & feedback'
            : 'Frontend agent';
    detailLink.setAttribute('href', '#' + node.target);
    if (node.layer === 'core' || node.layer === 'users')
      detailLink.removeAttribute('data-agent-target');
    else detailLink.setAttribute('data-agent-target', node.target);
    detailLink.textContent =
      node.layer === 'core'
        ? 'Explore the LPM core ↘'
        : node.layer === 'users'
          ? 'Explore frontend support ↘'
          : 'Open full role ↘';
    redrawState();
  }
  // The reference uses narrow necks with wider, returned T-shaped caps on all four sides.
  const enclosure = element('g', { class: 'agentome-enclosure', 'aria-hidden': 'true' });
  const left = -30,
    right = 930,
    top = -50,
    bottom = 830;
  const cx = 450,
    cy = 390;
  const neck = 64,
    capX = (right - left) / 4,
    capY = (bottom - top) / 4,
    neckDepth = 40,
    totalDepth = neckDepth + 22;
  const wall = [
    [left, top],
    [cx - neck, top],
    [cx - neck, top - neckDepth],
    [cx - capX, top - neckDepth],
    [cx - capX, top - totalDepth],
    [cx + capX, top - totalDepth],
    [cx + capX, top - neckDepth],
    [cx + neck, top - neckDepth],
    [cx + neck, top],
    [right, top],
    [right, cy - neck],
    [right + neckDepth, cy - neck],
    [right + neckDepth, cy - capY],
    [right + totalDepth, cy - capY],
    [right + totalDepth, cy + capY],
    [right + neckDepth, cy + capY],
    [right + neckDepth, cy + neck],
    [right, cy + neck],
    [right, bottom],
    [cx + neck, bottom],
    [cx + neck, bottom + neckDepth],
    [cx + capX, bottom + neckDepth],
    [cx + capX, bottom + totalDepth],
    [cx - capX, bottom + totalDepth],
    [cx - capX, bottom + neckDepth],
    [cx - neck, bottom + neckDepth],
    [cx - neck, bottom],
    [left, bottom],
    [left, cy + neck],
    [left - neckDepth, cy + neck],
    [left - neckDepth, cy + capY],
    [left - totalDepth, cy + capY],
    [left - totalDepth, cy - capY],
    [left - neckDepth, cy - capY],
    [left - neckDepth, cy - neck],
    [left, cy - neck],
  ];
  function outwardNormal(a, b) {
    const dx = b[0] - a[0],
      dy = b[1] - a[1];
    const length = Math.hypot(dx, dy);
    return [dy / length, -dx / length];
  }
  [0, 4, 8].forEach((offset) => {
    // Offset adjoining edges along their true normals, including the returned corners.
    // This keeps the three traces parallel through each T-shaped handle.
    const points = wall.map((point, index) => {
      const previous = wall[(index + wall.length - 1) % wall.length];
      const next = wall[(index + 1) % wall.length];
      const before = outwardNormal(previous, point);
      const after = outwardNormal(point, next);
      return [
        point[0] + offset * (before[0] + after[0]),
        point[1] + offset * (before[1] + after[1]),
      ];
    });
    points.push(points[0]);
    enclosure.appendChild(
      element('polyline', {
        points: points.map(([x, y]) => `${x},${y}`).join(' '),
        class: 'agentome-enclosure-trace',
      })
    );
  });
  svg.appendChild(enclosure);
  const background = element('g', { class: 'agentome-circuit-rings', 'aria-hidden': 'true' });
  [
    [330, 'frontend'],
    [210, 'backend'],
    [85, 'core'],
  ].forEach(([radius, name]) =>
    background.appendChild(
      element('circle', { cx: 450, cy: 355, r: radius, class: 'agentome-ring ' + name })
    )
  );
  svg.appendChild(background);
  const wiring = element('g', { 'aria-hidden': 'true' });
  edges.forEach((edge) => {
    const group = element('g', {
      class: 'agentome-circuit-trace',
      'data-from': edge.from,
      'data-to': edge.to,
    });
    [-2, 2].forEach((offset) =>
      group.appendChild(
        element('polyline', {
          points: edge.points.map(([x, y]) => `${x + offset},${y + offset}`).join(' '),
          class: 'agentome-wire',
        })
      )
    );
    edge.points
      .slice(1, -1)
      .forEach(([x, y]) =>
        group.appendChild(element('circle', { cx: x, cy: y, r: 1.4, class: 'agentome-via' }))
      );
    if (edge.to === 'users') {
      group.classList.toggle('agentome-user-connection', true);
      group.appendChild(
        element('polyline', {
          points: edge.points.map(([x, y]) => `${x},${y}`).join(' '),
          class: 'agentome-user-wire-hit',
        })
      );
      group.addEventListener('pointerenter', () => {
        hovered = 'users';
        redrawState();
      });
      group.addEventListener('pointerleave', () => {
        hovered = null;
        redrawState();
      });
      group.addEventListener('click', () => selectNode('users'));
    }
    wiring.appendChild(group);
    edgeElements.push({ item: group, edge });
  });
  svg.appendChild(wiring);
  const captions = element('g', { class: 'agentome-circuit-labels', 'aria-hidden': 'true' });
  const labelPaths = element('defs');
  function circularLayerLabel(radius, name, id, color) {
    const diagonal = radius * Math.SQRT1_2;
    labelPaths.appendChild(
      element('path', {
        id,
        d: `M ${450 - diagonal},${355 - diagonal} A ${radius},${radius} 0 0 1 ${450 + diagonal},${355 - diagonal}`,
      })
    );
    const text = element('text', {
      fill: color,
      class: 'agentome-ring-label',
      'text-anchor': 'middle',
    });
    text.appendChild(element('textPath', { href: '#' + id, startOffset: '50%' }, name));
    captions.appendChild(text);
  }
  circularLayerLabel(310, 'FRONTEND AGENTS', 'agentome-frontend-label-arc', C.frontend);
  circularLayerLabel(195, 'BACKEND AGENTS', 'agentome-backend-label-arc', C.backend);
  svg.appendChild(labelPaths);
  svg.appendChild(captions);
  nodes.forEach((node) => {
    const group = element('g', {
      class: 'agentome-circuit-node ' + node.layer,
      role: 'button',
      tabindex: 0,
      'aria-label': node.title,
      'aria-pressed': 'false',
      'data-node-id': node.id,
    });
    group.appendChild(element('title', {}, node.title));
    if (node.layer === 'core') {
      group.appendChild(element('circle', { cx: 450, cy: 355, r: 85, class: 'agentome-core-hit' }));
      label(group, 450, 350, ['LPMs'], { class: 'agentome-core-name' });
      label(group, 450, 379, ['Personal model core'], { class: 'agentome-core-subtitle' });
    } else {
      group.appendChild(
        element('circle', { cx: node.x, cy: node.y, r: 13, class: 'agentome-node-hit' })
      );
      group.appendChild(
        element('circle', {
          cx: node.x,
          cy: node.y,
          r: 4.6,
          class: 'agentome-agent-dot',
          fill: C[node.layer],
        })
      );
      label(group, node.tx, node.ty, node.lines, {
        class:
          node.layer === 'users'
            ? 'agentome-agent-name agentome-users-label'
            : 'agentome-agent-name',
        'text-anchor': node.anchor,
      });
      if (node.layer === 'users')
        label(group, 450, 804, ['Goals · Preferences · Recordings · Feedback'], {
          class: 'agentome-user-context',
        });
    }
    group.addEventListener('click', () => selectNode(node.id));
    group.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      selectNode(node.id);
    });
    group.addEventListener('pointerenter', () => {
      hovered = node.id;
      redrawState();
    });
    group.addEventListener('pointerleave', () => {
      hovered = null;
      redrawState();
    });
    svg.appendChild(group);
    nodeElements.set(node.id, group);
    const option = document.createElement('option');
    option.value = node.id;
    option.textContent = node.title;
    selector.appendChild(option);
  });
  layerButtons.forEach((button) =>
    button.addEventListener('click', () => showLayer(button.dataset.agentomeLayer))
  );
  selector.addEventListener('change', () =>
    selector.value ? selectNode(selector.value) : showLayer('all')
  );
  expandButton.addEventListener('click', () => {
    const expanded = expandButton.getAttribute('aria-pressed') !== 'true';
    expandButton.setAttribute('aria-pressed', String(expanded));
    root.classList.toggle('is-expanded', expanded);
    expandButton.textContent = expanded ? 'Compact view −' : 'Enlarge diagram +';
    if (expanded)
      viewport.scrollLeft = Math.max(
        0,
        (svg.getBoundingClientRect().width - viewport.clientWidth) / 2
      );
  });
  showLayer('all');
})();
