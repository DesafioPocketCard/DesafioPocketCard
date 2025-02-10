import { Open_Sans } from "next/font/google";

const primaryFont = Open_Sans({
  variable: "--primary-font",
  weight: ["500", "600"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});

const secondaryFont = Open_Sans({
  variable: "--secondary-font",
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});

const fonts = [primaryFont.variable, secondaryFont.variable].join(" ");

export default fonts;
