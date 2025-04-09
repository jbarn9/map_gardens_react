import useMultistepForm from "./useMultistepForm";
import UserForm from "./userForm";
import GardenForm from "./gardenForm";
import IdentifyForm from "./identifyForm";  
import CoordonateForm from "./coordonateForm";
import { Drawer } from 'vaul';

type propType = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const FormGarden: React.FC<propType> = ({open, onClose, children}) => {
const { steps, currentStepIndex, step, back, next, isFirstStep, isLastStep } = useMultistepForm([ <UserForm />, <GardenForm />, <CoordonateForm />, <IdentifyForm /> ]);

return (
    <Drawer.Root open={open} onOpenChange={onClose}>
        <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/20" />
            <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]"> 
                <div className="max-w-md w-full mx-auto overflow-auto p-4 rounded-t-[10px]">
                <Drawer.Handle />               
                <form className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
                    <Drawer.Title className="font-medium text-gray-900 mt-8">Nouveau jardin</Drawer.Title>
                    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="absolute top-2 py-1 px-2 rounded-md border btn btn-outline btn-primary z-50" onClick={onClose}>X</button>
                    </div>
                    <Drawer.Description className="leading-6 mt-2 text-gray-600">
                    Remplissez les champs ci-dessous pour créer votre nouveau jardin.
                    </Drawer.Description>
                    <ul className="steps w-full">
                        <li className={`step ${currentStepIndex >= 0 ? 'step-primary' : ''}`}>Etape 1</li>
                        <li className={`step ${currentStepIndex >= 1 ? 'step-primary' : ''}`}>Etape 2</li>
                        <li className={`step ${currentStepIndex >= 2 ? 'step-primary' : ''}`}>Etape 3</li>
                        <li className={`step ${currentStepIndex >= 3 ? 'step-primary' : ''}`}>Etape 4</li>
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
            </Drawer.Content>
        </Drawer.Portal>
    </Drawer.Root>
    )
}

export default FormGarden;