import { Coordinates } from "./form.types";

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
  addressId: string;
  gardenCategoryId: string;
  gardenCategory: GardenCategories;
  address: {
    id: string;
    street: string;
    lat: number;
    long: number;
    citiesId: string;
    cities: {
      id: string;
      name: string;
      post: string;
      area: string;
      dept: string;
      createdAt: string;
      updatedAt: string;
      countryId: string;
    };
  };
} 

export interface GardenCategories {
  id: string;
  name: string;
}

export interface Address {
    name: string;
    label: string;
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

