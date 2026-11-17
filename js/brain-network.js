document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('brain-network-container');
    if (!container) return;

    // Configuration
    const nodeCountPerHemisphere = 500; // Very dense network (1000 total)
    const nodes = [];

    // Global Cluster Storage for Animation
    const allClusters = [];

    // Create SVG Layer for Edges
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.zIndex = "1";
    svg.style.pointerEvents = "none";
    container.appendChild(svg);

    // Helpers for random range
    const rand = (min, max) => Math.random() * (max - min) + min;

    function generateHemisphere(isLeft) {
        let count = 0;

        // Brain Shape Configuration
        // Top-down view: Two kidney/semi-circle shapes facing each other
        const centerX = 50;
        const centerY = 50;

        // Bounding box (Safe margins) - CLOSER GAP (2%)
        // Left: x in [12, 49], Right: x in [51, 88]
        const minX = isLeft ? 12 : 51;
        const maxX = isLeft ? 49 : 88;
        const minY = 10;
        const maxY = 90;

        const radiusY = 38; // Tall curve

        // -- CLUSTERING LOGIC --
        // Instead of uniform random, we pick a few "centers" (functional areas)
        // and generate nodes around them.
        const numClusters = 12; // More clusters for better fill
        const hemisphereClusters = [];

        // Pick random cluster centers within the valid lobe area
        for (let i = 0; i < numClusters; i++) {
            let valid = false;
            let cx, cy;
            let attempts = 0;
            while (!valid && attempts < 100) {
                attempts++;
                cx = rand(minX, maxX);
                cy = rand(minY, maxY);

                // Shape check for cluster center
                const dy = cy - centerY;
                if (Math.abs(dy / radiusY) > 0.95) continue; // Relaxed tip check

                // Outer curve check
                const dx = cx - 50;
                const ovalRadiusX = 42;
                const ovalRadiusY = 40;
                const dist = (dx * dx) / (ovalRadiusX * ovalRadiusX) + (dy * dy) / (ovalRadiusY * ovalRadiusY);

                if (dist <= 0.95) { // Relaxed edge check
                    valid = true;
                    // Varied Density: Some dense (spread 3), some sparse (spread 8)
                    const isDense = Math.random() < 0.5;
                    const cluster = {
                        id: (isLeft ? 'L' : 'R') + i,
                        x: cx,
                        y: cy,
                        spread: isDense ? rand(2.5, 4) : rand(5, 9),
                        nodes: []
                    };
                    hemisphereClusters.push(cluster);
                    allClusters.push(cluster);
                }
            }
        }

        // Check if we accidentally bailed due to the 'return' bug I caught myself writing in thought
        // (Actually, I corrected it in the code block below to use 'continue' logic properly)

        while (count < nodeCountPerHemisphere) {
            // 1. Pick a random cluster
            if (hemisphereClusters.length === 0) break; // Safety
            const cluster = hemisphereClusters[Math.floor(Math.random() * hemisphereClusters.length)];

            // 2. Generate point with Gaussian-ish offset
            const u1 = Math.random();
            const u2 = Math.random();
            const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            const z2 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

            const x = cluster.x + z1 * cluster.spread;
            const y = cluster.y + z2 * cluster.spread;

            // 3. Clip/Validate against Brain Shape
            if (x < minX || x > maxX || y < minY || y > maxY) continue;

            const dy = y - centerY;
            const normalizedY = dy / radiusY;
            if (Math.abs(normalizedY) > 0.98) continue;

            const dx = x - 50;
            const ovalRadiusX = 42;
            const ovalRadiusY = 40;
            const dist = (dx * dx) / (ovalRadiusX * ovalRadiusX) + (dy * dy) / (ovalRadiusY * ovalRadiusY);

            if (dist <= 1.0) {
                const node = createNode(x, y, isLeft ? 'left' : 'right');
                cluster.nodes.push(node);
                count++;
            }
        }
    }

    function createNode(x, y, hemisphere) {
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('brain-node', 'dynamic-node');
        nodeElement.style.left = `${x}%`;
        nodeElement.style.top = `${y}%`;

        // Random slight delays for "breathing" effect
        // nodeElement.style.animationDelay = `${rand(0, 2)}s`; 
        // (Breathing animation not explicitly defined in CSS provided, assuming pulse handles it)

        container.appendChild(nodeElement); // Fixed bug: appended nodeElement, not node

        const nodeObj = {
            element: nodeElement,
            x: x,
            y: y,
            hemisphere: hemisphere
        };
        nodes.push(nodeObj);
        return nodeObj;
    }

    function connectNodes(n1, n2, isInterHemisphere = false) {
        const line = document.createElementNS(svgNS, "line");
        // We defer coord update to not thrash, but simplest is to just compute now
        // But better is to just set % coords directly if possible? 
        // SVG lines work better with absolute coords if nested in container.

        updateLineCoords(line, n1.element, n2.element);

        if (isInterHemisphere) {
            line.setAttribute("stroke", "rgba(255, 0, 255, 0.4)");
            line.setAttribute("stroke-width", "2");
        } else {
            line.setAttribute("stroke", "rgba(0, 242, 254, 0.5)");
            line.setAttribute("stroke-width", "1.5");
        }

        line.classList.add('brain-edge-dynamic');
        svg.appendChild(line);

        setTimeout(() => {
            line.style.opacity = '0';
            setTimeout(() => line.remove(), 500);
        }, 800 + Math.random() * 500);
    }

    function updateLineCoords(line, el1, el2) {
        const cRect = container.getBoundingClientRect();
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2 - cRect.left;
        const y1 = rect1.top + rect1.height / 2 - cRect.top;
        const x2 = rect2.left + rect2.width / 2 - cRect.left;
        const y2 = rect2.top + rect2.height / 2 - cRect.top;

        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
    }

    // --- Swarm Animation Logic ---
    function fireCluster(cluster) {
        if (!cluster || cluster.nodes.length === 0) return;

        // Select ~60% of nodes
        const ratio = 0.6;
        const fireCount = Math.floor(cluster.nodes.length * ratio);

        // Shuffle and pick
        const nodesToFire = [...cluster.nodes].sort(() => 0.5 - Math.random()).slice(0, fireCount);

        // Also connect some of them?
        // Let's create varying intensity

        nodesToFire.forEach((node, i) => {
            setTimeout(() => {
                node.element.classList.add('active-pulse');
                setTimeout(() => node.element.classList.remove('active-pulse'), 800 + Math.random() * 400);

                // Occasional connection to neighbors for "spark"
                if (Math.random() < 0.1) {
                    // find a neighbor in same cluster
                    const neighbor = cluster.nodes[Math.floor(Math.random() * cluster.nodes.length)];
                    if (neighbor !== node) {
                        connectNodes(node, neighbor, false);
                    }
                }
            }, Math.random() * 300);
        });
    }

    function runSwarmCycle() {
        // Pick a cluster
        if (allClusters.length === 0) return;
        const currentCluster = allClusters[Math.floor(Math.random() * allClusters.length)];
        fireCluster(currentCluster);

        // Schedule next fire (Communication delay)
        setTimeout(runSwarmCycle, 800 + Math.random() * 800);

        // Occasional parallel fire
        if (Math.random() < 0.3) {
            setTimeout(() => {
                const secondCluster = allClusters[Math.floor(Math.random() * allClusters.length)];
                if (secondCluster !== currentCluster) fireCluster(secondCluster);
            }, 200);
        }
    }

    // Initialize
    generateHemisphere(true); // Left
    generateHemisphere(false); // Right

    // Start Swarm
    setTimeout(runSwarmCycle, 1000);
});
