import React from "react";
import bgImage from "../assets/background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactForm from "./ContactForm";

AOS.init();

const Home: React.FC = () => {
  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-60"></div>
        <div
          className="p-8 max-w-2xl mx-auto relative z-10 text-center"
          data-aos="fade-up"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">
            RECOVERY SOLUTIONS SRL
          </h1>
          <p className="text-white mb-6 text-2xl">
          Soluții eficiente în provocările financiare. Oferim asistență și consultanță în înființarea și funcționarea societăților comerciale, insolvența persoanelor juridice și recuperarea de creanțe. Profesionalism și dedicare pentru a sprijini afacerea dvs.          </p>
        </div>
      </div>
      <div className="bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2
            className="text-4xl font-bold mb-2 mt-6 text-gray-800"
            data-aos="fade-up"
          >
            De ce să ne alegeți?
          </h2>
          <ul className="list-none text-gray-700 space-y-8">
            <li
              className="flex items-center space-x-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span className="text-2xl">
                Experiență vastă în gestionarea cazurilor de insolvență și
                restructurare.
              </span>
            </li>
            <li
              className="flex items-center space-x-2"
              data-aos="fade-up"
              data-aos-delay="300"
            >

              <span className="text-2xl">
                Echipă multidisciplinară de experți dedicați și profesioniști.
              </span>
            </li>
            <li
              className="flex items-center space-x-2"
              data-aos="fade-up"
              data-aos-delay="400"
            >

              <span className="text-2xl">
                Abordare personalizată pentru fiecare caz în parte, adaptată
                nevoilor specifice ale clientului.
              </span>
            </li>
            <li
              className="flex items-center space-x-2"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <span className="text-2xl">
                Angajament ferm pentru transparență, integritate și respectarea
                standardelor etice.


              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-4xl font-bold mb-2 mt-6 text-gray-800" data-aos="fade-up">
            Servicii pentru societăți comerciale
          </h2>
          <p className="text-2xl text-gray-700" data-aos="fade-up" data-aos-delay="200">
            Oferim asistență și consultanță în constituirea și operarea societăților comerciale, asociatii sau fundatii:
          </p>
          <ul className="list-disc list-inside text-2xl text-gray-700 space-y-4" data-aos="fade-up" data-aos-delay="300">
            <li>Acte constitutive și înregistrare</li>
            <li>Asistență pentru asociați/acționari și administratori</li>
            <li>Manuale de proceduri, planuri de afaceri și politici interne</li>
            <li>Înregistrarea mărcilor la OSIM</li>
            <li>Servicii de contabilitate</li>
            <li>Proiecte de divizare, fuziune, absorție și restructurare/reorganizare</li>
            <li>Contracte comerciale și asistență în asociere în participațiune</li>
          </ul>
        </div>
      </div>
      <ContactForm />
      
    </>
  );
};

export default Home;
