#!/bin/bash

# Vercel Deployment Script
# This script prepares the project for Vercel deployment

echo "🚀 Preparing project for Vercel deployment..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from example..."
    cat > .env.local << EOF
# Backend API URL - Replace with your actual backend URL
NEXT_PUBLIC_BACKEND_URL=https://your-backend.railway.app
NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# Production environment
NODE_ENV=production
EOF
    echo "✅ Created .env.local - Please update with your backend URL"
else
    echo "✅ .env.local already exists"
fi

# Check Node.js version
echo "🔍 Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -ge 18 ]; then
    echo "✅ Node.js version is compatible (v${node_version})"
else
    echo "⚠️  Node.js version $node_version may not be compatible. Vercel recommends Node 18+"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if build passes
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Your project is ready for Vercel deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Update .env.local with your backend URL"
    echo "2. Commit and push to GitHub"
    echo "3. Connect your repo to Vercel"
    echo "4. Add environment variables in Vercel dashboard"
    echo "5. Deploy!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

