import { Separator } from "@radix-ui/react-separator";
import NavigationMenu from "./NavigationMenu";

function Drawer() {
  return (
    <>
      <MainDrawer></MainDrawer>
    </>
  );
}

function MainDrawer() {
  return (
    <div className="h-full w-1/5 bg-white mr-6 rounded-xl hidden md:block p-3">
      <PharmaticLogo />
      <NavigationMenu />
    </div>
  );
}

function PharmaticLogo() {
  return (
    <>
      <img
        src="../../assets/PharmaticLogo.png"
        alt="logo pharmatic"
        className="w-full h-auto"
      ></img>
      <Separator className="my-2 h-0.5 bg-gray-300" />
    </>
  );
}

export default Drawer;
