import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const {
    id,
    name,
    category,
    price,
    movement,
    caseSize,
    image,
  } = product;

  return (
    <article className="product-card">
      <Link
        to={`/product/${id}`}
        className="product-image-link"
        aria-label={`View ${name}`}
      >
        <div className="product-image-wrapper">
          <img
            src={image}
            alt={`${name} watch`}
            className="product-image"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="product-card-content">
        <p className="product-category">{category}</p>

        <h3 className="product-name">
          <Link to={`/product/${id}`}>
            {name}
          </Link>
        </h3>

        <p className="product-specification">
          {caseSize} · {movement}
        </p>

        <div className="product-card-footer">
          <span className="product-price">
            ₹{price.toLocaleString("en-IN")}
          </span>

          <Link
            to={`/product/${id}`}
            className="product-view-link"
            aria-label={`View details for ${name}`}
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;