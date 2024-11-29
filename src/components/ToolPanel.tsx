import { ToolItem } from './ToolItem';
import { Tool } from '../types';
import { useContext } from 'react';
import { ToolsContext, ToolsContextType } from '../context/ToolsContext';

export default function ToolPanel() {
  const { tool, setTool } = useContext(ToolsContext) as ToolsContextType;

  const defaultClasses =
    'fixed top-4 left-1/2 -translate-x-1/2 flex items-center py-2 px-4 space-x-3 border border-neutral-200 rounded-md shadow-md';

  return (
    <div className={defaultClasses}>
      {Object.values(Tool).map((value) => (
        <ToolItem
          key={value}
          src={`/src/assets/${value}.svg`}
          alt={value}
          selected={tool == value}
          onClick={() => setTool(value)}
        />
      ))}
    </div>
  );
}
