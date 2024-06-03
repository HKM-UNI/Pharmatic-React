import { Button } from "@/components/ui/button";
import PharmaticCard from "@/components/ui/pharmatic-card";
import { useProviders } from "@/hooks/provider_hooks";
import DynamicPanel from "@/shared/DynamicPanel";

export default function Providers() {
  const [providers, error, isLoading] = useProviders();
  if (error) {
    return <p>Failed to fetch providers</p>;
  }
  if (isLoading) {
    return <p>Loading providers..</p>;
  }
  return (
    <DynamicPanel>
      <div className="pharmatic-card-grid">
        {providers.map((p, i) => (
          <PharmaticCard
            key={i}
            title={p.name}
            info={
              <>
                <p className="text-blue-600">{p.email}</p>
                <p className="text-green-600">{p.phone}</p>
                <p>{p.address}</p>
              </>
            }
            actions={
              <>
                <Button className="rounded-3xl" size="sm">
                  Editar
                </Button>
                <Button className="rounded-3xl" size="sm" variant="destructive">
                  Eliminar
                </Button>
              </>
            }
          />
        ))}
      </div>
    </DynamicPanel>
  );
}
