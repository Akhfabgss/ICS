import { Suspense } from 'react';
import NavbarRegistry from '@/components/NavbarRegistry';
import FooterRegistry from '@/components/FooterRegistry';
import FloatingThemeToggle from '@/components/FloatingThemeToggle';

export default function RegistryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-foreground-hitam">
      <Suspense fallback={<div className="h-20 bg-surface border-b border-line-putih" />}>
        <NavbarRegistry />
      </Suspense>

      <main className="flex-1">{children}</main>

      <FooterRegistry />

      <FloatingThemeToggle />
    </div>
  );
}