import "../styles/globals.css";
import type { Metadata } from "next";

/* contexts */
import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "NexTalk",
  description: "A modern chat app for next generation users",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-poppins bg-gray-50 text-gray-700">
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
