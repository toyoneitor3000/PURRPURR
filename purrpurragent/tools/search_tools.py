import os
from googleapiclient.discovery import build
try:
    from duckduckgo_search import DDGS
except ImportError:
    DDGS = None

def google_search(query: str) -> str:
    """
    Realiza una búsqueda en la web (Google o DuckDuckGo) y devuelve resultados.
    Prioriza Google si hay credenciales, sino usa DuckDuckGo como fallback.

    Args:
        query: La consulta de búsqueda.

    Returns:
        Un string con los títulos, snippets y enlaces de los resultados.
    """
    results = []
    
    # 1. Intentar Google Custom Search
    api_key = os.environ.get("GOOGLE_API_KEY")
    cx = os.environ.get("GOOGLE_CSE_ID")

    if api_key and cx:
        try:
            service = build("customsearch", "v1", developerKey=api_key)
            res = service.cse().list(q=query, cx=cx, num=5).execute()

            if "items" in res:
                for item in res["items"]:
                    title = item.get("title")
                    snippet = item.get("snippet")
                    link = item.get("link")
                    results.append(f"Title: {title}\nSnippet: {snippet}\nLink: {link}\n")
                return "\n".join(results)
        except Exception as e:
            print(f"Google Search falló: {e}. Intentando fallback...")

    # 2. Fallback a DuckDuckGo
    if DDGS:
        try:
            print(f"Usando DuckDuckGo para: {query}")
            ddgs = DDGS()
            ddg_results = ddgs.text(query, max_results=5)
            if ddg_results:
                for r in ddg_results:
                    title = r.get("title")
                    body = r.get("body")
                    href = r.get("href")
                    results.append(f"Title: {title}\nSnippet: {body}\nLink: {href}\n")
                return "\n".join(results)
            else:
                return "No se encontraron resultados en DuckDuckGo."
        except Exception as e:
            return f"Error en DuckDuckGo: {str(e)}"
    
    return "Error: No hay credenciales de Google y DuckDuckGo falló o no está instalado."
