interface IChallengeCardProps {
  title: string;
  expiration: string;
  points: number;
  photo: string;
  onClick: () => void;
}

export type { IChallengeCardProps };
