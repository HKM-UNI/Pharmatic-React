import { NavLink } from "react-router-dom";
import {
  DashBoardIcon,
  UserIcon,
  DropBoxIcon,
  BagIcon,
  Setting3Icon,
  ChemicalGlassIcon,
} from "/src/icons";
import { ClientIcon } from "@/icons";

const pharmaticLink =
  "flex items-center pl-5 py-2 transition-all duration-300 w-[90%] text-md";

const pharmaticSubLink =
  "flex items-center pr-6 pl-10 py-1 transition-all duration-300 w-[90%] text-sm";

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
        <UserIcon className="w-6 h-6 mr-3" />
        Login
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => getLinkStyle(isActive)}
      >
        <DashBoardIcon className="w-6 h-6 mr-3" />
        Dashboard
      </NavLink>

      <div className={groupLinkTextStyle}>
        <DropBoxIcon className="w-6 h-6 mr-3" />
        Inventario
      </div>

      <NavLink
        to="/productos"
        className={({ isActive }) => getLinkStyle(isActive, true)}
      >
        <BagIcon className="w-6 h-6 mr-3" />
        Productos
      </NavLink>
      <NavLink
        to="/metadata"
        className={({ isActive }) => getLinkStyle(isActive, true)}
      >
        <Setting3Icon className="w-6 h-6 mr-3" />
        Metadata
      </NavLink>
      <NavLink
        to="/composiciones"
        className={({ isActive }) => getLinkStyle(isActive, true)}
      >
        <ChemicalGlassIcon className="w-6 h-6 mr-3" />
        Composiciones
      </NavLink>

      <NavLink
        to="/clientes"
        className={({ isActive }) => getLinkStyle(isActive)}
      >
        <ClientIcon className="w-6 h-6 mr-3" />
        Clientes
      </NavLink>
    </nav>
  );
}

export default NavigationLinks;
