// src/context/ProductContext.tsx
import { createContext, FC, ReactNode, useEffect, useReducer, useState } from 'react';
import { Product, ProductContextState, ProductState, ProductAction, CartItem } from '../types/product';
import { productReducer } from '../reducer/productReducer';
import axios from 'axios';

const CART_STORAGE_KEY = 'cart';

const initialState: ProductState = {
    products: [],
    cart: loadCartFromStorage(),
};

export const ProductContext = createContext<ProductContextState>({
    ...initialState,
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    fetchProductById: async () => undefined,
    setSearchQuery: () => { },
    setCategoryFilter: () => { },
    resetFilters: () => { },
    setSortMethod: () => { },
    setMinPrice: () => { },
    setMaxPrice: () => { },
    minPrice: 0,
    maxPrice: 0,
});



function loadCartFromStorage(): CartItem[] {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
}
function saveCartToStorage(cart: Product[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}


const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<ProductState, ProductAction>>(productReducer, initialState);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [sortMethod, setSortMethod] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);

    const getProducts = async () => {
        try {
            const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
            dispatch({ type: 'SET_PRODUCTS', payload: response.data });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        saveCartToStorage(state.cart); // Save cart to local storage whenever it changes
    }, [state.cart]);

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (id: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const fetchProductById = async (id: number): Promise<Product | undefined> => {
        try {
            const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            return undefined;
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleCategoryFilter = (category: string) => {
        setCategoryFilter(category);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setCategoryFilter('');
        setMinPrice(0);
        setMaxPrice(0);
    };

    const handleSortChange = (method: string) => {
        setSortMethod(method);
    };

    const handleMinPriceChange = (value: number) => {
        setMinPrice(value);
    };

    const handleMaxPriceChange = (value: number) => {
        setMaxPrice(value);
    };



    let sortedProducts = [...state.products];

    if (sortMethod === 'name') {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortMethod === 'price') {
        sortedProducts.sort((a, b) => a.price - b.price);
    }

    const filteredProducts = sortedProducts.filter(product =>
        (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (categoryFilter === '' || product.category === categoryFilter) &&
        (minPrice === 0 || product.price >= minPrice) &&
        (maxPrice === 0 || product.price <= maxPrice)
    );



    return (
        <ProductContext.Provider value={ {
            ...state, products: filteredProducts, addToCart, removeFromCart, clearCart, fetchProductById, setSearchQuery: handleSearch, setCategoryFilter: handleCategoryFilter, resetFilters, setSortMethod: handleSortChange, setMinPrice: handleMinPriceChange, minPrice, maxPrice,
            setMaxPrice: handleMaxPriceChange
        } }>
            { children }
        </ProductContext.Provider>
    );
};

export default ProductProvider;
