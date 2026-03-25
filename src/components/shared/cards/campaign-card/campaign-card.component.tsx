import React from "react";
import { CampaignCardProps } from "./campaign-card.model";
import { CampaignCardView } from "./campaign-card.view";

export default function CampaignCardComponent(props: CampaignCardProps) {
  return <CampaignCardView {...props} />;
}
