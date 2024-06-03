import { Button } from "@/components/ui/button";
import PharmaticCard from "@/components/ui/pharmatic-card";
import { useCustomers } from "@/hooks/customer_hooks";

export default function Customers() {
  const [customers, error, isLoading] = useCustomers();
  if (error) {
    return <p>Failed to fetch customers</p>;
  }
  if (isLoading) {
    return <p>Loading customers..</p>;
  }
  return (
    <div className="grid h-full grid-cols-1 gap-3 overflow-auto rounded-2xl bg-white p-3 sm:grid-cols-2 2xl:grid-cols-4">
      {customers.map((c, i) => (
        <PharmaticCard
          key={i}
          title={`${c.name} ${c.surname}`}
          info={
            <>
              <p className="text-blue-600">{c.email}</p>
              <p className="text-green-600">{c.phone}</p>
              <p>{c.birthDate}</p>
              <p>{c.gender}</p>
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
