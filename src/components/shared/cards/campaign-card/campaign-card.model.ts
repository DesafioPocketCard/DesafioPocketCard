export interface CampaignCardProps {
  title: string;
  expiration: string;
  points: string;
  photo: string;
  onClick: () => void;
  isRegulation?: boolean;
}
