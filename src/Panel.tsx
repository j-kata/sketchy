import { PanelItem } from './PanelItem';
import { Background, Color } from './types';

interface PanelInterface {
  selectedStrokeColor: Color;
  onStrokeColorClick: (color: Color) => void;
  selectedBackgroundColor: Background;
  onBackgroundColorClick: (background: Background) => void;
}

export default function Panel({
  selectedStrokeColor,
  onStrokeColorClick,
  selectedBackgroundColor,
  onBackgroundColorClick,
}: PanelInterface) {
  return (
    <div className='fixed left-4 top-1/2 -translate-y-1/2 p-2 space-y-5 border border-neutral-300 rounded-md shadow-md'>
      <PanelItem
        title='Color'
        values={Color}
        selected={selectedStrokeColor}
        onClick={onStrokeColorClick}
      />
      <PanelItem
        title='Background'
        values={Background}
        selected={selectedBackgroundColor}
        onClick={onBackgroundColorClick}
      />
    </div>
  );
}
