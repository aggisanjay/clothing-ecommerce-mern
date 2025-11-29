import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    "name": "V-MART Solid Men Round Neck White T-Shirt",
    "description": "Pure cotton solid round neck t-shirt for casual wear.",
    "price": 299,
    "image": "https://rukminim2.flixcart.com/image/300/300/xif0q/t-shirt/1/i/p/m-636149-v-mart-original-imagtjj6r9fhbvpz.jpeg?q=90",
    "category": "Men",
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "stock": 4
  },
  {
    "name": "Levi's 511 Slim Fit Jeans - Dark Blue",
    "description": "Slim fit stretchable jeans with mid rise for everyday style.",
    "price": 3499,
    "image": "https://levi.in/cdn/shop/files/182981377_01_Front_e6457225-c467-4f7c-bc70-92ea79d6661d.jpg?v=1740488425",
    "category": "Men",
    "sizes": ["30", "32", "34", "36"],
    "stock": 50
  },
  {
    "name": "H&M Oversized Zip-Through Hoodie - Light Grey Marl",
    "description": "Oversized hoodie in sweatshirt fabric with kangaroo pocket.",
    "price": 1799,
    "image": "https://tse2.mm.bing.net/th/id/OIP.QIvKhgF0eqj5b8ty5rAAnQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Women",
    "sizes": ["XS", "S", "M", "L", "XL"],
    "stock": 30
  },
  {
    "name": "Roadster Anti Fits Oversized Sweatshirt - Black",
    "description": "Oversized hoodie sweatshirt for casual streetwear look.",
    "price": 791,
    "image": "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/15927350/2022/11/4/e6c835ff-6f9f-47ba-a1d7-cb119d5d7ef61667558007631-abof-Women-Navy-Blue-Hooded-Sweatshirt-5731667558007011-1.jpg",
    "category": "Women",
    "sizes": ["S", "M", "L", "XL"],
    "stock": 35
  },
  {
    "name": "Jack & Jones Glenn Slim Fit Jeans - Dark Wash",
    "description": "5-pocket slim fit jeans with stretch for comfort.",
    "price": 2799,
    "image": "https://media.very.co.uk/i/very/VKO5S_SQ2_0000000265_MID_WASH_MDb?$pdp_300x400_x2$&fmt=jpg",
    "category": "Men",
    "sizes": ["30", "32", "34", "36"],
    "stock": 25
  },
  {
    "name": "Pepe Jeans Men White V Neck T-Shirt",
    "description": "95% cotton 5% elastane V-neck short sleeve t-shirt.",
    "price": 1249,
    "image": "https://tse3.mm.bing.net/th/id/OIP.45VJHJxGiUBTVtPc5u_0hwHaJT?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Men",
    "sizes": ["S", "M", "L", "XL"],
    "stock": 40
  },
  {
    "name": "Puma Women's Oversized Hoodie - Grey",
    "description": "Recycled polyester oversized hoodie with drawstring hood.",
    "price": 2199,
    "image": "https://tse1.mm.bing.net/th/id/OIP.cdHC2fB690J-9wOmbbBwVAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Women",
    "sizes": ["XS", "S", "M", "L", "XL"],
    "stock": 28
  },
  {
    "name": "Wrangler Men's Cargo Pants - Khaki",
    "description": "Slim fit cargo pants with multiple utility pockets.",
    "price": 1899,
    "image": "https://i5.walmartimages.com/asr/58958372-278d-4ae1-a04f-80ae81449ef6.84d397453d6a50e83c3de59717ed1f41.jpeg",
    "category": "Men",
    "sizes": ["30", "32", "34", "36"],
    "stock": 32
  },
  {
    "name": "Sassafras Women Navy Fleece Hoodie",
    "description": "Oversized fleece hoodie with kangaroo pocket.",
    "price": 1299,
    "image": "https://tse4.mm.bing.net/th/id/OIP.XhKG2rslEj8vhO7ms1aSZQHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Women",
    "sizes": ["S", "M", "L", "XL"],
    "stock": 22
  },
  {
    "name": "Mufti Men's Slim Fit Blue Jeans",
    "description": "Stretch denim slim fit jeans with distressed detailing.",
    "price": 2399,
    "image": "https://tse1.mm.bing.net/th/id/OIP.o8Mgkjp05ETc6KQ-Z1gcCwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Men",
    "sizes": ["30", "32", "34", "36"],
    "stock": 45
  },
  {
    "name": "Jockey Men Round Neck White T-Shirt",
    "description": "Pure cotton breathable round neck t-shirt.",
    "price": 399,
    "image": "https://5.imimg.com/data5/ECOM/Default/2023/10/349148671/IN/GA/KF/8221005/2714-wht-1000x1000.jpg",
    "category": "Men",
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "stock": 60
  },
  {
    "name": "Zara Men Slim Fit Black Jeans",
    "description": "5-pocket slim fit jeans in stretch cotton blend.",
    "price": 2999,
    "image": "https://static.zara.net/photos/2023/V/0/2/p/8062/475/800/2/w/375/8062475800_2_1_1.jpg?ts=1673354227295",
    "category": "Men",
    "sizes": ["30", "32", "34"],
    "stock": 18
  },
  {
    "name": "Marks & Spencer Oversized Fleece Hoodie",
    "description": "Warm fleece oversized hoodie for winter wear.",
    "price": 2499,
    "image": "https://dynamic.zacdn.com/bz8GWmGfLWykBPLY6Ncr8yfd6oE=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/marks-spencer-5992-6557484-1.jpg",
    "category": "Unisex",
    "sizes": ["S", "M", "L", "XL"],
    "stock": 15
  },
  {
    "name": "Vishal Mega Mart Striped Polo Shirt",
    "description": "Cotton blend striped polo shirt with 2-button placket.",
    "price": 269,
    "image": "https://www.vishalmegamart.com/on/demandware.static/-/Sites-vmm-apparel-master-catalog/default/dwabc64996/images/large/1114116333006.jpg",
    "category": "Men",
    "sizes": ["M", "L", "XL"],
    "stock": 38
  },
  {
    "name": "Myntra Bodycon Black Dress",
    "description": "Stretch fabric bodycon dress for evening wear.",
    "price": 1599,
    "image": "https://tse2.mm.bing.net/th/id/OIP.N1T_wTGmggVd6tHmM69DtAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Women",
    "sizes": ["S", "M", "L"],
    "stock": 27
  },
  {
    "name": "Roadster Kids Graphic T-Shirt",
    "description": "Fun graphic print cotton t-shirt for kids.",
    "price": 399,
    "image": "https://tse3.mm.bing.net/th/id/OIP.2N89A9-CpmV86M7m5twbqAHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Kids",
    "sizes": ["4-5", "6-7", "8-9"],
    "stock": 55
  },
  {
    "name": "Pant Project Chinos Slim Fit - Beige",
    "description": "Power-stretch slim fit chinos for office casual.",
    "price": 1799,
    "image": "https://tse1.mm.bing.net/th/id/OIP.argWVHWayn-4xpJrGLO9CgHaIr?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Men",
    "sizes": ["30", "32", "34"],
    "stock": 42
  },
  {
    "name": "HRX Sports Joggers - Navy Blue",
    "description": "Quick-dry fabric joggers for workouts.",
    "price": 999,
    "image": "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/18204222/2024/7/19/730949ae-d139-4285-bfcc-dcf202f8ff2c1721381205413-HRX-by-Hrithik-Roshan-Men-Navy-Blue-Pure-Cotton-Solid-Jogger-1.jpg",
    "category": "Men",
    "sizes": ["S", "M", "L", "XL"],
    "stock": 48
  },
  {
    "name": "Monte Carlo Formal Shirt - White",
    "description": "Slim-fit formal cotton shirt for office wear.",
    "price": 999,
    "image": "https://tse3.mm.bing.net/th/id/OIP.7tyYJAcrpco5ClpDq_VqagHaKH?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Men",
    "sizes": ["M", "L", "XL"],
    "stock": 52
  },
  {
    "name": "Biba Printed Kurti - Multi Color",
    "description": "Ethnic printed cotton kurti with modern fit.",
    "price": 899,
    "image": "https://tse4.mm.bing.net/th/id/OIP.HzTiw4tutFr7vbFaCg5RMgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Women",
    "sizes": ["S", "M", "L", "XL"],
    "stock": 46
  }
]


const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedProducts();
