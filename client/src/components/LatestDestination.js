import React, { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";
import { fetchLatestDestinations } from "../services/userdestinationService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LatestDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDestinations = async () => {
      try {
        const latest = await fetchLatestDestinations();
        setDestinations(latest);
        toast.success("Latest destinations loaded! 🌍");
      } catch (error) {
        console.error("Error fetching latest destinations:", error);
        toast.error("Failed to load destinations.");
      } finally {
        setLoading(false);
      }
    };

    getDestinations();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-green-700 text-center">
        🌟 Latest Destinations (This Week)
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading destinations...</p>
      ) : destinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <span role="img" aria-label="map" className="text-5xl mb-4 block">
            🗺️
          </span>
          <p className="text-lg">No new destinations added this week. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default LatestDestinations;
