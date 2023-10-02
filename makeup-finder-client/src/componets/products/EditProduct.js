import { useEffect, useState } from "react";
import { EditProduct } from "../../managers/ProductManager";
import {
  GetAllProductTypes,
  GetAllPrefrences,
} from "../../managers/ProductManager";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../managers/ProductManager";
import "./form.css";

export const EditProductForm = () => {
  // grab the id from the url
  const { id } = useParams();

  const navigate = useNavigate();
// set up the initial state for product
  const [product, setProduct] = useState({
    label: "",
    brand: "",
    description: "",
    image: "",
    price: "",
    link: "",
    product_type: 0,
    makeup_preferences: 0,
  });
// set up the initial state for product types
  const [product_types, setProductTypes] = useState([]);
// set up the initial state for makeup preferences
  const [makeup_preferences, setMakeupPreferences] = useState([]);
// grab all of the product types from the API, then set the state
  const getProductTypes = () => {
    return GetAllProductTypes().then((product_typesFromAPI) => {
      setProductTypes(product_typesFromAPI);
    });
  };
// grab all of the makeup preferences from the API, then set the state
  const getMakeupPreferences = () => {
    return GetAllPrefrences().then((makeup_preferencesFromAPI) => {
      setMakeupPreferences(makeup_preferencesFromAPI);
    });
  };
// on inital render of the page, get the makeup preferences and product types
  useEffect(() => {
    getMakeupPreferences();
    getProductTypes();
  }, []);
// listening for changes in the id, then get the product by id and update the state
// making sure to set the makeup preferences and product type to the id of the makeup preferences and product type
  useEffect(() => {
    getProductById(id).then((productData) => {
      const copy = { ...product };
      copy.product_type = productData.makeup_preferences.product_type.id;
      // this line is important because it is setting the makeup preferences to the id of the productData.makeup_preferences.id
      // because products dont have a product type id, they have a makeup preferences id
      copy.makeup_preferences = productData.makeup_preferences.id;
      copy.label = productData.label;
      copy.brand = productData.brand;
      copy.description = productData.description;
      copy.image = productData.image;
      copy.price = productData.price;
      copy.link = productData.link;
      setProduct(copy);
    });
  }, [id]);
// function for handling the changes in the input fields
  const handleControlledInputChange = (event) => {
    const copy = { ...product };
    copy[event.target.id] = event.target.value;
    setProduct(copy);
  };
// function to make the put request to the API, then navigate back to the product manager page
  const handleClickSaveProduct = (event) => {
    event.preventDefault();
    const newProduct = {
      id: id,
      label: product.label,
      brand: product.brand,
      description: product.description,
      image: product.image,
      price: product.price,
      link: product.link,
      makeup_preferences: parseInt(product.makeup_preferences),
    };
    EditProduct(newProduct).then(() => {
      navigate("/productManager");
    });
  };
// function to filter the makeup preferences by the product type id
  const filterMakeupPreferences = (product_type_id) => {
    const filteredMakeupPreferences = makeup_preferences.filter(
      (makeup_preference) => {
        return makeup_preference.product_type.id === parseInt(product_type_id);
      }
    );
    return filteredMakeupPreferences;
  };

  return (
    <>
      <form className="edit-product-form">
        <h2 className="edit-product-form__title">Edit Product</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="label" className="edit-product-label">
              Product Name:
            </label>
            <input
              type="text"
              id="label"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Product Name"
              value={product.label}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="brand" className="edit-product-label">
              Brand:
            </label>
            <input
              type="text"
              id="brand"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Brand"
              value={product.brand}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description" className="edit-product-label">
              Description:
            </label>
            <input
              type="text"
              id="description"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Description"
              value={product.description}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="image" className="edit-product-label">
              Image:
            </label>
            <input
              type="text"
              id="image"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Image"
              value={product.image}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="price" className="edit-product-label">
              Price:
            </label>
            <input
              type="text"
              id="price"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Price"
              value={product.price}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="link" className="edit-product-label">
              Link:
            </label>
            <input
              type="text"
              id="link"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="edit-product-input"
              placeholder="Link"
              value={product.link}
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
              Makeup Preferences:
            </label>
            <select
              value={product.makeup_preferences}
              name="makeup_preferences"
              id="makeup_preferences"
              onChange={handleControlledInputChange}
              className="edit-product-input"
            >
              <option value="0">Select a Makeup Preference</option>
              {filterMakeupPreferences(product.product_type).map(
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

        <button
          className="edit-product-button"
          onClick={handleClickSaveProduct}
        >
          Save Product
        </button>
      </form>
    </>
  );
};
