import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProductById,
  getProductReviews,
  createProductReview,
} from "../../managers/ProductManager";
import { getCurrentUserProfile } from "../../managers/UserManager";
import { deleteProductReview } from "../../managers/ProductManager";

import "./productDetailList.css";

export const ProductDetailList = ({ token }) => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false); // State for toggling the review form
  const [newReview, setNewReview] = useState({
    rating: 0,
    review: "",
    product: id,
    profile: 0,
  });

  useEffect(() => {
    getCurrentUserProfile(token).then((userProfile) => {
      setCurrentUserProfile(userProfile);
    });
  }, [token]);

  useEffect(() => {
    getProductById(id).then((productData) => {
      setProduct(productData);
    });
  }, []);

  useEffect(() => {
    getCurrentProductReviews();
  }, []);

  const getCurrentProductReviews = () => {
    getProductReviews(id).then((productData) => {
      setReviews(productData);
    });
  };

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
          <div className="product__link">{product.link}</div>
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
          <button onClick={() => setShowCreateForm(!showCreateForm)}>
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
                <button type="submit">Submit Review</button>
              </form>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
