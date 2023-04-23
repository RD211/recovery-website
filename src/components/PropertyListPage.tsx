// PropertyListPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import styles from "./PropertyListPage.module.css";
import { Property } from "../types";
import supabase from "../supabaseClient.js";

const PropertyListPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase.from("properties").select("*");
      if (error) {
        console.error("Error fetching properties:", error.message);
      } else {
        console.log("Successfully fetched properties:", data)
        const formattedData = data.map((property) => ({
          id: property.id,
          title: property.title,
          company: property.company,
          status: property.status,
          county: property.county,
          address: property.address,
          registryNo: property.registryno,
          taxId: property.taxid,
          caseNumber: property.casenumber,
          court: property.court,
          procedureDate: property.proceduredate,
          specialAdministrator: property.specialadministrator,
          description: property.description,
          contactInfo: property.contactinfo,
          imageURLs: property.imageurls || [],
          documents: property.documents || [], // Add this line
        }));
        setProperties(formattedData || []);
        
      }
    };
    
    
    

    fetchProperties();
  }, []);

  return (
    <div className={`container mx-auto mt-8 ${styles.propertyListContainer}`}>
      <h1 className="text-3xl mb-6 text-blue-700">Listă cu bunuri</h1>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${styles.propertyGrid}`}>
        {properties.map((property) => (
          <div
            key={property.id}
            className={`${styles.propertyCard} bg-gray-100 shadow-md rounded-lg p-4`}
          >
            <img
              src={property.imageURLs[0]}
              alt={`Property image for ${property.title}`}
              className={`${styles.propertyImage} rounded-t-lg`}
            />
            <h2 className="text-xl mb-4 font-bold text-blue-800">{property.title}</h2>
            <Link
              to={`/property/${property.id}`}
              className={`btn btn-primary ${styles.viewButton} bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded`}
            >
              Vezi detalii
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListPage;
