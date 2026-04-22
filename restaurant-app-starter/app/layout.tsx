import "./globals.css";
import { AppShell } from "@/components/AppShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant App",
  description: "Reservierungssystem für ein einzelnes Restaurant",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
