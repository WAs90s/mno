#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SHOP_OWNER_APP="$(cd "$ROOT/../Wide Angle App/mno - Copy (3) copy/shop_owner_app" 2>/dev/null && pwd || true)"

if [[ -z "$SHOP_OWNER_APP" || ! -f "$SHOP_OWNER_APP/scripts/build_godaddy_web.sh" ]]; then
  echo "Could not find shop_owner_app. Set SHOP_OWNER_APP to its folder path."
  exit 1
fi

echo "==> Building PQR shop owner web app..."
"$SHOP_OWNER_APP/scripts/build_godaddy_web.sh" /pqr/

echo "==> Building marketing site (dist/)..."
cd "$ROOT"
npm run build:pages

echo ""
echo "Deploy ready: $ROOT/dist/"
echo "  Homepage:  https://www.mno.co.in/"
echo "  PQR app:   https://www.mno.co.in/pqr/"
echo ""
echo "GitHub Pages: commit public/pqr + src changes, push to main."
echo "Manual: upload everything inside dist/ to your host."
