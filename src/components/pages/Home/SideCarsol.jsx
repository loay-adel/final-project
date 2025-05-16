import { List, ListItem, Card } from "@material-tailwind/react";
import {
  Carousel,
  IconButton,
  Rating,
  Typography,
  Button,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

const SideCarsol = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-20 md:mb-0 lg:h-[45vh]">
      <aside className="lg:col-span-1 w-full max-w-[250px] hidden lg:block h-full">
        <Card className="w-full h-fit shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 font-semibold text-gray-800 text-lg">
            Categories
          </div>
          <List className="divide-y divide-gray-200">
            {["Men", "Women", "Electronics", "Food", "Furniture"].map(
              (category, index) => (
                <Link
                  key={index}
                  to={`/show-products/${category
                    .toLowerCase()
                    .replace(" & ", "-")}`}
                  className="block"
                >
                  <ListItem className="px-5 py-3 hover:bg-gray-200 transition-all duration-200 text-gray-700 font-medium hover:text-gray-900">
                    {category}
                  </ListItem>
                </Link>
              )
            )}
          </List>
        </Card>
      </aside>
      <div className="lg:col-span-3 h-[45vh] -z-10">
        <Carousel
          autoplay
          loop
          prevArrow={() => <></>}
          nextArrow={() => <></>}
          className="rounded-xl h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80"
            loading="lazy"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
            loading="lazy"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
            loading="lazy"
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>
    </div>
  );
};

export default SideCarsol;
