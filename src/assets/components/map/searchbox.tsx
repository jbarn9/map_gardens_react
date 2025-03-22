import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

interface SearchBoxProps {
  positionDiv: string;
}

export default function SearchBox({ positionDiv }: SearchBoxProps) {
  const map = useMap();
  
  useEffect(() => {
    try {
      // Vérifier si la bibliothèque est correctement chargée
      if (!L.Control.Geocoder) {
        console.error("L.Control.Geocoder n'est pas défini");
        return;
      }
      
      // Créer le contrôle geocoder
      const geocoder = new L.Control.Geocoder({
        position: positionDiv as L.ControlPosition,
        defaultMarkGeocode: true,
        placeholder: 'Rechercher une adresse...'
      });
      
      // Ajouter à la carte
      geocoder.addTo(map);
      
      return () => {
        map.removeControl(geocoder);
      };
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du geocoder:', error);
    }
  }, [map, positionDiv]);
  
  return null;
}
