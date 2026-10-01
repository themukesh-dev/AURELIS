import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import products from "../data/products";

function Home() {
  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  const categories = [
    {
      name: "Everyday",
      description: "Reliable watches for daily wear.",
      image: products.find(
        (product) => product.category === "Everyday"
      ).image,
    },
    {
      name: "Automatic",
      description:
        "Mechanical watches with automatic movements.",
      image: products.find(
        (product) => product.category === "Automatic"
      ).image,
    },
    {
      name: "Chronograph",
      description:
        "Sport-inspired watches with timing functions.",
      image: products.find(
        (product) => product.category === "Chronograph"
      ).image,
    },
    {
      name: "Dress",
      description:
        "Clean designs for formal occasions.",
      image: products.find(
        (product) => product.category === "Dress"
      ).image,
    },
    {
      name: "Sport",
      description:
        "Durable watches built for active use.",
      image: products.find(
        (product) => product.category === "Sport"
      ).image,
    },
  ];

  return (
    <main>
      <section className="home-hero">
        <div className="container home-hero-content">
          <div className="home-hero-copy">
            <p className="eyebrow">AURELIS WATCHES</p>

            <h1>Precision in every second.</h1>

            <p className="hero-description">
              Thoughtfully designed watches for everyday wear,
              from dependable quartz models to mechanical
              automatic timepieces.
            </p>

            <div className="hero-actions">
              <Link
                to="/shop"
                className="button button-primary"
              >
                Shop Watches
              </Link>

              <Link
                to="/shop?category=Automatic"
                className="button button-secondary"
              >
                Explore Automatic
              </Link>
            </div>
          </div>

          <div className="home-hero-image">
            <img
              src={featuredProducts[0].image}
              alt={`${featuredProducts[0].name} watch`}
            />
          </div>
        </div>
      </section>

      <section className="home-featured">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                SELECTED WATCHES
              </p>

              <h2>Featured collection</h2>
            </div>

            <Link
              to="/shop"
              className="text-link"
            >
              View all watches
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <section className="home-categories">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                FIND YOUR STYLE
              </p>

              <h2>Shop by category</h2>
            </div>
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop?category=${encodeURIComponent(
                  category.name
                )}`}
                className="category-item"
              >
                <div className="category-item-image">
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className="category-item-content">
                  <h3>{category.name}</h3>

                  <p>{category.description}</p>
                </div>

                <span
                  className="category-item-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-details">
        <div className="container home-details-content">
          <div>
            <p className="eyebrow">
              THE AURELIS APPROACH
            </p>

            <h2>
              Clear specifications. Considered details.
            </h2>
          </div>

          <div className="home-details-copy">
            <p>
              Every AURELIS watch is presented with its
              movement, case size, materials, dial color,
              and water resistance clearly listed.
            </p>

            <p>
              Choose between practical quartz watches and
              automatic models, with designs ranging from
              everyday essentials to formal timepieces.
            </p>

            <Link
              to="/shop"
              className="text-link"
            >
              Explore the collection
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;