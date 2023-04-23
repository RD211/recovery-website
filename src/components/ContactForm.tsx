import React, { useState } from "react";
import supabase from "../supabaseClient.js";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      setErrors({ ...errors, [e.target.name]: !validateEmail(e.target.value) });
    } else {
      setErrors({ ...errors, [e.target.name]: e.target.value.trim() === "" });
    }
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((value) => value.trim() !== "") &&
      validateEmail(formData.email)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(supabase);
    const { data, error } = await supabase.functions.invoke(
      "send-email-sendgrid",
      {
        body: JSON.stringify({
          subject: formData.subject,
          body:
            "Email from:" +
            formData.name +
            " " +
            formData.email +
            "\n" +
            formData.message,
        }),
      }
    );

    // Display an alert with the result
    if (error) {
      alert("S-a intamplat o eroare. Trimite un email direct la adresa.");
    }
    if (data) {
      alert("Email trimis!");
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Contactează-ne</h1>
      <div className="flex flex-wrap justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-md bg-white p-6 rounded shadow-md"
        >
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Nume
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-1 font-semibold">
              Subiect
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full border ${
                errors.subject ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-semibold">
              Mesaj
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
              rows={5}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
            disabled={!isFormValid()}
          >
            Trimite
          </button>
        </form>
        <div className="w-full max-w-md mt-8 md:mt-0 md:ml-8">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Locația Noastră
            </h2>
            <p className="text-center mb-4">
              STR. CALUSEI nr.21A, PARTER, BUCURESTI, SECTOR 2
            </p>
            <div className="w-full h-64 overflow-hidden rounded">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.830568147119!2d26.15980331549457!3d44.45195697910219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4c6d0c6a5d%3A0x3f3a3d3d3a3d3d3d!2sStrada%20C%C4%83lu%C8%99ei%2021A%2C%20Bucure%C8%99ti%20021642!5e0!3m2!1sen!2sro          !4v1674327271844!5m2!1sen!2sro"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Our Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
