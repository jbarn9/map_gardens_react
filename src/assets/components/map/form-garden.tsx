import useMultistepForm from "./useMultistepForm";

function FormGarden() {
    const { steps, step, back, next, isFirstStep, isLastStep } = useMultistepForm([ <p>Informations générales</p>, <p>Jardin</p>, <p>Identifiants</p> ]);
    return (
        <div style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid black', borderRadius: '8px', padding: '2rem', margin: '1rem', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>
            <form>
                <ul className="steps" style={{ position: 'relative', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {steps.map((eltStep) => (
                        <li className={`step ${step == eltStep ? 'step-primary' : ''}`}>{eltStep}</li>
                    ))}
                </ul> 
                <div className="step-content" style={{position: 'relative', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="step-content-item"></div>
                    {!isFirstStep && <button type="button" className="btn btn-primary" onClick={back}>Précedent</button>}
                    <button type="button" className="btn btn-primary" onClick={next}>{isLastStep ? 'Terminer' : 'Suivant'}</button>
                </div>
            </form>
        </div>
    )
}

export default FormGarden;