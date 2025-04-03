const About = () => {
  return (
    <>
      <div className="flex gap-3 mt-5 container md:justify-start justify-center">
        <button onClick={() => navigate("/")} className="text-gray-400">Home</button>
        <span>/</span>
        <button className="font-medium">About</button>
      </div>

      <div className="flex flex-col md:flex-row my-5 gap-5 container">
        <div className="md:w-1/2 flex justify-center flex-col mx-5 ps-15 gap-3">
          <h1 className="mb-5">Our Story</h1>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/rightSide.png" alt="Our Story" className="w-full" />
        </div>
      </div>

      <div className="container flex flex-wrap gap-4 justify-center mb-5">
        <div className="flex flex-col border border-gray-500 rounded items-center justify-center gap-3 hover:bg-red-600 hover:text-white p-4" style={{ width: "270px", height: "230px" }}>
          <img src="/Services.png" className="w-15 h-15" alt="Sallers active our site" />
          <h1>10.5k</h1>
          <p className="text-sm">Sallers active our site</p>
        </div>
        <div className="flex flex-col border border-gray-500 rounded items-center justify-center gap-3 hover:bg-red-600 hover:text-white p-4" style={{ width: "270px", height: "230px" }}>
          <img src="/saleRange.png" className="w-15 h-15" alt="Monthly Product Sale" />
          <h1>33k</h1>
          <p className="text-sm">Monthly Product Sale</p>
        </div>
        <div className="flex flex-col border border-gray-500 rounded items-center justify-center gap-3 hover:bg-red-600 hover:text-white p-4" style={{ width: "270px", height: "230px" }}>
          <img src="/activeCustomers.png" className="w-15 h-15" alt="Customer active in our site" />
          <h1>45.5k</h1>
          <p className="text-sm">Customer active in our site</p>
        </div>
        <div className="flex flex-col border border-gray-500 rounded items-center justify-center gap-3 hover:bg-red-600 hover:text-white p-4" style={{ width: "270px", height: "230px" }}>
          <img src="/money.png" className="w-15 h-15" alt="Annual gross sale in our site" />
          <h1>25k</h1>
          <p className="text-sm">Annual gross sale in our site</p>
        </div>
      </div>

      <div className="container flex flex-wrap gap-5 justify-center mb-12">
        <div className="card border-0 flex flex-col items-center">
          <img src="/owner1.png" alt="Tom Cruise" className="w-full" />
          <div className="flex flex-col gap-3 text-center">
            <h2 className="mt-3 text-3xl">Tom Cruise</h2>
            <p className="text-sm">Founder & Chairman</p>
            <div className="flex gap-3 justify-center">
              <img src="/Icon-Twitter.png" className="w-5 h-5" alt="Twitter" />
              <img src="/icon-instagram.png" className="w-5 h-5" alt="Instagram" />
              <img src="/Icon-Linkedin.png" className="w-5 h-5" alt="LinkedIn" />
            </div>
          </div>
        </div>
        <div className="card border-0 flex flex-col items-center">
          <img src="/owner2.png" alt="Emma Watson" className="w-full" />
          <div className="flex flex-col gap-3 text-center">
            <h2 className="mt-3 text-3xl">Emma Watson</h2>
            <p className="text-sm">Managing Director</p>
            <div className="flex gap-3 justify-center">
              <img src="/Icon-Twitter.png" className="w-5 h-5" alt="Twitter" />
              <img src="/icon-instagram.png" className="w-5 h-5" alt="Instagram" />
              <img src="/Icon-Linkedin.png" className="w-5 h-5" alt="LinkedIn" />
            </div>
          </div>
        </div>
        <div className="card border-0 flex flex-col items-center">
          <img src="/owner3.png" alt="Will Smith" className="w-full" />
          <div className="flex flex-col gap-3 text-center">
            <h2 className="mt-3 text-3xl">Will Smith</h2>
            <p className="text-sm">Product Designer</p>
            <div className="flex gap-3 justify-center">
              <img src="/Icon-Twitter.png" className="w-5 h-5" alt="Twitter" />
              <img src="/icon-instagram.png" className="w-5 h-5" alt="Instagram" />
              <img src="/Icon-Linkedin.png" className="w-5 h-5" alt="LinkedIn" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-8 p-4">
        <div className="flex flex-col items-center text-center mb-4 md:mb-0 md:w-1/3">
          <img src="/bus.png" className="w-16 h-16 mb-4" alt="FREE AND FAST DELIVERY" />
          <h5 className="font-bold">FREE AND FAST DELIVERY</h5>
          <p className="text-sm">Free delivery for all orders over $140</p>
        </div>
        <div className="flex flex-col items-center text-center mb-4 md:mb-0 md:w-1/3">
          <img src="/headphone.png" className="w-16 h-16 mb-4" alt="24/7 CUSTOMER SERVICE" />
          <h5 className="font-bold">24/7 CUSTOMER SERVICE</h5>
          <p className="text-sm">Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col items-center text-center mb-4 md:mb-0 md:w-1/3">
          <img src="/moneyBack.png" className="w-16 h-16 mb-4" alt="MONEY BACK GUARANTEE" />
          <h5 className="font-bold">MONEY BACK GUARANTEE</h5>
          <p className="text-sm">We return money within 30 days</p>
        </div>
      </div>
    </>
  );
};

export default About;