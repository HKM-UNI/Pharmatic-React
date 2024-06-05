import { Button } from "@/components/ui/button";
import PharmaticCard from "@/components/ui/pharmatic-card";
import { useCustomers, useDeleteCustomer } from "@/hooks/customer_hooks";
import { PersonGeneric, UserFemaleIcon, UserMaleIcon } from "@/icons";
import { useNavigate } from "react-router-dom";

import {
  CalendarDays,
  CalendarOff,
  Loader2,
  Mail,
  MailX,
  Phone,
  PhoneOff,
} from "lucide-react";
import { useEffect, useState } from "react";
import DynamicPanel from "@/shared/DynamicPanel";
import Error from "./Error";
import LoadingPanel from "./LoadingPanel";

export default function Customers() {
  const navigate = useNavigate();

  /* 
    "customers" es una lista auto actualizable, usa datos en caché siempre que puede y
    hace peticiones en segundo plano para revalidar los datos.

    "isLoading" es una flag que es "true" cuando las requests asociadas están en progreso.

    "error" es un error retornado por la función que realiza la solicitud (definida por axios en los hooks).

    "updateCustomerList" es una función para invalidar la data actual y solicitar un refetch automáticamente.

    Este hook está adaptado con "useSWR", retorna un arreglo porque es mas facil de tipar.
    ver mas en https://swr.vercel.app/docs/data-fetching
  */
  const [customers, isLoading, error, updateCustomerList] = useCustomers();

  /* 
    Este hook está adaptado con "useSWRMutation"
    ver mas en https://swr.vercel.app/docs/mutation

    "deleteCustomer" es una función asíncrona para eliminar un cliente dado su Id.

    "isDeleting" será true cuando la request esté en progreso.
   */
  const [deleteCustomer, isDeleting] = useDeleteCustomer();

  /* 
    Este es un estado para identificar el id del cliente a eliminar y así
    mostrar un icono de progreso en el boton de la Card específica.

    Mas adelante se establece mediante el "onClick" del boton Eliminar.
   */
  const [deletingCustomerId, setDeletingCustomerId] = useState(null);

  /* Cada vez que cambia el id del cliente a eliminar, ejecuta esta acción */
  useEffect(() => {
    const scheduleDeletion = async () => {
      await deleteCustomer(deletingCustomerId);
      updateCustomerList();
    };

    if (deletingCustomerId) {
      scheduleDeletion();
    }
  }, [deletingCustomerId]);

  if (error) {
    return <Error message="Failed to fetch customers." />;
  }

  if (isLoading) {
    return <LoadingPanel />;
  }

  function handleEdit(customerId) {
    navigate("/clientes/editar/" + customerId);
  }

  const buttonDeleteContent = (customerId) => {
    if (isDeleting && customerId == deletingCustomerId) {
      return <Loader2 className="animate-spin"></Loader2>;
    }
    return "Eliminar";
  };

  return (
    <DynamicPanel
      rightActions={
        <>
          <Button onClick={() => navigate("/clientes/agregar")}>Agregar</Button>
        </>
      }
    >
      <div className="pharmatic-card-grid">
        {customers.map((c) => (
          <PharmaticCard
            key={c.customerNo}
            title={
              <div className="flex items-center gap-2">
                <span className="w-12">
                  {c.gender == "M" ? (
                    <UserMaleIcon fill="#424242" />
                  ) : c.gender == "F" ? (
                    <UserFemaleIcon fill="#424242" />
                  ) : (
                    <PersonGeneric fill="#424242" />
                  )}
                </span>
                {c.name} {c.surname}
              </div>
            }
            info={
              <>
                <div className="my-2 flex items-center gap-2 text-blue-600">
                  {c.email ? <Mail /> : <MailX />} {c.email}
                </div>
                <div className="my-2 flex items-center gap-2 text-green-600">
                  {c.phone ? <Phone /> : <PhoneOff />} {c.phone}
                </div>
                <div className="my-2 flex items-center gap-2">
                  {c.birthDate ? <CalendarDays /> : <CalendarOff />}{" "}
                  {c.birthDate}
                </div>
              </>
            }
            actions={
              <>
                <Button
                  className="rounded-3xl"
                  size="sm"
                  onClick={() => handleEdit(c.customerNo)}
                >
                  Editar
                </Button>
                <Button
                  className="rounded-3xl"
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeletingCustomerId(c.customerNo)}
                >
                  {buttonDeleteContent(c.customerNo)}
                </Button>
              </>
            }
          />
        ))}
      </div>
    </DynamicPanel>
  );
}
