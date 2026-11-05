"""Extract University of Madras B.Sc. / B.C.A. November 2026 timetable rows.

Source PDF (official):
https://egovernance.unom.ac.in/internal/timetable/BScBCA.PDF

Writes src/content/exams/madras-university-nov-2026.json
Does not guess a missing paper code. Those rows are flagged.
"""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / ".tmp-exam" / "BScBCA.PDF"
OUT = ROOT / "src" / "content" / "exams" / "madras-university-nov-2026.json"

SOURCE_PDF = "https://egovernance.unom.ac.in/internal/timetable/BScBCA.PDF"
SOURCE_INDEX = "https://egovernance.unom.ac.in/internal/timetable/tt.html"

DATE_RE = re.compile(r"^(\d{2})\.(\d{2})\.(\d{4})\s+(FN|AN)$")
CODE_TOKEN = r"(?:[A-Z]{2}\d{2}[A-Z]|[A-Z]{2}\d[A-Z]{2}|[A-Z]{3}\d[A-Z]|\d{3}[A-Z]\d[A-Z]|\d{3}[A-Z]{3})"
CODE_RE = re.compile(rf"^(?:{CODE_TOKEN})(?:/{CODE_TOKEN})*$")
TRAILING_CODE_RE = re.compile(rf"\s((?:{CODE_TOKEN})(?:/{CODE_TOKEN})*)$")
SEMESTER_RE = re.compile(
    r"\b(FIRST|SECOND|THIRD|FOURTH|FIFTH|SIXTH)\s+SEMESTER\b"
)
PROGRAMME_RE = re.compile(r"^\[([A-Z]{2}\d?)\]\s*(.*)$")
BATCH_RE = re.compile(r"admitted from\s+(\d{4})\s*[-–]\s*(\d{2,4})", re.I)
SEMESTER_NUM = {
    "FIRST": 1,
    "SECOND": 2,
    "THIRD": 3,
    "FOURTH": 4,
    "FIFTH": 5,
    "SIXTH": 6,
}


def clean(value: str | None) -> str:
    if not value:
        return ""
    text = unicodedata.normalize("NFKC", value)
    text = text.replace("\uFFFD", " ").replace("\xa0", " ")
    text = text.replace("–", "-").replace("—", "-")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def slugify(name: str) -> str:
    lowered = name.lower()
    lowered = lowered.replace("&", " and ")
    lowered = re.sub(r"[^a-z0-9]+", "-", lowered)
    return lowered.strip("-")


def batch_label(match: re.Match[str]) -> str:
    start = match.group(1)
    end = match.group(2)
    if len(end) == 4:
        end = end[-2:]
    return f"{start}-{end}"


def as_code(part: str) -> str:
    compact = re.sub(r"[^A-Z0-9/]", "", part.upper())
    compact = re.sub(r"/+", "/", compact).strip("/")
    if compact and CODE_RE.match(compact):
        return compact
    return ""


def parse_row(cells: list[str | None]) -> tuple[str, str, str, str]:
    parts = [clean(cell) for cell in cells]
    nonempty = [part for part in parts if part]
    blob = " ".join(nonempty)
    date = ""
    code = ""
    subject_parts: list[str] = []
    for part in nonempty:
        coded = as_code(part)
        if DATE_RE.match(part):
            date = part
        elif coded:
            code = coded
        else:
            subject_parts.append(part)
    subject = " ".join(subject_parts).replace("\\", "").strip()
    if not code:
        trailing = TRAILING_CODE_RE.search(subject)
        if trailing:
            code = trailing.group(1)
            subject = subject[: trailing.start()].strip()
    return date, subject, code, blob


def is_header(blob: str, code: str) -> bool:
    if code:
        return False
    upper = blob.upper()
    if not blob:
        return True
    if blob.startswith("DATE") or blob.startswith("Time:"):
        return True
    if "UNIVERSITY OF MADRAS" in upper or "TIME-TABLE" in upper:
        return True
    if SEMESTER_RE.search(upper):
        return True
    if upper.startswith("ELECTIVE"):
        return True
    if "ALLIED" in upper or "FOUNDATION" in upper or "CORE COURSE" in upper:
        return True
    if "PART - II" in upper or "PART- II" in upper or "PART II" in upper:
        return True
    if PROGRAMME_RE.match(blob):
        return True
    if "CANDIDATES ADMITTED" in upper or "CAND. ADMITTED" in upper:
        return True
    return False


