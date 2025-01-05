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

  useEffect(() => {
    const foundProperty = propertiesData.properties.find(
      (property) => property.id === id
    );
    setProperty(foundProperty); 
  }, [id]); 

  if (!property) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Short Description */}
      <h2>{property.type}</h2>
      <p>
        <strong>Price:</strong> £{property.price} <br />
        <strong>Location:</strong> {property.location}
      </p>

      {/* Image Gallery */}
      <ImageGallery
        items={property.picture.map((pic) => ({
          original: pic,
          thumbnail: pic, 
        }))}
      />

      {/* React Tabs */}
      <Tabs>
        <TabList>
          <Tab>Long Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Google Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>

        <TabPanel>
          <img
            src={property.floorPlan}
            alt="Floor Plan"
            style={{ width: "100%" }}
          />
        </TabPanel>

        <TabPanel>
          <iframe
            src={property.googleMapEmbed}
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
