import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { decode } from '@googlemaps/polyline-codec';
import axios from 'axios';

const getTolls = async (params) => {
  try {
    const response = await axios.post(
      "https://apis.tollguru.com/toll/v2/origin-destination-waypoints",
      params,
      {
        headers: {
          "x-api-key": "JfQfQjG8bhjNpMMn6FJ6RFPh4BgJn8nF",
        },
      }
    );
    return {
      status: 200,
      result: response.data["routes"][0]["tolls"],
    };
  } catch (error) {
    return {
      status: 400,
      error,
    };
  }
};

const MapWithRoute = () => {
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await getTolls({
          from: { lat: 23.184040644854228, lng: 79.90924302714676 },
          to: { lat: 21.217508435562973, lng: 79.08268427095838 },
          vehicleType: "2AxlesTruck",
        });
        setRouteData(response.result);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, []);

  const mapStyle = {
    height: 'auto',
    width: 'auto',
    overflow: 'hidden',
    position: 'relative',
    margin: 'auto',
  };

  // Sample markers data
  const markers = [
    { lat: 23.184040644854228, lng: 79.90924302714676, label: 'From Marker' },
    { lat: 21.217508435562973, lng: 79.08268427095838, label: 'To Marker' },
  ];

  return (
    <div style={mapStyle}>
      <MapContainer
        center={[40, -75]}
        zoom={7}
        style={{ height: '100%', width: '100%', maxWidth: '100%', maxHeight: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {routeData && <Polyline positions={decode(routeData)} color="blue" />}

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

export default MapWithRoute;
