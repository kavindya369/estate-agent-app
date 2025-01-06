import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';  
import { NumericFormat } from 'react-number-format';  
import { Button } from '@mui/material';

const SearchForm = ({ formData, handleInputChange, handleSubmit }) => {
  // Custom options for the select dropdowns
  const propertyTypeOptions = [
    { value: 'Any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' },
  ];

  const saleOrRentOptions = [
    { value: 'Freehold', label: 'For Sale' },
    { value: 'Leasehold', label: 'For Rent' },
  ];

  return (
    <div className="search-container" style={{ backgroundImage: 'url(/images/img1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '80px 0' }}>
      <h1 className="text-center text-light">Discover your perfect property with the largest selection available</h1>
      <h1 className="text-center mb-4 text-dark fst-italic">Estate Finder</h1>

      {/* Main form container */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm" style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Property Type selection using React Select */}
        <div className="mb-3">
          <label htmlFor="propertyType" className="form-label">Property Type</label>
          <Select
            id="propertyType"
            name="propertyType"
            options={propertyTypeOptions}
            value={propertyTypeOptions.find(option => option.value === formData.propertyType)}
            onChange={selectedOption => handleInputChange({ target: { name: 'propertyType', value: selectedOption.value } })}
          />
        </div>

        {/* Price Range selection (Min and Max price) */}
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <label htmlFor="priceMin" className="form-label">Min Price</label>
            <NumericFormat
              id="priceMin"
              name="priceMin"
              className="form-control"
              value={formData.priceMin}
              onValueChange={values => handleInputChange({ target: { name: 'priceMin', value: values.value } })}
              thousandSeparator={true}
              prefix="£"
            />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="priceMax" className="form-label">Max Price</label>
            <NumericFormat
              id="priceMax"
              name="priceMax"
              className="form-control"
              value={formData.priceMax}
              onValueChange={values => handleInputChange({ target: { name: 'priceMax', value: values.value } })}
              thousandSeparator={true}
              prefix="£"
            />
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

        {/* Date range selection (Start and End date) using React Datepicker */}
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <DatePicker
              id="startDate"
              name="startDate"
              selected={formData.startDate ? new Date(formData.startDate) : null}
              onChange={date => handleInputChange({ target: { name: 'startDate', value: date } })}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <DatePicker
              id="endDate"
              name="endDate"
              selected={formData.endDate ? new Date(formData.endDate) : null}
              onChange={date => handleInputChange({ target: { name: 'endDate', value: date } })}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>

        {/* Postcode Area input */}
        <div className="mb-3">
          <label htmlFor="postcodeArea" className="form-label">Postcode Area</label>
          <input type="text" id="postcodeArea" name="postcodeArea" className="form-control" value={formData.postcodeArea} onChange={handleInputChange} placeholder="e.g., BR1, NW1" />
        </div>

        {/* Sale or Rent selection using React Select */}
        <div className="mb-3">
          <label htmlFor="saleOrRent" className="form-label">Sale or Rent</label>
          <Select
            id="saleOrRent"
            name="saleOrRent"
            options={saleOrRentOptions}
            value={saleOrRentOptions.find(option => option.value === formData.saleOrRent)}
            onChange={selectedOption => handleInputChange({ target: { name: 'saleOrRent', value: selectedOption.value } })}
          />
        </div>

        {/* Submit button to perform the search */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Search
        </Button>
          </form>
    </div>
  );
};

export default SearchForm;
