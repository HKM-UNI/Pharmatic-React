import { Form, FormComboBox, FormInput } from "@/components/custom_form/form";
import { Button } from "@/components/ui/button";
import { useCatalogs } from "@/hooks/catalog_hooks";
import { useCategories } from "@/hooks/category_hooks";
import { useProviders } from "@/hooks/provider_hooks";
import { useSubcategories } from "@/hooks/subcategory_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LoadingPanel from "../LoadingPanel";
import { DatePicker } from "@/components/custom_form";
import { CirclePlus } from "lucide-react";
import { useAdminRoutes } from "@/hooks/adminRoute_hooks";
import { useDosageForms } from "@/hooks/dosageForm_hooks";
import { useTags } from "@/hooks/tag_hooks";

const today = new Date();
const nextMonth = new Date(today.setMonth(today.getMonth() + 1));

const tagSchema = yup.object().shape({
  value: yup.number(),
  label: yup.string(),
});

const formSchema = yup
  .object({
    catalogNo: yup.number().required("El nombre es requerido"),
    categoryNo: yup.number().nullable(),
    subcategoryNo: yup.number().nullable(),
    providerNo: yup.number().nullable(),
    contentSize: yup
      .number()
      .integer()
      .moreThan(0, "Cantidad debe ser mayor a 0")
      .nullable(),
    discount: yup
      .number()
      .positive("No se admiten signos")
      .max(100, "No puede ser mas del 100%")
      .nullable(),
    consign: yup.bool(),
    purchasePriceUnit: yup.number().positive("No se admiten signos"),
    sellingPriceUnit: yup.number().positive("No se admiten signos"),
    expirationDate: yup
      .date()
      .min(
        nextMonth,
        "La fecha de expiración debe ser 1 mes posterior a la fecha actual como mínimo",
      )
      .required(),
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
  discount: null,
  consign: false,
  purchasePrice: null,
  sellingPrice: null,
  adminRouteNo: null,
  dosageFormNo: null,
  tags: null,
};

export default function ProductForm() {
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

  function onSubmit(values) {
    console.log(`Formulario: ${values}`);
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
          <Button variant="destructive">Cancelar</Button>
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

            <FormInput
              fieldname="contentSize"
              label="Cantidad"
              placeholder="0mg"
            />

            <DatePicker
              fieldname="expirationDate"
              label="Fecha de expiración"
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
