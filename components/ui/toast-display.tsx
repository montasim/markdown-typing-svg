'use client';

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils/cn';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'destructive';
}

export function ToastDisplay() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: { id: string; title?: string; description?: string; variant?: 'default' | 'success' | 'destructive' }; onClose: () => void }) {
  const variant = toast.variant || 'default';

  const variantStyles = {
    default: 'border-slate-200 bg-white text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50',
    success: 'border-green-500 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-900/10 dark:text-green-50',
    destructive: 'border-red-500 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-900/10 dark:text-red-50',
  };

  const icons = {
    default: Info,
    success: CheckCircle,
    destructive: AlertCircle,
  };

  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-md border p-4 shadow-lg transition-all animate-in slide-in-from-top-2',
        variantStyles[variant]
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        {toast.title && (
          <p className="text-sm font-semibold">{toast.title}</p>
        )}
        {toast.description && (
          <p className="text-sm opacity-90">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 rounded-md opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
