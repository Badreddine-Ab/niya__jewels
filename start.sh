#!/bin/bash

# NIYA Jewels — Script de démarrage

echo "🌟 Démarrage de NIYA Jewels..."
echo ""

# Kill any processes on ports 9000 and 8000
fuser -k 9000/tcp 2>/dev/null
fuser -k 8000/tcp 2>/dev/null

# Start backend
echo "▶ Démarrage du backend Medusa (port 9000)..."
cd "$(dirname "$0")/backend"
npm run dev &
BACKEND_PID=$!

# Wait for backend to be ready
echo "⏳ Attente du backend..."
until curl -s http://localhost:9000/health > /dev/null 2>&1; do
  sleep 2
done
echo "✅ Backend prêt!"

# Start storefront
echo ""
echo "▶ Démarrage de la boutique (port 8000)..."
cd "$(dirname "$0")/storefront"
yarn dev &
STOREFRONT_PID=$!

echo ""
echo "═══════════════════════════════════════════════════"
echo "  NIYA Jewels est en cours de démarrage..."
echo ""
echo "  🛍️  Boutique :    http://localhost:8000"
echo "  ⚙️  Admin :       http://localhost:9000/app"
echo ""
echo "  Identifiants Admin :"
echo "  📧 Email :    admin@niya-jewels.com"
echo "  🔑 Mot de passe : Admin@NiyaJewels2024"
echo "═══════════════════════════════════════════════════"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter."

trap "kill $BACKEND_PID $STOREFRONT_PID 2>/dev/null; echo ''; echo 'NIYA Jewels arrêté.'; exit 0" INT
wait