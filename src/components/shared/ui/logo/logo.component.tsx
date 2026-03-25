"use client";

import React from "react";
import Image, { ImageProps } from "next/image";
import { useLogo } from "@/hooks/useLogo";
import type { LogoType } from "@/utils/logo-utils";

interface LogoProps extends Omit<ImageProps, "src" | "alt"> {
  logoType?: LogoType;
  alt?: string;
  useDefaultSize?: boolean;
  sizeFactor?: number;
}

export default function LogoComponent({
  logoType = "horizontal",
  alt = "Logo",
  useDefaultSize = true,
  sizeFactor = 1,
  width: customWidth,
  height: customHeight,
  ...imageProps
}: LogoProps) {
  const {
    src,
    width: defaultWidth,
    height: defaultHeight,
    isLoading,
    tenant,
  } = useLogo(logoType);

  const finalWidth =
    Number(customWidth) ||
    (useDefaultSize ? defaultWidth * sizeFactor : undefined);
  const finalHeight =
    Number(customHeight) ||
    (useDefaultSize ? defaultHeight * sizeFactor : undefined);

  if (isLoading) {
    return (
      <div
        className="animate-pulse bg-gray-200 rounded"
        style={{ width: finalWidth, height: finalHeight }}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      src={src}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      data-tenant={tenant}
      data-logo-type={logoType}
      className={imageProps.className}
    />
  );
}
