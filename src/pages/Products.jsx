import { useProducts } from "@/hooks/product_hooks";
import Error from "./Error";
import LoadingPanel from "./LoadingPanel";
import { useNavigate } from "react-router-dom";
import DynamicPanel from "@/shared/DynamicPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function Products() {
  const navigate = useNavigate();
  const [products, isLoading, error, updateProductList] = useProducts();

  if (error) {
    return <Error message="Failed to fetch products." />;
  }

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <DynamicPanel
      rightActions={
        <>
          <Button onClick={() => navigate("/productos/agregar")}>
            Agregar
          </Button>
        </>
      }
    >
      <div className="grid h-full grid-cols-1 gap-6 p-6 md:grid-cols-2 2xl:grid-cols-3">
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
          />
        ))}
      </div>
    </DynamicPanel>
  );
}

function ProductCard({ imageUrl, title, info }) {
  return (
    <div className="grid cursor-pointer grid-cols-6 gap-3 rounded-lg bg-gray-100 p-6 drop-shadow-lg transition delay-150 ease-in-out hover:-translate-y-1 hover:scale-105">
      <div className="col-start-1 col-end-3">
        <img
          src={imageUrl}
          alt="card image"
          className="h-full w-full rounded-lg border-2 object-contain"
        />
      </div>
      <div className="col-start-3 col-end-7">
        <div className="mb-3 text-sm font-bold xl:text-lg">{title}</div>
        <div className="px-3 text-xs xl:text-sm">{info}</div>
      </div>
    </div>
  );
}

export default Products;
