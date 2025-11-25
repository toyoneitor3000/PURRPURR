import sys
import re
import glob

# The message to append. 
# Note: We include leading newlines to separate from existing text.
CONFIRMATION_MSG_RAW = """

**CONFIRMACIÓN HUMANA REQUERIDA**:
Antes de ejecutar tu plan o finalizar, PRESENTA tu propuesta detallada y TERMINA con una pregunta pidiendo aprobación (ej: "¿Deseas que proceda?", "¿Apruebas este plan?"). NO ejecutes sin este "Sí" explícito.
"""

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if "CONFIRMACIÓN HUMANA REQUERIDA" in content:
            print(f"Skipping {filepath} (already present)")
            return

        new_content = content
        updated = False

        # Case 1: instruction: '...' (single quotes)
        # We look for the instruction key, then content, then a closing quote followed by (newline + next key) or EOF.
        # We use lookahead for the next key or EOF to ensure we find the right closing quote.
        pattern_sq = re.compile(r"(^instruction:\s*')(.*?)(')(\s*\n[a-z_]+:|\s*$)", re.DOTALL | re.MULTILINE)
        
        match_sq = pattern_sq.search(content)
        if match_sq:
            # match_sq.end(2) is the position before the closing quote
            # But since we have groups, we can reconstruct or splice.
            # group(1): instruction: '
            # group(2): content
            # group(3): '
            # group(4): following text
            
            # We want to insert BEFORE group(3)
            insertion_point = match_sq.start(3)
            
            # We need to escape single quotes in our message if we are inside single quotes?
            # YAML escapes ' as ''.
            msg = CONFIRMATION_MSG_RAW.replace("'", "''")
            
            new_content = content[:insertion_point] + msg + content[insertion_point:]
            updated = True
            mode = "single quote"

        if not updated:
            # Case 2: instruction: | (block scalar)
            # This is harder because it relies on indentation.
            # We assume the block ends when a line starts with no indentation (and is a key).
            pattern_block = re.compile(r"(^instruction:\s*\|)(.*?)(\n[a-z_]+:|\Z)", re.DOTALL | re.MULTILINE)
            match_block = pattern_block.search(content)
            
            if match_block:
                header = match_block.group(1)
                body = match_block.group(2)
                suffix = match_block.group(3)
                
                # Determine indentation from the body
                # Find first non-empty line in body
                indent = "  " # default
                lines = body.split('\n')
                for line in lines:
                    if line.strip():
                        match_indent = re.match(r'^(\s+)', line)
                        if match_indent:
                            indent = match_indent.group(1)
                        break
                
                # Indent the message
                # The message itself has newlines. We need to indent each line.
                indented_msg = ""
                for line in CONFIRMATION_MSG_RAW.split('\n'):
                    if line: # Don't indent empty lines if we want to keep them empty, but standard is ok
                         indented_msg += "\n" + indent + line
                    else:
                        indented_msg += "\n"

                # Remove the first newline from indented_msg if body ends with newline?
                # Usually body ends with newline.
                
                insertion_point = match_block.start(3)
                new_content = content[:match_block.end(2)] + indented_msg + content[match_block.end(2):]
            updated = True
            mode = "block"

        if not updated:
             # Case 3: instruction: "..." (double quotes)
             pattern_dq = re.compile(r'(^instruction:\s*")(.*?)(")(\s*\n[a-z_]+:|\s*$)', re.DOTALL | re.MULTILINE)
             match_dq = pattern_dq.search(content)
             if match_dq:
                 insertion_point = match_dq.start(3)
                 # Escape double quotes in the message
                 msg_escaped = CONFIRMATION_MSG_RAW.replace('"', '\\"')
                 new_content = content[:insertion_point] + msg_escaped + content[insertion_point:]
                 updated = True
                 mode = "double quote"

        if updated:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath} ({mode})")
        else:
            print(f"Warning: Could not match instruction pattern in {filepath}")

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    # If args provided, use them. Else glob all yaml in purrpurragent
    files = sys.argv[1:]
    if not files:
        files = glob.glob("purrpurragent/**/*.yaml", recursive=True)
    
    for f in files:
        process_file(f)

