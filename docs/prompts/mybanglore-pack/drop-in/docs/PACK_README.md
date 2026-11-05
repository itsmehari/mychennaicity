# mybanglore.in input pack

This folder is the whole Bengaluru briefing. Move **this folder** when you start the new project. Do not rebuild it from chat.

Recorded 5 November 2026 from the mychennaicity.in desk.

**Start here:** `USAGE.md` is the short step-by-step. City fit decisions are in `SESSION_RECORD.md`. Ideas not yet in the build are in `SUGGESTIONS.md`.

## What to move

Move `docs/prompts/mybanglore-pack/` as one piece. After the move, keep it inside the new repo at `docs/mybanglore-pack/` so later notes stay with the site.

## What becomes the new project

Copy **the contents** of `drop-in/` onto the empty project root. That gives you:

| Copied to the new root | Role |
| --- | --- |
| `AGENTS.md` | Rules for the new agent |
| `.cursor/rules/city-desk.mdc` | Always-on city rule |
| `docs/HOMEPAGE_DESIGN_CONTRACT.md` | Homepage look and section order |
| `docs/BUILD_PHASES.md` | Phase 0–6 build notes |
| `docs/FILE_MAP.md` | Every PHP file to create |
| `docs/MODULES.md` | How modules and tables connect |
| `docs/SESSION_RECORD.md` | The decisions from this chat |
| `docs/OPERATOR_NOTES.md` | Notes for you, not for the public site |
| `database/schema.sql` | Full MySQL database `mybanglore` |
| `database/seed.sql` | Bengaluru + twelve areas |

Then open that folder in Cursor and paste **one** file from `chat-prompts/` per chat, starting at `00-scaffold.txt`.

## Who creates the PHP

The new agent creates the PHP files. This pack does not contain a PHP app. Prompt 0 creates every path in `FILE_MAP.md` as a stub and imports `schema.sql` then `seed.sql`. Prompt 1 paints the homepage. Later prompts fill the stubs. The agent must not invent a second database.

## If the agent drifts

Reply: “Re-read AGENTS.md and the homepage design contract. Stay on the current phase.”

## Where later answers go

Append new mybanglore decisions to `SESSION_RECORD.md` in this folder. Do not leave them only in chat.
