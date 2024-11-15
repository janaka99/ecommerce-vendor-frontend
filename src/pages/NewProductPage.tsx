import Container from "../components/layouts/Container";
import NewProductForm from "../components/forms/NewProductForm";

type Props = {};

export default function NewProductPage({}: Props) {
  return (
    <Container className="py-10">
      <NewProductForm />
    </Container>
  );
}
