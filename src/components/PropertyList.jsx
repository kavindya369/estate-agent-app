import React from "react";
import { Link } from "react-router-dom";

const PropertyList = ({ properties, favorites, onFavoriteToggle, onDragStart, onDrop, onDragOver }) => {
  return (
    <div className="container mt-5" onDrop={onDrop} onDragOver={onDragOver}>
      <h2 className="text-center text-dark mb-4">Available Properties</h2>

      <div className="row">
        {/* Check if properties exist, and map over the array to display them */}
        {properties.length ? (
          properties.map((property) => (
            <div key={property.id} className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4 d-flex">
              {/* Property card, making it draggable */}
              <div
                className="card shadow-sm d-flex flex-column"
                draggable
                onDragStart={(e) => onDragStart(e, property.id)}
              >
                {/* Property image */}
                <img
                  src={property.picture[0] || "/default-image.jpg"}
                  className="card-img-top"
                  alt={property.location}
                  style={{ height: "180px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  {/* Short description of the property */}
                  <h5 className="card-title">{property.shortDescription}</h5>
                  {/* Location of the property */}
                  <h6 className="card-title">{property.location}</h6>
                  {/* Price of the property */}
                  <small className="d-block mb-3">Price: £{property.price}</small>

                  <div className="mt-auto">
                    {/* Favorite button toggles between adding/removing the property from favorites */}
                    <button
                      className={`btn ${favorites.includes(property.id) ? "btn-danger" : "btn-outline-danger"}`}
                      onClick={() => onFavoriteToggle(property.id)}
                    >
                      {favorites.includes(property.id) ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                    {/* Link to view property details */}
                    <Link to={`/property/${property.id}`} className="btn btn-link">
                      View Details
                    </Link>
                  </div>
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