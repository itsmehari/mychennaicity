# How to start mybanglore.in

Short usage. One phase per chat. Do this in a **new** Cursor window, not inside the Chennai repo.

## Before you open Cursor

1. Install **PHP 8.2+** and **MySQL 8** (or MariaDB 10.6).
2. In MySQL, create an empty database named `mybanglore` and a user that can write to it. You do not import SQL by hand. Prompt 0 does that.
3. Make a new empty folder, for example `E:\mybanglore`.

## Put the pack in that folder

4. Copy the **contents** of `drop-in\` into `E:\mybanglore\` (so `AGENTS.md` sits at the root).
5. Copy this whole `mybanglore-pack` folder to `E:\mybanglore\docs\mybanglore-pack\` so the chat prompts stay with the site.
6. In Cursor: **File → Open Folder** → `E:\mybanglore`. Confirm you do not see the Chennai `src\` tree.

## First chat — skeleton

7. Open a new agent chat. Paste the whole file `docs\mybanglore-pack\chat-prompts\00-scaffold.txt`.
8. When it asks for the database, give it the host, database name `mybanglore`, user, and password. Those go in `config\config.php` only. Do not commit that file.
9. When the chat finishes, start the site from the project root:

```
php -S localhost:8080 -t public
```

10. Open `http://localhost:8080`. You should see a paper-coloured page with one named block per homepage section. Later routes may say which phase fills them.

Stop here until that page loads.

## Then one prompt at a time

Paste the next file only after you have looked at the page and accepted it.

| When | Paste this file | You should see |
| --- | --- | --- |
| 2 | `chat-prompts\01-homepage.txt` | The real homepage: green hero, tools, map, footer |
| 3 | `chat-prompts\02-database.txt` | Area pills and counts from MySQL |
| 4 | `chat-prompts\03-hubs.txt` | News, jobs, events, and directory pages |
| 5 | `chat-prompts\04-trust-desk.txt` | About, contact, and `/desk` login |
| 6 | `chat-prompts\05-civic-tools.txt` | The five tool pages |
| 7 | `chat-prompts\06-acceptance.txt` | A check of desktop and a narrow phone width |
| after the jobs list exists | `chat-prompts\07-jobs-hub.txt` | Full jobs hub: both boards, detail, apply gate, advertise pitch, desk |

The prompt files live in `docs\mybanglore-pack\chat-prompts\`.

## If the agent wanders

Reply with: “Re-read AGENTS.md and the homepage design contract. Stay on the current phase.”

## What “running” means at the end of prompt 0

The site is running when `http://localhost:8080` loads from the `public` folder and the database `mybanglore` has the city row plus twelve areas. Jobs, news, and events stay empty until you add real rows. That is the correct first run.
