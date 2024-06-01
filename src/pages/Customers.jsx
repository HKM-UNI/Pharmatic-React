import { Button } from "@/components/ui/button";
import PharmaticCard from "@/components/ui/pharmatic-card";
import { useCustomers } from "@/hooks/customer_hooks";
import { UserMaleIcon, UserFemaleIcon } from "@/icons";
import {
  CalendarDays,
  CalendarOff,
  Mail,
  MailX,
  Phone,
  PhoneOff,
} from "lucide-react";

export default function Customers() {
  const [customers, _, error, isLoading] = useCustomers();
  if (error) {
    return <p>Failed to fetch customers</p>;
  }
  if (isLoading) {
    return <p>Loading customers..</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-3">
      {customers.map((c) => (
        <PharmaticCard
          key={c.customerNo}
          title={
            <div className="flex gap-2 items-center">
              <span className="w-12">
                {c.gender == "M" ? <UserMaleIcon fill="#424242" /> : <UserFemaleIcon fill="#424242" />}
              </span>
              {c.name} {c.surname}
            </div>
          }
          info={
            <>
              <div className="flex gap-2 items-center text-blue-600 my-1">
                {c.email ? <Mail /> : <MailX />} {c.email}
              </div>
              <div className="flex gap-2 items-center text-green-600 my-1">
                {c.phone ? <Phone /> : <PhoneOff />} {c.phone}
              </div>
              <div className="flex gap-2 items-center my-1">
                {c.birthDate ? <CalendarDays /> : <CalendarOff />} {c.birthDate}
              </div>
            </>
          }
          actions={
            <>
              <Button className="rounded-3xl" size="sm">
                Editar
              </Button>
              <Button className="rounded-3xl" size="sm" variant="delete">
                Eliminar
              </Button>
            </>
          }
        />
      ))}
    </div>
  );
}
