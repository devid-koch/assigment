import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import Pagination from "../components/pagination";
import ShopSideNav from "../components/shopBy/ShopSideNav";

export default function Home() {
  const { products } = useContext(ProductContext);

  if (!products) {
    return <div className="w-full flex items-center justify-center text-2xl py-28">Loading...</div>;
  }

  return <div className="w-full flex items-center overflow-hidden">
    <div className="w-1/5 p-10">
      <ShopSideNav />
    </div>
    <Pagination items={ products } itemsPerPage={ 12 } />
  </div>
}
