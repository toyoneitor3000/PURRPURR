
import sys
import os
import json

# Add the parent directory to sys.path to import the module
sys.path.append('/Users/camilotoloza/Library/CloudStorage/GoogleDrive-camilotoloza1136@gmail.com/My Drive/PURPUR/purpur-landing-page')

from purrpurragent.tools.design_tools import design_tokens_sync

def test_design_tokens_sync():
    print("Testing design_tokens_sync with non-existent file (should return defaults)...")
    # We pass a non-existent file, but the tool checks for existence. 
    # Wait, the tool returns error if file doesn't exist.
    # Let's create a dummy empty file to trigger the default logic.
    
    dummy_file = "dummy_design.md"
    with open(dummy_file, "w") as f:
        f.write("")
        
    try:
        result = design_tokens_sync(dummy_file, output_path="./test_tokens.ts", format="typescript")
        
        if result["status"] == "success":
            print("✅ Success!")
            content = result["content"]
            if "background" in content and "#09090b" in content:
                print("✅ Premium Dark Mode detected (background color found).")
            else:
                print("❌ Premium Dark Mode NOT detected.")
                print(content)
                
            if "glow" in content:
                print("✅ Glow effect detected.")
        else:
            print(f"❌ Failed: {result}")
            
    finally:
        if os.path.exists(dummy_file):
            os.remove(dummy_file)
        if os.path.exists("./test_tokens.ts"):
            # os.remove("./test_tokens.ts") # Keep it to inspect if needed
            pass

if __name__ == "__main__":
    test_design_tokens_sync()
