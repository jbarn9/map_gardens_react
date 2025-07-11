import { useEffect, useState } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import SearchBox from "./assets/components/map/searchbox.tsx";
import Login from "./assets/components/register/register.tsx";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import "./styles/Map.css";
import "./App.css";
import AddButton from "./assets/components/map/buttons.tsx";
import './assets/components/constants.tsx'
import GardenList from "./assets/components/map/gardenList.tsx";
import FormGardenDrawer from "./assets/components/map/form/formGardenDrawer.tsx";
import { gardenServices } from "./services/gardenServices.tsx";
import { Gardens } from "./types/form.interfaces.ts";
import 'leaflet/dist/leaflet.css'
import { Icon, LatLngBounds } from 'leaflet';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing, faPlus, faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";


// Icons
const localIcon = new Icon({
  iconUrl: './src/styles/icons/user_here.png',
  iconSize: [48, 50], // size of the icon
  iconAnchor: [24, 25], // point of the icon which will correspond to marker's location (center)
  popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
})

const gardenIcon = new Icon({
  iconUrl: './src/styles/icons/garden_location.png',
  iconSize: [48, 50], // size of the icon
  iconAnchor: [24, 25], // point of the icon which will correspond to marker's location (center)
  popupAnchor: [0, -25] // point from which the popup should open relative to the iconAnchor
})

const selectedIcon = new Icon({
  iconUrl: './src/styles/icons/garden_selected.png',
  iconSize: [68, 70], // size of the icon
  iconAnchor: [34, 35], // point of the icon which will correspond to marker's location (center)
  popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
  className: 'selected-icon'
})

const outerBounds = new LatLngBounds([
  [-90.0, -180.0], // Sud-Ouest (pôle Sud, méridien 180°)
  [90.0, 180.0]    // Nord-Est (pôle Nord, méridien 180°)
]);


// Center the map on the user's location
function MapCenterUpdater({ center, zoom, message, icon, userPosition }: { center: { lat: number, lon: number, }, zoom: number, message: string, icon: Icon, userPosition: boolean }) {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [bbox, setBbox] = useState([]);

  // Center the map on the garden selected
  useEffect(() => {
    setPosition([center.lon, center.lat]);
    map.flyTo([center.lon, center.lat], zoom, { animate: true, duration: 1 });
  }, [center, map, zoom]);

  // User position detection
  useEffect(() => {
    map.locate().on("locationfound", function (e: any) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), { animate: true, duration: 1 });
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map, userPosition]);

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        <div>
          <h3>{message}</h3>
          <b>Longitude</b>: {bbox[0]} <br />
          <b>Latitude</b>: {bbox[1]} <br />
        </div>
      </Popup>
    </Marker>
  );


}

