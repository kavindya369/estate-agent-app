import React from 'react';
import { Link } from 'react-router-dom';

const PropertyList = ({ properties }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-dark mb-4">Available Properties</h2>
      <div className="row">
        {properties.length ? (
          properties.map((property) => (
            <div key={property.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img src={property.picture[0] || '/default-image.jpg'} className="card-img-top" alt={property.location} style={{ height: '180px', objectFit: 'cover' }} />
                <div className="card-body">
                <h5 className="card-title">{property.shortDescription}</h5>
                <br />
                  <h6 className="card-title">{property.location}</h6>
                  <small className="d-block mb-3">Price: £{property.price}</small>
                  <Link to={`/property/${property.id}`} className="btn btn-link">View Details</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-100">No properties match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;