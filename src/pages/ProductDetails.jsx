import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="product-details-page">
        <div className="container product-not-found">
          <p className="eyebrow">AURELIS</p>

          <h1>Watch not found</h1>

          <p>
            The watch you are looking for may have been removed
            or the product link may be incorrect.
          </p>

          <Link
            to="/shop"
            className="button button-primary"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const lineTotal = product.price * quantity;

  function increaseQuantity() {
    setQuantity((currentQuantity) => currentQuantity + 1);
    setAddedToCart(false);
  }

  function decreaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
    setAddedToCart(false);
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    setAddedToCart(true);
  }

  return (
    <main className="product-details-page">
      <div className="container">
        <div className="product-details">
          <div className="product-details-image">
            <img
              src={product.image}
              alt={`${product.name} watch`}
            />
          </div>

          <div className="product-details-content">
            <p className="product-category">
              {product.category}
            </p>

            <h1>{product.name}</h1>

            <p className="product-details-price">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <p className="product-details-description">
              {product.description}
            </p>

            <div className="product-specifications">
              <h2>Specifications</h2>

              <dl>
                <div>
                  <dt>Movement</dt>
                  <dd>{product.movement}</dd>
                </div>

                <div>
                  <dt>Case Size</dt>
                  <dd>{product.caseSize}</dd>
                </div>

                <div>
                  <dt>Case Material</dt>
                  <dd>{product.caseMaterial}</dd>
                </div>

                <div>
                  <dt>Strap</dt>
                  <dd>{product.strapMaterial}</dd>
                </div>

                <div>
                  <dt>Water Resistance</dt>
                  <dd>{product.waterResistance}</dd>
                </div>

                <div>
                  <dt>Dial Color</dt>
                  <dd>{product.dialColor}</dd>
                </div>
              </dl>
            </div>

            <div className="product-purchase">
              <div className="quantity-control">
                <span>Quantity</span>

                <div className="quantity-selector">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                    disabled={quantity === 1}
                  >
                    −
                  </button>

                  <span aria-live="polite">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-line-total">
                <span>Total</span>

                <strong>
                  ₹{lineTotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <button
                type="button"
                className="button button-primary add-to-cart-button"
                onClick={handleAddToCart}
              >
                {addedToCart
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>
            </div>

            {addedToCart && (
              <p
                className="cart-success-message"
                role="status"
              >
                {quantity}{" "}
                {quantity === 1 ? "item" : "items"} added
                to your cart.
              </p>
            )}

            <div className="product-service-notes">
              <p>
                <strong>Complimentary shipping</strong>
                <span>
                  Delivered across India on eligible orders.
                </span>
              </p>

              <p>
                <strong>Secure checkout</strong>
                <span>
                  Payment is simulated for this academic
                  demonstration.
                </span>
              </p>
            </div>

            <Link
              to="/shop"
              className="back-to-shop"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;