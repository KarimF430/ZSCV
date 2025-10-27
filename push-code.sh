#!/bin/bash

# Push Code to GitHub Script
# Run this after you create your Personal Access Token

echo "═══════════════════════════════════════════════════════════════"
echo "🚀 Ready to Push to GitHub!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "If you haven't created your token yet:"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Generate new token (classic)"
echo "3. Select 'repo' scope"
echo "4. Copy the token"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Please enter your GitHub Personal Access Token:"
echo "(Press Ctrl+C to cancel)"
echo ""
read -sp "Token: " TOKEN
echo ""
echo ""

if [ -z "$TOKEN" ]; then
  echo "❌ No token provided. Exiting."
  exit 1
fi

echo "🔄 Pushing code to GitHub..."
echo ""

git push https://KarimF430:$TOKEN@github.com/KarimF430/ZSCV.git main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ SUCCESS! Code pushed to GitHub!"
  echo ""
  echo "📦 Repository: https://github.com/KarimF430/ZSCV"
  echo ""
  echo "🚀 Next Steps:"
  echo "1. Deploy backend on Railway"
  echo "2. Deploy frontend on Vercel"
  echo "3. Check QUICK_START.md for instructions"
else
  echo ""
  echo "❌ Push failed. Please check your token and try again."
fi

