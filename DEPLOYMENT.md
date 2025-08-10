# 🚀 Medkit.AI Deployment Guide

## 📱 **Current Issue: Mobile/Production Not Working**
Your chatbot and prescription features don't work on mobile or production because they're hardcoded to use `localhost:5001` and `localhost:5002`.

## 🔧 **Solution: Deploy Backends to Cloud**

### **Option 1: Deploy to Railway (Recommended - Free)**
1. **Sign up** at [railway.app](https://railway.app)
2. **Deploy prescription-backend.cjs** to Railway
3. **Deploy chatbot-backend.cjs** to Railway
4. **Update config.js** with your Railway URLs

### **Option 2: Deploy to Render (Free)**
1. **Sign up** at [render.com](https://render.com)
2. **Create Web Services** for both backends
3. **Update config.js** with your Render URLs

### **Option 3: Deploy to Heroku (Free)**
1. **Sign up** at [heroku.com](https://heroku.com)
2. **Deploy both backends** as separate apps
3. **Update config.js** with your Heroku URLs

## 📝 **Steps to Deploy Backend:**

### **For Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy prescription backend
cd prescription-backend
railway init
railway up

# Deploy chatbot backend  
cd ../chatbot-backend
railway init
railway up
```

### **For Render:**
1. **Connect your GitHub repo**
2. **Create Web Service** for each backend
3. **Set build command**: `npm install`
4. **Set start command**: `node prescription-backend.cjs` or `node chatbot-backend.cjs`

## 🔑 **Environment Variables to Set:**
```bash
OPENROUTER_API_KEY=your_api_key_here
```

## 📍 **After Deployment:**
1. **Get your backend URLs** (e.g., `https://your-app.railway.app`)
2. **Update `src/config/config.js`**:
```javascript
production: {
  prescriptionApi: 'https://your-prescription-backend.railway.app',
  chatbotApi: 'https://your-chatbot-backend.railway.app'
}
```
3. **Commit and push** the changes
4. **Vercel will redeploy** automatically

## ✅ **Result:**
- ✅ **Mobile works** - Chatbot and prescription features functional
- ✅ **Production works** - All features available on Vercel
- ✅ **Professional app** - Fully functional across all devices

## 🆘 **Need Help?**
- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Render**: [render.com/docs](https://render.com/docs)
- **Heroku**: [devcenter.heroku.com](https://devcenter.heroku.com)
