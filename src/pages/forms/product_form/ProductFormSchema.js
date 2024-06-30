import * as yup from "yup";

export const allowedUnits = ["g", "mg", "ml", "cc"];

const today = new Date();
export const nextMonth = new Date(today.setMonth(today.getMonth() + 1));

yup.addMethod(yup.mixed, "optionalImageFile", function () {
  return this.test(
    "fileType",
    "El archivo debe ser una imagen",
    (value) => !value || value.type.includes("image/"),
  ).test(
    "fileSize",
    "El archivo no debe superar los 2MB",
    (value) => !value || value.size <= 2 * 1024 * 104,
  );
});

const tagSchema = yup.object().shape({
  value: yup.number(),
  label: yup.string(),
});

const requiredMessage = "Este campo es requerido";
const optionalNumber = yup.number().nullable();
const positiveInteger = yup
  .number()
  .integer("No se admiten decimales")
  .positive("No se admiten signos")
  .transform((value) => (isNaN(value) ? null : value));

export const productFormSchema = yup
  .object({
    catalogNo: yup.number().required("El nombre es requerido"),
    categoryNo: optionalNumber,
    subcategoryNo: optionalNumber,
    providerNo: optionalNumber,
    unit: yup.string().oneOf(allowedUnits).required(),
    discount: positiveInteger.max(100, "No puede ser mas del 100%").nullable(),
    consign: yup.bool(),
    purchasePriceUnit: positiveInteger.nonNullable(requiredMessage),
    sellingPriceUnit: positiveInteger.nonNullable(requiredMessage),
    adminRouteNo: optionalNumber,
    dosageFormNo: optionalNumber,
    tags: yup.array().of(tagSchema).nullable(),
    contentSize: positiveInteger
      .moreThan(0, "Cantidad debe ser mayor a 0")
      .nonNullable(requiredMessage)
      .required(requiredMessage),
    expirationDate: yup
      .date()
      .min(
        nextMonth,
        "La fecha de expiración debe ser 1 mes posterior a la fecha actual como mínimo",
      )
      .nonNullable(requiredMessage)
      .required(requiredMessage),
    imageFile: yup.mixed().optionalImageFile().nullable(),
  })
  .required();

export const productFormDefaults = {
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
  imageFile: null,
  tags: [],
};
