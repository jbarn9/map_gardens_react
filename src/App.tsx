import { useState } from "react";
import SearchBox from "./assets/components/map/searchbox.tsx";
import Login from "./assets/components/register/register.tsx";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import "./styles/Map.css";
import "./App.css";
import AddButton from "./assets/components/map/buttons.tsx";
import './assets/components/constants.tsx'
import GardenList from "./assets/components/map/gardenList.tsx";
import FormGardenDrawer from "./assets/components/map/form/formGardenDrawer.tsx";

// LocationMarker is a component that displays the user's location on the map
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e: any) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  
  return position === null ? null : (
    <Marker position={position}>
      <Popup>Vous êtes ici</Popup>
    </Marker>
  );
}

function App() {
  // Simulate user state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleGardenForm, setIsVisibleGardenForm] = useState(false);
  
  // Buttons reactions
  const handleAddGarden = () => {
    setIsVisibleGardenForm(true);
  };
  const handleLogin = () => {
    setIsVisible(true);
  };
  const handleAccount = () => {
    console.log("Mon compte");
    setIsLoggedIn(false);
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
          center={[43.6112422, 3.8767337]}
          zoom={13}
          scrollWheelZoom={true}
          >
          {isVisibleGardenForm ? <div className="login-container"> <FormGardenDrawer open={isVisibleGardenForm} onClose={() => setIsVisibleGardenForm(false)} children={<></>} onSubmit={() => {}} setValue={() => {}} /> </div> : null}
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
          <LocationMarker />
        </MapContainer>
    </div>
  );
}

export default App
