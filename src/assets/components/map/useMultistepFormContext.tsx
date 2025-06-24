import { createContext, useContext } from "react";
import multistepForm from "./multistepForm";

const MultiStepFormContext = createContext<ReturnType<
  typeof multistepForm
> | null>(null);

export function useMultiStepFormContext() {
    const context = useContext(MultiStepFormContext);

    if (!context) {
      throw new Error(
        'useMultiStepFormContext must be used within a MultiStepForm',
      );
    }
    return context;
}

