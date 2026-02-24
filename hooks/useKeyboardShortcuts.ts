'use client';

import { useEffect, useCallback } from 'react';

interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  handler: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const matchesKey = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const matchesCtrl = shortcut.ctrlKey ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const matchesShift = shortcut.shiftKey ? event.shiftKey : !event.shiftKey;
        const matchesAlt = shortcut.altKey ? event.altKey : !event.altKey;
        const matchesMeta = shortcut.metaKey ? event.metaKey : !event.metaKey;

        if (matchesKey && matchesCtrl && matchesShift && matchesAlt && matchesMeta) {
          event.preventDefault();
          shortcut.handler();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return shortcuts;
}

export const commonShortcuts: {
  save: Omit<ShortcutConfig, 'handler'>;
  undo: Omit<ShortcutConfig, 'handler'>;
  redo: Omit<ShortcutConfig, 'handler'>;
  copy: Omit<ShortcutConfig, 'handler'>;
  reset: Omit<ShortcutConfig, 'handler'>;
} = {
  save: { key: 's', ctrlKey: true, description: 'Save configuration' },
  undo: { key: 'z', ctrlKey: true, description: 'Undo last change' },
  redo: { key: 'y', ctrlKey: true, description: 'Redo last change' },
  copy: { key: 'c', ctrlKey: true, description: 'Copy to clipboard' },
  reset: { key: 'r', ctrlKey: true, shiftKey: true, description: 'Reset to defaults' },
};
