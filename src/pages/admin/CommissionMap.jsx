import React, { useRef, useEffect, useState } from "react";
import Map from "../../components/Map/Map";
import maplibregl from "maplibre-gl";
import axios from "axios";
//import NavBar from "../../components/Navbar/Navbar.js";

function CommissionMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(123.8854);
  const [lat] = useState(10.3157);
  const [zoom] = useState(10);
  const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");
  const [errands, setErrands] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/errands/`);
        setErrands(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommissions();
    //refresh map for 5 sec
    const interval = setInterval(fetchCommissions, 5000);
    return () => clearInterval(interval);
  }, [apiBaseUrl]);
  //filter
  const [filter, setFilter] = useState([]); // State to store filtered errands
  const handleChange = (e) => {
    setFilter(e);
  };

  // Search commmissions using JS filter method //
  const filterErrand = errands.filter((errand) => {
    const type = errand.commissionType.includes(filter);
    // const titleMatches = commission.commissionTitle
    //   .toLowerCase()
    //   .includes(term.toLowerCase());
    // const locationMatches = commission.commissionLocation
    //   .toLowerCase()
    //   .includes(filter.location.toLowerCase());
    //if price range has been entered

    return /**titleMatches && locationMatches && priceMatches &&*/ type;
  });

  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.addControl(new maplibregl.NavigationControl(), "top-right");
      map.current.addControl(new maplibregl.GeolocateControl(), "top-right"); // button to get location
    }

    let markers = []; // Array to store markers

    // Clear existing markers
    map.current?.markers?.forEach((marker) => marker.remove());

    // Add markers for filtered errands
    filterErrand.forEach((errand) => {
      // Create a new popup for hover
      const hoverPopup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 15, // Optional: Position offset
      }).setHTML(`<h3>${errand.commissionTitle}</h3>
              <p>${errand.commissionDesc}</p>
              <a href="/errand/view/${errand.commissionID}">View</a>`); // Simple hover content
      //pop up
      const marker = new maplibregl.Marker({ color: "#FF0000" }) // Red marker for commissions
        .setLngLat([errand.commissionLong, errand.commissionLat])
        .setPopup(
          new maplibregl.Popup().setHTML(
            `<h3>${errand.commissionTitle}</h3><p>${errand.commissionDesc}</p><a href="/errand/view/${errand.commissionID}">View</a>`
          )
        )
        .addTo(map.current);
      // Add hover event for the marker
      marker.getElement().addEventListener("mouseenter", () => {
        hoverPopup
          .setLngLat([errand.commissionLong, errand.commissionLat])
          .addTo(map.current);
      });

      marker.getElement().addEventListener("mouseleave", () => {
        hoverPopup.remove(); // Remove popup on mouse leave
      });

      markers.push(marker); // Add marker to markers array
    });

    // Store markers in the map object for future reference
    map.current.markers = markers;
  }, [API_KEY, filterErrand, lat, lng, zoom]);

  return (
    <>
      <Map mapContainer={mapContainer} change={handleChange} />
    </>
  );
}

export default CommissionMap;
