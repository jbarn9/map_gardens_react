import { Drawer } from 'vaul';
import React, { useEffect, useState } from "react";
import useMultistepForm from "../multistepForm";
import { Input } from "./formInputs";
import { gardenServices } from "../../../../services/gardenServices";
import { Address, Networks, Gardens } from "../../../../types/form.interfaces";
import { GardenFormProps, GardenCategories, GardenTypes, CoordinatesFormProps } from "../../../../types/form.types";
import { propType } from "../../../../types/form.interfaces";

function CoordinatesForm({formData, handleChange, onCoordinatesChange, onLabelStreetChange}: CoordinatesFormProps ) { 
    const [postcode, setPostcode] = useState(formData.postcode);
    const [coordinatesValue, setCoordinatesValue] = useState<Address[] | null>(null);
    const [coordinatesValueStreet, setCoordinatesValueStreet] = useState<Address[] | null>(null);
    const [streetName, setStreetName] = useState(formData.street);
    const [coordinates, setCoordinates] = useState({ lon: formData.long, lat: formData.lat});
    const [error, setError] = useState<String | null>(null);
    
    useEffect(() => {
        try {
            // fetch address from the server when value changes
            const fetchAddress = async () => {
                await gardenServices.searchPostalCode(postcode).then((coordinatesValue) => {
                    setCoordinatesValue(coordinatesValue);
                });
            }
            fetchAddress();
        } catch (error) {
            setError(error as String);
            console.error('Erreur dans le contrôleur:', error);
        }
    }, [postcode])

    useEffect(() => {
        try {
            const fetchAddress = async () => {
                await gardenServices.searchAddress(streetName, postcode).then((coordinatesValueStreet) => {
                    setCoordinatesValueStreet(coordinatesValueStreet);
                    
                });                
            }
            fetchAddress();
        } catch (error) {
            setError(error as String);
            console.error('Erreur dans le contrôleur:', error);
        }
    }, [streetName])

    // Handle coordinates change to send them to the map (app.tsx)
    const handleCoordinatesChange = (lon: number, lat: number) => {
        onCoordinatesChange(lon, lat);
    }
    // Handle suggestion click - set values of the form
    const handleSuggestionClick = (value: any, type: string) => { 
        formData.street = value.name;
        if(type === 'city'){
            setCoordinatesValue(null);
            formData.postcode = value.postcode;
            formData.city = value.city;
            formData.country = "France";
            formData.cityId = value.id || ''; // Ajout du cityId
        }else if(type === 'street'){
            onLabelStreetChange(value.name);
            setCoordinatesValueStreet(null);
            setCoordinates({lon: value.lon, lat: value.lat});            
            formData.lat = value.lat;
            formData.long = value.lon;
            handleCoordinatesChange(value.lon, value.lat);
        }        
    }

    return (
        <>
        <label htmlFor="postcode" className="floating-label">
            <span>Code postal</span>
        </label>
        <div className="input-container">
            <input 
                type="text"
                name="postcode"
                id="postcode"
                className="input"
                placeholder="Code postal"
                value={formData.postcode}                                  
                aria-autocomplete="list"
                aria-controls="postcode-list"
                list="postcode-list"
                onChange={(e) => {setPostcode(e.target.value); handleChange(e)}}
            />
            {coordinatesValue && coordinatesValue.length > 0 && (
                <ul id="postcode-list" role="listbox" style={{width: 'clamp(3rem, 20rem, 100%)', height: 'fit-content', overflow: 'auto', padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px'}}>
                    {coordinatesValue.map((cityValue: Address, index: number) => (
                        <li key={index} onClick={() => {handleSuggestionClick(cityValue, 'city')}}  role="option">{cityValue.city} - France</li>
                    ))}
                </ul> 
            )}
        </div>
        <label htmlFor='label_street' className="floating-label">
                <span>Adresse du jardin</span>
            </label>
            <div className="input-container">
                <input 
                    type="text"
                    name="street"
                    id="label_street"
                    className="input"
                    placeholder="Adresse du jardin"
                    value={formData.street}    
                    aria-autocomplete="list"
                    aria-controls="street-list"
                    list="street-list"
                    onChange={(e) => {setStreetName(e.target.value); handleChange(e)}}
                />
                {coordinatesValueStreet && coordinatesValueStreet.length > 0 && (
                    <ul id="street-list" role="listbox" style={{width: 'clamp(3rem, 20rem, 100%)', height: 'fit-content', overflow: 'auto', padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px'}}>
                        {coordinatesValueStreet.map((stt: Address, index: number) => (
                            <li key={index} onClick={() => handleSuggestionClick(stt, 'street')} role="option">{stt.name}</li>
                        ))}
                    </ul> 
                )}
            </div>
        <Input name="city" label="Ville" placeholder="Ville du jardin" onChange={handleChange} className="floating-label" type="text" value={formData.city}/> 
        <Input name="country" label="Pays" value={formData.country} onChange={handleChange} placeholder="Pays du jardin" type="text" className="floating-label" />
        <Input name="lat" label="Latitude" value={formData.lat} onChange={e => onCoordinatesChange(Number(e.target.value), formData.long)} placeholder="Latitude du jardin" type="number" className="floating-label" />
        <Input name="long" label="Longitude" value={formData.long} onChange={e => onCoordinatesChange(formData.lat, Number(e.target.value))} placeholder="Longitude du jardin" type="number" className="floating-label" />
        </>     
    )
}

function GardenForm({formData, handleChange, setFormData}: GardenFormProps) {
    const [networks, setNetworks] = useState<Networks[]>([]);
    const [gardenCategories, setGardenCategories] = useState<GardenCategories[]>([]);
    const [gardenTypes, setGardenTypes] = useState<GardenTypes[]>([]);

    // fetch data from the server
    useEffect(() => {
        gardenServices.getNetworks().then((networks) => setNetworks(networks));
        gardenServices.getGardenCategories().then((gardenCategories) => setGardenCategories(gardenCategories));
        gardenServices.getGardenTypes().then((gardenTypes) => setGardenTypes(gardenTypes));
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
                    name="networkId" 
                    className="select"
                    value={formData.networkId}
                    onChange={handleChange}
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
                    name="gardenCategoryId" 
                    className="select"
                    value={formData.gardenCategoryId}
                    onChange={handleChange}
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
                    onChange={handleChange}
                >
                    <option value="" disabled>Choisir un type</option>
                    {gardenTypes.map((type) => (
                        <option value={type.id} key={type.id}>{type.name}</option>
                    ))}
                </select>
                <span className="fieldset-label">Obligatoire</span>
            </fieldset>     
            <Input
                name="parcels"
                label="Nombre total de parcelles"
                className="floating-label"
                type="number"
                placeholder="Nombre de parcelles en production"
                onChange={handleChange}
            />
            <textarea 
                className="textarea" 
                placeholder="Présentation rapide du jardin" 
                name="description" 
                minLength={10} 
                maxLength={150}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>   
        </>
    )
}

function GardenDetails({gardenDetails, onClose}: {gardenDetails: string | null, onClose: () => void}) {
    const [garden, setGarden] = useState<Gardens | null>(null);
    useEffect(() => {
        console.log(gardenDetails);
        gardenServices.getGardenDetails(gardenDetails as string).then((garden) => {
            if(garden.success) {
                setGarden(garden.data);                
            } else {
                console.error('Error fetching gardens:', garden.error);
            }
        });
    }, [gardenDetails]);    

    return (
        <>
            <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="absolute top-2 mx-2 py-1 px-2 rounded-md border btn btn-outline btn-primary z-50" onClick={onClose}>X</button>
            </div>
            {/* Form Add Garden */}
            <div className="max-w-md w-full mx-auto overflow-auto p-4 rounded-t-[10px]">
                <Drawer.Title className="font-medium text-gray-900 mt-8">Détails du jardin</Drawer.Title>
                <Drawer.Description className="leading-6 mt-2 text-gray-600">
                    <p>{garden?.name}</p>
                    <p>{garden?.description}</p>
                </Drawer.Description>
            </div>
        </>
    )
}

function FormAddGarden({onClose, onCoordinatesChange, onLabelStreetChange, onSubmit, gardenDetails}: propType) {
    const [name, setName] = useState("");
    const [network, setNetwork] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [parcels, setParcels] = useState(0);
    const [description, setDescription] = useState("");
    const [street, setStreet] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [coordinates, setCoordinates] = useState({lon: 0, lat: 0});  

    // Data for the first step of the form
    const [formData, setFormData] = useState({
        name: name,
        networkId: network,
        gardenCategoryId: category,
        type: type,
        parcels: parcels,
        description: description
    })

    // Data for the second step of the form
    const [formDataCoordinates, setFormDataCoordinates] = useState({
        street: street,
        postcode: postcode,
        city: city,
        country: country,
        lat: coordinates.lat,
        long: coordinates.lon,
        cityId: '' // Ajout du champ cityId requis par le backend
    })
    // dataFields is the initial state of the form
    const allFormData = {
        ...formData,
        ...formDataCoordinates
    };
    // Handle change of the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        switch (e.target.name) {
            case 'name':
            setName(e.target.value);
            setFormData({...formData, name: e.target.value});
            break;
        case 'networkId':
            setNetwork(e.target.value);
            setFormData({...formData, networkId: e.target.value});
            break;
        case 'gardenCategoryId':
            setCategory(e.target.value);
            setFormData({...formData, gardenCategoryId: e.target.value});
            break;
        case 'type':
            setType(e.target.value);
            setFormData({...formData, type: e.target.value});
            break;
        case 'parcels':
            setParcels(Number(e.target.value));
            setFormData({...formData, parcels: Number(e.target.value)});
            break;
        case 'description':
            setDescription(e.target.value);
            setFormData({...formData, description: e.target.value});
            break;
        case 'street':
            setStreet(e.target.value);
            setFormDataCoordinates({...formDataCoordinates, street: e.target.value});
            break;
        case 'postcode':
            setPostcode(e.target.value);
            setFormDataCoordinates({...formDataCoordinates, postcode: e.target.value});
            break;
        case 'city':
            setCity(e.target.value);
            setFormDataCoordinates({...formDataCoordinates, city: e.target.value});
            break;
        case 'country':
            setCountry(e.target.value);
            setFormDataCoordinates({...formDataCoordinates, country: e.target.value});
            break;
        case 'cityId':
            setFormDataCoordinates({...formDataCoordinates, cityId: e.target.value});
            break;
        case 'lat':
            setCoordinates({...coordinates, lat: Number(e.target.value)});
            setFormDataCoordinates({...formDataCoordinates, lat: Number(e.target.value)});
            break;
        case 'long':
            setCoordinates({...coordinates, lon: Number(e.target.value)});
            setFormDataCoordinates({...formDataCoordinates, long: Number(e.target.value)});
            break;
        default:
            break;
        }           
    }
    const { currentStepIndex, step, back, next, isFirstStep, isLastStep} = useMultistepForm(
        [
            <GardenForm formData={formData} setFormData={setFormData} handleChange={handleChange} />, 
            <CoordinatesForm formData={formDataCoordinates} setFormData={setFormDataCoordinates} handleChange={handleChange} onCoordinatesChange={onCoordinatesChange} onLabelStreetChange={onLabelStreetChange} />
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<String | null>(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState<String | null>(null);

    // Handle submit of the form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);
        
        // Create the garden
        try {
            const response = await fetch('http://localhost:3001/gardens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(allFormData),
            });

            console.log('Status de la requête:', response.status);
            console.log('Status Text:', response.statusText);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erreur ${response.status}: ${errorData.message || 'Failed to create garden'}`);
            }
            
            const data = await response.json();
            setSuccess(true);
            
            
        } catch (error) {
            setError(error as String);
        } finally {
            setIsSubmitting(false);
        }
        useEffect(() => {
            setMessage(success ? 'Le jardin a été créé avec succès !' : 'ERREUR: Le jardin n\'a pas pu être créé :/ veuillez réessayer !');
            if(success) {
                onClose();
            }
        }, [success, error]);
        
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
        <>
        {/* Error and success messages */}
        {success || error && (
            <div className={`alert ${success ? 'alert-success' : 'alert-error'} mb-4`}>
                <span>{message}</span>
            </div>
        )}
        {/* Close button */}
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="absolute top-2 mx-2 py-1 px-2 rounded-md border btn btn-outline btn-primary z-50" onClick={onClose}>X</button>
        </div>
        {/* Form Add Garden */}
        <div className="max-w-md w-full mx-auto overflow-auto p-4 rounded-t-[10px]">
        <form onSubmit={handleSubmit} className="space-y-4" method="POST">
            <ul className="steps w-full">
                <li className={`step ${currentStepIndex >= 0 ? 'step-primary' : ''}`}>Etape 1</li>
                <li className={`step ${currentStepIndex >= 1 ? 'step-primary' : ''}`}>Etape 2</li>
            </ul>
            <Drawer.Title className="font-medium text-gray-900 mt-8">Nouveau jardin</Drawer.Title>
            <Drawer.Description className="leading-6 mt-2 text-gray-600">
            Remplissez les champs ci-dessous pour créer votre nouveau jardin.
            </Drawer.Description>
            <fieldset className="fieldset border border-base-300 p-4 rounded-box">
                {step}
                <div className="relative flex flex-row gap-2">
                    {!isFirstStep && <button type="button" className="btn btn-outline btn-primary" onClick={handleBack}>Précedent</button>}
                    {isLastStep ? <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>Créer le jardin</button> : <button className="btn btn-primary" onClick={handleNext}>Suivant</button>}
                </div>
            </fieldset>
        </form>
        </div>

        </>
    )
}

function FormGardenDrawer({open, onClose, onCoordinatesChange, onLabelStreetChange, onSubmit, gardenDetails}: propType) {
    // Handle submit of the form
    const onSubmitEvent = (data: any) => {
        onSubmit(data);
    }

    return (
        <Drawer.Root open={open} onOpenChange={onClose} modal={false} direction="right" >
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/20" />            
                    
                <Drawer.Content className="bg-white flex fixed flex-col top-0 bottom-0 right-0 max-h-[100vh] z-10 rounded-t-[10px] lg:max-w-fit w-fit"> 
                    {gardenDetails ? <GardenDetails gardenDetails={gardenDetails} onClose={onClose} /> : <FormAddGarden 
                        open={open}
                        onClose={onClose}
                        onCoordinatesChange={onCoordinatesChange}
                        onLabelStreetChange={onLabelStreetChange}
                        onSubmit={onSubmitEvent}
                        gardenDetails={gardenDetails}
                    />}

                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default FormGardenDrawer;