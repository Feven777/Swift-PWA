"use client";

import { useEffect } from "react";

// Extend the Window interface to include Google Maps and initMap
declare global {
  interface Window {
    google?: typeof google;
    initMap?: () => void;
  }
}

export default function LiveMap() {
  useEffect(() => {
    // Initialize the map when the component mounts
    const initMap = async () => {
      // Check if the Google Maps API is available
      if (
        typeof window !== "undefined" &&
        window.google &&
        window.google.maps
      ) {
        const mapElement = document.getElementById("map");
        if (mapElement) {
          // Addis Ababa coordinates
          const addisAbaba = { lat: 9.0222, lng: 38.7468 };

          const map = new window.google.maps.Map(mapElement, {
            center: addisAbaba,
            zoom: 13,
            disableDefaultUI: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          });

          // Delivery route coordinates (simplified for demo)
          const deliveryRoute = [
            { lat: 9.0222, lng: 38.7468 }, // Start point
            { lat: 9.03, lng: 38.76 },
            { lat: 9.035, lng: 38.77 },
            { lat: 9.04, lng: 38.78 }, // Destination
          ];

          // Create delivery person marker
          const deliveryMarker = new window.google.maps.Marker({
            position: deliveryRoute[1],
            map: map,
            icon: {
              url: "/delivery-marker.png",
              scaledSize: new window.google.maps.Size(40, 40),
            },
          });

          // Create destination marker
          const destinationMarker = new window.google.maps.Marker({
            position: deliveryRoute[deliveryRoute.length - 1],
            map: map,
            icon: {
              url: "/destination-marker.png",
              scaledSize: new window.google.maps.Size(40, 40),
            },
          });

          // Draw the route path
          const routePath = new window.google.maps.Polyline({
            path: deliveryRoute,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 3,
          });

          routePath.setMap(map);
        }
      } else {
        // If Google Maps API is not available, load a script to include it
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        // Define the callback function
        window.initMap = () => {
          initMap();
        };
      }
    };

    initMap();

    // Clean up function
    return () => {
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  // Render the map container
  return <div id="map" style={{ width: "100%", height: "400px" }} />;
}
