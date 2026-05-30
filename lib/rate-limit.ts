type Entry = {
  count: number;
  expiresAt: number;
};

const buckets = new Map<string, Entry>();

export function rateLimit(key: string, limit = 60, windowMs = 60_000) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.expiresAt < now) {
    buckets.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}
