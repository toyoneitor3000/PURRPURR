#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Navigate to the script's directory to ensure relative paths work correctly.
cd "$(dirname "$0")"

# 1. Create a Python virtual environment if it doesn't already exist.
if [ ! -d ".venv" ]; then
    echo "🐍 Creating Python virtual environment..."
    python3 -m venv .venv
fi

# 2. Activate the virtual environment.
source .venv/bin/activate

# 3. Install/update dependencies only if requirements.txt is newer than a marker file.
if [ ! -f ".venv/installed_requirements" ] || [ "requirements.txt" -nt ".venv/installed_requirements" ]; then
    echo "📦 Installing or updating dependencies from requirements.txt..."
    pip install -r requirements.txt
    touch .venv/installed_requirements
else
    echo "✅ Dependencies are up-to-date."
fi


# 4. Kill any existing ADK server process to free up the port.
echo "🔍 Checking for existing ADK processes..."
if pkill -f "adk web"; then
    echo "⚠️  Detected and stopped a previous ADK server process."
    sleep 1
else
    echo "✅ No previous ADK process found."
fi

# 5. Start the ADK server from the purrpurragent directory.
echo ""
echo "🚀 Starting ADK Web Server..."
echo "📁 Agent directory: ./purrpurragent/"
echo "📄 Looking for: ./purrpurragent/root_agent.yaml"
echo "🌐 Access at: http://127.0.0.1:8000"
echo ""
cd purrpurragent/
adk web .
