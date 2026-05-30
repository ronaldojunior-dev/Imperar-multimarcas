export function pagination(searchParams: URLSearchParams) {
  const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
  const perPage = Math.min(Math.max(Number(searchParams.get("perPage") ?? 12), 1), 100);

  return {
    page,
    perPage,
    skip: (page - 1) * perPage,
    take: perPage
  };
}

export function paged<T>(items: T[], total: number, page: number, perPage: number) {
  return {
    items,
    meta: {
      total,
      page,
      perPage,
      pages: Math.ceil(total / perPage)
    }
  };
}
