import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProductById,
  getProductReviews,
  createProductReview,
} from "../../managers/ProductManager";
import { getCurrentUserProfile } from "../../managers/UserManager";
import { deleteProductReview } from "../../managers/ProductManager";
import { Link } from "react-router-dom";

import "./productDetailList.css";

export const ProductDetailList = ({ token }) => {
    // grab the id from the url
  const { id } = useParams();
// set up the initial state for product
  const [product, setProduct] = useState({});
// set up the initial state for reviews
  const [reviews, setReviews] = useState([]);
// set up the initial state for current user profile
  const [currentUserProfile, setCurrentUserProfile] = useState({});
// set up the initial state for showing the review form
  const [showCreateForm, setShowCreateForm] = useState(false); // State for toggling the review form
  // set up initial state for new review we will be creating
  const [newReview, setNewReview] = useState({
    rating: 0,
    review: "",
    product: id,
    profile: 0,
  });
// listening for a change in the token, get the current user profile and update the state
  useEffect(() => {
    getCurrentUserProfile(token).then((userProfile) => {
      setCurrentUserProfile(userProfile);
    });
  }, [token]);
// on inital render of the page, get the product by id and update the state
  useEffect(() => {
    getProductById(id).then((productData) => {
      setProduct(productData);
    });
  }, []);
// on inital render of the page, get the reviews for the product 
  useEffect(() => {
    getCurrentProductReviews();
  }, []);
// function to get the reviews for the product
  const getCurrentProductReviews = () => {
    getProductReviews(id).then((productData) => {
      setReviews(productData);
    });
  };
// function to post the new review to the API
  const handleSaveButton = (event) => {
    event.preventDefault();
    const newReviewObject = {
      rating: newReview.rating,
      review: newReview.review,
      product: id,
      profile: currentUserProfile.id,
    };
    createProductReview(newReviewObject).then(() => {
      setNewReview({
        rating: 0,
        review: "",
        product: id,
        profile: 0,
      });
      setShowCreateForm(false);
      getCurrentProductReviews();
    });
  };

  return (
    <>
      <div className="product-container">
        <section className="product">
          <h3 className="product__label">{product.label}</h3>
          <div className="product__brand">{product.brand}</div>
          <div className="product__description">{product.description}</div>
          <img
            className="product__image"
            src={product.image}
            alt="product image"
          />
          <div className="product__price">${product.price}0</div>
          <Link className="product__link" to={product.link}>
            Buy Now
          </Link>
          <div className="product__product_type">
            {product.product_type?.label}
          </div>
          <div className="product__makeup_preferences">
            {product.makeup_preferences?.label}
          </div>
        </section>

        <section className="reviews">
          <h3 className="reviews__header">Customer Reviews</h3>
          {reviews.length === 0 ? (
            <div className="reviews__empty">
              There are no reviews for this product
            </div>
          ) : (
            reviews.map((review) => (
              <div className="review" key={review.id}>
                <div className="review__user">
                  <strong>{review.profile?.User?.username}</strong> says:
                </div>
                <div className="review__content">{review.review}</div>
                <div className="review__rating">
                  Rated {review.rating} stars
                </div>
                {review.profile?.id === currentUserProfile.id && (
                  <button
                    className="category-button"
                    onClick={() =>
                      deleteProductReview(review.id).then(() =>
                        getCurrentProductReviews()
                      )
                    }
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
          <button
            className="category-button"
            id="add-review-button"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            Add a review
          </button>
          {showCreateForm && (
            <div className="review-form">
              <form onSubmit={handleSaveButton}>
                <label>
                  Rating:
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        rating: parseInt(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  Review:
                  <textarea
                    value={newReview.review}
                    onChange={(e) =>
                      setNewReview({ ...newReview, review: e.target.value })
                    }
                  />
                </label>
                <button type="submit" className="category-button">
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
