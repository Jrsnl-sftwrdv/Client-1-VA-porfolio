# Media folder — drop your files here

Replace placeholder paths in `index.html` with your actual files. Keep the same filenames **or** update the `src` / `href` attributes in the HTML.

## Folder structure

```
assets/
├── images/
│   ├── profile.jpg          ← Your main hero photo
│   ├── achievement-1.jpg
│   ├── achievement-2.jpg
│   ├── achievement-3.jpg
│   ├── edit-thumb-1.jpg     ← Thumbnails for video cards
│   ├── edit-thumb-2.jpg
│   ├── edit-thumb-3.jpg
│   ├── edit-thumb-4.jpg
│   ├── promo-1.jpg          ← Promotion previews
│   ├── promo-1-full.jpg     ← Full-size (opens in new tab)
│   ├── promo-2.jpg
│   ├── promo-2-full.jpg
│   ├── promo-3.jpg
│   ├── promo-3-full.jpg
│   ├── promo-4.jpg
│   ├── collab-brand-1.png   ← Partner logos (PNG with transparent bg works best)
│   ├── collab-brand-2.png
│   ├── collab-brand-3.png
│   └── collab-brand-4.png
├── videos/
│   ├── edit-reel-1.mp4
│   ├── edit-reel-2.mp4
│   ├── edit-youtube-1.mp4
│   └── edit-ad-1.mp4
└── resume.pdf               ← Optional CV download
```

## Sample `href` / `src` paths (copy into HTML)

| What | Sample path |
|------|-------------|
| Profile photo | `assets/images/profile.jpg` |
| Achievement image | `assets/images/achievement-1.jpg` |
| Video file (local) | `assets/videos/edit-reel-1.mp4` |
| Video on card | `data-video="assets/videos/edit-reel-1.mp4"` |
| Promo image | `assets/images/promo-1.jpg` |
| Promo full view | `href="assets/images/promo-1-full.jpg"` |
| Live website link | `href="https://your-live-campaign-url.com"` |
| YouTube embed (alternative) | Use `data-video="https://www.youtube.com/embed/VIDEO_ID"` and change modal to iframe if needed |
| External image URL | `src="https://yoursite.com/uploads/photo.jpg"` |

## Tips

- **Images:** JPG for photos, PNG for logos. Recommended hero size: 960×1200px or similar 4:5 ratio.
- **Videos:** MP4 (H.264) works in all modern browsers. Keep files under ~20MB for faster loading, or host on YouTube/Vimeo and link externally.
- Until you add files, gray placeholders will show automatically.
