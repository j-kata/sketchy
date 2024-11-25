interface ToolItemProps {
  src: string;
  alt: string;
  selected: boolean;
  onClick: () => void;
}

export function ToolItem({ src, alt, selected, onClick }: ToolItemProps) {
  const defaultClasses =
    'flex justify-center items-center w-9 h-9 p-2 rounded-md cursor-pointer hover:bg-lime-600/10';
  const classes = selected
    ? `${defaultClasses} bg-lime-600/20`
    : defaultClasses;

  return (
    <button type='button' className={classes} onClick={onClick}>
      <img src={src} alt={alt} />
    </button>
  );
}
