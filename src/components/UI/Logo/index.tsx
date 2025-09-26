"use client";

import Image, { ImageProps } from "next/image";
import { useLogo } from "@/hooks/useLogo";
import type { LogoType } from "@/utils/logo-utils";

interface LogoProps extends Omit<ImageProps, "src" | "alt"> {
  /** Tipo da logo a ser exibida */
  logoType?: LogoType;
  /** Texto alternativo customizado (opcional) */
  alt?: string;
  /** Se deve usar as dimensões padrão da logo */
  useDefaultSize?: boolean;
  /** Multiplica as dimensões padrão por este fator */
  sizeFactor?: number;
}

/**
 * Componente Logo que automaticamente exibe a logo correta baseada no tenant atual
 */
export default function Logo({
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

  // Define as dimensões a serem usadas
  const finalWidth =
    customWidth || (useDefaultSize ? defaultWidth * sizeFactor : undefined);
  const finalHeight =
    customHeight || (useDefaultSize ? defaultHeight * sizeFactor : undefined);

  // Se ainda está carregando, pode mostrar um placeholder ou a logo padrão
  if (isLoading) {
    return (
      <div
        style={{
          width: finalWidth,
          height: finalHeight,
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
      >
        {/* Placeholder durante carregamento */}
        <span style={{ fontSize: "12px", color: "#999" }}></span>
      </div>
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
    />
  );
}
