import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Form, FormInput } from "@/components/custom_form";
import { Button } from "@/components/ui/button";
import { useCreateProductCatalog } from "@/hooks/product_hooks";

const formSchema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
  })
  .required();

const formDefaults = {
  name: "",
};

export default function ProductFormName({ onDone = () => {} }) {
  const [createCatalog] = useCreateProductCatalog();

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: formDefaults,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    await createCatalog(form.getValues());
    onDone();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Form
          id="product-form"
          form={form}
          onValidSubmit={handleSubmit}
          className="h-full space-y-6 px-10 py-5"
        >
          <FormInput
            label={null}
            fieldname="name"
            placeholder="Nombre Producto"
          />
          <div className="flex justify-end">
            <Button type="submit" className="ml-auto" onClick={handleSubmit}>
              Confirmar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
