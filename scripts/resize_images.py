"""
检查图片尺寸，若宽度超过 800 像素则等比例缩放到宽度 800。

用法：
    python scripts/resize_images.py <图片路径或目录> [--max-width 800] [--dry-run]

示例：
    # 处理单个图片
    python scripts/resize_images.py assets/20250714183530-用AI弄弄.png

    # 处理整个 assets 目录
    python scripts/resize_images.py assets

    # 只预览不实际修改
    python scripts/resize_images.py assets --dry-run

    # 自定义最大宽度
    python scripts/resize_images.py assets --max-width 1024
"""

import argparse
import os
import sys
from pathlib import Path

from PIL import Image

SUPPORTED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif", ".tiff"}


def iter_images(target: Path):
    if target.is_file():
        yield target
    elif target.is_dir():
        for p in target.rglob("*"):
            if p.is_file() and p.suffix.lower() in SUPPORTED_EXTS:
                yield p
    else:
        print(f"路径不存在：{target}", file=sys.stderr)


def resize_image(path: Path, max_width: int, dry_run: bool) -> bool:
    """返回 True 表示该图片被（或将）修改。"""
    try:
        with Image.open(path) as img:
            w, h = img.size
            if w <= max_width:
                return False

            new_w = max_width
            new_h = int(h * max_width / w)

            info = {
                "format": img.format,
                "mode": img.mode,
            }
            if "transparency" in img.info:
                info["transparency"] = img.info["transparency"]

            if img.mode in ("RGBA", "LA", "P") or (
                img.mode == "P" and "transparency" in img.info
            ):
                img = img.convert("RGBA")
                info["mode"] = "RGBA"

            resized = img.resize((new_w, new_h), Image.LANCZOS)

            action = "[DRY-RUN] 将缩放" if dry_run else "已缩放"
            print(f"{action}: {path.name}  {w}x{h} -> {new_w}x{new_h}")

            if not dry_run:
                save_kwargs = {}
                ext = path.suffix.lower()
                if ext in (".jpg", ".jpeg"):
                    save_kwargs["optimize"] = True
                    save_kwargs["quality"] = 95
                    if resized.mode == "RGBA":
                        resized = resized.convert("RGB")
                elif ext == ".png":
                    save_kwargs["optimize"] = True
                elif ext == ".webp":
                    save_kwargs["quality"] = 95

                resized.save(path, **save_kwargs)
            return True
    except Exception as e:
        print(f"处理失败 {path}: {e}", file=sys.stderr)
        return False


def main():
    parser = argparse.ArgumentParser(
        description="检查图片宽度，超过阈值时等比例缩小。"
    )
    parser.add_argument("target", help="图片文件路径或目录")
    parser.add_argument(
        "--max-width", type=int, default=800, help="最大允许宽度（默认 800）"
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="只检查不实际修改文件"
    )
    args = parser.parse_args()

    target = Path(args.target)
    if not target.exists():
        print(f"路径不存在：{target}", file=sys.stderr)
        sys.exit(1)

    total = 0
    changed = 0
    for img_path in iter_images(target):
        total += 1
        if resize_image(img_path, args.max_width, args.dry_run):
            changed += 1

    print(f"\n共检查 {total} 张图片，{changed} 张超过宽度 {args.max_width}px。")


if __name__ == "__main__":
    main()
