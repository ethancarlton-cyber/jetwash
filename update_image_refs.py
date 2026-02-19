#!/usr/bin/env python3
"""
Update HTML image references to use WebP versions.
"""

from pathlib import Path
import re

base_dir = Path(__file__).parent

# Image files we converted to WebP (without path prefix)
converted_images = [
    "hero-banner.png",
    "hero-driveway.png",
    "logo.png",
    "og-image.jpg",
    "service-block-paving.png",
    "service-commercial.png",
    "service-decking.png",
    "service-driveway.png",
    "service-patio.png",
    "service-render.png",
    "before-after/block-paving-before-after.png",
    "before-after/decking-before-after.png",
    "before-after/driveway-before-after.png",
    "before-after/patio-before-after.png",
    "before-after/render-before-after.png",
    "branding/hero-banner-1920x400.png",
    "branding/logo-512x512.png",
]

def update_html_file(html_path):
    """Update image references in a single HTML file."""
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # Replace each image reference
    for img in converted_images:
        img_name = Path(img).name
        img_base = Path(img).stem
        old_ext = Path(img).suffix

        # Pattern matches: images/hero-banner.png or ../images/hero-banner.png, etc.
        # Also matches og-image.jpg in meta tags
        patterns = [
            (f'{img}', f'{Path(img).with_suffix(".webp")}'),
            (f'images/{img_name}', f'images/{img_base}.webp'),
            (f'/images/{img_name}', f'/images/{img_base}.webp'),
        ]

        for old_pattern, new_pattern in patterns:
            if old_pattern in content:
                content = content.replace(old_pattern, new_pattern)
                if old_pattern not in [c[0] for c in changes]:
                    changes.append((old_pattern, new_pattern))

    if content != original_content:
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    return False, []

# Find all HTML files (excluding node_modules and playwright-report)
html_files = []
for pattern in ['*.html', 'areas/*.html', 'guides/*.html']:
    html_files.extend(base_dir.glob(pattern))

print("Updating Image References to WebP")
print("=" * 50)

updated_count = 0
total_changes = 0

for html_file in html_files:
    updated, changes = update_html_file(html_file)
    if updated:
        updated_count += 1
        total_changes += len(changes)
        print(f"[UPDATED] {html_file.relative_to(base_dir)}")
        for old, new in changes[:3]:  # Show first 3 changes
            print(f"  {old} -> {new}")
        if len(changes) > 3:
            print(f"  ... and {len(changes) - 3} more")

print("\n" + "=" * 50)
print(f"Files updated: {updated_count}")
print(f"Total replacements: {total_changes}")
