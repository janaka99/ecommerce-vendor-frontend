import { useEffect, useState } from "react";
import Container from "../components/layouts/Container";
import PageHeader from "../components/layouts/PageHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import ProductRow from "../components/ui/ProductRow";
import Loading from "../components/ui/Loading";
import { AppDispatch } from "../store/store";
import {
  loadProducts,
  selectFavorites,
  selectLoading,
  selectProducts,
} from "../store/product.slice";

type Props = {};

export default function ProductsPage({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const favourites = useSelector(selectFavorites);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  console.log(favourites);
  return (
    <Container className="flex flex-col gap-10 mt-5">
      <PageHeader title="Products" />
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>IMAGE</TableHead>
            <TableHead>PRODUCT NAME</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: IProduct, i) => {
            let isfavourite = false;
            for (let fav of favourites) {
              if (fav == product._id) {
                isfavourite = true;
              }
            }
            return (
              <ProductRow
                product={product}
                loadProducts={() => dispatch(loadProducts())}
                key={i}
                isfavourite={isfavourite}
              />
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
}
