import {
  DatePicker,
  Form,
  FormInput,
  FormSelect,
  LazyFormComboBox,
} from "@/components/custom_form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import * as yup from "yup";

const today = new Date();
const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
const allowedUnits = ["g", "mg", "ml", "cc"];

const tagSchema = yup.object().shape({
  value: yup.number(),
  label: yup.string(),
});

const requiredMessage = "Este campo es requerido";
const positiveInteger = yup
  .number()
  .integer("No se admiten decimales")
  .positive("No se admiten signos")
  .transform((value) => (isNaN(value) ? null : value));

const formSchema = yup
  .object({
    catalogNo: yup.number().required("El nombre es requerido"),
    categoryNo: yup.number().nullable(),
    subcategoryNo: yup.number().nullable(),
    providerNo: yup.number().nullable(),
    contentSize: positiveInteger
      .moreThan(0, "Cantidad debe ser mayor a 0")
      .nonNullable(requiredMessage)
      .required(requiredMessage),
    unit: yup.string().oneOf(allowedUnits).required(),
    discount: positiveInteger.max(100, "No puede ser mas del 100%").nullable(),
    consign: yup.bool(),
    purchasePriceUnit: positiveInteger.nonNullable(requiredMessage),
    sellingPriceUnit: positiveInteger.nonNullable(requiredMessage),
    expirationDate: yup
      .date()
      .min(
        nextMonth,
        "La fecha de expiración debe ser 1 mes posterior a la fecha actual como mínimo",
      )
      .nonNullable(requiredMessage)
      .required(requiredMessage),
    adminRouteNo: yup.number().nullable(),
    dosageFormNo: yup.number().nullable(),
    tags: yup.array().of(tagSchema).nullable(),
  })
  .required();

const productDefaults = {
  catalogNo: null,
  categoryNo: null,
  subcategoryNo: null,
  providerNo: null,
  contentSize: null,
  unit: "g",
  consign: false,
  discount: null,
  purchasePriceUnit: null,
  sellingPriceUnit: null,
  expirationDate: null,
  adminRouteNo: null,
  dosageFormNo: null,
  tags: [],
};

export default function ProductForm({ edit = false }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [productData, errorOnProductData] = useProductData(productId);
  const [updateProduct, isUpdating] = useUpdateProduct();
  const [createProduct, isCreating] = useCreateProduct();
  const [updateProductImage, isUpdatingImage] = useUpdateProductImage();

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

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: productDefaults,
  });

  function preProcess(values) {
    values.contentSize += values.unit;
    if (values.expirationDate) {
      values.expirationDate = values.expirationDate.toISOString().split("T")[0];
    }
    values.tags = values.tags.map((t) => ({ tagNo: t.value }));
  }

  async function handleSubmit(data) {
    preProcess(data);

    if (edit) {
      await updateProduct(data);
    } else {
      await createProduct(data);
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
        <div className="flex justify-center pb-10 pt-5 md:pt-16">
          <div className="grid w-80 grid-cols-1 gap-3 md:w-2/3 md:grid-cols-2 md:gap-4">
            <LazyFormComboBox
              endpoint="product_catalog"
              fieldname="catalogNo"
              searchPlaceHolder="Buscar producto"
              selectPlaceHolder="Selecciona producto"
              label={
                <>
                  Nombre producto &ensp;
                  <Button
                    type="button"
                    variant="link"
                    className="m-0 ml-2 p-0"
                    size="sm"
                    onClick={() => alert("hola")}
                  >
                    Agregar +
                  </Button>
                </>
              }
              optionMapper={(c) => ({ label: c.name, value: c.catalogNo })}
            />

            <LazyFormComboBox
              endpoint="categories"
              fieldname="categoryNo"
              searchPlaceHolder="Buscar Categoría"
              selectPlaceHolder="Selecciona Categoría"
              label="Categoría"
              optionMapper={(c) => ({ label: c.name, value: c.categoryNo })}
            />

            <LazyFormComboBox
              endpoint="subcategories"
              fieldname="subcategoryNo"
              searchPlaceHolder="Buscar sub categoría"
              selectPlaceHolder="Selecciona Sub categoría"
              label="Sub categoría"
              optionMapper={(s) => ({ label: s.name, value: s.subcategoryNo })}
            />

            <LazyFormComboBox
              endpoint="providers"
              fieldname="providerNo"
              searchPlaceHolder="Buscar Proveedor"
              selectPlaceHolder="Selecciona Proveedor"
              label="Proveedor"
              optionMapper={(p) => ({ label: p.name, value: p.providerNo })}
            />

            <LazyFormComboBox
              endpoint="dosage_forms"
              fieldname="dosageFormNo"
              searchPlaceHolder="Buscar tipo de dósis"
              selectPlaceHolder="Selecciona tipo de dósis"
              label="Tipo de dósis"
              optionMapper={(d) => ({ label: d.name, value: d.dosageFormNo })}
            />

            <LazyFormComboBox
              endpoint="admin_routes"
              fieldname="adminRouteNo"
              searchPlaceHolder="Buscar Vía de administración"
              selectPlaceHolder="Selecciona Vía de administración"
              label="Vía de administración"
              optionMapper={(a) => ({
                label: a.description,
                value: a.adminRouteNo,
              })}
            />

            <div className="flex flex-row items-end gap-2">
              <FormInput
                className="text-right"
                fieldname="contentSize"
                label="Cantidad"
                type="number"
                placeholder="0"
              />
              <FormSelect
                fieldname="unit"
                label={null}
                placeholder="g"
                options={allowedUnits.map((u) => ({ value: u, label: u }))}
              />
            </div>

            <DatePicker
              fieldname="expirationDate"
              label="Fecha de expiración"
              fromYear={nextMonth.getFullYear()}
              toYear={2099}
              defaultMonth={nextMonth}
              minDate={nextMonth}
            />

            <FormInput
              startAdornment="C$"
              type="number"
              fieldname="purchasePriceUnit"
              label="Precio compra"
              placeholder="0"
            />

            <FormInput
              startAdornment="C$"
              type="number"
              fieldname="sellingPriceUnit"
              label="Precio venta"
              placeholder="0"
            />

            <FormInput
              startAdornment="%"
              type="number"
              fieldname="discount"
              label="Descuento"
              placeholder="0"
            />

            <LazyFormComboBox
              endpoint="tags"
              fieldname="tags"
              searchPlaceHolder="Buscar Tag"
              selectPlaceHolder="Selecciona Tag"
              label="Tags"
              multipleValues={true}
              optionMapper={(t) => ({ label: t.name, value: t.tagNo })}
            />

            <div className="flex items-center space-x-4">
              <Switch fieldname="consign" />
              <Label>En consigna 🛡️</Label>
            </div>
          </div>
        </div>
      </Form>
    </DynamicPanel>
  );
}
