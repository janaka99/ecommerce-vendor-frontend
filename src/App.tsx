import { Route, Router, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/layouts/Header";
import NewProductPage from "./pages/NewProductPage";
import EditProductPage from "./pages/EditProductPage";
import { Toaster } from "react-hot-toast";
import SearchResultsPage from "./pages/SearchResultsPage";
import FavouritesProductsPage from "./pages/FavouriteProducts";

export default function App() {
  return (
    <div className="w-full font-satoshi">
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/favourite" element={<ProductsPage />} />
        <Route path="/new-product" element={<NewProductPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route
          path="/favourite-products"
          element={<FavouritesProductsPage />}
        />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}
