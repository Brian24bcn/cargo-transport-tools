#!/bin/bash
# get_pdf_lib.sh
# Descarga pdf-lib.min.js para uso 100% offline.
# Ejecuta este script UNA SOLA VEZ después de clonar el repositorio.
#
# Uso:  bash get_pdf_lib.sh
# Req:  curl o wget

echo "Downloading pdf-lib.min.js for offline use..."

if command -v curl &> /dev/null; then
    curl -L -o pdf-lib.min.js "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"
elif command -v wget &> /dev/null; then
    wget -O pdf-lib.min.js "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"
else
    echo "ERROR: Neither curl nor wget found."
    echo "Please download manually from:"
    echo "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"
    echo "and save it as pdf-lib.min.js in this folder."
    exit 1
fi

if [ -f "pdf-lib.min.js" ] && [ -s "pdf-lib.min.js" ]; then
    SIZE=$(wc -c < pdf-lib.min.js)
    echo "✅ pdf-lib.min.js downloaded ($(echo $SIZE | awk '{printf "%.0f KB", $1/1024}'))"
    echo "   All tools are now 100% offline."
else
    echo "❌ Download failed. Please download manually."
fi
