import { MouseEventHandler } from 'react';

interface LinksProps {
  onClick: MouseEventHandler<HTMLAnchorElement>;
  id:string;
  className?: string;
  index: string;
  label:string
}

function Links({ onClick, className = '', index, label='', id}: LinksProps) {
  return (           
    <>
        <a className={className} href={index} onClick={onClick} id={id}>{label}</a>        
    </>
)}
export default Links; 
