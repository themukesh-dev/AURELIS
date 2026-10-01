import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2>AURELIS</h2>

          <p>
            Modern watches designed with a focus on precision,
            materials, and everyday wear.
          </p>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>

          <Link to="/shop">
            All Watches
          </Link>

          <Link to="/shop?category=Automatic">
            Automatic
          </Link>

          <Link to="/shop?category=Chronograph">
            Chronograph
          </Link>

          <Link to="/shop?category=Dress">
            Dress
          </Link>
        </div>

        <div className="footer-column">
          <h3>Customer Support</h3>

          <p>Shipping information</p>
          <p>Returns &amp; exchanges</p>
          <p>Customer care</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 AURELIS. All rights reserved.</p>

        <p>
          Fictional store for academic demonstration.
        </p>
      </div>
    </footer>
  );
}

export default Footer;