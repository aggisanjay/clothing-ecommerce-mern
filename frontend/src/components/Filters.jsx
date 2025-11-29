export default function Filters({search,setSearch,setCategory}){

 return(
  <div className="flex gap-3">

   <input
     className="border p-2"
     placeholder="Search..."
     onChange={e=>setSearch(e.target.value)}
   />

   <select
     onChange={e=>setCategory(e.target.value)}
     className="border p-2"
   >
     <option>All</option>
     <option>Men</option>
     <option>Women</option>
     <option>Kids</option>
   </select>

  </div>
 )
}
