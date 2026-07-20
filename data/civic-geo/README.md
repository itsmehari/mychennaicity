# Civic geo source data

## Ingestion checklist (required for ward migration rows)

1. Source document (GO / gazette / GCC council resolution / official GIS export).
2. `source` — human-readable citation with URL or document number.
3. `sourceDate` — ISO date of the document.
4. `geographyVersion` — `gcc-15`, `gcc-20-proposed`, or `gcc-23-2022`.
5. `verificationStatus` — must be `official` or `verified` to publish.
6. `methodology` — how ward numbers were matched (must not be “visual media map only”).
7. `confidence` — `high`, `medium`, or `low`.

## Build

```bash
npm run civic-geo:build
```

Reads `public/data/chennai-map/` and writes `public/data/civic-geo/`.

Bump `CIVIC_GEO_VERSION` in `scripts/build-civic-geo-data.ts` when geometry or assignments change.
