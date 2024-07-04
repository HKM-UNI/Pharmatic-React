import {
  DatePicker,
  FormInput,
  FormSelect,
  FormSwitch,
  LazyFormComboBox,
} from "@/components/custom_form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ProductFormImage from "./ProductFormImage";
import { allowedUnits, nextMonth } from "./ProductFormSchema";

/** @typedef {import("@/hooks/product_hooks").InitialProductFormOptions} InitialProductFormOptions */

/** @param {{ initialOptions: InitialProductFormOptions, defaultImgSrc: string }} */
export default function ProductFormBasic({ initialOptions, defaultImgSrc }) {
  return (
    <div className="flex items-start justify-center gap-10 pb-5 pt-5 2xl:pt-16">
      <div className="w-80 space-y-4 md:w-2/5 2xl:w-1/4">
        <LazyFormComboBox
          endpoint="product_catalog"
          fieldname="catalogNo"
          searchPlaceHolder="Buscar producto"
          selectPlaceHolder="Selecciona producto"
          initialOptions={initialOptions.catalogs}
          label="Nombre Producto"
          // {
          //   <>
          //     Nombre producto &ensp;
          //     <Button
          //       type="button"
          //       variant="link"
          //       className="m-0 ml-2 p-0"
          //       size="sm"
          //       onClick={() => alert("hola")}
          //     >
          //       Agregar +
          //     </Button>
          //   </>
          // }
          optionMapper={(c) => ({ label: c.name, value: c.catalogNo })}
        />

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
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

          <div className="col-span-2 mt-3 flex items-center justify-end space-x-4">
            <FormSwitch fieldname="consign" />
            <Label>En consigna 🛡️</Label>
          </div>
        </div>
      </div>

      <ProductFormImage defaultSrc={defaultImgSrc} />
    </div>
  );
}
