import CustomerCard from "@/components/customers/CustomerCard";
import { Button } from "@/components/ui/button";
import {
  useCreateCustomer,
  useCustomers,
  useDeleteCustomer,
  useUpdateCustomer,
} from "@/hooks/customer_hooks";
import { useEffect } from "react";

export default function CustomersView() {
  const [
    customers,
    updateCustomers,
    errorLoadingCustomers,
    isLoadingCustomers,
  ] = useCustomers();
  const [
    createCustomer,
    newCustomer,
    errorCreatingCustomer,
    isCreatingCustomer,
  ] = useCreateCustomer();
  const [updateTrigger, updatedCustomer] = useUpdateCustomer();
  const [deleteTrigger] = useDeleteCustomer();

  useEffect(() => {
    if (newCustomer) {
      updateCustomers([...customers, newCustomer]);
    }
  }, [newCustomer]);

  useEffect(() => {
    if (updatedCustomer) {
      const updateList = customers.map((c) => {
        if (c.customerNo == updatedCustomer.customerNo) {
          return updatedCustomer;
        } else {
          return c;
        }
      });
      updateCustomers(updateList);
    }
  }, [updatedCustomer]);

  if (errorLoadingCustomers) {
    return <p>Failed to fetch customers</p>;
  }

  if (isLoadingCustomers) {
    return <p>Loading customers..</p>;
  }

  if (errorCreatingCustomer) {
    alert("Failed to create new customer.");
  }

  const addCustomer = async () => {
    const randomName = (Math.random() + 1).toString(36).substring(3);
    const randomSurname = (Math.random() + 1).toString(36).substring(3);
    await createCustomer({ name: randomName, surname: randomSurname });
  };

  const updateCustomer = async (data) => {
    const randomName = (Math.random() + 1).toString(36).substring(3);
    const randomSurname = (Math.random() + 1).toString(36).substring(3);
    await updateTrigger({ ...data, name: randomName, surname: randomSurname });
  };

  const removeCustomer = async (id) => {
    await deleteTrigger(id);
    const updateList = customers.filter((c) => c.customerNo != id);
    updateCustomers(updateList);
  };

  return (
    <div className="p-5 h-full overflow-hidden">
      <div className="flex justify-center">
        <Button size="lg" onClick={addCustomer} disabled={isCreatingCustomer}>
          Añadir cliente random
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 pb-10 p max-h-full overflow-auto">
        {customers.map((c) => (
          <CustomerCard
            key={c.customerNo}
            data={c}
            onEdit={() => updateCustomer(c)}
            onDelete={() => removeCustomer(c.customerNo)}
          />
        ))}
      </div>
    </div>
  );
}
