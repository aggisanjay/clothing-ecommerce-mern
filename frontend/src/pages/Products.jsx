// import { useEffect, useState } from "react";
// import api from "../services/api";
// import ProductCard from "../components/ProductCard";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const params = {};
//       if (search) params.search = search;
//       if (category && category !== "All") params.category = category;
//       if (minPrice) params.minPrice = minPrice;
//       if (maxPrice) params.maxPrice = maxPrice;
//       const res = await api.get("/products", { params });
//       setProducts(res.data);
//     };

//     fetchProducts();
//   }, [search, category, minPrice, maxPrice]);

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
//       <div className="bg-white rounded-lg border p-4 flex flex-wrap gap-3 items-center">
//         <input
//           placeholder="Search products..."
//           className="border rounded px-3 py-1 text-sm flex-1 min-w-[150px]"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="border rounded px-3 py-1 text-sm"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">All categories</option>
//           <option>Men</option>
//           <option>Women</option>
//           <option>Kids</option>
//           <option>Accessories</option>
//           <option>Unisex</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Min price"
//           className="border rounded px-3 py-1 text-sm w-24"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Max price"
//           className="border rounded px-3 py-1 text-sm w-24"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//         />
//       </div>

//       <div className="grid md:grid-cols-3 gap-4">
//         {products.map((p) => (
//           <ProductCard key={p._id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Products() {

  const [products,setProducts] = useState([]);

  const [page,setPage] = useState(1);
  const [pages,setPages] = useState(1);

  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("");
  const [minPrice,setMinPrice] = useState("");
  const [maxPrice,setMaxPrice] = useState("");

  useEffect(()=>{

    const load = async()=>{
      const params = {
        page,
        limit:12
      };

      if(search) params.search=search;
      if(category && category!=="All") params.category=category;
      if(minPrice) params.minPrice=minPrice;
      if(maxPrice) params.maxPrice=maxPrice;

      const res = await api.get("/products",{params});

      setProducts(res.data.products);
      setPages(res.data.pages);
    };

    load();

  },[page,search,category,minPrice,maxPrice]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

    {/* PAGE HEADER */}
    <div className="text-center space-y-1">
      <h1 className="text-3xl font-bold">
        Our Products
      </h1>
      <p className="text-gray-500 text-sm">
        Browse, filter and find your perfect outfit
      </p>
    </div>

    {/* FILTER BAR */}
    <div className="bg-white border p-4 rounded flex flex-wrap gap-3">

      <input
        placeholder="Search..."
        className="border px-3 py-1 rounded"
        onChange={e=>{
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <select
        className="border px-3 py-1 rounded"
        onChange={e=>{
          setCategory(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All</option>
        <option>Men</option>
        <option>Women</option>
        <option>Kids</option>
        <option>Unisex</option>
      </select>

      <input
        placeholder="Min ₹"
        type="number"
        className="border px-3 py-1 rounded w-24"
        onChange={e=>{
          setMinPrice(e.target.value);
          setPage(1);
        }}
      />

      <input
        placeholder="Max ₹"
        type="number"
        className="border px-3 py-1 rounded w-24"
        onChange={e=>{
          setMaxPrice(e.target.value);
          setPage(1);
        }}
      />

    </div>

    {/* PRODUCT GRID */}
    <div className="grid md:grid-cols-3 gap-4">
      {products.map(p=>(
        <ProductCard key={p._id} product={p}/>
      ))}
    </div>

    {/* PAGINATION */}
    <div className="flex justify-center items-center gap-5 mt-4">

      <button
        onClick={()=>setPage(p=>Math.max(1,p-1))}
        disabled={page===1}
        className="border px-3 py-1 rounded disabled:opacity-40"
      >
        <ChevronLeft size={18}/>
      </button>

      <span className="text-sm">
        Page {page} / {pages}
      </span>

      <button
        onClick={()=>setPage(p=>Math.min(pages,p+1))}
        disabled={page===pages}
        className="border px-3 py-1 rounded disabled:opacity-40"
      >
        <ChevronRight size={18}/>
      </button>

    </div>
  </div>
  )

}
