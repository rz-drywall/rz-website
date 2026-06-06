Add a new blog post from a markdown file.

Usage: /add-blog-post <path-to-markdown-file>

The argument should be the path to a markdown (.md or .docx) file containing the blog post content. For .docx files, use `pandoc` to convert to markdown first (`pandoc input.docx -t markdown -o /tmp/output.md`).

## Steps

1. **Read the source markdown file** at the path provided as `$ARGUMENTS`. If no path is provided, ask the user for it.

2. **Ask the user** the following questions before proceeding:
   - **Author**: Who wrote the post? (default: "Tyler", role: "Co-Founder & CEO", image: "/team/tyler-beim.jpg")
   - **Publish date**: What date? (default: current month). Always use the **1st of the month** — e.g., if the user says "March 2026", use "March 1, 2026" / "2026-03-01". If they give a specific date like "April 1", use that exactly.
   - **Category**: What category? (default: same as the most recent post — check the latest file in `content/blog/`)
   - **Slug**: Suggest a slug derived from the title and confirm with the user
   - **Featured image**: Ask if the user has a separate file to use as the hero image. If so, copy it to `public/blog/{slug}.png`.

3. **Extract any embedded base64 images** from the markdown file:
   - Look for patterns like `[imageN]: <data:image/png;base64,...>` at the end of the file
   - Decode and save each to `public/blog/` with descriptive names based on the slug (e.g., `public/blog/{slug}.png` for the featured image, `public/blog/{slug}-chart.png` for additional images)
   - If the user provides a separate high-res image file path, copy that to `public/blog/{slug}.png` instead

4. **Clean up the markdown content** for MDX:
   - Remove the base64 image definitions from the bottom of the file
   - Remove any image-only header lines (e.g., `# **![][image1]**`)
   - Replace inline image references like `![][imageN]` with proper markdown image syntax pointing to the extracted files in `/blog/`
   - Convert bullet characters (`•`) to standard markdown dashes (`-`)
   - Remove escaped backslashes before hyphens (`\-` → `-`), escaped quotes (`\"` → `"`), `{.underline}` spans
   - Remove empty/blank headings (e.g., `## ` with nothing after)
   - Remove bold wrapping from headings (e.g., `## **Title**` → `## Title`)
   - Remove trailing periods from heading punctuation like `## Title.` → `## Title`
   - Clean up excessive blank lines
   - Ensure proper spacing between images and headings
   - Convert Word-style grid tables (`+----+----+`) and pipe tables into clean markdown tables

5. **Create data visualizations** for any figures, charts, or data tables in the source:
   - If the original document references figures (e.g., "FIGURE 1:", "FIGURE 2:") or contains data tables that would benefit from visual presentation, create **SVG chart files** in `public/blog/`
   - **Even for narrative essays without explicit "FIGURE" callouts, aim for 2–3 SVG charts** when the article contains visualizable statistics. Look for: paired comparison stats, multi-tier funnels, age/cohort progressions, before/after numbers, and ranked lists. The reference Iran post has 3 charts; the reference Fairway post has 2. One-chart posts feel undersupported when the data is there.
   - **Design rules for SVGs:**
     - Use a **white background** (`#ffffff`) with a subtle border (`stroke="#e5e7eb"`) and rounded corners (`rx="16"`)
     - Use `font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"`
     - Title text: `fill="#111827"`, `font-size="20"`, `font-weight="800"`
     - Subtitle/source text: `fill="#6b7280"`, `font-size="13"`
     - Label text: `fill="#374151"`, `font-size="16"`, `font-weight="700"`
     - Value text: `font-size="18"`, `font-weight="800"`, color matched to bar
     - Use gradient fills on bars for depth (give each gradient a unique `id` prefixed with the chart name to avoid collisions when multiple SVGs render on the same page)
     - Keep text large and readable — these render at blog width
   - For **horizontal bar charts**: labels left-aligned, bars starting from a consistent x, values right of bars
   - For **scenario/comparison tables**: use color-coded columns (green for mild, yellow for moderate, red for severe), with a legend row at the bottom
   - Always include a source line at the bottom of the SVG (`fill="#6b7280"`, `font-size="13"`) so the chart is self-documenting
   - Reference them in the MDX as `![Alt text](/blog/{slug}-{chart-name}.svg)`

6. **Use custom MDX components** where appropriate:

   **`<Callout>` for highlighted data boxes:**
   Use for key statistics, data callouts, or important lists that should stand out from body text.
   ```mdx
   <Callout title="Title Here" variant="warning">
   - Bullet point one
   - Bullet point two
   </Callout>
   ```
   - `variant="warning"` — red background with ⚠ triangle icon (for risks, critical data)
   - `variant="info"` — amber background with ⚡ lightning icon (for market data, key facts)
   - Component: `components/blog-callout.tsx`, registered in `components/mdx-components.tsx`

   **`<Sources>` for inline source citations:**
   Wrap groups of source links that appear after a section. These render as small, muted text with a subtle top border — always visible (no expand/collapse).
   ```mdx
   <Sources>
   - [Source Name](https://url)
   - [Another Source](https://url)
   </Sources>
   ```
   - Component: `components/blog-sources.tsx`, registered in `components/mdx-components.tsx`

7. **Create the MDX file** at `content/blog/{slug}.mdx` with this frontmatter format:

   ```yaml
   ---
   title: "Post Title Here"
   description: "A short description/subtitle of the post"
   date: "Month 1, Year"
   datetime: "YYYY-MM-01"
   author: "Tyler"
   authorRole: "Co-Founder & CEO"
   authorImage: "/team/tyler-beim.jpg"
   image: "/blog/{slug}.png"
   imageAlt: "Post Title Here"
   category: "Marketing"
   ---
   ```

   - `title` and `description` should be **different** — don't duplicate content between them. The title is the headline; the description is the subtitle/hook shown in the blog listing before you click.
   - Use the post's title for `imageAlt`.

8. **Verify** the new file exists by reading it back. The sitemap (`app/sitemap.ts`) picks up new posts automatically from `getAllPosts()`, so no manual sitemap edit is needed.

## Important notes

- **Images in MDX** are rendered via `BlogImageLightbox` (`components/blog-image-lightbox.tsx`) — they are automatically click-to-expand with a fullscreen lightbox overlay. No extra markup needed; standard `![alt](/path)` syntax works.
- **MDX components available**: `Callout`, `Sources` — registered in `components/mdx-components.tsx`
- The blog content area has `max-w-2xl` — keep SVG viewBox widths around 720-780px for good fit.
- All blog images go in `public/blog/`.
- The full "Sources and Further Reading" list at the bottom of the article should remain as a standard markdown heading + bullet list (not wrapped in `<Sources>`).
