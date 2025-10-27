# ✅ Add Environment Variable to Vercel

Your backend is deployed at: **https://zscv.onrender.com**

## Now set this in Vercel:

### Go to Your Vercel Dashboard:
1. Visit: https://vercel.com/dashboard
2. Click on your project (ZSCV or your project name)
3. Go to **Settings** → **Environment Variables**

### Add These Variables:

```
Name: NEXT_PUBLIC_BACKEND_URL
Value: https://zscv.onrender.com

Name: NEXT_PUBLIC_API_URL  
Value: https://zscv.onrender.com

Name: NODE_ENV
Value: production
```

### Then Redeploy:
1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or just wait - Vercel may auto-redeploy

---

## Test Your Backend:
Visit: https://zscv.onrender.com/api/brands

Should return JSON data with brands!

