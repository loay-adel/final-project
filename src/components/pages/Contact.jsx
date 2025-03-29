import img1 from "../../assets/contact_img/icons-phone.png";
import img2 from "../../assets/contact_img/icons-mail.png";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const sentMessage = (event) => {
    event.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* مسافة قبل Home/Contact */}
      <div className="mt-10"></div>

      <div className="flex gap-3 text-lg mb-10">
        <button onClick={() => navigate("/")} className="text-gray-400">
          Home
        </button>
        <span>/</span>
        <button className="font-medium">Contact</button>
      </div>

      {/* إضافة مسافة بين Home/Contact و الـ divين تحت */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 p-6 shadow-md bg-white rounded-lg text-lg py-10">
          <div className="flex gap-3 items-center mb-6">
            <img src={img1} alt="phone" className="w-8 h-8" />
            <p className="font-semibold">Call To Us</p>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p className="border-b pb-4 border-gray-300">Phone: +8801611112222</p>

          <div className="flex gap-3 items-center my-6">
            <img src={img2} alt="email" className="w-8 h-8" />
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
              className="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              id="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Your Email"
              required
            />
            <input
              type="tel"
              id="phone"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Your Phone"
              required
            />
          </div>

          <form className="w-full mx-auto">
            <textarea
              id="message"
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
