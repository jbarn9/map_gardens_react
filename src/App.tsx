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
  ZoomControl,
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

// Center the map on the user's location
function MapCenterUpdater({center, zoom}: {center: {lat: number, lon: number}, zoom: number}) {
  const map = useMap();
  useEffect(() => {
    zoom = 20;
    map.setView([center.lon, center.lat], zoom, {animate: true, duration: 1});
  }, [center, map, zoom]);
  return (
    <Marker position={[center.lon, center.lat]}>
      <Popup>Position du jardin</Popup>
    </Marker>
  );
}

// Composant séparé pour les marqueurs des jardins
function GardenMarkers() {
  const [response, setResponse] = useState<Gardens[]>([]);

  useEffect(() => {
    gardenServices.getGardens().then((gardens) => {
      setResponse(gardens);
    });
  }, []);

  const gardensWithCoordinates = response.filter((garden: Gardens): boolean => Boolean(garden.address.lat && garden.address.long));
  
  return (
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={60}
      spiderfyOnMaxZoom={true}
      showCoverageOnHover={true}
      zoomToBoundsOnClick={true}
    >
      {gardensWithCoordinates.map((garden) => {
        return (
          <Marker key={garden.id} position={[garden.address.lat, garden.address.long]}>
            <Popup>
              <div>
                <h3>{garden.name}</h3>
                <p>{garden.description}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
}

function App() {
  const [mapCoordinates, setMapCoordinates] = useState({lat: 3.8767337, lon: 43.6112422});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleGardenForm, setIsVisibleGardenForm] = useState(false);
  const [zoom, setZoom] = useState(10);

  // // Change coordinates of the map when the form is changed by the user
  const onCoordinatesChange = (coordinates: {lat: number, lon: number}) => {
    setMapCoordinates(coordinates);
  }
  // Buttons reactions
  const handleAddGarden = () => {
    setIsVisibleGardenForm(true);
  };
  const handleAccount = () => {
    setIsLoggedIn(false);
  };
  const handleLogin = () => {
    setIsVisible(true);
  };
  // Handle see information of a garden
  const handleSeeGarden = (lat: number, long: number) => {
    setMapCoordinates({lat: lat, lon: long});
    setZoom(15);
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
        />
        ):(
          <>
          <AddButton
            onClick={handleAccount}
            className="btn btn-warning logout-button"
            label="Se déconnecter"
          />
          <AddButton
            onClick={handleAddGarden}
            className="btn btn-secondary add-garden-button"
            label="+ Ajouter son jardin"
          />
          </>
        )}
      </div>
      {/* Garden list */}
      <div className="z-1"><GardenList handleSeeGarden={handleSeeGarden}  /></div>
      {/* Map container */}
      <MapContainer
        className="markercluster-map"
        center={[mapCoordinates.lon, mapCoordinates.lat]}
        zoom={zoom}
        scrollWheelZoom={true}

      >
        <MapCenterUpdater center={mapCoordinates} zoom={25}/>
        <Marker position={[mapCoordinates.lon, mapCoordinates.lat]}>
          <Popup>
            <div>
              <h3>Vous êtes ici</h3>
            </div>
          </Popup>
        </Marker>
        {isVisibleGardenForm ? <div className="login-container"> <FormGardenDrawer open={isVisibleGardenForm} onClose={() => setIsVisibleGardenForm(false)} children={<></>} onSubmit={() => {}} setValue={() => {}} onCoordinatesChange={onCoordinatesChange}/> </div> : null}
        {/* Login component */}
        {isVisible ? <div className="login-container"> <Login /> </div> : null}
        {/* Searchbox component */}
        <SearchBox positionDiv="topleft"/>
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
        <GardenMarkers />
      </MapContainer>
    </div>
  );
}

export default App;