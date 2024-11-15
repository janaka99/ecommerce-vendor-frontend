import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  searchProductsByQuery,
  selectError,
  selectLoading,
  selectSearchResults,
} from "../store/product.slice";
import Loading from "../components/ui/Loading";
import { AppDispatch } from "../store/store";
import Container from "../components/layouts/Container";
import ArrowIcon from "../assets/arrow.svg";
import PageHeader from "../components/layouts/PageHeader";

const SearchResultsPage = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  const searchResults = useSelector(selectSearchResults);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Removes punctuation
  const cleanedQuery = query.replace(/[^\w\s]/g, "");
  const wordsArray = cleanedQuery.split(" ").filter((word) => word.length > 0);

  useEffect(() => {
    if (query) {
      dispatch(searchProductsByQuery(query));
    }
  }, [query, dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="flex flex-col gap-10 mt-5">
      <PageHeader title="PRODUCTS" />
      {searchResults && (
        <div className="text-secondary-title font-bold text-mute">
          {searchResults.length} results found for '{wordsArray.join(" ")}'
        </div>
      )}
      <div className="flex flex-col">
        {searchResults &&
          searchResults.map((rs, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-4 px-10"
            >
              <div className="flex flex-col gap-2">
                <p className="text-accent text-secondary-text font-medium ">
                  {rs.sku}
                </p>
                <p className="text-primary text-primary-text font-medium ">
                  {rs.name}
                </p>
                <p className="text-primary text-secondary-text  ">
                  {rs.description}
                </p>
              </div>
              <div className="">
                <img src={ArrowIcon} alt="" />
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default SearchResultsPage;
