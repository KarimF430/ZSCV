# Deployment Guide

This project is ready for deployment on Vercel with a separate backend deployment.

## 📁 Project Structure

```
.
├── app/                    # Next.js frontend
├── backend/               # Express backend
├── vercel.json           # Vercel configuration
├── DEPLOYMENT.md         # Detailed deployment guide
└── package.json          # Frontend dependencies
```

## 🚀 Quick Start

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Backend hosting (Railway or Render recommended)

### Step 1: Deploy Backend

Choose one of these options:

#### Option A: Railway (Recommended)

1. Sign up at [Railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select your repository
4. Set **Root Directory** to `/backend`
5. Add environment variables in Railway dashboard:
   ```bash
   NODE_ENV=production
   PORT=5000
   ```
6. Copy your Railway URL (e.g., `https://your-app.up.railway.app`)

#### Option B: Render

1. Sign up at [Render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set:
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
5. Add environment variables as needed
6. Copy your Render URL

### Step 2: Deploy Frontend on Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository

2. **Configure Settings**
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Add Environment Variables**
   Go to Settings → Environment Variables and add:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-railway-app.up.railway.app
   NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app
   NODE_ENV=production
   ```
   Replace with your actual backend URL.

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live! 🎉

## 🔧 Files Modified for Deployment

- `app/api/brands/route.ts` - Added environment variable support
- `app/api/models/route.ts` - Added environment variable support, disabled edge runtime
- `app/api/models/[id]/route.ts` - Added environment variable support
- `app/api/upload/image/route.ts` - Added environment variable support
- `app/api/brands/[id]/route.ts` - Disabled edge runtime
- `next.config.js` - Updated image domains for production
- `vercel.json` - Added Vercel configuration

## 🌍 Environment Variables

### Frontend (Vercel)
```bash
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NODE_ENV=production
```

### Backend (Railway/Render)
```bash
NODE_ENV=production
PORT=5000
```

## 🔍 Testing Deployment

After deployment, test:

1. **Homepage**: Visit your Vercel URL
2. **API Endpoints**: 
   - Check `/api/brands`
   - Check `/api/models`
3. **Brands Page**: Navigate to `/brands/honda`
4. **Models Page**: Navigate to `/models/any-model`
5. **Images**: Verify images load correctly

## 🐛 Troubleshooting

### Issue: API calls failing

**Solution:**
- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly in Vercel
- Check backend URL is accessible (visit it directly)
- Verify CORS settings in backend allow your Vercel domain

### Issue: Images not loading

**Solution:**
- Check `next.config.js` has correct image domains
- Verify backend is serving images correctly
- Check image URLs in browser console

### Issue: Build errors

**Solution:**
- Check Vercel build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify TypeScript types are correct
- Check Node.js version (should be 18+)

### Issue: Edge runtime errors

**Solution:**
- Edge runtime is disabled in API routes for compatibility
- If you see edge runtime errors, ensure all routes have it commented out
- Use Node.js runtime for better compatibility

## 📝 Local Development

To test locally before deploying:

1. Start backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Start frontend (in root directory):
   ```bash
   npm install
   npm run dev
   ```

3. Create `.env.local`:
   ```bash
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
   ```

## 🔐 Security Notes

- Never commit `.env.local` to Git
- Use environment variables in Vercel dashboard
- Keep backend CORS restricted to production domains
- Use HTTPS for all API calls in production

## 📊 Monitoring

After deployment:

- Check Vercel Analytics for page views
- Monitor Railway/Render logs for backend errors
- Use browser DevTools to debug API calls
- Check Vercel deployment logs for build issues

## 🎯 Next Steps

1. Set up custom domain (optional)
2. Configure CORS properly
3. Add error monitoring (Sentry, etc.)
4. Set up CI/CD for automatic deployments
5. Monitor performance and optimize

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

## ✅ Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend environment variables configured
- [ ] Backend URL verified and working
- [ ] Images loading correctly
- [ ] API endpoints responding
- [ ] CORS configured properly
- [ ] Build passing on Vercel
- [ ] Production URL tested

## 🎉 Success!

Your application is now live on Vercel!

Frontend: `https://your-project.vercel.app`  
Backend: `https://your-backend.up.railway.app`

