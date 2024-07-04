import * as yup from "yup";

// Este es un custom esquema que despues puede ser llamado como
//  yup.mixed().optionalImageFile()
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

const permissionSchema = yup.object().shape({
  scope_id: yup.string(),
  read: yup.bool(),
  write: yup.bool(),
  delete: yup.bool(),
});

const requiredMessage = "Este campo es requerido";
const requiredString = yup.string().required(requiredMessage);

const eightDigitMessage = "El numero debe ser de 8 dígitos";
const nicaraguanPhoneOptional = yup
  .number()
  .nullable()
  .transform((value) => (isNaN(value) ? null : value))
  .integer("No se admiten decimales")
  .positive("No se admiten signos")
  .min(10000000, eightDigitMessage)
  .max(99999999, eightDigitMessage);

const userFormShape = {
  email: yup.string().nullable().email("No es un correo válido."),
  username: requiredString,
  password: requiredString,
  pharmacistCode: requiredString,
  phone: nicaraguanPhoneOptional,
  roleId: yup.number().nullable(),
  permissions: yup.array().of(permissionSchema).optional().nullable(),
  imageFile: yup.mixed().optionalImageFile().nullable(),
};

const userFormEditShape = {
  ...userFormShape,
};
delete userFormEditShape.password;

export const userFormSchema = yup.object(userFormShape).required();
export const userFormEditSchema = yup.object(userFormEditShape).required();

export const userFormDefaults = {
  username: null,
  email: null,
  password: null,
  pharmacisCode: null,
  phone: null,
  roleId: null,
  permissions: [{ scope_id: "", read: false, write: false, delete: false }],
  imageFile: null,
};
