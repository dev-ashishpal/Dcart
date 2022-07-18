import React from 'react';
import useCart from '../../hooks/useCart';

const Cart = () => {
	const [cart, setCart] = useCart();
	console.log(cart);
	return (
		<div>
			this is cart.
		</div>
	)
}

export default Cart;