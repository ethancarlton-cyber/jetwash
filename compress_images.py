#!/usr/bin/env python3
"""
Compress oversized images to WebP format for JetWash project.
Target: <100KB per image with 80-90% quality.
"""

from PIL import Image
import os
from pathlib import Path

# Define base directory
base_dir = Path(__file__).parent / "images"
backup_dir = Path(__file__).parent / "images-backup"

# Create backup directory
backup_dir.mkdir(exist_ok=True)

# List of images to compress (all >100KB images found)
images_to_compress = [
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

def get_file_size_kb(filepath):
    """Get file size in KB."""
    return os.path.getsize(filepath) / 1024

def compress_to_webp(input_path, quality=85):
    """
    Compress image to WebP format.
    Adjust quality down if needed to get <100KB.
    """
    img = Image.open(input_path)

    # Convert RGBA to RGB if necessary (WebP with transparency uses more space)
    if img.mode == 'RGBA':
        # Create white background
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])  # Use alpha channel as mask
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # Generate output path
    output_path = input_path.with_suffix('.webp')

    # Try different quality levels to get <100KB
    # Start more aggressively and work down if needed
    for q in [quality, 75, 70, 65, 60, 55, 50, 45]:
        img.save(output_path, 'WEBP', quality=q, method=6)
        size_kb = get_file_size_kb(output_path)

        if size_kb < 100:
            return output_path, size_kb, q

    # If still too large, try resizing
    # Reduce dimensions by 10% and try again
    img_resized = img.resize((int(img.width * 0.9), int(img.height * 0.9)), Image.Resampling.LANCZOS)
    for q in [70, 60, 50, 40]:
        img_resized.save(output_path, 'WEBP', quality=q, method=6)
        size_kb = get_file_size_kb(output_path)

        if size_kb < 100:
            return output_path, size_kb, q

    # Return best attempt
    return output_path, size_kb, q

def main():
    print("JetWash Image Compression Tool")
    print("=" * 50)
    print(f"Target: <100KB per image (WebP format)\n")

    results = []

    for img_path in images_to_compress:
        input_file = base_dir / img_path

        if not input_file.exists():
            print(f"[SKIP] {img_path} (not found)")
            continue

        # Get original size
        original_size = get_file_size_kb(input_file)

        # Backup original
        backup_file = backup_dir / img_path
        backup_file.parent.mkdir(parents=True, exist_ok=True)

        # Copy to backup
        import shutil
        if not backup_file.exists():
            shutil.copy2(input_file, backup_file)

        # Compress to WebP
        try:
            output_file, new_size, quality = compress_to_webp(input_file)
            compression_ratio = (1 - new_size / original_size) * 100

            status = "[OK]" if new_size < 100 else "[WARN]"
            print(f"{status} {img_path}")
            print(f"   {original_size:.1f}KB -> {new_size:.1f}KB ({compression_ratio:.1f}% reduction, q={quality})")

            results.append({
                'path': img_path,
                'original': original_size,
                'new': new_size,
                'quality': quality,
                'success': new_size < 100
            })

        except Exception as e:
            print(f"[ERROR] {img_path} - {e}")

    # Summary
    print("\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)
    successful = sum(1 for r in results if r['success'])
    total_original = sum(r['original'] for r in results)
    total_new = sum(r['new'] for r in results)
    total_saved = total_original - total_new

    print(f"Images compressed: {len(results)}")
    print(f"Under 100KB: {successful}/{len(results)}")
    print(f"Total size reduction: {total_original:.1f}KB -> {total_new:.1f}KB")
    print(f"Space saved: {total_saved:.1f}KB ({(total_saved/total_original*100):.1f}%)")
    print(f"\nOriginals backed up to: {backup_dir}")

if __name__ == "__main__":
    main()
