import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { gridSettingsStore, setGridColumns } from '../../stores/gridStore';
import { GridSettingsSchema } from '../../types/project';

const GridController: React.FC = () => {
  const gridSettings = useStore(gridSettingsStore);
  const [columns, setColumns] = useState(gridSettings.columns);

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('grid-settings');
    if (saved) {
      try {
        const parsed = GridSettingsSchema.parse(JSON.parse(saved));
        setColumns(parsed.columns);
        setGridColumns(parsed.columns);
      } catch (error) {
        console.error('Invalid saved settings:', error);
      }
    }
  }, []);

  const handleColumnChange = (newColumns: number) => {
    try {
      const validated = GridSettingsSchema.parse({ columns: newColumns });
      setColumns(validated.columns);
      setGridColumns(validated.columns);
      
      // Save to localStorage
      localStorage.setItem('grid-settings', JSON.stringify(validated));
    } catch (error) {
      console.error('Invalid column value:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Grid:</span>
        <input
          type="range"
          min="1"
          max="6"
          value={columns}
          onChange={(e) => handleColumnChange(parseInt(e.target.value))}
          className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <span className="text-sm font-bold text-gray-900 w-4">{columns}</span>
      </div>
    </div>
  );
};

export default GridController;
