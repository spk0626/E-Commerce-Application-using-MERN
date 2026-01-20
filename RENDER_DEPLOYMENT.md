# Deployment Guide for Render


## Prerequisites
- GitHub account with the project repository
- MongoDB Atlas account (already configured)
- Render account (https://render.com)

## Steps to Deploy

### 1. Push Your Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### 2. Create a New Web Service on Render
- Go to https://render.com
- Click "New +" button
- Select "Web Service"
- Connect your GitHub repository

### 3. Configure the Service
- **Name**: `gardening-store-app` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to you
- **Plan**: Free (or paid for better performance)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### 4. Add Environment Variables
In the Render dashboard, add these environment variables:

```
NODE_ENV=production
ATLAS__URI=<YOUR_MONGODB_ATLAS_CONNECTION_STRING>
JWT_KEY=<YOUR_JWT_SECRET_KEY>
PORT=<will be auto-assigned by Render>
```

Get your MongoDB connection string from MongoDB Atlas:
1. Go to MongoDB Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Drivers" and copy the connection string
4. Replace `<password>` with your database password

### 5. Deploy
- Click "Create Web Service"
- Render will automatically deploy your app when you push changes to GitHub

### 6. Access Your App
- Once deployment is complete, you'll get a URL like: `https://gardening-store-app.onrender.com`

## Environment Variables Required

| Variable | Value |
|----------|-------|
| NODE_ENV | production |
| ATLAS__URI | Your MongoDB Atlas connection string |
| JWT_KEY | Your JWT secret key |

## Important Notes

- The first deployment may take 5-10 minutes
- Free tier services spin down after 15 minutes of inactivity
- For production use, upgrade to a paid plan
- Make sure your MongoDB Atlas IP whitelist includes Render's IP (or allow all: 0.0.0.0/0)

## Troubleshooting

### Port Issues
- Render automatically assigns a PORT. The server is configured to use `process.env.PORT || 8080`

### MongoDB Connection Issues
1. Check your ATLAS__URI is correct
2. Verify IP whitelist in MongoDB Atlas (0.0.0.0/0 for Render)
3. Check database username and password

### Frontend Not Loading
- Make sure the build command completes successfully
- Check that `frontend/build` directory is created

## Manual Deployment (Alternative)

If you prefer manual deployment:
1. Install Render CLI
2. Run `render deploy --name gardening-store-app`
3. Follow the prompts

## Updating Your App

Simply push changes to GitHub and Render will automatically rebuild and deploy!

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Render will detect the changes and redeploy automatically.
