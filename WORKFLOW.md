# ETO Site — Setup & Editing Workflow

This walks through connecting the local project to GitHub, connecting GitHub to Netlify for auto-deploy, and the day-to-day loop for editing the site in VS Code.

## Where things stand already

- **Netlify site created:** `expedition-team-overland` (project ID `4ad72f9a-5438-400d-9aff-609a78bd3ef2`), live at `https://expedition-team-overland.netlify.app` once a deploy lands.
- **Local git repo:** initialized in the `ETO-SITE` folder, on branch `main`, with commits already made.
- **GitHub repo created:** `expedition-team-overland` (empty, no commits yet).

Nothing is connected to anything yet — that's what steps 1–2 do.

---

## Step 1 — Push the local repo to GitHub

Open Terminal and run:

```bash
cd "/Users/skilet/Desktop/Expedition Team Overland/ETO-SITE"
git remote add origin https://github.com/YOUR-USERNAME/expedition-team-overland.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

If Git asks for a password and rejects it, GitHub no longer accepts account passwords over HTTPS — it wants a **personal access token** instead:

1. GitHub → your avatar → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**.
2. Give it `repo` scope, generate it, and copy it somewhere safe (GitHub only shows it once).
3. When Git prompts for a password, paste the token instead.

After this, refresh the GitHub repo page — your files should be there.

---

## Step 2 — Link GitHub to Netlify

1. Go to [app.netlify.com/projects/expedition-team-overland](https://app.netlify.com/projects/expedition-team-overland).
2. **Site configuration** → **Build & deploy** → **Link repository** (sometimes labeled "Link site to Git" or "Connect to Git provider").
3. Choose **GitHub**. If this is the first time, Netlify will ask you to authorize access to your GitHub account — approve it, and give it access to the `expedition-team-overland` repo specifically (or all repos, your call).
4. Select the `expedition-team-overland` repo and the `main` branch.
5. Build settings — this site has no build step, so:
   - **Build command:** leave blank
   - **Publish directory:** `/` (the repo root)
6. Save. Netlify will kick off a deploy immediately, and the site goes live at `expedition-team-overland.netlify.app`.

From this point forward, **every `git push` to `main` triggers an automatic deploy.** No more manual dragging or CLI commands.

---

## Step 3 — Set up VS Code

1. Open VS Code → **File** → **Open Folder** → select `ETO-SITE`.
2. Install the **Live Server** extension (Extensions panel, search "Live Server" by Ritwick Dey).
3. To preview locally: right-click `index.html` in the file explorer → **Open with Live Server**. It opens the site at `http://127.0.0.1:5500` with auto-reload on every save — this is a more accurate preview than double-clicking the file, since it serves over `http://` the same way Netlify does.

That's the whole setup. No build tools, no npm install, no config files needed — it's plain HTML/CSS/JS by design (see the project's build notes on why).

---

## Step 4 — The everyday editing loop

Once steps 1–3 are done, here's the cycle for every future change:

1. Open the project in VS Code (`ETO-SITE` folder).
2. Edit `index.html`, `css/style.css`, or `js/main.js` directly.
3. Save, check the change live via Live Server.
4. When you're happy with it, commit and push:
   ```bash
   git add -A
   git commit -m "Describe what changed"
   git push
   ```
5. Netlify picks up the push automatically and redeploys — usually live within a minute or two. Check progress at [app.netlify.com/projects/expedition-team-overland/deploys](https://app.netlify.com/projects/expedition-team-overland/deploys).

That's it — edit, save, push, done.

---

## Later, not now: pointing your real domain

Your domain (`expeditionteamoverland.com`) is registered at GoDaddy with DNS only — it isn't pointed at Netlify yet. When you're ready to go live on the real domain instead of the `.netlify.app` one, that's **Site configuration → Domain management** in Netlify, plus a DNS change at GoDaddy. Not needed for now — just flagging it as the next step whenever you want it.
