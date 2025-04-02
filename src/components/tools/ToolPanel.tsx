import { ToolItem } from './ToolItem';
import { Tool } from '../../types/Tool';
import { useContext } from 'react';
import { ToolsContext, ToolsContextType } from '../../contexts/ToolsContext';

interface ToolPanelProps {
  onClick: (tool: Tool) => void;
}

export default function ToolPanel({ onClick }: ToolPanelProps) {
  const { tool } = useContext(ToolsContext) as ToolsContextType;

  const defaultClasses =
    'fixed z-40 top-4 left-1/2 -translate-x-1/2 flex items-center py-2 px-4 space-x-3 bg-white border border-neutral-200 rounded-md shadow-md';

  return (
    <div className={defaultClasses}>
      {Object.values(Tool).map((value) => (
        <ToolItem
          key={value}
          src={`/src/assets/${value}.svg`}
          alt={value}
          selected={tool == value}
          onClick={() => onClick(value)}
        />
      ))}
    </div>
  );
}
