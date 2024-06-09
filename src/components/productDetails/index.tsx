// src/components/SingleProduct.tsx
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/productContext';
import { Product } from '../../types/product';
import { useParams } from 'react-router';
import RatingStars from '../ui/rating';
import AddToCartButton from '../ui/cartButton';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { fetchProductById } = useContext(ProductContext);
    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const productId = parseInt(id, 10);
                const fetchedProduct = await fetchProductById(productId);
                setProduct(fetchedProduct);
            }

        };

        fetchProduct();
    }, [fetchProductById, id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full flex items-center justify-center py-24">
            <div className="w-full flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/2 bg-cover" style={ { backgroundImage: `url(${product.image})` } }>
                </div>
                <div className="w-1/2 p-4">
                    <h1 className="text-gray-900 font-bold text-2xl">{ product.title }</h1>
                    <p className='capitalize'>Category: { product.category }</p>
                    <p className="mt-2 text-gray-600 text-sm">{ product.description }</p>
                    <div className="flex item-center mt-2">
                        <RatingStars rating={ product.rating.rate } />
                    </div>
                    <div className="flex item-center justify-between mt-3">
                        <h1 className="text-gray-700 font-bold text-xl">Rs: { product.price }</h1>
                        <AddToCartButton product={ product } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
