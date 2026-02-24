'use client';
import { useEffect, useState, useCallback } from 'react';
import { STRINGS, COLORS } from '../constants';
import { usersApi } from '@/lib/adminApi';
import type { AdminUser, ColumnDef } from '@/types/admin';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import DeleteConfirm from '../components/DeleteConfirm';
import { useToast } from '../components/Toast';
import axios from 'axios';

function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === 'ADMIN';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isAdmin ? COLORS.BADGE_ADMIN : COLORS.BADGE_USER}`}>
      {role}
    </span>
  );
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message || STRINGS.ERROR_GENERIC;
  }
  return STRINGS.ERROR_GENERIC;
}

const COLUMNS: ColumnDef<AdminUser>[] = [
  { key: 'name', label: 'Name', render: (val) => String(val ?? '-') },
  { key: 'email', label: 'Email' },
  {
    key: 'role',
    label: 'Role',
    render: (val) => <RoleBadge role={String(val)} />,
  },
  {
    key: 'createdAt',
    label: 'Joined',
    render: (val) => new Date(String(val)).toLocaleDateString(),
  },
];

export default function UsersPage() {
  const [data, setData] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await usersApi.getAll();
      setData(res.data);
    } catch (err) {
      showToast(getErrorMessage(err), 'error');
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      await usersApi.remove(deleteTarget.id);
      showToast(STRINGS.DELETED_SUCCESS, 'success');
      setDeleteTarget(null);
      load();
    } catch (err) {
      showToast(getErrorMessage(err), 'error');
    }
    setSaving(false);
  };

  return (
    <div>
      <PageHeader title={STRINGS.USERS} />
      <DataTable
        columns={COLUMNS}
        data={data}
        loading={loading}
        onDelete={(row) => setDeleteTarget(row)}
      />
      <DeleteConfirm
        open={!!deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={saving}
      />
    </div>
  );
}
