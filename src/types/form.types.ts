export type propType = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    onSubmit: (data: any) => void;
    setValue: (name: string, value: string | number) => void;
}

export type GardenFormProps = {
    formData: {
        name: string;
        network: string;
        category: string;
        type: string;
        parcels: number;
        description: string;

    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setFormData: (data: any) => void;
};
export type GardenTypes = {
    id: string;
    name: string;
}
export type GardenCategories = {
    id: string;
    name: string;
}
export type Cities = {
    id: string;
    name: string;
}


export type CoordinatesFormProps = {
    formData: {
      label_street: string;
      postcode: string;
      city: string;
      country: string;
      coordinates: string[];
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFormData: (data: any) => void;
  };