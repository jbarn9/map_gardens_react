import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/map.css";
import "./App.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import AddGardenButton from "./components/buttons";

var myIcon = L.icon({
  iconUrl: icon,
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

L.Marker.prototype.options.icon = myIcon;

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
  const handleAddGarden = () => {
    console.log("Ajouter un jardin");
  };
  return (
    <div className="app-container">
        <AddGardenButton
          onClick={handleAddGarden}
          className="add-garden-button btn-primary"
          label="+ Ajouter mon jardin"
        />
        <MapContainer
          center={[43.6112422, 3.8767337]}
          zoom={13}
          scrollWheelZoom={true}
        >
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
