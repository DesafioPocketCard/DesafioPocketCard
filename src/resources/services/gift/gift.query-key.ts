export const GIFT_QUERY_KEYS = {
  all: ["gifts"],
  categories: () => [...GIFT_QUERY_KEYS.all, "categories"],
  list: (categoryId?: string) => [
    ...GIFT_QUERY_KEYS.all,
    "list",
    categoryId || "all",
  ],
  featured: () => [...GIFT_QUERY_KEYS.all, "featured"],
  detail: (id: string) => [...GIFT_QUERY_KEYS.all, "detail", id],
} as const;
