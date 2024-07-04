import { createContext, useContext, useState } from "react";
import { Toaster } from "@/components/ui/toaster";

// Crear el contexto
const CartProductsContext = createContext();

// Hook para usar el contexto
export function useCartProducts() {
  return useContext(CartProductsContext);
}

// Proveedor de contexto
function CartProductsProvider({ children }) {
  const [addedCartProducts, setAddedCartProducts] = useState([]);

  return (
    <CartProductsContext.Provider
      value={{ addedCartProducts, setAddedCartProducts }}
    >
      {children}
    </CartProductsContext.Provider>
  );
}

// Componente principal
function MainContent({ children }) {
  return (
    <CartProductsProvider>
      <div className="w-full grow overflow-auto rounded-b-xl bg-pharmaticFade p-3">
        {children}
        <Toaster />
      </div>
    </CartProductsProvider>
  );
}

export default MainContent;
