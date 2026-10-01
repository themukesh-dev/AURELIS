import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container not-found-content">
        <p className="eyebrow">AURELIS</p>

        <h1>Page not found</h1>

        <p>
          The page you're looking for doesn't exist or may
          have been moved.
        </p>

        <div className="not-found-actions">
          <Link
            to="/"
            className="button button-primary"
          >
            Back to Home
          </Link>

          <Link
            to="/shop"
            className="button button-secondary"
          >
            Browse Watches
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;