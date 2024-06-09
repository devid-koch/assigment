import React, { useContext } from 'react';
import { ProductContext } from '../../context/productContext';

const Cart: React.FC = () => {
    const { cart, removeFromCart, clearCart } = useContext(ProductContext);

    console.log("cart", cart);


    return (
        <div>
            <h2>Cart</h2>
            <ul>
                { cart.map(item => (
                    <li key={ item.id }>
                        { item.name } - ${ item.price } (Quantity: { item.quantity })
                        <button onClick={ () => removeFromCart(item.id) }>Remove</button>
                    </li>
                )) }
            </ul>
            <button onClick={ clearCart }>Clear Cart</button>
        </div>
    );
};

export default Cart;