# Around Taiwan on Foot: handoff notes

A celebration site for my cousin's 40-day walk around Taiwan (環島), starting and ending in Taichung.
He walked the Camino de Santiago last year, so the site is styled as a "pilgrim passport":
this trip is Vol. II, and the Camino is Vol. I.

## What's built
Three files: `index.html` (markup), `style.css` (styles), `script.js` (data + all page logic).
- **Cover (hero):** passport-green, gold-foil type. Stats (day / km walked / km to go / stamps) and an SVG map of Taiwan.
  The route is drawn red where walked and dashed gold where still to come, with a pulsing "NOW" marker.
- **Stamps:** one card per day. Finished days render as procedurally generated ink stamps
  (5 shapes, 4 ink colours, an SVG `#ink` filter for texture, seeded rotation). Future days are dashed empty slots.
  Clicking a town on the map scrolls to that day's card.
- **Vol. I: Camino:** a distance comparison bar plus a callout for the day his Taiwan km passes his Camino km,
  and a strip of shell stamps.
- Fonts: Bodoni Moda (display), IBM Plex Mono (data), LXGW WenKai TC (Chinese).

## How data works
Everything lives in the `CONFIG` and `DAYS` objects at the top of `script.js`.
- `DAYS[i]`: `{ zh, en, lon, lat, done?, km?, note?, reel?, fb?, rest?, finish? }`
- If `km` is omitted, it's estimated as haversine distance × `CONFIG.roadFactor` (1.25).
- A day becomes a stamp when `done: true`.

## Placeholders / assumptions to replace
- The route is **assumed counter-clockwise**, and the 40 stops are a guess (about 1,056 km). Replace them with his real plan.
  Day 40 (Miaoli → Taichung) currently estimates 68 km.
- Days 1–8 are marked `done` **as an example only**.
- `CONFIG.walker`, `instagram`, `facebook` and `startDate` are empty.
- The Camino is assumed to be the **Camino Francés, 780 km**. Confirm with him.
- He posts reels on Instagram and Facebook. The page links out to them; it doesn't embed them.

## Ideas not built yet
- A cheer wall / guestbook for family messages (needs a shared backend).
- A pixel-art / Phaser mode: a sprite walking the island, with each day as a level.
- Hosting with an easy phone-friendly update path (e.g. a Google Sheet or JSON feeding `DAYS`).
