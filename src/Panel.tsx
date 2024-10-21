import { useDispatch, useSelector } from 'react-redux';
import { PanelItem } from './PanelItem';
import { Background, Color } from './types';
import {
  setStrokeColor,
  setBackgroundColor,
  strokeColorSelector,
  backgroundSelector,
} from './redux/optionSlice';

export default function Panel() {
  const dispatch = useDispatch();
  const strokeColor = useSelector(strokeColorSelector);
  const backgroundColor = useSelector(backgroundSelector);

  return (
    <div className='fixed left-4 top-1/2 -translate-y-1/2 p-2 space-y-5 border border-neutral-300 rounded-md shadow-md'>
      <PanelItem
        title='Color'
        values={Color}
        selected={strokeColor}
        onClick={(color: Color) => dispatch(setStrokeColor(color))}
      />
      <PanelItem
        title='Background'
        values={Background}
        selected={backgroundColor}
        onClick={(color: Background) => dispatch(setBackgroundColor(color))}
      />
    </div>
  );
}
