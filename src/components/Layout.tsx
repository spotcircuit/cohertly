import { ReactNode } from 'react';
import Header from './Header';
import dynamic from 'next/dynamic';

// Dynamically import V2Navigation to avoid breaking v1
const V2Navigation = dynamic(
  () => import('./v2/V2Navigation'),
  { ssr: false, loading: () => null }
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <Header />
      <main className="max-w-5xl mx-auto pt-0 pb-10 px-4">
        <div className="glass-card p-6 shadow-lg">{children}</div>
      </main>
      {/* V2Navigation will only render in development or when enabled via feature flags */}
      <V2Navigation />
    </div>
  );
}