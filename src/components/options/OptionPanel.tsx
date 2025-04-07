import { OptionItem } from './OptionItem';
import { Option, OptionValues, OptionKey } from '../../types/options';

import { useContextSafe } from '../../hooks/useContextSafe';
import { EditorContext } from '../../contexts/EditorContext';
import { Mode } from '../../types/Mode';

export default function OptionsPanel() {
  const { mode, options, dispatch } = useContextSafe(EditorContext);

  const handleChange = (key: OptionKey, value: Option) => {
    const nextOptions = { ...options, ...{ [key]: value } };
    dispatch({ type: 'change_options', options: nextOptions });
  };

  const hidden = mode === Mode.IDLE;
  const defaultClasses =
    'fixed z-10 left-4 top-1/2 -translate-y-1/2 px-2 py-4 background-white border border-neutral-300 rounded-md shadow-md';

  if (hidden) return null;

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
