function CategoryFilter({
categories,
selectedCategory,
onCategoryChange,
}) {
return ( <div className="category-filter"> <label htmlFor="category-select">Category</label>


  <select
    id="category-select"
    value={selectedCategory}
    onChange={(event) => onCategoryChange(event.target.value)}
  >
    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
</div>


);
}

export default CategoryFilter;
