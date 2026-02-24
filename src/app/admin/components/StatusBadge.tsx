'use client';
import { COLORS, STRINGS } from '../constants';

interface StatusBadgeProps {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

export default function StatusBadge({
  active,
  activeLabel = STRINGS.ACTIVE,
  inactiveLabel = STRINGS.INACTIVE,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${active ? COLORS.BADGE_ACTIVE : COLORS.BADGE_INACTIVE}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${active ? 'bg-emerald-500' : 'bg-red-500'}`} />
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}
