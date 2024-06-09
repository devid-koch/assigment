import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./productCard";
import { ProductContext } from "../context/productContext";

interface Item {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
  }
}

interface Props {
  items: any,
  itemsPerPage: number;
}


const Items: React.FC<{ currentItems: Item[] }> = ({ currentItems }) => {

  return (
    <>
      { currentItems.map((item: any) => (
        <div key={ item.id } className="w-full">
          <ProductCard product={ item } />
        </div>
      )) }
    </>
  );
};

const Pagination: React.FC<Props> = ({ items, itemsPerPage }) => {
  const { setSortMethod } = useContext(ProductContext);

  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortMethod = event.target.value;
    setSortMethod(selectedSortMethod);
  };

  return (
    <div className="m-28 p-5 border rounded-md overflow-hidden">
      <select className="border border-black" onChange={ handleSortChange }>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10 max-h-[28rem] overflow-auto">
        <Items currentItems={ currentItems } />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={ handlePageClick }
          pageRangeDisplayed={ 3 }
          marginPagesDisplayed={ 2 }
          pageCount={ pageCount }
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-2"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from { itemStart === 0 ? 1 : itemStart } to { endOffset } of{ " " }
          { items.length }
        </p>
      </div>
    </div>
  );
};

export default Pagination;
