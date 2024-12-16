import React, { useEffect, useState } from 'react';
import './listproduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/allproducts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/removeproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Product removed successfully');
        setAllProducts(allproducts.filter((product) => product.id !== productId));
      } else {
        alert(result.message || 'Failed to remove product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
      alert('An error occurred while removing the product.');
    }
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-container">
        {allproducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          allproducts.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={product.image} // Display the image URL
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Id: {product.id}</p>
              <p>Old Price: ${product.old_price}</p>
              <p>New Price: ${product.new_price}</p>
              <p>Category: {product.category}</p>
              <img
                onClick={() => removeProduct(product.id)}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="Remove"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListProduct;
