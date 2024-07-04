import { Form } from "@/components/custom_form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { fetchImageAsObjectUrl } from "@/helpers";
import {
  useCreateProduct,
  useInitialFormOptions,
  useProductData,
  useUpdateProduct,
  useUpdateProductImage,
} from "@/hooks/product_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductFormAdvanced from "./ProductFormAdvanced";
import ProductFormBasic from "./ProductFormBasic";
import { productFormDefaults, productFormSchema } from "./ProductFormSchema";

/** @typedef {import("@/data/product").Product} Product */

/* Este form se compone de dos partes: Una básica y una Avanzada

  Siempre que se usen los elementos de "custom_form"
   no hay problema incluso si tuviera una tercera parte,
   debido a que cada uno recupera el "form" mediante "FormContext".
*/

export function ProductForm({ edit = false }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { productId } = useParams();

  /* Ya que "productId" puede ser "undefined" o "null",
      "producData" también puede ser "undefined" o "null"
      y debe ser validado en cualquier parte.
  */
  const [productData, _, errorOnProductData] =
    useProductData(productId);

  // Opciones iniciales para los LazyFormComboBox
  const initialOpts = useInitialFormOptions(productData);

  const [updateProduct, isUpdating] = useUpdateProduct();
  const [createProduct, isCreating] = useCreateProduct();
  const [updateProductImage, isUpdatingImage] = useUpdateProductImage();

  // Esta es la ruta que se usara en la imagen
  // En modo edicion se cambia a una ruta "ObjectUrl" que corresponde a la del producto.
  const [defaultImageSrc, setDefaultImageSrc] = useState("/drug_default.png");

  const form = useForm({
    resolver: yupResolver(productFormSchema),
    defaultValues: productFormDefaults,
  });

  useEffect(() => {
    if (errorOnProductData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo obtener los datos del producto",
      });
    }
  }, [errorOnProductData]);

  useEffect(() => {
    if (edit && productData) {
      // Si esta en modo edicion y se recuperaron correctamente los datos del producto
      // Actualiza los valores del formulario
      updateProductForm(productData);
    }
  }, [productData]);

  /** @param {Product} p */
  function updateProductForm(p) {
    /*
      "formData" contendrá los valores transformados para coincidir con el esquema.
      Por ejemplo, "expirationDate" viene en formato string, pero hay que pasarlo a Date
        o los precios que tambien estan en string, pero hay que pasarlos a numeros.
      El esquema tampoco tiene datos anidados, entonces tambien necesitan mappping.
    */
    const formData = {
      catalogNo: p.catalog.catalogNo,
      categoryNo: p.category?.categoryNo,
      subcategoryNo: p.subcategory?.subcategoryNo,
      providerNo: p.provider?.providerNo,
      contentSize: null,
      unit: "g",
      consign: p.consign,
      discount: p.discount,
      purchasePriceUnit: +p.purchasePriceUnit,
      sellingPriceUnit: +p.sellingPriceUnit,
      expirationDate: new Date(p.expirationDate),
      adminRouteNo: p.adminRoute?.adminRouteNo,
      dosageFormNo: p.dosageForm?.dosageFormNo,
      imageFile: null,
      tags: p.tags.map((t) => ({ value: t.tagNo, label: t.name })),
    };

    updateFormContentSize(formData, p.contentSize);
    if (p.imageUrl) {
      updateFormImage(p.imageUrl);
    }

    form.reset(formData);
  }

  /* Separa el numero y la unidad de medida en "contenSize"
      y lo establece en el campo de "formData"
    eje: "500mg" ->
      formData.contentSize = 500
      formData.unit = "mg"
  */
  function updateFormContentSize(formData, contentSize) {
    const match = contentSize.match(/(\d+)(\w+)/);
    const [contentNumber, unit] = match.slice(1);

    formData.contentSize = contentNumber;
    formData.unit = unit;
  }

  function updateFormImage(url) {
    fetchImageAsObjectUrl(url).then((objUrl) => setDefaultImageSrc(objUrl));
  }

  // Vuelve a procesar los datos para coincidir con los de backend.
  function preProcess(data) {
    data.contentSize += data.unit;
    if (data.expirationDate) {
      data.expirationDate = data.expirationDate.toISOString().split("T")[0];
    }
    data.tags = data.tags.map((t) => ({ tagNo: t.value }));
  }

  async function handleSubmit(data) {
    preProcess(data);
    let product = { productNo: 0 };

    if (edit) {
      /* En otros formularios como "CustomerForm" o "ProviderForm"
          "data" es un objeto recibido directamente de backend,
          por lo que ya tiene Id's como "customerNo" o "providerNo",

          Pero en este caso, son datos de "formData"
            asi que es necesario agregarle el "productNo".
      */
      data.productNo = productId;
      product = await updateProduct(data);
    } else {
      product = await createProduct(data);
    }

    if (data.imageFile) {
      await updateProductImage({
        productNo: product.productNo,
        image: data.imageFile,
      });
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
            <ProductFormBasic
              initialOptions={initialOpts}
              defaultImgSrc={defaultImageSrc}
            />
          </TabsContent>
          <TabsContent value="advanced">
            <ProductFormAdvanced initialOptions={initialOpts} />
          </TabsContent>
        </Tabs>
      </Form>
    </DynamicPanel>
  );
}
