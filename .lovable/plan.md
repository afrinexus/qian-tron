# Responsive catalogue images and richer structured data

## Scope

- Extend the shared image utility so catalogue media can produce responsive image variants at practical thumbnail, card, and hero widths.
- Use the image service’s public render endpoint for CMS-uploaded catalogue files, while safely falling back to the original URL for bundled or external images.
- Upgrade the shared focal image renderer to emit `srcset`, `sizes`, explicit decoding/fetch-priority behavior, and the original image as a fallback.
- Assign layout-appropriate `sizes` values to category heroes, machine cards, related items, machine-detail images, and gallery slides.
- Replace remaining raw catalogue images on the requested pages with the shared responsive renderer.
- Represent structured-data images as Schema.org `ImageObject` entries containing absolute URL, caption, and alt-text-derived description/name when available.
- Apply the enriched image arrays consistently to category, machinery-type, and individual machine Product/Collection JSON-LD.

## Technical details

- Responsive variants will be generated on demand and cached by the existing public image delivery service; no duplicate uploads or database schema changes are needed.
- Width candidates will be constrained to useful display sizes (roughly 320–1920px), with crop-free resizing so stored focal points remain a presentation concern rather than destructively altering source files.
- JSON-LD will continue to use crawlable absolute URLs. `ImageObject.contentUrl` will reference the original global URL, while captions and alt text populate `caption`, `description`, and `name` only when present.
- Open Graph images remain plain absolute URLs because those tags do not accept Schema.org image objects.

## Verification

- Confirm the project builds successfully.
- Inspect rendered category and machine pages at desktop and mobile widths to verify `srcset`/`sizes`, focal positioning, and image visibility.
- Inspect emitted JSON-LD to confirm image arrays contain valid `ImageObject` objects with URLs and available captions/alt text.
