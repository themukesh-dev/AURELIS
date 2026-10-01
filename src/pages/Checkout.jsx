import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const {
    items,
    cartSubtotal,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "card",
  });

  const freeShippingThreshold = 25000;
  const shipping =
    cartSubtotal >= freeShippingThreshold ? 0 : 250;
  const total = cartSubtotal + shipping;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const orderNumber =
      "AUR-" + Date.now().toString().slice(-6);

    clearCart();

    navigate("/order-confirmation", {
      state: {
        orderNumber,
      },
    });
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container checkout-empty">
          <p className="eyebrow">CHECKOUT</p>

          <h1>Your cart is empty</h1>

          <p>
            Add a watch to your cart before proceeding to
            checkout.
          </p>

          <Link
            to="/shop"
            className="button button-primary"
          >
            Browse Watches
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <header className="checkout-header">
          <p className="eyebrow">CHECKOUT</p>

          <div className="checkout-header-row">
            <div>
              <h1>Complete your order</h1>

              <p>
                Review your details and confirm your purchase.
              </p>
            </div>

            <Link
              to="/cart"
              className="text-link"
            >
              Return to Cart
            </Link>
          </div>
        </header>

        <div className="checkout-layout">
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <section className="checkout-section">
              <h2>Contact Information</h2>

              <div className="form-field">
                <label htmlFor="full-name">
                  Full Name
                </label>

                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  minLength="10"
                  maxLength="10"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
            </section>

            <section className="checkout-section">
              <h2>Shipping Address</h2>

              <div className="form-field">
                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="state">
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    autoComplete="address-level1"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="pincode">
                  PIN Code
                </label>

                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={handleChange}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="[1-9][0-9]{5}"
                  minLength="6"
                  maxLength="6"
                  placeholder="6-digit PIN code"
                  required
                />
              </div>
            </section>

            <section className="checkout-section">
              <h2>Payment Method</h2>

              <fieldset className="payment-options">
                <legend className="sr-only">
                  Select payment method
                </legend>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.payment === "card"}
                    onChange={handleChange}
                  />

                  <span>Credit / Debit Card</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.payment === "upi"}
                    onChange={handleChange}
                  />

                  <span>UPI</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.payment === "cod"}
                    onChange={handleChange}
                  />

                  <span>Cash on Delivery</span>
                </label>
              </fieldset>

              
            </section>

            <button
              type="submit"
              className="button button-primary place-order-button"
            >
              Place Order
            </button>
          </form>

          <aside className="checkout-summary">
            <div className="checkout-summary-heading">
              <h2>Order Summary</h2>

              <Link
                to="/cart"
                className="text-link"
              >
                Edit Cart
              </Link>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="checkout-item"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹
                  {(
                    item.price * item.quantity
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            ))}

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
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;