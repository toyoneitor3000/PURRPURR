import os
import base64
from pathlib import Path

def fix_image_file(filepath):
    try:
        path = Path(filepath)
        if not path.exists():
            return

        # Read content as text first to check if it's base64 string
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read().strip()
        except UnicodeDecodeError:
            # If it fails to read as text, it might be already binary (valid image)
            print(f"Skipping {path.name} (likely already binary)")
            return

        if content.startswith('data:image/') and ';base64,' in content:
            print(f"Fixing {path.name}...")
            # Extract base64 part
            header, encoded = content.split(';base64,', 1)
            data = base64.b64decode(encoded)
            
            # Write back as binary
            with open(path, 'wb') as f:
                f.write(data)
            print(f"✅ Fixed {path.name}")
        else:
            print(f"Skipping {path.name} (does not look like base64 data URI)")

    except Exception as e:
        print(f"Error fixing {filepath}: {e}")

def main():
    target_dir = Path("joyeria-colombiana-landing/public")
    if not target_dir.exists():
        print(f"Directory {target_dir} does not exist")
        return

    # Extensions to check
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.svg'] # SVG is text but maybe useful to check logic, though SVG usually starts with <svg
    
    # Actually only binary formats suffer from this "saved as base64 text" issue mostly.
    # SVG is text anyway, so saving base64 in .svg would be wrong too but usually svg content is text <svg...
    
    for ext in extensions:
        for file_path in target_dir.glob(ext):
            fix_image_file(file_path)

if __name__ == "__main__":
    main()

