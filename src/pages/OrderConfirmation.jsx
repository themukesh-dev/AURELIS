import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;

  if (!orderNumber) {
    return (
      <main className="order-confirmation-page">
        <div className="container">
          <section className="order-confirmation">
            <p className="eyebrow">AURELIS</p>
            <h1>No recent order found.</h1>
            <p className="confirmation-message">
              There is no recent order confirmation available.
              Complete checkout first to receive an order confirmation.
            </p>

            <div className="confirmation-actions">
              <Link to="/shop" className="button button-primary">
                Browse Watches
              </Link>

              <Link to="/" className="button button-secondary">
                Back to Home
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="order-confirmation-page">
      <div className="container">
        <section className="order-confirmation">
          <p className="eyebrow">ORDER CONFIRMED</p>

          <h1>Thank you for your order.</h1>

          <p className="confirmation-message">
            Your AURELIS order has been placed successfully.
          </p>

          <div className="order-details">
            <div>
              <span>Order Number</span>
              <strong>{orderNumber}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>Confirmed</strong>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link
              to="/shop"
              className="button button-primary"
            >
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="button button-secondary"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default OrderConfirmation;