// AddToCartButton.tsx

import React, { useContext } from 'react';
import { Product } from '../../types/product';
import { ProductContext } from '../../context/productContext';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
    product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const { cart, addToCart, removeFromCart } = useContext(ProductContext);
    const isInCart = cart.some(item => item.id === product.id);

    const handleToggleCart = () => {
        if (isInCart) {
            toast.success("Product has been removed");
            removeFromCart(product.id)
        } else {
            toast.success("Product has been added");
            addToCart(product);
        }
    };

    return (
        <button onClick={ handleToggleCart } className='bg-gray-200 p-2 rounded-md font-semibold'>
            { isInCart ? 'Remove from Cart' : 'Add to Cart' }
        </button>
    );
};

export default AddToCartButton;
