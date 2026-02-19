#!/usr/bin/env python3
"""
Aggressively compress remaining oversized images.
"""

from PIL import Image
import os
from pathlib import Path

base_dir = Path(__file__).parent / "images"

# Images still over 100KB from first pass
remaining_images = [
    "hero-driveway.png",
    "service-block-paving.png",
    "service-decking.png",
    "service-driveway.png",
    "service-patio.png",
    "before-after/block-paving-before-after.png",
    "before-after/decking-before-after.png",
    "before-after/driveway-before-after.png",
]

def get_file_size_kb(filepath):
    return os.path.getsize(filepath) / 1024

def aggressive_compress(webp_path):
    """Aggressively compress existing WebP files."""
    img = Image.open(webp_path)

    # Try reducing quality first
    for q in [35, 30, 25, 20]:
        img.save(webp_path, 'WEBP', quality=q, method=6)
        size_kb = get_file_size_kb(webp_path)
        if size_kb < 100:
            return size_kb, q, img.size

    # If still too large, resize down
    for scale in [0.95, 0.90, 0.85, 0.80]:
        new_width = int(img.width * scale)
        new_height = int(img.height * scale)
        img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

        for q in [40, 35, 30, 25]:
            img_resized.save(webp_path, 'WEBP', quality=q, method=6)
            size_kb = get_file_size_kb(webp_path)
            if size_kb < 100:
                return size_kb, q, (new_width, new_height)

    # Return best attempt
    return size_kb, q, (new_width, new_height)

print("Aggressive Compression Pass")
print("=" * 50)

success_count = 0
for img_path in remaining_images:
    webp_file = base_dir / Path(img_path).with_suffix('.webp')

    if not webp_file.exists():
        print(f"[SKIP] {img_path} - WebP not found")
        continue

    original_size = get_file_size_kb(webp_file)
    new_size, quality, dimensions = aggressive_compress(webp_file)

    status = "[OK]" if new_size < 100 else "[WARN]"
    print(f"{status} {img_path}")
    print(f"   {original_size:.1f}KB -> {new_size:.1f}KB (q={quality}, {dimensions[0]}x{dimensions[1]})")

    if new_size < 100:
        success_count += 1

print("\n" + "=" * 50)
print(f"Success: {success_count}/{len(remaining_images)} now under 100KB")
