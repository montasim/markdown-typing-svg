'use client';

import { useState, useCallback, useEffect } from 'react';
import { TypingSVGOptions } from '@/types/options';

export interface Preset {
  id: string;
  name: string;
  options: TypingSVGOptions;
  createdAt: number;
}

const STORAGE_KEY = 'typing-svg-presets';

export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load presets from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPresets(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load presets:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save presets to localStorage whenever they change
  const savePresets = useCallback((newPresets: Preset[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPresets));
      setPresets(newPresets);
    } catch (err) {
      console.error('Failed to save presets:', err);
    }
  }, []);

  // Add a new preset
  const addPreset = useCallback((name: string, options: TypingSVGOptions) => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      name,
      options,
      createdAt: Date.now(),
    };
    savePresets([...presets, newPreset]);
    return newPreset;
  }, [presets, savePresets]);

  // Remove a preset
  const removePreset = useCallback((id: string) => {
    savePresets(presets.filter(p => p.id !== id));
  }, [presets, savePresets]);

  // Load a preset
  const loadPreset = useCallback((id: string): Preset | null => {
    const preset = presets.find(p => p.id === id);
    return preset || null;
  }, [presets]);

  // Update a preset
  const updatePreset = useCallback((id: string, options: TypingSVGOptions) => {
    savePresets(presets.map(p => 
      p.id === id ? { ...p, options, createdAt: Date.now() } : p
    ));
  }, [presets, savePresets]);

  return {
    presets,
    isLoading,
    addPreset,
    removePreset,
    loadPreset,
    updatePreset,
  };
}
