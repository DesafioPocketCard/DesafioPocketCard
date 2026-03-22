"use client";

import React from "react";
import { RadialWrapperProps } from "./radial-wrapper.model";

import { RadialWrapperView } from "./radial-wrapper.view";

export default function RadialWrapperComponent(props: RadialWrapperProps) {
  return <RadialWrapperView {...props} />;
}
