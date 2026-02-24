'use client';
import { useEffect, useState, useCallback } from 'react';
import { STRINGS } from '../constants';
import { plantsApi, categoriesApi } from '@/lib/adminApi';
import type { AdminPlant, AdminCategory, ColumnDef } from '@/types/admin';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import PlantFormModal from '../components/PlantFormModal';
import DeleteConfirm from '../components/DeleteConfirm';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '../components/Toast';
import axios from 'axios';

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message || STRINGS.ERROR_GENERIC;
  }
  return STRINGS.ERROR_GENERIC;
}

export default function PlantsPage() {
  const [data, setData] = useState<AdminPlant[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPlant | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminPlant | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkSaving, setBulkSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [plantsRes, catsRes] = await Promise.all([
        plantsApi.getAll(),
        categoriesApi.getAll(),
      ]);
      setData(plantsRes.data);
      setCategories(catsRes.data);
    } catch (err) {
      showToast(getErrorMessage(err), 'error');
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const handleBulkImport = async () => {
    setBulkSaving(true);
    try {
      let plants: any[] = [];
      const trimmed = bulkText.trim();
      
      try {
        const cleaned = trimmed
          .replace(/,\s*\]/g, ']') // remove trailing comma before ]
          .replace(/,\s*\}/g, '}'); // remove trailing comma before }
        plants = JSON.parse(cleaned);
      } catch (parseErr) {
        throw new Error('Invalid JSON format. Please ensure it is a valid array of plant objects.');
      }

      if (!Array.isArray(plants)) {
        throw new Error('Input must be a JSON array.');
      }

      const res = await plantsApi.bulkImport(plants);
      showToast(res.data.message, 'success');
      setBulkOpen(false);
      setBulkText('');
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : getErrorMessage(err), 'error');
    }
    setBulkSaving(false);
  };

  const COLUMNS: ColumnDef<AdminPlant>[] = [
    { key: 'name', label: 'Name' },
    { key: 'tamilName', label: 'Tamil Name' },
    {
      key: 'category',
      label: 'Category',
      render: (_, row) => row.category?.name ?? '-',
    },
    {
      key: 'isAvailable',
      label: 'Status',
      render: (val) => (
        <StatusBadge active={Boolean(val)} activeLabel={STRINGS.AVAILABLE} inactiveLabel={STRINGS.UNAVAILABLE} />
      ),
    },
    {
      key: 'isFeatured',
      label: STRINGS.FEATURED,
      render: (val) => (Boolean(val) ? '⭐' : '-'),
    },
    {
      key: 'variants',
      label: 'Variants',
      render: (_, row) => String(row.variants?.length ?? 0),
    },
  ];

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setSaving(true);
    try {
      if (editing) {
        await plantsApi.update(editing.id, formData);
        showToast(STRINGS.UPDATED_SUCCESS, 'success');
      } else {
        await plantsApi.create(formData);
        showToast(STRINGS.CREATED_SUCCESS, 'success');
      }
      setModalOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      showToast(getErrorMessage(err), 'error');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      await plantsApi.remove(deleteTarget.id);
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{STRINGS.PLANTS}</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setBulkOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer"
          >
            Bulk Import
          </button>
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
          >
            + {STRINGS.ADD_NEW}
          </button>
        </div>
      </div>

      <DataTable
        columns={COLUMNS}
        data={data}
        loading={loading}
        onEdit={(row) => { setEditing(row); setModalOpen(true); }}
        onDelete={(row) => setDeleteTarget(row)}
      />
      <PlantFormModal
        open={modalOpen}
        categories={categories}
        initialData={editing as unknown as Record<string, unknown>}
        onSubmit={handleSubmit}
        onCancel={() => { setModalOpen(false); setEditing(null); }}
        loading={saving}
        isEditing={!!editing}
      />
      <DeleteConfirm
        open={!!deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={saving}
      />

      {bulkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-2xl mx-4">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                Bulk Import Plants
              </h2>
              <p className="text-xs text-gray-500 mt-1">Paste a JSON array of plant objects. Note: IDs, baseImageUrl, and relatedPlantsIds are automatically ignored.</p>
            </div>
            <div className="p-6">
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                rows={15}
                placeholder="[ { 'name': '...', 'category': '...', ... } ]"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-mono"
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button onClick={() => { setBulkOpen(false); setBulkText(''); }} disabled={bulkSaving} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                {STRINGS.CANCEL}
              </button>
              <button 
                onClick={handleBulkImport} 
                disabled={bulkSaving || !bulkText.trim()} 
                className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                {bulkSaving ? STRINGS.LOADING : 'Import'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
