'use client';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface ModuleState {
  completedModules: number[];
  completeModule: (moduleId: number) => void;
  resetModules: () => void;
}

export const useModuleStore = create<ModuleState>()(
  persist(
    (set, get) => ({
      completedModules: [],
      completeModule: (moduleId: number) => {
        set(state => ({
          completedModules: [...state.completedModules, moduleId],
        }));
      },
      resetModules: () => {
        set({completedModules: []});
      },
    }),
    {
      name: 'module-storage',
      getStorage: () => localStorage,
    }
  )
);
