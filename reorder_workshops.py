#!/usr/bin/env python3
"""
Reorders workshop cards in workshops.html to timeline priority:
Matter (QVMa, 2027) → Finance (QVF+finance cards, 2028) → Omics (QVO, 2030) → Mind (QVM, 2032)
Then generic workshops follow after.
"""

with open('workshops.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start of the workshops cards container and end (before footer area)
# Section markers found from research:
# QVM card: <!-- Workshop Card 4: QVM - Brain-Computer Interface Development -->  (lines 353-405)
# QVO card: <!-- Workshop Card 3: QVO - Drug Discovery & Genomics -->            (lines 407-459)
# Hybrid Optimization: <!-- Workshop Card 6: Hybrid Quantum-Classical Optimization --> (461-513)
# Hybrid Simulation:  <!-- Workshop Card 7: Hybrid Quantum-Classical Simulation -->  (515-567)
# QVF card: <!-- Workshop Card 8: QVF - Quantitative Finance -->                 (569-621)
# Advanced QDT: <!-- Workshop Card 5: Advanced QDT Development -->               (623-675)
# Portfolio Optimization: <!-- Workshop Card 11: Quantum Portfolio Optimization --> (677-729)
# Derivative Pricing: <!-- Workshop Card 12: Quantum Derivative Pricing -->      (731-783)
# Risk Modeling: <!-- Workshop Card 13: Quantum Risk Modeling -->                 (785-837)
# Algorithmic Trading: <!-- Workshop Card 14: Quantum Algorithmic Trading -->    (839-891)
# QVMa card: <!-- Workshop Card: QVMa - Quantum Virtual Matter -->               (893-945)
# Quantum Sensor Networks: <!-- Workshop Card: Quantum Sensor Networks & IoT --> (947-999)
# Energy Grid: <!-- Workshop Card: Quantum Energy Grid Optimization -->          (1001+)

# Strategy: Extract all cards by their comment markers, reorder the domain-specific ones,
# keep generic ones in their positions but move them after domain cards

markers = [
    "<!-- Workshop Card 4: QVM - Brain-Computer Interface Development -->",
    "<!-- Workshop Card 3: QVO - Drug Discovery & Genomics -->",
    "<!-- Workshop Card 6: Hybrid Quantum-Classical Optimization -->",
    "<!-- Workshop Card 7: Hybrid Quantum-Classical Simulation -->",
    "<!-- Workshop Card 8: QVF - Quantitative Finance -->",
    "<!-- Workshop Card 5: Advanced QDT Development -->",
    "<!-- Workshop Card 11: Quantum Portfolio Optimization -->",
    "<!-- Workshop Card 12: Quantum Derivative Pricing -->",
    "<!-- Workshop Card 13: Quantum Risk Modeling -->",
    "<!-- Workshop Card 14: Quantum Algorithmic Trading -->",
    "<!-- Workshop Card: QVMa - Quantum Virtual Matter -->",
    "<!-- Workshop Card: Quantum Sensor Networks & IoT -->",
    "<!-- Workshop Card: Quantum Energy Grid Optimization -->",
]

# Find positions of each marker
positions = []
for marker in markers:
    pos = content.find(marker)
    if pos == -1:
        print(f"WARNING: marker not found: {marker[:60]}")
        positions.append(-1)
    else:
        positions.append(pos)
        print(f"Found at {pos}: {marker[:60]}")

# Find the end of the workshops section (before the next major section)
end_marker = "<!-- CTA Section"
end_pos = content.find(end_marker)
if end_pos == -1:
    # Try alternative end markers
    end_marker = "<!-- Footer"
    end_pos = content.find(end_marker)
    if end_pos == -1:
        end_marker = "<div class=\"site-footer"
        end_pos = content.find(end_marker)
print(f"\nEnd of workshops section at: {end_pos} (marker: {end_marker})")

# Find the opening of the workshops container
# The first card starts after "<!-- Workshop Cards Section -->"
start_marker = "<!-- Workshop Cards Section -->"
start_section = content.find(start_marker)
# The actual card container starts with the padding div after this comment
# We need to find where the first <div class="row mb-5"> containing a card begins
# That's at the position of the first marker
first_card_pos = min(p for p in positions if p > 0)
print(f"First card at position: {first_card_pos}")

# Extract content before first card and after last card
before_cards = content[:first_card_pos]
after_cards = content[end_pos:]

# Now extract each card's content (from its marker start to next marker start or end)
sorted_markers_with_pos = sorted(
    [(pos, i) for i, pos in enumerate(positions) if pos >= 0],
    key=lambda x: x[0]
)

card_contents = {}
for idx, (pos, orig_idx) in enumerate(sorted_markers_with_pos):
    start = pos
    if idx + 1 < len(sorted_markers_with_pos):
        end = sorted_markers_with_pos[idx + 1][0]
    else:
        end = end_pos
    card_contents[orig_idx] = content[start:end]

# Map marker names to indices
QVM_IDX = 0    # QVM BCI workshop
QVO_IDX = 1    # QVO Omics workshop
HYBRID_OPT_IDX = 2   # Hybrid Optimization (generic)
HYBRID_SIM_IDX = 3   # Hybrid Simulation (generic)
QVF_IDX = 4    # QVF Finance workshop
ADVANCED_IDX = 5    # Advanced QDT (generic)
PORTFOLIO_IDX = 6   # Portfolio Optimization (finance-related)
DERIVATIVE_IDX = 7  # Derivative Pricing (finance-related)
RISK_IDX = 8        # Risk Modeling (finance-related)
TRADING_IDX = 9     # Algorithmic Trading (finance-related)
QVMA_IDX = 10   # QVMa Matter workshop
SENSOR_IDX = 11 # Sensor Networks (generic)
ENERGY_IDX = 12 # Energy Grid (generic)

# New desired order:
# 1. QVMa (Matter, 2027) - FIRST
# 2. QVF (Finance, 2028) + finance-related cards
# 3. QVO (Omics, 2030)
# 4. QVM (Mind, 2032)
# 5. Generic workshops (Hybrid Opt, Hybrid Sim, Advanced QDT, Sensor, Energy)
new_order = [
    QVMA_IDX,       # 1. Matter (2027)
    QVF_IDX,        # 2. Finance (2028)
    PORTFOLIO_IDX,  # 2b. Portfolio (finance-related)
    DERIVATIVE_IDX, # 2c. Derivatives (finance-related)
    RISK_IDX,       # 2d. Risk (finance-related)
    TRADING_IDX,    # 2e. Trading (finance-related)
    QVO_IDX,        # 3. Omics (2030)
    QVM_IDX,        # 4. Mind (2032)
    HYBRID_OPT_IDX, # 5a. Generic
    HYBRID_SIM_IDX, # 5b. Generic
    ADVANCED_IDX,   # 5c. Generic
    SENSOR_IDX,     # 5d. Generic
    ENERGY_IDX,     # 5e. Generic
]

# Build new middle section
middle = ''.join(card_contents[i] for i in new_order if i in card_contents)

new_content = before_cards + middle + after_cards

with open('workshops.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("\n✅ workshops.html reordered successfully!")
print("New workshop order:")
for rank, idx in enumerate(new_order, 1):
    if idx in card_contents:
        snippet = markers[idx][:70]
        print(f"  {rank}. {snippet}")
