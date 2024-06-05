import { Button } from "@/components/ui/button";
import PharmaticCard from "@/components/ui/pharmatic-card";
import { useProviders } from "@/hooks/provider_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import {
  Mail,
  MailX,
  MapPinIcon,
  MapPinOff,
  Phone,
  PhoneOff,
} from "lucide-react";

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
                <div className="my-2 flex items-center gap-2 text-blue-600">
                  {p.email ? <Mail /> : <MailX />} {p.email}
                </div>
                <div className="my-2 flex items-center gap-2 text-green-600">
                  {p.phone ? <Phone /> : <PhoneOff />} {p.phone}
                </div>
                <div className="my-2 flex items-center gap-2">
                  {p.address ? <MapPinIcon /> : <MapPinOff />} {p.address}
                </div>
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
