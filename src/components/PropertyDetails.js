import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-tabs/style/react-tabs.css";
import propertiesData from '../assets/properties.json';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const foundProperty = propertiesData.properties.find(
      (property) => property.id === id
    );
    setProperty(foundProperty);
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      {/* Short Description */}
      <h2 className="text-center">{property.type}</h2>
      <p className="text-center">
        <strong>Price:</strong> £{property.price} <br />
        <strong>Location:</strong> {property.location}
      </p>

      {/* Image Gallery */}
      <div className="row justify-content-center">
        <div className="col-12">
          <ImageGallery
            items={property.picture.map((pic) => ({
              original: pic,
              thumbnail: pic,
            }))}
          />
        </div>
      </div>

      {/* React Tabs */}
      <Tabs
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}
        className="my-4"
      >
        <TabList className="nav nav-pills justify-content-center mb-4">
          <Tab className="nav-item">
            <button
              className={`nav-link ${selectedTab === 0 ? 'active' : ''} btn btn-primary`}
            >
              Long Description
            </button>
          </Tab>
          <Tab className="nav-item">
            <button
              className={`nav-link ${selectedTab === 1 ? 'active' : ''} btn btn-primary`}
            >
              Floor Plan
            </button>
          </Tab>
          <Tab className="nav-item">
            <button
              className={`nav-link ${selectedTab === 2 ? 'active' : ''} btn btn-primary`}
            >
              Google Map
            </button>
          </Tab>
        </TabList>

        {/* Long Description */}
        <TabPanel>
          <div className="row">
            <div className="col-12">
              <h3>Property Description</h3>
              <p>{property.description}</p>
            </div>
          </div>
        </TabPanel>

        {/* Floor Plan */}
        <TabPanel>
          <div className="row justify-content-center">
            <div className="col-12">
              <h3>Floor Plan</h3>
              <img
                src={property.floorPlan}
                alt="Floor Plan"
                className="img-fluid"
              />
            </div>
          </div>
        </TabPanel>

        {/* Google Map */}
        <TabPanel>
          <div className="row justify-content-center">
            <div className="col-12">
              <h3>Location Map</h3>
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  property.location
                )}&output=embed`}
                width="100%"
                height="400px"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
