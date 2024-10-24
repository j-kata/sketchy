import { ToolItem } from './ToolItem';
import { Tool } from '../types';

interface ToolsProps {
  selected: Tool | null;
  onClick: (tool: Tool) => void;
}

export default function Tools({ selected, onClick }: ToolsProps) {
  return (
    <div className='fixed top-4 left-1/2 -translate-x-1/2 flex items-center p-2 space-x-4 border border-neutral-200 rounded-md shadow-md'>
      {Object.values(Tool).map((value) => (
        <ToolItem
          key={value}
          src={`/src/assets/${value}.svg`}
          alt={value}
          selected={selected == value}
          onClick={() => onClick(value)}
        />
      ))}
    </div>
  );
}
