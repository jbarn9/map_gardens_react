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
} 

export interface GardenCategories {
  id: string;
  name: string;
}
