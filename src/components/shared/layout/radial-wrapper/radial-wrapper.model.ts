import { ReactNode } from "react";

export interface RadialWrapperProps {
  header?: ReactNode;
  headerClassName?: string;
  headerBackgroundImage?: string;
  headerAspectRatio?: string;
  children: ReactNode;
  fillSize?: boolean;
}
