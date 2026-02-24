'use client';
import { COLORS, STRINGS } from '../constants';

interface PageHeaderProps {
  title: string;
  onAdd?: () => void;
  addLabel?: string;
}

export default function PageHeader({ title, onAdd, addLabel = STRINGS.ADD_NEW }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      {onAdd && (
        <button
          onClick={onAdd}
          className={`${COLORS.PRIMARY_BTN} px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer`}
        >
          <span className="text-lg">+</span>
          {addLabel}
        </button>
      )}
    </div>
  );
}
