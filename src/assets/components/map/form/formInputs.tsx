import { HTMLInputTypeAttribute, useEffect, useState } from "react"
import { InputautocompleteProps, Address } from "../../../../types/form.interfaces";
import { gardenServices } from "../../../../services/gardenServices";


export function Input({ name, label, className, type, placeholder, value, onChange }: { name: string, label: string, className: string, type: HTMLInputTypeAttribute, placeholder?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
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

export function Inputautocomplete({ 
    name,
    value,
    className,
    type,
    placeholder,
    list,
    postcode
}: InputautocompleteProps) {
    const [coordinatesValue, setCoordinatesValue] = useState<Address[] | null>(null);    
    const [inputValue, setInputValue] = useState(value);

    // fetch address from the server when value changes
    useEffect(() => {
        try {
            const fetchAddress = async () => {
                await gardenServices.searchAddress(inputValue, postcode).then((coordinatesValue) => {
                    setCoordinatesValue(coordinatesValue);
                });
            }
            fetchAddress();
        } catch (error) {
            console.error('Erreur dans le contrôleur:', error);
            throw error;
        }
    }, [inputValue])
   
    const handleSuggestionClick = (value: any) => { 
        setInputValue(value.street);
        setCoordinatesValue(value);
    };
    
    return (
        <>
            <label htmlFor={name} className={className}>
                <span>{name}</span>
            </label>
            <div className="input-container">
                <input 
                    type={type}
                    name={name}
                    id={name}
                    className="input"
                    placeholder={placeholder}
                    value={inputValue}                                  
                    aria-autocomplete="list"
                    aria-controls={list}
                    list={list}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {coordinatesValue && coordinatesValue.length > 0 && (
                    <ul id={list} role="listbox" style={{width: 'auto', height: '200px', overflow: 'auto'}}>
                        {coordinatesValue.map((stt: Address, index: number) => (
                            <li key={index} onClick={() => handleSuggestionClick(stt)} role="option">{stt.street}</li>
                        ))}
                    </ul> 
                )}
            </div>
        </>
    )
}
