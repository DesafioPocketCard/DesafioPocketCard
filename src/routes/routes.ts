export const APP_ROUTES = {
  SIGNIN: "/signin",
  RECOVERY: "/recovery",
  HOME: "/",
  CAMPAIGNS: "/campains",
  GOALS: (id: string) => `/campains/goals/${id}`,
  GOAL_DETAIL: (goalId: string, campaignId: string) =>
    `/campains/goal-detail/${goalId}/${campaignId}`,
  REGULATION: (id: string) => `/campains/regulation/${id}`,
  CHECK_IN: (id: string) => `/campains/check-in/${id}`,
  RESCUE_POINTS: "/rescue-points",
  PRODUCT_DETAIL: (id: string) => `/rescue-points/product/${id}`,
  CART: "/rescue-points/cart",
  CONFIRM_TOKEN: (id: string) => `/rescue-points/confirm-token/${id}`,
  MY_REWARDS: "/my-rewards",
  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile",
  REGULATIONS_LIST: "/regulations",
} as const;
