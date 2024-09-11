import { useEffect, useState } from "react";

const useMyLocation = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Function to handle success when getting the position
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });

      // Store the coordinates in local storage
      localStorage.setItem(
        "userLocation",
        JSON.stringify({ latitude, longitude })
      );

      // Log the coordinates to the console
      console.log("User Location:", { latitude, longitude });
    };

    // Function to handle errors when getting the position
    const handleError = (error) => {
      console.error("Error getting location:", error);
      setError(error.message);
    };

    // Check for permissions explicitly
    const checkPermission = async () => {
      try {
        // Check the permission status for geolocation
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        // If permission is granted, get the location
        if (permissionStatus.state === "granted") {
          navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } 
        // If permission is denied, log or handle accordingly
        else if (permissionStatus.state === "denied") {
          console.log("Location permission denied.");
          setError("Location permission denied.");
        } 
        // If permission is prompt, ask the user for permission
        else if (permissionStatus.state === "prompt") {
          navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        }

        // Listen for changes in permission state
        permissionStatus.onchange = () => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
          }
        };
      } catch (err) {
        console.error("Permission API not supported or error:", err);
        setError("Permission API not supported.");
      }
    };

    checkPermission();
  }, []);

  return { position, error }; // Return the position and any error
};

export default useMyLocation;
