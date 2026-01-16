import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-providers";
import { AuthProvider } from "@/providers/auth-providers";
import { ConvexClientProvider } from "@/providers/convex-providers";

export const metadata: Metadata = {
  title: "TNC WebApp",
  description: "TNC WebApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <AuthProvider>
                {children}
              </AuthProvider>
            </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
