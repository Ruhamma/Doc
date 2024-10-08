import type { Metadata } from "next";
import { Inter, Raleway, Open_Sans } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Providers } from "@/store/provider";
import { ThemeProviders } from "./ThemeProviders";
import "@mdxeditor/editor/style.css";
const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${inter.className} ${raleway.className} ${openSans.className} dark:bg-[#112018] dark:text-gray-300`}
      >
        <ThemeProviders>
          <Providers>
            <MantineProvider>{children}</MantineProvider>
          </Providers>
        </ThemeProviders>
      </body>
    </html>
  );
}
