import { MouseEventHandler } from 'react';

interface AddButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  label: string;
}

function AddButton({ onClick, className = '', label = ''}: AddButtonProps) {
  return (
    <button 
      className={`add-button ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
export default AddButton; 