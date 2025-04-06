import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex flex-col-reverse  xl:flex-row  justify-start md:gap-[4.5em]  items-center  pt-[2em] pb-[4.5em]">
      <img src="/dl.beatsnoop 1.webp" alt="" />
      <div className=" px-[2em]">
        <Card color="transparent" shadow={false}>
          <Typography className="space-y-[2em]">
            <Typography variant="h2" color="blue-gray">
              Create an account
            </Typography>
            <Typography color="black" className="mt-1 font-normal">
              Enter Your Details Below
            </Typography>
          </Typography>

          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 space-y-[2em] ">
            <Input variant="standard" label="Name" />
            <Input variant="standard" label="Email Or Phone Number" />
            <Input variant="standard" label="Password" />
            <Button className="mt-6 bg-red-700 p-[1em] text-1xl" fullWidth>
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-3 justify-center w-full"
            >
              <img
                src="https://docs.material-tailwind.com/icons/google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
              Sign Up with Google
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link
                as={Link}
                to="/signin"
                className="font-medium text-gray-900"
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
