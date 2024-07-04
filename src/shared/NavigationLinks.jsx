import {
  ClientIcon,
  PresentionChartIcon,
  ProvidersIcon,
  ShoppingCartIcon,
} from "@/icons";
import { NavLink } from "react-router-dom";
import {
  BagIcon,
  ChemicalGlassIcon,
  DashBoardIcon,
  DropBoxIcon,
  Setting3Icon,
  UserIcon,
} from "/src/icons";
import { useContext } from "react";
import { AuthContext } from "@/auth";

const pharmaticLink =
  "flex items-center pl-5 py-2 transition-all duration-300 w-[90%] text-md";

const pharmaticSubLink =
  "flex items-center mr-6 pl-10 py-1 transition-all duration-300 w-[90%] text-sm";

const pharmaticActiveLink =
  "bg-pharmaticPrimary/20 text-pharmaticPrimary rounded-r-3xl font-bold";

const pharmaticNotActiveLink = "hover:bg-gray-100 rounded-r-3xl";

const groupLinkTextStyle =
  "flex items-center pl-5 py-2 cursor-default text-md font-semibold";

const getLinkStyle = (isActive, isSubLink = false) =>
  `${isSubLink ? pharmaticSubLink : pharmaticLink} ${
    isActive ? pharmaticActiveLink : pharmaticNotActiveLink
  }`;

function NavigationLinks() {
  const { checkScopes } = useContext(AuthContext);

  const hasDashboardPermissions = checkScopes([
    "customer:read",
    "provider:read",
    "product:read",
    "sales:read",
    "purchase:read",
  ]);

  const hasSalesReadPermissions = checkScopes(["sales:read"]);
  const hasSalesWritePermissions = checkScopes(["sales:write"]);
  const hasProductPermissions = checkScopes(["product:read"]);
  const hasCustomerPermissions = checkScopes(["customer:read"]);
  const hasProviderPermissions = checkScopes(["provider:read"]);
  const hasUserPermissions = checkScopes(["user:read"]);

  return (
    <nav className="flex flex-col space-y-2">
      {!hasDashboardPermissions ? null : (
        <NavLink
          to="/dashboard"
          className={({ isActive }) => getLinkStyle(isActive)}
        >
          <DashBoardIcon className="mr-3 h-6 w-6" />
          Dashboard
        </NavLink>
      )}

      {!(hasSalesReadPermissions && hasSalesWritePermissions) ? null : (
        <>
          <div className={groupLinkTextStyle}>
            <DropBoxIcon className="mr-3 h-6 w-6" />
            Ventas
          </div>

          {!hasSalesWritePermissions ? null : (
            <NavLink
              to="/ventas/carrito"
              className={({ isActive }) => getLinkStyle(isActive, true)}
            >
              <ShoppingCartIcon className="mr-3 h-6 w-6" />
              Nueva venta
            </NavLink>
          )}

          {!hasSalesReadPermissions ? null : (
            <NavLink
              to="/ventas/reciente"
              className={({ isActive }) => getLinkStyle(isActive, true)}
            >
              <PresentionChartIcon className="mr-3 h-6 w-6" />
              Últimas ventas
            </NavLink>
          )}
        </>
      )}

      {!hasProductPermissions ? null : (
        <>
          <div className={groupLinkTextStyle}>
            <DropBoxIcon className="mr-3 h-6 w-6" />
            Inventario
          </div>

          <NavLink
            to="/productos"
            className={({ isActive }) => getLinkStyle(isActive, true)}
          >
            <BagIcon className="mr-3 h-6 w-6" />
            Productos
          </NavLink>
          <NavLink
            to="/metadata"
            className={({ isActive }) => getLinkStyle(isActive, true)}
          >
            <Setting3Icon className="mr-3 h-6 w-6" />
            Metadata
          </NavLink>
        </>
      )}

      {!hasCustomerPermissions ? null : (
        <NavLink
          to="/clientes"
          className={({ isActive }) => getLinkStyle(isActive)}
        >
          <ClientIcon className="mr-3 h-6 w-6" />
          Clientes
        </NavLink>
      )}

      {!hasProviderPermissions ? null : (
        <NavLink
          to="/proveedores"
          className={({ isActive }) => getLinkStyle(isActive)}
        >
          <ProvidersIcon className="mr-3 h-6 w-6" />
          Proveedores
        </NavLink>
      )}

      {!hasUserPermissions ? null : (
        <NavLink
          to="/usuarios"
          className={({ isActive }) => getLinkStyle(isActive)}
        >
          <UserIcon className="mr-3 h-6 w-6" />
          Usuarios
        </NavLink>
      )}
    </nav>
  );
}

export default NavigationLinks;
