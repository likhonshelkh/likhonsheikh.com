import localFont from "next/font/local";

export const latinSans = localFont({
  variable: "--font-sans-latin",
  display: "swap",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/noto-sans/files/noto-sans-latin-wght-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
});

export const bengaliSans = localFont({
  variable: "--font-sans-bengali",
  display: "swap",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/noto-sans-bengali/files/noto-sans-bengali-bengali-wght-normal.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
});

export const fontVariables = `${latinSans.variable} ${bengaliSans.variable}`;
