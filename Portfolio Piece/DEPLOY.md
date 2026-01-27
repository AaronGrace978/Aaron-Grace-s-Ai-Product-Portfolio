# Portfolio Deployment Guide

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended - Free)

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Name it: `aaron-grace-portfolio`
   - Make it Public
   - Click "Create repository"

2. **Upload Files**
   - Click "uploading an existing file"
   - Drag these 4 files:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `README.md`
   - Commit with message: "Initial portfolio"

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` / `/ (root)`
   - Click Save

4. **Your Portfolio is Live!**
   - URL: `https://yourusername.github.io/aaron-grace-portfolio/`
   - Takes 1-2 minutes to go live

### Option 2: Netlify Drop (Fastest - Free)

1. Go to: https://app.netlify.com/drop
2. Drag the entire `Portfolio Piece` folder
3. Done! You get a URL instantly

### Option 3: Vercel (Free)

1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your GitHub repo or drag-and-drop folder
5. Deploy!

### Option 4: Local Testing

Just open `index.html` in your browser:
- Double-click `index.html`
- Or right-click → Open with → Browser

## Custom Domain (Optional)

If you have a domain:
1. Add `CNAME` file with your domain name
2. Point DNS to GitHub Pages/Vercel/Netlify
3. Update domain in hosting settings

## File Structure

```
Portfolio Piece/
├── index.html      ← Main page
├── styles.css      ← All styling
├── script.js       ← Interactivity
├── README.md       ← Documentation
└── DEPLOY.md       ← This file
```

## Tips

- **GitHub Pages**: Best for version control + free hosting
- **Netlify**: Fastest deployment, great for demos
- **Vercel**: Best performance, great for portfolios
- All are free and take < 5 minutes to set up!

## Need Help?

Check the console (F12) if something isn't working.
All files are self-contained - no server needed!
