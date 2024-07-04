import { Button } from "@/components/ui/button";
import PharmaticCard from "@/components/ui/pharmatic-card";
import { useDeleteProvider, useProviders } from "@/hooks/provider_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import {
  Loader2,
  Mail,
  MailX,
  MapPinIcon,
  MapPinOff,
  Phone,
  PhoneOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingPanel from "./LoadingPanel";
import Error from "./Error";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/auth";

export default function Providers() {
  const { checkScopes } = useContext(AuthContext);

  const hasDeletePermissions = checkScopes(["provider:delete"]);
  const hasWritePermissions = checkScopes(["provider:write"]);

  const navigate = useNavigate();
  const [providers, isLoading, error, updateProviderList] = useProviders();
  const [deleteProvider, isDeleting] = useDeleteProvider();
  const [deletingProviderId, setDeletingProviderId] = useState(null);

  useEffect(() => {
    const scheduleDeletion = async () => {
      await deleteProvider(deletingProviderId);
      updateProviderList();
    };

    if (deletingProviderId) {
      scheduleDeletion();
    }
  }, [deletingProviderId]);

  if (error) {
    return <Error message="Failed to fetch providers" />;
  }
  if (isLoading) {
    return <LoadingPanel />;
  }

  function handleEdit(providerId) {
    navigate("/proveedores/editar/" + providerId);
  }

  const buttonDeleteContent = (providerId) => {
    if (isDeleting && providerId == deletingProviderId) {
      return <Loader2 className="animate-spin"></Loader2>;
    }
    return "Eliminar";
  };

  return (
    <DynamicPanel
      rightActions={
        <>
          {!hasWritePermissions ? null : (
            <Button onClick={() => navigate("/proveedores/agregar")}>
              Agregar
            </Button>
          )}
        </>
      }
    >
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
                {!hasWritePermissions ? null : (
                  <Button
                    className="rounded-3xl"
                    size="sm"
                    onClick={() => handleEdit(p.providerNo)}
                  >
                    Editar
                  </Button>
                )}
                {!hasDeletePermissions ? null : (
                  <Button
                    className="rounded-3xl"
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeletingProviderId(p.providerNo)}
                  >
                    {buttonDeleteContent(p.providerNo)}
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
