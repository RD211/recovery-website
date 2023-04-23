import React from "react";

const Servicii: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Servicii</h1>

      <section className="bg-blue-100 p-6 rounded-lg mb-8">
        <h2 className="text-3xl font-semibold mb-4">
          Înființării și funcționării societăților comerciale
        </h2>
        <p>
          Echipa noastră de experți oferă asistență și consultanță pe parcursul
          întregului proces de constituire și operare a unei societăți
          comerciale, asociatii sau fundatii. Serviciile noastre includ:
        </p>
        <ul className="list-none pl-6 mt-2">
          {[
            "Elaborarea actelor constitutive și înregistrarea acestora;",
            "Modificarea actelor constitutive;",
            "Asistență pentru asociați/acționari în exercitarea controlului asupra administrării societății;",
            "Sprijin pentru administratori în gestionarea societății;",
            "Crearea manualelor de proceduri, planurilor de afaceri și politicilor interne ale companiilor;",
            "Elaborarea și înregistrarea mărcilor la OSIM;",
            "Realizarea nomenclatorului arhivistic și efectuarea demersurilor pentru confirmarea acestuia, adaptându-l la modificările din organigrama societății;",
            "Servicii de contabilitate, elaborarea manualului de politici contabile, întocmirea și depunerea declarațiilor fiscale;",
            "Elaborarea bugetelor de cheltuieli, planurilor de afaceri și previziunilor economice;",
            "Realizarea proiectelor de divizare, fuziune, absorție și planuri de restructurare/reorganizare;",
            "Redactarea contractelor și asistență la încheierea contractelor comerciale;",
            "Asistență și consultanță pentru proiecte realizate prin asociere în participațiune.",
          ].map((item, index) => (
            <li key={index} className="flex mb-2">
              <span className="text-xl text-blue-500">*</span>
              <p className="ml-2">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-yellow-100 p-6 rounded-lg mb-8">
        <h2 className="text-3xl font-semibold mb-4">
          Insolvenței persoanelor juridice
        </h2>
        <p>Abordarea noastră:</p>
        <ul className="list-none pl-6 mt-2">
          {[
            "Evaluăm situația financiară a companiei și identificăm soluțiile de redresare;",
            "Colaborăm îndeaproape cu debitorul, creditori și alte părți interesate pentru elaborarea unui plan de acțiune;",
            "Implementăm măsuri de insolvență eficiente, transparente și conforme cu cadrul legal.",
          ].map((item, index) => (
            <li key={index} className="flex mb-2">
              <span className="text-xl text-yellow-500">*</span>
              <p className="ml-2">{item}</p>
            </li>
          ))}
        </ul>
        <h3 className="text-2xl font-semibold mb-4 mt-6">
          1. Prevenirea insolvenței:
        </h3>
        <ul className="list-none pl-6 mt-2">
          {[
            "Ajutăm companiile să identifice semnele de avertizare ale insolvenței și să ia măsuri preventive;",
            "Oferim asistență în cadrul mandatului ad-hoc sau al concordatului preventiv pentru depășirea crizei.",
          ].map((item, index) => (
            <li key={index} className="flex mb-2">
              <span className="text-xl text-yellow-500">*</span>
              <p className="ml-2">{item}</p>
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold mb-4 mt-6">2. Insolvență:</h3>
        <ul className="list-none pl-6 mt-2">
          {[
            "Îndeplinim rolul de administrator/lichidator judiciar pentru societăți comerciale, fundații, profesioniști și unități administrativ-teritoriale;",
            "Elaborăm planuri de reorganizare și urmărim aprobarea și confirmarea acestora;",
            "Reprezentăm creditorii pentru recuperarea creanțelor de la debitorii aflați în procedura insolvenței;",
            "Îndeplinim rolul de administrator special;",
            "Oferim consultanță administratorilor speciali pentru implementarea managementului în perioada reorganizării sau pentru elaborarea planului de reorganizare.",
          ].map((item, index) => (
            <li key={index} className="flex mb-2">
              <span className="text-xl text-yellow-500">*</span>
              <p className="ml-2">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-green-100 p-6 rounded-lg mb-8">
        <h2 className="text-3xl font-semibold mb-4">
          Servicii juridice pentru recuperarea de creanțe:
        </h2>
        <p>
          Serviciile noastre includ recuperarea creanțelor prin metode amiabile,
          colectare pe teren și reprezentare în instanță;
        </p>
        <ul className="list-none pl-6 mt-2">
          {[
            "Avem la dispoziție o echipă de specialiști cu pregătire și experiență notabilă în domeniul recuperării de creanțe, care vă stau la dispoziție pentru elaborarea unei strategii de recuperare personalizate;",
            "Vă oferim și sistemul de asistență online pentru recuperarea debitelor în mod eficient.",
          ].map((item, index) => (
            <li key={index} className="flex mb-2">
              <span className="text-xl text-green-500">*</span>
              <p className="ml-2">{item}</p>
            </li>
          ))}
        </ul>

        <p className="mt-4">
          Echipa noastră de profesioniști este dedicată oferirii de servicii de
          înaltă calitate pentru a vă sprijini în gestionarea afacerii dvs. și
          în depășirea provocărilor financiare. Ne angajăm să lucrăm în
          parteneriat cu dvs. pentru a vă ajuta să atingeți obiectivele și să vă
          asigurați succesul pe termen lung.
        </p>
      </section>
    </div>
  );
};

export default Servicii;
