import { CreateProduct } from "../../managers/ProductManager";
import { GetAllProductTypes } from "../../managers/ProductManager";
import { useState } from "react";
import { useEffect } from "react";
import { GetAllPrefrences } from "../../managers/ProductManager";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {
  const [product, setProduct] = useState({
    label: "",
    brand: "",
    description: "",
    image: "",
    price: "",
    link: "",
    makeup_preferences: 0,
    product_type: 0,
  });

  const [product_types, setProductTypes] = useState([]);
  const [makeup_preferences, setMakeupPreferences] = useState([]);

  const getProductTypes = () => {
    return GetAllProductTypes().then((product_typesFromAPI) => {
      setProductTypes(product_typesFromAPI);
    });
  };

  const getMakeupPreferences = () => {
    return GetAllPrefrences().then((makeup_preferencesFromAPI) => {
      setMakeupPreferences(makeup_preferencesFromAPI);
    });
  };

  useEffect(() => {
    getMakeupPreferences();
  }, []);

  useEffect(() => {
    getProductTypes();
  }, []);

  const handleControlledInputChange = (event) => {
    const newProduct = { ...product };
    newProduct[event.target.id] = event.target.value;
    setProduct(newProduct);
  };

  const handleClickSaveProduct = (event) => {
    event.preventDefault();
    const newProduct = {
      label: product.label,
      brand: product.brand,
      description: product.description,
      image: product.image_link,
      price: product.price,
      link: product.link,
      makeup_preferences: parseInt(product.makeup_preferences),
    };
    CreateProduct(newProduct).then(() => {
      navigate("/productManager");
    });
  };
  const navigate = useNavigate();

  // in my return, im going to need to add a dropdown for product_types and makeup_preferences
  // dependent on the product_type, the makeup_preferences will change
  // so i want to make a double dropdown in my return, so that when they choose a product_type, the makeup_preferences will change
  // i need to make a function that will filter the makeup_preferences based on the product_type

  const filterMakeupPreferences = (product_type_id) => {
    const filteredMakeupPreferences = makeup_preferences.filter(
      (makeup_preference) => {
        return makeup_preference.product_type.id === product_type_id;
      }
    );
    return filteredMakeupPreferences;
  };

  return (
    <>
      <form className="productForm">
        <h2 className="productForm__title">New Product</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="label">Product Label:</label>
            <input
              type="text"
              id="label"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Product Label"
              value={product.label}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="brand">Product Brand:</label>
            <input
              type="text"
              id="brand"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Product Brand"
              value={product.brand}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Product Description:</label>
            <input
              type="text"
              id="description"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Product Description"
              value={product.description}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="price">Product Price:</label>
            <input
              type="text"
              id="price"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Product Price"
              value={product.price}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="link">Product Link:</label>
            <input
              type="text"
              id="link"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Product Link"
              value={product.link}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="product_type">Product Type:</label>
            <select
              value={product.product_type}
              name="product_type"
              id="product_type"
              onChange={handleControlledInputChange}
              className="form-control"
            >
              <option value="0">Select a Product Type</option>
              {product_types.map((product_type) => (
                <option key={product_type.id} value={product_type.id}>
                  {product_type.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="makeup_preferences">
              Product Makeup Preference:
            </label>
            <select
              value={product.makeup_preferences}
              name="makeup_preferences"
              id="makeup_preferences"
              onChange={handleControlledInputChange}
              className="form-control"
            >
              <option value="0">Select a Makeup Preference</option>
              {filterMakeupPreferences(parseInt(product.product_type)).map(
                (makeup_preference) => (
                  <option
                    key={makeup_preference.id}
                    value={makeup_preference.id}
                  >
                    {makeup_preference.label}
                  </option>
                )
              )}
            </select>
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={handleClickSaveProduct}>
          Save Product
        </button>
      </form>
    </>
  );
};
