import { useEffect, useState } from "react";
import { DB, Product } from "../data-providers/Server";
import SearchFilter from "../components/SearchFilter";
import ProductList from "../components/ProductList";
import Loader from "../components/Loader";

const Products = () => {
  // Could add an all products state here, instead of getting all products every time the filterBy changes inside the useEffect hook
  const [products, setProducts] = useState<Product[]>([]);
  const [filterBy, setFilterBy] = useState({ title: "" }); // Object contating a title to filter by. This allows for future addition of more filter types
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    DB.getAllProducts().then((products) => {
      setProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(filterBy.title.toLowerCase())
        )
      );
    });
  }, [filterBy]);

  const onToggleStockClick = async (id: number) => {
    let updatedProducts = await DB.toggleProductInStock(id); // Received updated products to update the displayed products on each toggle click
    setProducts(updatedProducts);
  };

  // Client-Side Pagination
  const totalPages = Math.ceil(products.length / productsPerPage); // Divide the number of products by the defined number of products per page
  const startIndex = (currentPage - 1) * productsPerPage; // The index of the first product to display on the current page
  const paginatedProducts = products.slice(startIndex, startIndex + productsPerPage); // Use the start index, and the end index of the products to display

  const handlePageChange = (newPage: number) => {
    // Validate the number of the new page received
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="products-page">
      <SearchFilter setFilterBy={setFilterBy} filterBy={filterBy} />
      {!products.length && <Loader />}

      {products.length > 0 && (
        <>
          <ProductList
            onToggleStockClick={onToggleStockClick}
            products={products}
            paginatedProducts={paginatedProducts}
          />

          <div className="pagination">
            {/** Previous page button, goes back one page, and is disabled when the current page is the first page */}
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>

            {/** Create array of buttons to display for every middle page (without the edges) */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}

            {/** Next page button, goes forwards one page, and is disabled when the current page is the last page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
