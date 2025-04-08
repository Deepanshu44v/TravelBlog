import React, { useEffect, useState } from 'react';
import { getAllDestinations } from '../services/userdestinationService';
import DestinationCard from '../components/DestinationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const [categoryOption, setCategoryOption] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getAllDestinations();
        if (!data || data.length === 0) {
          toast.info("ℹ️ No destinations found.");
        }

        setDestinations(data);
        const uniqueCategories = ["all", ...new Set(data.map(d => d.category || "Uncategorized"))];
        setCategories(uniqueCategories);
        applyFilters(data, sortOption, categoryOption);
      } catch (error) {
        toast.error("❌ Failed to fetch destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const applyFilters = (data, sortOpt, categoryOpt) => {
    let result = [...data];

    if (categoryOpt !== "all") {
      result = result.filter(d => d.category === categoryOpt);
    }

    switch (sortOpt) {
      case "latest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "popular":
        result.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
        break;
      default:
        break;
    }

    setFilteredDestinations(result);
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    applyFilters(destinations, option, categoryOption);
  };

  const handleCategoryChange = (e) => {
    const option = e.target.value;
    setCategoryOption(option);
    applyFilters(destinations, sortOption, option);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mt-16 mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-3xl font-bold text-blue-900">🌍 All Destinations</h2>

        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <select
            value={categoryOption}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-400"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-400"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-20">Loading destinations...</div>
      ) : filteredDestinations.length === 0 ? (
        <div className="text-center text-gray-600 py-20">No destinations match your filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(dest => (
            <DestinationCard key={dest._id} destination={dest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinations;
