# 🚀 Complete Vercel Deployment Guide

## Understanding Your Setup

Your project has **TWO parts**:
1. **Backend** (Express server) → Deploy on Railway/Render
2. **Frontend** (Next.js) → Deploy on Vercel

## Step-by-Step Deployment

### STEP 1: Deploy Backend First (Railway)

1. **Go to Railway.app**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Backend**
   - Click on your project
   - Go to "Settings"
   - Find "Root Directory"
   - Set to: `/backend`
   - Click "Save"

4. **Add Environment Variables** (if needed)
   - Go to "Variables" tab
   - Add these if required:
     ```
     NODE_ENV=production
     ```

5. **Get Your Backend URL**
   - After deployment, go to "Settings"
   - Click "Generate Domain" (if not auto-generated)
   - Copy the URL (e.g., `https://your-app.up.railway.app`)

### STEP 2: Deploy Frontend on Vercel

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in with GitHub

2. **Create New Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure Project** (IMPORTANT!)
   - **Framework Preset:** Next.js (should be auto-detected)
   - **Root Directory:** Leave empty (use root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

4. **Add Environment Variables** (CRITICAL!)
   Click "Environment Variables" and add:

   ```
   Variable Name: NEXT_PUBLIC_BACKEND_URL
   Value: https://your-app.up.railway.app
   ```

   And also add:

   ```
   Variable Name: NEXT_PUBLIC_API_URL
   Value: https://your-app.up.railway.app
   ```

   **Replace `https://your-app.up.railway.app` with your actual Railway URL from Step 1!**

5. **Deploy**
   - Scroll down and click "Deploy"
   - Wait for build to complete
   - Your site is now live! 🎉

## How It Works

```
Vercel (Frontend) → Environment Variables → Railway (Backend)
     ↓                      ↓                        ↓
 Your website      NEXT_PUBLIC_BACKEND_URL    Your API
```

The frontend on Vercel will use the `NEXT_PUBLIC_BACKEND_URL` environment variable to connect to your backend on Railway.

## After Deployment

### Test Your Site

1. Visit your Vercel URL
2. Open browser DevTools (F12)
3. Go to Console tab
4. Check for errors

### Check API Connection

Visit: `https://your-vercel-url.vercel.app/api/brands`

Should return data from your Railway backend.

## Updating Environment Variables

If you need to change the backend URL:

1. Go to your Vercel project
2. Click "Settings"
3. Go to "Environment Variables"
4. Edit `NEXT_PUBLIC_BACKEND_URL`
5. Save and redeploy

## Troubleshooting

### API calls failing?

**Check:**
1. Environment variables are set correctly in Vercel
2. Backend URL is accessible (visit it in browser)
3. Check browser console for errors
4. Verify CORS settings in backend

### How to verify backend is working?

Visit your Railway URL directly:
```
https://your-app.up.railway.app/api/brands
```

Should return JSON data.

### Backend not accessible?

- Railway sometimes takes a few minutes to deploy
- Check Railway logs for errors
- Ensure `backend/server/index.ts` is running on correct port

## Quick Reference

### Backend (Railway)
- URL: `https://your-app.up.railway.app`
- Root: `/backend`
- Port: Auto-assigned by Railway

### Frontend (Vercel)
- URL: `https://your-project.vercel.app`
- Root: `/` (root directory)
- Environment Variable: `NEXT_PUBLIC_BACKEND_URL`

## Example Environment Variables

### In Vercel:
```
NEXT_PUBLIC_BACKEND_URL=https://production.up.railway.app
NEXT_PUBLIC_API_URL=https://production.up.railway.app
NODE_ENV=production
```

### In Railway (if needed):
```
NODE_ENV=production
```

## Summary

1. ✅ Backend on Railway → Get URL
2. ✅ Frontend on Vercel → Add URL to env vars
3. ✅ Deploy

That's it! Your frontend on Vercel will automatically connect to your backend on Railway.

