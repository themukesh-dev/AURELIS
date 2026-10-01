import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    items,
    cartSubtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const freeShippingThreshold = 25000;
  const shipping =
    cartSubtotal >= freeShippingThreshold ? 0 : 250;
  const total = cartSubtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="container cart-empty">
          <p className="eyebrow">YOUR CART</p>

          <h1>Your cart is empty</h1>

          <p>
            You haven't added any watches to your cart yet.
          </p>

          <Link
            to="/shop"
            className="button button-primary"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        <header className="cart-header">
          <p className="eyebrow">YOUR CART</p>

          <div className="cart-header-row">
            <h1>Shopping Cart</h1>

            <Link
              to="/shop"
              className="text-link"
            >
              Continue Shopping
            </Link>
          </div>
        </header>

        <div className="cart-layout">
          <section
            className="cart-items"
            aria-label="Cart items"
          >
            {items.map((item) => {
              const itemTotal =
                item.price * item.quantity;

              return (
                <article
                  key={item.id}
                  className="cart-item"
                >
                  <img
                    src={item.image}
                    alt={`${item.name} watch`}
                    className="cart-item-image"
                  />

                  <div className="cart-item-details">
                    <p className="product-category">
                      {item.category}
                    </p>

                    <h2>{item.name}</h2>

                    <p>
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <div className="cart-item-actions">
                      <div className="quantity-selector">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                          disabled={item.quantity === 1}
                        >
                          −
                        </button>

                        <span aria-live="polite">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="text-button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    <span>Item total</span>

                    <strong>
                      ₹{itemTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                ₹{cartSubtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <span>
                {shipping === 0
                  ? "Free"
                  : `₹${shipping.toLocaleString("en-IN")}`}
              </span>
            </div>

            {shipping > 0 && (
              <p className="shipping-note">
                Free shipping on orders above ₹
                {freeShippingThreshold.toLocaleString("en-IN")}.
              </p>
            )}

            <div className="summary-total">
              <span>Total</span>

              <span>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <Link
              to="/checkout"
              className="button button-primary checkout-button"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;