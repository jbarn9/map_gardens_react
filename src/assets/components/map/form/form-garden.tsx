import useMultistepForm from "./useMultistepForm";
import UserForm from "./userForm";
import GardenForm from "./gardenForm";
import IdentifyForm from "./identifyForm";  
import CoordonateForm from "./coordonateForm";
function FormGarden() {
    const { steps, currentStepIndex, step, back, next, isFirstStep, isLastStep } = useMultistepForm([ <UserForm />, <GardenForm />, <CoordonateForm />, <IdentifyForm /> ]);

    return (
        <div style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '8px', padding: '2rem', margin: '1rem', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>
            <form className="sm:w-full ">
                <ul className="steps">
                    <li className={`step ${currentStepIndex >= 0 ? 'step-primary' : ''}`}>Informations générales</li>
                    <li className={`step ${currentStepIndex >= 1 ? 'step-primary' : ''}`}>Jardin</li>
                    <li className={`step ${currentStepIndex >= 2 ? 'step-primary' : ''}`}>Coordonnées</li>
                    <li className={`step ${currentStepIndex >= 3 ? 'step-primary' : ''}`}>Identifiants</li>
                </ul>
                <fieldset className="fieldset border border-base-300 p-4 rounded-box">
                    {step}
                    <div className="relative flex flex-row gap-2">
                        {!isFirstStep && <button type="button" className="btn btn-outline btn-primary" onClick={back}>Précedent</button>}
                        <button type="button" className="btn btn-primary" onClick={next}>{isLastStep ? 'Terminer' : 'Suivant'}</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default FormGarden;