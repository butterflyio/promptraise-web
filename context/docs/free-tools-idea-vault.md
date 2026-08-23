# PromptRaise Free-Tools Vault (idea list)

> Status: living document. Goal: ONE free tool kept live at a time (currently
> capped to one), open-sourced, acting as a magnet. Use this vault to pick the
> next magnet + identify gaps our internal tools can fill.
>
> Rule: every free tool must (a) serve a real tool-intent search,
> (b) showcase an internal PromptRaise capability, (c) be cheap to run on
> Vercel/Supabase/OpenRouter, (d) be open-sourceable without leaking secrets.
>
> Owner: Zain Khan. Maintained by Hermes. Created 2026-08-22.

## Current live free tools (PromptRaise)

| Tool                      | URL/status                             | Notes                                |
| ------------------------- | -------------------------------------- | ------------------------------------ |
| Flesch-Kincaid Calculator | /free/flesch-kincaid-calculator (LIVE) | readability engine (npm/pkg, MIT)    |
| GEO Keyword Finder        | live                                   | tool-intent landing                  |
| Broken Link Finder        | live                                   | outreach lead-gen                    |
| AI Visibility Checker     | audit.promptraise.com (LIVE)           | the product itself, free tier        |
| Authority Checker         | PARKED                                 | deprecated-looking; don't revive yet |

The ONE current magnet = **AI Visibility Checker** (the core product, free
entry). FK calculator is the secondary lead-magnet per Zain's mental model.

## Idea vault (candidate free tools, ranked by magnet strength)

### Tier 1 - build/keep these first

1. **LLM Citation Checker** (CLI, open source)
   - Input a domain/topic -> sample 10-20 real prompts across ChatGPT,
     Perplexity, Gemini, Grok (ask "recommend a source for X") -> output
     whether the brand is cited, by which models, with screenshots/links.
   - Magnet: "Am I cited by AI?" is the exact question buyers ask. Feeds PR-52
     (the cited layer) dogfood.
   - Data: OpenRouter + free LLM responses; no DataForSEO needed for v1.
   - Open-source story: this is the reference implementation of "measure your
     AI citations" - nobody has packaged it as OSS yet.
2. **AI-Readiness Site Scanner** (URL -> technical AI-audit score)
   - Audit a URL for the 10 extraction factors: schema, headings, answer-first
     sentences, llms.txt presence, robots indexing, TOC anchors, direct
     answers, first-party facts, FAQ structure, entity consistency.
   - Magnet: site owners type their domain, get a score + concrete fix list.
     This IS audit.promptraise.com's free tier, packaged for blogs.
   - Internal link: scores link back to glossary term pages + blog fixes.
3. **GEO Brief Generator** (keyword -> AI-visible article outline)
   - Input a keyword -> pull competitor H2/H3 outline (like the demo above) ->
     output a question-headed, answer-first outline with semantic term
     coverage + TOC structure, ready to paste into Sanity.
   - Magnet: content teams. This is the NeuronWriter-value layer, built in,
     free, and CLI-able.

### Tier 2 - strong, next wave

4. **Answer Capsule Generator** (paste paragraph -> rewrite as direct answer)
   - Take a dense paragraph, produce the first-sentence answer + capsule
     structure the LLM-extraction layer wants.
   - Magnet: writers. Very cheap (one OpenRouter call).
5. **llms.txt Validator / Page Lister**
   - Input a domain -> fetch /llms.txt, validate, suggest the ideal list.
   - Magnet: technical SEOs, ties to our llms.txt work; OSS-friendly.
6. **TOC + Heading Structure Checker**
   - Input URL -> check heading hierarchy, question-headed H2s, anchor ids,
     TOC present for >4 H2s. Mirrors the exact standards we just shipped.
   - Magnet: on-page SEO folks; dogfoods our own implementation.
7. **Entity Consistency Checker** ("does the web agree on your brand?")
   - Sample Google/Bing results + known profiles -> flag naming/schema
     contradictions the LLM entity-check dislikes (Victoria's factor #1).
   - Magnet: personal brands, founders. DataForSEO or free SERP.
8. **Readability Network Graph** (FK + Gunning Fog + SMOG + ARI + Coleman-Liau)
   - Multi-formula readability dashboard. Extends the live FK calculator.
   - Magnet: writers/editors, upgrades existing traction.

### Tier 3 - niche / when the size fits

9. **Broken-Link Prospector for Web3** (find dead links on protocol sites -> their SEO/PR teams)
   - Magnet: outreach leadgen (we already run this manually; productize it).
10. **Keyword-to-Prompt Mapper** (for each keyword, show the buyer's exact
    ChatGPT/Perplexity prompt that reads like that keyword)
    - Magnet: AEO curious marketers. Cheap, unique angle.
11. **Structured Data Validator (AI-extraction focused)** (JSON-LD -> what an AI crawler extracts)
    - Magnet: technical SEO; pairs with our schema knowledge.
12. **LLM Nudge Button Generator** (generate the Ask-ChatGPT/Perplexity/Grok/
    Google-AI button HTML we shipped on blogs, for any site)
    - Magnet: viral potential - free tool that installs the GEO nudge.
    - Dogfood: exactly our blog-ask-llm component, open-sourced.

## Gap analysis (internal tools -> free magnets)

- PR-52 (cited layer) -> LLM Citation Checker. Build the checker OSS, and the
  paid product is the multi-brand dashboard.
- DataForSEO monthly digest -> LLM Citation Checker v1 data source.
- The audit tool's technical factors -> AI-Readiness Site Scanner (free tier).
- Blog hygiene standards (TOC/anchors/gap/glossary) -> TOC Checker + Validator.

## Open-source strategy (the "only keep one for now" rule)

- **Chosen v1 to open source: the LLM Citation Checker (CLI).**
  Rationale: it is the reference implementation of the exact problem
  PromptRaise sells; OSS credibility builds the entity "PromptRaise = the
  authority on AI citations"; it is the most shareable/installable artifact
  (a CLI, no hosting cost to us); it naturally funnels to audit.promptraise.com
  (free tier) -> paid dashboard. Matches Zain's dogfood-first style.
- Other tools stay product-side until the checker proves adoption, then the
  next magnet gets picked from Tier 1.

## Case-study engine (become the case study, then clients)

- **PromptRaise IS the case study**: publish monthly "we measured our own AI
  citations" reports using the checker - screenshots of ChatGPT/Perplexity/
  Gemini citing promptraise.com, with the fix-log behind each gain.
  - Template: baseline score -> actions taken (TOC, glossary links, Ask-LLM
    box, llms.txt, answer capsules) -> measured change -> screenshots.
- **Client/partner case studies**: run the same 4-step playbook for 2-3
  Web3 brands (each case study = their own citation baseline + fixes + delta).
  Use Victoria's #2 lesson: "documented results with numbers models can quote"
  - every case study = a tabular, quotable asset.
- **Publish cadence**: 1 case study / month on /blog + repost on llms.txt +
  link from glossary terms + Ask-LLM box on the case-study post itself
  (dogfood the nudge on the evidence page).
