import React, { useState, useEffect } from 'react';
import propertiesData from '../assets/properties.json';

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
                (formData.startDate
                    ? new Date(property.dateAdded) >= new Date(formData.startDate)
                    : true) &&
                (formData.endDate ? new Date(property.dateAdded) <= new Date(formData.endDate) : true);
            const matchesPostcode =
                formData.postcodeArea
                    ? property.location.toLowerCase().startsWith(formData.postcodeArea.toLowerCase())
                    : true;
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

    return (
        <div className="property-search">
            {/* Header Section */}
            <div
                className="search-container"
                style={{
                    backgroundImage: 'url(/images/img1.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '80px 0',
                }}
            >
                <h1 className="text-center text-light">
                    Discover your perfect property with the largest selection available
                </h1>
                <div className="container">
                    <h1 className="text-center mb-4 text-dark">Estate Finder</h1>
                    {/* Search Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-4 rounded shadow-sm"
                        style={{ maxWidth: '800px', margin: '0 auto' }}
                    >
                        {/* Form Fields */}
                        {/* Property Type */}
                        <div className="mb-3">
                            <label htmlFor="propertyType" className="form-label">
                                Property Type
                            </label>
                            <select
                                id="propertyType"
                                name="propertyType"
                                className="form-select"
                                value={formData.propertyType}
                                onChange={handleInputChange}
                            >
                                <option value="">Any</option>
                                <option value="House">House</option>
                                <option value="Flat">Flat</option>
                            </select>
                        </div>
                        {/* Price Range */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="priceMin" className="form-label">
                                    Min Price
                                </label>
                                <input
                                    type="number"
                                    id="priceMin"
                                    name="priceMin"
                                    className="form-control"
                                    value={formData.priceMin}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="priceMax" className="form-label">
                                    Max Price
                                </label>
                                <input
                                    type="number"
                                    id="priceMax"
                                    name="priceMax"
                                    className="form-control"
                                    value={formData.priceMax}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {/* Bedrooms */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="minBedrooms" className="form-label">
                                    Min Bedrooms
                                </label>
                                <input
                                    type="number"
                                    id="minBedrooms"
                                    name="minBedrooms"
                                    className="form-control"
                                    value={formData.minBedrooms}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="maxBedrooms" className="form-label">
                                    Max Bedrooms
                                </label>
                                <input
                                    type="number"
                                    id="maxBedrooms"
                                    name="maxBedrooms"
                                    className="form-control"
                                    value={formData.maxBedrooms}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {/* Date Range */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="startDate" className="form-label">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    className="form-control"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="endDate" className="form-label">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    className="form-control"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {/* Postcode */}
                        <div className="mb-3">
                            <label htmlFor="postcodeArea" className="form-label">
                                Postcode Area
                            </label>
                            <input
                                type="text"
                                id="postcodeArea"
                                name="postcodeArea"
                                className="form-control"
                                value={formData.postcodeArea}
                                onChange={handleInputChange}
                                placeholder="e.g., BR1, NW1"
                            />
                        </div>
                        {/* Sale or Rent */}
                        <div className="mb-3">
                            <label htmlFor="saleOrRent" className="form-label">
                                Sale or Rent
                            </label>
                            <select
                                id="saleOrRent"
                                name="saleOrRent"
                                className="form-select"
                                value={formData.saleOrRent}
                                onChange={handleInputChange}
                            >
                                <option value="">Any</option>
                                <option value="Freehold">For Sale</option>
                                <option value="Leasehold">For Rent</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-100">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            <div>
                <div className="container mt-5">
                    <h2 className="text-center text-dark mb-4">Search Results</h2>
                    <div className="row">
                        {filteredProperties.length ? (
                            filteredProperties.map((property) => (
                                <div key={property.id} className="col-md-4 mb-4">
                                    <div className="card shadow-sm">
                                        <img
                                            src={property.picture || '/default-image.jpg'}
                                            className="card-img-top"
                                            alt={property.location}
                                            style={{ height: '180px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{property.location}</h5>
                                            <small className="d-block mb-3">
                                                Price: £{property.price}
                                            </small>
                                            <a href={property.url} className="btn btn-link">
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center w-100">
                                No properties match your search criteria.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertySearch;
