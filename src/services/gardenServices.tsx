import { Gardens } from "../types";

export const gardenServices = {
    getNetworks: async () => {
        const response = await fetch('http://localhost:3001/networks/all');
        const data = await response.json();
        return data.networks;
    },
    getGardens: async () => {
        const response = await fetch('http://localhost:3001/gardens/all');
        const data = await response.json();
        return data.gardens;
    },
    getGardenCategories: async () => {
        const response = await fetch('http://localhost:3001/garden-categories/all');
        const data = await response.json();
        return data.gardenCategories;
    },
    createGarden: async (garden: Gardens) => {
        const response = await fetch('http://localhost:3001/gardens', {
            method: 'POST',
            body: JSON.stringify(garden),
        });
        const data = await response.json();
        return data.garden;
    }
}
