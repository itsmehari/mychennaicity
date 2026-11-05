# Operator notes

For the person running the new project. Do not publish this page.

- Domain lock: **https://mybanglore.in**, already used on mychennaicity.in on 4 November 2026.
- Put the existing Bengaluru WhatsApp invite in `config/config.php` on the server. Keep `chat.whatsapp.com` off the homepage, header, footer, and JSON-LD.
- Chennai’s Next.js stack is the wrong runtime. The homepage feel is the target.
- Geist Sans and Source Serif 4 are SIL Open Font License and can be self-hosted.
- The twelve hubs are editorial clusters for browsing. They are not an official ward map. Whitefield and Electronic City stay separate.
- Civic names are in flux: residents still say BBMP; later bodies include city corporations and the Greater Bengaluru Authority. Confirm a name on an official page before a tool states it.
- The public site is English only. About may say, in English, that Kannada is the language of the city.
- Exam timetables and a ministers desk are later products.
- Deployment will likely resemble mycovai.in: cPanel, docroot `public` or `public_html`, PHP, MySQL. A git push does not update the live site until the host deploys.
- `database/fixture.sql` is created in phase 3 for a labelled sample story, job, and event. Do not import it on production.
