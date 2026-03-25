export const GOAL_QUERY_KEYS = {
  all: ["goals"],
  list: (campaignId: string) => [...GOAL_QUERY_KEYS.all, "list", campaignId],
  detail: (id: string) => [...GOAL_QUERY_KEYS.all, "detail", id],
} as const;
