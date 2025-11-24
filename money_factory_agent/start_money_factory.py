from google.adk.agents import WorkflowAgent

# Cargamos al agente CEO desde su archivo de configuración.
# El ADK se encargará de cargar recursivamente a los sub-agentes.
ceo_agent = WorkflowAgent.from_yaml("purrpurragent/root_agent.yaml")

# Iniciamos la "Jornada Laboral" con una directiva de alto nivel.
# El CEO se encargará de delegar las tareas a sus sub-agentes.
ceo_agent.run("Genera ingresos hoy buscando una noticia tecnológica viral")

print("La Fábrica de Dinero ha completado su ciclo. Revisa el archivo 'listo_para_publicar.txt'")
