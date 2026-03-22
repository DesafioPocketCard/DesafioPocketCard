export const CAMPAIGN_QUERY_KEYS = {
  all: ["campaigns"],
  list: () => [...CAMPAIGN_QUERY_KEYS.all, "list"],
  detail: (id: string) => [...CAMPAIGN_QUERY_KEYS.all, "detail", id],
} as const;
