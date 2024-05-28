import { Separator } from "@radix-ui/react-separator";
import NavigationLinks from "./NavigationLinks";

function Drawer() {
  return (
    <>
      <MainDrawer></MainDrawer>
    </>
  );
}

function MainDrawer() {
  return (
    <div className="h-full w-1/5 bg-white mr-6 rounded-xl hidden md:block">
      <PharmaticLogo />
      <NavigationLinks />
    </div>
  );
}

function PharmaticLogo() {
  return (
    <div className="p-3">
      <img
        src="../../assets/PharmaticLogo.png"
        alt="logo pharmatic"
        className="w-full h-auto"
      ></img>
      <Separator className="my-2 h-0.5 bg-gray-300" />
    </div>
  );
}

export default Drawer;
