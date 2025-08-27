# Portfolio Website – Firebase Hosting Deployment Guide

This project is built with **Expo (React Native Web)** and deployed using **Firebase Hosting**.  
Follow these instructions whenever you want to build, update, and redeploy your site.

---

## 🚀 First-Time Setup

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

Initialize Firebase Hosting (only once per project):

bash
Copy code
firebase init hosting
Select: Use existing project

Choose your Firebase project (e.g., portfoliowebsite-4bffc)

Public directory: dist

Configure as a single-page app: Yes

GitHub Action deploys: No

This creates two files:

firebase.json → Hosting config

.firebaserc → Project reference

Your firebase.json should look like this:

json
Copy code
{
"hosting": {
"public": "dist",
"ignore": [
"firebase.json",
"**/.*",
"**/node_modules/**"
],
"rewrites": [
{
"source": "**",
"destination": "/index.html"
}
]
}
}
🔨 Build for Web
Whenever you make code changes and want to update the site, run:

bash
Copy code
npx expo export
This generates a production-ready web build inside the dist/ folder.

🌍 Deploy to Firebase Hosting
After building, deploy with:

bash
Copy code
firebase deploy --only hosting
Redeploying Updates

Make code changes in your project.

Commit your changes to GitHub (optional).

Run:
npm run deploy
