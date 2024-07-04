import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/user_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import React from "react";
import LoadingPanel from "./LoadingPanel";
import { SquarePen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const [users, isLoading, error] = useUsers();

  if (error) {
    return <Error message="Failed to fetch users." />;
  }

  if (isLoading) {
    return <LoadingPanel />;
  }
  return (
    <DynamicPanel
      rightActions={
        <>
          <Button onClick={() => navigate("/usuarios/agregar")}>
            Crear nuevo usuario
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        {users.map((u) => (
          <UserCard
            imageUrl={u.imageUrl}
            key={u.id}
            title={
              <>
                <p>{u.username}</p>
                <p className="font-semibold">{u.email}</p>
                <p className="font-normal">{u.role?.roleName}</p>
              </>
            }
            actions={
              <>
                <Button
                  size="icon"
                  className="rounded-full border-transparent bg-transparent hover:bg-white"
                  variant="outline"
                >
                  <Trash className="h-3 w-3 md:h-5 md:w-5" color="red" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full border-transparent bg-transparent hover:bg-white"
                  variant="outline"
                  onClick={() => navigate(`/usuarios/editar/${u.username}`)}
                >
                  <SquarePen
                    className="h-3 w-3 md:h-5 md:w-5"
                    color="hsla(186, 78%, 42%, 1)"
                  />
                </Button>
              </>
            }
          />
        ))}
      </div>
    </DynamicPanel>
  );
}

function UserCard({ imageUrl, title, actions }) {
  return (
    <div className="flex gap-5 rounded-lg bg-gray-100 p-3 drop-shadow-lg">
      <div className="flex-none">
        <img
          src={imageUrl}
          alt="card image"
          className="h-20 w-20 object-contain md:h-40 md:w-40"
        />
      </div>
      <div className="flex-1 cursor-default">
        <div className="mb-3 text-sm font-extrabold sm:text-lg md:text-xl">
          {title}
        </div>
      </div>

      <div className="flex flex-initial flex-col">{actions}</div>
    </div>
  );
}
