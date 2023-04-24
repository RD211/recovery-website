import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import CompanyForm from "./CompanyForm";
import CompanyTable from "./CompanyTable";
import { Company } from "../types";

const AdminCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  const fetchCompanies = async () => {
    const { data: companiesData, error } = await supabase
      .from("companies")
      .select("*");

    if (error) {
      console.error("Error fetching companies:", error);
    } else {
      setCompanies(
        companiesData.map((company) => ({
          id: company.id,
          name: company.name,
          status: company.status,
          county: company.county,
          numberDosar: company.number_dosar,
          cui: company.cui,
          decisionDate: company.decision_date,
          nextTermDate: company.next_term_date,
        }))
      );
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin - Companies</h1>
      <div>
        <CompanyTable companies={companies} onUpdate={fetchCompanies} />
      </div>
      <hr className="my-8" />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Adauga o companie</h2>
        <CompanyForm onFormSubmit={fetchCompanies} />
      </div>
    </div>
  );
};

export default AdminCompanies;
