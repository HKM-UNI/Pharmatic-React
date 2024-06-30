import { FormInput, LazyFormComboBox } from "@/components/custom_form";

export default function ProductFormAdvanced() {
  return (
    <div className="flex justify-center pb-10 pt-5 md:pt-16">
      <div className="grid w-80 grid-cols-1 gap-3 md:w-2/3 md:grid-cols-2 md:gap-4">
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
      </div>
    </div>
  );
}
