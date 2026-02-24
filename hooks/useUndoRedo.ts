'use client';

import { useState, useCallback, useRef } from 'react';

export function useUndoRedo<T>(initialState: T, maxHistory: number = 50) {
  const [state, setState] = useState<T>(initialState);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const pastRef = useRef<T[]>([]);
  const futureRef = useRef<T[]>([]);

  const updateState = useCallback((newState: T) => {
    // Save current state to past before updating
    pastRef.current.push(state);
    
    // Limit history size
    if (pastRef.current.length > maxHistory) {
      pastRef.current.shift();
    }
    
    // Clear future when new state is set
    futureRef.current = [];
    
    setState(newState);
    setCanUndo(true);
    setCanRedo(false);
  }, [state, maxHistory]);

  const undo = useCallback(() => {
    if (pastRef.current.length === 0) return;

    // Save current state to future
    futureRef.current.push(state);
    
    // Get previous state
    const previousState = pastRef.current.pop()!;
    
    setState(previousState);
    setCanUndo(pastRef.current.length > 0);
    setCanRedo(true);
  }, [state]);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return;

    // Save current state to past
    pastRef.current.push(state);
    
    // Get next state
    const nextState = futureRef.current.pop()!;
    
    setState(nextState);
    setCanUndo(true);
    setCanRedo(futureRef.current.length > 0);
  }, [state]);

  const reset = useCallback(() => {
    pastRef.current = [];
    futureRef.current = [];
    setState(initialState);
    setCanUndo(false);
    setCanRedo(false);
  }, [initialState]);

  const clearHistory = useCallback(() => {
    pastRef.current = [];
    futureRef.current = [];
    setCanUndo(false);
    setCanRedo(false);
  }, []);

  return {
    state,
    setState: updateState,
    undo,
    redo,
    reset,
    clearHistory,
    canUndo,
    canRedo,
  };
}
