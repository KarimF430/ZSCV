# 🚀 Quick Start - Deploy to Vercel

## 📝 TL;DR

1. Deploy backend on Railway/Render → Get URL
2. Deploy frontend on Vercel → Add URL to env vars
3. Done! 🎉

## ⚡ Fast Track (5 Minutes)

### Backend Deployment
```bash
# Go to https://railway.app
# Create project → Deploy from GitHub
# Set root: /backend
# Copy URL
```

### Frontend Deployment
```bash
# Go to https://vercel.com
# Import GitHub repo
# Add env vars:
#   NEXT_PUBLIC_BACKEND_URL=your-railway-url
#   NEXT_PUBLIC_API_URL=your-railway-url
# Click Deploy
```

## 📦 What Was Changed

✅ All API routes now use environment variables  
✅ Edge Runtime disabled for compatibility  
✅ Image domains updated for production  
✅ Vercel configuration added  
✅ Deployment guides created  

## 🔐 Required Environment Variables

### Vercel (Frontend)
- `NEXT_PUBLIC_BACKEND_URL` - Your backend URL
- `NEXT_PUBLIC_API_URL` - Your backend URL
- `NODE_ENV=production`

### Railway/Render (Backend)
- `NODE_ENV=production`
- `PORT=5000`

## 📚 Full Guides

- `README-DEPLOYMENT.md` - Complete instructions
- `DEPLOYMENT.md` - Detailed steps
- `DEPLOYMENT_SUMMARY.md` - All changes made

## ⚠️ Common Issues

**Issue:** API calls failing  
**Fix:** Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly

**Issue:** Images not loading  
**Fix:** Check backend URL is accessible

**Issue:** Build errors  
**Fix:** Check Vercel logs for details

## ✅ Checklist

- [ ] Backend deployed (Railway/Render)
- [ ] Backend URL copied
- [ ] Frontend deployed (Vercel)
- [ ] Environment variables added
- [ ] Test homepage
- [ ] Test API calls
- [ ] Test images

## 🎯 Your URLs

Frontend: `https://your-project.vercel.app`  
Backend: `https://your-backend.railway.app`

---

**Need help?** Read `DEPLOYMENT.md` for detailed instructions.

