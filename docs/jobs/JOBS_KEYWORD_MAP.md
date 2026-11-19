# Jobs keyword map

Search volumes, difficulty, and current rankings are **NOT VERIFIED**. No Search Console export was read in this session.

| Intent | Queries | Owner | Must not also rank as the owner |
| --- | --- | --- | --- |
| Find work in the city | jobs in chennai, chennai jobs, vacancies, openings | `/chennai-jobs` | `/advertise/jobs` |
| One real vacancy | role, employer, or place printed on that row | `/chennai-jobs/[slug]` | the hub |
| Place named on notices | jobs in OMR, Guindy, T. Nagar, Ambattur, Velachery, Anna Nagar, Tambaram, Adyar, Porur | `/chennai-jobs/locations/[slug]` only when the gate passes; otherwise the hub | a ward page with no notices |
| Kind of work | walk-in, fresher, part-time, internships, drivers, retail, IT, office admin | `/chennai-jobs/categories/[slug]` only when the gate passes | the city hub for the broad “jobs in chennai” query |
| Post a vacancy | post a job in chennai, post job vacancy in chennai, free job posting in chennai, hire local staff in chennai | `/advertise/jobs` | the seeker hub, beyond one button |
| Tamil hiring | சென்னையில் வேலை விளம்பரம் போட | `/advertise/jobs-tamil` | a machine-translated copy of the English board |

Cannibalisation rule: the hub owns the city query. A slice may own “jobs in {area}” or “{kind} jobs in Chennai” only after it is indexable. The detail page owns that employer’s role.

Tamil seeker queries such as சென்னை வேலைவாய்ப்பு have no dedicated URL. Do not stuff them into the English H1.
