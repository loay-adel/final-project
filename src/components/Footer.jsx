import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const SITEMAP = [
    {
      title: "exclusive",
      links: ["Subscribe", "Get 10% off your first order"],
    },
    {
      title: "Help Center",
      links: ["+20(1123456789)", "Location", "GitHub", "Contact Us"],
    },
    {
      title: "ACCOUNT",
      links: [
        { name: "My Account", to: "/account" },
        { name: "Login / Register", to: "/signin" },
        { name: "Cart", to: "/cart" },
        { name: "Wishlist", to: "/wishlist" },
        { name: "Shop", to: "/product" },
        { name: "admin panel", to: "/admin-signin" },
      ],
    },
    {
      title: "Quick Link",
      links: ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"],
    },
  ];

  const [email, setEmail] = useState("");
  const onChange = ({ target }) => setEmail(target.value);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black">
      <div className="mx-auto w-full max-w-7xl px-8 text-white">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="w-full">
            <Typography
              variant="small"
              color="white"
              className="mb-4 font-bold uppercase text-xl"
            >
              exclusive
            </Typography>
            <ul className="space-y-1">
              <Typography as="li" className="font-normal text-white">
                Subscribe
              </Typography>
              <Typography as="li" className="font-normal">
                Get 10% off your first order
              </Typography>
            </ul>
            <div className="relative flex w-full max-w-[24rem] mt-6">
              <Input
                type="email"
                label="Email Address"
                color="white"
                variant="standard"
                placeholder="type your email"
                value={email}
                onChange={onChange}
                className="pr-20 border-none text-white"
                containerProps={{ className: "min-w-0" }}
              />
              <Button
                size="sm"
                color={email ? "default" : "gray"}
                disabled={!email}
                className="!absolute right-1 top-1 rounded"
              >
                Send
              </Button>
            </div>
          </div>

          {SITEMAP.slice(1).map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <Typography
                variant="small"
                className="mb-4 font-bold uppercase text-xl"
              >
                {title}
              </Typography>
              <ul className="space-y-1">
                {links.map((link, key) => (
                  <Typography key={key} as="li" className="font-normal">
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        disabled
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                      >
                        {link}
                      </a>
                    )}
                  </Typography>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            color="white"
            className="mb-4 text-center font-normal  md:mb-0"
          >
            &copy; {currentYear} Momentom Maker
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography
              as="a"
              href="#"
              color="white"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaFacebookF />
            </Typography>
            <Typography
              as="a"
              href="#"
              color="white"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaInstagram />
            </Typography>
            <Typography
              as="a"
              href="#"
              color="white"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaXTwitter />
            </Typography>
            <Typography
              as="a"
              href="#"
              color="white"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaLinkedinIn />
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
