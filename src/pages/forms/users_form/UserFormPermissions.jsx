import { LazyFormComboBox } from "@/components/custom_form";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

/** @typedef {import("@/hooks/user_hooks").InitialUserFormOptions} InitialUserFormOptions  */

/**
 * @typedef FormProps
 * @property {InitialUserFormOptions} initialOptions
 * @property {number=} userId
 */

/** @param {FormProps} */
export default function UserFormPermissions({
  manualRoleChange,
  restoreSpec,
  initialOptions,
  userId,
}) {
  const form = useFormContext();
  const currentRoleId = form.watch("roleId", 0);

  const loadedUserPermissions = useRef(false);
  const wasManualChange = useRef(manualRoleChange);

  const [permissions, setPermissions] = useState([]);

  const { fields: scopes } = useFieldArray({
    control: form.control,
    name: "permissions",
  });

  useEffect(() => {
    wasManualChange.current = manualRoleChange;
  }, [manualRoleChange.current]);

  useEffect(() => {
    if (loadedUserPermissions.current && !wasManualChange.current) {
      const url = `users/permissions?role_id=${currentRoleId}`;
      axios.get(url).then((resp) => {
        setPermissions(resp.data);
        form.setValue(
          "permissions",
          resp.data.map((p) => ({ ...p.scope, scope_id: p.scope.id })),
        );
      });
    }
  }, [currentRoleId]);

  wasManualChange.current = false;
  restoreSpec();

  useEffect(() => {
    if (!loadedUserPermissions.current) {
      const url = `users/permissions?user_id=${userId || 0}`;
      axios.get(url).then((resp) => {
        setPermissions(resp.data);
        form.setValue(
          "permissions",
          resp.data.map((p) => ({ ...p.scope, scope_id: p.scope.id })),
        );
      });
      loadedUserPermissions.current = true;
    }
  }, []);

  const updateSwitch = (idx, prop, enabled) => {
    const item = [...scopes];
    item[idx][prop] = enabled;

    const patch = [...permissions];
    patch[idx].scope = item[idx];
    setPermissions(patch);
    form.setValue("permissions", item);

    if (currentRoleId > 0) {
      wasManualChange.current = true;
      form.setValue("roleId", 4);
    }
  };

  return (
    <div className="flex justify-center pb-5 pt-5">
      <div className="mx-auto space-y-4 2xl:w-2/3">
        <div className="w-1/5">
          <LazyFormComboBox
            endpoint="users/roles"
            fieldname="roleId"
            searchPlaceHolder="Buscar Roles"
            selectPlaceHolder="Seleccionar Rol"
            label="Rol del usuario"
            initialOptions={initialOptions.roles}
            optionMapper={(c) => ({ label: c.roleName, value: c.id })}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estado</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Lectura</TableHead>
              <TableHead>Escritura</TableHead>
              <TableHead>Eliminación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((p, i) => {
              const { read, write, delete: remove } = p.scope;
              const allowedCount = [read, write, remove].filter(
                (v) => v,
              ).length;
              const permState =
                (allowedCount == 0 && "Nulo") ||
                (allowedCount < 3 && "Parcial") ||
                "Total";

              const badgeTextColor = {
                Nulo: "text-green-600",
                Parcial: "text-blue-600",
                Total: "text-yellow-600",
              };

              return (
                <TableRow key={p.categoryId}>
                  <TableCell className="font-medium">
                    <Badge
                      variant="outline"
                      className={badgeTextColor[permState]}
                    >
                      {permState}
                    </Badge>
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.description}</TableCell>
                  <TableCell>
                    <Switch
                      name={`permissions[${i}].read`}
                      ref={form.register()}
                      checked={scopes[i]?.read}
                      onCheckedChange={(v) => {
                        updateSwitch(i, "read", v);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      name={`permissions[${i}].write`}
                      ref={form.register()}
                      checked={scopes[i]?.write}
                      onCheckedChange={(v) => {
                        updateSwitch(i, "write", v);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      name={`permissions[${i}].delete`}
                      ref={form.register()}
                      checked={scopes[i]?.delete}
                      onCheckedChange={(v) => {
                        updateSwitch(i, "delete", v);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
