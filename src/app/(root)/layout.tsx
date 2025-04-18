import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { MiniPlayer } from "@/components/mini-player";
import { MobileNav } from "@/components/mobile-nav";
import { AudioProvider } from "@/components/providers/audio-provider";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AudioProvider>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset className="overflow-hidden">
          <SiteHeader />
          <div className="flex flex-1 flex-col pb-16 lg:pb-0">{children}</div>
          <MiniPlayer />
          <MobileNav />
        </SidebarInset>
      </SidebarProvider>
    </AudioProvider>
  );
}
