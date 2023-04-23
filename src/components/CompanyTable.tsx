import React from 'react';
import { Company } from '../types';
import supabase from '../supabaseClient';

interface CompanyTableProps {
  companies: Company[];
  onUpdate: () => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ companies, onUpdate }) => {
  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('companies')
      .delete()
      .match({ id });

    if (error) {
      console.error('Error deleting company:', error);
    } else {
      onUpdate();
    }
  };

  return (
    <table className="w-full table-auto">
      <thead className="bg-blue-500 text-white">
        <tr>
          {/* Add Tailwind CSS classes to style the header cells */}
          <th className="px-4 py-2">Nume firma</th>
          <th className="px-4 py-2">Stare</th>
          <th className="px-4 py-2">Judet</th>
          <th className="px-4 py-2">Cod fiscal</th>
          <th className="px-4 py-2">CUI</th>
          <th className="px-4 py-2">Data hotarare</th>
          <th className="px-4 py-2">Data urmatorului termen</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {companies.map((company, index) => (
          <tr key={company.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
            {/* Add Tailwind CSS classes to style the table cells */}
            <td className="border px-4 py-2">{company.name}</td>
            <td className="border px-4 py-2">{company.status}</td>
            <td className="border px-4 py-2">{company.county}</td>
            <td className="border px-4 py-2">{company.taxCode}</td>
            <td className="border px-4 py-2">{company.cui}</td>
            <td className="border px-4 py-2">{company.decisionDate}</td>
            <td className="border px-4 py-2">{company.nextTermDate}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => handleDelete(company.id)}
                className="bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompanyTable;
