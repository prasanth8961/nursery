'use client';
import { COLORS, STRINGS } from '../constants';
import type { ColumnDef } from '@/types/admin';
import { MdEdit, MdDelete } from 'react-icons/md';

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  keyField?: string;
}

export default function DataTable<T extends object>({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  keyField = 'id',
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className={`${COLORS.CARD_BG} ${COLORS.CARD_BORDER} rounded-xl p-12 text-center`}>
        <div className="animate-spin-slow w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-gray-500">{STRINGS.LOADING}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`${COLORS.CARD_BG} ${COLORS.CARD_BORDER} rounded-xl p-12 text-center`}>
        <p className="text-gray-500">{STRINGS.NO_DATA}</p>
      </div>
    );
  }

  return (
    <div className={`${COLORS.CARD_BG} ${COLORS.CARD_BORDER} rounded-xl overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 w-24">
                  {STRINGS.ACTIONS}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const rowAny = row as Record<string, unknown>;
              return (
              <tr
                key={String(rowAny[keyField]) || idx}
                className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                {columns.map((col) => {
                  const val = rowAny[col.key as string];
                  return (
                    <td key={String(col.key)} className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {col.render ? col.render(val, row) : String(val ?? '-')}
                    </td>
                  );
                })}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors cursor-pointer"
                          title={STRINGS.EDIT}
                        >
                          <MdEdit size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
                          title={STRINGS.DELETE}
                        >
                          <MdDelete size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
