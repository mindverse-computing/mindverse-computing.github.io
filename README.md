# Mindverse Computing

Welcome to the **Mindverse Computing** project website. This platform showcases the potential of the Quantum Virtual Mind (QVM) through immersive visualizations and futuristic design.

## Features

### Dynamic Brain Network Visualization
The core visual element of the home section is a procedurally generated **Artificial Brain Network**. 

- **Scale**: Simulates **1000** individual neural nodes (500 per hemisphere).
- **Structure**: Uses a "D-shape" algorithm to generate two anatomically accurate hemispheres with a tight corpus callosum gap.
- **Micro-Structure**: Nodes are organized into **Hierarchical Clusters** of varied density, simulating functional lobes and regions.
- **Animation**:
  - **Swarm Firing**: Activity occurs in "swarms," where entire functional clusters light up simultaneously (~60% activation) in organic waves.
  - **Neural Communication**: "Thoughts" are visualized as activity jumping from one cluster to another across the brain.
  - **Bridge Connections**: Occasional signals cross the corpus callosum, linking the left and right hemispheres.

### Technology Stack
- **JavaScript (Vanilla)**: All network logic, clustering algorithms, and animation cycles are custom-written in `js/brain-network.js` without external dependencies.
- **SVG**: Connection lines and edges are rendered using high-performance SVG elements for crisp visuals.
- **CSS3**: Styles and glow effects are handled via `css/investor-enhancements.css`, utilizing hardware-accelerated transitions.

## Project Structure
- `index.html`: Main landing page architecture.
- `js/brain-network.js`: The "Brain Engine" responsible for node generation, clustering, and swarm interaction logic.
- `css/investor-enhancements.css`: Custom styling for the futuristic aesthetic.

## How It Works
1.  **Generation**: On load, the `generateHemisphere` function places nodes within "safe margins" defined by anatomical curves. It groups them into 24 distinct "Clusters" (12 left, 12 right).
2.  **Simulation**: The `runSwarmCycle` loop runs indefinitely. It selects a random cluster, "fires" it (visually pulsing its nodes and connecting neighbors), and then schedules the next event with a randomized "thinking" delay.
