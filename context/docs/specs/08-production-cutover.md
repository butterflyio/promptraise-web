# Unit 8 — Production Cutover

## Status

- `main` branch merged with all V1 features (Units 1–7)
- Production deployment triggered automatically via Git push
- `www.promptraise.com` added to Vercel project

## DNS Configuration Required

The domain `promptraise.com` is currently using NS1 nameservers (dns1.p09.nsone.net). To point `www.promptraise.com` to Vercel:

### Option A: A Record (Recommended for apex/www)

Add an A record at your DNS provider:

```
Type: A
Name: www
Value: 76.76.21.21
TTL: 600
```

### Option B: CNAME Record (For www subdomain)

Add a CNAME record at your DNS provider:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

### Option C: Change Nameservers (Full Vercel DNS)

Change your domain's nameservers to:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

## Post-DNS Steps

1. **Verify propagation**: Wait 5–60 minutes for DNS propagation
2. **Test HTTPS**: Visit `https://www.promptraise.com` — Vercel auto-provisions SSL
3. **Verify redirects**: Ensure `http://` redirects to `https://`
4. **Check staging is still protected**: Confirm `staging.promptraise.com` still returns `X-Robots-Tag: noindex`
5. **Submit sitemap**: Submit `/sitemap.xml` to Google Search Console and Bing Webmaster
6. **Verify analytics**: Confirm `@vercel/analytics` is receiving data

## Rollback Plan

If issues occur:

1. Revert DNS record back to previous value
2. Or switch Vercel production deployment to previous commit via CLI/dashboard

## Current V1 Feature Status

| Feature                          | Status             |
| -------------------------------- | ------------------ |
| Dark brand theme                 | ✅ Live            |
| Landing page (8 sections)        | ✅ Live            |
| Header + Footer                  | ✅ Live            |
| robots.txt (AI crawlers allowed) | ✅ Live            |
| sitemap.xml                      | ✅ Live            |
| llms.txt                         | ✅ Live            |
| Organization + WebSite JSON-LD   | ✅ Live            |
| OG/Twitter metadata              | ✅ Live            |
| Privacy notice                   | ✅ Live            |
| Cookieless analytics             | ✅ Live            |
| 404 page                         | ✅ Live            |
| Manifest                         | ✅ Live            |
| Sanity Studio                    | ✅ Live at /studio |

## Next Steps After Cutover

- Unit 9: 48-hour observation and validation
- V2 scope: Content engine (articles, authors, categories), additional pages (about, contact, glossary, FAQ, roadmap), markdown mirrors, RSS, IndexNow
