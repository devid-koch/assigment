import { useContext, useState } from "react";
import { ProductContext } from "../../context/productContext";
import { CATEGORIES } from "../../data/constants";
import PriceRangeFilter from "../priceFilter/PriceRangeFilter";


const Category: React.FC = () => {
  const { setCategoryFilter, resetFilters } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryFilterChange = (category: string) => {
    setSelectedCategory(category)
    setCategoryFilter(category);
  };

  const handleResetFilters = () => {
    resetFilters();
    setSelectedCategory("");
  };

  // const categories = [...new Set(products.map(product => product.category))];
  // const categories = products.length > 0 ? [...new Set(products.map(product => product.category))] : [];
  return (
    <div className="w-full">
      <p className="font-semibold pb-5">Filter by Category</p>
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          { CATEGORIES.map((category: string, index: number) => (
            <li
              key={ index }
              onClick={ () => handleCategoryFilterChange(category) }
              className={ `${selectedCategory === category && "font-bold"} capitalize cursor-pointer border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between` }
            >
              { category }
            </li>
          )) }
        </ul>
        <div className="py-10">
          <PriceRangeFilter />
        </div>
        <button onClick={ handleResetFilters } className="bg-gray-200 p-2 rounded-md">Reset Filter</button>
      </div>
    </div>
  );
};

export default Category;
