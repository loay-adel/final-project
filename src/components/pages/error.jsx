import { Link } from "react-router-dom";
import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FaFlag } from "react-icons/fa6";
const Error = () => {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FaFlag className="w-20 h-20 mx-auto" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl font-mainFont"
        >
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className=" font-mainFont mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing the
          page or come back later.
        </Typography>
        <Link as={Link} to="/">
          <Button
            color="gray"
            className="font-mainFont w-full px-4 md:w-[8rem] bg-main"
          >
            back home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
