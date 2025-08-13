import { atom } from 'nanostores';
import type { GridSettings } from '../types/project';

export const gridSettingsStore = atom<GridSettings>({ columns: 3 });

export const setGridColumns = (columns: number) => {
  gridSettingsStore.set({ columns });
};