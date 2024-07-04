import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useProducts } from "@/hooks/product_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import LoadingPanel from "./LoadingPanel";
import Error from "./Error";
import {
  Banknote,
  Calendar,
  DollarSign,
  ShieldCheck,
  Syringe,
  Tag,
  UserRound,
  Warehouse,
} from "lucide-react";

export default function Cart() {
  const [products, isLoading, error] = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (error) {
    return <Error message="Failed to fetch products." />;
  }

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <DynamicPanel
      leftActions={
        <h2 className="text-lg font-bold">Agregar productos al carrito</h2>
      }
    >
      <div className="grid h-full grid-cols-6">
        <Command className="col-start-1 col-end-3 rounded-xl">
          <CommandInput placeholder="Buscar producto..." />
          <CommandList className="h-full" maxHeight={false}>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup heading="Productos">
              {products.map((p) => (
                <CommandItem
                  key={p.productNo}
                  className="my-1 flex flex-grow cursor-pointer gap-x-3 rounded-lg p-3"
                  style={{
                    backgroundColor:
                      selectedProduct === p.productNo &&
                      "hsla(186, 78%, 42%, 0.2)",
                  }}
                  onSelect={() => setSelectedProduct(p.productNo)}
                >
                  <div className="h-20 w-20 flex-none">
                    <img
                      src={p.imageUrl}
                      alt="card image"
                      className="rounded-xl object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3 text-xs font-bold xl:text-sm">
                      <p>{p.productName}</p>
                      <p className="font-semibold">{p.categoryName}</p>
                    </div>
                    <div className="px-3">
                      <div className="flex gap-2">
                        {p.productTags.map((t, i) => (
                          <Badge key={i} className="cursor-pointer">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
        <div className="col-start-3 col-end-7 border-l-2">
          {selectedProduct && (
            <>
              <div className="flex flex-grow gap-x-6 p-6 lg:p-12">
                <div className="h-20 w-20 flex-none sm:h-32 sm:w-32 lg:h-52 lg:w-52">
                  <img
                    src={products[4].imageUrl}
                    alt="card image"
                    className="rounded-xl border-2 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold md:text-2xl xl:text-3xl">
                    {products[4].productName}
                  </p>
                  <p className="text-lg font-semibold md:text-xl xl:text-2xl">
                    Categoría: {products[4].categoryName}
                  </p>
                  <p className="text-lg font-semibold md:text-xl xl:text-2xl">
                    Sub Categoría: {products[4].categoryName}
                  </p>
                </div>
              </div>

              <div className="flex flex-grow justify-center gap-x-10 p-3">
                <div className="flex items-center gap-2 text-sm md:text-lg xl:text-xl">
                  <UserRound className="h-4 w-4" /> Proveedor:
                </div>
                <div className="flex items-center gap-2 text-sm md:text-lg xl:text-xl">
                  <Calendar className="h-4 w-4" /> Fecha de expiración:
                </div>
                <div className="flex items-center gap-2 text-sm md:text-lg xl:text-xl">
                  <Warehouse className="h-4 w-4" /> Stock:
                </div>
              </div>

              <div className="flex flex-grow justify-center gap-x-10 p-3">
                <div className="flex items-center gap-2 text-sm md:text-lg xl:text-xl">
                  <Banknote className="h-4 w-4" /> Precio:
                </div>
                <div className="flex items-center gap-2 text-sm md:text-lg xl:text-xl">
                  <ShieldCheck className="h-4 w-4" /> Consigna:
                </div>
                <div className="flex items-center gap-2 text-sm md:text-lg xl:text-xl">
                  <Syringe className="h-4 w-4" /> Vía de administración:
                </div>
              </div>

              <div className="flex justify-center gap-x-3 p-3">
                <div className="flex items-center gap-2 text-sm md:text-lg xl:text-xl">
                  <Tag className="h-4 w-4" /> Tags:
                </div>
                {products[4].productTags.map((t, i) => (
                  <Badge key={i} className="cursor-default" variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </DynamicPanel>
  );
}
