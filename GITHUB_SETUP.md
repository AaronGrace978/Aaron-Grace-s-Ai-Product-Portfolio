# GitHub Setup Guide - Command Line Method

## Step 1: Initialize Git (if not already done)

Open PowerShell in the Portfolio Piece folder:

```powershell
cd "C:\Ai Projects\Portfolio Piece"
git init
```

## Step 2: Add All Files

```powershell
git add .
```

## Step 3: Create First Commit

```powershell
git commit -m "Initial portfolio upload"
```

## Step 4: Add GitHub Remote

Replace `YOUR_USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/AaronGrace978/portfolio.git
```

## Step 5: Push to GitHub

```powershell
git branch -M main
git push -u origin main
```

## Step 6: Enable GitHub Pages

1. Go to your repo on GitHub
2. Settings → Pages
3. Source: `main` branch, `/ (root)` folder
4. Save

## Your Portfolio Will Be Live At:

`https://AaronGrace978.github.io/portfolio/`

---

## Troubleshooting

**If you get authentication errors:**
- Use GitHub Desktop (easier)
- Or set up a Personal Access Token

**If files don't show:**
- Make sure `index.html` is in the root folder
- Check that all files are committed

**If GitHub Pages doesn't work:**
- Wait 2-3 minutes for deployment
- Check Settings → Pages for errors
- Make sure repo is Public
