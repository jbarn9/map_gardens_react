export default function GardenForm() {
    return (
        <>
            <legend>Informations sur le jardin</legend>
            <label className="floating-label">
                <span>Nom du jardin</span>
                <input type="text" id="name" className="input input-md" placeholder="Nom du jardin"/>
            </label>
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
            <textarea className="textarea w-100" placeholder="Présentation rapide du jardin"  minLength={10} maxLength={150}></textarea>
            
        </>
    )
}
