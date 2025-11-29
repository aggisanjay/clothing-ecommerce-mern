// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <div className="bg-white rounded-xl shadow-sm border p-8 flex flex-col md:flex-row items-center gap-8">
//         <div className="flex-1 space-y-4">
//           <h1 className="text-3xl font-bold">Welcome to Clothify</h1>
//           <p className="text-gray-600">
//             A simple full-stack clothing store built with MERN. Browse products,
//             add them to your cart, place an order, and receive an email confirmation.
//           </p>
//           <Link
//             to="/products"
//             className="inline-block bg-black text-white px-4 py-2 rounded text-sm"
//           >
//             Start Shopping
//           </Link>
//         </div>
//         <div className="flex-1">
//           <div className="h-56 w-full bg-gray-200 rounded-lg"  />
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm border p-8 flex flex-col md:flex-row items-center gap-8">

        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">Welcome to Clothify</h1>

          <p className="text-gray-600">
            A simple full-stack clothing store built with MERN. Browse products,
            add them to your cart, place an order, and receive an email confirmation.
          </p>

          <Link
            to="/products"
            className="inline-block bg-black text-white px-4 py-2 rounded text-sm"
          >
            Start Shopping
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1">
          <img
            src="https://static.vecteezy.com/system/resources/previews/029/842/365/large_2x/e-commerce-shopping-cart-with-multiple-products-a-sunlit-abstract-background-e-commerce-concept-ai-generative-free-photo.jpg"
            alt="Shopping illustration"
            className="h-56 w-full object-cover rounded-lg"
            loading="lazy"
            onError={(e) => { 
              e.target.src = "https://picsum.photos/600/400";
            }}
          />
        </div>

      </div>
    </div>
  );
}
