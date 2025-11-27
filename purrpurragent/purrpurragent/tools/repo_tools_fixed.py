import os
import fnmatch
import ast
from pathlib import Path
from typing import Dict, Any, List
from google.adk.tools import FunctionTool

MAX_FILE_CHARS = 200000
TRUNCATE_CHARS = 10000

def get_project_root() -> Path:
    return Path(__file__).parent.parent.parent.resolve()

def read_files(file_paths: List[str], base_dir: str = None) -> Dict[str, Any]:
    results = {}
    base_path = Path(base_dir).resolve() if base_dir else get_project_root()
    for file_path in file_paths:
        full_path = (base_path / file_path).resolve()
        try:
            full_path.relative_to(base_path)
        except ValueError:
            results[file_path] = {'status': 'error', 'content': None, 'error': '⛔ Security: Path traversal no permitido.'}
            continue
        try:
            if not full_path.exists():
                results[file_path] = {'status': 'not_found', 'content': None, 'error': f'Archivo no encontrado: {file_path}'}
            elif full_path.is_dir():
                results[file_path] = {'status': 'error', 'content': None, 'error': f'Es un directorio, no un archivo: {file_path}'}
            else:
                with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                results[file_path] = {'status': 'success', 'content': content, 'error': None}
        except Exception as e:
            results[file_path] = {'status': 'error', 'content': None, 'error': f'Error leyendo {file_path}: {str(e)}'}
    return results

def write_files(file_operations: str, base_dir: str = None) -> Dict[str, Any]:
    import json
    operations_list = []
    if isinstance(file_operations, str):
        try:
            operations_list = json.loads(file_operations)
        except json.JSONDecodeError as e:
            try:
                operations_list = ast.literal_eval(file_operations)
            except (ValueError, SyntaxError) as ast_e:
                return {'status': 'error', 'error': f'Error parseando JSON (strict): {str(e)}. Fallback (literal) también falló: {str(ast_e)}'}
    elif isinstance(file_operations, list):
        operations_list = file_operations
    else:
        return {'status': 'error', 'error': 'file_operations debe ser un JSON string o una lista.'}
    if not isinstance(operations_list, list):
        return {'status': 'error', 'error': 'El JSON parseado debe ser una lista de operaciones.'}
    results = {}
    base_path = Path(base_dir).resolve() if base_dir else get_project_root()
    for operation in operations_list:
        file_path = operation.get('path')
        content = operation.get('content', '')
        if not file_path:
            results['invalid_operation'] = {'status': 'error', 'error': 'Operación inválida sin \'path\' especificado.'}
            continue
        full_path = (base_path / file_path).resolve()
        try:
            full_path.relative_to(base_path)
        except ValueError:
            results[file_path] = {'status': 'error', 'error': '⛔ Security: Path traversal no permitido.'}
            continue
        try:
            full_path.parent.mkdir(parents=True, exist_ok=True)
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            results[file_path] = {'status': 'success', 'message': f'✅ Archivo escrito: {file_path}'}
        except Exception as e:
            results[file_path] = {'status': 'error', 'error': f'Error escribiendo {file_path}: {str(e)}'}
    return results

write_files_tool = FunctionTool(write_files, require_confirmation=False)

def search_files(pattern: str, base_dir: str = None, max_results: int = 50) -> List[str]:
    results = []
    base_path = Path(base_dir).resolve() if base_dir else get_project_root()
    for root, dirs, files in os.walk(base_path):
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.next', 'dist', 'build', '__pycache__']]
        for filename in files:
            if fnmatch.fnmatch(filename, pattern):
                results.append(os.path.relpath(os.path.join(root, filename), base_path))
        if len(results) >= max_results:
            break
    return results[:max_results]

