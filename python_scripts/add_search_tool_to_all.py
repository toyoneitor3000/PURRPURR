
import os
import re

TOOL_NAME = "purrpurragent.tools.search_tools.google_search"
DIR_PATH = "/Users/camilotoloza/Library/CloudStorage/GoogleDrive-camilotoloza1136@gmail.com/My Drive/PURPUR/purpur-landing-page/purrpurragent"

def add_tool_to_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    if TOOL_NAME in content:
        print(f"Skipping {file_path}, tool already present.")
        return

    # Check for tools: []
    if "tools: []" in content:
        new_content = content.replace("tools: []", f"tools:\n  - name: {TOOL_NAME}")
    # Check for tools: list
    elif "tools:" in content:
        # Find the tools section and append
        # We assume standard yaml formatting where tools is followed by a list or is at the end
        # We'll use regex to find "tools:" and append the item after it (or after its existing items)
        # A simple approach is to replace "tools:" with "tools:\n  - name: TOOL_NAME" but we must be careful about indentation of existing items
        # If there are existing items, they start with "  - name:".
        # Let's try to inject it right after "tools:" line
        new_content = re.sub(r"(tools:.*)", f"\\1\n  - name: {TOOL_NAME}", content, count=1)
    else:
        # No tools section, append it
        new_content = content + f"\ntools:\n  - name: {TOOL_NAME}\n"

    with open(file_path, 'w') as f:
        f.write(new_content)
    print(f"Updated {file_path}")

def main():
    for filename in os.listdir(DIR_PATH):
        if filename.endswith("_agent.yaml"):
            add_tool_to_file(os.path.join(DIR_PATH, filename))

if __name__ == "__main__":
    main()
