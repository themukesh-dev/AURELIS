import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
if (products.length === 0) {
return ( <div className="product-grid-empty"> <p>No watches match your search or selected category.</p> </div>
);
}

return ( <div className="product-grid">
{products.map((product) => ( <ProductCard key={product.id} product={product} />
))} </div>
);
}

export default ProductGrid;
