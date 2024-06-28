import { DatePicker } from "@/components/custom_form";
import {
  Form,
  FormComboBox,
  FormInput,
  FormSelect,
} from "@/components/custom_form/form";
import { Button } from "@/components/ui/button";
import { useAdminRoutes } from "@/hooks/adminRoute_hooks";
import { useCatalogs } from "@/hooks/catalog_hooks";
import { useCategories } from "@/hooks/category_hooks";
import { useDosageForms } from "@/hooks/dosageForm_hooks";
import { useProviders } from "@/hooks/provider_hooks";
import { useSubcategories } from "@/hooks/subcategory_hooks";
import { useTags } from "@/hooks/tag_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LoadingPanel from "../LoadingPanel";
import { useNavigate } from "react-router-dom";

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

export default function ProductForm() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: productDefaults,
  });

  const [catalogs, catalogIsLoading, catalogsError, updateCatalogList] =
    useCatalogs();
  const [categories, categoryIsLoading, categoriesError, updateCategoryList] =
    useCategories();
  const [
    subcategories,
    subcategoryIsLoading,
    subcategoriesError,
    updateSubcategoryList,
  ] = useSubcategories();
  const [providers, providerIsLoading, providerError, updateProviderList] =
    useProviders();
  const [
    dosageForms,
    dosageFormIsLoading,
    dosageFormError,
    updateDosageFormList,
  ] = useDosageForms();
  const [
    administrationRoutes,
    admRouteIsLoading,
    admRouteError,
    updateAdmRouteList,
  ] = useAdminRoutes();
  const [tags, tagIsLoading, tagError, updateTagList] = useTags();

  if (
    catalogIsLoading ||
    categoryIsLoading ||
    subcategoryIsLoading ||
    providerIsLoading ||
    dosageFormIsLoading ||
    admRouteIsLoading ||
    tagIsLoading
  ) {
    return <LoadingPanel />;
  }

  function preProcess(values) {
    values.contentSize += values.unit;
    if (values.expirationDate) {
      values.expirationDate = values.expirationDate.toISOString().split("T")[0];
    }
  }

  function onSubmit(values) {
    preProcess(values);
    console.log(`Formulario: ${JSON.stringify(values)}`);
  }

  function handleCancellation() {
    navigate("/productos");
  }

  return (
    <DynamicPanel
      leftActions={
        <>
          <h2 className="text-lg font-bold">Nuevo Producto</h2>
        </>
      }
      rightActions={
        <>
          <Button variant="destructive" onClick={handleCancellation}>
            Cancelar
          </Button>
          <Button form="product-form" type="submit">
            Agregar
          </Button>
        </>
      }
    >
      <Form
        id="product-form"
        form={form}
        onValidSubmit={onSubmit}
        className="h-full px-10 py-5"
      >
        <div className="flex justify-center pb-10 pt-5 md:pt-16">
          <div className="grid w-80 grid-cols-1 gap-3 md:w-2/3 md:grid-cols-2 md:gap-4">
            <FormComboBox
              options={catalogs.map((c) => ({
                value: c.catalogNo,
                label: c.name,
              }))}
              fieldname="catalogNo"
              searchPlaceHolder="Buscar producto"
              selectPlaceHolder="Selecciona producto"
              label="Nombre producto"
            />

            <FormComboBox
              options={categories.map((c) => ({
                value: c.categoryNo,
                label: c.name,
              }))}
              fieldname="categoryNo"
              searchPlaceHolder="Buscar Categoría"
              selectPlaceHolder="Selecciona Categoría"
              label="Categoría"
            />

            <FormComboBox
              options={subcategories.map((s) => ({
                value: s.subcategoryNo,
                label: s.name,
              }))}
              fieldname="subcategoryNo"
              searchPlaceHolder="Buscar sub categoría"
              selectPlaceHolder="Selecciona Sub categoría"
              label="Sub categoría"
            />

            <FormComboBox
              options={providers.map((p) => ({
                value: p.providerNo,
                label: p.name,
              }))}
              fieldname="providerNo"
              searchPlaceHolder="Buscar Proveedor"
              selectPlaceHolder="Selecciona Proveedor"
              label="Proveedor"
            />

            <FormComboBox
              options={dosageForms.map((d) => ({
                value: d.dosageFormNo,
                label: d.name,
              }))}
              fieldname="dosageFormNo"
              searchPlaceHolder="Buscar tipo de dósis"
              selectPlaceHolder="Selecciona tipo de dósis"
              label="Tipo de dósis"
            />

            <FormComboBox
              options={administrationRoutes.map((a) => ({
                value: a.adminRouteNo,
                label: a.description,
              }))}
              fieldname="adminRouteNo"
              searchPlaceHolder="Buscar Vía de administración"
              selectPlaceHolder="Selecciona Vía de administración"
              label="Vía de administración"
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

            <FormComboBox
              options={tags.map((t) => ({
                value: t.tagNo,
                label: t.name,
              }))}
              fieldname="tags"
              searchPlaceHolder="Buscar Tag"
              selectPlaceHolder="Selecciona Tag"
              label="Tags"
              multipleValues={true}
            />
          </div>
        </div>
      </Form>
    </DynamicPanel>
  );
}
