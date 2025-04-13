import { useEffect, useState } from "react";
interface Networks {
    id: string;
    name: string;
    email: string;
    phone: string;
    mentra: string;
    description: string;
    logo: string;
    foundedAt: string;
    status: string;
    banner: string;
    lucrative: string;
  }

export default function GardenForm() {
    const [response, setResponse] = useState<Networks[]>([]);
    useEffect(() => {
        fetch('http://localhost:3001/networks/all')
        .then((response) => response.json())
        .then((data) => { 
            setResponse(data.networks);
        })
        .catch((error) => console.error('Error:', error));
}, []);
    return (
        <>
            <legend>Informations sur le jardin</legend>
            <label className="floating-label">
                <span>Nom du jardin</span>
                <input type="text" id="name" className="input input-md" placeholder="Nom du jardin"/>
            </label>
            <fieldset>
                <legend>Réseau auquel appartient le jardin</legend>
                <select defaultValue="Choisir un réseau" className="select">
                    <option value="" disabled selected>Choisir un réseau</option>
                    {response.map((network) => (
                        <option value={network.id}>{network.name}</option>
                    ))}
                </select>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Catégorie de jardin</legend>
                <select defaultValue="Choisir une catégorie" className="select">
                    <option value="private">Privé</option>
                    <option value="familyGarden">Jardin familial</option>
                    <option value="sharedGarden">Jardin partagé</option>
                    <option value="insertionGarden">Jardin d'insertion</option>
                    <option value="otherCategory">Autre</option>
                </select>
                <span className="fieldset-label">Obligatoire</span>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Type de jardin</legend>
                <select defaultValue="Choisir un type" className="select">
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
            <label className="floating-label">
                <span>Nombre total de parcelles</span>
                <input type="number" id="parcels" className="input input-md" placeholder="Nombre de parcelles en production"/>
            </label>
            <textarea className="textarea" placeholder="Présentation rapide du jardin"  minLength={10} maxLength={150}></textarea>
            
        </>
    )
}
