import React from 'react';

const SearchForm = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <div className="search-container" style={{ backgroundImage: 'url(/images/img1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '80px 0' }}>
      <h1 className="text-center text-light">Discover your perfect property with the largest selection available</h1>
      <h1 className="text-center mb-4 text-dark">Estate Finder</h1>

      {/* Main form container */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm" style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Property Type selection */}
        <div className="mb-3">
          <label htmlFor="propertyType" className="form-label">Property Type</label>
          <select id="propertyType" name="propertyType" className="form-select" value={formData.propertyType} onChange={handleInputChange}>
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Price Range selection (Min and Max price) */}
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <label htmlFor="priceMin" className="form-label">Min Price</label>
            <input type="number" id="priceMin" name="priceMin" className="form-control" value={formData.priceMin} onChange={handleInputChange} />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="priceMax" className="form-label">Max Price</label>
            <input type="number" id="priceMax" name="priceMax" className="form-control" value={formData.priceMax} onChange={handleInputChange} />
          </div>
        </div>

        {/* Bedroom range selection (Min and Max bedrooms) */}
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <label htmlFor="minBedrooms" className="form-label">Min Bedrooms</label>
            <input type="number" id="minBedrooms" name="minBedrooms" className="form-control" value={formData.minBedrooms} onChange={handleInputChange} />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="maxBedrooms" className="form-label">Max Bedrooms</label>
            <input type="number" id="maxBedrooms" name="maxBedrooms" className="form-control" value={formData.maxBedrooms} onChange={handleInputChange} />
          </div>
        </div>

        {/* Date range selection (Start and End date) */}
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input type="date" id="startDate" name="startDate" className="form-control" value={formData.startDate} onChange={handleInputChange} />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input type="date" id="endDate" name="endDate" className="form-control" value={formData.endDate} onChange={handleInputChange} />
          </div>
        </div>

        {/* Postcode Area input */}
        <div className="mb-3">
          <label htmlFor="postcodeArea" className="form-label">Postcode Area</label>
          <input type="text" id="postcodeArea" name="postcodeArea" className="form-control" value={formData.postcodeArea} onChange={handleInputChange} placeholder="e.g., BR1, NW1" />
        </div>

        {/* Sale or Rent selection */}
        <div className="mb-3">
          <label htmlFor="saleOrRent" className="form-label">Sale or Rent</label>
          <select id="saleOrRent" name="saleOrRent" className="form-select" value={formData.saleOrRent} onChange={handleInputChange}>
            <option value="">Any</option>
            <option value="Freehold">For Sale</option>
            <option value="Leasehold">For Rent</option>
          </select>
        </div>

        {/* Submit button to perform the search */}
        <button type="submit" className="btn btn-primary w-100">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;