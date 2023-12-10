import React, { useState, useEffect } from 'react';
import MapComponent from './component/MapComponent';
import axios from 'axios';

const App = () => {
  const apiKey = 'JfQfQjG8bhjNpMMn6FJ6RFPh4BgJn8nF'; // Replace with your TollGuru API key
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        // Replace '/route' with the actual API endpoint for fetching route data
        const response = await axios.get('https://apis.tollguru.com/toll/v2/origin-destination-waypoints', {
          headers: { 'x-api-key': apiKey },
          // Add any necessary parameters for your API request
        });

        setRouteData(response.data);
      } catch (error) {
        console.error('Failed to fetch route data:', error);
      }
    };

    fetchRouteData();
  }, [apiKey]);

  return (
    <div className="App">
      {routeData && (
        <MapComponent apiKey={apiKey} routePath={routeData.polyline} />
      )}
    </div>
  );
};

export default App;
