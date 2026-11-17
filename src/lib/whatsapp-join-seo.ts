/** Join form URLs with any query string should not be indexed. */
export function whatsappJoinQueryNoindex(
  searchParams: Record<string, string | string[] | undefined>,
): boolean {
  return Object.keys(searchParams).length > 0;
}