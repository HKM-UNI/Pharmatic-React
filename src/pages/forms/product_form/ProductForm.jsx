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

export function ProductForm({ edit = false }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [productData, errorOnProductData] = useProductData(productId);
  const initialOpts = useInitialFormOptions(productData);

  const [updateProduct, isUpdating] = useUpdateProduct();
  const [createProduct, isCreating] = useCreateProduct();
  const [updateProductImage, isUpdatingImage] = useUpdateProductImage();

  const [defaultImageSrc, setDefaultImageSrc] = useState("/drug_default.png");
  const imgChangedRef = useRef(false);

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
      updateProductForm(productData);
    }
  }, [productData]);

  /** @param {Product} p */
  function updateProductForm(p) {
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

  function updateFormContentSize(formData, contentSize) {
    const match = contentSize.match(/(\d+)(\w+)/);
    const [contentNumber, unit] = match.slice(1);

    formData.contentSize = contentNumber;
    formData.unit = unit;
  }

  function updateFormImage(url) {
    fetchImageAsObjectUrl(url).then((objUrl) => setDefaultImageSrc(objUrl));
  }

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
      // Monkeypatch ya que esto es data del formulario y no directamente de la response en modo edicion
      data.productNo = productId;
      product = await updateProduct(data);
    } else {
      product = await createProduct(data);
    }

    // Evita subir la misma imagen si no se ha cambiado
    if (imgChangedRef.current && data.imageFile) {
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
              onImageChange={() => (imgChangedRef.current = true)}
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
