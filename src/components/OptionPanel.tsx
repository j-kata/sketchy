import { OptionItem } from './OptionItem';
import { Background, Color, Width, Style, Options } from '../types';

import { useContext, useState } from 'react';
import { OptionsContext, OptionsContextType } from '../context/OptionsContext';
import ExpandButton from './ExpandButton';

export default function OptionsPanel() {
  const { options, setOptions } = useContext(
    OptionsContext
  ) as OptionsContextType;
  const [collapsed, setCollapsed] = useState(false);

  const handleChange = (value: Options) => {
    setOptions({ ...options, ...value });
  };

  const handleExpand = () => collapsed && setCollapsed(false);
  const handleCollapse = () => setCollapsed(true);

  const evalClasses = () => {
    const defaultClasses =
      'fixed z-10 left-4 top-1/2 -translate-y-1/2 px-2 py-4 border border-neutral-300 rounded-md shadow-md';
    return collapsed ? `${defaultClasses} collapsed` : defaultClasses;
  };

  return (
    <div className={evalClasses()} onClick={handleExpand}>
      <div className='flex justify-end'>
        <ExpandButton
          collapsed={collapsed}
          showExpand={false}
          onClick={handleCollapse}
        />
      </div>
      <div className='space-y-5'>
        <OptionItem
          title='Color'
          values={Color}
          selected={options.stroke}
          collapsed={collapsed}
          onClick={(value: Color) => handleChange({ stroke: value })}
        />
        <OptionItem
          title='Background'
          values={Background}
          selected={options.fill}
          collapsed={collapsed}
          onClick={(value: Background) => handleChange({ fill: value })}
        />
        <OptionItem
          title='Stroke Width'
          values={Width}
          selected={options.strokeWidth}
          collapsed={collapsed}
          onClick={(value: Width) => handleChange({ strokeWidth: value })}
        />
        <OptionItem
          title='Style'
          values={Style}
          selected={options.fillStyle}
          collapsed={collapsed}
          onClick={(value: Style) => handleChange({ fillStyle: value })}
        />
      </div>
    </div>
  );
}
