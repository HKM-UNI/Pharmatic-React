import { NavLink } from "react-router-dom";
import {
  DashBoardIcon,
  UserIcon,
  DropBoxIcon,
  BagIcon,
  Setting3Icon,
  ChemicalGlassIcon,
} from "/src/icons";
import { ClientIcon, ProvidersIcon } from "@/icons";

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
  return (
    <nav className="flex flex-col space-y-2">
      <NavLink to="/login" className={({ isActive }) => getLinkStyle(isActive)}>
        <UserIcon className="mr-3 h-6 w-6" />
        Login
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => getLinkStyle(isActive)}
      >
        <DashBoardIcon className="mr-3 h-6 w-6" />
        Dashboard
      </NavLink>

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
      <NavLink
        to="/composiciones"
        className={({ isActive }) => getLinkStyle(isActive, true)}
      >
        <ChemicalGlassIcon className="mr-3 h-6 w-6" />
        Composiciones
      </NavLink>

      <NavLink
        to="/clientes"
        className={({ isActive }) => getLinkStyle(isActive)}
      >
        <ClientIcon className="mr-3 h-6 w-6" />
        Clientes
      </NavLink>

      <NavLink
        to="/proveedores"
        className={({ isActive }) => getLinkStyle(isActive)}
      >
        <ProvidersIcon className="mr-3 h-6 w-6" />
        Proveedores
      </NavLink>
    </nav>
  );
}

export default NavigationLinks;
