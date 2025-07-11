import { MouseEventHandler } from 'react';

interface AddButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  label: string;
  icon: React.ReactNode;
}

function AddButton({ onClick, className = '', label = '', icon = null}: AddButtonProps) {
  return (
    <button 
      className={className}
      onClick={onClick}
    >
      {label} {icon}
    </button>
  );
}
export default AddButton; 