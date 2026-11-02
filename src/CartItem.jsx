import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace('$', ''));
      return total + costNum * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <h3>Total Amount: ${calculateTotalAmount()}</h3>
      {cart.map((item, index) => (
        <div key={index} style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #ddd', padding: '10px 0', alignItems: 'center' }}>
          <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
          <div>
            <h4>{item.name}</h4>
            <p>Price: {item.cost}</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button onClick={() => item.quantity > 1 ? dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })) : dispatch(removeItem(item.name))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
              <button onClick={() => dispatch(removeItem(item.name))} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={() => alert('Coming Soon!')} style={{ backgroundColor: '#4CAF50', color: 'white' }}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
