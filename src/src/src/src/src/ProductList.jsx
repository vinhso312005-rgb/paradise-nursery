import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892284-7832e8869fc4", cost: "$15", description: "Oxygen at night." },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313046377759", cost: "$12", description: "Removes toxins." },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e735e", cost: "$18", description: "Removes mold." },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b", cost: "$14", description: "Adds humidity." },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b", cost: "$20", description: "Dark green leaves." },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09", cost: "$10", description: "Skin healing." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a", cost: "$20", description: "Calming scent." },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5", cost: "$22", description: "Sweet fragrance." },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515585926524-5d9c22e4d412", cost: "$15", description: "Aromatic herb." },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628744856160-562095037267", cost: "$8", description: "Refreshing scent." },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1515585926524-5d9c22e4d412", cost: "$12", description: "Citrus aroma." },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1521334884684-d80222895322", cost: "$25", description: "Clears sinuses." }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        { name: "Marigold", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866", cost: "$10", description: "Pest deterrent." },
        { name: "Catnip", image: "https://images.unsplash.com/photo-1515585926524-5d9c22e4d412", cost: "$9", description: "Repels bugs." },
        { name: "Basil", image: "https://images.unsplash.com/photo-1618375531912-86cdb8d82371", cost: "$11", description: "Culinary herb." },
        { name: "Citronella", image: "https://images.unsplash.com/photo-1515585926524-5d9c22e4d412", cost: "$18", description: "Bug repellent." },
        { name: "Geraniums", image: "https://images.unsplash.com/photo-1515585926524-5d9c22e4d412", cost: "$16", description: "Keeps bugs away." },
        { name: "Pennyroyal", image: "https://images.unsplash.com/photo-1515585926524-5d9c22e4d412", cost: "$13", description: "Keeps fleas away." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#333', color: '#fff' }}>
        <h3 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Paradise Nursery</h3>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Plants</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>🛒 Cart ({totalCartCount})</span>
        </div>
      </div>

      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((category, idx) => (
            <div key={idx}>
              <h2>{category.category}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {category.plants.map((plant, pIdx) => (
                  <div key={pIdx} style={{ border: '1px solid #ccc', padding: '15px', width: '220px', borderRadius: '8px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                      style={{ backgroundColor: addedToCart[plant.name] ? 'gray' : '#4CAF50', color: 'white', border: 'none', padding: '8px', cursor: 'pointer' }}
                    >
                      {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
