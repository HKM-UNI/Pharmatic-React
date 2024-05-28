import { NavLink } from "react-router-dom";

const pharmaticLink =
  "px-6 py-2 transition-all duration-300 w-11/12 text-lg font-bold";

const pharmaticSubLink =
  "pr-6 pl-12 py-1 transition-all duration-300 w-11/12 text-md font-bold";

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
        Login
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => getLinkStyle(isActive)}>
        {" "}
        About{" "}
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => getLinkStyle(isActive)}
      >
        {" "}
        Contact{" "}
      </NavLink>

      <h3 className="gap-2 px-6 py-2 text-lg font-bold">Sub Links</h3>

      <NavLink
        to="/sub1"
        className={({ isActive }) => getLinkStyle(isActive, true)}
      >
        SubLink
      </NavLink>
      <NavLink
        to="/sub2"
        className={({ isActive }) => getLinkStyle(isActive, true)}
      >
        SubLink
      </NavLink>
      <NavLink
        to="/sub3"
        className={({ isActive }) => getLinkStyle(isActive, true)}
      >
        SubLink
      </NavLink>
    </nav>
  );
}

export default NavigationLinks;
