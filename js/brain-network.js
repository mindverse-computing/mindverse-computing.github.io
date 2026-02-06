document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('brain-network-container');
    if (!container) return;

    // Configuration
    const nodeCount = 10;
    const nodes = [];
    const edges = [];

    // Approximate positions to form a "brain-like" text cloud shape
    // Coordinates in % (x, y) relative to container (300px x 200px)
    const brainPositions = [
        { x: 30, y: 20 }, { x: 50, y: 15 }, { x: 70, y: 20 }, // Top Lobe
        { x: 20, y: 40 }, { x: 40, y: 45 }, { x: 60, y: 45 }, { x: 80, y: 40 }, // Middle
        { x: 35, y: 70 }, { x: 50, y: 75 }, { x: 65, y: 70 }  // Bottom Lobe
    ];

    // Create SVG Layer for Edges
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.zIndex = "1";
    svg.style.pointerEvents = "none"; // Let clicks pass through
    container.appendChild(svg);

    // Create Nodes
    brainPositions.forEach((pos, index) => {
        const node = document.createElement('div');
        node.classList.add('brain-node', 'dynamic-node');
        node.style.left = `${pos.x}%`;
        node.style.top = `${pos.y}%`;
        node.dataset.index = index;

        container.appendChild(node);
        nodes.push({ element: node, x: pos.x, y: pos.y, active: false });
    });

    // Dynamic Logic
    function connectNodes(idx1, idx2) {
        const n1 = nodes[idx1];
        const n2 = nodes[idx2];

        const line = document.createElementNS(svgNS, "line");
        // Convert % to approximate coords for SVG (container is relative)
        // We'll trust the browser to map % attributes if we use standard separate line logic or just get bounding rects
        // Better to use getBoundingClientRect for line coords to be precise, 
        // BUT since container size is fixed in CSS, we can use percentages if we scale.
        // Let's use getBoundingClientRect for robustness.

        updateLineCoords(line, n1.element, n2.element);

        line.setAttribute("stroke", "rgba(0, 242, 254, 0.6)");
        line.setAttribute("stroke-width", "2");
        line.classList.add('brain-edge-dynamic');

        svg.appendChild(line);

        // Remove line after animation
        setTimeout(() => {
            line.style.opacity = '0';
            setTimeout(() => line.remove(), 500); // Wait for CSS transition
        }, 1500 + Math.random() * 1000); // 1.5s - 2.5s duration
    }

    function updateLineCoords(line, el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2 - cRect.left;
        const y1 = rect1.top + rect1.height / 2 - cRect.top;
        const x2 = rect2.left + rect2.width / 2 - cRect.left;
        const y2 = rect2.top + rect2.height / 2 - cRect.top;

        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
    }

    function impulse() {
        // 1. Pick a random source node
        const sourceIdx = Math.floor(Math.random() * nodes.length);
        const sourceNode = nodes[sourceIdx];

        // Glow source
        sourceNode.element.classList.add('active-pulse');
        setTimeout(() => sourceNode.element.classList.remove('active-pulse'), 1000);

        // 2. Decide how many connections (1-3)
        const connectionCount = 1 + Math.floor(Math.random() * 2);

        for (let i = 0; i < connectionCount; i++) {
            // Pick a random target (not self, prefer closer nodes?)
            // For toy network, just random other node is fine
            let targetIdx;
            do {
                targetIdx = Math.floor(Math.random() * nodes.length);
            } while (targetIdx === sourceIdx);

            const targetNode = nodes[targetIdx];

            // Glow target slightly later
            setTimeout(() => {
                targetNode.element.classList.add('active-pulse');
                setTimeout(() => targetNode.element.classList.remove('active-pulse'), 1000);
            }, 300);

            // Connect
            connectNodes(sourceIdx, targetIdx);
        }
    }

    // Start Simulation
    setInterval(impulse, 800); // New impulse every 800ms

    // Initial impulse
    impulse();

});
