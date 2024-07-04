import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useProductData, useProducts } from "@/hooks/product_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import LoadingPanel from "./LoadingPanel";
import Error from "./Error";
import {
  Banknote,
  Calendar,
  ShieldCheck,
  ShoppingCart,
  Syringe,
  Tag,
  UserRound,
  Warehouse,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartProducts } from "@/shared/MainContent";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Cart() {
  const [products, isLoading, error] = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addedCartProducts, setAddedCartProducts } = useCartProducts();
  const navigate = useNavigate();

  if (error) {
    return <Error message="Failed to fetch products." />;
  }

  if (isLoading) {
    return <LoadingPanel />;
  }

  const inStock = (stock) => {
    if (stock > 0) return true;
    return false;
  };

  const setQuantityAddedOrStockInformation = (id, stock) => {
    if (!inStock(stock)) return "Sin stock";

    const productInCart = addedCartProducts.find(
      (product) => product.productNo === id,
    );

    if (productInCart) {
      return `${productInCart.quantity} en el carrito`;
    }
  };

  return (
    <DynamicPanel
      leftActions={
        <h2 className="text-sm font-bold lg:text-lg">
          Agregar productos al carrito
        </h2>
      }
      rightActions={
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="responsive">
                Limpiar productos
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está completamente seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no puede deshacerse. Esto limpiará por completo el
                  carrito.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-700 hover:bg-red-700/90"
                  onClick={() => setAddedCartProducts([])}
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            onClick={() => navigate(`/ventas/facturación`)}
            className="bg-green-600 hover:bg-green-600/90"
            size="responsive"
          >
            Procesar
          </Button>
          <ShoppingCart className="h-8 w-8" color="hsla(186, 78%, 42%, 1)" />
          <h2 className="text-lg font-bold text-primary">
            {addedCartProducts.length ? addedCartProducts.length : 0}
          </h2>
        </>
      }
    >
      <div className="grid h-full grid-cols-1 lg:grid-cols-6">
        <Command className="rounded-xl lg:col-start-1 lg:col-end-3">
          <CommandInput placeholder="Buscar producto..." />
          <CommandList className="h-full" maxHeight={false}>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup heading="Productos">
              <Sheet>
                {window.innerWidth >= 1024 || (
                  <SheetContent side="bottom">
                    <ProductDetails
                      productNo={selectedProduct}
                      setAddedCartProducts={setAddedCartProducts}
                      addedCartProducts={addedCartProducts}
                    />
                  </SheetContent>
                )}
                <SheetTrigger>
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
                      disabled={p.stock > 0 ? false : true}
                    >
                      <div className="h-20 w-20 flex-none">
                        <img
                          src={p.imageUrl}
                          alt="card image"
                          className="rounded-xl object-contain"
                        />
                      </div>
                      <div className="flex-none">
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
                      <div className="flex flex-1 flex-row-reverse self-start">
                        <p
                          className={
                            "text-xs font-bold xl:text-sm " +
                            `${inStock(p.stock) ? "text-primary" : "text-destructive"}`
                          }
                        >
                          {setQuantityAddedOrStockInformation(
                            p.productNo,
                            p.stock,
                          )}
                        </p>
                      </div>
                    </CommandItem>
                  ))}
                </SheetTrigger>
              </Sheet>
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
        <div className="hidden lg:col-start-3 lg:col-end-7 lg:block lg:border-l-2">
          {selectedProduct && (
            <ProductDetails
              productNo={selectedProduct}
              setAddedCartProducts={setAddedCartProducts}
              addedCartProducts={addedCartProducts}
            />
          )}
        </div>
      </div>
    </DynamicPanel>
  );
}

