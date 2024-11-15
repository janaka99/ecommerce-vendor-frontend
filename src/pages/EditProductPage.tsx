import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/layouts/Container";
import EditProductForm from "../components/forms/EditProductForm";
import Loading from "../components/ui/Loading";
import FormHeader from "../components/ui/FormHeader";

type Props = {};

export default function EditProductPage({}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState(false);

  const { id } = useParams<{ id: string }>();

  const getProduct = async () => {
    try {
      axios
        .get(`http://localhost:5000/api/v1/product/by/${id}`)
        .then((res) => {
          setProduct(res.data.product);
          setIsLoading(false);
        })
        .catch(() => {
          setError(true);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="py-10 flex flex-col gap-10 ">
      <FormHeader text="Edit product" />
      {product && <EditProductForm Product={product} />}
    </Container>
  );
}
