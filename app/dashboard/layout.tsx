import { AppHeader } from "./_components/AppHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 lg:px-40 py-8">
        {children}
      </main>
    </div>
  );
}
