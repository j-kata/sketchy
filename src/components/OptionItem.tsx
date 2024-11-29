import { SupportedOption, SupportedOptionEnum } from '../types';

// TODO find better solution for enums
interface PanelItemInterface<T extends SupportedOption> {
  title: string;
  values: SupportedOptionEnum;
  selected?: T;
  collapsed: boolean;
  onClick: (value: T) => void;
}

export function OptionItem<T extends SupportedOption>({
  title,
  values,
  selected,
  collapsed,
  onClick,
}: PanelItemInterface<T>) {
  const defaultClasses =
    'flex justify-center items-center w-6 h-6 mx-1 rounded border border-neutral-200';

  const uniqueClass = (title: string, key: string) => {
    return `option-${title
      .toLowerCase()
      .replace(' ', '-')}-${key.toLowerCase()}`;
  };

  const selectedClass = (selected: boolean) =>
    `${selected ? 'selected outline outline-neutral-500' : ''}`;

  const combinedClass = (title: string, key: string, selected: boolean) =>
    `${defaultClasses} ${uniqueClass(title, key)} ${selectedClass(selected)}`;

  const hiddenClass = 'hidden';

  const evalClasses = (title: string, key: string, selected: boolean) =>
    collapsed && !selected ? hiddenClass : combinedClass(title, key, selected);

  return (
    <div>
      {!collapsed && <h1 className='mb-2 text-sm'>{title}</h1>}
      <div className='flex items-center'>
        {Object.entries(values).map(([key, value]) => (
          <button
            key={key}
            title={collapsed ? title : ''}
            onClick={() => onClick(value)}
            className={evalClasses(title, key, value == selected)}
          ></button>
        ))}
      </div>
    </div>
  );
}
