import { Address, Gardens } from "../types/form.interfaces";

export const gardenServices = {
    getNetworks: async () => {
        try {
            const response = await fetch('http://localhost:3001/networks/all');
            const data = await response.json();
            return data.networks;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    getGardens: async () => {
        try {
            const response = await fetch('http://localhost:3001/gardens/all');
            const data = await response.json();
            return data.gardens;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    getGardenTypes: async () => {
        try {
            const response = await fetch('http://localhost:3001/garden-types/all');
            const data = await response.json();
            return data.types;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    getGardenCategories: async () => {
        try {
            const response = await fetch('http://localhost:3001/garden-categories/all');
            const data = await response.json();
            return data.gardenCategories;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    getCities: async () => {
        try {
            const response = await fetch('http://localhost:3001/cities/all');
            const data = await response.json();
            return data.cities;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    // Create a new garden
    createGarden: async (garden: Gardens) => {
        try {
            const response = await fetch('http://localhost:3001/gardens', {
                method: 'POST',
                body: JSON.stringify(garden),
            });
            const data = await response.json();
            return data.garden;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    searchAddress: async (query: string, postcode: string) => {
        try {
            const response = await fetch(`http://localhost:3001/address/search?q=${encodeURIComponent(query)}&postcode=${postcode}&limit=5`);
            const data = await response.json();     
            console.log('Données reçues:', data); // Debug

            if (data && data.length > 0) {
                // Prendre la première adresse
                const newCoordinates = data.map((address: Address) => ({
                    street: address.street,
                    postcode: address.postcode,
                    city: address.city,
                    country: address.country,
                    lat: address.lat,
                    lon: address.lon
                }));
                return newCoordinates;
            }
            return null;
        } catch (error) {
            console.error('Error:', error);
        }
    },

    searchPostalCode : async (postcode: string) => {
        try {
            const response = await fetch(`http://localhost:3001/address/searchByPostcode?q=${encodeURIComponent(postcode)}&limit=2`);
            const data = await response.json();
            console.log('Données reçues:', data); // Debug
            if(data && data.length > 0){
                const newCoordinates = data.map((address:Address) =>({
                    postcode : address.postcode,
                    city : address.city,
                    country: address.country,
                    lat: address.lat,
                    lon: address.lon
                }));
                return newCoordinates;
            }
            return null;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
