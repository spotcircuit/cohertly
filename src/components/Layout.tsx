import { ReactNode } from 'react';
import Header from './Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <Header />
      <main className="max-w-5xl mx-auto pt-0 pb-10 px-4">
        <div className="glass-card p-6 shadow-lg">{children}</div>
      </main>
    </div>
  );
}