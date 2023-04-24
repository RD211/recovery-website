// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <ul className="text-sm space-y-2">
              <li>
                <strong>Telefon:</strong> 0784 034 203
              </li>
              <li>
                <strong>Email:</strong> office@recovery-solutions.ro
              </li>
              <li>
                <strong>Adresa:</strong> Str. Calusei nr.21, sector 2, Bucuresti.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white-700 mt-6 pt-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-center">
            &copy; {currentYear} drepturile 2023 Recovery Solutions SPRL
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
