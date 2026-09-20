# Screenshot assets

Keep detailed originals under `src/assets/<project>/`. After adding or replacing
an original, run:

```sh
npm run images:generate
```

The development-only Sharp script produces WebP gallery previews at 640px and
1200px wide (capped at the original width), plus measured dimensions in
`src/data/screenshot-images.json`. It skips `src/assets/thumbnails/` when scanning
originals. Images are resized without cropping. Originals are never rewritten.

In `src/data/projects.ts`, set the screenshot's `src`, spread the matching
`screenshotImages[src]` entry, and provide its alt text and optional caption.
Commit the generated metadata and previews alongside the project data. Normal
builds use these checked-in files; they do not run the image generator.

The gallery uses responsive previews and reserves the original aspect ratio.
Opening the lightbox loads the original. After regeneration, run the unit and
browser tests and inspect the preview and enlarged image for legibility.

When removing or renaming an original, remove its obsolete previews as well;
the generator deliberately does not delete files. Normalize any EXIF rotation
in a new source image before adding it.
