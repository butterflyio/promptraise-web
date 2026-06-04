# Unit 03: Vercel Environments (Production and Staging)

## Goal

Configure Vercel deployments for production and staging, ensure staging is
non-indexable, and keep production cutover deferred until redirect validation is
complete.

## Design

No UI changes. Environment and deployment configuration only.

## Implementation

### Deployment mapping

Map `main` to production and `staging` branch to `staging.promptraise.com`.

If the Vercel project is not connected to a Git repository yet, connect Git first;
branch-based environment mapping and automatic preview deployments require it.

### Staging safety

Apply `noindex` and disallow-all crawler behavior for staging responses.

### Environment variables

Set scoped env vars for production vs staging/preview.

- `SITE_ENV=production` for production deployments.
- `SITE_ENV=staging` for staging branch deployments.
- `NEXT_PUBLIC_SITE_URL=https://www.promptraise.com` for production.
- `NEXT_PUBLIC_SITE_URL=https://staging.promptraise.com` for staging.

### Validation

Confirm preview builds, staging deployment health, and unchanged live production
website before cutover unit.

## Dependencies

- Vercel project access
- DNS access for `promptraise.com`

## Verify when done

- [ ] `staging.promptraise.com` deploys successfully.
- [ ] Staging serves non-indexable headers and crawler restrictions.
- [ ] PR previews are generated and accessible.
- [ ] Existing live production site remains unaffected.
- [ ] Environment variables are scoped by environment.
- [ ] `SITE_ENV` and `NEXT_PUBLIC_SITE_URL` are set per environment in Vercel.
- [ ] Project is connected to Git so `staging` branch and PR previews are routable.
- [ ] No TypeScript errors (N/A in this unit).
- [ ] No console errors (N/A in this unit).
- [ ] Responsive at mobile and desktop (N/A in this unit).
- [ ] `npm run build` passes (app build health confirmed in pipeline).
