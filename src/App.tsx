import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Team from "./components/Team";
import ContactForm from "./components/ContactForm";
import Servicii from "./components/Servicii";
import PortofoliiActuale from "./components/PortofoliiActuale";
import Footer from "./components/Footer";
import Insolventa from "./components/Insolventa";
import PropertyPage from "./components/PropertyPage";
import PropertyListPage from "./components/PropertyListPage";
import AddPropertyPage from "./components/AddPropertyPage";
import LoginPage from "./components/LoginPage";
import AdminPropertyListPage from "./components/AdminPropertyListPage";
import EditPropertyPage from "./components/EditPropertyPage";
import AdminCompaniesPage from "./components/AdminCompanies";
import PrivateRoute from "./components/PrivateRoute";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPropertyListPage />} />
      <Route path="/edit-property/:id" element={<EditPropertyPage />} />
      <Route path="/companies" element={<AdminCompaniesPage />} />
      <Route path="/add-property" element={<AddPropertyPage />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/servicii" element={<Servicii />} />
            <Route path="/portofolii-actuale" element={<PortofoliiActuale />} />
            <Route path="/insolventa" element={<Insolventa />} />
            <Route path="/property/:id" element={<PropertyPage />} />
            <Route path="/properties" element={<PropertyListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/*" element={<PrivateRoute path="/admin/*" element={<AdminRoutes />} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
