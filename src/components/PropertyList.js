import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';

const PropertyList = ({ properties, favorites, onFavoriteToggle }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => onFavoriteToggle(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="container mt-5" style={{ backgroundColor: isOver ? 'lightcoral' : 'white' }}>
      <h2 className="text-center text-dark mb-4">Available Properties</h2>
      <div className="row">
        {properties.length ? (
          properties.map((property) => (
            <PropertyItem
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))
        ) : (
          <p className="text-center w-100">No properties match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

const PropertyItem = ({ property, isFavorite, onFavoriteToggle }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { id: property.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="col-md-6 mb-4 d-flex" style={{ opacity: isDragging ? 0.5 : 1 }}>
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
            <button
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => onFavoriteToggle(property.id)}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <Link to={`/property/${property.id}`} className="btn btn-link">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;