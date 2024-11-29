import ExpandLeft from '../assets/expand-left.svg';
import ExpandRight from '../assets/expand-right.svg';

type ExpandButtonType = {
  collapsed: boolean;
  showExpand: boolean;
  onClick: () => void;
};

export default function ExpandButton({
  collapsed,
  showExpand,
  onClick,
}: ExpandButtonType) {
  const expandButton = (
    <button onClick={onClick}>
      <img src={ExpandRight} title='show' className='w-4 h-4' />
    </button>
  );

  const collapseButton = (
    <button onClick={onClick}>
      <img src={ExpandLeft} title='hide' className='w-4 h-4' />
    </button>
  );

  return collapsed ? showExpand && expandButton : collapseButton;
}
