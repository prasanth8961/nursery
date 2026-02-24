'use client';
import { COLORS, STRINGS } from '../constants';

interface DeleteConfirmProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function DeleteConfirm({ open, onConfirm, onCancel, loading }: DeleteConfirmProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`${COLORS.CARD_BG} rounded-xl p-6 w-full max-w-sm shadow-2xl mx-4`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {STRINGS.CONFIRM_DELETE_TITLE}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {STRINGS.CONFIRM_DELETE}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className={`${COLORS.GHOST_BTN} px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer`}
          >
            {STRINGS.CANCEL}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`${COLORS.DANGER_BTN} px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50`}
          >
            {loading ? STRINGS.LOADING : STRINGS.DELETE}
          </button>
        </div>
      </div>
    </div>
  );
}
