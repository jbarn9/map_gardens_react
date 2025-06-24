import { useEffect, useState } from "react";
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


// Center the map on the user's location
function MapCenterUpdater({center, zoom}: {center: {lat: number, lon: number}, zoom: number}) {
  const map = useMap();
  useEffect(() => {
    zoom = 20;
    map.setView([center.lon, center.lat], zoom, {animate: true, duration: 1});
  }, [center, map, zoom]);
  return (
    <Marker position={[center.lon, center.lat]}>
      <Popup>Vous êtes ici</Popup>
    </Marker>
  );
}

function App() {
  const [mapCoordinates, setMapCoordinates] = useState({lat: 3.8767337, lon: 43.6112422});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleGardenForm, setIsVisibleGardenForm] = useState(false);
  
  // // Change coordinates of the map when the form is changed by the user
  // // useCallback is used to avoid unnecessary re-renders, and the function is only called when the coordinates change
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
        <div className="z-1"><GardenList/></div>
        {/* Map container */}
        <MapContainer
          center={[mapCoordinates.lon, mapCoordinates.lat]}
          zoom={13}
          scrollWheelZoom={true}
          >
          <MapCenterUpdater center={mapCoordinates} zoom={25}/>
          {isVisibleGardenForm ? <div className="login-container"> <FormGardenDrawer open={isVisibleGardenForm} onClose={() => setIsVisibleGardenForm(false)} children={<></>} onSubmit={() => {}} setValue={() => {}} onCoordinatesChange={onCoordinatesChange}/> </div> : null}
          {/* Login component */}
          {isVisible ? <div className="login-container"> <Login /> </div> : null}
          {/* Searchbox component */}
          <SearchBox positionDiv="topleft"/>
          {/* LayersControl component */}
          <LayersControl position="topright">
            <LayersControl.Overlay name="Marker with popup">  
              <LayersControl.BaseLayer checked name="OSM" >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite" >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
                />
              </LayersControl.BaseLayer>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
    </div>
  );
}

export default App;