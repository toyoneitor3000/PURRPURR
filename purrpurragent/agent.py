"""
Agent module for Purrpur system.
Exposes root_agent for ADK to discover.
"""

from pathlib import Path
from google.adk.agents.config_agent_utils import from_config

# Import all tools to ensure they're registered with ADK
import purrpurragent.tools.command_tools
import purrpurragent.tools.repo_tools
import purrpurragent.tools.deploy_tools
import purrpurragent.tools.scaffold_tools
import purrpurragent.tools.design_tools

# Load root agent from YAML
_config_path = Path(__file__).parent / "root_agent.yaml"
root_agent = from_config(str(_config_path))

__all__ = ['root_agent']

