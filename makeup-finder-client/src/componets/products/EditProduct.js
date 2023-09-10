import { useEffect, useState } from "react";
import { EditProduct } from "../../managers/ProductManager";
import {
  GetAllProductTypes,
  GetAllPrefrences,
} from "../../managers/ProductManager";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../managers/ProductManager";

export const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    getProductTypes();
  }, []);

  /// here i need to get the product by the id
  /// then i need to set the state, but i also need to
  // set the current product type
  // by saying product.product_type = productData.makeup_preferences.product_type.id
  // and then i need to set the current makeup preference

  useEffect(() => {
    getProductById(id).then((productData) => {
      const copy = { ...product };
      copy.product_type = productData.makeup_preferences.product_type.id;
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

  const handleControlledInputChange = (event) => {
    const { id, value } = event.target;
    setProduct({ ...product, [id]: value });
  };

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
      <form className="productForm">
        <h2 className="productForm__title">Edit Product</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="label">Product Name:</label>
            <input
              type="text"
              id="label"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Product Name"
              value={product.label}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Brand"
              value={product.brand}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Description"
              value={product.description}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Image"
              value={product.image}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Price"
              value={product.price}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="link">Link:</label>
            <input
              type="text"
              id="link"
              onChange={handleControlledInputChange}
              required
              autoFocus
              className="form-control"
              placeholder="Link"
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
            <label htmlFor="makeup_preferences">Makeup Preferences:</label>
            <select
              value={product.makeup_preferences}
              name="makeup_preferences"
              id="makeup_preferences"
              onChange={handleControlledInputChange}
              className="form-control"
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

        <button className="btn btn-primary" onClick={handleClickSaveProduct}>
          Save Product
        </button>
      </form>
    </>
  );
};
