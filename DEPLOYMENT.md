# Deployment Guide for Vercel

This guide will help you deploy the Next.js frontend on Vercel and the Express backend on a separate hosting service.

## Prerequisites

- GitHub account
- Vercel account
- Railway, Render, or similar backend hosting account

## Step 1: Deploy Backend

### Option A: Railway (Recommended)

1. Go to [Railway.app](https://railway.app) and sign up/login
2. Create a new project
3. Click "Add New Project" → "Deploy from GitHub"
4. Select your repository and connect it
5. Railway will detect your backend folder
6. Set the Root Directory to `/backend` in Railway settings
7. Railway will automatically deploy your backend
8. Note the deployment URL (e.g., `https://your-app.up.railway.app`)

#### Environment Variables for Backend (Railway):

In your Railway project settings, add these environment variables:

```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=your_database_url
```

### Option B: Render

1. Go to [Render.com](https://render.com) and sign up/login
2. Create a new Web Service
3. Connect your GitHub repository
4. Set:
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
5. Add environment variables as needed
6. Note the deployment URL (e.g., `https://your-app.onrender.com`)

## Step 2: Deploy Frontend on Vercel

### Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will detect Next.js automatically

### Configure Environment Variables

In your Vercel project settings, go to Settings → Environment Variables and add:

```bash
NEXT_PUBLIC_BACKEND_URL=https://your-backend.railway.app
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NODE_ENV=production
```

**Important:** Replace `https://your-backend.railway.app` with your actual backend URL from Step 1.

### Build Settings

Vercel will automatically use these settings (already configured in `vercel.json`):

- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application
3. Your app will be live at: `https://your-project.vercel.app`

## Step 3: Update Backend CORS (if needed)

Make sure your backend allows requests from your Vercel domain. Update `backend/server/index.ts` if needed:

```typescript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://your-project.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

## Step 4: Testing

1. Visit your Vercel deployment URL
2. Check browser console for any errors
3. Test API endpoints (brands, models, etc.)
4. Verify image uploads work (if applicable)

## Troubleshooting

### Issue: API calls failing

- Check environment variables in Vercel are correctly set
- Verify backend URL is accessible
- Check CORS configuration in backend

### Issue: Images not loading

- Ensure `next.config.js` has proper remote patterns
- Check backend uploads folder is accessible
- Verify image URLs are correctly formed

### Issue: Build errors

- Check `package.json` has all dependencies
- Review Vercel build logs
- Ensure TypeScript types are correct

## Files Modified for Deployment

- `app/api/brands/route.ts` - Added environment variable support
- `app/api/models/route.ts` - Added environment variable support, disabled edge runtime
- `app/api/upload/image/route.ts` - Added environment variable support, disabled edge runtime
- `vercel.json` - Added Vercel configuration
- `.gitignore` - Updated to ignore sensitive files

## Environment Variables Summary

### Frontend (Vercel):
- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL
- `NEXT_PUBLIC_API_URL` - Alternative API URL
- `NODE_ENV` - Set to `production`

### Backend (Railway/Render):
- `NODE_ENV` - Set to `production`
- `PORT` - Set to appropriate port (Railway auto-assigns)
- Database connection string if applicable

## Additional Notes

- The backend is kept separate to maintain flexibility
- API routes in Next.js proxy to the backend
- All API logic remains unchanged
- Images and static assets are served through the backend

