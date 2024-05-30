import { useCustomers } from "@/hooks/customer_hooks";

export default function CustomersView() {
  const [customers, error, isLoading] = useCustomers();
  if (error) {
    return <p>Failed to fetch customers</p>;
  }
  if (isLoading) {
    return <p>Loading customers..</p>;
  }
  return (
    <>
      {customers.map((c) => (
        <p>{`${c.customerNo} - ${c.name} ${c.surname}`}</p>
      ))}
    </>
  );
}
