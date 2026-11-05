import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "../data";
import Card from "../components/Card";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filteredProducts = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
  }, [search, category, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("featured");
  };

  return (
    <main className="page container">
      <span className="eyebrow">Our collection</span>
      <h1>Featured products.</h1>
      <p className="page-lead">
        A small selection of reliable tech for work, play, and everything
        between.
      </p>

      <section className="product-tools" aria-label="Product filters">
        <label className="search-box">
          <Search size={19} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search products..." aria-label="Search products" />
          {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search"><X size={17} /></button>}
        </label>
        <label className="sort-control">
          <SlidersHorizontal size={18} />
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </section>

      <div className="category-filters" aria-label="Filter by category">
        {categories.map((item) => <button className={category === item ? "active" : ""} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>

      <div className="results-row"><span>{visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}</span>{(search || category !== "All" || sortBy !== "featured") && <button type="button" onClick={resetFilters}>Reset filters</button>}</div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid product-results">
          {visibleProducts.map((product) => <Card key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="no-results"><span><Search size={25} /></span><h2>No products found</h2><p>Try another search or reset your filters.</p><button className="button button-secondary" type="button" onClick={resetFilters}>Reset filters</button></div>
      )}
    </main>
  );
};

export default Products;
