import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCustomers } from "@/hooks/customer_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import { useCartProducts } from "@/shared/MainContent";
import {
  CheckIcon,
  ChevronsUpDown,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import LoadingPanel from "./LoadingPanel";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCreateInvoice } from "@/hooks/sales_hooks";
import { useNavigate } from "react-router-dom";

export default function Invoicing() {
  const { addedCartProducts, setAddedCartProducts } = useCartProducts();
  const [customers, customersIsLoading, customersError, _] = useCustomers();

  const [selectedCustomer, setCustomer] = useState(null);
  const [ivaEnabled, setIva] = useState(true);
  const [discountEnabled, setDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(null);

  const [createInvoice, isCreating] = useCreateInvoice();

  const { toast } = useToast();
  const navigate = useNavigate();

  if (customersError) {
    return <Error message="Failed to fetch dashboard data." />;
  }

  if (customersIsLoading) {
    return <LoadingPanel />;
  }

  const getSubTotal = () => {
    return addedCartProducts.reduce(
      (total, product) => total + Number(product.sellingPriceUnit),
      0,
    );
  };

  const getTotal = () => {
    let total = 0;
    const subTotal = Number(getSubTotal());
    total += subTotal;
    if (ivaEnabled) total += subTotal * 0.15;
    if (discountEnabled) total -= (subTotal * discountPercent) / 100;
    return total;
  };

  const incrementQuantity = (productId) => {
    setAddedCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productNo === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  };

  const decrementQuantity = (productId) => {
    setAddedCartProducts((prevProducts) =>
      prevProducts
        .map((product) =>
          product.productNo === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
        .filter((product) => product.quantity > 0),
    );
  };

  const validInvoice = () => {
    if (
      discountEnabled &&
      discountPercent &&
      (discountPercent < 0 || discountPercent > 100)
    ) {
      toast({
        variant: "destructive",
        title: "Error al crear factura.",
        description: "El descuento debe ser un valor entre 0 y 100.",
      });
      console.log("hola");
      return false;
    }

    if (!addedCartProducts.length) {
      toast({
        variant: "destructive",
        title: "Error al crear factura.",
        description: "La cantidad de productos debe ser mayor a 0.",
      });
      console.log("hola");
      return false;
    }
    console.log("hola");
    return true;
  };

  async function handleCreateInvoice() {
    if (validInvoice()) {
      const invoiceData = {
        customerNo: selectedCustomer ? selectedCustomer.customerNo : null,
        details: addedCartProducts.map((product) => ({
          productNo: product.productNo,
          quantity: product.quantity,
        })),
        discount: discountEnabled ? discountPercent : null,
      };
      console.log("Datos enviados a la API:", invoiceData);
      await createInvoice(invoiceData);
      setAddedCartProducts([]);
      navigate("/ventas/carrito");
    }
  }

  const buttonSubmitContent = () => {
    if (isCreating) {
      return <Loader2 className="animate-spin"></Loader2>;
    }
    return "Crear factura";
  };

  return (
    <DynamicPanel
      leftActions={
        <h2 className="text-sm font-bold lg:text-lg">Vista previa factura</h2>
      }
      rightActions={
        <>
          <Button onClick={handleCreateInvoice}>{buttonSubmitContent()}</Button>
          <ShoppingCart className="h-8 w-8" color="hsla(186, 78%, 42%, 1)" />
          <h2 className="text-lg font-bold text-primary">
            {addedCartProducts.length ? addedCartProducts.length : 0}
          </h2>
        </>
      }
    >
      <div className="flex h-full flex-grow flex-col p-6 lg:p-12">
        <div className="grid grid-cols-4 overflow-auto">
          <div className="flex border-b-2 border-r-2 pb-6">
            <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">
              Detalles productos
            </h2>
          </div>
          <div className="flex border-b-2 border-r-2 pb-6">
            <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">
              Cantidad
            </h2>
          </div>
          <div className="flex border-b-2 border-r-2 pb-6">
            <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">Precio</h2>
          </div>
          <div className="flex border-b-2 pb-6">
            <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">
              Sub total
            </h2>
          </div>
          {addedCartProducts.map((p) => (
            <>
              <div className="flex flex-col items-center justify-center border-b-2 border-r-2 p-3">
                <h2 className="text-sm font-semibold lg:text-lg">
                  {`${p.catalog.name} ${p.contentSize}`}
                </h2>
                <h2 className="text-sm font-semibold lg:text-lg">
                  {`${p.dosageForm.name}, ${p.adminRoute?.description}`}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-x-3 border-b-2 border-r-2 p-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-0"
                  onClick={() => incrementQuantity(p.productNo)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <h2 className="text-sm font-semibold lg:text-lg">
                  {p.quantity}
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-0"
                  onClick={() => decrementQuantity(p.productNo)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center border-b-2 border-r-2 p-3">
                <h2 className="text-sm font-semibold lg:text-lg">
                  C$ {p.sellingPriceUnit}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center border-b-2 p-3">
                <h2 className="text-sm font-semibold lg:text-lg">
                  C$ {p.quantity * p.sellingPriceUnit}
                </h2>
              </div>
            </>
          ))}
        </div>
        <div className="mt-6 flex flex-grow flex-col sm:flex-row">
          <div className="flex flex-1 items-center">
            <CustomerComboBox
              selectedCustomer={selectedCustomer}
              setCustomer={setCustomer}
              customers={customers}
            />
          </div>
          <div className="flex flex-1 flex-row-reverse">
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center justify-end gap-x-3">
                <Switch
                  checked={discountEnabled}
                  onCheckedChange={() => setDiscount(!discountEnabled)}
                />
                <h2 className="text-sm font-bold lg:text-lg">Descuento</h2>
                <Input
                  type="number"
                  placeholder="0"
                  className="max-w-20"
                  value={discountPercent}
                  onChange={(event) => setDiscountPercent(event.target.value)}
                />
              </div>
              <div className="flex items-center justify-end gap-x-3">
                <h2 className="text-sm font-bold lg:text-lg">Sub total: </h2>
                <h2 className="min-w-20 text-sm font-bold lg:text-lg">
                  {`C$ ${getSubTotal()}`}
                </h2>
              </div>
              <div className="flex items-center justify-end gap-x-3">
                <Switch
                  checked={ivaEnabled}
                  onCheckedChange={() => setIva(!ivaEnabled)}
                />
                <h2 className="text-sm font-bold lg:text-lg">IVA: </h2>
                <h2 className="min-w-20 text-sm font-bold lg:text-lg">
                  {`C$ ${getSubTotal() * 0.15}`}
                </h2>
              </div>
              <div className="flex items-center justify-end gap-x-3">
                <h2 className="text-sm font-bold lg:text-lg">Total: </h2>
                <h2 className="min-w-20 text-sm font-bold lg:text-lg">
                  {`C$ ${getTotal()}`}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DynamicPanel>
  );
}

function CustomerComboBox({ selectedCustomer, setCustomer, customers }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCustomer
            ? customers.find((c) => c.value === selectedCustomer)?.name
            : "Selecciona un cliente..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cliente..." className="h-9" />
          <CommandList>
            <CommandEmpty>No se encontró el cliente</CommandEmpty>
            <CommandGroup>
              {customers.map((c, i) => (
                <CommandItem
                  key={i}
                  value={c.customerNo}
                  onSelect={(currentValue) => {
                    setCustomer(
                      currentValue === selectedCustomer ? null : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  {c.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCustomer === c.customerNo
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
