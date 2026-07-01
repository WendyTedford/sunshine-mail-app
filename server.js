# Sunshine Mail Poem Tool — Deployment Guide

Follow this exactly, in order. It's all clicking, no coding.

## Part 1 — Get your Claude API key
1. Go to https://console.anthropic.com and sign up (separate from claude.ai).
2. Click **Get API Keys** (or **Settings → API Keys**).
3. Click **Create Key**, name it "Sunshine Mail", and copy the long key (starts with `sk-ant-`). Save it somewhere safe — you'll paste it once and won't see it again.
4. Add a small amount of credit (e.g. $10) under **Billing**. Each poem generation costs a fraction of a cent.

## Part 2 — Put the code on GitHub (free)
1. Go to https://github.com and sign up.
2. Click the **+** in the top right → **New repository**.
3. Name it `sunshine-mail-app`, keep it **Public** or **Private** (either works), click **Create repository**.
4. On the next page, click **uploading an existing file**.
5. Drag in all the files from this folder (`server.js`, `package.json`, and the `public` folder with `index.html` inside).
6. Click **Commit changes**.

## Part 3 — Deploy on Render (free)
1. Go to https://render.com and sign up using your GitHub account.
2. Click **New +** → **Web Service**.
3. Choose your `sunshine-mail-app` repository and click **Connect**.
4. Leave the defaults, but confirm:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Scroll to **Environment Variables** → click **Add Environment Variable**.
   - Key: `ANTHROPIC_API_KEY`
   - Value: paste the key from Part 1
6. Click **Create Web Service**. Wait a minute or two while it builds — you'll see a live log.
7. When it's done, Render gives you a working URL like `sunshine-mail-app.onrender.com`. Click it — your tool is live.

## Part 4 — Point your subdomain at it
1. In Render, on your service page, go to **Settings → Custom Domains → Add Custom Domain**.
2. Type `write.hellosunshinemail.com` and click **Save**. Render will show you a CNAME target (something like `sunshine-mail-app.onrender.com`).
3. Go to your domain account at Porkbun, open `hellosunshinemail.com` → **DNS Records**.
4. Add a new record:
   - Type: **CNAME**
   - Host: `write`
   - Answer: the target Render gave you
5. Save. DNS changes can take anywhere from a few minutes to a couple hours to work everywhere.
6. Once it's live, `write.hellosunshinemail.com` will show your poem tool directly.

## Notes
- Render's free tier "sleeps" the tool after 15 minutes of no visitors — the first visit after that takes ~30–60 seconds to wake up, then it's fast again. If that bothers you once you have real customers, Render's paid tier ($7/mo) keeps it always-on.
- If you ever need to update the poem tool's wording or add a feature, come back to this chat, make the change, and re-upload the changed files to GitHub — Render automatically redeploys.
