import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import products from "../data/products";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] =
    useState(urlCategory);
  const [sortOption, setSortOption] = useState("featured");

  const categories = [
    "All",
    "Everyday",
    "Automatic",
    "Chronograph",
    "Dress",
    "Sport",
  ];

  useEffect(() => {
    const validCategory = categories.includes(urlCategory)
      ? urlCategory
      : "All";

    if (selectedCategory !== validCategory) {
      setSelectedCategory(validCategory);
    }
  }, [urlCategory, selectedCategory]);

  useEffect(() => {
    if (searchTerm !== urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [urlSearch, searchTerm]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchableText = [
        product.name,
        product.category,
        product.movement,
        product.caseMaterial,
        product.strapMaterial,
        product.dialColor,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    return [...result].sort((a, b) => {
      if (sortOption === "price-low") {
        return a.price - b.price;
      }

      if (sortOption === "price-high") {
        return b.price - a.price;
      }

      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      }

      return Number(b.featured) - Number(a.featured);
    });
  }, [searchTerm, selectedCategory, sortOption]);

  function handleSearchChange(value) {
    setSearchTerm(value);

    const nextParams = new URLSearchParams(searchParams);

    if (value.trim() === "") {
      nextParams.delete("search");
    } else {
      nextParams.set("search", value);
    }

    setSearchParams(nextParams);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);

    const nextParams = new URLSearchParams(searchParams);

    if (category === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }

    setSearchParams(nextParams);
  }

  function handleReset() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOption("featured");
    setSearchParams({});
  }

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "All";

  return (
    <main className="shop-page">
      <div className="container">
        <header className="shop-header">
          <p className="eyebrow">THE COLLECTION</p>

          <h1>Shop Watches</h1>

          <p>
            Browse the AURELIS collection by style, movement,
            or price.
          </p>
        </header>

        <section
          className="shop-controls"
          aria-label="Product filters"
        >
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="sort-control">
            <label htmlFor="sort-products">
              Sort by
            </label>

            <select
              id="sort-products"
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value)
              }
            >
              <option value="featured">Featured</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="name">Name</option>
            </select>
          </div>
        </section>

        <div className="shop-results-header">
          <p>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "watch"
              : "watches"}
            {selectedCategory !== "All"
              ? ` in ${selectedCategory}`
              : ""}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              className="text-button"
              onClick={handleReset}
            >
              Clear filters
            </button>
          )}
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  );
}

export default Shop;