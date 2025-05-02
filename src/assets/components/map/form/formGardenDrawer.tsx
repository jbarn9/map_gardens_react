import useMultistepForm from "../multistepForm";
import { Drawer } from 'vaul';
import { useEffect, useState } from "react";
import { Input } from "./formInputs";
import { Networks } from "../../../../types";
import { GardenCategories } from "../../../../types";
import { gardenServices } from "../../../../services/gardenServices";

type propType = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onSubmit: (data: any) => void;
    setValue: (name: string, value: string | number) => void;
}
type CoordonateFormProps = {
    formData: {
        address: string;
        zipCode: string;
        city: string;
        country: string;
        latitude: string;
        longitude: string;
    };
    setFormData: (data: any) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

type GardenFormProps = {
    formData: {
        name: string;
        network: string;
        category: string;
        type: string;
        parcels: number;
        presentation: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setFormData: (data: any) => void;
};




function CoordonateForm({formData, handleChange}: CoordonateFormProps) {
    return (
        <>
        <label className="floating-label">
            <span>Adresse du jardin</span>
            <input type="text" id="address" name="address" className="input input-md" placeholder="Adresse du jardin" value={formData.address} onChange={handleChange} />
        </label>
        <label className="floating-label">
            <span>Code postal</span>
            <input type="text" id="zipCode" name="zipCode" className="input input-md" placeholder="Code postal du jardin" value={formData.zipCode} onChange={handleChange} />
        </label>
        <label className="floating-label">
            <span>Ville</span>
            <input type="text" id="city" name="city" className="input input-md" placeholder="Ville du jardin" value={formData.city} onChange={handleChange} />
        </label>
        <label className="floating-label">
            <span>Pays</span>
            <input type="text" id="country" name="country" className="input input-md" placeholder="Pays du jardin" value={formData.country} onChange={handleChange} />
        </label>
        <label className="floating-label">
            <span>Latitude</span>
            <input type="number" id="latitude" name="latitude" className="input input-md" placeholder="Latitude du jardin" value={formData.latitude} onChange={handleChange} />
        </label>
        <label className="floating-label">
            <span>Longitude</span>
            <input type="number" id="longitude" name="longitude" className="input input-md" placeholder="Longitude du jardin" value={formData.longitude} onChange={handleChange} />
        </label>
        </>
    )
}

function GardenForm({formData, handleChange, setFormData}: GardenFormProps) {
    const [networks, setNetworks] = useState<Networks[]>([]);
    const [gardenCategories, setGardenCategories] = useState<GardenCategories[]>([]);
    
    useEffect(() => {
        gardenServices.getNetworks().then((networks) => setNetworks(networks));
        gardenServices.getGardenCategories().then((gardenCategories) => setGardenCategories(gardenCategories));
    }, []);
    
    return (
        <>
            <legend>Informations sur le jardin</legend>
            
            <Input
                name='name'
                label="Nom du jardin" 
                className="floating-label"
                type="text"
                placeholder="Nom du jardin"
                value={formData.name}
                onChange={handleChange}
            />
            <fieldset>
                <legend>Réseau auquel appartient le jardin</legend>
                <select 
                    name="network" 
                    className="select"
                    value={formData.network}
                    onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                >
                    <option value="" disabled>Choisir un réseau</option>
                    {networks.map((network) => (
                        <option value={network.id} key={network.id}>{network.name}</option>
                    ))}
                </select>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Catégorie de jardin</legend>
                <select 
                    name="category" 
                    className="select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option value="" disabled>Choisir une catégorie</option>
                    {gardenCategories.map((category) => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
                <span className="fieldset-label">Obligatoire</span>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Type de jardin</legend>
                <select 
                    name="type" 
                    className="select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                    <option value="" disabled>Choisir un type</option>
                    <option value="habitation">Jardin partagé d'habitants</option>
                    <option value="enterprise">Jardin partagé d'entreprise</option>
                    <option value="flower">Fleurissement partagé</option>
                    <option value="copropriate">Jardin de copropriété</option>
                    <option value="insertionPro">Jardin d'insertion professionnelle</option>
                    <option value="insertionSoc">Jardin d'insertion sociale</option>
                    <option value="pedagogical">Jardin pédagogique</option>
                    <option value="otherType">Autre</option>
                </select>
                <span className="fieldset-label">Obligatoire</span>
            </fieldset>     
            <Input
                name="parcels"
                label="Nombre total de parcelles"
                className="floating-label"
                type="number"
                placeholder="Nombre de parcelles en production"
                onChange={(e) => setFormData({ ...formData, parcels: e.target.value })}
            />
            <textarea 
                className="textarea" 
                placeholder="Présentation rapide du jardin" 
                name="presentation" 
                minLength={10} 
                maxLength={150}
                value={formData.presentation}
                onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
            ></textarea>   
            
        </>
    )
}


const FormGardenDrawer: React.FC<propType> = ({open, onClose}) => {
    const [formData, setFormData] = useState({
        name: "",
        network: "",
        category: "",
        type: "",
        parcels: 0,
        presentation: "",
        address: "",
        zipCode: "",
        city: "",
        country: "",
        latitude: "",
        longitude: "",        
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevalue) => {
            return {
                ...prevalue,
                [e.target.name]: e.target.value
            }      
        })
    }
    const { currentStepIndex, step, back, next, isFirstStep, isLastStep} = useMultistepForm([<GardenForm formData={formData} setFormData={setFormData} handleChange={handleChange} />, <CoordonateForm formData={formData} setFormData={setFormData} handleChange={handleChange} />]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<String | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await fetch('http://localhost:3001/gardens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create garden');
            }
            const data = await response.json();
            console.log(data);
            setSuccess(true);
            
        } catch (error) {
            setError(error as String);
        } finally {
            setIsSubmitting(false);
        }
        
    };
    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        back();
    }
    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        next();
    }

    return (
        <Drawer.Root open={open} onOpenChange={onClose}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/20" />            
                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}
                
                {success && (
                    <div className="alert alert-success mb-4">
                        <span>Le jardin a été créé avec succès !</span>
                    </div>
                )}
                <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]"> 
                    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="absolute top-2 mx-2 py-1 px-2 rounded-md border btn btn-outline btn-primary z-50" onClick={onClose}>X</button>
                    </div>
                    <div className="max-w-md w-full mx-auto overflow-auto p-4 rounded-t-[10px]">
                    <Drawer.Handle />               
                    <form onSubmit={handleSubmit} className="space-y-4" method="POST">
                        <Drawer.Title className="font-medium text-gray-900 mt-8">Nouveau jardin</Drawer.Title>
                        <Drawer.Description className="leading-6 mt-2 text-gray-600">
                        Remplissez les champs ci-dessous pour créer votre nouveau jardin.
                        </Drawer.Description>
                        <ul className="steps w-full">
                            <li className={`step ${currentStepIndex >= 0 ? 'step-primary' : ''}`}>Etape 1</li>
                            <li className={`step ${currentStepIndex >= 1 ? 'step-primary' : ''}`}>Etape 2</li>
                        </ul>
                        <fieldset className="fieldset border border-base-300 p-4 rounded-box">
                            {step}
                            <div className="relative flex flex-row gap-2">
                                {!isFirstStep && <button type="button" className="btn btn-outline btn-primary" onClick={handleBack}>Précedent</button>}
                                {isLastStep ? <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>Créer le jardin</button> : <button className="btn btn-primary" onClick={handleNext}>Suivant</button>}
                            </div>
                        </fieldset>
                    </form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default FormGardenDrawer;