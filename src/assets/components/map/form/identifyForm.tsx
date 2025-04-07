export default function identifyForm() {
    return (
        <>
            
            <label className="floating-label">
                <span>Pseudo</span>
                <input type="text" className="input input-md" id="pseudo" placeholder="Pseudo" />
            </label>
            <label className="floating-label">
                <span>Email</span>
                <input type="email" className="input input-md" id="email" placeholder="Email" />
            </label>
            <input type="password" className="input validator" required placeholder="Password" min="8" 
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            title="Le mot de passe doit contenir au moins 8 caractères, dont un chiffre, une lettre minuscule et une lettre majuscule" />
            <p className="validator-hint">
            Le mot de passe doit contenir au moins 8 caractères, dont un chiffre, une lettre minuscule et une lettre majuscule
            </p>
            <label className="floating-label">
                <span>Confirmer le mot de passe</span>
                <input type="password" className="input input-md" id="confirmPassword" placeholder="Confirmer le mot de passe" />
            </label>
            
        </>
    )
}
