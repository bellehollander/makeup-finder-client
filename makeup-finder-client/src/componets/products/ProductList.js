import { GetAllProducts } from "../../managers/ProductManager";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteProduct } from "../../managers/ProductManager";
import "./adminProduct.css";

export const ProductList = () => {
  // Set up the initial state for products
  const [products, setProducts] = useState([]);

  // Function to get all products from the API and update the product state
  const getProducts = () => {
    return GetAllProducts().then((productsFromAPI) => {
      setProducts(productsFromAPI);
    });
  };

  // On initial render of the page, get all products
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="tip-list-header">
        <h1 className="header-tips"> Product Manager</h1>
        <img
          className="sparkle-image"
          src="https://thumbs.dreamstime.com/b/yellow-original-bright-stars-sparkle-icon-glowing-light-effect-star-vector-illustration-yellow-original-bright-stars-sparkle-icon-192033133.jpg"
          alt="gold sparkle image"
        />
        <Link to="/createProduct" className="create-product-link">
          Create a Product!
        </Link>
      </div>

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3 className="product-label">{product.label}</h3>
            <p className="product-brand">{product.brand}</p>
            <p>{product.description}</p>
            <img
              className="product-image"
              src={product.image}
              alt="product image"
            />
            <p className="product-price">$ {product.price}0</p>

            <button
              onClick={() => {
                DeleteProduct(product.id).then(() => {
                  getProducts();
                });
              }}
              className="category-button"
            >
              Delete
            </button>
            <Link to={`/products/${product.id}`} className="category-button">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
