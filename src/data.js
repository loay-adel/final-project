import blackBag from  './assets/Product/woman/bags/backpack/one/black/Classic Leather Backpack.jpg';
import blackBag1 from './assets/Product/woman/bags/backpack/one/black/Classic Leather_black_2.jpg';
import blackBag2 from './assets/Product/woman/bags/backpack/one/black/Classic Leather_black_3.jpg';
import blackBag3 from './assets/Product/woman/bags/backpack/one/black/Classic Leather_black_4.jpg';
import blackBag4 from './assets/Product/woman/bags/backpack/one/black/Classic Leather_black_5.jpg';


const products = {
  "womanFashion": {
    "bags": {
      "backpack": [
        {
          "id": 1,
          "name": "Classic Leather Backpack",
          "brand": "Samsonite",
          "price": "49,9",
          "currency": "EGP",
          "material": "Leather",
          "dimensions": {
            "height": "40cm",
            "width": "30cm",
            "depth": "12cm"
          },
          "features": [
            "Full-sized deluxe backpack",
            "Padded airmesh panels on back",
            "SmartSleeve™ for ease of use while traveling",
            "Padded laptop compartment",
            "Tech pockets for phone and tablet",
            "File storage"
          ],
          "color": {
            "black": {
              "colorCode": "#000000",
              "img": [blackBag,blackBag1,blackBag2,blackBag3,blackBag4]
            }
          },
          "description": "Keep your business essentials organized and close at hand in the Samsonite Classic Leather commuter backpack. Designed with busy professionals in mind, it features a padded laptop compartment, file storage, and tech pockets for your phone and tablet. It's equipped with padded back panels and comfortable shoulder straps so carrying it is a breeze.",
          "rating": 4.7
        }
        
      ],
      "handbag": [
        {
          "id":1,
          "name":"mostafa mahmoud",
          "brand":"human",
          "price":200,
          "description":"lol"
        }
      ],
      "CrossbodyBag": {},
      "ClutchBag": {},
      "SaddleBag": {},
      "ToteBag": {}
    },
    "Shoes": {}
  },
  "MenFashion": {
    "Clothing": {},
    "Shoes": {},
    "Accessories": {}
  },
  "Electronics": {
    "Mobiles": {},
    "Laptops": {},
    "Accessories": {}
  },
  "Home": {
    "Furniture": {},
    "Kitchen": {},
    "Decor": {}
  },
  "Medicine": {},
  "Sports": {},
  "BabysAndToys": {},
  "Groceries": {},
  "HealthAndBeauty": {}
};

export default products;
