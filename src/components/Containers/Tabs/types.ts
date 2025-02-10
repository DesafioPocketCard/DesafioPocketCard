/* eslint-disable no-unused-vars */
import React from "react";

export type ITabOptions<T> = T & {
  content?: React.ReactNode;
  onClick?(data: Omit<ITabOptions<T>, "content" | "onClick">): void;
};

export interface ITabs<T> {
  options: ITabOptions<T>[];
  optionLabelKey: keyof Omit<ITabOptions<T>, "content" | "onClick"> & string;
  showContent?: boolean;
  onTagged?: boolean;
  orientation?: "horizontal" | "vertical";
  variant?: "fullWidth" | "scrollable" | "standard";
  scrollButtons?: "auto" | boolean;
  revertcolorpalette?: boolean;
  strongTabs?: boolean;
  onChange?(data: Omit<ITabOptions<T>, "content" | "onClick">): void;
}
