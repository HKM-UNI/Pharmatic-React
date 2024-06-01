import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "@/icons";
import AppBar from "./AppBar";
import MainContent from "./MainContent";
import NavigationMenu from "./NavigationMenu";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-dvh p-2 xl:p-4">
      <div className="h-full w-[16%] bg-white mr-6 rounded-xl hidden xl:flex flex-col">
        <NavigationMenu />
      </div>

      <div className="w-full xl:w-[84%] h-full">
        <Sheet>
          <AppBar>
            <SheetTrigger className="block xl:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <MenuIcon className="w-6 h-6 " />
              </Button>
            </SheetTrigger>
          </AppBar>

          <SheetContent side="left" className="flex flex-col overflow-y-auto">
            <NavigationMenu />
          </SheetContent>
        </Sheet>

        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
}

export default MainLayout;
