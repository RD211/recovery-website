import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileRejection, useDropzone } from "react-dropzone";
import supabase from "../supabaseClient.js";
import { Property, Document } from "../types.js";
import { formatDateToEuropean } from "../utils/dateUtils.js";

const EditPropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | undefined>(undefined);
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
  

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const removeDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching property:", error);
        return;
      }

      setProperty({
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
      });
      setTitle(data.title);
      setCompany(data.company);
      setStatus(data.status);
      setCounty(data.county);
      setAddress(data.address);
      setRegistryNo(data.registryno);
      setTaxId(data.taxid);
      setCaseNumber(data.casenumber);
      setCourt(data.court);
      setProcedureDate(data.proceduredate);
      setSpecialAdministrator(data.specialadministrator);
      setDescription(data.description);
      setContactInfo(data.contactinfo);
    };

    fetchProperty();
  }, [id]);

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

    // Update property in the database
    const { error: propertyError } = await supabase
      .from("properties")
      .update({
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
      })
      .eq("id", id);

    if (propertyError) {
      console.error("Error updating property:", propertyError);
      return;
    }

    // Upload images
    for (const image of images) {
      const { error: imageUploadError } = await supabase.storage
        .from("property-images")
        .upload(`${id}/${image.name}`, image);

      if (imageUploadError) {
        console.error("Error uploading image:", imageUploadError);
        return;
      }
    }

    // Upload documents and add document data
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      const { error: documentUploadError } = await supabase.storage
        .from("property-documents")
        .upload(`${id}/${document.name}`, document);

      if (documentUploadError) {
        console.error("Error uploading document:", documentUploadError);
        return;
      }

      const { error: documentDataError } = await supabase
        .from("documents")
        .insert({
          property_id: id,
          ...documentData[i],
        });

      if (documentDataError) {
        console.error("Error adding document data:", documentDataError);
        return;
      }
    }

    alert("Property updated successfully!");
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-6 font-bold text-blue-700">
        Edit Property: {property.title}
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
              value={formatDateToEuropean(procedureDate)}
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
                <li key={index} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </li>
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
                      Document Type:
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
                        formatDateToEuropean(documentData[index] && documentData[index].actDate) ||
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
            Update Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPropertyPage;
