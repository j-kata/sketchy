interface PanelItemInterface<T> {
  title: string;
  values: object;
  selected: T;
  onClick: (value: T) => void;
}

export function PanelItem<T>({
  title,
  values,
  selected,
  onClick,
}: PanelItemInterface<T>) {
  const classes = 'w-6 h-6 rounded border border-neutral-200';

  return (
    <div>
      <h1 className='text-sm font-semibold'>{title}</h1>
      <div className='flex items-center space-x-1'>
        {Object.entries(values).map(([key, value]) => (
          <button
            key={key.toLowerCase()}
            onClick={() => onClick(value)}
            className={
              classes +
              ` panel-${key.toLowerCase()} ${
                value === selected ? 'outline outline-neutral-500' : ''
              }`
            }
          ></button>
        ))}
      </div>
    </div>
  );
}
