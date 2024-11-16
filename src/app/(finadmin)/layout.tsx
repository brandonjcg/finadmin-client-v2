import { Footer, SidebarMenu, TopMenu } from '@/components';

export default function FinAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      <TopMenu />
      <SidebarMenu />
      <div className="flex-grow m-2 px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
