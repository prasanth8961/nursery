'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ADMIN_NAV, COLORS, STRINGS } from './constants';
import { MdLogout } from 'react-icons/md';
import { ToastProvider } from './components/Toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && !isLoginPage) {
      router.replace('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.replace('/admin/login');
  };

  // Login page renders without sidebar
  if (isLoginPage) {
    return <ToastProvider>{children}</ToastProvider>;
  }

  // Show nothing until auth check completes
  if (!authorized) return null;

  return (
    <ToastProvider>
      <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950">
        {/* Sidebar */}
        <aside className={`${COLORS.SIDEBAR_BG} w-64 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40`}>
          <div className="px-6 py-5 border-b border-gray-800">
            <h1 className="text-lg font-bold text-white tracking-tight">{STRINGS.APP_TITLE}</h1>
          </div>

          <nav className="flex-1 py-4 px-3 space-y-1">
            {ADMIN_NAV.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive ? COLORS.SIDEBAR_ACTIVE : `${COLORS.SIDEBAR_TEXT} ${COLORS.SIDEBAR_HOVER}`
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 py-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${COLORS.SIDEBAR_TEXT} ${COLORS.SIDEBAR_HOVER} transition-all cursor-pointer`}
            >
              <MdLogout size={20} />
              {STRINGS.LOGOUT}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </ToastProvider>
  );
}
