import { useContext } from 'react';
import { ProductContext } from '../../context/productContext';

const PriceRangeFilter = () => {
    const { setMinPrice, setMaxPrice, minPrice, maxPrice } = useContext(ProductContext);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setMaxPrice(value);
    };
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
                <label htmlFor="minPrice">Min Price:</label>
                <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={ minPrice }
                    className='border w-20'
                    onChange={ handleMinPriceChange }
                />
            </div>
            <div className='flex items-center gap-2'>
                <label htmlFor="maxPrice">Max Price:</label>
                <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={ maxPrice }
                    className='border w-20'
                    onChange={ handleMaxPriceChange }
                />
            </div>
        </div>
    );
};

export default PriceRangeFilter;
