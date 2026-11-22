<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## XOENSOFT
- All products, releases and platform builds live in `src/data/products.ts`; pages are generated from it. Why: new products/releases need no redesign.
- A download button renders only when a build is `available` and has a real `downloadUrl`; otherwise "Coming Soon". Why: never fake downloads.
- Product web app URLs come from `VITE_XS_<PRODUCT>_URL` env vars (XS One defaults to the in-repo `/one` app). Why: apps deploy independently.
- `/one` (XS One web app) renders without the marketing nav/footer and stores tasks in localStorage until accounts exist.
- Brand logos are local files in `src/assets/` (imported by `src/components/site/brand.tsx`). Do NOT reintroduce `/__l5e/assets-v1/...` URLs — they only resolve on Lovable hosting.
- Contact form opens a pre-filled GitHub issue (`src/lib/site.ts`); there is no backend email.

## Build & deploy
- `npm install` (npm; `bun.lock` also present for Lovable), `npm run dev` (port 8080), `npm run build`, `npm run lint`, `npm run test`.
- Production target: **Cloudflare Pages** via Nitro `cloudflare-pages` preset (set in `vite.config.ts`). Build emits `dist/` (static assets + `_worker.js` SSR + `_routes.json`/`_headers`/`_redirects`).
- Deploy: `npx wrangler pages deploy dist --project-name=xoensoftofficial --branch=main` (project already exists; `wrangler login` or `CLOUDFLARE_API_TOKEN` required).
- Live at **https://xoensoftofficial.pages.dev** — the branded public URL. Do not redeploy the old Workers target.
- `vite preview` does NOT work for this stack; preview locally with `npx wrangler pages dev dist`.
- Security headers are set in `src/server.ts` (SSR) and `public/_headers` (static assets, merged by Nitro into `dist/_headers`).
- XS One Android APK is hosted as a GitHub Release asset on this repo, not in `public/` (too large for static hosting). Update `src/data/products.ts` when cutting a new release.
