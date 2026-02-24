'use client';
import { useEffect, useState } from 'react';
import { STRINGS, COLORS, ADMIN_NAV } from './constants';
import { categoriesApi, plantsApi, usersApi } from '@/lib/adminApi';
import Link from 'next/link';

interface StatCard {
  label: string;
  count: number;
  href: string;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [cats, plants, users] = await Promise.all([
          categoriesApi.getAll().catch(() => ({ data: [] })),
          plantsApi.getAll().catch(() => ({ data: [] })),
          usersApi.getAll().catch(() => ({ data: [] })),
        ]);
        setStats([
          { label: STRINGS.CATEGORIES, count: cats.data.length, href: '/admin/categories', color: 'from-emerald-500 to-emerald-700' },
          { label: STRINGS.PLANTS, count: plants.data.length, href: '/admin/plants', color: 'from-blue-500 to-blue-700' },
          { label: STRINGS.USERS, count: users.data.length, href: '/admin/users', color: 'from-purple-500 to-purple-700' },
        ]);
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{STRINGS.DASHBOARD}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {loading
          ? [1, 2, 3].map((i) => (
              <div key={i} className={`${COLORS.CARD_BG} ${COLORS.CARD_BORDER} rounded-xl p-6 animate-pulse h-32`} />
            ))
          : stats.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
              >
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                <p className="text-4xl font-bold mt-2">{stat.count}</p>
              </Link>
            ))}
      </div>

      <div className={`${COLORS.CARD_BG} ${COLORS.CARD_BORDER} rounded-xl p-6`}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ADMIN_NAV.filter((n) => n.key !== 'dashboard').map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`${COLORS.GHOST_BTN} flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
