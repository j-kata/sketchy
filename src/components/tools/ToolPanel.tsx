import { ToolItem } from './ToolItem';
import { Tool } from '../../types/Tool';
import { useContextSafe } from '../../hooks/useContextSafe';
import { EditorContext } from '../../contexts/EditorContext';

export default function ToolPanel() {
  const { tool, dispatch } = useContextSafe(EditorContext);

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
          onClick={() => dispatch({ type: 'change_tool', tool: value })}
        />
      ))}
    </div>
  );
}
