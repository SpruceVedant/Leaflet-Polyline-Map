import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { decode } from '@googlemaps/polyline-codec';

const Map = ({ route, markers }) => {
  const mapStyle = {
    height: '400px', // Set your desired height
    width: '400px',  // Set your desired width
    overflow: 'hidden', // Prevent scrolling
    position: 'relative', // Needed for the fixed background
    margin: 'auto', // Center horizontally
  };

  return (
    <div style={mapStyle}>
      <MapContainer
        center={[40, -75]}
        zoom={7}
        style={{ height: '100%', width: '100%', maxWidth: '100%', maxHeight: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {route && <Polyline positions={decode(route)} color="blue" />}

        {markers &&
          markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]}>
              <Popup>{marker.label}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;