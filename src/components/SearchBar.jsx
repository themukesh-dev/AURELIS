function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="watch-search">
        Search watches
      </label>

      <input
        id="watch-search"
        type="search"
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search watches"
        aria-describedby="watch-search-help"
        autoComplete="off"
      />

      <p
        id="watch-search-help"
        className="search-help"
      >
        Search by name, category, movement, dial, or material.
      </p>
    </div>
  );
}

export default SearchBar;