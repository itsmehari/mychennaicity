export const JOB_SLICE_MIN_OPENINGS = 5;
export const JOB_SLICE_MIN_EMPLOYERS = 3;

/** A slice can be indexed only when several employers have live notices. */
export function jobSliceIsIndexable(openings: number, employers: number): boolean {
  return openings >= JOB_SLICE_MIN_OPENINGS && employers >= JOB_SLICE_MIN_EMPLOYERS;
}

export function distinctEmployerCount(
  rows: { employer: { id: string } }[],
): number {
  return new Set(rows.map((row) => row.employer.id)).size;
}
