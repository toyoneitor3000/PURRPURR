import sys
import os

# Add current directory to path so we can import purrpurragent
sys.path.append(os.getcwd())
sys.path.append(os.path.join(os.getcwd(), 'PURRPURRAGENT'))

try:
    import google.generativeai as genai
    # Check if it's patched before importing agent (should be original)
    print(f"Before import: GenerativeModel is {genai.GenerativeModel}")
    
    import purrpurragent.agent
    
    # Check if it's patched after import
    print(f"After import: GenerativeModel is {genai.GenerativeModel}")
    
    # Verify it is our patched class
    if "PatchedGenerativeModel" in str(genai.GenerativeModel):
        print("SUCCESS: GenerativeModel is patched.")
        
        # Try to instantiate to see if it injects config
        try:
            model = genai.GenerativeModel("gemini-pro")
            print(f"Instantiated model: {model}")
            # We can't easily check the config inside unless we inspect private members
            # or if we trust our print statement in the patch.
        except Exception as e:
            print(f"Instantiation failed (expected if no API key): {e}")
            # Even if it fails, we want to see if our print statement from patch appeared.
            
    else:
        print("FAILURE: GenerativeModel is NOT patched.")

except ImportError as e:
    print(f"ImportError: {e}")
except Exception as e:
    print(f"Error: {e}")
