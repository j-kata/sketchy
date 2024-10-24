import { ToolItem } from './ToolItem';
import { Tool } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setTool } from '../redux/toolSlice';

export default function Tools() {
  const selected = useSelector((state: RootState) => state.tool.tool);
  const dispatch = useDispatch();

  return (
    <div className='fixed top-4 left-1/2 -translate-x-1/2 flex items-center p-2 space-x-4 border border-neutral-200 rounded-md shadow-md'>
      {Object.values(Tool).map((value) => (
        <ToolItem
          key={value}
          src={`/src/assets/${value}.svg`}
          alt={value}
          selected={selected == value}
          onClick={() => dispatch(setTool(value))}
        />
      ))}
    </div>
  );
}
