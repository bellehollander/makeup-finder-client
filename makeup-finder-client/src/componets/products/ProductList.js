import { GetAllProducts } from "../../managers/ProductManager";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteProduct } from "../../managers/ProductManager";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    return GetAllProducts().then((productsFromAPI) => {
      setProducts(productsFromAPI);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.label}</h3>
            <p>{product.brand}</p>
            <p>{product.description}</p>
            <img src={product.image_link} alt="product image" />
            <p> $ {product.price}0</p>
            <Link>{product.link}</Link>
            <button
              onClick={() => {
                DeleteProduct(product.id).then(() => {
                  getProducts();
                });
              }}
            >
              Delete
            </button>
          </div>
        ))}
        <Link to="/createProduct"> Create a Product!</Link>
      </div>
    </>
  );
};
