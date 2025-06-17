import { HTMLInputTypeAttribute } from "react";

export function Input({ name, label, className, type, placeholder, value, onChange }: { name: string, label: string, className: string, type: HTMLInputTypeAttribute, placeholder?: string, value?: string | number, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <label className={className}>
            {label}
            <input type={type} placeholder={placeholder} name={name} value={value} className="input input-md" onChange={onChange} />
        </label> 
    )
}
  
export function Select({ options, name, ...rest }: {  options: string[], name: string }) {
    return (
        <select {...rest}>
        {options.map((value) => (
            <option key={value} value={value}>
            {value}
            </option>
        ))}
        </select>
    )
}
