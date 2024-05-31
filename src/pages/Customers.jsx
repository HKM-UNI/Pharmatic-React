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
    <div className="grid grid-cols-4 gap-3 bg-white rounded-2xl p-3 h-full overflow-auto">
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
              <Button className="rounded-3xl bg-red-500" size="sm">
                Eliminar
              </Button>
            </>
          }
        />
      ))}
    </div>
  );
}
