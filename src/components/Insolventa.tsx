import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faGavel,
  faUserShield,
  faFileAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import bgImage2 from "../assets/insolventa.jpg";

const Insolventa: React.FC = () => {
  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage2})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-60"></div>
        <div className="p-8 max-w-2xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            INSOLVENȚA PERSOANELOR FIZICE
          </h1>
          <p className="text-white mb-6 text-2xl">
            O șansă pentru un nou început, fără datorii împovărătoare, fără
            execuțări silite și telefoane stânjenitoare.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <div className="max-w-2xl mx-auto text-center space-y-16">
          <div
            className="grid grid-cols-3 gap-6 justify-center items-center"
            data-aos="fade-up"
          >
            <div className="flex flex-col items-center">
              <FontAwesomeIcon
                icon={faHandshake}
                className="text-4xl text-gray-800 mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Insolventa
              </h2>
              <p className="text-gray-700">
                Intrarea în procedura de insolvență a persoanelor fizice acordă
                debitorului de bună credință o șansă de redresare financiară.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon
                icon={faGavel}
                className="text-4xl text-gray-800 mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Proceduri
              </h2>
              <ul className="list-disc text-gray-700 list-inside">
                <li>Procedura de insolvență pe bază de plan</li>
                <li>Procedura judiciară de insolvență prin lichidare</li>
                <li>Procedura simplificată de insolvență</li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon
                icon={faUserShield}
                className="text-4xl text-gray-800 mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Despre noi
              </h2>
              <p className="text-gray-700">
                Cu 15 ani de experiență în domeniul juridic și managerial,
                oferim servicii complexe în insolvența persoanel anelor fizice.
              </p>
            </div>
          </div>
          <div
            className="grid grid-cols-2 gap-6 justify-center items-center"
            data-aos="fade-up"
          >
            <div className="flex flex-col items-center">
              <FontAwesomeIcon
                icon={faFileAlt}
                className="text-4xl text-gray-800 mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Serviciile oferite
              </h2>
              <p className="text-gray-700">
                Ne transmiteti un e-mail sau completati formularul și vă sunăm
                în următoarele 24 de ore.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-4xl text-gray-800 mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Avantaje
              </h2>
              <ul className="list-disc text-gray-700 list-inside">
                <li>Blocarea execuțărilor</li>
                <li>Fără dobânzi, penalități și majorări</li>
                <li>Eliberarea de datorii reziduale</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insolventa;
