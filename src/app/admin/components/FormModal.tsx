'use client';
import { useState, useEffect } from 'react';
import { COLORS, STRINGS } from '../constants';
import type { FormFieldDef } from '@/types/admin';

interface FormModalProps {
  open: boolean;
  title: string;
  fields: FormFieldDef[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function FormModal({ open, title, fields, initialData, onSubmit, onCancel, loading }: FormModalProps) {
  const [form, setForm] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (open) {
      const defaults: Record<string, unknown> = {};
      fields.forEach((f) => {
        defaults[f.key] = initialData?.[f.key] ?? f.defaultValue ?? (f.type === 'boolean' ? false : f.type === 'number' ? 0 : f.type === 'tags' ? '' : '');
      });
      setForm(defaults);
    }
  }, [open, initialData, fields]);

  if (!open) return null;

  const handleChange = (key: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processed: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.type === 'number') {
        processed[f.key] = Number(form[f.key]) || 0;
      } else if (f.type === 'tags') {
        const val = form[f.key];
        processed[f.key] = typeof val === 'string' ? val.split(',').map((s: string) => s.trim()).filter(Boolean) : val;
      } else {
        processed[f.key] = form[f.key];
      }
    });
    onSubmit(processed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`${COLORS.CARD_BG} rounded-xl w-full max-w-lg shadow-2xl mx-4 max-h-[90vh] flex flex-col`}>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  value={String(form[field.key] ?? '')}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              ) : field.type === 'boolean' ? (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(form[field.key])}
                    onChange={(e) => handleChange(field.key, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Boolean(form[field.key]) ? STRINGS.ACTIVE : STRINGS.INACTIVE}
                  </span>
                </label>
              ) : field.type === 'select' ? (
                <select
                  value={String(form[field.key] ?? '')}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={field.required}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={String(form[field.key] ?? '')}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  step={field.type === 'number' ? 'any' : undefined}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              )}
            </div>
          ))}
        </form>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`${COLORS.GHOST_BTN} px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer`}
          >
            {STRINGS.CANCEL}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`${COLORS.PRIMARY_BTN} px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50`}
          >
            {loading ? STRINGS.LOADING : STRINGS.SAVE}
          </button>
        </div>
      </div>
    </div>
  );
}