def main() -> None:
    if not PDF.exists():
        raise SystemExit(f"Missing PDF at {PDF}")

    papers: list[dict] = []
    flagged: list[dict] = []
    programme_name = ""
    programme_code = ""
    batch = ""
    semester: int | None = None
    section = "core"
    pending_batch_for = ""
    last_date = ""

    with pdfplumber.open(PDF) as pdf:
        for page_index, page in enumerate(pdf.pages):
            page_no = page_index + 1
            for table in page.find_tables():
                for raw in table.extract() or []:
                    date, subject, code, blob = parse_row(raw)
                    upper = blob.upper()

                    if is_header(blob, code):
                        semester_hit = SEMESTER_RE.search(upper)
                        if semester_hit:
                            semester = SEMESTER_NUM[semester_hit.group(1)]
                            if "ELECTIVE" in upper:
                                section = "elective"
                            elif section == "elective":
                                section = "core"
                        if "ELECTIVE" in upper:
                            section = "elective"
                        if "ALLIED" in upper:
                            section = "allied"
                            programme_name = ""
                            programme_code = ""
                        if "FOUNDATION" in upper or "LANGUAGES" in upper:
                            section = "language"
                            programme_name = ""
                            programme_code = ""
                            batch = ""
                        if "PART - II" in upper or "PART- II" in upper or "ENGLISH" in upper and "SEMESTER" in upper:
                            if "ENGLISH" in upper:
                                section = "english"
                                programme_name = ""
                                programme_code = ""
                                batch = ""
                        if "CORE COURSE" in upper:
                            section = "core"

                        programme_hit = PROGRAMME_RE.match(blob)
                        if programme_hit:
                            programme_code = programme_hit.group(1)
                            name = programme_hit.group(2)
                            name = re.sub(r"\[.*", "", name).strip(" -")
                            if name:
                                programme_name = name
                            section = "core"
                            semester = None
                            batch = ""
                            pending_batch_for = programme_code

                        batch_hit = BATCH_RE.search(blob)
                        if batch_hit:
                            batch = batch_label(batch_hit)
                            pending_batch_for = ""
                        continue

                    if code and not subject and not date and papers:
                        previous = papers[-1]
                        extra = [part for part in code.split("/") if part and part not in previous["codes"]]
                        if extra:
                            previous["codes"].extend(extra)
                            previous["code"] = "/".join(previous["codes"])
                        continue

                    if date:
                        last_date = date
                    elif code and last_date:
                        date = last_date

                    if not date or not subject:
                        continue

                    missing_code = not code
                    if missing_code:
                        flagged.append(
                            {
                                "page": page_no,
                                "date": date,
                                "subject": subject,
                                "code": "",
                                "context": programme_name,
                            }
                        )

                    match = DATE_RE.match(date)
                    assert match
                    iso = f"{match.group(3)}-{match.group(2)}-{match.group(1)}"
                    session = match.group(4)
                    degree = "common"
                    if programme_name:
                        if "COMPUTER APPLICATIONS" in programme_name.upper() and programme_name.upper().startswith(
                            "BACHELOR"
                        ):
                            degree = "bca"
                        else:
                            degree = "bsc"
                    name = programme_name
                    slug = ""
                    if name:
                        slug = "bca" if degree == "bca" else slugify(name)
                    papers.append(
                        {
                            "date": iso,
                            "session": session,
                            "subject": subject,
                            "code": code,
                            "codes": code.split("/"),
                            "programmeSlug": slug or None,
                            "programmeName": name or None,
                            "programmeCode": programme_code or None,
                            "batch": batch or None,
                            "semester": semester,
                            "section": section,
                            "degree": degree,
                            "page": page_no,
                            "flagged": missing_code,
                        }
                    )

    programmes: dict[str, dict] = {}
    for paper in papers:
        slug = paper["programmeSlug"]
        if not slug:
            continue
        entry = programmes.setdefault(
            slug,
            {
                "slug": slug,
                "name": paper["programmeName"],
                "degree": paper["degree"],
                "batches": [],
            },
        )
        if paper["batch"] and paper["batch"] not in entry["batches"]:
            entry["batches"].append(paper["batch"])

    dates = sorted({paper["date"] for paper in papers})
    payload = {
        "university": "University of Madras",
        "examination": "November 2026",
        "degrees": ["B.Sc.", "B.C.A."],
        "sessions": {
            "FN": "10:00 AM–1:00 PM",
            "AN": "2:00 PM–5:00 PM",
        },
        "sourcePdf": SOURCE_PDF,
        "sourceIndex": SOURCE_INDEX,
        "publishedNote": "The university timetable index lists this November 2026 B.Sc. / B.C.A. file. Confirm any clash on the official PDF.",
        "paperCount": len(papers),
        "flagged": flagged,
        "programmes": sorted(programmes.values(), key=lambda item: (item["degree"], item["name"])),
        "dates": dates,
        "papers": papers,
    }

    checks = {
        "343C5A": ("2026-11-12", "FN", "Evolutionary Biology"),
        "LA11A": ("2026-11-20", "FN", "Tamil"),
        "SS24A": ("2026-11-28", "AN", "Plant Diversity IV"),
    }
    by_code: dict[str, dict] = {}
    for paper in papers:
        for code in paper["codes"]:
            by_code.setdefault(code, paper)
    for code, (iso, session, snippet) in checks.items():
        row = by_code.get(code)
        if not row:
            raise SystemExit(f"Missing known code {code}")
        if row["date"] != iso or row["session"] != session or snippet.lower() not in row["subject"].lower():
            raise SystemExit(f"Check failed for {code}: {row}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"papers {len(papers)} programmes {len(programmes)} dates {len(dates)} flagged {len(flagged)}")
    for item in programmes.values():
        print(f"  {item['degree']:6} {item['slug']} batches={item['batches']}")
    if flagged:
        print("flagged sample:")
        for row in flagged[:12]:
            print(" ", row)


if __name__ == "__main__":
    main()