function ProductDetails({
  productNo,
  addedCartProducts,
  setAddedCartProducts,
}) {
  const [product, isLoading, error, _] = useProductData(productNo);
  const [quantity, setQuantity] = useState(0);
  const { toast } = useToast();

  if (error) {
    return <Error message="Failed to fetch product data." />;
  }

  if (isLoading) {
    return <ProductDetailsLoading />;
  }

  const handleAddProduct = () => {
    const currentDate = new Date();
    const expirationDate = new Date(product.expirationDate);

    if (expirationDate < currentDate) {
      toast({
        variant: "destructive",
        title: "Error al agregar producto.",
        description: "El producto que intentas agregar está vencido!",
      });
      return;
    }

    if (product.stock < quantity) {
      toast({
        variant: "destructive",
        title: "Error al agregar producto",
        description: "Producto sin suficiente stock!",
      });
      return;
    }

    const existingProductIndex = addedCartProducts.findIndex(
      (item) => item.productNo === product.productNo,
    );

    if (existingProductIndex > -1) {
      const existingProduct = addedCartProducts[existingProductIndex];
      const newQuantity = existingProduct.quantity + quantity;

      if (newQuantity > product.stock) {
        toast({
          variant: "destructive",
          title: "Error al agregar producto",
          description:
            "No puedes agregar más productos que el stock disponible!",
        });
        return;
      }

      const updatedProducts = [...addedCartProducts];
      updatedProducts[existingProductIndex] = {
        ...existingProduct,
        quantity: newQuantity,
      };

      setAddedCartProducts(updatedProducts);
    } else {
      setAddedCartProducts([...addedCartProducts, { ...product, quantity }]);
    }

    toast({
      title: "Producto agregado correctamente.",
    });
  };

  return (
    <div className="flex h-full w-full flex-col p-6 lg:p-12">
      <div className="flex-none">
        <div className="flex flex-grow gap-x-6">
          <div className="h-52 w-52 flex-none">
            <img
              src={product.imageUrl}
              alt="card image"
              className="rounded-xl border-2 object-contain"
            />
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold xl:text-3xl">
              {product.catalog.name}
            </p>
            <p className="text-xl font-semibold xl:text-2xl">
              Categoría: {product.category?.name}
            </p>
            <p className="text-xl font-semibold xl:text-2xl">
              Sub Categoría: {product.subcategory?.name}
            </p>
          </div>
        </div>

        <div className="flex flex-grow justify-center gap-x-10 p-3">
          <div className="flex items-center gap-2 text-lg xl:text-xl">
            <UserRound className="h-4 w-4" /> Proveedor:{" "}
            {product.provider?.name}
          </div>
          <div className="flex items-center gap-2 text-lg xl:text-xl">
            <Calendar className="h-4 w-4" /> Fecha de expiración:{" "}
            {product.expirationDate}
          </div>
          <div className="flex items-center gap-2 text-lg xl:text-xl">
            <Warehouse className="h-4 w-4" /> Stock: {product.stock}
          </div>
        </div>

        <div className="flex flex-grow justify-center gap-x-10 p-3">
          <div className="flex items-center gap-2 text-lg xl:text-xl">
            <Banknote className="h-4 w-4" /> Precio: C${" "}
            {product.sellingPriceUnit}
          </div>
          <div className="flex items-center gap-2 text-lg xl:text-xl">
            <ShieldCheck className="h-4 w-4" /> Consigna:{" "}
            {product.consign ? "Sí" : "No"}
          </div>
          <div className="flex items-center gap-2 text-lg xl:text-xl">
            <Syringe className="h-4 w-4" /> Vía de administración:{" "}
            {product.adminRoute?.description}
          </div>
        </div>

        <div className="flex justify-center gap-x-3 p-3">
          <div className="flex items-center gap-2 text-lg xl:text-xl">
            <Tag className="h-4 w-4" /> Tags:
          </div>
          {product.tags.map((t, i) => (
            <Badge key={i} className="cursor-default" variant="outline">
              {t.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col-reverse">
        <div className="flex justify-end border-t-2 pt-3">
          <div className="flex gap-x-3">
            <Input
              type="number"
              placeholder="0"
              className="max-w-20"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <Button onClick={handleAddProduct}>Agregar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailsLoading() {
  return (
    <>
      <div className="flex flex-grow gap-x-6 p-6 lg:p-12">
        <Skeleton className="h-32 w-32 flex-none lg:h-52 lg:w-52"></Skeleton>
        <Skeleton className="flex-1"></Skeleton>
      </div>
      <div className="flex flex-grow justify-center gap-x-10 p-3">
        <Skeleton className="h-5 w-52"></Skeleton>
        <Skeleton className="h-5 w-52"></Skeleton>
        <Skeleton className="h-5 w-52"></Skeleton>
      </div>
      <div className="flex flex-grow justify-center gap-x-10 p-3">
        <Skeleton className="h-5 w-52"></Skeleton>
        <Skeleton className="h-5 w-52"></Skeleton>
        <Skeleton className="h-5 w-52"></Skeleton>
      </div>
      <div className="flex justify-center gap-x-3 p-3">
        <Skeleton className="h-5 w-52"></Skeleton>
      </div>
    </>
  );
}
