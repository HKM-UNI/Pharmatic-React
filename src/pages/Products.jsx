import { useDeleteProduct, useProducts } from "@/hooks/product_hooks";
import Error from "./Error";
import LoadingPanel from "./LoadingPanel";
import { useNavigate } from "react-router-dom";
import DynamicPanel from "@/shared/DynamicPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/auth";
import { SquarePen, Trash } from "lucide-react";

function Products() {
  const { checkScopes } = useContext(AuthContext);

  const hasDeletePermissions = checkScopes(["customer:delete"]);
  const hasWritePermissions = checkScopes(["customer:write"]);

  const navigate = useNavigate();
  const [products, isLoading, error, updateProducts] = useProducts();
  const [deleteProduct] = useDeleteProduct();

  if (error) {
    return <Error message="Failed to fetch products." />;
  }

  if (isLoading) {
    return <LoadingPanel />;
  }

  const handleRemoval = async (productNo) => {
    await deleteProduct(productNo);
    updateProducts();
  };

  return (
    <DynamicPanel
      rightActions={
        <>
          {!hasWritePermissions ? null : (
            <Button onClick={() => navigate("/productos/agregar")}>
              Agregar
            </Button>
          )}
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 2xl:grid-cols-3">
        {products.map((p) => (
          <ProductCard
            imageUrl={p.imageUrl}
            key={p.productNo}
            title={
              <>
                <p>{p.productName}</p>
                <p className="font-semibold">{p.categoryName}</p>
              </>
            }
            info={
              <>
                <div className="my-2 flex gap-2">
                  {p.productTags.map((t, i) => (
                    <Badge key={i}>{t}</Badge>
                  ))}
                </div>
              </>
            }
            actions={
              <>
                {!hasDeletePermissions ? null : (
                  <Button
                    size="icon"
                    className="rounded-full border-transparent bg-transparent hover:bg-white"
                    variant="outline"
                    onClick={() => handleRemoval(p.productNo)}
                  >
                    <Trash className="h-3 w-3 md:h-5 md:w-5" color="red" />
                  </Button>
                )}
                {!hasWritePermissions ? null : (
                  <Button
                    size="icon"
                    className="rounded-full border-transparent bg-transparent hover:bg-white"
                    variant="outline"
                    onClick={() => navigate(`/productos/editar/${p.productNo}`)}
                  >
                    <SquarePen
                      className="h-3 w-3 md:h-5 md:w-5"
                      color="hsla(186, 78%, 42%, 1)"
                    />
                  </Button>
                )}
              </>
            }
          />
        ))}
      </div>
    </DynamicPanel>
  );
}

function ProductCard({ imageUrl, title, info, actions = null, ...props }) {
  return (
    <div
      className="grid grid-cols-9 gap-3 rounded-lg bg-gray-100 p-6 drop-shadow-lg"
      {...props}
    >
      <div className="col-start-1 col-end-4">
        <img
          src={imageUrl}
          alt="card image"
          className="h-full w-full rounded-lg border-2 object-contain"
        />
      </div>
      <div className="col-start-4 col-end-9">
        <div className="mb-3 text-sm font-bold xl:text-lg">{title}</div>
        <div className="px-3 text-xs xl:text-sm">{info}</div>
      </div>
      <div className="col-start-9 col-end-10">{actions}</div>
    </div>
  );
}

export default Products;
