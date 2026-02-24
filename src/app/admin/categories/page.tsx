'use client';
import { useEffect, useState, useCallback } from 'react';
import { COLORS, STRINGS } from '../constants';
import { categoriesApi } from '@/lib/adminApi';
import type { AdminCategory, ColumnDef, FormFieldDef } from '@/types/admin';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import DeleteConfirm from '../components/DeleteConfirm';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '../components/Toast';
import { MdFileUpload, MdContentCopy } from 'react-icons/md';
import axios from 'axios';

const CopyId = ({ id }: { id: string }) => {
  const { showToast } = useToast();
  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    showToast('ID copied to clipboard', 'success');
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 group hover:text-emerald-500 transition-colors text-left"
      title="Click to copy ID"
    >
      <span className="text-xs font-mono text-gray-400 group-hover:text-emerald-500 whitespace-nowrap">{id}</span>
      <MdContentCopy size={12} className="text-gray-400 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

/* ===== Column Config ===== */
const COLUMNS: ColumnDef<AdminCategory>[] = [
  {
    key: 'id',
    label: 'ID',
    render: (val) => <CopyId id={String(val)} />,
  },
  { key: 'name', label: 'Name' },
  {
    key: 'isActive',
    label: 'Status',
    render: (val) => <StatusBadge active={Boolean(val)} />,
  },
  {
    key: 'createdAt',
    label: 'Created',
    render: (val) => new Date(String(val)).toLocaleDateString(),
  },
];

/* ===== Form Fields Config ===== */
const FORM_FIELDS: FormFieldDef[] = [
  { key: 'name', label: 'Category Name', type: 'text', placeholder: 'e.g. Flowering, Indoor', required: true },
  { key: 'isActive', label: 'Active', type: 'boolean', defaultValue: true },
];

const BULK_PLACEHOLDER = `[
  'Indoor',
  'Outdoor',
  'Flowering',
  'Fruiting',
  'Tree',
  'Bonsai',
  'Medicinal'
]`;

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || err.message || STRINGS.ERROR_GENERIC;
  }
  return STRINGS.ERROR_GENERIC;
}

export default function CategoriesPage() {
  const [data, setData] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminCategory | null>(null);
  const [saving, setSaving] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [bulkSaving, setBulkSaving] = useState(false);
  const { showToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await categoriesApi.getAll();
      setData(res.data);
    } catch (err) {
      showToast(getErrorMessage(err), 'error');
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setSaving(true);
    try {
      if (editing) {
        await categoriesApi.update(editing.id, formData);
        showToast(STRINGS.UPDATED_SUCCESS, 'success');
      } else {
        await categoriesApi.create(formData);
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
      await categoriesApi.remove(deleteTarget.id);
      showToast(STRINGS.DELETED_SUCCESS, 'success');
      setDeleteTarget(null);
      load();
    } catch (err) {
      showToast(getErrorMessage(err), 'error');
    }
    setSaving(false);
  };

  const handleBulkImport = async () => {
    setBulkSaving(true);
    try {
      let names: string[] = [];
      const trimmed = bulkText.trim();

      if (trimmed.startsWith('[')) {
        try {
          // Remove trailing commas before parsing
          const cleaned = trimmed
            .replace(/,\s*\]/g, ']') // remove trailing comma before ]
            .replace(/'/g, '"');      // replace single quotes with double quotes
          names = JSON.parse(cleaned);
        } catch (parseErr) {
          // Fallback: extract anything inside quotes using regex if JSON.parse fails
          const matches = trimmed.match(/['"](.*?)['"]/g);
          if (matches) {
            names = matches.map(m => m.slice(1, -1));
          } else {
            throw new Error('Invalid array format. Please use [ "A", "B" ] or a list of names.');
          }
        }
      } else {
        // Comma or line separated
        names = trimmed.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean);
      }

      if (names.length === 0) {
        showToast('No category names found', 'error');
        setBulkSaving(false);
        return;
      }

      const res = await categoriesApi.bulkImport(names);
      showToast(res.data.message, 'success');
      setBulkOpen(false);
      setBulkText('');
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : getErrorMessage(err), 'error');
    }
    setBulkSaving(false);
  };

  const inputClass = 'w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none font-mono';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{STRINGS.CATEGORIES}</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setBulkOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer"
          >
            <MdFileUpload size={18} /> Bulk Import
          </button>
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className={`${COLORS.PRIMARY_BTN} px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer`}
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
      <FormModal
        open={modalOpen}
        title={editing ? `${STRINGS.EDIT} Category` : `${STRINGS.ADD_NEW} Category`}
        fields={FORM_FIELDS}
        initialData={editing as unknown as Record<string, unknown>}
        onSubmit={handleSubmit}
        onCancel={() => { setModalOpen(false); setEditing(null); }}
        loading={saving}
      />
      <DeleteConfirm
        open={!!deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={saving}
      />

      {/* Bulk Import Modal */}
      {bulkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`${COLORS.CARD_BG} rounded-xl w-full max-w-lg shadow-2xl mx-4`}>
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <MdFileUpload size={20} className="text-amber-500" /> Bulk Import Categories
              </h2>
              <p className="text-xs text-gray-500 mt-1">Paste a JSON array, comma-separated, or one per line</p>
            </div>
            <div className="p-6">
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                rows={10}
                placeholder={BULK_PLACEHOLDER}
                className={inputClass}
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button onClick={() => { setBulkOpen(false); setBulkText(''); }} disabled={bulkSaving} className={`${COLORS.GHOST_BTN} px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer`}>
                {STRINGS.CANCEL}
              </button>
              <button onClick={handleBulkImport} disabled={bulkSaving || !bulkText.trim()} className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer disabled:opacity-50">
                {bulkSaving ? STRINGS.LOADING : 'Import'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
