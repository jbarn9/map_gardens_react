export interface Networks {
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

export interface Gardens {
  id: string;
  name: string;
  description: string;
  status: string;
  type: string;
  email: string;
  phone: string;
  president: string;
  trainer: string;
  founded_At: string;
  createdAt: string;
  updatedAt: string;    
  networks: Networks;
  networksId: string;
  adresseId: string;
  gardenCategoryId: string;
  gardenCategory: GardenCategories;
} 

export interface GardenCategories {
  id: string;
  name: string;
}

export interface Address {
    street: string;
    postcode: string;
    city: string;
    country: string;
    lat: number;
    lon: number;
}

export interface InputautocompleteProps {
  name: string;
  value: string;
  className: string;
  label: string;
  type: string;
  placeholder: string;
  list: string;
  postcode: string;
}

