import React, { useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import supabase from "../supabaseClient.js";
import { Document } from "../types.js";

const AddPropertyPage = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [county, setCounty] = useState("");
  const [address, setAddress] = useState("");
  const [registryNo, setRegistryNo] = useState("");
  const [taxId, setTaxId] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [court, setCourt] = useState("");
  const [procedureDate, setProcedureDate] = useState("");
  const [specialAdministrator, setSpecialAdministrator] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [documentData, setDocumentData] = useState<Document[]>([]);

  const handleDocumentDataChange = (
    index: number,
    key: keyof Document,
    value: string | number | Date
  ) => {
    const newDocumentData = [...documentData];
    newDocumentData[index] = { ...newDocumentData[index], [key]: value };
    setDocumentData(newDocumentData);
  };

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImages(acceptedFiles);
    },
  });

  const {
    getRootProps: getDocumentRootProps,
    getInputProps: getDocumentInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setDocuments(acceptedFiles);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add new property to the database
    const { data: propertyData, error: propertyError } = await supabase
      .from("properties")
      .insert([
        {
          title,
          company,
          status,
          county,
          address,
          registryno: registryNo,
          taxid: taxId,
          casenumber: caseNumber,
          court,
          proceduredate: procedureDate,
          specialadministrator: specialAdministrator,
          description,
          contactinfo: contactInfo,
        },
      ])
      .select();

    if (propertyError) {
      console.error("Error adding property:", propertyError);
      return;
    }

    if (!propertyData || propertyData.length === 0) {
      console.error("Failed to insert property.");
      return;
    }

    const propertyId = propertyData[0].id as number;

    // Upload images to storage bucket
    const imageUploads = images.map(async (image) => {
      const filePath = `property-images/${propertyId}/${image.name}`;
      const { error: imageError } = await supabase.storage
        .from("property-images")
        .upload(filePath, image);

      if (imageError) {
        console.error("Error uploading image:", imageError);
      }

      return filePath;
    });

    // Wait for all image uploads to complete
    const imageURLs = await Promise.all(imageUploads);

    // Add https://qkssbptojyntrufcmxdx.supabase.co/storage/v1/object/public/property-images to the beginning of each image url
    imageURLs.forEach((url, index) => {
      imageURLs[
        index
      ] = `https://qkssbptojyntrufcmxdx.supabase.co/storage/v1/object/public/property-images/${url}`;
    });

    // Update imageurls field in the property
    await supabase
      .from("properties")
      .update({ imageurls: imageURLs })
      .eq("id", propertyId);

    // Upload documents and add them to the documents table
    const documentUploads = documents.
    map(async (document, index) => {
      const filePath = `property-documents/${propertyId}/${document.name}`;
      const { error: documentError } = await supabase.storage
        .from("property-documents")
        .upload(filePath, document);

      if (documentError) {
        console.error("Error uploading document:", documentError);
      }

      // Add document to the documents table
      await supabase.from("documents").insert([
        {
          property_id: propertyId,
          documenttype: documentData[index].documentType,
          fileurl: `https://qkssbptojyntrufcmxdx.supabase.co/storage/v1/object/public/property-documents/property-documents/${propertyId}/${document.name}`,
          actnumber: documentData[index].actNumber,
          actdate: documentData[index].actDate,
          casenumber: documentData[index].caseNumber,
          caseyear: documentData[index].caseYear,
          court: documentData[index].court,
          procedure: documentData[index].procedure
        },
      ]);
    });

    // Wait for all document uploads and database inserts to complete
    await Promise.all(documentUploads);

    // Clear form data
    setTitle("");
    setCompany("");
    setStatus("");
    setCounty("");
    setAddress("");
    setRegistryNo("");
    setTaxId("");
    setCaseNumber("");
    setCourt("");
    setProcedureDate("");
    setSpecialAdministrator("");
    setDescription("");
    setContactInfo("");
    setImages([]);
    setDocuments([]);

    alert("Property and documents added successfully!");
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-6 font-bold text-blue-700">
        Add New Property
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block mb-2">
              Status
            </label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* County */}
          <div>
            <label htmlFor="county" className="block mb-2">
              County
            </label>
            <input
              type="text"
              id="county"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Registry Number */}
          <div>
            <label htmlFor="registryNo" className="block mb-2">
              Registry Number
            </label>
            <input
              type="text"
              id="registryNo"
              value={registryNo}
              onChange={(e) => setRegistryNo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Tax ID */}
          <div>
            <label htmlFor="taxId" className="block mb-2">
              Tax ID
            </label>
            <input
              type="text"
              id="taxId"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Case Number */}
          <div>
            <label htmlFor="caseNumber" className="block mb-2">
              Case Number
            </label>
            <input
              type="text"
              id="caseNumber"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Court */}
          <div>
            <label htmlFor="court" className="block mb-2">
              Court
            </label>
            <input
              type="text"
              id="court"
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Procedure Date */}
          <div>
            <label htmlFor="procedureDate" className="block mb-2">
              Procedure Date
            </label>
            <input
              type="date"
              id="procedureDate"
              value={procedureDate}
              onChange={(e) => setProcedureDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Special Administrator */}
          <div>
            <label htmlFor="specialAdministrator" className="block mb-2">
              Special Administrator
            </label>
            <input
              type="text"
              id="specialAdministrator"
              value={specialAdministrator}
              onChange={(e) => setSpecialAdministrator(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
            />
          </div>

          {/* Contact Info */}
          <div>
            <label htmlFor="contactInfo" className="block mb-2">
              Contact Info
            </label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Image and document upload */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-xl mb-4 font-semibold">Property Images</h2>
            <div
              {...getImageRootProps()}
              className="border-dashed border-2 border-gray-300 rounded-md p-4"
            >
              <input {...getImageInputProps()} />
              <p>Drag and drop images here, or click to select files</p>
            </div>
            <ul className="mt-4">
              {images.map((image, index) => (
                <li key={index}>{image.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl mb-4 font-semibold">Property Documents</h2>
            <div
              {...getDocumentRootProps()}
              className="border-dashed border-2 border-gray-300 rounded-md p-4"
            >
              <input {...getDocumentInputProps()} />
              <p>Drag and drop PDFs here, or click to select files</p>
            </div>
            <ul className="mt-4">
              {documents.map((document, index) => (
                <li key={index} className="mb-4">
                  <div>{document.name}</div>
                  <div className="mt-2">
                    <label htmlFor={`documentType-${index}`} className="mr-2">
                      Document Name:
                    </label>
                    <input
                      type="text"
                      id={`documentType-${index}`}
                      value={
                        (documentData[index] &&
                          documentData[index].documentType) ||
                        ""
                      }
                      onChange={(e) =>
                        handleDocumentDataChange(
                          index,
                          "documentType",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor={`actNumber-${index}`} className="mr-2">
                      Act Number:
                    </label>
                    <input
                      type="text"
                      id={`actNumber-${index}`}
                      value={
                        (documentData[index] &&
                          documentData[index].actNumber) ||
                        ""
                      }
                      onChange={(e) =>
                        handleDocumentDataChange(
                          index,
                          "actNumber",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor={`actDate-${index}`} className="mr-2">
                      Act Date:
                    </label>
                    <input
                      type="date"
                      id={`actDate-${index}`}
                      value={
                        (documentData[index] && documentData[index].actDate) ||
                        ""
                      }
                      onChange={(e) =>
                        handleDocumentDataChange(
                          index,
                          "actDate",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor={`caseNumber-${index}`} className="mr-2">
                      Case Number:
                    </label>
                    <input
                      type="text"
                      id={`caseNumber-${index}`}
                      value={
                        (documentData[index] &&
                          documentData[index].caseNumber) ||
                        ""
                      }
                      onChange={(e) =>
                        handleDocumentDataChange(
                          index,
                          "caseNumber",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor={`caseYear-${index}`} className="mr-2">
                      Case Year:
                    </label>
                    <input
                      type="number"
                      id={`caseYear-${index}`}
                      value={
                        (documentData[index] && documentData[index].caseYear) ||
                        ""
                      }
                      onChange={(e) =>
                        handleDocumentDataChange(
                          index,
                          "caseYear",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor={`procedure-${index}`} className="mr-2">
                      Procedure:
                    </label>
                    <input
                      type="text"
                      id={`procedure-${index}`}
                      value={
                        (documentData[index] &&
                          documentData[index].procedure) ||
                        ""
                      }
                      onChange={(e) =>
                        handleDocumentDataChange(
                          index,
                          "procedure",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor={`court-${index}`} className="mr-2">
                      Court:
                    </label>
                    <input
                      type="text"
                      id={`court-${index}`}
                      value={
                        (documentData[index] && documentData[index].court) || ""
                      }
                      onChange={(e) =>
                        handleDocumentDataChange(index, "court", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Submit button */}

        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyPage;
