import { Form, FormComboBox } from "@/components/custom_form/form";
import { Button } from "@/components/ui/button";
import { useCatalogs } from "@/hooks/catalog_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup
  .object({
    catalogNo: yup.number().required("El nombre es requerido"),
    categoryNo: yup.number(),
    subcategoryNo: yup.number(),
    providerNo: yup.number(),
    contentSize: yup.number().integer().moreThan(0),
    discount: yup.number().positive().min(0).max(100),
    consign: yup.bool(),
    purchasePrice: yup.number().positive(),
    sellingPrice: yup.number().positive(),
    tags: yup.string(),
  })
  .required();

const productDefaults = {
  catalogNo: 1,
  categoryNo: null,
  subcategoryNo: null,
  providerNo: null,
  contentSize: null,
  discount: null,
  consign: false,
  purchasePrice: null,
  sellingPrice: null,
  tags: "",
};

export default function ProductForm() {
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: productDefaults,
  });

  function onSubmit(values) {
    console.log(values);
  }

  const [catalogs, isLoading, error, updateCatalogList] = useCatalogs();
  const [cbCatalogValue, cbCatalogSetValue] = useState(1);
  const [cbCatalogOpen, cbCatalogSetOpen] = React.useState(false);

  let catalogOptions = [];
  if (catalogs) {
    catalogOptions = catalogs.map((item) => ({
      value: item.catalogNo,
      label: item.name,
    }));
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
              options={catalogOptions}
              open={cbCatalogOpen}
              setOpen={cbCatalogSetOpen}
              value={cbCatalogValue}
              setValue={cbCatalogSetValue}
              fieldname="catalogNo"
            />
          </div>
        </div>
      </Form>
    </DynamicPanel>
  );
}
