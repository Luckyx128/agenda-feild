import type { Metadata } from "next";
import "./calendar.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function CalendarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="calendar-layout">
      
      <div className="calendar-container">
        {children}

      </div>
    
    </section>
  );
}
