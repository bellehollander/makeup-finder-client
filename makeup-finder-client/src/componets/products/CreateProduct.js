import { CreateProduct } from "../../managers/ProductManager";
import { GetAllProductTypes } from "../../managers/ProductManager";
import { useState } from "react";
import { useEffect } from "react";
import { GetAllPrefrences } from "../../managers/ProductManager";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {
  // set up the initial state for product
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
  // set up the initial state for product types
  const [product_types, setProductTypes] = useState([]);
  // set up the initial state for makeup preferences
  const [makeup_preferences, setMakeupPreferences] = useState([]);
  // get the product types from the API, then set the state
  const getProductTypes = () => {
    return GetAllProductTypes().then((product_typesFromAPI) => {
      setProductTypes(product_typesFromAPI);
    });
  };
  // get the makeup preferences from the API, then set the state
  const getMakeupPreferences = () => {
    return GetAllPrefrences().then((makeup_preferencesFromAPI) => {
      setMakeupPreferences(makeup_preferencesFromAPI);
    });
  };
  // on inital render of the page, get the makeup preferences
  useEffect(() => {
    getMakeupPreferences();
  }, []);
  // on inital render of the page, get the product types
  useEffect(() => {
    getProductTypes();
  }, []);
  // function to handle the controlled input change
  const handleControlledInputChange = (event) => {
    // create a copy of the product state
    const newProduct = { ...product };
    // set the value of the input to the value of the product state
    newProduct[event.target.id] = event.target.value;
    // set the state of the product to the new product
    setProduct(newProduct);
  };
  // function to handle the save button click
  const handleClickSaveProduct = (event) => {
    // prevent the default action of the button
    event.preventDefault();
    // create a new product object
    const newProduct = {
      label: product.label,
      brand: product.brand,
      description: product.description,
      image: product.image,
      price: product.price,
      link: product.link,
      makeup_preferences: parseInt(product.makeup_preferences),
    };
    // post the product to the API
    CreateProduct(newProduct).then(() => {
      // navigate to the product manager page
      navigate("/productManager");
    });
  };
  const navigate = useNavigate();

  // in my return, im going to need to add a dropdown for product_types and makeup_preferences
  // dependent on the product_type, the makeup_preferences will change
  // so i want to make a double dropdown in my return, so that when they choose a product_type, the makeup_preferences will change
  // i need to make a function that will filter the makeup_preferences based on the product_type
  // this is the function that will filter the makeup_preferences based on the product_type
  // it takes in the product_type_id as a parameter
  const filterMakeupPreferences = (product_type_id) => {
    // filter the makeup_preferences based on the product_type_id
    const filteredMakeupPreferences = makeup_preferences.filter(
      (makeup_preference) => {
        // return the makeup_preferences that have the same product_type.id as the product_type_id that was passed in
        return makeup_preference.product_type.id === product_type_id;
      }
    );
    // return the filtered makeup_preferences
    return filteredMakeupPreferences;
  };

  return (
    <>
      <form className="edit-product-form">
        <h2 className="edit-product-form__title">New Product</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="label" className="edit-product-label">
              Product Label:
            </label>
            <input
              type="text"
              id="label"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Product Label"
              value={product.label}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="brand" className="edit-product-label">
              Product Brand:
            </label>
            <input
              type="text"
              id="brand"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Product Brand"
              value={product.brand}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description" className="edit-product-label">
              Product Description:
            </label>
            <input
              type="text"
              id="description"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Product Description"
              value={product.description}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="price" className="edit-product-label">
              Product Price:
            </label>
            <input
              type="text"
              id="price"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Product Price"
              value={product.price}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="link" className="edit-product-label">
              Product Link:
            </label>
            <input
              type="text"
              id="link"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Product Link"
              value={product.link}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="image" className="edit-product-label">
              Product Image:
            </label>
            <input
              type="text"
              id="image"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Product Link"
              value={product.image}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="product_type" className="edit-product-label">
              Product Type:
            </label>
            <select
              value={product.product_type}
              name="product_type"
              id="product_type"
              onChange={handleControlledInputChange}
              className="edit-product-input"
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
            <label htmlFor="makeup_preferences" className="edit-product-label">
              Product Makeup Preference:
            </label>
            <select
              value={product.makeup_preferences}
              name="makeup_preferences"
              id="makeup_preferences"
              onChange={handleControlledInputChange}
              className="edit-product-input"
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
