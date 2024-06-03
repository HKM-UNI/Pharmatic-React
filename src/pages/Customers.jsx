import { Button } from "@/components/ui/button";
import PharmaticCard from "@/components/ui/pharmatic-card";
import { useCustomers, useDeleteCustomer } from "@/hooks/customer_hooks";
import { UserFemaleIcon, UserMaleIcon } from "@/icons";
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

export default function Customers() {
  const navigate = useNavigate();

  const [customers, isLoading, error, updateCustomerList] = useCustomers();
  const [deleteCustomer, isDeleting] = useDeleteCustomer();
  const [deletingCustomerId, setDeletingCustomerId] = useState(null);

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
    return <p>Failed to fetch customers</p>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader2 className="animate-spin size-20" />
      </div>
    );
  }

  function handleAdd(customerId) {
    navigate("/clientes/editar/" + customerId);
  }

  const buttonDeleteContent = (customerId) => {
    if (isDeleting && customerId == deletingCustomerId) {
      return <Loader2 className="animate-spin"></Loader2>;
    }
    return "Eliminar";
  };

  return (
    <div className="space-y-3">
      <div className="flex w-full justify-end items-center px-5">
        {/* Espacio de busqueda */}
        {/* <div></div> */}

        {/* Acciones */}
        <div>
          <Button onClick={() => navigate("/clientes/agregar")}>Agregar</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-3">
        {customers.map((c) => (
          <PharmaticCard
            key={c.customerNo}
            title={
              <div className="flex gap-2 items-center">
                <span className="w-12">
                  {c.gender == "M" ? (
                    <UserMaleIcon fill="#424242" />
                  ) : (
                    <UserFemaleIcon fill="#424242" />
                  )}
                </span>
                {c.name} {c.surname}
              </div>
            }
            info={
              <>
                <div className="flex gap-2 items-center text-blue-600 my-2">
                  {c.email ? <Mail /> : <MailX />} {c.email}
                </div>
                <div className="flex gap-2 items-center text-green-600 my-2">
                  {c.phone ? <Phone /> : <PhoneOff />} {c.phone}
                </div>
                <div className="flex gap-2 items-center my-2">
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
                  onClick={() => handleAdd(c.customerNo)}
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
    </div>
  );
}
