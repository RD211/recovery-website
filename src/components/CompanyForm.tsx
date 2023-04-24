import React, { useState } from "react";
import supabase from "../supabaseClient";
import { formatDateToEuropean } from '../utils/dateUtils';

interface CompanyFormProps {
  onFormSubmit: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onFormSubmit }) => {
  const [company, setCompany] = useState({
    name: "",
    status: "",
    county: "",
    tax_code: "",
    cui: "",
    decision_date: "",
    next_term_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("companies").insert([company]);

    if (error) {
      console.error("Error adding company:", error);
    } else {
      setCompany({
        name: "",
        status: "",
        county: "",
        tax_code: "",
        cui: "",
        decision_date: "",
        next_term_date: "",
      });
      onFormSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-semibold">
          Nume firma:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={company.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="status" className="text-sm font-semibold">
          Status:
        </label>
        <input
          type="text"
          id="status"
          name="status"
          value={company.status}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="county" className="text-sm font-semibold">
          Judet:
        </label>
        <input
          type="text"
          id="county"
          name="county"
          value={company.county}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="tax_code" className="text-sm font-semibold">
          Cod fiscal:
        </label>
        <input
          type="text"
          id="tax_code"
          name="tax_code"
          value={company.tax_code}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="cui" className="text-sm font-semibold">
          CUI:
        </label>
        <input
          type="text"
          id="cui"
          name="cui"
          value={company.cui}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="decision_date" className="text-sm font-semibold">
          Data hotarare:
        </label>
        <input
          type="date"
          id="decision_date"
          name="decision_date"
          value={formatDateToEuropean(company.decision_date)}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="next_term_date" className="text-sm font-semibold">
          Data urmatorului termen:
        </label>
        <input
          type="date"
          id="next_term_date"
          name="next_term_date"
          value={formatDateToEuropean(company.next_term_date)}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
      >
        Adauga
      </button>{" "}
    </form>
  );
};

export default CompanyForm;
