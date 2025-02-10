/* eslint-disable no-unused-vars */
export type MaskItem = string | RegExp | [RegExp];

export type MaskArray = Array<MaskItem>;

export type Mask = MaskArray | ((value?: string) => MaskArray);

export type FormatWithMaskProps = {
  /**
   * Text to be formatted with the mask.
   */
  text?: string;

  /**
   * Mask
   */
  mask?: Mask;

  /**
   * Character to be used on the obfuscated characteres. Defaults to `"*"`
   */
  obfuscationCharacter?: string;
};

export type FormatWithMaskResult = {
  masked: string;
  unmasked: string;
  obfuscated: string;
};

export type CleanUpMask = string;

export type CustomMask = RegExp;

export type CreateNumberMaskProps = {
  /** Character for thousands delimiter. Defaults to `"."` */
  delimiter?: string;
  /** Decimal precision. Defaults to `2` */
  precision?: number;
  /** Decimal separator character. Defaults to `","`  */
  separator?: string;
  /** Mask to be prefixed on the mask result */
  prefix?: MaskArray;
  suffix?: MaskArray;
};

export interface FormatNumberOptions {
  /**
   * Character for thousands delimiter.
   */
  delimiter?: string;

  /**
   * Set this to `true` to disable negative values.
   */
  ignoreNegative?: boolean;

  /**
   * Decimal precision. Defaults to 2.
   */
  precision?: number;

  /**
   * Decimal separator character.
   */
  separator?: string;

  /**
   * Character to be prefixed on the value.
   */
  prefix?: string;

  /**
   * Character to be suffixed on the value.
   */
  suffix?: string;

  /**
   * Set this to `true` to show the `+` character on positive values.
   */
  showPositiveSign?: boolean;

  /**
   * Where the negative/positive sign (+/-) should be placed. Defaults to "afterPrefix".
   * Use `showPositiveSign` if you want to show the `+` sign.
   */
  signPosition?: "beforePrefix" | "afterPrefix";
}
