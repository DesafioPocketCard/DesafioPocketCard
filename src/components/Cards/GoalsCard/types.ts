interface IGoalsCardProps {
  title: string;
  expiration: string;
  points: string;
  photo: string;
  isRegulation?: boolean;
  onClick: () => void;
}

export type { IGoalsCardProps };
