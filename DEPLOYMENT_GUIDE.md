# 🚀 SkillSwap Hub Deployment Guide

## 📋 Quick Deployment Checklist

### ✅ Backend Deployment (Vercel)

1. **Go to Vercel Dashboard**: https://vercel.com
2. **Import GitHub Repository**: `vardhan24bcs10041/skillswap-hub`
3. **Configure**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm run vercel-build`
4. **Set Environment Variables**:
   - `MONGO_URI`: `mongodb+srv://username:password@cluster.mongodb.net/skillswap-hub-prod`
   - `JWT_SECRET`: `your-secure-jwt-secret-here`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://your-netlify-app.netlify.app`
5. **Deploy!**

### ✅ Frontend Deployment (Netlify)

1. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to https://app.netlify.com
   - Drag and drop the `build` folder
   - Set environment variable: `REACT_APP_API_URL=https://your-heroku-app.herokuapp.com/api`

### ✅ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**: https://www.mongodb.com/atlas
2. **Create Free Cluster**
3. **Get Connection String**
4. **Add to Heroku Environment Variables**

## 🔗 Your Deployment URLs

- **Frontend**: https://your-app.netlify.app
- **Backend API**: https://your-app.vercel.app
- **GitHub Repository**: https://github.com/vardhan24bcs10041/skillswap-hub

## 📝 Environment Variables Summary

### Vercel (Backend)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillswap-hub-prod
JWT_SECRET=your-secure-jwt-secret-here
NODE_ENV=production
FRONTEND_URL=https://your-netlify-app.netlify.app
```

### Netlify (Frontend)
```
REACT_APP_API_URL=https://your-vercel-app.vercel.app/api
```

## 🎯 Final Submission

1. **Deploy both frontend and backend**
2. **Test your deployed application**
3. **Update your GitHub README with deployment links**
4. **Submit via Google Form**: https://forms.gle/ZDY5BX4qKwbkTefh7

## 🆘 Troubleshooting

### Common Issues:
- **CORS errors**: Check FRONTEND_URL in Heroku
- **Database connection**: Verify MongoDB Atlas connection string
- **Build failures**: Check environment variables
- **API not working**: Verify REACT_APP_API_URL in Netlify

### Support:
- Heroku: https://devcenter.heroku.com/
- Netlify: https://docs.netlify.com/
- MongoDB Atlas: https://docs.atlas.mongodb.com/
