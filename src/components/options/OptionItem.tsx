import { Option, OptionType } from '../../types/options';
import '../../styles/options.css';

interface OptionItemInterface<T extends Option> {
  title: string;
  values: OptionType;
  selected?: T;
  onClick: (value: T) => void;
}

export function OptionItem<T extends Option>({
  title,
  values,
  selected,
  onClick,
}: OptionItemInterface<T>) {
  const defaultClasses =
    'flex justify-center items-center w-6 h-6 mx-1 rounded border border-neutral-200';

  const uniqueClass = (title: string, key: string) => {
    return `option-${title
      .toLowerCase()
      .replace(' ', '-')}-${key.toLowerCase()}`;
  };

  const selectedClass = (selected: boolean) =>
    `${selected ? 'selected outline outline-neutral-500' : ''}`;

  const evalClasses = (title: string, key: string, selected: boolean) =>
    `${defaultClasses} ${uniqueClass(title, key)} ${selectedClass(selected)}`;

  return (
    <div>
      <h1 className='mb-2 text-sm'>{title}</h1>
      <div className='flex items-center'>
        {Object.entries(values).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onClick(value)}
            className={evalClasses(title, key, value == selected)}
          ></button>
        ))}
      </div>
    </div>
  );
}
