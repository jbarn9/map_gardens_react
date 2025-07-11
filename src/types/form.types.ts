export type GardenFormProps = {
    formData: {
        name: string;
        networkId: string;
        gardenCategoryId: string;
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
      street: string;
      postcode: string;
      city: string;
      country: string;
      lat: number;
      long: number;
      cityId?: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFormData: (data: any) => void;
    onCoordinatesChange: (lat: number, long: number) => void;
    onLabelStreetChange: (street: string) => void;
  };

  export type Coordinates = {
    lat: number;
    lon: number;
  };