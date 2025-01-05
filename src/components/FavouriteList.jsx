import React from "react";
import { Link } from "react-router-dom";

const FavouriteList = ({ properties, favorites, onFavoriteToggle, onDragStart, onDrop, onDragOver, clearFavorites }) => {
  const favoriteProperties = properties.filter((property) => favorites.includes(property.id));

  return (
    <div
      className="container mt-5"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <h2 className="text-center text-dark mb-4">Favorite Properties</h2>
      {/* Clear all favorites button */}
      <button className="btn btn-outline-danger mb-4" onClick={clearFavorites}>
        Clear All
      </button>
      <div className="row">
        {/* Check if there are any favorite properties to display */}
        {favoriteProperties.length ? (
          favoriteProperties.map((property) => (
            <div key={property.id} className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex">
              {/* Card container for each property */}
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
                  {/* Property short description */}
                  <h5 className="card-title">{property.shortDescription}</h5>
                  {/* Property location */}
                  <h6 className="card-title">{property.location}</h6>
                  {/* Property price */}
                  <small className="d-block mb-3">Price: £{property.price}</small>
                  <div className="mt-auto">
                    <button
                      className="btn btn-danger"
                      onClick={() => onFavoriteToggle(property.id)}
                    >
                      Remove
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
          <p className="text-center w-100">No favorite properties.</p>
        )}
      </div>
    </div>
  );
};

export default FavouriteList;