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
      <h1>Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.label}</h3>
            <p>{product.brand}</p>
            <p>{product.description}</p>
            <img
              className="product-image"
              src={product.image}
              alt="product image"
            />
            <p className="product-price">$ {product.price}0</p>
            <a href={product.link} className="product-link">
              {product.link}
            </a>
            <button
              onClick={() => {
                DeleteProduct(product.id).then(() => {
                  getProducts();
                });
              }}
              className="product-delete-button"
            >
              Delete
            </button>
            <Link to={`/products/${product.id}`} className="product-edit-link">
              Edit
            </Link>
          </div>
        ))}
        <Link to="/createProduct" className="create-product-link">
          Create a Product!
        </Link>
      </div>
    </>
  );
};
