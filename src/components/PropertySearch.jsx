import React, { useState, useEffect } from 'react';
import propertiesData from '../assets/properties.json';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import FavouriteList from './FavouriteList';

const PropertySearch = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    propertyType: '',
    priceMin: '',
    priceMax: '',
    minBedrooms: '',
    maxBedrooms: '',
    startDate: '',
    endDate: '',
    postcodeArea: '',
    saleOrRent: '',
  });

  // State to hold all properties and filtered properties
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // State to manage the user's favorite properties
  const [favorites, setFavorites] = useState([]);

  // Effect hook to initialize properties from the JSON file and saved favorites from localStorage
  useEffect(() => {
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Effect hook to save favorites to localStorage whenever the favorites state changes
  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Handle input changes in the search form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to filter properties based on search criteria
  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = properties.filter((property) => {
            // Filter conditions based on form data
      const matchesPropertyType =
        formData.propertyType && formData.propertyType.toLowerCase() !== "any"
          ? property.type.toLowerCase() === formData.propertyType.toLowerCase()
          : true;
    
      const matchesPrice =
        (formData.priceMin ? property.price >= parseFloat(formData.priceMin) : true) &&
        (formData.priceMax ? property.price <= parseFloat(formData.priceMax) : true);
    
      const matchesBedrooms =
        (formData.minBedrooms ? property.bedrooms >= parseInt(formData.minBedrooms) : true) &&
        (formData.maxBedrooms ? property.bedrooms <= parseInt(formData.maxBedrooms) : true);
    
      const matchesDate =
        formData.startDate || formData.endDate
          ? (formData.startDate
              ? new Date(`${property.added.year}-${property.added.month}-${property.added.day}`) >=
                new Date(formData.startDate)
              : true) &&
            (formData.endDate
              ? new Date(`${property.added.year}-${property.added.month}-${property.added.day}`) <=
                new Date(formData.endDate)
              : true)
          : true;
    
      const matchesPostcode =
        formData.postcodeArea
          ? property.location.toLowerCase().startsWith(formData.postcodeArea.toLowerCase())
          : true;
    
      const matchesSaleOrRent =
        formData.saleOrRent
          ? property.tenure.toLowerCase() === formData.saleOrRent.toLowerCase()
          : true;
    
      return (
        matchesPropertyType &&
        matchesPrice &&
        matchesBedrooms &&
        matchesDate &&
        matchesPostcode &&
        matchesSaleOrRent
      );
    });

    setFilteredProperties(filtered);
  };

  // Toggle a property as a favorite
  const handleFavoriteToggle = (propertyId) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;

      // If the property is already in favorites, remove it; otherwise, add it
      if (prevFavorites.includes(propertyId)) {
        updatedFavorites = prevFavorites.filter((id) => id !== propertyId);
      } else {
        updatedFavorites = [...prevFavorites, propertyId];
      }

      // Save the updated favorites to localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  // Handle drag start event by storing the dragged property's ID
  const onDragStart = (e, propertyId) => {
    e.dataTransfer.setData("propertyId", propertyId);
  };

  // Handle drop event: add or remove property from favorites based on the target (isFavoriteList)
  const onDrop = (e, isFavoriteList) => {
    const propertyId = e.dataTransfer.getData("propertyId");
    const propertyExistsInFavorites = favorites.includes(propertyId);

    if (isFavoriteList) {
      // If dropping into the favorite list and the property isn't already a favorite, add it
      if (!propertyExistsInFavorites) {
        setFavorites((prevFavorites) => [...prevFavorites, propertyId]);
      } else {
        alert("This property is already in your favorites list.");
      }
    } else {
      // If dropping outside the favorite list and the property is a favorite, remove it
      if (propertyExistsInFavorites) {
        setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== propertyId));
      }
    }

    e.preventDefault();
  };

  // Handle drag over event to allow dropping
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // Clear all favorite properties
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.setItem('favorites', JSON.stringify([]));
  };

  return (
    <div className="property-search container mt-5">
      {/* Search form component */}
      <SearchForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />

      <div className="row">
        <div className="col-md-6">
          {/* Property list component */}
          <PropertyList
            properties={filteredProperties}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            onDragStart={onDragStart}
            onDrop={(e) => onDrop(e, false)}
            onDragOver={onDragOver}
          />
        </div>
        <div className="col-md-6">
          {/* Favorite list component */}
          <FavouriteList
            properties={properties}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            onDragStart={onDragStart}
            onDrop={(e) => onDrop(e, true)}
            onDragOver={onDragOver}
            clearFavorites={clearFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
