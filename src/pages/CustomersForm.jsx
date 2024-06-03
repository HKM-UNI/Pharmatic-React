"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import {
  DatePicker,
  Form,
  FormInput,
  FormSelect,
} from "@/components/custom_form";
import { Button } from "@/components/ui/button";
import {
  useCreateCustomer,
  useCustomerData,
  useUpdateCustomer,
} from "@/hooks/customer_hooks";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";

/* 
  Este es un esquema para declarar los campos y tipos de datos que llevará el formulario,
  también se pueden hacer validaciones.

  ver mas en https://github.com/jquense/yup
 */

const formSchema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    surname: yup.string().required("El apellido es requerido"),
    phone: yup
      .number()
      .nullable()
      .positive("No se admiten signos")
      .integer("No es un número de teléfono válido")
      .transform((value) => (isNaN(value) ? null : value)),
    email: yup.string().nullable().email("No es un correo eletrónico válido"),
    gender: yup.string().nullable(),
    birthDate: yup.date().nullable(),
  })
  .required();

/* Estos son los valores por defecto que tendrá el formulario al cargar por primera vez

  TODOS los campos declarados en el esquema deben ir aquí, de lo contrario generará errores
  en el controlador.
 */
const customerDefaults = {
  name: "",
  surname: "",
  phone: null,
  email: null,
  gender: null,
  birthDate: null,
};

export default function CustomersForm({ edit = false }) {
  const navigate = useNavigate();

  /* Parametro recuperado de la url del Router
    https://v5.reactrouter.com/web/example/url-params
   */
  const { customerId } = useParams();

  /* Similar a los endpoints anteriormente vistos, pero no hay una flag "loading",
    ya que suele ser muy rápido.
   */
  const [customerData, errorOnCustomerData] = useCustomerData(customerId);

  const [updateCustomer, isUpdating] = useUpdateCustomer();
  const [createCustomer, isCreating] = useCreateCustomer();

  if (edit && errorOnCustomerData) {
    console.log("There was an error retrieving the customer data");
    return null;
  }

  /* Este es un hook propio de "react-hook-form".
    Es similar al ejemplo en la documentación, pero en lugar de usar "zod" se usa "yup"
    como resolver, ya que es más sencillo.

    https://ui.shadcn.com/docs/components/form#usage.
  */
  const form = useForm({
    resolver: yupResolver(formSchema),
    /* "useMemo" puede usar datos en caché de "customerData" con cada refresh
     Puede no ser necesario dado que SWR también implementa una caché. */
    defaultValues: useMemo(
      () => customerData || customerDefaults,
      [customerData]
    ),
  });

  /* Solo cuando está en modo de edición, cargará los datos del cliente a editar
    y restablecerá el formulario con estos.
  */
  useEffect(() => {
    if (edit && customerData) {
      form.reset(customerData);
    }
  }, [customerData]);

  /* "Yup" no deja definir el formato que tendrá la fecha al mandarse en json.
    Este es un truco para reasignar la fecha en formato "YYYY-MM-DD", aunque como string.
   */
  function preProcess(data) {
    if (data.birthDate) {
      data.birthDate = data.birthDate.toISOString().split("T")[0];
    }
  }

  /* Este "submit" se utiliza internamente en el controlador del formulario,
    Así que previene ya previene la recarga de la página por defecto.

    Los datos son exactamente los mismos del esquema.
    */
  async function handleSubmit(data) {
    preProcess(data);

    if (edit) {
      await updateCustomer(data);
    } else {
      await createCustomer(data);
    }

    navigate("/clientes");
  }

  /* Esta es una función que solo se maneja aquí, pero por defecto cualquier "submit"
    manda a recargar la página. Para evitarlo, se llama a "event.preventDefault".
   */
  function handleCancelation(event) {
    event.preventDefault();
    navigate("/clientes");
  }

  const buttonSubmitContent = () => {
    if (isUpdating || isCreating) {
      return <Loader2 className="animate-spin"></Loader2>;
    }
    return edit ? "Guardar" : "Confirmar";
  };

  return (
    /* Este es un componente personalizado que envuelve (wraps) al Form original de Shad

      "form" es REQUERIDO, y se refiere al estado de "useForm"
      "onValidSubmit" es una función que se llamará con los datos del formulario, solo si es válido
      (debe cumplir con los validadores).
    */
    <Form
      form={form}
      onValidSubmit={handleSubmit}
      className="h-full py-5 px-10"
    >
      <div className="flex flex-wrap w-full justify-between items-center">
        <h2 className="font-bold text-lg w-full mb-8 sm:w-auto sm:mb-0">
          {edit ? "Editar" : "Nuevo"} cliente
        </h2>

        <div className="flex items-center gap-3 text-end w-full sm:w-auto">
          <Button variant="destructive" onClick={handleCancelation}>
            Cancelar
          </Button>
          <Button>{buttonSubmitContent()}</Button>
        </div>
      </div>

      <div className="flex justify-center pb-10 pt-5 md:pt-16">
        <div className="grid grid-cols-1 gap-3 md:gap-4 w-80 md:grid-cols-2 md:w-2/3">

          {/* Estos son componentes personalizados para USARSE SOLO CON EL COMPONENTE "Form",
            ya que usan un contexto específico.

            "fieldname" debe llamarse igual que el campo a controlar en el esquema,
            para permitir que actualice la información automáticamente.

            Para mas detalles, ver los componentes en el archivo /src/components/custom_form/form
          */}
          <FormInput fieldname="name" label="Nombre" placeholder="Juan" />
          <FormInput fieldname="surname" label="Apellido" placeholder="Doe" />
          <FormInput
            type="email"
            fieldname="email"
            label="Correo Electrónico"
            placeholder="juan.doe@gmail.com"
          />
          <FormInput
            type="number"
            fieldname="phone"
            label="Número de teléfono"
            placeholder="89764532"
          />
          <FormSelect
            fieldname="gender"
            label="Sexo"
            options={[
              { label: "Masculino", value: "M" },
              { label: "Femenino", value: "F" },
            ]}
          />
          <DatePicker fieldname="birthDate" label="Fecha" />
        </div>
      </div>
    </Form>
  );
}
