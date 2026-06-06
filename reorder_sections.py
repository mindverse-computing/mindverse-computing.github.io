#!/usr/bin/env python3
"""
Reorders domain sections in Mindverse Computing HTML pages to timeline priority:
Matter (QVMa, 2027) → Finance (QVF, 2028) → Omics (QVO, 2030) → Mind (QVM, 2032)
"""
import re

def reorder_sections(filepath, section_markers):
    """
    Reads file, extracts sections by their start markers, reorders them, writes back.
    section_markers: list of (start_comment, end_comment_before_next_or_footer) tuples in DESIRED order
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    return content

def extract_and_reorder(filepath, sections_in_file, new_order, after_last_section_start_marker):
    """
    Extract sections between markers and reorder them.
    sections_in_file: list of section comment strings as they appear in the file
    new_order: indices into sections_in_file for the desired order (0-indexed)
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find positions of each section comment
    positions = []
    for i, marker in enumerate(sections_in_file):
        pos = content.find(marker)
        if pos == -1:
            raise ValueError(f"Marker not found: {marker!r}")
        positions.append(pos)
    
    # Sort sections by their position to extract them in order
    sorted_sections = sorted(zip(positions, sections_in_file, range(len(sections_in_file))), key=lambda x: x[0])
    
    # Extract each section's content
    section_contents = {}
    for idx, (pos, marker, orig_idx) in enumerate(sorted_sections):
        start = pos
        if idx + 1 < len(sorted_sections):
            end = sorted_sections[idx + 1][0]
        else:
            end = content.find(after_last_section_start_marker)
        section_contents[orig_idx] = content[start:end]
    
    # Build the reordered middle part
    first_section_pos = sorted_sections[0][0]
    last_section_end = content.find(after_last_section_start_marker)
    
    before = content[:first_section_pos]
    after = content[last_section_end:]
    
    middle = ''.join(section_contents[i] for i in new_order)
    
    new_content = before + middle + after
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ Reordered {filepath}")
    
    # Verify order
    for i, new_idx in enumerate(new_order):
        marker = sections_in_file[new_idx]
        pos = new_content.find(marker)
        print(f"  Section {i+1}: {marker[:50].strip()} at position {pos}")


# ============================================================
# PLATFORM.HTML
# Order: QVMa (2027) → QVF (2028) → QVO (2030) → QVM (2032)
# ============================================================
platform_sections = [
    "<!------------QVM Section",       # index 0
    "<!------------QVO Section",       # index 1
    "<!------------QVF Section",       # index 2
    "<!------------QVMa Section",      # index 3
]
# new_order: [3, 2, 1, 0] = QVMa, QVF, QVO, QVM
extract_and_reorder(
    "platform.html",
    platform_sections,
    new_order=[3, 2, 1, 0],
    after_last_section_start_marker="<!------------Footer"
)

# ============================================================
# SERVICES.HTML  
# Order: QVMa (2027) → QVF (2028) → QVO (2030) → QVM (2032)
# ============================================================
services_sections = [
    "<!------------QVM Capability Section",    # index 0
    "<!------------QVO Capability Section",    # index 1
    "<!------------QVF Capability Section",    # index 2
    "<!------------QVMa Capability Section",   # index 3
]
extract_and_reorder(
    "services.html",
    services_sections,
    new_order=[3, 2, 1, 0],
    after_last_section_start_marker="<!------------------------END Services"
)

# ============================================================
# INDEX.HTML - Four Domains Preview Cards (horizontal row)
# Order: QVMa (Matter, 2027) → QVF (Finance, 2028) → QVO (Omics, 2030) → QVM (Mind, 2032)
# The cards are inside: <div class="row mt-5">
# ============================================================
index_sections = [
    "<!-- QVM Card -->",    # index 0
    "<!-- QVO Card -->",    # index 1
    "<!-- QVF Card -->",    # index 2
    "<!-- QVMa Card -->",   # index 3
]
extract_and_reorder(
    "index.html",
    index_sections,
    new_order=[3, 2, 1, 0],
    after_last_section_start_marker="<!------------QDT Development Timeline Section"
)

print("\n✅ All files reordered successfully!")
print("New order in all pages: Matter (2027) → Finance (2028) → Omics (2030) → Mind (2032)")
