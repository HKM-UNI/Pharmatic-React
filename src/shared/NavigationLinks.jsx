import { NavLink } from "react-router-dom";
import {
  DashBoardIcon,
  UserIcon,
  DropBoxIcon,
  BagIcon,
  Setting3Icon,
  ChemicalGlassIcon,
} from "/src/icons";

const pharmaticLink =
  "flex items-center px-6 py-2 transition-all duration-300 w-[90%] text-lg font-bold";

const pharmaticSubLink =
  "flex items-center pr-6 pl-12 py-1 transition-all duration-300 w-[90%] text-md font-bold";

const pharmaticActiveLink =
  "bg-pharmaticPrimary/20 text-pharmaticPrimary rounded-r-3xl";

const pharmaticNotActiveLink = "hover:bg-gray-100 rounded-r-3xl";

const getLinkStyle = (isActive, isSubLink = false) =>
  `${isSubLink ? pharmaticSubLink : pharmaticLink} ${
    isActive ? pharmaticActiveLink : pharmaticNotActiveLink
  }`;

function NavigationLinks() {
  return (
    <nav className="flex flex-col space-y-2">
      <NavLink to="/" className={({ isActive }) => getLinkStyle(isActive)}>
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

      <div className="flex items-center px-6 py-2">
        <DropBoxIcon className="w-6 h-6 mr-3" />
        <p className="text-lg font-bold">Inventario</p>
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
    </nav>
  );
}

export default NavigationLinks;
