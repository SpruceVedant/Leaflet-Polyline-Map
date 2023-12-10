import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { decode } from '@googlemaps/polyline-codec';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';


// Fix leaflet's icon loading issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ apiKey, routePath }) => {
  const [polyline, setPolyline] = useState([]);
  const [tollMarkers, setTollMarkers] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        // Assume routePath is an encoded polyline supplied from the TollGuru API response
        const decodedPath = decode(routePath).map(coords => ({ lat: coords[0], lng: coords[1] }));
        setPolyline(decodedPath);
        
        // Placeholder for TollGuru API call to fetch toll data
        // Replace '/tolls' with actual API endpoint and use proper request body
        const tollResponse = await axios.get('/tolls', {
          headers: { 'x-api-key': apiKey },
          // params: { polyline: routePath }, // You would send the necessary parameters based on API requirements
        });

        // Process the response to extract toll markers
        // This is a placeholder - modify according to the actual API response structure
        const markers = tollResponse.data.tolls.map(toll => ({
          position: L.latLng(toll.location.latitude, toll.location.longitude),
          info: `Toll Cost: ${toll.cost} ${toll.currency}`
        }));
        
        setTollMarkers(markers);
      } catch (error) {
        console.error('Failed to fetch route data:', error);
      }
    };

    fetchRoute();
  }, [apiKey, routePath]); // dependencies
  
  const mapCenter = polyline[0] || { lat: 0, lng: 0 }; // Default to first point or an arbitrary value

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {polyline.length > 0 && (
        <Polyline positions={polyline} color="blue" />
      )}
      {tollMarkers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.info}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
