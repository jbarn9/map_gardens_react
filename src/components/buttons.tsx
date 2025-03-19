// import React from 'react';
import { MouseEventHandler } from 'react';
import '../styles/Map.css'; 

interface AddGardenButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  label: string;
}

function AddGardenButton({ onClick, className = '', label = ''}: AddGardenButtonProps) {
  return (
    <button 
      className={`add-garden-button ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default AddGardenButton;