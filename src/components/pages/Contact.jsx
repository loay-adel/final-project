import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const sentMessage = (event) => {
    event.preventDefault();

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address.",
        icon: "error",
      });
      return;
    }

    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid phone number.",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Good job!",
      text: "Message sent successfully!",
      icon: "success",
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mt-10"></div>

      <div className="flex gap-3 text-lg mb-10">
        <Link to="/" className="text-gray-400">Home</Link>
      
        <span>/</span>
        <button className="font-medium">Contact</button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 p-6 shadow-md bg-white rounded-lg text-lg py-10">
          <div className="flex gap-3 items-center mb-6">
            <img src="/icons-phone.png" alt="phone" className="w-8 h-8" />
            <p className="font-semibold">Call To Us</p>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p className="border-b pb-4 border-gray-300">Phone: +8801611112222</p>

          <div className="flex gap-3 items-center my-6">
            <img src="/icons-mail.png" alt="email" className="w-8 h-8" />
            <p className="font-semibold">Write To Us</p>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Email: customer@exclusive.com</p>
          <p>Email: support@exclusive.com</p>
        </div>

        <div className="md:w-2/3 shadow-md p-8 bg-white rounded-lg text-lg py-10">
          <div className="flex flex-col md:flex-row w-full gap-4 mb-6">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Your Email"
              required
            />
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Your Phone"
              required
            />
          </div>

          <form className="w-full mx-auto">
            <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="6"
              className="block p-3 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Message"
            ></textarea>
          </form>

          <div className="flex justify-end">
            <button
              onClick={sentMessage}
              className="text-white rounded mt-6 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-lg w-full sm:w-auto px-6 py-4 text-center"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
