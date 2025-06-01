import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Reminder",
  description: "Reminders of all appointments of your pet's in an app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
