// AdminPropertyListPage.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Property } from "../types";
import supabase from "../supabaseClient.js";
import styles from "./PropertyListPage.module.css";
import AdminCompanies from "./AdminCompanies";

const AdminPropertyListPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase.from("properties").select("*");
      if (error) {
        console.error("Error fetching properties:", error.message);
      } else {
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
            documents: property.documents || [],
        }));
        setProperties(formattedData || []);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (propertyId: number) => {
    const { error } = await supabase
        .from("documents")
        .delete()
        .match({ property_id: propertyId });
    
    if (error) {
        console.error("Error deleting documents:", error.message);
    }


    const { error: deletePropertyError } = await supabase
      .from("properties")
      .delete()
      .match({ id: propertyId });

    if (deletePropertyError) {
      console.error("Error deleting property:", deletePropertyError.message);
    } else {
      setProperties(properties.filter((property) => property.id !== propertyId));
      // Alert
      alert("Property deleted successfully!");
    }
  };

  return (
    <>
    <div className={`container mx-auto mt-8 ${styles.propertyListContainer}`}>
      <h1 className="text-3xl mb-6 text-blue-700">Admin Property List</h1>
      <button
        onClick={() => navigate("/admin/add-property")}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-6"
      >
        Add Property
      </button>
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
            
            <div className="mt-4">
              <Link
                to={`/admin/edit-property/${property.id}`}
                className="bg-green-600 text-white px-4 py-2 rounded-md mr-4 hover:bg-green-700 transition-colors duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(property.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="container mx-auto mt-8">
        <AdminCompanies></AdminCompanies>
    </div>
    </>
  );
};

export default AdminPropertyListPage;
