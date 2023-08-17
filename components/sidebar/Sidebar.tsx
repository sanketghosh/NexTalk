import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="h-full">
      <DesktopSidebar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </aside>
  );
}
