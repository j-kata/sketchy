interface ToolItemProps {
  src: string;
  alt: string;
  selected: boolean;
  onClick: () => void;
}

export function ToolItem({ src, alt, selected, onClick }: ToolItemProps) {
  let classes =
    'flex justify-center items-center w-10 h-10 p-2 rounded-md cursor-pointer hover:bg-lime-600/10';
  if (selected) classes += ' bg-lime-600/20';

  return (
    <button type='button' className={classes} onClick={onClick}>
      <img src={src} alt={alt} />
    </button>
  );
}