// Markers for gardens  
function GardenMarkers({ index, icon }: { index: string, icon: Icon }) {
  const [response, setResponse] = useState<Gardens[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    gardenServices.getGardens().then((result) => {
      if (result.success) {
        setResponse(result.data);
      } else {
        setError(result.error || 'Erreur inconnue');
      }
      setLoading(false);
    }).catch((error) => {
      console.error('Unexpected error:', error);
      const errorMessage = error instanceof Error ? error.message : 
                          typeof error === 'string' ? error : 
                          'Erreur inattendue';
      setError(errorMessage);
      setLoading(false);
    });
  }, []);

  const gardensWithCoordinates = response.filter((garden: Gardens): boolean => Boolean(garden.address.lat && garden.address.long));

  // Affichage des erreurs
  if (error) {
    return (
      <div className="error-container fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong className="font-bold">Erreur de chargement :</strong>
        <span className="block sm:inline"> {error}</span>
        <button 
          onClick={() => window.location.reload()} 
          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Affichage du loading
  if (loading) {
    return (
      <div className="loading-container fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
        <strong className="font-bold">Chargement des jardins...</strong>
      </div>
    );
  }

  return (
    <MarkerClusterGroup
      chunkedLoading
      showCoverageOnHover={false}
    >
      {gardensWithCoordinates.map((garden) => {

        return (
          <Marker key={garden.id} position={[garden.address.long, garden.address.lat]} icon={index === garden.id ? selectedIcon : icon}>
            <Popup>
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">{garden.name}</h3>
                <p>
                  <span className="font-bold">Description </span>: {garden.description}<br />
                  <span className="font-bold">Téléphone </span>: {garden.phone}<br />
                  <span className="font-bold">E-mail </span>: {garden.email}<br />
                  <span className="font-bold">Réseau d'appartenance </span>: {garden.networks.name}<br />
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
}



function App() {
  // States
  const [mapCoordinates, setMapCoordinates] = useState({ lon: 43.6112422, lat: 3.8767337 });
  const [labelStreet, setLabelStreet] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleGardenForm, setIsVisibleGardenForm] = useState(false);
  const [zoom, setZoom] = useState(6);
  const [isGardenSelected, setIsGardenSelected] = useState(false);
  const [message, setMessage] = useState('Vous êtes ici');
  const [icon, setIcon] = useState(localIcon);
  const [index, setIndex] = useState('');
  const [userPosition, setUserPosition] = useState<boolean>(false);
  const [gardenDetails, setGardenDetails] = useState<string | null>(null);
  // Buttons actions
  const handleAddGarden = () => {
    setGardenDetails(null);
    setIsVisibleGardenForm(true);
  };
  const handleAccount = () => {
    setIsLoggedIn(false);
  };
  const handleLogin = () => {
    setIsVisible(true);
  };
  // Change coordinates of the map when the form is changed by the user
  const onCoordinatesChange = (lon: number, lat: number) => {
    setMapCoordinates({ lon: lon, lat: lat });
    setZoom(15);
  }
  
  // Handle label street change
  const onLabelStreetChange = (label_street: string) => {
    setLabelStreet(label_street);
  }
  // Handle see information of a garden
  const handleSeeGarden = (lon: number, lat: number, id: string) => {
    setMapCoordinates({ lon: lon, lat: lat });
    setIsGardenSelected(true);
    // Set a new zoom on the garden marker selected
    setZoom(15);
    handleSeeGardenDetails(id);
  }

  const handleGardenIndex = (id: string) => {
    setIndex(id);
  }

  const handleUserPosition = () => {
    if (userPosition) {
      setUserPosition(false);
    } else {
      setUserPosition(true);
    }
    setIcon(localIcon);
  }

  // Handle marker change
  useEffect(() => {
    if (isGardenSelected) {
      setMessage('Le jardin est ici');
      setIcon(selectedIcon);
    } else {
      setMessage('Vous êtes ici');
      setIcon(localIcon);
    }
  }, [isGardenSelected]);



  const handleSeeGardenDetails = (id: string) => {
    setGardenDetails(id);
  }

  return (
    <div className="app-container">
      <div className="buttons-container fixed top-4 right-4 z-50 flex gap-2">
        {/* Test if user is logged in */}
        {!isLoggedIn ? (

          <AddButton
            onClick={handleLogin}
            className="btn btn-primary login-button"
            label="Se connecter"
            icon={<FontAwesomeIcon icon={faSignIn} color='white' />}
          />
        ) : (
          <>
            <AddButton
              onClick={() => {
                handleUserPosition();
                setMessage('Vous êtes ici');
              }}
              className="btn btn-light reset-position-button left-10"
              label=""
              icon={<FontAwesomeIcon icon={faLifeRing} color='black' />}
            />
            <AddButton
              onClick={() => {
                handleAddGarden();  
              }}
              className="btn btn-secondary add-garden-button"
              label="Ajouter son jardin"
              icon={<FontAwesomeIcon icon={faPlus} color='white' />}
            />
            <AddButton
              onClick={handleAccount}
              className="btn btn-warning logout-button"
              label="Se déconnecter"
              icon={<FontAwesomeIcon icon={faSignOut} color='black' />}
            />

          </>
        )}
      </div>
      {/* Garden list */}
      <div className="z-1"><GardenList handleSeeGarden={handleSeeGarden} handleGardenIndex={handleGardenIndex} handleSeeGardenDetails={handleSeeGardenDetails} gardenDetails={gardenDetails} /></div>
      {/* Map container */}
      <MapContainer
        className="markercluster-map"
        center={[mapCoordinates.lon, mapCoordinates.lat]}
        zoom={zoom}
        maxZoom={20}
        scrollWheelZoom={true}
        maxBounds={outerBounds}
      >
        {/* Marker updater */}
        <MapCenterUpdater center={mapCoordinates} zoom={zoom} message={message} icon={icon} userPosition={userPosition} />
        {/* Form drawer */}
        {isVisibleGardenForm ? <div className="login-container"> <FormGardenDrawer open={isVisibleGardenForm} onClose={() => setIsVisibleGardenForm(false)} onSubmit={() => {}} onCoordinatesChange={onCoordinatesChange} onLabelStreetChange={onLabelStreetChange} gardenDetails={gardenDetails} /> </div> : null}
        {/* Login component */}
        {isVisible ? <div className="login-container"> <Login /> </div> : null}
        {/* Searchbox component */}
        <SearchBox positionDiv="topleft" />
        {/* LayersControl component */}
        <LayersControl position="topright">
          {/* OSM layer */}
          <LayersControl.BaseLayer checked name="OSM">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>

          {/* Satellite layer */}
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Marker cluster for gardens */}
        <GardenMarkers index={index} icon={gardenIcon} />
      </MapContainer>
    </div>
  );
}

export default App;