import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./PropertyPage.module.css";
import { Property, Document } from "../types";
import supabase from "../supabaseClient.js";
import DocumentCard from "./DocumentCard";

interface PropertyPageProps {}

const PropertyPage: React.FC<PropertyPageProps> = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        return;
      }
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", parseInt(id, 10))
        .single();

      if (data) {
        const formattedData: Property = {
          id: data.id,
          title: data.title,
          company: data.company,
          status: data.status,
          county: data.county,
          address: data.address,
          registryNo: data.registryno,
          taxId: data.taxid,
          caseNumber: data.casenumber,
          court: data.court,
          procedureDate: data.proceduredate,
          specialAdministrator: data.specialadministrator,
          description: data.description,
          contactInfo: data.contactinfo,
          imageURLs: data.imageurls || [],
          documents: data.documents || [],
        };
        setProperty(formattedData || []);
      } else {
        setProperty(null);
      }

      if (error) {
        console.error("Error fetching property:", error);
      }
    };

    const fetchDocuments = async () => {
      if (!id) {
        return;
      }
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("property_id", parseInt(id, 10));

      if (data) {
        setDocuments(
          data.map((document) => ({
            id: document.id,
            documentType: document.documenttype,
            actNumber: document.actnumber,
            actDate: document.actdate,
            caseNumber: document.casenumber,
            caseYear: document.caseyear,
            procedure: document.procedure,
            court: document.court,
            fileUrl: document.fileurl,
          }))
        );
      }

      if (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchProperty();
    fetchDocuments();
  }, [id]);

  if (!property) {
    return <div>Proprietate negăsită</div>;
  }

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const largeImage = document.createElement("img");
    largeImage.src = target.src;
    largeImage.style.position = "fixed";
    largeImage.style.zIndex = "1000";
    largeImage.style.top = "50%";
    largeImage.style.left = "50%";
    largeImage.style.transform = "translate(-50%, -50%)";
    largeImage.style.maxWidth = "90%";
    largeImage.style.maxHeight = "90%";
    largeImage.onclick = () => document.body.removeChild(largeImage);
    document.body.appendChild(largeImage);
  };

  return (
    <div className="container mx-auto mt-8 {styles.propertyContainer}">
      <h1 className="text-3xl mb-6 font-bold text-blue-700">
        {property.title}
      </h1>
      <div
        className={`grid gap-8 ${styles.propertyGrid} ${styles.propertyInfo}`}
      >
        <div>
          <h2 className="text-xl mb-4 font-semibold">Detalii proprietate</h2>
          <ul className="list-disc list-inside">
            <li>Companie: {property.company}</li>
            <li>Stare: {property.status}</li>
            <li>Județ: {property.county}</li>
            <li>Adresă: {property.address}</li>
            <li>Nr. înregistrare: {property.registryNo}</li>
            <li>ID fiscal: {property.taxId}</li>
            <li>Nr. dosar: {property.caseNumber}</li>
            <li>Curte: {property.court}</li>
            <li>Data procedurii: {property.procedureDate}</li>
            <li>Administrator special: {property.specialAdministrator}</li>
          </ul>
          <p className="mt-4">{property.description}</p>
          <p className="mt-2">{property.contactInfo}</p>
        </div>
        <div className="{styles.propertyImages}">
          <h2 className="text-xl mb-4 font-semibold">Galerie</h2>
          <div className="grid grid-cols-3 gap-4">
            {property.imageURLs.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Imaginea proprietății ${index + 1}`}
                className="w-full h-auto cursor-pointer hover:opacity-75 transition-opacity duration-300"
                onClick={handleImageClick}
              />
            ))}
          </div>
        </div>
        <div className="{styles.documents}">
          <h2 className="text-xl mb-4 font-semibold">Documente</h2>
          <ul className="list-disc list-inside">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
