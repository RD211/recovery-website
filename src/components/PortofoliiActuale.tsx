import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { Column } from "react-table";
import "./PortofoliiActuale.css";
import supabase from "../supabaseClient";

interface Company {
  name: string;
  status: string;
  county: string;
  numberDosar: string;
  cui: string;
  decisionDate: string;
  nextTermDate: string;
}

export const getCompanies = async () => {
  const { data, error } = await supabase.from("companies").select("*");
  if (error) {
    throw new Error("Error fetching companies data");
  }
  return data.map((company) => ({
    name: company.name,
    status: company.status,
    county: company.county,
    numberDosar: company.number_dosar,
    cui: company.cui,
    decisionDate: company.decision_date,
    nextTermDate: company.next_term_date,
  }));
};

const PortofoliiActuale: React.FC = () => {
  const [data, setData] = useState<Company[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const companies = await getCompanies();
      setData(companies);
    };

    fetchData();
  }, []);

  const columns: Column<Company>[] = React.useMemo(
    () => [
      {
        Header: "Nume firma",
        accessor: "name",
      },
      {
        Header: "Stare",
        accessor: "status",
      },
      {
        Header: "Judet",
        accessor: "county",
      },
      {
        Header: "CUI",
        accessor: "cui",
      },
      {
        Header: "Numar dosar",
        accessor: "numberDosar",
      },
      {
        Header: "Data hotarare",
        accessor: "decisionDate",
      },
      {
        Header: "Data urmatorului termen",
        accessor: "nextTermDate",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Portofolii Actuale</h1>
      <p className="mb-4">
        Aici puteți găsi informații despre portofoliul actual de companii,
        inclusiv detalii despre starea, județul, codul fiscal și datele
        termenelor.
      </p>

      <div className="table-wrapper">
        <table {...getTableProps()} className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Nume firma</th>
              <th className="border border-gray-300 px-4 py-2">Stare</th>
              <th className="border border-gray-300 px-4 py-2">Judet</th>
              <th className="border border-gray-300 px-4 py-2">CUI</th>
              <th className="border border-gray-300 px-4 py-2">Numar Dosar</th>
              <th className="border border-gray-300 px-4 py-2">
                Data hotarare
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Data urmatorului termen
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((company, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {company.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.county}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.cui}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.numberDosar}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.decisionDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {company.nextTermDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortofoliiActuale;
