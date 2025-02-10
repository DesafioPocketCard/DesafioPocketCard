import React from "react";
import { Wrapper } from "./styles";
import { IRadialWrapperProps } from "./types";

export default function RadialWrapper({
  HeaderComponent,
  BodyComponent,
  fillSize,
}: IRadialWrapperProps) {
  return (
    <Wrapper hasHeader={!!HeaderComponent} fillSize={fillSize}>
      {HeaderComponent && (
        <HeaderComponent className="radial-header-component" />
      )}
      {BodyComponent && <BodyComponent className="radial-body-component" />}
    </Wrapper>
  );
}
