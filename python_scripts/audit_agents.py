import sys
import re
import glob

# The message to ensure is present.
CONFIRMATION_MARKER = "**CONFIRMACIÓN HUMANA REQUERIDA**"
CONFIRMATION_MSG = """

  **CONFIRMACIÓN HUMANA REQUERIDA**:
  Antes de ejecutar tu plan o finalizar, PRESENTA tu propuesta detallada y TERMINA con una pregunta pidiendo aprobación (ej: "¿Deseas que proceda?", "¿Apruebas este plan?"). NO ejecutes sin este "Sí" explícito.
  """

def check_and_fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if CONFIRMATION_MARKER in content:
            # It's there, but let's make sure it's not commented out or weirdly placed if possible.
            # For now, assumption is if the marker text is there, it's good.
            # print(f"OK: {filepath}") 
            return

        print(f"FIXING: {filepath}")
        
        # We need to inject it at the end of the instruction block.
        # This logic needs to be robust for both single quotes '...' and block scalars |
        
        # Strategy: Find the end of the instruction block and append.
        
        # 1. Try Single Quotes: instruction: '...'
        pattern_sq = re.compile(r"(^instruction:\s*')(.*?)(')(\s*\n[a-z_]+:|\s*$)", re.DOTALL | re.MULTILINE)
        match_sq = pattern_sq.search(content)
        
        if match_sq:
            # Insert before the closing quote
            insertion_point = match_sq.start(3)
            # Escape single quotes for YAML single-quoted string
            msg = CONFIRMATION_MSG.replace("'", "''")
            # The message has indentation, but for single quoted string, we just need the text.
            # Let's clean up indentation for the single quote insertion to look nice-ish but valid.
            msg_sq = "\n\n  **CONFIRMACIÓN HUMANA REQUERIDA**:\n  Antes de ejecutar tu plan o finalizar, PRESENTA tu propuesta detallada y TERMINA con una pregunta pidiendo aprobación (ej: \"¿Deseas que proceda?\", \"¿Apruebas este plan?\"). NO ejecutes sin este \"Sí\" explícito.\n"
            msg_sq = msg_sq.replace("'", "''")
            
            new_content = content[:insertion_point] + msg_sq + content[insertion_point:]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return

        # 2. Try Double Quotes: instruction: "..."
        pattern_dq = re.compile(r'(^instruction:\s*")(.*?)(")(\s*\n[a-z_]+:|\s*$)', re.DOTALL | re.MULTILINE)
        match_dq = pattern_dq.search(content)
        
        if match_dq:
            insertion_point = match_dq.start(3)
            # Escape double quotes for YAML double-quoted string
            msg_dq = "\n\n  **CONFIRMACIÓN HUMANA REQUERIDA**:\n  Antes de ejecutar tu plan o finalizar, PRESENTA tu propuesta detallada y TERMINA con una pregunta pidiendo aprobación (ej: \\\"¿Deseas que proceda?\\\", \\\"¿Apruebas este plan?\\\"). NO ejecutes sin este \\\"Sí\\\" explícito.\n"
            
            new_content = content[:insertion_point] + msg_dq + content[insertion_point:]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return

        # 3. Try Block Scalar: instruction: |
        pattern_block = re.compile(r"(^instruction:\s*\|)(.*?)(\n[a-z_]+:|\Z)", re.DOTALL | re.MULTILINE)
        match_block = pattern_block.search(content)
        
        if match_block:
            # Find indentation of the block
            body = match_block.group(2)
            indent = "  " # default
            for line in body.split('\n'):
                if line.strip():
                    m = re.match(r'^(\s+)', line)
                    if m: indent = m.group(1)
                    break
            
            # Construct indented message
            lines = CONFIRMATION_MSG.strip().split('\n')
            indented_msg = "\n"
            for line in lines:
                indented_msg += indent + line.strip() + "\n"
            
            # Insert at end of body (group 2)
            insertion_point = match_block.end(2)
            new_content = content[:insertion_point] + indented_msg + content[insertion_point:]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return
            
        print(f"WARNING: Could not identify instruction block in {filepath}")

    except Exception as e:
        print(f"ERROR processing {filepath}: {e}")

if __name__ == "__main__":
    files = glob.glob("purrpurragent/**/*.yaml", recursive=True)
    for f in files:
        check_and_fix_file(f)

