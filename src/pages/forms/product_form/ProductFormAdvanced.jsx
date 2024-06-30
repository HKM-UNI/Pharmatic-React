import { FormInput, LazyFormComboBox } from "@/components/custom_form";

/** @typedef {import("@/hooks/product_hooks").InitialProductFormOptions} InitialProductFormOptions */

/** @param {{ initialOptions: InitialProductFormOptions}} */
export default function ProductFormAdvanced({ initialOptions }) {
  return (
    <div className="flex justify-center pb-5 pt-5 2xl:pt-16">
      <div className="grid w-80 grid-cols-1 gap-3 md:w-2/3 md:grid-cols-2 md:gap-4">
        <LazyFormComboBox
          endpoint="categories"
          fieldname="categoryNo"
          searchPlaceHolder="Buscar Categoría"
          selectPlaceHolder="Selecciona Categoría"
          label="Categoría"
          initialOptions={initialOptions.categories}
          optionMapper={(c) => ({ label: c.name, value: c.categoryNo })}
        />

        <LazyFormComboBox
          endpoint="subcategories"
          fieldname="subcategoryNo"
          searchPlaceHolder="Buscar sub categoría"
          selectPlaceHolder="Selecciona Sub categoría"
          label="Sub categoría"
          initialOptions={initialOptions.subcategories}
          optionMapper={(s) => ({ label: s.name, value: s.subcategoryNo })}
        />

        <LazyFormComboBox
          endpoint="providers"
          fieldname="providerNo"
          searchPlaceHolder="Buscar Proveedor"
          selectPlaceHolder="Selecciona Proveedor"
          label="Proveedor"
          initialOptions={initialOptions.providers}
          optionMapper={(p) => ({ label: p.name, value: p.providerNo })}
        />

        <LazyFormComboBox
          endpoint="dosage_forms"
          fieldname="dosageFormNo"
          searchPlaceHolder="Buscar tipo de dósis"
          selectPlaceHolder="Selecciona tipo de dósis"
          label="Tipo de dósis"
          initialOptions={initialOptions.dosageForms}
          optionMapper={(d) => ({ label: d.name, value: d.dosageFormNo })}
        />

        <LazyFormComboBox
          endpoint="admin_routes"
          fieldname="adminRouteNo"
          searchPlaceHolder="Buscar Vía de administración"
          selectPlaceHolder="Selecciona Vía de administración"
          label="Vía de administración"
          initialOptions={initialOptions.adminRoutes}
          optionMapper={(a) => ({
            label: a.description,
            value: a.adminRouteNo,
          })}
        />

        <LazyFormComboBox
          endpoint="tags"
          fieldname="tags"
          searchPlaceHolder="Buscar Etiquetas"
          selectPlaceHolder="Seleccionar Etiquetas"
          label="Etiquetas"
          multipleValues={true}
          initialOptions={initialOptions.tags}
          optionMapper={(t) => ({ label: t.name, value: t.tagNo })}
        />

        <FormInput
          startAdornment="%"
          type="number"
          fieldname="discount"
          label="Descuento"
          placeholder="0"
        />
      </div>
    </div>
  );
}
