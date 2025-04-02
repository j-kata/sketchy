import { OptionItem } from './OptionItem';
import { Option, OptionValues, OptionKey } from '../../types/options';

import { useContext } from 'react';
import {
  OptionsContext,
  OptionsContextType,
} from '../../contexts/OptionsContext';

interface OptionPanelProps {
  show: boolean;
}

export default function OptionsPanel({ show }: OptionPanelProps) {
  const { options, setOptions } = useContext(
    OptionsContext
  ) as OptionsContextType;

  const handleChange = (key: OptionKey, value: Option) => {
    setOptions({ ...options, ...{ [key]: value } });
  };

  const defaultClasses =
    'fixed z-10 left-4 top-1/2 -translate-y-1/2 px-2 py-4 background-white border border-neutral-300 rounded-md shadow-md';

  if (!show) return null;

  return (
    <div className={defaultClasses}>
      <div className='space-y-5'>
        {Object.entries(OptionValues).map(([key, element]) => (
          <OptionItem
            key={key}
            title={`${key}`}
            values={element}
            selected={options[key as OptionKey]}
            onClick={(value) => handleChange(key as OptionKey, value)}
          />
        ))}
      </div>
    </div>
  );
}
