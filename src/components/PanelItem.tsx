interface PanelItemInterface<T> {
  title: string;
  values: object;
  selected?: T;
  onClick: (value: T) => void;
}

export function PanelItem<T>({
  title,
  values,
  selected,
  onClick,
}: PanelItemInterface<T>) {
  const classes =
    'flex justify-center items-center w-6 h-6 rounded border border-neutral-200';
  return (
    <div>
      <h1 className='mb-2 text-sm font-semibold'>{title}</h1>
      <div className='flex items-center space-x-1'>
        {Object.entries(values)
          .filter(([k]) => isNaN(parseInt(k)))
          .map(([key, value]) => (
            <button
              key={key.toLowerCase()}
              onClick={() => onClick(value)}
              className={
                classes +
                ` panel-${title
                  .toLowerCase()
                  .replace(' ', '-')}-${key.toLowerCase()} ${
                  value === selected ? 'outline outline-neutral-500' : ''
                }`
              }
            ></button>
          ))}
      </div>
    </div>
  );
}
