import React, { useState, useEffect } from 'react';

const Location = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          getAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log(data)

      if (response.ok && data.display_name) {
        setAddress(data.display_name);
      } else {
        console.error('Unable to fetch address.');
      }
    } catch (error) {
      console.error('Error fetching address:', error.message);
    }
  };

  return (
    <div>
      {location ? (
        <div>
          <p>Your current location is: {location.latitude}, {location.longitude}</p>
          {address && <p>Address: {address}</p>}
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default Location;