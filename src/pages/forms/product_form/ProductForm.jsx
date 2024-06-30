import { Form } from "@/components/custom_form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateProduct,
  useProductData,
  useUpdateProduct,
  useUpdateProductImage,
} from "@/hooks/product_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductFormAdvanced from "./ProductFormAdvanced";
import ProductFormBasic from "./ProductFormBasic";
import { productFormDefaults, productFormSchema } from "./ProductFormSchema";

export function ProductForm({ edit = false }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [productData, errorOnProductData] = useProductData(productId);
  const [updateProduct, isUpdating] = useUpdateProduct();
  const [createProduct, isCreating] = useCreateProduct();
  const [updateProductImage, isUpdatingImage] = useUpdateProductImage();

  const form = useForm({
    resolver: yupResolver(productFormSchema),
    defaultValues: productFormDefaults,
  });

  useEffect(() => {
    if (errorOnProductData) {
      console.log("There was an error retrieving the product data.");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was an error retrieving the customer data",
      });
    }
  }, [errorOnProductData]);

  useEffect(() => {
    if (edit && productData) {
      form.reset(productData);
    }
  }, [productData]);

  function preProcess(data) {
    data.contentSize += data.unit;
    if (data.expirationDate) {
      data.expirationDate = data.expirationDate.toISOString().split("T")[0];
    }
    data.tags = data.tags.map((t) => ({ tagNo: t.value }));
  }

  async function handleSubmit(data) {
    preProcess(data);

    if (edit) {
      await updateProduct(data);
    } else {
      const { productNo } = await createProduct(data);
      if (data.imageFile) {
        await updateProductImage({
          productNo: productNo,
          image: data.imageFile,
        });
      }
    }
    navigate("/productos");
  }

  function handleCancellation() {
    navigate("/productos");
  }

  const buttonSubmitContent = () => {
    if (isUpdating || isCreating || isUpdatingImage) {
      return <Loader2 className="animate-spin"></Loader2>;
    }
    return edit ? "Guardar" : "Confirmar";
  };

  return (
    <DynamicPanel
      leftActions={
        <>
          <h2 className="text-lg font-bold">
            {edit ? "Editar" : "Nuevo"} Producto
          </h2>
        </>
      }
      rightActions={
        <>
          <Button variant="destructive" onClick={handleCancellation}>
            Cancelar
          </Button>
          <Button form="product-form" type="submit">
            {buttonSubmitContent()}
          </Button>
        </>
      }
    >
      <Form
        id="product-form"
        form={form}
        onValidSubmit={handleSubmit}
        className="h-full px-10 py-5"
      >
        <Tabs defaultValue="basic">
          <TabsList className="mx-auto grid w-1/3 grid-cols-2">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="advanced">Avanzado</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <ProductFormBasic />
          </TabsContent>
          <TabsContent value="advanced">
            <ProductFormAdvanced />
          </TabsContent>
        </Tabs>
      </Form>
    </DynamicPanel>
  );
}
