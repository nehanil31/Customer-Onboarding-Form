import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationPicker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

export default function MapComponent({ selectedLocation, setSelectedLocation }) {
  return (
    <div style={{ height: '300px', width: '100%' }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker onLocationSelect={setSelectedLocation} />
        {selectedLocation && <Marker position={selectedLocation} />}
      </MapContainer>
    </div>
  );
}
