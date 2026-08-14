# Blog Post SEO + Slug Checklist (keep next to the Studio)

Problem-first: publish posts that Google actually ranks, and never break a URL
a reader has already shared. Work this list before hitting Publish.

Source of truth: Google "Creating helpful, reliable, people-first content"
(developers.google.com/search/docs/fundamentals/creating-helpful-content,
last updated 2025-12-10) and the Search Quality Rater Guidelines (E-E-A-T).

## SLUG (set once, before publishing)

- [ ] Slug is a short, keyword-bearing version - NOT the full title.
      Auto slug from title is just a starting point; override it in Studio.
- [ ] Lowercase, hyphens only, no stop words (the, of, for, and), no numbers
      unless meaningful to the keyword.
- [ ] Under ~60 characters (Google truncates long URLs; short slugs read
      cleaner in the result and share better).
- [ ] Contains the primary keyword (or a very close variant) near the front.
- [ ] Target: `promptraise.com/blog/<your-keyword>` - clean, evergreen. No
      date in the URL. This is a blog, not news.
- [ ] FINAL - you will not change it after it's indexed. Changing a slug post-
      publish breaks the URL and requires a 301 (see lib/slug-redirects.ts).

Reference: title _"Why Web3 Brands Are Invisible to AI Search (and How to Fix
It)"_ -> slug `ai-search-visibility-web3` -> /blog/ai-search-visibility-web3

## TITLE + META

- [ ] Title is descriptive and specific, not clickbait. Reads like the sort
      of thing you'd bookmark or reference in a magazine.
- [ ] metaTitle <= 60 chars (overrides title), metaDescription <= 160 chars,
      written to sell the click, includes the keyword naturally.
- [ ] Page H1 matches / closely reflects the title. No multiple H1s.

## CONTENT QUALITY (Google's self-assessment)

- [ ] Original information, research, or analysis - not a rewrite of sources.
- [ ] Substantial, complete, comprehensive on the topic; insightful beyond the
      obvious answer.
- [ ] If it draws on sources, it adds real value, not copy/rewrite.
- [ ] No fluff, no padded word count, no definitive claims you can't support.
- [ ] No easily-verifiable factual errors. Proofread (no sloppy copy).
- [ ] First-hand expertise shown: actual use, real systems, real numbers,
      screenshots/evidence where relevant (Google explicitly rewards this).

## E-E-A-T (Experience, Expertise, Authoritativeness, Trust) - the "Who"

- [ ] Clear author byline on every post (name + role) - links to a bio. Your
      postType already has author{name, role, avatar, bio, twitter, linkedin}.
- [ ] Author has demonstrable expertise: real role, real credentials, linked
      X/LinkedIn, a bio. Reviewers unaffiliated with the site should read it
      as trustworthy.
- [ ] "Who / How / Why" is self-evident: who wrote it, how it was made
      (disclose AI-assisted generation where a reader would expect it), why it
      exists (to help, not to chase rankings).
- [ ] Trust is the most important E. Build it: accurate info, real authorship,
      a reachable About page, no manipulative claims.

## LINKS + INTERNAL SEO

- [ ] Internal links to related glossary terms and tool pages (PromptRaise
      glossary + /free tools) - this consolidates authority on the main domain.
- [ ] Link out to 1+ authoritative source where it strengthens the argument.
- [ ] Cover image has descriptive alt text (not just the filename).
- [ ] OpenGraph image set (your postType has openGraphImage) so shares render.

## PUBLISH (avoid the silent trap)

- [ ] status = "published" AND publishedAt is set TOGETHER. Both, or the post
      stays invisible on /blog with no error (known gotcha - the Publish
      button alone does not guarantee both).
- [ ] noindex = false (unless intentionally off-search).
- [ ] Verify live via the custom domain after ~30s (first fetch is often the
      stale ISR cache - poll a couple times).
- [ ] You are on promptraise.com/blog/... NOT the legacy blog.promptraise.com
      SPA (it has no Sanity connection and never shows CMS posts).

## GOING FORWARD

- [ ] Google has NO preferred word count. Write as long as the topic needs.
- [ ] Don't date-pad / delete content just to look "fresh" - meaningless.
- [ ] External third-party, unaffiliated reviewers: honest feedback beats self
      review.
