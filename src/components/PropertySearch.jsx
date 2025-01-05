import React, { useState, useEffect } from 'react';
import propertiesData from '../assets/properties.json';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import FavouriteList from './FavouriteList';

const PropertySearch = () => {
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
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Initialize properties from JSON
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = properties.filter((property) => {
      const matchesPropertyType = formData.propertyType
        ? property.type.toLowerCase() === formData.propertyType.toLowerCase()
        : true;
      const matchesPrice =
        (formData.priceMin ? property.price >= parseFloat(formData.priceMin) : true) &&
        (formData.priceMax ? property.price <= parseFloat(formData.priceMax) : true);
      const matchesBedrooms =
        (formData.minBedrooms ? property.bedrooms >= parseInt(formData.minBedrooms) : true) &&
        (formData.maxBedrooms ? property.bedrooms <= parseInt(formData.maxBedrooms) : true);
      const matchesDate =
        (formData.startDate ? new Date(`${property.added.year}-${property.added.month}-${property.added.day}`) >= new Date(formData.startDate) : true) &&
        (formData.endDate ? new Date(`${property.added.year}-${property.added.month}-${property.added.day}`) <= new Date(formData.endDate) : true);
      const matchesPostcode =
        formData.postcodeArea ? property.location.toLowerCase().startsWith(formData.postcodeArea.toLowerCase()) : true;
      const matchesSaleOrRent =
        formData.saleOrRent ? property.tenure.toLowerCase() === formData.saleOrRent.toLowerCase() : true;

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

  const handleFavoriteToggle = (propertyId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(propertyId)) {
        return prevFavorites.filter((id) => id !== propertyId);
      } else {
        return [...prevFavorites, propertyId];
      }
    });
  };

  return (
    <div className="property-search container mt-5">
      <SearchForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      <div className="row">
        <div className="col-md-6">
          <PropertyList properties={filteredProperties} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />
        </div>
        <div className="col-md-6">
          <FavouriteList properties={properties} favorites={favorites} />
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;