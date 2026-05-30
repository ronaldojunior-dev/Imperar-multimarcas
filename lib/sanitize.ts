export function sanitizeText(value: string) {
  return value
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .trim();
}

export function sanitizeObject<T extends Record<string, unknown>>(input: T): T {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      typeof value === "string" ? sanitizeText(value) : value
    ])
  ) as T;
}
