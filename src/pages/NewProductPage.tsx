import Container from "../components/layouts/Container";
import NewProductForm from "../components/forms/NewProductForm";
import FormHeader from "../components/ui/FormHeader";

type Props = {};

export default function NewProductPage({}: Props) {
  return (
    <Container className="py-10 flex flex-col gap-10 ">
      <FormHeader text="Edit product" />
      <NewProductForm />
    </Container>
  );
}
