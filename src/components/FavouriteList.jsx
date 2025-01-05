import React from 'react';
import { Link } from 'react-router-dom';
import { useDrop } from 'react-dnd';

const FavouriteList = ({ properties, favorites, onFavoriteToggle, clearFavorites }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => onFavoriteToggle(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const favoriteProperties = properties.filter((property) => favorites.includes(property.id));

  return (
    <div ref={drop} className="container mt-5" style={{ backgroundColor: isOver ? 'lightgreen' : 'white' }}>
      <h2 className="text-center text-dark mb-4">Favorite Properties</h2>
      <button className="btn btn-danger mb-3" onClick={clearFavorites}>Clear Favorites</button>
      <div className="row">
        {favoriteProperties.length ? (
          favoriteProperties.map((property) => (
            <div key={property.id} className="col-md-6 mb-4 d-flex">
              <div className="card shadow-sm d-flex flex-column">
                <img
                  src={property.picture[0] || '/default-image.jpg'}
                  className="card-img-top"
                  alt={property.location}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{property.shortDescription}</h5>
                  <h6 className="card-title">{property.location}</h6>
                  <small className="d-block mb-3">Price: £{property.price}</small>
                  <div className="mt-auto">
                    <button className="btn btn-danger" onClick={() => onFavoriteToggle(property.id)}>Remove</button>
                    <Link to={`/property/${property.id}`} className="btn btn-link">View Details</Link>
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