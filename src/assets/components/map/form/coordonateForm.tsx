export default function GardenForm() {
    return (
        <>
        <label className="floating-label">
            <span>Adresse du jardin</span>
            <input type="text" id="address" className="input input-md" placeholder="Adresse du jardin"/>
        </label>
        <label className="floating-label">
            <span>Code postal</span>
            <input type="text" id="zipCode" className="input input-md" placeholder="Code postal du jardin"/>
        </label>
        <label className="floating-label">
            <span>Ville</span>
            <input type="text" id="city" className="input input-md" placeholder="Ville du jardin"/>
        </label>
        <label className="floating-label">
            <span>Pays</span>
            <input type="text" id="country" className="input input-md" placeholder="Pays du jardin"/>
        </label>
        <label className="floating-label">
            <span>Latitude</span>
            <input type="number" id="latitude" className="input input-md" placeholder="Latitude du jardin"/>
        </label>
        <label className="floating-label">
            <span>Longitude</span>
            <input type="number" id="longitude" className="input input-md" placeholder="Longitude du jardin"/>
        </label>
        </>
    )
}