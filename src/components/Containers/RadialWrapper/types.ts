import { SxProps } from "@mui/material";

interface IWrapperComponentProps {
  className: string;
}

interface IRadialWrapperProps {
  HeaderComponent?: React.JSXElementConstructor<IWrapperComponentProps>;
  BodyComponent?: React.JSXElementConstructor<IWrapperComponentProps>;
  fillSize?: boolean;
}

export type { IRadialWrapperProps, IWrapperComponentProps };
